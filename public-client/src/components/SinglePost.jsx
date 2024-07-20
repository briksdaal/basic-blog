import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Typography from './Typography';
import CommentsSection from './CommentSection';

function SinglePost({ data = null }) {
  const post = data?.post;

  if (!post) {
    return (
      <div>
        <Typography type="title" className="text-center">
          No post data found
        </Typography>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>JourneyJot - {post.title}</title>
      </Helmet>

      <div className="flex flex-col gap-4">
        <Typography type="title">{post.title}</Typography>
        <div>
          <Typography type="regular">by </Typography>
          <Link to={`/authors/${post.author._id}`}>
            <Typography type="linkLight">{post.author.handle} </Typography>
          </Link>
        </div>

        {post.imageUrl && (
          <img
            className="h-[28rem] w-full object-cover"
            src={`${import.meta.env.VITE_API_URL}${post.imageUrl}`}
            alt={post.title}
          />
        )}
        <Typography type="contentFull">{post.content}</Typography>

        <CommentsSection postId={post._id} />
      </div>
    </>
  );
}

export default SinglePost;
