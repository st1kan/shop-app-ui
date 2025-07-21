'use client';
import styles from '@/styles/StorePage.module.scss';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import ColorThief from 'color-thief-browser';
import CollectionsListing from '@/components/CollectionsListing';
import { FiBell, FiSearch } from "react-icons/fi";
import { motion, AnimatePresence } from 'framer-motion';
import VideoCarousel from './VideoCarousel';
import ShopAdvancedOptionsModal from "@/components/ShopAdvancedOptionsModal";
import NotificationModal from "@/components/NotificationModal";

interface Product {
  image: string;
  name: string;
  price: string;
}

interface Video {
  id: string;
  src: string;
  thumbnail?: string;
}

interface Category {
  title: string;
  image: string;
  products: Product[];
}

interface Collection {
  image: string;
  title: string;
}


interface ExtendedShop {
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  backgroundImage?: string;
  backgroundVideo?: string;
  specialOffer?: string;
  promoTextContinuation?: string;
  products?: Product[];
  recentlyViewed?: Product[];
  categories?: Category[];
  collections?: Collection[];
  videos?: Video[];
  backgroundColor?: string;
  description?: string;
  refundPolicy?: string;
  shippingPolicy?: string;
  websiteLink?: string;
}

interface Props {
  shop: ExtendedShop;
}

