import React, { useState } from "react";
import styles from "@/styles/Categories.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {Props} from "next/script";

const INITIAL_COUNT = 8;

interface Category {
  name: string;
  image: string;
}

type Props = {
  categories: Category[];
};

const Categories: React.FC<Props> = ({ categories }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.grid}
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {categories.map((category, idx) => (
          <AnimatePresence key={category.name}>
            {showAll || idx < INITIAL_COUNT ? (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={styles.card}
                style={{ backgroundImage: `url(${category.image})` }}
              >
                <Link className={styles.overlay} href={`/category/${category.name}`}>
                  <span className={styles.text}>{category.name}</span>
                </Link>
              </motion.div>
            ) : null}
          </AnimatePresence>
        ))}
      </motion.div>

      <motion.button
        className={styles.toggleButton}
        onClick={() => setShowAll(!showAll)}
        whileTap={{ scale: 0.95 }}
        initial={false}
        animate={{
          y: showAll ? -4 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {showAll ? "Less" : "More"}
      </motion.button>
    </div>
  );
};

export default Categories;