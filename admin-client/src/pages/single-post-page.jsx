import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import SinglePostView from '../views/single-post-view';

function SinglePostPage() {
  const params = useParams();

  return (
    <>
      <Helmet>
        <title>JourneyJot Admin - Post {params.id}</title>
      </Helmet>

      <SinglePostView id={params.id} />
    </>
  );
}

export default SinglePostPage;
