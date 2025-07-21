import React, { useEffect, useState } from "react";
import styles from "@/styles/ShopCardSearch.module.scss";

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
  brand: Shop;
};

const FeaturedBrand: React.FC<Props> = ({ brand }) => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowAnimation(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const [logoBgColor, setLogoBgColor] = useState<string>('white');
  useEffect(() => {
    if (!brand.logo) return;
    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';
    img.src = brand.logo;
    img.onload = () => {
      try {
        console.log("ucitavam")
        // @ts-ignore
        const colorThief = new (window.ColorThief || require('color-thief-browser'))();
        const color = colorThief.getColor(img);
        const yiq = (color[0] * 299 + color[1] * 587 + color[2] * 114) / 1000;
        console.log(yiq);
        setLogoBgColor(yiq >= 178 ? '#000' : '#fff');
      } catch {
        setLogoBgColor('white');
      }
    };
  }, [brand.logo]);

  return (
    <div className={styles.card}>
      <div className={styles.sliderWrapper}>
        <div key={'end'} className={`${styles.slide} ${styles.endSlide}`}>
          {brand.backgroundVideo ? (
            <div>
              <video autoPlay loop muted playsInline src={brand.backgroundVideo}></video>
              <img
                src={brand.logo}
                className={`${styles.logo} ${showAnimation ? styles.logoAnimate : ''}`}
                alt={brand.name}
              />
            </div>
          ) : (
            <div>
              <img src={brand.backgroundImage}/>
              <img
                src={brand.logo}
                className={`${styles.logo} ${showAnimation ? styles.logoAnimate : ''}`}
                alt={brand.name}
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles.shopInfo}>
        <img style={{background: `${logoBgColor}`}} src={brand.logo} alt={brand.name} className={styles.logo}/>
        <div className={styles.nameRating}>
          <div className={styles.name}>{brand.name}</div>
          <div className={styles.rating}>
            {brand.rating.toFixed(1)}
            <span className={styles.star}>★</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBrand;