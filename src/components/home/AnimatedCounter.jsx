"use client";

import { animate, useInView, useIsomorphicLayoutEffect } from "framer-motion";
import { useRef } from "react";

const AnimatedCounter = ({ from, to, animationOptions }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;
    if (!isInView) return;

    const element = ref.current;
    element.textContent = String(from);

    if (window.matchMedia("(prefers-reduced-motion)").matches) {
      element.textContent = String(to);
      return;
    }

    const controls = animate(from, to, {
      duration: 1,
      ease: "easeOut",
      ...animationOptions,
      onUpdate(value) {
        element.textContent = value.toFixed(0);
      },
    });

    return () => controls.stop();
  }, [isInView, from, to, animationOptions]);

  return <span ref={ref} />;
};

export default AnimatedCounter;
