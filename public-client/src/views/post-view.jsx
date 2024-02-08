import PropTypes from 'prop-types';

function PostView({ postId }) {
  return <div>Post {postId}</div>;
}

PostView.propTypes = {
  postId: PropTypes.string
};

export default PostView;
