'use client';
import styles from '../styles/ShopCarousel.module.scss';
import ShopCard from './ShopCard';
import shops from '../data/shops.json';

export default function ShopCarousel() {
  return (
    <div className={styles.carousel}>
      {shops.slice(0,5).map((shop) => (
        <ShopCard key={shop.id} shop={shop} />
      ))}
    </div>
  );
}
