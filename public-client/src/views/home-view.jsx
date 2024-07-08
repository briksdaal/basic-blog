import FetchWrapper from '../components/FetchWrapper';
import PostList from '../components/PostList';

function HomeView() {
  const FetchedPostList = FetchWrapper(PostList, 'posts/');
  return <FetchedPostList />;
}

export default HomeView;
