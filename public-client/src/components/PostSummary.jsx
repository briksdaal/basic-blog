import { Link } from 'react-router-dom';
import Typography from './Typography';
import { FaRegMessage } from 'react-icons/fa6';

function PostSummary({ post, minimized }) {
  return (
    <div className="flex flex-col gap-4 pt-8 first:pt-0">
      <Link to={`/posts/${post._id}`}>
        <Typography type="title">{post.title}</Typography>
      </Link>
      {!minimized && (
        <div className="flex justify-between gap-16">
          <span>
            <Typography type="regular">by </Typography>

            <Link to={`/authors/${post.author._id}`}>
              <Typography type="linkLight">{post.author.handle} </Typography>
            </Link>
          </span>
          <Link to={`/posts/${post._id}#comments`}>
            <Typography type="small" className="flex items-center gap-2">
              {post.commentsCount} <FaRegMessage className="text-base" />
            </Typography>
          </Link>
        </div>
      )}

      {!minimized && post.imageUrl && (
        <Link to={`/posts/${post._id}`}>
          <img
            className="h-[28rem] w-full object-cover"
            src={`${import.meta.env.VITE_API_URL}${post.imageUrl}`}
            alt={post.title}
          />
        </Link>
      )}
      <Typography type="contentSummary">{post.content}</Typography>

      <div className="flex justify-between gap-16">
        <Link to={`/posts/${post._id}`}>
          <Typography type={'linkLight'}>Read more...</Typography>
        </Link>
        <Link to={`/posts/${post._id}`}>
          <Typography type={'linkLight'}>
            {post.timeToRead} {post.timeToRead == 1 ? 'minute' : 'minutes'} read
          </Typography>
        </Link>
      </div>
    </div>
  );
}

export default PostSummary;
