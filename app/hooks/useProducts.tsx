"use client";

import useSWR from "swr";
import { fetcher } from "../libs/fetcher";
import { Product, ProductServer, ProductsType } from "../types";
import { useMemo } from "react";
import { ClubCards, ProductsClient } from "../const/products";

export const useProducts = () => {
  const { data, error, isLoading, mutate } = useSWR<ProductServer[]>(
    "/api/card-info",
    fetcher
  );

  // const products: Product[] = useMemo(() => {
  //   if (!data) return [];

  //   return data
  //     .filter((item) => item.is_active)
  //     .map((item) => ({
  //       id: item.id,
  //       title: item.title,
  //       description: item.description,
  //       price: item.price,
  //       rebate: item.rebate,
  //       count_of_tickets: item.count_of_tickets,
  //       is_active: item.is_active,
  //       customID: ProductsType.serverProducts,
  //       photo: [ProductsServer[item.id]],
  //     }));
  // }, [data]);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
