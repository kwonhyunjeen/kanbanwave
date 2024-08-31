import { forwardRef } from 'react';
import Modal, { ModalCloseReason } from './Modal';
import IconButton from './IconButton';

export const DialogCloseReason = {
  ...ModalCloseReason,
  closeClick: 'closeClick'
} as const;
export type DialogCloseReason =
  (typeof DialogCloseReason)[keyof typeof DialogCloseReason];

type DialogProps = Omit<React.ComponentPropsWithoutRef<typeof Modal>, 'onClose'> & {
  closeIcon?: boolean;
  onClose?: (reason: DialogCloseReason) => void;
};

const Dialog = forwardRef<HTMLDivElement, DialogProps>((props, ref) => {
  const { children, closeIcon, onClose, ...rest } = props;

  const handleModalClose = (): void => {
    onClose?.(DialogCloseReason.closeClick);
  };

  return (
    <Modal {...rest} ref={ref} onClose={handleModalClose}>
      {children}
      {closeIcon && (
        <IconButton
          icon="close"
          aria-label="close"
          className="btn-square btn-ghost absolute right-4 top-4"
          onClick={handleModalClose}
        />
      )}
    </Modal>
  );
});

Dialog.displayName = 'Dialog';
export default Dialog;
