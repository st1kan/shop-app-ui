"use client";

import { useState, useEffect } from "react";
import styles from "@/styles/ViralSearchBar.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

const viralSearches = [
  "Office chairs with back support",
  "Minimalist desk setups",
  "Standing desks trending",
  "Ergonomic mouse pads",
  "Wireless LED lamps",
];

const changeInterval = 3000;

const ViralSearchBar = () => {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (input) return; // Pause if user is typing

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % viralSearches.length);
    }, changeInterval);

    return () => clearInterval(interval);
  }, [input]);

  return (
    <div className={styles.wrapper}>
      <Search size={18} className={styles.icon} />
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={styles.input}
      />
      {!input && (
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={styles.placeholder}
          >
            {viralSearches[index]}
          </motion.span>
        </AnimatePresence>
      )}
    </div>
  );
};

export default ViralSearchBar;
