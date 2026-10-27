import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function useHomeMotion() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const titleSplits = [];
    const ctx = gsap.context(() => {
      const lenis = new Lenis({ autoRaf: false });
      const syncScrollTrigger = () => ScrollTrigger.update();
      const runLenis = (time) => lenis.raf(time * 1000);
      lenis.on("scroll", syncScrollTrigger);
      gsap.ticker.add(runLenis);
      gsap.ticker.lagSmoothing(0);

      gsap.utils.toArray(".stagger-title").forEach((title) => {
        const split = new SplitType(title, { types: "words" });
        split.words?.forEach((word, index) => {
          word.style.setProperty("--word-index", index);
        });
        titleSplits.push(split);
      });

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
          if (horizontalTrack) {
            horizontalTween = gsap.to(horizontalTrack, {
              x: () => -(horizontalTrack.scrollWidth - window.innerWidth),
              ease: "none",
              scrollTrigger: {
                id: "valerie-horizontal-panels",
                trigger: ".horizontal-scroll",
                start: "bottom bottom",
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
            const words = title.querySelectorAll(".word");
            if (!words.length) return;
            const isHorizontalPanel = Boolean(title.closest(".horizontal-track"));
            gsap.fromTo(words, {
              autoAlpha: 0,
              clipPath: "inset(100% 0 0 0)",
            }, {
              autoAlpha: 1,
              clipPath: "inset(0% 0 0 0)",
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

          const handleSmoothAnchor = (event) => {
            const clicked = event.target instanceof Element
              ? event.target.closest('a[href^="#"]')
              : null;
            const href = clicked?.getAttribute("href");
            const target = href ? document.querySelector(href) : null;
            const panel = target?.closest(".horizontal-track > section");
            const panels = horizontalTrack
              ? Array.from(horizontalTrack.children)
              : [];
            if (!target) return;

            event.preventDefault();
            history.pushState(null, "", href);
            if (panel && horizontalTween?.scrollTrigger) {
              const panelIndex = panels.indexOf(panel);
              const trigger = horizontalTween.scrollTrigger;
              const progress = panelIndex / Math.max(panels.length - 1, 1);
              lenis.scrollTo(
                trigger.start + (trigger.end - trigger.start) * progress,
                { duration: 1.1 },
              );
            } else {
              lenis.scrollTo(target, { offset: -66, duration: 1.1 });
            }
          };
          document.addEventListener("click", handleSmoothAnchor);
          return () => document.removeEventListener("click", handleSmoothAnchor);
        },
      );
      return () => {
        media.revert();
        lenis.off("scroll", syncScrollTrigger);
        gsap.ticker.remove(runLenis);
        lenis.destroy();
        gsap.ticker.lagSmoothing(500, 33);
      };
    }, root);
    return () => {
      ctx.revert();
      titleSplits.forEach((split) => split.revert());
    };
  }, []);

  return root;
}
