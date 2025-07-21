import styles from "@/styles/SimpleCarousel.module.scss";

type Props = {
  images: string[];
};

const SimpleCarousel: React.FC<Props> = ({ images }) => {
  return (
    <div className={styles.carousel}>
      {images.map((img, idx) => (
        <div key={idx} className={styles.slide}>
          <img src={img} alt={`Product image ${idx + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default SimpleCarousel;
