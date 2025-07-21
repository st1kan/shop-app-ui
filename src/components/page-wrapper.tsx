"use client";

import classNames from "classnames";
import { motion } from "framer-motion";

export const PageWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{opacity: 0, y: 100}}
      animate={{opacity: 1, y: 0}}
      exit={{opacity: 0, y: 100}}
      transition={{
        opacity: {duration: 0.5},
        y: {type: 'spring', stiffness: 60, damping: 15},
      }}
      className={className}
      style={{overflow: 'hidden'}}
    >
      {children}
    </motion.div>

  );
};