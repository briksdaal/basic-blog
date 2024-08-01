import { Helmet } from 'react-helmet-async';
import UnauthorizedView from '../views/unauthorized-view';

function UnauthorizedPage() {
  return (
    <>
      <Helmet>
        <title>JourneyJot Admin - Unauthorized</title>
      </Helmet>

      <UnauthorizedView />
    </>
  );
}

export default UnauthorizedPage;
