import PostList from './PostList';
import FetchWrapper from './FetchWrapper';

function Author({ data = null }) {
  const author = data?.user;

  if (!author) {
    return <h2 className="text-2xl">User not found</h2>;
  }

  const FetchedPostList = FetchWrapper(
    PostList,
    `posts/?authorid=${author._id}`
  );

  return (
    <div>
      <div>
        {author.handle} {author.email}
      </div>
      <div>
        {author.firstname} {author.lastname}
      </div>
      <h2 className="text-2xl">Posts by {author.handle}</h2>
      <FetchedPostList />
    </div>
  );
}

export default Author;
