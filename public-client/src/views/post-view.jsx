import SinglePost from '../components/SinglePost';
import FetchWrapper from '../components/FetchWrapper';

function PostView({ postId }) {
  const FetchedPost = FetchWrapper(SinglePost, `posts/${postId}`);
  return <FetchedPost />;
}

export default PostView;
