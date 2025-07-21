import '../styles/globals.scss';
import styles from '../styles/Layout.module.scss';
import BottomNavigation from '@/components/BottomNavigation';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {CartProvider} from "../context/CartContext";

export const metadata = {
  title: 'My App',
  description: 'Responsive web app with beautiful design',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body className={styles.layout}>
    <CartProvider>
    <main className={styles.main}>{children}<BottomNavigation/></main>
    </CartProvider>
    </body>
    </html>
  );
}
