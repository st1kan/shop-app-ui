import { useRef, useState, useLayoutEffect, useEffect } from 'react';
import styles from '@/styles/VideoFeedModal.module.scss';
import { FiX, FiShoppingCart, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  rating: number;
  reviews: number;
}

interface VideoItem {
  id: string;
  src: string;
  shopName: string;
  shopLogo: string;
  isFollowing: boolean;
  product: Product;
}

interface Props {
  open: boolean;
  initialIndex: number;
  videos: VideoItem[];
  onClose: () => void;
}

export default function VideoFeedModal({ open, videos, initialIndex, onClose }: Props) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [muted, setMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [favorited, setFavorited] = useState(false);

  // Scroll to the correct video immediately when modal opens
  useLayoutEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: initialIndex * window.innerHeight,
        behavior: 'auto'
      });
      setActiveIndex(initialIndex);
    }
  }, [open, initialIndex]);

  // Update videoRefs to always match length of videos
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);
  }, [videos]);

  // Play/Pause videos depending on activeIndex
  useEffect(() => {
    if (!open) return;

    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i === activeIndex) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });
  }, [activeIndex, open]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const index = Math.round(e.currentTarget.scrollTop / window.innerHeight);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const [logoBgColor, setLogoBgColor] = useState<string>('white');
  useEffect(() => {
    if (!videos[activeIndex].shopLogo) return;
    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';
    img.src = videos[activeIndex].shopLogo;
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
  }, [videos[activeIndex].shopLogo]);

  if (!open) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.scrollContainer} ref={scrollRef} onScroll={handleScroll}>
        {videos.map((video, index) => (
          <div key={video.id} className={styles.videoWrapper}>
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={video.src}
              muted={muted}
              loop
              playsInline
              className={styles.video}
            />

            <div className={styles.overlay}>

              <div className={styles.bottomRight}>
                <img src={video.shopLogo} className={styles.shopLogo} alt="logo" style={{backgroundColor: logoBgColor}} />
                <button onClick={() => setMuted(!muted)} className={styles.soundBtn}>
                  {muted ? <FiVolumeX /> : <FiVolume2 />}
                </button>
              </div>

              <div className={styles.left}>
                <div className={styles.nameAndFollow}>
                  <p className={styles.shopName}>{video.shopName}</p>
                  <button className={styles.followBtn}>
                    {video.isFollowing ? 'Following' : 'Follow'}
                  </button>
                </div>
                <div className={styles.productBox}>
                  <img src={video.product.image} alt={video.product.name}/>
                  <div className={styles.productInfo}>
                    <p className={styles.productName}>{video.product.name}</p>
                    <p className={styles.productMeta}>
                      {video.product.rating.toFixed(1)} ★ ({video.product.reviews}) <br/>
                      {video.product.price}
                    </p>
                  </div>
                  <motion.button
                    className={styles.favBtn}
                    onClick={() => setFavorited(!favorited)}
                    whileTap={{scale: 0.8}}
                    animate={{
                      scale: [1, 1.4, 1],
                      color: favorited ? "#e0245e" : "#555",
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    {favorited ? <AiFillHeart/> : <AiOutlineHeart/>}
                  </motion.button>
                </div>
              </div>

              <div className={styles.bottomBar}>
                <button onClick={onClose}><FiX/></button>
                <button><FiShoppingCart/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
