import { useEffect } from 'react';
import { RxCross2 } from 'react-icons/rx';

function Modal({ children, close }) {
  useEffect(() => {
    const overlay = document.querySelector('#overlay');
    const overlayContent = document.querySelector('#overlay-content');

    const listener = (e) => {
      if (e.target.contains(overlayContent)) {
        close();
      }
    };

    overlay.addEventListener('click', listener);

    return () => {
      overlay.removeEventListener('click', listener);
    };
  }, []);
  return (
    <>
      <div className="fixed left-0 top-0 h-screen w-screen bg-slate-700 opacity-20"></div>
      <div
        id="overlay"
        className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
        <div className="relative">
          <div id="overlay-content">{children}</div>
          <div className="absolute right-3 top-3">
            <button type="button" onClick={close}>
              <RxCross2 />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
