import Link from 'next/link';
import { forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-ink text-white hover:bg-ink-soft shadow-luxury hover:shadow-luxury-lg dark:bg-gold-500 dark:text-ink dark:hover:bg-gold-400',
  secondary:
    'bg-transparent border-2 border-ink text-ink hover:bg-ink hover:text-white dark:border-gold-400 dark:text-gold-400 dark:hover:bg-gold-400 dark:hover:text-ink',
  outline:
    'bg-transparent border border-neutral-300 text-ink hover:border-gold-500 hover:text-gold-600 dark:border-neutral-600 dark:text-white dark:hover:border-gold-400',
  ghost:
    'bg-transparent text-ink hover:bg-neutral-100 dark:text-white dark:hover:bg-ink-muted',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      href,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classes = `inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
