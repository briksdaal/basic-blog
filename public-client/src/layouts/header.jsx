import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { useEffect, useState } from 'react';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 py-3 ${isScrolled ? 'sm:py-3' : 'sm:py-8'} z-10 w-full bg-white shadow-md transition-all ease-in-out`}>
      <div className="container mx-auto xl:px-64">
        <h1 className="ml-2 text-3xl xl:ml-0">
          <Link to="/">
            <Logo />
          </Link>
        </h1>
      </div>
    </header>
  );
}

export default Header;
