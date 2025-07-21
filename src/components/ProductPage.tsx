// pages/product/[id].tsx (ili gde god se nalazi ProductPage)
"use client";

import { useRef, useState, useEffect } from "react";
import styles from "@/styles/ProductPage.module.scss";
import { ChevronLeft, MoreHorizontal, Share, Minus, Plus, Star } from "lucide-react"; // Uklonili smo Heart odavde
import SimpleCarousel from "@/components/SimpleCarousel";
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import Cookies from 'js-cookie';
import { FiLink } from 'react-icons/fi';

import FavoriteButton from "@/components/FavoriteButton";
import AddToCollectionModal from "@/components/AddToCollectionModal";
import ShopOptionsModal from "@/components/ShopOptionsModal";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  colors?: string[];
  shop: {
    name: string;
    logo: string;
    rating: number;
    reviews: number;
    description?: string;
    refundPolicy?: string;
    shippingPolicy?: string;
    websiteLink?: string;
  };
  counts: {
    label: string;
    multiplier: number;
    discountedPrice: number;
  }[];
  ratings: {
    average: number;
    total: number;
    distribution: {
      5: number;
      4: number;
      3: number;
      2: number;
      1: number;
    };
  };
  reviews: {
    id: string;
    author: string;
    date: string;
    rating: number;
    comment: string;
    helpfulCount?: number;
    fromWebsite?: string;
    purchaseDetails?: string;
  }[];
}

type Props = {
  product: Product;
};

const MOCK_COLLECTIONS = [
  { id: 'col1', name: 'My Wishlist' },
  { id: 'col2', name: 'Birthday Ideas' },
  { id: 'col3', name: 'For the Kitchen' },
];


