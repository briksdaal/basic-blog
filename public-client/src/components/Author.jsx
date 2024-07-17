import PostList from './PostList';
import FetchWrapper from './FetchWrapper';
import { FaRegEnvelope } from 'react-icons/fa6';
import userPlaceholder from '/user_placeholder.svg';

function Author({ data = null }) {
  const author = data?.user;

  if (!author) {
    return <h2 className="text-2xl">User not found</h2>;
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 md:flex-initial">
        <div className="relative flex h-48 w-48 items-center justify-center overflow-hidden rounded-full ">
          <div className="absolute left-0 top-0 h-full w-full rounded-full border-4 border-slate-800"></div>
          <img
            className="h-full w-full"
            src={
              author.imageUrl
                ? `${import.meta.env.VITE_API_URL}${author.imageUrl}`
                : userPlaceholder
            }
            alt={author.imageUrl ? author.fullname : 'user placeholder'}
          />
        </div>
        <div>{author.fullname}</div>
        <div>@{author.handle}</div>
        <div className="flex items-center gap-1">
          <FaRegEnvelope /> {author.email}
        </div>
      </div>
      <div className="flex-[3_3_0%] px-8 md:flex-initial">
        <FetchWrapper
          Child={PostList}
          suffixUrl={`posts/?authorid=${author._id}`}
          minimized={true}
        />
      </div>
    </div>
  );
}

export default Author;
