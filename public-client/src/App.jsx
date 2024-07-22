import { Outlet } from 'react-router-dom';
import Layout from './layouts/layout';
import ScrollToTop from './components/ScrollToTop';

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
