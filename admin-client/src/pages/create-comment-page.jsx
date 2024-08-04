import { Helmet } from 'react-helmet-async';
import CreateCommentView from '../views/create-comment-view';

function CreateCommentPage() {
  return (
    <>
      <Helmet>
        <title>JourneyJot Admin - Create New Comment</title>
      </Helmet>

      <CreateCommentView />
    </>
  );
}

export default CreateCommentPage;
