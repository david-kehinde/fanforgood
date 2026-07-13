'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, motion } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

function formatDisplay(
  n: number,
  target: number,
  prefix = '',
  suffix = ''
): string {
  if (prefix === '$' && target >= 1_000_000) {
    return `${prefix}${(n / 1_000_000).toFixed(1)}M${suffix}`;
  }
  if (target >= 10_000) {
    return `${prefix}${n.toLocaleString()}${suffix}`;
  }
  return `${prefix}${n.toLocaleString()}${suffix}`;
}

export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(value * eased));
      if (progress < 1) requestAnimationFrame(tick);
      else setDisplay(value);
    };

    requestAnimationFrame(tick);
  }, [isInView, value, duration]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      {formatDisplay(display, value, prefix, suffix)}
    </motion.span>
  );
}
