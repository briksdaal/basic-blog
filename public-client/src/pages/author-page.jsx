import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import AuthorView from '../views/author-view';

function AuthorPage() {
  const { authorId } = useParams();

  return (
    <>
      <Helmet>
        <title>JourneyJot - Author {authorId}</title>
      </Helmet>

      <AuthorView authorId={authorId} />
    </>
  );
}

export default AuthorPage;
