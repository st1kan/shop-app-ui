'use client';

import styles from '../styles/BackgroundVideoComponent.module.scss';
import styles1 from "../styles/StorePreview.module.scss";
import {FiHeart, FiMoreHorizontal} from 'react-icons/fi';
import ShopOptionsModal from './ShopOptionsModal';
import React, { useState } from 'react';
import {FaArrowRight} from "react-icons/fa6";
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
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
    products: Product[];
    id: number;
  };
}

export default function BackgroundVideoComponentV3({ shop }: Props) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

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
          <div className={styles1.grid}>
            {shop.products.slice(0, 4).map(product => (
              <div key={product.id} onClick={() => {
                router.push(`/product/${product.id}`);
              }} className={styles1.item}>
                <img src={product.image} alt="item" className={styles1.itemImage}/>
                <div className={styles1.price}>{product.price}</div>
                <div className={styles1.heart}>
                  <FiHeart/>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.callToAction}>
            {shop.callToActionText}
            <button onClick={() => router.push(`/store/${shop.id}`)} className={styles.arrow}><FaArrowRight/></button>
          </div>

          {shop.specialOffer && (
            <div className={styles.promoContainer}>
              <span className={styles.specialOffer}>{shop.specialOffer}</span>
              <span className={styles.promoTextContinuation}>{shop.promoTextContinuation}</span>
            </div>
          )}
        </div>
      </div>

      <ShopOptionsModal open={showModal} onClose={() => setShowModal(false)} shop={shop}/>
    </div>
  );
}