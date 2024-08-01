import { Helmet } from 'react-helmet-async';
import PostsView from '../views/posts-view';

function PostsPage() {
  return (
    <>
      <Helmet>
        <title>JourneyJot Admin - Posts</title>
      </Helmet>

      <PostsView />
    </>
  );
}

export default PostsPage;
