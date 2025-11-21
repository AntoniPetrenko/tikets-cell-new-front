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
  type: string
}

export enum ProductsType {
  serverProducts = "serverProducts",
  clientProducts = "clientProducts"
}

export interface Product {
  id: number;
  customID: ProductsType;
  title: string;
  photo: string[];
  description: string;
  price: number;
  rebate: number;
  count_of_tickets: number;
  is_active: boolean;
}



