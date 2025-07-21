import React, {useEffect, useState} from 'react';
import Slider from 'react-slick';
import styles from '@/styles/ShopCardSearch.module.scss';


type Product = {
  id: string;
  name: string;
  image: string;
};

type Shop = {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  products: Product[];
  backgroundVideo: string;
  backgroundImage: string;
};

type Props = {
  shop: Shop;
};

const ShopCardSearch: React.FC<Props> = ({ shop }) => {
  const [showLogoAnimation, setShowLogoAnimation] = useState(false);

  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    pauseOnHover: true,
    afterChange: (current: number) => {
      if (current === shop.products.length) {
        setShowLogoAnimation(true);
      }
      else {
        setShowLogoAnimation(false);
      }
    },
  };

  const [logoBgColor, setLogoBgColor] = useState<string>('white');
  useEffect(() => {
    if (!shop.logo) return;
    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';
    img.src = shop.logo;
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
  }, [shop.logo]);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.sliderWrapper}>
          <Slider {...sliderSettings}>
            {shop.products.map((product) => (
              <div key={product.id} className={styles.slide}>
                <img src={product.image} alt={product.name}/>
              </div>
            ))}
            <div key={'end'} className={`${styles.slide} ${styles.endSlide}`}>
              {shop.backgroundVideo ? (
                <div>
                  <video autoPlay loop muted playsInline src={shop.backgroundVideo}></video>
                  <img
                    src={shop.logo}
                    className={`${styles.logo} ${showLogoAnimation ? styles.logoAnimate : ''}`}
                    alt={shop.name}
                  />
                </div>
              ) : (
                <div>
                  <img src={shop.backgroundImage}/>
                  <img
                    src={shop.logo}
                    className={`${styles.logo} ${showLogoAnimation ? styles.logoAnimate : ''}`}
                    alt={shop.name}
                  />
                </div>
              )}
            </div>
          </Slider>
        </div>
        <div className={styles.shopInfo}>
          <img style={{background: `${logoBgColor}`}} src={shop.logo} alt={shop.name} className={styles.logo}/>
          <div className={styles.nameRating}>
            <div className={styles.name}>{shop.name}</div>
            <div className={styles.rating}>
              {shop.rating.toFixed(1)}
              <span className={styles.star}>★</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopCardSearch;
