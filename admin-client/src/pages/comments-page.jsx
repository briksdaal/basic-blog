import { Helmet } from 'react-helmet-async';
import CommentsView from '../views/comments-view';

function CommentsPage() {
  return (
    <>
      <Helmet>
        <title>JourneyJot - Admin - Comments</title>
      </Helmet>

      <CommentsView />
    </>
  );
}

export default CommentsPage;
