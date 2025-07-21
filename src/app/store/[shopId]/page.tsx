import React from "react";
import StorePageComponent from "@/components/StorePage";



export default async function RootLayout({
                                           params
                                         }:
                                           Readonly<{
                                             children: React.ReactNode;
                                             params: { shopId: string }
                                           }>) {
  const param = await params // {locale: "id"}
  const shopId = await param.shopId // id
  const { default: shops } = await import('../../../data/shops.json');
  const shop = shops.find((s) => s.id.toString() === shopId);

  if (!shop) return <div>Shop not found</div>;

  return (
     <StorePageComponent shop={shop} />
  );
}
