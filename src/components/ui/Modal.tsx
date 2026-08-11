import React, { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  labelledBy: string;
  children: React.ReactNode;
  containerClassName: string;
  panelClassName: string;
  backdropClassName?: string;
  restoreFocusTo?: HTMLElement | null;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  labelledBy,
  children,
  containerClassName,
  panelClassName,
  backdropClassName,
  restoreFocusTo,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previousFocus = restoreFocusTo ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    const dialog = dialogRef.current;
    const focusable = dialog?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    (focusable?.[0] ?? dialog)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab' || !dialog) return;
      const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (items.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.requestAnimationFrame(() => previousFocus?.focus());
    };
  }, [isOpen, restoreFocusTo]);

  if (!isOpen) return null;

  return (
    <div className={containerClassName}>
      {backdropClassName && <div className={backdropClassName} onMouseDown={onClose} aria-hidden="true" />}
      <div
        ref={dialogRef}
        className={panelClassName}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        onMouseDown={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
