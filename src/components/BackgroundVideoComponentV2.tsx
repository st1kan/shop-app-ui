'use client';

import styles from '../styles/BackgroundVideoComponent.module.scss';
import ShopOptionsModal from './ShopOptionsModal';
import { useState } from 'react';
import { FaArrowRight } from "react-icons/fa6";

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
    callToActionText: string;
  };
}

export default function BackgroundVideoComponentV2({ shop }: Props) {
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
        </div>

        <div className={styles.bottom}>
          <div className={styles.callToAction}>
            {shop.callToActionText}
            <button className={styles.arrow}><FaArrowRight /></button>
          </div>
        </div>
      </div>

      <ShopOptionsModal open={showModal} onClose={() => setShowModal(false)} shop={shop} />
    </div>
  );
}
