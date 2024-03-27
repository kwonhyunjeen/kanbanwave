import { forwardRef, useRef } from 'react';
import Modal, { ModalProps } from './Modal';
import { useBackdropClick } from 'hooks';

export type DialogProps = ModalProps & {};

const Dialog = forwardRef<HTMLDivElement, DialogProps>((props, ref) => {
  const { children, title, ...modalProps } = props;
  const { backdrop, onClose } = modalProps;

  const dialogRef = useRef<HTMLDivElement>(null);

  const handleModalClose = (): void => {
    onClose?.();
  };

  useBackdropClick(dialogRef, handleModalClose, backdrop);

  return (
    <Modal {...modalProps} ref={dialogRef || ref}>
      {children}
    </Modal>
  );
});

Dialog.displayName = 'Dialog';
export default Dialog;
