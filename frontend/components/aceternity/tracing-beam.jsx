"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className,
}) => {
  const ref = useRef(null);
  const contentRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);

  const y1 = useMotionValue(50);
  const y2 = useMotionValue(50);

  useEffect(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;
    const update = () => setSvgHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let ticking = false;
    const updateScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const totalHeight = rect.height;
      const windowHeight = window.innerHeight;
      const startOffset = rect.top;

      const scrollRange = totalHeight - windowHeight;
      const progress = scrollRange > 0 ? Math.min(Math.max(-startOffset / scrollRange, 0), 1) : 0;

      const targetY1 = 50 + progress * Math.max(svgHeight * 0.8 - 50, 0);
      const targetY2 = 50 + progress * Math.max(svgHeight - 250, 0);

      y1.set(targetY1);
      y2.set(targetY2);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [svgHeight, y1, y2]);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative mx-auto h-full w-full max-w-7xl [will-change:transform] [transform:translateZ(0)]",
        className
      )}
    >
      <div className="absolute top-3 -left-4 md:-left-20 pointer-events-none [will-change:transform] [transform:translateZ(0)]">
        <div className="border-neutral-700 ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border bg-neutral-900">
          <div className="h-2 w-2 rounded-full border border-neutral-400 bg-white" />
        </div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block [will-change:transform]"
          aria-hidden="true"
        >
          <path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
          />
          <path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
          />
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#18CCFC" stopOpacity="0" />
              <stop stopColor="#18CCFC" />
              <stop offset="0.325" stopColor="#6344F5" />
              <stop offset="1" stopColor="#AE48FF" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
