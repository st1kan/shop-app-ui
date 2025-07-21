"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import styles from "@/styles/FavoriteButton.module.scss";

interface FavoriteButtonProps {
  initialIsFavorite?: boolean;
  onToggle: (isFavorite: boolean) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ initialIsFavorite = false, onToggle }) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  const handleClick = () => {
    const newState = !isFavorite;
    setIsFavorite(newState);
    onToggle(newState);
  };

  return (
    <button className={styles.favoriteButton} onClick={handleClick}>
      <Heart
        size={20}
        fill={isFavorite ? '#8A2BE2' : 'none'}
        stroke={isFavorite ? '#8A2BE2' : 'black'}
      />
    </button>
  );
};

export default FavoriteButton;