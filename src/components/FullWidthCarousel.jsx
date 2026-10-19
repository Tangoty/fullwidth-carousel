import { useCallback, useEffect, useRef, useState } from "react";

/**
 * @typedef {Object} CarouselItem
 * @property {string} id
 * @property {string} imgUri
 */

/**
 * Full-width, performant carousel.
 *
 * @param {Object} props
 * @param {CarouselItem[]} props.items - Array of { id, imgUri }.
 * @param {boolean} [props.infinite=true] - Wrap from last item back to first.
 * @param {boolean} [props.autoscroll=true] - Advance slides automatically.
 * @param {number} [props.autoscrollInterval=15000] - ms between auto-advances.
 * @param {boolean} [props.dots=true] - Show manual selection dots.
 * @param {string} [props.className] - Extra classes for the root element.
 * @param {string} [props.imgClassName] - Extra classes for each image.
 */
export default function FullWidthCarousel({
  items = [],
  infinite = true,
  autoscroll = true,
  autoscrollInterval = 15000,
  dots = true,
  className = "",
  imgClassName = "",
}) {
  const count = items.length;
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);
  const pausedRef = useRef(false);

  const go = useCallback(
    (next) => {
      if (count === 0) return;
      if (infinite) {
        setActive((prev) => ((next % count) + count) % count);
      } else {
        setActive(Math.max(0, Math.min(count - 1, next)));
      }
    },
    [count, infinite]
  );

  const next = useCallback(() => go(active + 1), [go, active]);
  const prev = useCallback(() => go(active - 1), [go, active]);

  useEffect(() => {
    if (!autoscroll || count <= 1) return undefined;

    const tick = () => {
      if (pausedRef.current) return;
      setActive((p) =>
        infinite ? (p + 1) % count : Math.min(p + 1, count - 1)
      );
    };

    timerRef.current = setInterval(tick, autoscrollInterval);
    return () => clearInterval(timerRef.current);
  }, [autoscroll, autoscrollInterval, count, infinite, active]);

  const pause = () => { pausedRef.current = true; };
  const resume = () => { pausedRef.current = false; };

  if (count === 0) return null;

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image carousel"
    >
      <div
        className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
        style={{ transform: `translate3d(-${active * 100}%, 0, 0)` }}
      >
        {items.map((item, i) => (
          <div
            key={item.id}
            className="relative h-full w-full shrink-0 grow-0 basis-full"
            aria-hidden={i !== active}
          >
            <img
              src={item.imgUri}
              alt=""
              draggable={false}
              loading={Math.abs(i - active) <= 1 ? "eager" : "lazy"}
              decoding="async"
              className={`h-full w-full select-none object-cover ${imgClassName}`}
            />
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition hover:bg-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition hover:bg-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <ChevronRight />
          </button>
        </>
      )}

      {dots && count > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              onClick={() => go(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
