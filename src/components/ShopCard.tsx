'use client';

import styles from '../styles/ShopCard.module.scss';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ColorThief from 'color-thief-browser';
import { FaStar } from "react-icons/fa";

interface Shop {
  name: string;
  backgroundImage: string;
  logo: string;
  rating: number;
  reviews: number;
  specialOffer: string;
}

export default function ShopCard({ shop }: { shop: Shop }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [bgColor, setBgColor] = useState<string>('rgba(240, 232, 208, 1)');
  const [textColor, setTextColor] = useState<string>('#000');

  function getContrastColor(r: number, g: number, b: number) {
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#000' : '#fff';
  }

  useEffect(() => {
    const img = imgRef.current;

    const handleColor = () => {
      try {
        if (img && img.complete) {
          const colorThief = new ColorThief();
          const color = colorThief.getColor(img);
          console.log(color)
          setBgColor(`rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`);

          const contrast = getContrastColor(color[0], color[1], color[2]);
          setTextColor(contrast);
        }
      } catch (e) {
        console.warn('ColorThief failed:', e);
      }
    };

    if (img?.complete) {
      handleColor();
    } else {
      img?.addEventListener('load', handleColor);
      return () => img?.removeEventListener('load', handleColor);
    }
  }, []);

  return (
    <div className={styles.card}>
      <img
        ref={imgRef}
        src={shop.backgroundImage}
        alt={shop.name}
        className={styles.bgImage}
        crossOrigin="anonymous"
      />

      <div className={styles.logoWrap}>
        <Image src={shop.logo} alt="Shop logo" width={80} height={30} className={styles.logo} />
      </div>

      <div
        className={styles.bottomOverlay}
        style={{ background: `linear-gradient(to top, ${bgColor} 60%, transparent)`,
          color: textColor
      }}
      >
        <span className={styles.offer}>{shop.specialOffer}</span>
        <h4 className={styles.name}>{shop.name}</h4>
        <p className={styles.rating}>
          {shop.rating.toFixed(1)} <FaStar/> {' '}
          <span className={styles.reviewCount}>({shop.reviews.toLocaleString()})</span>
        </p>
      </div>
    </div>
  );
}
