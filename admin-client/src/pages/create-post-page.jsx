import { Helmet } from 'react-helmet-async';
import CreatePostView from '../views/create-post-view';

function CreatePostPage() {
  return (
    <>
      <Helmet>
        <title>JourneyJot Admin - Create New Post</title>
      </Helmet>

      <CreatePostView />
    </>
  );
}

export default CreatePostPage;
