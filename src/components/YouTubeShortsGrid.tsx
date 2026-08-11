import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import YouTubeVideo from './YouTubeVideo';
import './YouTubeShortsGrid.css';

export interface ShortItem {
  videoId: string;
  title: string;
}

const DEFAULT_SHORTS: ShortItem[] = [
  { videoId: '-rrCbZdHUx8', title: 'Pretty vs. Profitable — GTM Infrastructure' },
  { videoId: 'w1CCEIsH8LY', title: 'Not Most Agencies — Brandgoto Studio' },
];

interface YouTubeShortsGridProps {
  shorts?: ShortItem[];
  /** Optional: show CTA below grid */
  showCta?: boolean;
}

const YouTubeShortsGrid: React.FC<YouTubeShortsGridProps> = ({
  shorts = DEFAULT_SHORTS,
  showCta = true,
}) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  return (
    <section className="youtube-shorts-grid" aria-label="Building in Public — Latest Shorts">
      <div className="youtube-shorts-grid__inner">
        <motion.div
          className="youtube-shorts-grid__header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="youtube-shorts-grid__subtitle">Social Proof</span>
          <h2 className="youtube-shorts-grid__title">Building in Public</h2>
          <p className="youtube-shorts-grid__desc">
            We ship fast, document the process, and share what we learn. See our latest work and thinking.
          </p>
        </motion.div>

        <motion.div
          className="youtube-shorts-grid__grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {shorts.map((short, i) => (
            <motion.div
              key={`${short.videoId}-${i}`}
              className="youtube-shorts-grid__item"
              variants={fadeInUp}
            >
              <div className="youtube-shorts-grid__video-wrap">
                <YouTubeVideo
                  videoId={short.videoId}
                  title={short.title}
                  accent={i % 2 === 0 ? 'teal' : 'orange'}
                  aspectRatio="9:16"
                />
              </div>
              <p className="youtube-shorts-grid__item-title">{short.title}</p>
            </motion.div>
          ))}
        </motion.div>

        {showCta && (
          <motion.div
            className="youtube-shorts-grid__cta"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Link
              to="/book-consultation"
              className="youtube-shorts-grid__cta-btn"
              aria-label="Strategic GTM Audit"
            >
              Strategic GTM Audit
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default YouTubeShortsGrid;
