"use client";

import { useEffect, useState, useRef } from 'react';
import styles from '@/styles/AddToCollectionModal.module.scss';
import { FiX, FiHeart, FiPlus, FiFolder, FiCheckCircle } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  open: boolean;
  onClose: () => void;
  productName: string;
  productId: string;
  existingCollections?: { id: string; name: string }[];
  onAddToCollection: (collectionId: string | 'main' | 'new', newCollectionName?: string) => void;
}

export default function AddToCollectionModal({
                                               open,
                                               onClose,
                                               productName,
                                               productId,
                                               existingCollections = [],
                                               onAddToCollection,
                                             }: Props) {
  const [shouldRender, setShouldRender] = useState(false);
  const [showNewCollectionInput, setShowNewCollectionInput] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const successTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      document.body.style.overflow = 'hidden';
      // Clear any previous success message
      setSuccessMessage(null);
      // Clear previous timeout if it exists
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
        successTimeoutRef.current = null;
      }
    } else {
      document.body.style.overflow = '';
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
        successTimeoutRef.current = null;
      }
    }

    return () => {
      if (!open) {
        document.body.style.overflow = '';
      }
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, [open]);


  const handleBackdropClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains(styles.backdrop)) {
      onClose();
    }
  };

  const handleAddToMain = () => {
    setSuccessMessage(`'${productName}' added to Main Collection!`);
    onAddToCollection('main');
    successTimeoutRef.current = setTimeout(() => {
      onClose();
    }, 1000);
  };

  const handleCreateNew = () => {
    if (newCollectionName.trim()) {
      setSuccessMessage(`'${productName}' added to '${newCollectionName}'!`);
      onAddToCollection('new', newCollectionName.trim());
      successTimeoutRef.current = setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  const handleMoveToExisting = (collectionId: string, collectionName: string) => {
    setSuccessMessage(`'${productName}' moved to '${collectionName}'!`);
    onAddToCollection(collectionId);
    successTimeoutRef.current = setTimeout(() => {
      onClose();
    }, 1000);
  };

  if (!shouldRender && !open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.backdrop}
          onClick={handleBackdropClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, type: 'tween', ease: 'easeOut' }}
          >
            <div className={styles.header}>
              <h3>Add to Favorites</h3>
              <button onClick={onClose} className={styles.closeBtn}><FiX /></button>
            </div>

            {successMessage ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={styles.successMessage}
              >
                <FiCheckCircle size={20} color="#28a745" /> {successMessage}
              </motion.div>
            ) : (
              <>
                <div className={styles.option} onClick={handleAddToMain}>
                  <FiHeart /> Main Collection
                </div>

                <div className={styles.option} onClick={() => setShowNewCollectionInput(!showNewCollectionInput)}>
                  <FiPlus /> Create new collection
                </div>

                {showNewCollectionInput && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className={styles.newCollectionInputContainer}
                  >
                    <input
                      type="text"
                      placeholder="New collection name"
                      value={newCollectionName}
                      onChange={(e) => setNewCollectionName(e.target.value)}
                      className={styles.inputField}
                    />
                    <button onClick={handleCreateNew} className={styles.createBtn}>Create & Add</button>
                  </motion.div>
                )}

                {existingCollections.length > 0 && (
                  <div className={styles.existingCollections}>
                    <h4>Move to existing collection:</h4>
                    {existingCollections.map((collection) => (
                      <div
                        key={collection.id}
                        className={styles.option}
                        onClick={() => handleMoveToExisting(collection.id, collection.name)}
                      >
                        <FiFolder /> {collection.name}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}