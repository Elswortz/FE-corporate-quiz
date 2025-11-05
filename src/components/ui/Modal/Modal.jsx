import { useEffect } from 'react';

import css from './Modal.module.css';

function Modal({ children }) {
  useEffect(() => {
    window.addEventListener('keydown', onKeydownHandler);

    return () => window.removeEventListener('keydown', onKeydownHandler);
  }, []);

  const onKeydownHandler = e => {
    if (e.code === 'Escape') {
      onEscapeKeydown();
    }
  };

  const onBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onEscapeKeydown();
    }
  };

  return (
    <div className={css.backdrop} onClick={onBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>
  );
}

export default Modal;
