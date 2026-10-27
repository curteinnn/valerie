import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useHomeMotion() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add(
        {
          desktop:
            "(min-width: 701px) and (prefers-reduced-motion: no-preference)",
          mobile:
            "(max-width: 700px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const isMobile = context.conditions.mobile;
          gsap.from(".hero-word", {
            // opacity: 0,
            y: 28,
            duration: 1.1,
            ease: "power3.out",
          });
          gsap.to(".hero-word", {
            yPercent: isMobile ? -12 : -24,
            scale: isMobile ? 0.94 : 0.88,
            opacity: 0.56,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
          gsap.utils.toArray(".collage-card").forEach((card) => {
            const speed = card.dataset.speed;
            const travel =
              speed === "fast" ? -190 : speed === "medium" ? -120 : -65;
            gsap.to(card, {
              y: isMobile ? travel * 0.48 : travel,
              rotate: speed === "fast" ? 2.5 : -1.5,
              scale: speed === "slow" ? 1.035 : 1,
              ease: "none",
              scrollTrigger: {
                trigger: ".collage-stage",
                start: "top bottom",
                end: "bottom top",
                scrub: speed === "fast" ? 0.55 : 1.2,
              },
            });
          });
          gsap.from(".collage-card .card-art", {
            autoAlpha: 0,
            clipPath: "inset(0 0 16%)",
            duration: 0.8,
            stagger: 0.14,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".collage-stage",
              start: "top 72%",
              once: true,
            },
          });

          gsap.utils.toArray(".stagger-title").forEach((title) => {
            const words = title.querySelectorAll(".word-shell");
            if (!words.length) return;
            gsap.from(words, {
              y: 80,
              autoAlpha: 0,
              duration: 0.72,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: title,
                start: "top 82%",
                once: true,
              },
            });
          });

          const revealGroups = new Map();
          gsap.utils.toArray(".reveal").forEach((element) => {
            const parent = element.parentElement;
            const group = revealGroups.get(parent) ?? [];
            group.push(element);
            revealGroups.set(parent, group);
          });
          revealGroups.forEach((elements, parent) => {
            gsap.from(elements, {
              y: 42,
              autoAlpha: 0,
              duration: 0.82,
              stagger: elements.length > 1 ? 0.16 : 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: parent,
                start: "top 84%",
                once: true,
              },
            });
          });
        },
      );
      return () => media.revert();
    }, root);
    return () => ctx.revert();
  }, []);

  return root;
}
