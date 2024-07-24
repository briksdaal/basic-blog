import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { useEffect, useState } from 'react';
import Typography from '../components/Typography';
import HeaderUserArea from '../components/HeaderUserArea';
import useAuth from '../hooks/useAuth';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { auth } = useAuth();

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
      <div className="container mx-auto flex items-center justify-between xl:px-64">
        <h1 className="ml-2 text-3xl xl:ml-0">
          <Link to="/" className="flex items-center gap-6">
            <Logo />
            <Typography type="smallTitle" className="hidden sm:block">
              Admin Panel
            </Typography>
          </Link>
        </h1>
        {auth?.user && <HeaderUserArea user={auth.user} />}
      </div>
    </header>
  );
}

export default Header;
