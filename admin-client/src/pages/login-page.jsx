import { Helmet } from 'react-helmet-async';
import LoginView from '../views/login-view';

function LoginPage() {
  return (
    <>
      <Helmet>
        <title>JourneyJot Admin - Login</title>
      </Helmet>

      <LoginView />
    </>
  );
}

export default LoginPage;
