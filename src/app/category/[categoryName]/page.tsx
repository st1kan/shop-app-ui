
import { PageWrapper } from "@/components/page-wrapper";
import CategoryPage from "@/components/CategoryPage";

export default function HomePage() {

  const SUBCATEGORIES = [
    { name: "Shirts & tops", image: "https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/25_shirts_tops.png?format=webp" },
    { name: "Shoes", image: "https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/187_shoes.png?format=webp" },
    { name: "Dresses", image: "https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/27_dresses.png?format=webp" },
    { name: "Pants", image: "https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/26_pants.png?format=webp" },
    { name: "Intimates", image: "https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/28_intimates.png?format=webp" },
    { name: "Activewear", image: "https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/35_activewear.png?format=webp" },
    { name: "Socks & hosiery", image: "https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/39_socks_hosiery.png?format=webp" },
    { name: "Swimwear", image: "https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/34_swimwear.png?format=webp" },
    { name: "Shorts", image: "https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/36_shorts.png?format=webp" },
    { name: "Sleepwear & loungewear", image: "https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/40_sleepwear_loungewear.png?format=webp" },
    { name: "Coats & jackets", image: "https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/33_coats_jackets.png?format=webp" },
    { name: "Jumpsuits & rompers", image: "https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/37_jumpsuits_rompers.png?format=webp" }
  ];


  return (
    // <PageWrapper>
      <CategoryPage categories={SUBCATEGORIES}/>
    // </PageWrapper>
  );
}
