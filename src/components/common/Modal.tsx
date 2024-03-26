import { forwardRef, ReactNode, useEffect, useRef } from 'react';
import Div, { DivProps } from './Div';
import clsx from 'clsx';
import IconButton from './IconButton';
import Backdrop from './Backdrop';
import { createPortal } from 'react-dom';
import { useBackdropClick } from 'hooks/useBackdropClick';

export type ModalProps = DivProps & {
  backdrop?: boolean;
  backdropClassName?: string;
  onClose?: () => void;
  open: boolean;
  closeIcon?: boolean;
  children?: ReactNode;
};

const Modal = forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const {
    backdrop = true,
    backdropClassName,
    onClose,
    open,
    closeIcon,
    className,
    children,
    ...rest
  } = props;

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  const handleModalClose = (): void => {
    onClose?.();
  };

  useBackdropClick(modalRef, handleModalClose, backdrop);

  return open
    ? createPortal(
        <Backdrop>
          <Div
            {...rest}
            ref={modalRef || ref}
            className={clsx(
              'flex flex-col relative bg-white rounded-lg shadow-xl overflow-y-auto m-4',
              className
            )}
            maxWidth="37.5rem"
            maxHeight="calc(100% - 64px">
            {children}
            {closeIcon && (
              <IconButton
                name="close"
                aria-label="close"
                className="absolute top-4 right-4 btn-xs btn-circle "
                onClick={handleModalClose}
              />
            )}
          </Div>
        </Backdrop>,
        document.body
      )
    : null;
});

Modal.displayName = 'Modal';
export default Modal;
