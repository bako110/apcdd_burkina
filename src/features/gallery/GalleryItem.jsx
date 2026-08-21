const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg'];

function isVideo(url) {
  if (!url) return false;
  const clean = url.split('?')[0].toLowerCase();
  return VIDEO_EXTENSIONS.some((ext) => clean.endsWith(ext));
}

export function GalleryItem({ item, onOpen }) {
  const video = isVideo(item.imageUrl);

  return (
    <button
      type="button"
      onClick={() => onOpen?.(item)}
      className="group relative block w-full overflow-hidden rounded-2xl border border-subtle bg-surface-elevated text-left shadow-elevated"
    >
      <div className="aspect-square w-full overflow-hidden bg-surface-sunken">
        {video ? (
          <video
            src={item.imageUrl}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={item.imageUrl}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="text-sm font-semibold text-white">{item.title}</h3>
        {item.description && (
          <p className="mt-1 line-clamp-2 text-xs text-white/85">{item.description}</p>
        )}
      </div>
    </button>
  );
}
