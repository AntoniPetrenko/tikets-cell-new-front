export interface NavItem {
  label: string;
  href: string;
}

interface CustomId {
  customID: ProductsType,
}

export interface ProductServer {
  id: number;
  title: string;
  description: string;
  price: number;
  rebate: number;
  count_of_tickets: number;
  is_active: boolean;
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

