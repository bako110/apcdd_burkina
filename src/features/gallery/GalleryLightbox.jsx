import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg'];

function isVideo(url) {
  if (!url) return false;
  const clean = url.split('?')[0].toLowerCase();
  return VIDEO_EXTENSIONS.some((ext) => clean.endsWith(ext));
}

export function GalleryLightbox({ item, onClose }) {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [item, onClose]);

  if (!item) return null;

  const video = isVideo(item.imageUrl);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <button
        aria-label="Fermer"
        className="absolute inset-0"
        onClick={onClose}
      />

      <button
        onClick={onClose}
        aria-label="Fermer"
        className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
      >
        <X className="size-6" />
      </button>

      <div className="relative z-10 flex max-h-[85vh] w-full max-w-4xl flex-col items-center">
        {video ? (
          <video
            src={item.imageUrl}
            className="max-h-[70vh] w-auto rounded-lg"
            controls
            autoPlay
          />
        ) : (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="max-h-[70vh] w-auto rounded-lg object-contain"
          />
        )}

        {(item.title || item.description) && (
          <div className="mt-4 text-center text-white">
            {item.title && <h3 className="text-lg font-semibold">{item.title}</h3>}
            {item.description && (
              <p className="mt-1 text-sm text-white/80">{item.description}</p>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
