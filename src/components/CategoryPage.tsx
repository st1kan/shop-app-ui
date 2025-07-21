'use client';

import styles from "../styles/SearchPage.module.scss";
import Categories from "./Categories";
import CategorySearchPage from "@/components/CategorySearchPage";
import shops from "@/data/shops.json";
import FeaturedBrands from "@/components/FeaturedBrands";


interface Category {
  name: string;
  image: string;
}

interface Props {
  categories: Category[];
}

const shopsForSubCategory1 = [
  shops[1],
  shops[4]
]

const featuredBrands = [
  shops[1],
  shops[4],
  shops[5],
  shops[6],
  shops[2]
]

const shopsForSubCategory2 = [
  shops[2]
]

const CategoryPage:React.FC<Props> = ({categories}) => {
  return (
    <div className={styles.searchPage}>
      <Categories categories={categories}/>
      <FeaturedBrands brands={featuredBrands} categoryName={'SubCategory 1'}/>
      <CategorySearchPage categoryName={'SubCategory 1'} shops={shopsForSubCategory1}/>
      <CategorySearchPage categoryName={'SubCategory 2'} shops={shopsForSubCategory2}/>
    </div>
  );
};

export default CategoryPage;
