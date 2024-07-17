import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import CommentsSection from './CommentSection';

function SinglePost({ data = null }) {
  const post = data?.post;

  if (!post) {
    return (
      <div>
        <h2 className="text-center text-2xl">No post data found</h2>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>JourneyJot - {post.title}</title>
      </Helmet>
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

        <CommentsSection postId={post._id} />
      </div>
    </>
  );
}

export default SinglePost;
