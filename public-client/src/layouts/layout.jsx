import PropTypes from 'prop-types';
import Header from './header';
import Footer from './footer';

function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="grow">
        <div className="container mx-auto">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element
};

export default Layout;
