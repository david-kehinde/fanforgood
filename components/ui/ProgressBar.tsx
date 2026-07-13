'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  goal: number;
  showLabels?: boolean;
  className?: string;
}

export function ProgressBar({
  current,
  goal,
  showLabels = true,
  className = '',
}: ProgressBarProps) {
  const percent = Math.min((current / goal) * 100, 100);

  return (
    <div className={className}>
      {showLabels && (
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-ink dark:text-white">
            {percent.toFixed(0)}% funded
          </span>
          <span className="text-neutral-500">
            ${current.toLocaleString()} / ${goal.toLocaleString()}
          </span>
        </div>
      )}
      <div className="h-2 bg-neutral-200 dark:bg-ink-soft rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
