import SinglePost from '../components/SinglePost';
import FetchWrapper from '../components/FetchWrapper';

function PostView({ postId }) {
  return <FetchWrapper Child={SinglePost} suffixUrl={`posts/${postId}`} />;
}

export default PostView;
