'use client';

import styles from '../styles/ShopOptionsModal.module.scss';
import { useEffect, useState } from 'react';
import { FiX, FiHome, FiPlus, FiThumbsDown, FiAlertCircle } from 'react-icons/fi';

interface Props {
  open: boolean;
  onClose: () => void;
  shop: {
    name: string;
    logo: string;
    rating: number;
    reviews: number;
    slogan: string;
  };
}

export default function ShopAdvancedOptionsModal({ open, onClose, shop }: Props) {
  const [shouldRender, setShouldRender] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      document.body.style.overflow = 'hidden';

      requestAnimationFrame(() => {
        setAnimateIn(true);
      });
    } else {
      setAnimateIn(false);
      document.body.style.overflow = '';
    }
  }, [open]);

  const handleAnimationEnd = () => {
    if (!animateIn) {
      setShouldRender(false);
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains(styles.backdrop)) {
      setAnimateIn(false); // pokreće zatvaranje
    }
  };

  // Extract dominant color from logo image and calculate contrast color
  const [logoBgColor, setLogoBgColor] = useState<string>('white');
  useEffect(() => {
    if (!shop.logo) return;
    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';
    img.src = shop.logo;
    img.onload = () => {
      try {
        // @ts-ignore
        const colorThief = new (window.ColorThief || require('color-thief-browser'))();
        const color = colorThief.getColor(img);
        const yiq = (color[0] * 299 + color[1] * 587 + color[2] * 114) / 1000;
        setLogoBgColor(yiq >= 178 ? '#000' : '#fff');
      } catch {
        setLogoBgColor('white');
      }
    };
  }, [shop.logo]);

  if (!shouldRender) return null;

  return (
    <div
      className={`${styles.backdrop} ${animateIn ? styles.backdropShow : styles.backdropHide}`}
      onClick={handleBackdropClick}
      onAnimationEnd={handleAnimationEnd}
    >
      <div
        className={`${styles.modal} ${animateIn ? styles.modalShow : styles.modalHide}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <div className={styles.logo}>
            <img src={shop.logo} alt="logo" style={{backgroundColor: `${logoBgColor}`}} />
          </div>
          <div>
            <div className={styles.name}>{shop.name}</div>
            <div className={styles.rating}>
              {shop.rating.toFixed(1)} ★ ({shop.reviews.toLocaleString()})
            </div>
          </div>
          <button onClick={() => setAnimateIn(false)} className={styles.closeBtn}><FiX /></button>
        </div>

        <div className={styles.slogan}>{shop.slogan}</div>
        <div className={styles.option}><FiHome /> Contact {shop.name}</div>
        <div className={styles.option}><FiPlus /> Visit online store</div>
        <div className={styles.option}><FiThumbsDown /> Share</div>
        <div className={styles.option}><FiThumbsDown /> Refund policy</div>
        <div className={styles.option}><FiThumbsDown /> Privacy policy</div>
        <div className={styles.option}><FiThumbsDown /> Terms and conditions</div>
      </div>
    </div>
  );
}
