import { Product, ProductsType } from "../types";


export const ProductsClient: Product[] = [
  {
    title: "Решітка радіатора BMW F10/F11",
    description: "Решітка радіатора BMW F10/F11 надає автомобілю стильного та агресивного вигляду. Виготовлена з високоякісних матеріалів, вона забезпечує довговічність та надійність. Легко встановлюється і ідеально підходить для заміни оригінальної решітки.",
    customID: ProductsType.clientProducts,
    price: 1399,
    photo: [
      "/products-client/BMW_F10_F11_radiator_grille_1.png",
      "/products-client/BMW_F10_F11_radiator_grille_2.png",
      "/products-client/BMW_F10_F11_radiator_grille_3.png",
      "/products-client/BMW_F10_F11_radiator_grille_4.png"
    ],
    id: 7,
    is_active: true,
    rebate: 0, 
    count_of_tickets: 0

  },
  {
    title: "Дифузор BMW F30/F31 під подвійний вихлоп",
    description: "Дифузор BMW F30/F31 під подвійний вихлоп надає автомобілю спортивного та стильного вигляду. Виготовлений з якісних матеріалів для довговічності та надійності. Легко встановлюється і ідеально підходить для заміни оригінальної деталі.",
    customID: ProductsType.clientProducts,
    price: 2950,
    photo: [
      "/products-client/BMW_F30_F31_Diffuser_for_Dual_Exhaust_1.png",
      "/products-client/BMW_F30_F31_Diffuser_for_Dual_Exhaust_2.png",
      "/products-client/BMW_F30_F31_Diffuser_for_Dual_Exhaust_3.png",
      "/products-client/BMW_F30_F31_Diffuser_for_Dual_Exhaust_4.png"
    ],
    id: 8,
    is_active: true,
    rebate: 0, 
    count_of_tickets: 0
  },
  {
    title: "Решітка радіатора F30/F31",
    description: "Решітка радіатора F30/F31 надає автомобілю стильного та агресивного вигляду. Виготовлена з міцних матеріалів для довговічності та надійності. Легка у встановленні ідеально підходить для заміни оригінальної решітки.",
    customID: ProductsType.clientProducts,
    price: 1299,
    photo: [
      "/products-client/F30_F31_Radiator_Grille_1.png",
      "/products-client/F30_F31_Radiator_Grille_2.png",
      "/products-client/F30_F31_Radiator_Grille_3.png",
      "/products-client/F30_F31_Radiator_Grille_4.png"
    ],
    id: 9,
    is_active: true,
    rebate: 0, 
    count_of_tickets: 0
  },
  {
    title: "Протитуманні фари F10/E92",
    description: "Протитуманні фари F10/E92 забезпечують кращу видимість у тумані та поганих погодних умовах. Виготовлені з високоякісних матеріалів для надійності та довговічності. Легко встановлюються і підходять для заміни оригінальних фар.",
    customID: ProductsType.clientProducts,
    price: 1999,
    photo: [
      "/products-client/Fog_Lights_F10_E92_1.png",
      "/products-client/Fog_Lights_F10_E92_2.png",
      "/products-client/Fog_Lights_F10_E92_3.png",
    ],
    id: 10,
    is_active: true,
    rebate: 0, 
    count_of_tickets: 0
  },
  {
    title: "Накладки M на дзеркала BMW E60",
    description: "Накладки M на дзеркала BMW E60 надають автомобілю спортивного та стильного вигляду. Виготовлені з високоякісних матеріалів для довговічності та надійності. Легко встановлюються і підходять для заміни стандартних накладок.",
    customID: ProductsType.clientProducts,
    price: 1199,
    photo: [
      "/products-client/BMW_E60_M_Mirror_Caps_1.png",
      "/products-client/BMW_E60_M_Mirror_Caps_2.png",
      "/products-client/BMW_E60_M_Mirror_Caps_3.png",
      "/products-client/BMW_E60_M_Mirror_Caps_4.png",
    ],
    id: 11,
    is_active: true,
    rebate: 0, 
    count_of_tickets: 0
  },
   {
    title: "Спойлер BMW F10 M Performance",
    description: "Спойлер BMW F10 M Performance надає автомобілю агресивного та спортивного вигляду. Виготовлений з високоякісних матеріалів для довговічності та надійності. Легко встановлюється і ідеально підходить для заміни або оновлення оригінального спойлера.",
    customID: ProductsType.clientProducts,
    price: 1999,
    photo: [
      "/products-client/BMW_F10_M_Performance_Spoiler_1.png",
      "/products-client/BMW_F10_M_Performance_Spoiler_2.png",
      "/products-client/BMW_F10_M_Performance_Spoiler_3.png",
      "/products-client/BMW_F10_M_Performance_Spoiler_4.png",
    ],
    id: 12,
    is_active: true,
    rebate: 0, 
    count_of_tickets: 0
  }
]

export const ImagesProductsServer: Record<number, string> = {
  1: "/products-server/eleven.png",
  2: "/products-server/six.png",
  3: "/products-server/two.png",
  4: "/products-server/one.png",
  5: "/products-server/twfive.png"
}