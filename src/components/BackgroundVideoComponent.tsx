'use client';

import styles from '../styles/BackgroundVideoComponent.module.scss';
import { FiMoreHorizontal } from 'react-icons/fi';
import ShopOptionsModal from './ShopOptionsModal';
import { useState } from 'react';

interface Product {
  image: string;
  name: string;
  price: string;
}

interface Props {
  shop: {
    name: string;
    logo: string;
    rating: number;
    reviews: number;
    specialOffer?: string;
    promoTextContinuation?: string;
    backgroundVideo: string;
    products: Product[];
  };
}

export default function BackgroundVideoComponent({ shop }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.wrapper}>
      <video className={styles.video} src={shop.backgroundVideo} autoPlay loop muted playsInline />

      <div className={styles.overlay}>
        <div className={styles.header}>
          <div className={styles.shopInfo}>
            <img src={shop.logo} alt="Shop Logo" />
            <span>{shop.name}</span>
          </div>
          <button onClick={() => setShowModal(true)} className={styles.more}>
            <FiMoreHorizontal />
          </button>
        </div>

        <div className={styles.bottom}>
          <div className={styles.productScroll}>
            {shop.products.map((product, i) => (
              <div key={i} className={styles.productCard}>
                <img src={product.image} alt={product.name} />
                <div className={styles.nameAndPrice}>
                  <span>{product.name}</span>
                  <span className={styles.priceTag}>{product.price}</span>
                </div>
                <button className={styles.addToCartBtn}>+</button>
              </div>
            ))}
          </div>

          {shop.specialOffer && (
            <div className={styles.promoContainer}>
              <span className={styles.specialOffer}>{shop.specialOffer}</span>
              <span className={styles.promoTextContinuation}>{shop.promoTextContinuation}</span>
            </div>
          )}
        </div>
      </div>

      <ShopOptionsModal open={showModal} onClose={() => setShowModal(false)} shop={shop} />
    </div>
  );
}
