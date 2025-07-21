'use client';

import styles from "../styles/SearchPage.module.scss";
import Categories from "./Categories";
import CategorySearchPage from "@/components/CategorySearchPage";
import shops from "@/data/shops.json";
import ViralSearchBar from "@/components/ViralSearchBar";

const SearchPage = () => {

	const CATEGORIES = [
		{ name: "Food & drinks", image: "https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/251_food_drinks.png?format=webp" },
		{ name: "Beauty", image: "https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/5_beauty.png?format=webp" },
		{ name: "Baby & toddler", image: "https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/209_baby_toddler.png?format=webp" },
		{ name: "Men", image: "https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/2_men.png?format=webp" },
		{ name: "Women", image: "https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/1_women.png?format=webp" },
		{ name: "Accessories", image: "https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/3_accessories.png?format=webp" },
		{ name: "Fitness", image: "https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/69_fitness_nutrition.png?format=webp" },
		{ name: "Home", image: "https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/6_home.png?format=webp" },
		{ name: "Pets", image: "https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/15_pet_supplies.png?format=webp" },
		{ name: "Toys & Games", image: "https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/10_toys_games.png?format=webp" }
	];

	const shopsForCategory1 = [
		shops[1],
		shops[4]
	]

	const shopsForCategory2 = [
		shops[2]
	]

	return (
		<div className={styles.searchPage}>
			<ViralSearchBar/>
      <Categories categories={CATEGORIES}/>
			<CategorySearchPage categoryName={'Category 1'} shops={shopsForCategory1}/>
			<CategorySearchPage categoryName={'Category 2'} shops={shopsForCategory2}/>
		</div>
	);
};

export default SearchPage;
