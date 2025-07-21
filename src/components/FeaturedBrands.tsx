"use client";

import { useState } from "react";
import styles from "@/styles/FeaturedBrands.module.scss";
import FeaturedBrand from "./FeaturedBrand";
import { motion, AnimatePresence } from "framer-motion";

interface Shop {
  id: string;
  name: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  logo: string;
  rating: number;
  reviews: number;
}

type Props = {
  brands: Shop[];
};

const FeaturedBrands: React.FC<Props> = ({ brands }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleBrands = showAll ? brands : brands.slice(0, 4);

  return (
    <div className={styles.wrapper}>
      <div className={styles.category}>Featured Brands</div>

      <motion.div
        className={styles.brands}
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <AnimatePresence>
          {visibleBrands.map((brand) => (
            <motion.div
              key={brand.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={styles.brandCardWrapper}
            >
              <FeaturedBrand key={brand.id} brand={brand} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {brands.length > 4 && (
        <button className={styles.moreButton} onClick={() => setShowAll((prev) => !prev)}>
          {showAll ? "Less" : "More"}
        </button>
      )}
    </div>
  );
};

export default FeaturedBrands;
