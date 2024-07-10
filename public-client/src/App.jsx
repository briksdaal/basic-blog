import { Outlet } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './layouts/layout';

function App() {
  return (
    <>
      <ScrollToTop />
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}

export default App;
