import type { modalType } from "./globalTypes";

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

export interface IModal {
  id: string;
  type: modalType;
  resolver: (value: void | PromiseLike<void>) => void;
}

export interface IMessageModal extends IModal {
  msg: string;
}
