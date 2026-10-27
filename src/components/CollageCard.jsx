import { useLayoutEffect, useRef } from "react";
import Draggable from "draggable";
import gsap from "gsap";

export default function CollageCard({ card, index }) {
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    const element = cardRef.current;
    if (!element) return undefined;
    const velocity = { x: 0, y: 0, lastX: 0, lastY: 0, lastTime: 0 };
    const bounds = element.parentElement;

    const trackVelocity = (x, y) => {
      const now = performance.now();
      const elapsed = Math.max(now - velocity.lastTime, 1);
      const sampleX = (x - velocity.lastX) / elapsed;
      const sampleY = (y - velocity.lastY) / elapsed;
      velocity.x = velocity.x * 0.55 + sampleX * 0.45;
      velocity.y = velocity.y * 0.55 + sampleY * 0.45;
      velocity.lastX = x;
      velocity.lastY = y;
      velocity.lastTime = now;
    };

    const keepInBounds = (value, size, limit) =>
      Math.min(Math.max(value, 0), Math.max(limit - size, 0));

    const draggable = new Draggable(element, {
      threshold: 4,
      setPosition: false,
      setCursor: false,
      useGPU: false,
      limit: bounds,
      onDragStart: (_element, x, y) => {
        gsap.killTweensOf(element, "left,top");
        element.classList.add("is-dragging");
        velocity.x = 0;
        velocity.y = 0;
        velocity.lastX = x;
        velocity.lastY = y;
        velocity.lastTime = performance.now();
      },
      onDrag: (_element, x, y) => trackVelocity(x, y),
      onDragEnd: (_element, x, y) => {
        element.classList.remove("is-dragging");
        const speed = Math.hypot(velocity.x, velocity.y);
        if (speed < 0.08) return;

        const duration = Math.min(1.05, 0.28 + speed * 0.42);
        const distanceFactor = duration * 450;
        const targetX = keepInBounds(
          x + velocity.x * distanceFactor,
          element.offsetWidth,
          bounds.clientWidth,
        );
        const targetY = keepInBounds(
          y + velocity.y * distanceFactor,
          element.offsetHeight,
          bounds.clientHeight,
        );

        gsap.to(element, {
          left: targetX,
          top: targetY,
          duration,
          ease: "power3.out",
          overwrite: "auto",
        });
      },
    });

    return () => {
      draggable.destroy();
      gsap.killTweensOf(element, "left,top");
      element.classList.remove("is-dragging");
    };
  }, []);

  return (
    <article
      ref={cardRef}
      className={`collage-card card-${index + 1} ${card.shape}`}
      data-speed={card.speed}
    >
      <div
        className={`card-art tone-${card.tone}`}
        role="img"
        aria-label={card.title}
      >
        <span className="art-grain" aria-hidden="true" />
        <span className="art-cross" aria-hidden="true">
          ✳
        </span>
        <span className="art-note">{card.note} / V.</span>
        <span className="art-placeholder">{card.title}</span>
      </div>
      <div className="card-caption">
        <span>{card.label}</span>
        <span>VALERIE — {card.note}</span>
      </div>
    </article>
  );
}
