import PropTypes from 'prop-types';

function AuthorView({ authorId }) {
  return <div>Author {authorId}</div>;
}

AuthorView.propTypes = {
  authorId: PropTypes.string
};

export default AuthorView;
