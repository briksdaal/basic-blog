import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="container mx-auto py-8">
      <h2 className="text-3xl">
        <Link>JourneyJot</Link>
      </h2>
    </header>
  );
}

export default Header;
