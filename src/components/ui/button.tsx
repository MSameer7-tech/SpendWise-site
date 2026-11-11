import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'pill';
  size?: 'sm' | 'md' | 'lg';
  fullWidthMobile?: boolean;
  asChild?: boolean;
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      fullWidthMobile = false,
      children,
      disabled,
      href,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none';

    const variantStyles = {
      primary:
        'bg-foreground text-background hover:bg-foreground/90 shadow-sm dark:bg-[#10B981] dark:text-[#071A14] dark:hover:bg-[#34D399] dark:shadow-[0_2px_12px_rgba(16,185,129,0.20)]',
      secondary:
        'bg-secondary text-foreground hover:bg-muted border border-border dark:bg-[#22272C] dark:text-[#F5F5F5] dark:border-[#3A424A] dark:hover:bg-[#30373E] dark:hover:border-[#343B42]',
      outline:
        'border border-border bg-transparent text-foreground hover:bg-secondary dark:border-[#3A424A] dark:text-[#F5F5F5] dark:hover:bg-[#22272C] dark:hover:border-[#343B42]',
      ghost:
        'bg-transparent text-foreground hover:bg-secondary/80 dark:text-[#B3BAC2] dark:hover:text-[#F5F5F5] dark:hover:bg-[#22272C]',
      pill:
        'rounded-full bg-foreground text-background hover:bg-foreground/90 shadow-sm dark:bg-[#10B981] dark:text-[#071A14] dark:hover:bg-[#34D399]',
    };

    const sizeStyles = {
      sm: 'min-h-[44px] px-3.5 py-2 text-xs rounded-md',
      md: 'min-h-[48px] px-5 py-2.5 text-sm rounded-lg',
      lg: 'min-h-[52px] px-6 py-3 text-base rounded-xl',
    };

    const mobileWidthStyle = fullWidthMobile ? 'w-full md:w-auto' : '';

    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      mobileWidthStyle,
      className
    );

    if (href) {
      return (
        <a
          href={href}
          className={combinedClassName}
          tabIndex={disabled ? -1 : undefined}
          aria-disabled={disabled}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={combinedClassName}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
