import styles from '@/styles/CollectionsListing.module.scss';

interface Collection {
  image: string;
  title: string;
}

interface Props {
  collections: Collection[];
  textColor: string;
}

export default function CollectionsListing({ collections, textColor }: Props) {
  return (
    <div className={styles.collectionsSection}>
      <h3 className={styles.sectionTitle} style={{ color: textColor }}>Collections</h3>
      <div className={styles.collectionGrid} style={{ color: textColor }}>
        {collections.map((collection, index) => (
          <div key={index} className={styles.collectionCard}>
            <img src={collection.image} alt={collection.title} className={styles.collectionImage} />
            <p className={styles.collectionTitle}>{collection.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
