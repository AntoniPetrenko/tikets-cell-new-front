"use client";

import useSWR from "swr";
import { fetcher } from "../libs/fetcher";
import { Product, ProductServer, ProductsType } from "../types";
import { useMemo } from "react";
import { ImagesProducts } from "../const/products";
import {
  getClubCardTexts,
  getClubCardTextValue,
  getCustomID,
} from "../libs/utils";

export const useProducts = () => {
  const { data, error, isLoading, mutate } = useSWR<ProductServer[]>(
    "/api/card-info",
    fetcher
  );
  const idClubCards = [1, 2, 3, 4, 5];
  const idProducts = [7, 8, 9, 10, 11, 12, 13, 14, 15];

  const allProducts: Product[] = useMemo(() => {
    if (!data) return [];

    return data.map((item) => ({
      id: item.id,
      title: idClubCards.includes(item.id)
        ? getClubCardTextValue(item.id, "title") || ""
        : item.title,
      description: idClubCards.includes(item.id)
        ? getClubCardTextValue(item.id, "description") || ""
        : item.description || "",
      price: item.price,
      rebate: item.rebate,
      isActive: item.is_active,
      customID: getCustomID(item.id),
      photo: ImagesProducts[String(item.id)],
      texts: getClubCardTexts(item.id),
      subTitle: idClubCards.includes(item.id)
        ? getClubCardTextValue(item.id, "subTitle")
        : undefined,
      count_of_tickets: item.count_of_tickets || 0,
      is_active: item.is_active || false,
    }));
  }, [data]);

  const clubCards = allProducts.filter(
    (item) =>
      item.customID === ProductsType.clubCarts && item.is_active === true
  );
  const products = allProducts.filter(
    (item) => item.customID === ProductsType.products && item.is_active === true
  );

  return {
    products,
    clubCards,
    allProducts,
    error,
    isLoading,
    mutate,
  };
};