const ProductListing = ({ products, title, textColor }: { products: Product[]; title: string; textColor: string }) => {
  return (
    <div className={styles.productSection}>
      <h3 className={styles.sectionTitle} style={{
        color: textColor,
        '--text-color': textColor,
      } as React.CSSProperties}>{title}</h3>
      <div className={styles.productGrid} style={{
        color: textColor,
        '--text-color': textColor,
      } as React.CSSProperties}>
        {products.map((product, index) => (
          <div key={`${title}-${index}`} className={styles.productCard}>
            <img src={product.image} alt={product.name} className={styles.productImage} />
            <div className={styles.productInfo}>
              <p className={styles.productName}>{product.name}</p>
              <p className={styles.productPrice}>{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RecentlyViewedListing = ({ products, title, textColor }: { products: Product[]; title: string; textColor: string }) => {
  return (
    <div className={styles.productSection + " " + styles.recentlyViewedSection}>
      <h3 className={styles.sectionTitle} style={{
        color: textColor,
        '--text-color': textColor,
      } as React.CSSProperties}>{title}</h3>
      <div className={styles.productGrid} style={{
        color: textColor,
        '--text-color': textColor,
      } as React.CSSProperties}>
        {products.map((product, index) => (
          <div key={`${title}-${index}`} className={styles.productCard}>
            <img src={product.image} alt={product.name} className={styles.productImage} />
            <div className={styles.productInfo}>
              <p className={styles.productName}>{product.name}</p>
              <p className={styles.productPrice}>{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function StorePage({ shop }: Props) {
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [bgColor, setBgColor] = useState<string>('white');
  const [textColor, setTextColor] = useState<string>('black');
  const [showModal, setShowModal] = useState(false);
  const [showSpecial, setShowSpecial] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // const[isFollowing, setIsFollowing] = useState(false);
  const [followStage, setFollowStage] = useState<'follow' | 'check' | 'bellCrossed' | 'bell'>('follow');
  const [notifModal, setNotifModal] = useState(false);

  const getContrastColor = useCallback((r: number, g: number, b: number) => {
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 178 ? '#000' : '#fff';
  }, []);

  const extractDominantColorFromImageData = useCallback((imageData: ImageData) => {
    const colorThief = new ColorThief();
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return [0, 0, 0];

    tempCanvas.width = imageData.width;
    tempCanvas.height = imageData.height;
    tempCtx.putImageData(imageData, 0, 0);

    const color = colorThief.getColor(tempCanvas);
    return color;
  }, []);

  useEffect(() => {
    const mediaElement = mediaRef.current;
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null;

    const processColor = (r: number, g: number, b: number) => {
      setBgColor(`rgb(${r}, ${g}, ${b})`);
      setTextColor(getContrastColor(r, g, b));
    };

    const handleImageColor = () => {
      if (mediaElement instanceof HTMLImageElement && mediaElement.complete) {
        try {
          const colorThief = new ColorThief();
          const color = colorThief.getColor(mediaElement);
          processColor(color[0], color[1], color[2]);
        } catch (error) {
          console.error('Error getting color from image:', error);
          setBgColor('white');
          setTextColor('black');
        }
      }
    };

    const handleVideoLoadedData = () => {
      if (mediaElement instanceof HTMLVideoElement) {
        if (!canvas) {
          canvas = document.createElement('canvas');
          ctx = canvas.getContext('2d', { willReadFrequently: true });
        }

        if (ctx && mediaElement.videoWidth && mediaElement.videoHeight) {
          const scaleFactor = 100 / mediaElement.videoWidth;
          canvas.width = 100;
          canvas.height = mediaElement.videoHeight * scaleFactor;

          ctx.drawImage(mediaElement, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const color = extractDominantColorFromImageData(imageData);
          processColor(color[0], color[1], color[2]);
        }
      }
    };

    if (mediaElement) {
      if (shop.backgroundVideo) {
        mediaElement.addEventListener('loadeddata', handleVideoLoadedData);
        if ("readyState" in mediaElement && mediaElement.readyState >= 2) {
          handleVideoLoadedData();
        }
      } else if (shop.backgroundImage) {
        if (mediaElement instanceof HTMLImageElement) {
          if (mediaElement.complete) {
            handleImageColor();
          } else {
            mediaElement.addEventListener('load', handleImageColor);
          }
        }
      }
    }

    return () => {
      if (mediaElement) {
        if (shop.backgroundVideo) {
          mediaElement.removeEventListener('loadeddata', handleVideoLoadedData);
        } else if (shop.backgroundImage) {
          if (mediaElement instanceof HTMLImageElement) {
            mediaElement.removeEventListener('load', handleImageColor);
          }
        }
      }
    };
  }, [shop.backgroundVideo, shop.backgroundImage, getContrastColor, extractDominantColorFromImageData]);

  useEffect(() => {
    setTimeout(() => {
      setShowSpecial(true);
    }, 1300);

    const color = getComputedStyle(document.documentElement).getPropertyValue('--theme-color').trim();
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', color);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollPosition(scrollY);

      const mediaHeight = wrapperRef.current?.querySelector(`.${styles.media}`)?.clientHeight || 0;
      const shopDetailsHeight = wrapperRef.current?.querySelector(`.${styles.shopDetails}`)?.clientHeight || 0;
      const threshold = mediaHeight + shopDetailsHeight - 100;

      setScroll(scrollY > threshold);

      if (scrollY > threshold) {
        setTextColor('black');
      } else {
        const rgb = bgColor.match(/\d+/g)?.map(Number) || [0, 0, 0];
        setTextColor(getContrastColor(rgb[0], rgb[1], rgb[2]));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [bgColor, getContrastColor]);

  const logoSize = Math.max(30, 50 - scrollPosition * 0.2);

  // Extract dominant color from logo image and calculate contrast color
  const [logoBgColor, setLogoBgColor] = useState<string>('white');
  useEffect(() => {
    if (!shop.logo) return;
    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';
    img.src = shop.logo;
    img.onload = () => {
      try {
        const colorThief = new ColorThief();
        const color = colorThief.getColor(img);
        const contrast = getContrastColor(color[0], color[1], color[2]);
        setLogoBgColor(contrast);
      } catch {
        setLogoBgColor('white');
      }
    };
  }, [shop.logo, getContrastColor]);

  return (
    <div
      ref={wrapperRef}
      className={`${styles.wrapper} ${showSpecial ? styles.specialOfferVisible : ''} ${scroll ? styles.scrolled : ''}`}
      style={{
        background: bgColor,
        color: textColor,
        '--bg-color': bgColor,
        '--text-color': textColor,
      } as React.CSSProperties}
    >
      <AnimatePresence>
        {scroll && (
          <motion.div
            className={styles.stickyHeader}
            initial={{ opacity: 1, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1, y: -100 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.logoDiv}>
              <img
                src={shop.logo}
                alt="logo"
                className={styles.stickyLogo}
                style={{ width: `${logoSize}px`, backgroundColor: logoBgColor }}
              />
              {shop.name}
            </div>
            <div className={styles.stickyActions}>
              <AnimatePresence mode="wait">
                {followStage === 'follow' && (
                  <motion.button
                    key="follow"
                    initial={{opacity: 0, width: 40}}
                    animate={{opacity: 1, width: 70}}
                    exit={{opacity: 0, width: 40}}
                    transition={{duration: 0.2}}
                    className={styles.followBtn}
                    onClick={() => setFollowStage('check')}
                  >
                    Follow
                  </motion.button>
                )}

                {followStage === 'check' && (
                  <motion.button
                    key="check"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.3}}
                    onAnimationComplete={() => setTimeout(() => setFollowStage('bellCrossed'), 300)} // Sekvencijalno
                  >
                    <motion.svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.path
                        d="M20 6L9 17L4 12"
                        variants={{
                          hidden: {pathLength: 0, opacity: 0},
                          visible: {
                            pathLength: 1,
                            opacity: 1,
                            transition: {duration: 0.3, ease: "easeInOut"},
                          },
                        }}
                      />
                    </motion.svg>
                  </motion.button>
                )}

                {followStage === 'bellCrossed' && (
                  <motion.button
                    key="bellCrossed"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.2}}
                    onClick={() => setNotifModal(true)}
                  >
                    <div className={styles.bellWrapper}>
                      <FiBell size={20}/>
                      <motion.div
                        style={{backgroundColor: '#000'}}
                        className={styles.crossLine}
                        initial={{scaleX: 0, rotateZ: -45}}
                        animate={{scaleX: 1, rotateZ: -45}}
                        exit={{scaleX: 0, rotateZ: -45}}
                        transition={{duration: 0.3}}
                      />
                    </div>
                  </motion.button>
                )}

                {followStage === 'bell' && (
                  <motion.button
                    key="bell"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.2}}
                    onClick={() => setNotifModal(true)}
                  >
                    <div className={styles.bellWrapper}>
                      <FiBell size={20}/>
                    </div>
                  </motion.button>
                )}
              </AnimatePresence>

              <button><FiSearch/></button>
              <button onClick={() => setShowModal(true)}><FiMoreHorizontal/></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {shop.specialOffer && (
        <div className={`${styles.specialOffer} ${showSpecial ? styles.visible : ''}`}>
          <span>{shop.specialOffer}</span> {shop.promoTextContinuation}
        </div>
      )}

      {shop.backgroundVideo ? (
        <video
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          src={shop.backgroundVideo}
          className={styles.media}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img
          ref={mediaRef as React.RefObject<HTMLImageElement>}
          src={shop.backgroundImage}
          className={styles.media}
          alt="background"
          crossOrigin="anonymous"
        />
      )}

      <div className={styles.overlay}>
        <motion.img
          src={shop.logo}
          alt="logo"
          style={{
            width: `${Math.max(20, 50 - scrollPosition * 0.1)}%`,
            transition: 'width 0.3s ease'
          }}
          animate={{
            opacity: scroll ? 0 : 1,
            scale: scroll ? 0.8 : 1
          }}
        />
      </div>

      <div className={styles.shopDetails}>
        <div className={styles.shopMeta}>
          <div>
            <h1>{shop.name}</h1>
            <p>{shop.rating.toFixed(1)} ★ ({shop.reviews.toLocaleString()})</p>
          </div>
          <div className={styles.actions}>
            <AnimatePresence mode="wait">
              {followStage === 'follow' && (
                <motion.button
                  key="follow"
                  initial={{opacity: 0, width: 40}}
                  animate={{opacity: 1, width: 70}}
                  exit={{opacity: 0, width: 40}}
                  transition={{duration: 0.2}}
                  className={styles.followBtn}
                  onClick={() => setFollowStage('check')}
                >
                  Follow
                </motion.button>
              )}

              {followStage === 'check' && (
                <motion.button
                  key="check"
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  transition={{duration: 0.3}}
                  onAnimationComplete={() => setTimeout(() => setFollowStage('bellCrossed'), 300)} // Sekvencijalno
                >
                  <motion.svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.path
                      d="M20 6L9 17L4 12"
                      variants={{
                        hidden: {pathLength: 0, opacity: 0},
                        visible: {
                          pathLength: 1,
                          opacity: 1,
                          transition: {duration: 0.3, ease: "easeInOut"},
                        },
                      }}
                    />
                  </motion.svg>
                </motion.button>
              )}

              {followStage === 'bellCrossed' && (
                <motion.button
                  key="bellCrossed"
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  transition={{duration: 0.2}}
                  onClick={() => setNotifModal(true)}
                >
                  <div className={styles.bellWrapper}>
                  <FiBell size={20}/>
                    <motion.div
                      className={styles.crossLine}
                      initial={{scaleX: 0, rotateZ: -45}}
                      animate={{scaleX: 1, rotateZ: -45}}
                      exit={{scaleX: 0, rotateZ: -45}}
                      transition={{duration: 0.3}}
                    />
                  </div>
                </motion.button>
              )}

              {followStage === 'bell' && (
                <motion.button
                  key="bell"
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  transition={{duration: 0.2}}
                  onClick={() => setNotifModal(true)}
                >
                  <div className={styles.bellWrapper}>
                    <FiBell size={20}/>
                  </div>
                </motion.button>
              )}
            </AnimatePresence>

            <button><FiSearch/></button>
            <button onClick={() => setShowModal(true)}><FiMoreHorizontal/></button>
          </div>

        </div>
      </div>

      <div className={styles.productListings}>
        {shop.recentlyViewed && shop.recentlyViewed.length > 0 && (
          <RecentlyViewedListing products={shop.recentlyViewed} textColor={textColor} title="Recently viewed"/>
        )}

        {shop.collections && shop.collections.length > 0 && (
          <CollectionsListing collections={shop.collections} textColor={textColor}/>
        )}

        {shop.videos && shop.videos.length > 0 && (
          <VideoCarousel videos={shop.videos} textColor={textColor}/>
        )}

        {shop.products && shop.products.length > 0 && (
          <ProductListing products={shop.products} textColor={textColor} title={`Shop ${shop.name}`}/>
        )}

        {shop.categories && shop.categories.map((category) => (
          <ProductListing
            key={category.title}
            products={category.products}
            title={category.title}
            textColor={textColor}
          />
        ))}
      </div>

      <ShopAdvancedOptionsModal open={showModal} onClose={() => setShowModal(false)} shop={shop}/>
      <NotificationModal open={notifModal} onClose={() => setNotifModal(false)} shop={shop} followStage={followStage} setFollowStage={setFollowStage}/>
    </div>
  );
}