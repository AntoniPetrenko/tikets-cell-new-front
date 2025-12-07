import { TextsClubCards } from "../const/products";
import { ProductsType } from "../types";

export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

  const idClubCards = [1, 2, 3, 4, 5];
  const idProducts = [7, 8, 9, 10, 11, 12, 13, 14, 15];

export function getCustomID(id: number): ProductsType {
 
  if (idClubCards.includes(id)) {
    return ProductsType.clubCarts
  } else  {
   return ProductsType.products
  }
}

export function getClubCardTextValue(
  id: number,
  key: "title" | "description" | "subTitle"
): string | undefined {
  if (!idClubCards.includes(id)) return undefined;
  const card = TextsClubCards[id as keyof typeof TextsClubCards];
  return card ? (card[key] as string | undefined) : undefined;
}

export function getClubCardTexts(id: number): string[] | undefined {
  if (!idClubCards.includes(id)) return undefined;
  const card = TextsClubCards[id as keyof typeof TextsClubCards];
  return card?.texts;
}