import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToAnchor() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    console.log(hash);
    setTimeout(() => {
      document
        .querySelector(hash)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
  }, []);

  return null;
}

export default ScrollToAnchor;
