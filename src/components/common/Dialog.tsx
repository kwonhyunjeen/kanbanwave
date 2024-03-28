import { forwardRef, useRef } from 'react';
import Modal from './Modal';
import { useBackdropClick } from 'hooks';

type DialogProps = React.ComponentPropsWithoutRef<typeof Modal>;

const Dialog = forwardRef<HTMLDivElement, DialogProps>((props, ref) => {
  const { children, title, backdrop, onClose, ...rest } = props;

  const dialogRef = useRef<HTMLDivElement>(null);

  const handleModalClose = (): void => {
    onClose?.();
  };

  useBackdropClick(dialogRef, handleModalClose, backdrop);

  return (
    <Modal {...rest} ref={dialogRef || ref}>
      {children}
    </Modal>
  );
});

Dialog.displayName = 'Dialog';
export default Dialog;
