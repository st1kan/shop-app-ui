'use client';

import styles from '../styles/StorePreview.module.scss';
import Image from 'next/image';
import { FiStar, FiHeart, FiChevronRight } from 'react-icons/fi';
import {useState} from "react";
import ShopOptionsModal from './ShopOptionsModal';

interface Shop {
  name: string;
  backgroundImage: string;
  logo: string;
  rating: number;
  reviews: number;
  specialOffer: string;
  products: {
    id: string;
    image: string;
    price: string;
  }[];
}

export default function StorePreview({ shop }: { shop: Shop }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.logoWrap}>
          <Image src={shop.logo} alt={`${shop.name} logo`} width={32} height={32} />
        </div>
        <div className={styles.nameRating}>
          <div className={styles.name}>{shop.name}</div>
          <div className={styles.rating}>
            {shop.rating.toFixed(1)} <FiStar className={styles.star} /> <span>({shop.reviews.toLocaleString()})</span>
          </div>
        </div>
        <div onClick={() => setModalOpen(true)} className={styles.more}>⋯</div>
      </div>

      <div className={styles.grid}>
        {shop.products.slice(0, 4).map(product => (
          <div key={product.id} onClick={() => {
            console.log("Kliknuo si")
            alert("alo")
          }} className={styles.item}>
            <img src={product.image} alt="item" className={styles.itemImage} />
            <div className={styles.price}>{product.price}</div>
            <div className={styles.heart}>
              <FiHeart />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <span>Shop all</span>
        <FiChevronRight />
      </div>

      <ShopOptionsModal open={modalOpen} onClose={() => setModalOpen(false)} shop={shop} />
    </div>
  );
}
