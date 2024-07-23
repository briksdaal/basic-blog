import { Helmet } from 'react-helmet-async';
import ErrorView from '../views/error-view';
import PropTypes from 'prop-types';

function ErrorPage() {
  return (
    <>
      <Helmet>
        <title>JourneyJot - 404 Error</title>
      </Helmet>

      <ErrorView />
    </>
  );
}

ErrorPage.propTypes = {
  errorCode: PropTypes.number
};

export default ErrorPage;
