import type { IMenuCategory, IMenuItem } from "@/types/globalInterfaces";
import { findFrom } from "./globalUtils";
import router from "@/router";

export async function getMenuObject(restaurantName: string, fallbackUrl?: string): Promise<IMenuCategory[]> {
  const resp = await fetch(`http://127.0.0.1:5000/fetch-text?url_name=${ restaurantName }`);
  if (!resp.ok) {
    if (!!fallbackUrl) window.location.replace(fallbackUrl);
    else router.push({ name: "error" });

    return [];
  }

  const text = await resp.text();

  const menu = parseMenu(text);
  return menu;
}

function parseMenu(txtContent: string) {
  const rawLines = txtContent.split('\n').map(line => line.trim());
  const lines: string[] = [];
  for (let i = 0; i < rawLines.length; i++) {
    if (rawLines[i] == "" && (rawLines[i - 1] == "" || rawLines[i - 1]?.startsWith("..."))) continue;
    lines.push(rawLines[i]!);
  }

  const menu: IMenuCategory[] = [];
  const catIdxs = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i]?.startsWith("...")) catIdxs.push(i);
  }

  for (let i = 0; i < catIdxs.length; i++) {
    const currentCategory: IMenuCategory = {
      name: "",
      items: [],
    }

    const catName = lines[catIdxs[i]!]?.replace("...", "");
    currentCategory.name = catName || "";

    const startIdx = catIdxs[i]! + 1;
    const endIdx = catIdxs[i + 1]!;

    for (let j = startIdx; j < endIdx; j++) {
      const currentItem: IMenuItem = {
        name: "",
        price: "",
        description: "",
        highlight: false,
      }

      let nextSpace = findFrom(lines, j, "");
      if (nextSpace == -1) nextSpace = lines.length;

      currentItem.name = lines[j]?.replace("*", "").trim() || "";
      currentItem.highlight = lines[j]?.endsWith("*") || false;
      currentItem.price = lines[j + 1]!;
      currentItem.description = (() => {
        const desc = [];
        for (let k = j + 2; k < nextSpace; k++) {
          desc.push(lines[k]);
        }
        return desc.join('\n');
      })();

      currentCategory.items.push(currentItem);
      j = nextSpace;
    }

    menu.push(currentCategory);
  }

  return menu;
}

