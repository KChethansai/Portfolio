"use client";

/**
 * Kokonut UI — Spotlight Card (single-card primitive for project tiles)
 */
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const TILT_MAX = 9;
const TILT_SPRING = { stiffness: 300, damping: 28 } as const;
const GLOW_SPRING = { stiffness: 180, damping: 22 } as const;

export function SpotlightCard({
  children,
  className,
  color = "#22d3ee",
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const normX = useMotionValue(0.5);
  const normY = useMotionValue(0.5);
  const rawRotateX = useTransform(normY, [0, 1], [TILT_MAX, -TILT_MAX]);
  const rawRotateY = useTransform(normX, [0, 1], [-TILT_MAX, TILT_MAX]);
  const rotateX = useSpring(rawRotateX, TILT_SPRING);
  const rotateY = useSpring(rawRotateY, TILT_SPRING);
  const glowOpacity = useSpring(0, GLOW_SPRING);

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "group relative overflow-hidden rounded-[var(--radius-lg)] border border-white/12 bg-white/[0.03] cursor-pointer",
        className
      )}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        normX.set((e.clientX - rect.left) / rect.width);
        normY.set((e.clientY - rect.top) / rect.height);
      }}
      onMouseEnter={() => glowOpacity.set(1)}
      onMouseLeave={() => {
        normX.set(0.5);
        normY.set(0.5);
        glowOpacity.set(0);
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 20% 20%, ${color}14, transparent 65%)`,
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: glowOpacity,
          background: `radial-gradient(ellipse at 20% 20%, ${color}2e, transparent 65%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export default SpotlightCard;
