import PostSummary from './PostSummary';

function PostList({ data = null, minimized = false }) {
  const posts = data?.posts;

  if (!posts || !posts.length) {
    return (
      <div>
        <h2 className="text-center text-2xl">No posts available</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 divide-y divide-slate-300">
      {posts.map((p) => (
        <PostSummary key={p._id} post={p} minimized={minimized} />
      ))}
    </div>
  );
}

export default PostList;
