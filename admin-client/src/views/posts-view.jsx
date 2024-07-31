import FetchWrapper from '../components/FetchWrapper';
import PostsTable from '../components/Tables/PostsTable';
import PageTitle from '../components/General/PageTitle';

function PostsView() {
  return (
    <div>
      <PageTitle>Posts</PageTitle>
      <FetchWrapper Child={PostsTable} suffixUrl={'/posts'} />
    </div>
  );
}

export default PostsView;
