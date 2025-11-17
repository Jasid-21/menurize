export function findFrom<T = any>(arr: T[], idx: number, value: T): number {
  for (let i = idx; i < arr.length; i++) {
    if (arr[i] === value) return i;
  }
  return -1;
}

export function setupMenuGlobals(title: string, iconPath: string) {
  document.title = title;
  setFavicon(iconPath);
}

export function setFavicon(url: string) {
  let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }

  link.href = url;
}
