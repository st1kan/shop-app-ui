import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/VideoCarousel.module.scss';
import VideoFeedModal from '@/components/VideoFeedModal';

interface VideoItem {
  id: string;
  src: string;
  thumbnail?: string;
}

interface Props {
  videos: VideoItem[];
  textColor?: string;
}

export default function VideoCarousel({ videos, textColor }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [showFeed, setShowFeed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  const openModalAt = (index: number) => {
    setInitialIndex(index);
    setModalOpen(true);
    setShowFeed(true);
  };

  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const children = Array.from(container.children);
    const center = container.scrollLeft + container.offsetWidth / 2;

    const distances = children.map(child => {
      const box = (child as HTMLElement).getBoundingClientRect();
      const offset = box.left + box.width / 2 - window.innerWidth / 2;
      return Math.abs(offset);
    });

    const newIndex = distances.indexOf(Math.min(...distances));
    if (newIndex !== activeIndex) setActiveIndex(newIndex);
  };

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });
  }, [activeIndex]);

  return (
    <div className={styles.wrapper} style={{
        color: textColor,
        '--text-color': textColor,
      } as React.CSSProperties}>
      <h3 className={styles.title}>Videos</h3>
      <div
        className={styles.carousel}
        ref={containerRef}
        onScroll={handleScroll}
      >
        {videos.map((video, index) => (
          <div onClick={() => openModalAt(index)} key={video.id} className={styles.videoCard}>
            <video
              ref={el => videoRefs.current[index] = el}
              src={video.src}
              muted
              playsInline
              controls={false}
              loop
              className={styles.video}
              preload="metadata"
            />
          </div>
        ))}
      </div>
      <VideoFeedModal open={showFeed} initialIndex={initialIndex} onClose={() => setShowFeed(false)} videos={videos} />
    </div>
  );
}
