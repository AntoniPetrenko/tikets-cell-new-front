export interface NavItem {
  label: string;
  href: string;
}


export interface ProductServer {
  id: number;
  title: string;
  description: string;
  texts: string[];
  price: number;
  rebate: number;
  customID: ProductsType,
  photo: string[],
  type: string,
  subTitle: string,
  is_active: boolean,
  count_of_tickets: number
}

export enum ProductsType {
  clubCarts = "clubCarts",
  products = "products"
}

export interface Product {
  id: number;
  customID: ProductsType;
  title: string | undefined;
  photo: string[];
  description: string | undefined;
  price: number;
  rebate: number;
  count_of_tickets: number;
  is_active: boolean;
  texts?: string[] | undefined,
  subTitle?: string  | undefined,
}



