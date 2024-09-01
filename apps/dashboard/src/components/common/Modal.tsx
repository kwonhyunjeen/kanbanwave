import { forwardRef, ReactNode, useEffect, useRef } from 'react';
import Backdrop from './Backdrop';
import { createPortal } from 'react-dom';
import { useForkRef, useOnOutsideClick } from '@/hooks';
import { cx } from '@/utils/cx';

export const ModalCloseReason = {
  backdropClick: 'backdropClick'
} as const;
export type ModalCloseReason = (typeof ModalCloseReason)[keyof typeof ModalCloseReason];

type ModalProps = React.ComponentPropsWithoutRef<'div'> & {
  backdropClassName?: string;
  children?: ReactNode;
  disableBackdropClick?: boolean;
  onClose?: (reason: ModalCloseReason) => void;
  open: boolean;
};

const Modal = forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const {
    backdropClassName,
    children,
    className,
    disableBackdropClick = false,
    onClose,
    open,
    ...rest
  } = props;

  const modalRef = useRef<HTMLDivElement>(null);
  const modalCallbackRef = useForkRef(modalRef, ref);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  const handleModalClose = (): void => {
    if (!disableBackdropClick) {
      onClose?.(ModalCloseReason.backdropClick);
    }
  };

  useOnOutsideClick(modalRef, open ? handleModalClose : undefined);

  return open
    ? createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <Backdrop className={backdropClassName} />
          <div
            {...rest}
            ref={modalCallbackRef}
            className={cx(
              'relative flex max-h-[calc(100%-64px)] max-w-[min(37.5rem,90%)] flex-col overflow-y-auto rounded-lg bg-white shadow-xl',
              className
            )}
          >
            {children}
          </div>
        </div>,
        document.body
      )
    : null;
});

Modal.displayName = 'Modal';
export default Modal;
