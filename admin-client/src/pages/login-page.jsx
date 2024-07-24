import { Helmet } from 'react-helmet-async';
import LoginView from '../views/login-view';

function LoginPage() {
  return (
    <>
      <Helmet>
        <title>JourneyJot - Login</title>
      </Helmet>

      <LoginView />
    </>
  );
}

export default LoginPage;
