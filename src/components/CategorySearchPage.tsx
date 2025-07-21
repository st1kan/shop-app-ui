'use client';

import styles from "@/styles/CategorySearchPage.module.scss";
import ShopCardSearch from "./ShopCardSearch";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  image: string;
};

type Shop = {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  products: Product[];
  backgroundVideo?: string;
  backgroundImage?: string;
  category?: string;
};

type Props = {
  categoryName: string;
  shops: Shop[];
};

const CategorySearchPage: React.FC<Props> = ({ categoryName, shops }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.category}>
        {categoryName}
        <Link href={`/category/${categoryName}`}><IoIosArrowForward /></Link>
      </div>
      <div className={styles.shops}>
        {shops.map((shop) => (
          <ShopCardSearch key={shop.id} shop={shop} />
        ))}
      </div>
    </div>
  );
};

export default CategorySearchPage;
