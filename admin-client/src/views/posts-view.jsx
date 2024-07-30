import FetchWrapper from '../components/FetchWrapper';
import PostsTable from '../components/Tables/PostsTable';

function PostsView() {
  return (
    <div>
      <FetchWrapper Child={PostsTable} suffixUrl={'/posts'} />
    </div>
  );
}

export default PostsView;
