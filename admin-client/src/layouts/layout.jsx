import PropTypes from 'prop-types';
import Header from './header';
import Footer from './footer';

function Layout({ children }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="grow pt-24 sm:pt-32">
        <div className="container mx-auto px-2 xl:px-64">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element
};

export default Layout;
