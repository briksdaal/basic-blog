import { Link } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_API_URL;

function PostSummary({ post }) {
  return (
    <div>
      <Link to={`posts/${post._id}`}>
        <h2>{post.title}</h2>
      </Link>
      <div className="flex gap-16">
        <span>
          by <Link to={`authors/${post.author._id}`}>{post.author.handle}</Link>
        </span>
        <span>{post.commentsCount} comments</span>
      </div>

      {post.imageUrl && (
        <Link to={`posts/${post._id}`}>
          <img src={`${baseUrl}${post.imageUrl}`} alt={post.title} />
        </Link>
      )}
      <p className="line-clamp-2 overflow-hidden text-ellipsis">
        {post.content}
      </p>
      <div className="flex gap-16">
        <Link to={`posts/${post._id}`}>Read more...</Link>
        <Link to={`posts/${post._id}`}>
          {post.timeToRead} {post.timeToRead == 1 ? 'minute' : 'minutes'} read
        </Link>
      </div>
    </div>
  );
}

export default PostSummary;
