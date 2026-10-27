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
          const horizontalTrack = root.current?.querySelector(".horizontal-track");
          let horizontalTween;
          if (!isMobile && horizontalTrack) {
            horizontalTween = gsap.to(horizontalTrack, {
              x: () => -(horizontalTrack.scrollWidth - window.innerWidth),
              ease: "none",
              scrollTrigger: {
                id: "valerie-horizontal-panels",
                trigger: ".horizontal-scroll",
                start: "top top",
                end: () => `+=${horizontalTrack.scrollWidth - window.innerWidth}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                anticipatePin: 1,
              },
            });
          }

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
            const isHorizontalPanel = Boolean(title.closest(".horizontal-track"));
            gsap.from(words, {
              y: 80,
              autoAlpha: 0,
              duration: 0.72,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: title,
                ...(isHorizontalPanel && horizontalTween
                  ? { containerAnimation: horizontalTween, start: "left 82%" }
                  : { start: "top 82%" }),
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
            const isHorizontalPanel = Boolean(parent.closest(".horizontal-track"));
            gsap.from(elements, {
              y: 42,
              autoAlpha: 0,
              duration: 0.82,
              stagger: elements.length > 1 ? 0.16 : 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: parent,
                ...(isHorizontalPanel && horizontalTween
                  ? { containerAnimation: horizontalTween, start: "left 84%" }
                  : { start: "top 84%" }),
                once: true,
              },
            });
          });

          const handleHorizontalAnchor = (event) => {
            const clicked = event.target instanceof Element
              ? event.target.closest('a[href^="#"]')
              : null;
            const href = clicked?.getAttribute("href");
            const target = href ? document.querySelector(href) : null;
            const panel = target?.closest(".horizontal-track > section");
            const panels = horizontalTrack
              ? Array.from(horizontalTrack.children)
              : [];
            if (!panel || !horizontalTween?.scrollTrigger) return;

            event.preventDefault();
            const panelIndex = panels.indexOf(panel);
            const trigger = horizontalTween.scrollTrigger;
            const progress = panelIndex / Math.max(panels.length - 1, 1);
            history.pushState(null, "", href);
            window.scrollTo({
              top: trigger.start + (trigger.end - trigger.start) * progress,
              behavior: "smooth",
            });
          };
          document.addEventListener("click", handleHorizontalAnchor);
          return () => document.removeEventListener("click", handleHorizontalAnchor);
        },
      );
      return () => media.revert();
    }, root);
    return () => ctx.revert();
  }, []);

  return root;
}
