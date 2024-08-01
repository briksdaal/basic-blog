import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import SingleCommentView from '../views/single-comment-view';

function SingleCommentPage() {
  const params = useParams();

  return (
    <>
      <Helmet>
        <title>JourneyJot Admin - Comment {params.id}</title>
      </Helmet>

      <SingleCommentView id={params.id} />
    </>
  );
}

export default SingleCommentPage;
