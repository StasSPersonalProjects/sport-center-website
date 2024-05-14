import { createPortal } from 'react-dom';
import { forwardRef, useImperativeHandle, useRef } from 'react';

const ErrorModal = forwardRef(function ErrorModal({ message }, ref) {

  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      }
    }
  });

  return createPortal(
    <dialog ref={dialog}>
      <p>{message}</p>
      <form method='dialog'>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  )
});

export default ErrorModal;