const ProductPage: React.FC<Props> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [selectedCount, setSelectedCount] = useState(product.counts[0]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [showFavoriteModal, setShowFavoriteModal] = useState(false);
  const [isProductFavorite, setIsProductFavorite] = useState(false); // Da li je proizvod favorit

  const { setCartItems, cartRef } = useCart();
  const [fly, setFly] = useState<null | { x: number; y: number; top: number; left: number }>(null);
  const flyRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setMounted(true);
    // Check if product is already in favorites
  }, []);

  const handleAddToCart = () => {
    const flyEl = flyRef.current;
    const cartEl = cartRef;

    if (flyEl && cartEl) {
      const flyRect = flyEl.getBoundingClientRect();
      const cartRect = cartEl.getBoundingClientRect();

      const deltaX = cartRect.left - flyRect.left;
      const deltaY = cartRect.top - flyRect.top;

      setFly({
        x: deltaX,
        y: deltaY,
        top: flyRect.top,
        left: flyRect.left,
      });

      setTimeout(() => setFly(null), 1800);
    }

    setTimeout(() => {
      setCartItems((prev: number) => prev + 1);
    });

    const items = JSON.parse(Cookies.get('cart') || '[]');
    items.push({ id: product.id, quantity });
    Cookies.set('cart', JSON.stringify(items), { expires: 7 });
  };


  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const truncateDescription = (text: string | undefined, maxLength: number) => {
    if (!text || text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      if (i < rating) {
        stars.push(<Star key={i} size={16} fill="black" stroke="black" />);
      } else {
        stars.push(<Star key={i} size={16} stroke="black" />);
      }
    }
    return <div className={styles.starRating}>{stars}</div>;
  };

  const calculatePercentage = (count: number, total: number) => {
    if (total === 0) return 0;
    return (count / total) * 100;
  };

  const handleFavoriteToggle = (isFav: boolean) => {
    setIsProductFavorite(isFav);
    if (isFav) {
      setShowFavoriteModal(true);
    } else {
      // Logic for removing from favorites (if needed, perhaps confirm modal)
      // For now, if un-favorited, just close modal if open
      setShowFavoriteModal(false);
    }
  };

  const handleAddToCollection = (collectionId: string | 'main' | 'new', newCollectionName?: string) => {
    console.log(`Product ${product.name} (ID: ${product.id}) added to collection:`, collectionId, newCollectionName || '');
    // Call API to save favorite product to a collection
  };

  return (
    <div className={styles.wrapper}>
      {/* Sticky Header */}
      <div className={styles.header}>
        <div className={styles.left}>
          <ChevronLeft size={20}/>
          <img src={product.shop.logo} alt="Shop Logo" width={24} height={24} className={styles.logo}/>
          <div>
            <div className={styles.shopName}>{product.shop.name}</div>
            <div className={styles.rating}>
              {product.shop.rating} ★ ({product.shop.reviews.toLocaleString()})
            </div>
          </div>
        </div>
        <button onClick={() => setShowModal(true)}>
          <MoreHorizontal size={20}/>
        </button>
      </div>

      <SimpleCarousel images={product.images}/>

      <div className={styles.content}>
        {/* Title and Actions */}
        <div className={styles.titleRow}>
          <div className={styles.name}>{product.name}</div>
          <div className={styles.actions}>
            <FavoriteButton
              initialIsFavorite={isProductFavorite}
              onToggle={handleFavoriteToggle}
            />
            <Share size={20}/>
          </div>
        </div>

        {/* Price */}
        <div className={styles.price}>£{selectedCount.discountedPrice.toFixed(2)}</div>

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className={styles.colors}>
            <div className={styles.label}>Color</div>
            <div className={styles.colorOptions}>
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`${styles.color} ${selectedColor === color ? styles.selected : ""}`}
                  style={{backgroundColor: color}}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className={styles.quantity}>
          <div className={styles.label}>Quantity</div>
          <div className={styles.counter}>
            <button onClick={() => handleQuantityChange(-1)}><Minus size={14}/></button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange(1)}><Plus size={14}/></button>
          </div>
        </div>

        {/* Count Options */}
        <div className={styles.counts}>
          <div className={styles.label}>Count</div>
          <div className={styles.countsMap}>
            {product.counts.map((count) => (
              <button
                key={count.label}
                onClick={() => setSelectedCount(count)}
                className={`${styles.countOption} ${selectedCount.label === count.label ? styles.active : ""}`}
              >
                {count.label}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className={styles.buttons}>
          <button className={styles.addToCart} onClick={handleAddToCart}>
            Add to Cart
          </button>
          {fly && mounted && (
            <motion.img
              src={product.images[0]}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: fly.x, y: fly.y, opacity: 0.5, scale: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="flyImage"
              style={{
                position: 'fixed',
                top: fly.top,
                left: fly.left,
                width: 80,
                height: 80,
                zIndex: 9999,
                borderRadius: 12,
                pointerEvents: 'none',
              }}
            />
          )}
          <button className={styles.buyNow}>Buy Now</button>
        </div>
      </div>

      {/* Description, Policy Buttons, and Visit Store Button */}
      <div className={styles.infoSection}>
        {product.shop.description && (
          <div className={styles.description}>
            <h2>Description</h2>
            <p>
              {showFullDescription ? product.shop.description : truncateDescription(product.shop.description, 150)}
              {product.shop.description.length > 150 && !showFullDescription && (
                <span className={styles.readMore} onClick={() => setShowFullDescription(true)}>
                  Read more
                </span>
              )}
            </p>
          </div>
        )}

        <div className={styles.policyButtons}>
          {product.shop.refundPolicy && (
            <button className={styles.policyButton} onClick={() => alert(product.shop.refundPolicy)}>
              Refund policy
            </button>
          )}
          {product.shop.shippingPolicy && (
            <button className={styles.policyButton} onClick={() => alert(product.shop.shippingPolicy)}>
              Shipping policy
            </button>
          )}
        </div>

        {product.shop.websiteLink && (
          <button className={styles.visitStoreButton} onClick={() => window.open(product.shop.websiteLink, '_blank')}>
            <FiLink size={16} /> Visit {product.shop.name}
          </button>
        )}
      </div>

      {/* Ratings and Reviews Section */}
      {product.ratings && product.reviews && product.reviews.length > 0 && (
        <div className={styles.ratingsReviewsSection}>
          <h2>Ratings and reviews</h2>
          <div className={styles.summary}>
            <div className={styles.averageRating}>
              {product.ratings.average.toFixed(1)} <Star size={20} fill="black" stroke="black" />
            </div>
            <div className={styles.ratingDistribution}>
              {Object.entries(product.ratings.distribution)
                .sort(([a], [b]) => parseInt(b) - parseInt(a))
                .map(([stars, count]) => (
                  <div key={stars} className={styles.ratingBarRow}>
                    <span>{stars}</span>
                    <div className={styles.barContainer}>
                      <div
                        className={styles.barFill}
                        style={{ width: `${calculatePercentage(count as number, product.ratings.total)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {showAllReviews ? (
              <motion.div
                key="allReviews"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={styles.allReviewsList}
              >
                {product.reviews.map((review) => (
                  <div key={review.id} className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                      {renderStars(review.rating)}
                      <span className={styles.reviewAuthor}>{review.author}</span>
                      <span className={styles.reviewDate}>{review.date}</span>
                      <MoreHorizontal size={16} className={styles.moreIcon} />
                    </div>
                    <p className={styles.reviewComment}>{review.comment}</p>
                    {review.purchaseDetails && <p className={styles.reviewDetails}>{review.purchaseDetails}</p>}
                    {review.fromWebsite && <p className={styles.reviewDetails}>{review.fromWebsite}</p>}
                    {review.helpfulCount !== undefined && (
                      <div className={styles.reviewHelpful}>
                        <button className={styles.helpfulButton}><Minus size={14} /></button>
                        <span>Helpful ({review.helpfulCount})</span>
                        <button className={styles.helpfulButton}><Plus size={14} /></button>
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="reviewsCarousel"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={styles.reviewsCarousel}
              >
                {product.reviews.slice(0, 2).map((review) => (
                  <div key={review.id} className={styles.reviewCardCarousel}>
                    <div className={styles.reviewHeader}>
                      {renderStars(review.rating)}
                      <span className={styles.reviewAuthor}>{review.author}</span>
                      <span className={styles.reviewDate}>{review.date}</span>
                      <MoreHorizontal size={16} className={styles.moreIcon} />
                    </div>
                    <p className={styles.reviewComment}>{review.comment}</p>
                    {review.purchaseDetails && <p className={styles.reviewDetails}>{review.purchaseDetails}</p>}
                    {review.fromWebsite && <p className={styles.reviewDetails}>{review.fromWebsite}</p>}
                    {review.helpfulCount !== undefined && (
                      <div className={styles.reviewHelpful}>
                        <button className={styles.helpfulButton}><Minus size={14} /></button>
                        <span>Helpful ({review.helpfulCount})</span>
                        <button className={styles.helpfulButton}><Plus size={14} /></button>
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {product.reviews.length > 2 && (
            <button className={styles.viewAllButton} onClick={() => setShowAllReviews((prev) => !prev)}>
              {showAllReviews ? 'Show less' : 'View all'}
            </button>
          )}
        </div>
      )}

      {mounted && (
        <AddToCollectionModal
          open={showFavoriteModal}
          onClose={() => setShowFavoriteModal(false)}
          productName={product.name}
          productId={product.id}
          existingCollections={MOCK_COLLECTIONS}
          onAddToCollection={handleAddToCollection}
        />
      )}

      <ShopOptionsModal open={showModal} onClose={() => setShowModal(false)} shop={product.shop} />
    </div>
  );
};

export default ProductPage;