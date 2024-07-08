import PostSummary from './PostSummary';

function PostList({ data = null }) {
  const posts = data?.posts;

  if (!posts || !posts.length) {
    return (
      <div>
        <h2 className="text-center text-2xl">No posts available</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {posts.map((p) => (
        <PostSummary key={p._id} post={p} />
      ))}
    </div>
  );
}

export default PostList;
