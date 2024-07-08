import { Link } from 'react-router-dom';

function SinglePost({ data = null }) {
  const post = data?.post;
  console.log(post);
  return (
    <div>
      <h2>{post.title}</h2>
      <div className="flex gap-16">
        {post.timeToRead} {post.timeToRead == 1 ? 'minute' : 'minutes'} read
      </div>
      <div className="flex gap-16">
        <span>
          by{' '}
          <Link to={`/authors/${post.author._id}`}>{post.author.handle}</Link>
        </span>
        <span>{post.commentsCount} comments</span>
      </div>

      {post.imageUrl && (
        <img
          src={`${import.meta.env.VITE_API_URL}${post.imageUrl}`}
          alt={post.title}
        />
      )}
      <p className="whitespace-break-spaces">{post.content}</p>
    </div>
  );
}

export default SinglePost;
