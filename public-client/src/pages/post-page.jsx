import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import PostView from '../views/post-view';

function PostPage() {
  const { postId } = useParams();

  return (
    <>
      <Helmet>
        <title>JourneyJot - Post {postId}</title>
      </Helmet>

      <PostView postId={postId} />
    </>
  );
}

export default PostPage;
