import ProductPage from "@/components/ProductPage";

const fakeProduct = {
  id: "1",
  name: "SWU Token Storage Organiser",
  price: 15.60,
  images: [
    "https://cdn.shopify.com/s/files/1/0561/3856/3739/files/Empty-Blue_-_Copy.jpg?v=1752223420&width=800",
    "https://cdn.shopify.com/s/files/1/0561/3856/3739/files/Caddy-Bits-Box.jpg?v=1752225202&width=800",
    "https://cdn.shopify.com/s/files/1/0561/3856/3739/files/MattShot-Caddy.jpg?v=1752225202&width=800"
  ],
  colors: ["#0057FF", "#FF0000", "#00B140", "#999999", "#FFD700", "#FFFFFF"],
  shop: {
    name: "BuyTheSameToken",
    logo: "/images/logos/logo5.png",
    rating: 4.9,
    reviews: 1700,
    description: "This SWU Token Storage Organiser is a must-have for any serious gamer or collector. Designed with precision and durability in mind, it provides a sleek and efficient way to keep your tokens organized and protected. The compact design ensures it fits perfectly into your gaming setup, while the robust material guarantees long-lasting use. Say goodbye to cluttered tables and lost tokens, and elevate your gaming experience with this essential accessory. It's not just storage; it's a statement.",
    refundPolicy: "Our refund policy allows returns within 30 days of purchase, provided the item is in its original condition. Please contact customer support for return authorization.",
    shippingPolicy: "We offer standard and expedited shipping options. Standard shipping typically takes 5-7 business days, while expedited shipping delivers within 2-3 business days. Shipping costs are calculated at checkout based on your location and chosen method.",
    websiteLink: "https://www.facebook.com/"
  },
  counts: [
    {
      label: "1 pack",
      multiplier: 1,
      discountedPrice: 15.60
    },
    {
      label: "2 pack (10% off)",
      multiplier: 2,
      discountedPrice: 28.00
    },
    {
      label: "3 pack (15% off)",
      multiplier: 3,
      discountedPrice: 39.80
    }
  ],
  ratings: {
    average: 4.6,
    total: 220,
    distribution: {
      5: 150,
      4: 50,
      3: 10,
      2: 5,
      1: 5,
    },
  },
  reviews: [
    {
      id: "rev1",
      author: "Marlee",
      date: "May 9, 2025",
      rating: 5,
      comment: "ARFID Friendly! If your kiddo won't take any medicine no matter how hard you try to hide it, this is for you!!! I tried so many melatonins and my son could taste them all! I put a dropper in water and he drinks it no problem! This is a hint of a taste and he does not mind! It relaxes him enough to get to sleep and that's a blessing! Thank you wink well!",
      helpfulCount: 1,
      fromWebsite: "From winkwell.com",
    },
    {
      id: "rev2",
      author: "Lucia",
      date: "11 days ago",
      rating: 5,
      comment: "They work really good my son it's sleeping for 8 hrs straight",
      purchaseDetails: "1 Bottle (60 Servings)",
    },
    {
      id: "rev3",
      author: "Valerie",
      date: "April 29, 2025",
      rating: 5,
      comment: "Asleep in as little as 5 minutes! This is magic in a bottle. It works so well. We will do our nighttime routine, have some milk, brush teeth and then we take 1 dropper full. In as little as 5 minutes to 15 minutes my son is fast asleep. Purchasing more when the bottle runs out.",
    },
    {
      id: "rev4",
      author: "Sara",
      date: "June 4, 2025",
      rating: 5,
      comment: "we love wink well natural melatonin. it has helped our children fall asleep and stay asleep...",
    },
    {
      id: "rev5",
      author: "Joshua",
      date: "1 month ago",
      rating: 4,
      comment: "Me and my wife love this product! For our autistic son we tried many other products for him to sleep. This one has helped him to sleep within 30 mins and stays sleep up to 8 hrs. We highly recommend this product for anyone who has children with autism that struggles with sleep, this is a great solution",
    },
    {
      id: "rev6",
      author: "Emily",
      date: "July 1, 2025",
      rating: 3,
      comment: "It's okay, noticed a slight improvement but not as dramatic as hoped. Still worth a try.",
    },
  ],
};

export default function TestProductPage() {
  return <ProductPage product={fakeProduct} />;
}
