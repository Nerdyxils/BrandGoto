import React, { useState } from 'react';
import './YouTubeVideo.css';

const BRANDED_VIDEO_POSTERS: Record<string, string> = {
  '-rrCbZdHUx8': '/images/video-covers/pretty-profitable.webp',
  '_-w6CPPE7Qs': '/images/video-covers/ai-lead-workflow.webp',
  'w1CCEIsH8LY': '/images/video-covers/technical-partner.webp',
};

export interface YouTubeVideoProps {
  /** YouTube video ID (e.g. from youtu.be/xxx or youtube.com/watch?v=xxx) */
  videoId: string;
  /** Accessible title for the video */
  title: string;
  /** Optional: use teal accent instead of orange */
  accent?: 'orange' | 'teal';
  /** Optional: aspect ratio - '16:9' for standard, '9:16' for Shorts */
  aspectRatio?: '16:9' | '9:16';
  /** Optional: custom thumbnail URL override */
  thumbnailUrl?: string;
}

/**
 * Extracts video ID from various YouTube URL formats.
 */
function getVideoId(idOrUrl: string): string {
  if (idOrUrl.length <= 15 && !idOrUrl.includes('/')) return idOrUrl;
  const shortsMatch = idOrUrl.match(/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) return shortsMatch[1];
  const watchMatch = idOrUrl.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) return watchMatch[1];
  const beMatch = idOrUrl.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (beMatch) return beMatch[1];
  const embedMatch = idOrUrl.match(/embed\/([a-zA-Z0-9_-]+)/);
  if (embedMatch) return embedMatch[1];
  return idOrUrl;
}

/**
 * Custom YouTube video player with:
 * - Thumbnail overlay + custom play icon (no red button)
 * - youtube-nocookie.com for GDPR/privacy
 * - Lazy iframe load on user interaction (PageSpeed-friendly)
 */
const YouTubeVideo: React.FC<YouTubeVideoProps> = ({
  videoId,
  title,
  accent = 'orange',
  aspectRatio = '16:9',
  thumbnailUrl,
}) => {
  const id = getVideoId(videoId);
  const [isPlaying, setIsPlaying] = useState(false);
  const posterUrl = thumbnailUrl || BRANDED_VIDEO_POSTERS[id];

  const embedUrl = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;

  const handlePlay = () => setIsPlaying(true);

  const paddingBottom = aspectRatio === '9:16' ? '177.78%' : '56.25%';

  return (
    <div
      className={`youtube-video youtube-video--${accent}`}
      style={{ paddingBottom }}
    >
      {!isPlaying ? (
        <button
          type="button"
          className="youtube-video__thumbnail-btn"
          onClick={handlePlay}
          aria-label={`Play video: ${title}`}
        >
          <img
            src={posterUrl || `https://img.youtube.com/vi/${id}/hqdefault.jpg`}
            srcSet={posterUrl ? undefined : `https://img.youtube.com/vi/${id}/hqdefault.jpg 480w, https://img.youtube.com/vi/${id}/sddefault.jpg 640w, https://img.youtube.com/vi/${id}/maxresdefault.jpg 1280w`}
            sizes="(max-width: 640px) 480px, (max-width: 1280px) 640px, 1280px"
            alt=""
            className="youtube-video__thumbnail-img"
            loading="lazy"
            decoding="async"
            width="1280"
            height="720"
          />
          <span className="youtube-video__overlay" aria-hidden="true" />
          <span className="youtube-video__frame" aria-hidden="true" />
          <span className="youtube-video__cover-copy" aria-hidden="true">
            <span className="youtube-video__eyebrow">BrandGoto / Studio Film</span>
            <span className="youtube-video__cover-title">{title}</span>
            <span className="youtube-video__watch-label">Watch the film</span>
          </span>
          <span className="youtube-video__play-icon" aria-hidden="true">
            <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true">
              <rect x="1" y="1" width="78" height="78" rx="39" fill="currentColor" />
              <path d="M34 27v26l21-13-21-13z" fill="#050708" />
            </svg>
          </span>
        </button>
      ) : (
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="youtube-video__iframe"
        />
      )}
    </div>
  );
};

export default YouTubeVideo;
