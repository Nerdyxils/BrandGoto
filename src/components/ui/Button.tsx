import React from 'react';
import { Link } from 'react-router-dom';

const joinClasses = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' ');

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, type = 'button', ...props }, ref) => (
    <button ref={ref} type={type} className={joinClasses('interactive-control', className)} {...props} />
  ),
);

Button.displayName = 'Button';

type InternalLinkButtonProps = Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'> & {
  className?: string;
};

export const LinkButton = React.forwardRef<HTMLAnchorElement, InternalLinkButtonProps>(
  ({ className, ...props }, ref) => (
    <Link ref={ref} className={joinClasses('interactive-control', className)} {...props} />
  ),
);

LinkButton.displayName = 'LinkButton';

export const ExternalLinkButton = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, ...props }, ref) => (
    <a ref={ref} className={joinClasses('interactive-control', className)} {...props} />
  ),
);

ExternalLinkButton.displayName = 'ExternalLinkButton';
