import Author from '../components/Author';
import FetchWrapper from '../components/FetchWrapper';

function AuthorView({ authorId }) {
  return <FetchWrapper Child={Author} suffixUrl={`users/${authorId}`} />;
}

export default AuthorView;
