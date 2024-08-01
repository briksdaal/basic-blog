import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import SingleUserView from '../views/single-user-view';

function SingleUserPage() {
  const params = useParams();

  return (
    <>
      <Helmet>
        <title>JourneyJot Admin- User {params.id}</title>
      </Helmet>

      <SingleUserView id={params.id} />
    </>
  );
}

export default SingleUserPage;
