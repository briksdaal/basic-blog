import Author from '../components/Author';
import FetchWrapper from '../components/FetchWrapper';

function AuthorView({ authorId }) {
  const FetchedAuthor = FetchWrapper(Author, `users/${authorId}`);
  return <FetchedAuthor />;
}

export default AuthorView;
