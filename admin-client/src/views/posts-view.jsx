import FetchWrapper from '../components/General/FetchWrapper';
import PostsTable from '../components/Tables/PostsTable';

function PostsView() {
  return (
    <div>
      <FetchWrapper Child={PostsTable} suffixUrl={'/posts'} title="Posts" />
    </div>
  );
}

export default PostsView;
