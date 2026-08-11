import React from 'react';

interface FieldLabelProps {
  htmlFor: string;
  label?: string;
  visuallyHidden?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const FieldLabel: React.FC<FieldLabelProps> = ({ htmlFor, label, children, className, visuallyHidden = true }) => (
  <label htmlFor={htmlFor} className={className ?? (visuallyHidden ? 'sr-only' : 'services-label')}>
    {children ?? label}
  </label>
);

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  labelClassName?: string;
}

export const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ id, label, labelClassName = 'sr-only', children, ...props }, ref) => (
    <>
      <label htmlFor={id} className={labelClassName}>{label}</label>
      <select ref={ref} id={id} {...props}>{children}</select>
    </>
  ),
);

SelectField.displayName = 'SelectField';
