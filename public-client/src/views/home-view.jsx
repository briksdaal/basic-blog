import FetchWrapper from '../components/FetchWrapper';
import PostList from '../components/PostList';

function HomeView() {
  return <FetchWrapper Child={PostList} suffixUrl="posts/" />;
}

export default HomeView;
