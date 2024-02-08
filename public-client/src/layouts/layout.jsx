import PropTypes from 'prop-types';
import Header from './header';
import Footer from './footer';

function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.element
};

export default Layout;
