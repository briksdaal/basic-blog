import { Outlet } from 'react-router-dom';
import Layout from './layouts/layout';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Outlet />
      </Layout>
    </AuthProvider>
  );
}

export default App;
