'use client';
import styles from '../styles/BottomNavigation.module.scss';
import {FiHome, FiSearch, FiList, FiArrowLeft, FiShoppingCart} from 'react-icons/fi';
import Link from 'next/link';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function BottomNavigation() {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { cartItems, setCartRef } = useCart();
  const [cartItems2, setCartItems2] = useState(cartItems);
  const[animateCart, setAnimateCart] = useState(false);


  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  useEffect(() => {
    setCartItems2(cartItems);
    setAnimateCart(true);
    setTimeout(() => {
      setAnimateCart(false);
    }, 1500)
  }, [cartItems])

  const isStorePage = /^\/store\/\d+/.test(pathname) || /^\/product\/\d+/.test(pathname);

  return (
    <nav className={styles.nav}>
      {isStorePage && (
        <motion.div
          initial={{opacity: 0, x: 100}} // Start with opacity 0 and move from right
          animate={{opacity: 1, x: 0}}
          exit={{opacity: 0, x: 100}} // Exit to the right
          transition={{
            opacity: {duration: 0.5},
            x: {duration: 1.5, type: 'spring'}, // Smoother spring for x
          }}
          className={styles.backButtonWrapper}>
          <button className={`${styles.button} ${styles.backButton}`} onClick={() => router.back()}>
            <FiArrowLeft />
          </button>
        </motion.div>
      )}
      <div className={styles.innerNav}>
        {pathname === '/store' && searchParams.get('shopId') ? (
          <Link
            prefetch={false}
            href={`/store/${searchParams.get('shopId')}`}
            className={`${styles.button} ${activePath === `/store/${searchParams.get('shopId')}` ? styles.selected : ''}`}
          >
            TEST
          </Link>
        ) : <></>}
        <Link
          prefetch={false}
          href="/"
          className={`${styles.button} ${activePath === '/' ? styles.selected : ''}`}
        >
          <FiHome />
        </Link>
        <Link
          prefetch={false}
          href="/search"
          className={`${styles.button} ${activePath === '/search' ? styles.selected : ''}`}
        >
          <FiSearch />
        </Link>
        <Link
          prefetch={false}
          href="/orders"
          className={`${styles.button} ${activePath === '/orders' ? styles.selected : ''}`}
        >
          <FiList />
        </Link>
      </div>
      {cartItems > 0 && (
        <motion.div
          className={`${styles.cartButtonWrapper} ${animateCart && styles.animate}`}
          initial={{opacity: 0, x: -100}} // Start with opacity 0 and move from right
          animate={{opacity: 1, x: 0}}
          exit={{opacity: 0, x: -100}} // Exit to the right
          transition={{
            opacity: {duration: 0.5},
            x: {duration: 1.5, type: 'spring'}, // Smoother spring for x
          }}
        >
          <FiShoppingCart stroke={'#d5d5d5'}/> <span style={{color: '#d5d5d5'}}>{cartItems2}</span>
        </motion.div>
      )}
    </nav>
  );
}