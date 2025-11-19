/* eslint-disable @typescript-eslint/no-explicit-any */
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

export function getRandomCode(lim: number = 4): string {
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const upper = lower.toUpperCase();
  const numbers = '0123456789';
  const total = lower + upper + numbers;

  let code = '';
  for (let i = 0; i < lim; i++) {
    const idx = Math.floor(Math.random() * (total.length - 1));
    code += total[idx];
  }

  return code;
}
