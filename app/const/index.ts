import { NavItem } from "../types";

export const navItems: NavItem[] = [
  { label: "Головна", href: "/" },
  { label: "Каталог", href: "/catalog" },
  { label: "Контакти", href: "/contacts" },
  { label: "Клубні карти", href: "/club-cards"}
];

export const subNavItems: NavItem[] = [
   { label: "Доставка та оплата", href: "/delivery-payment" },
  { label: "Публічна оферта", href: "/public-offer" },
  { label: "Політика конфіденційності", href: "/privacy-policy" },
]