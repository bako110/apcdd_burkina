import { useEffect, useRef, useState } from 'react';

export function Counter({ target = 0, duration = 1500, className }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const isVisible = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (target <= 0) {
      setValue(0);
      return;
    }

    let cancelled = false;
    let raf;

    const startAnimation = () => {
      const start = performance.now();
      const step = (now) => {
        if (cancelled) return;
        const progress = Math.min((now - start) / duration, 1);
        setValue(Math.floor(progress * target));
        if (progress < 1) raf = requestAnimationFrame(step);
        else setValue(target);
      };
      raf = requestAnimationFrame(step);
    };

    if (isVisible.current) {
      startAnimation();
    } else {
      const el = ref.current;
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startAnimation();
            observer.disconnect();
          }
        },
        { threshold: 0.4 },
      );
      observer.observe(el);
      return () => observer.disconnect();
    }

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString('fr-FR')}
    </span>
  );
}
