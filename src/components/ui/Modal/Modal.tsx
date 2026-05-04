import { useEffect, ReactNode } from 'react';
import css from './Modal.module.css';

type ModalProps = {
  children: ReactNode;
  onClose?: () => void;
};

function Modal({ children }: ModalProps) {
  useEffect(() => {
    window.addEventListener('keydown', onKeydownHandler);

    return () => window.removeEventListener('keydown', onKeydownHandler);
  }, []);

  const onKeydownHandler = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      // onClose?.();
    }
  };

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      // onClose?.();
    }
  };

  return (
    <div className={css.backdrop} onClick={onBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>
  );
}

export default Modal;
