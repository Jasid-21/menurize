export interface IMenuCategory {
  name: string;
  items: IMenuItem[];
}

export interface IMenuItem {
  name: string;
  highlight: boolean;
  description: string;
  price: string;
}
