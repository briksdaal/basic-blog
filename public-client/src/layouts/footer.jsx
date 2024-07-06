import { FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="container mx-auto flex justify-center py-4">
      <div className="flex items-center gap-1">
        Copyright © {new Date().getFullYear()} Briksdaal{' '}
        <a
          href="https://github.com/briksdaal"
          target="_blank"
          rel="noreferrer"
          className="text-lg">
          <FaGithub />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
