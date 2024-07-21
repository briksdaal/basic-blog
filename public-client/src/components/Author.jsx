import { Helmet } from 'react-helmet-async';
import PostList from './PostList';
import FetchWrapper from './FetchWrapper';
import { FaRegEnvelope } from 'react-icons/fa6';
import userPlaceholder from '/user_placeholder.svg';
import Typography from './Typography';

function Author({ data = null }) {
  const author = data?.user;

  if (!author) {
    return <h2 className="text-2xl">User not found</h2>;
  }

  return (
    <>
      <Helmet>
        <title>JourneyJot - {author.fullname}</title>
      </Helmet>
      <div className="flex flex-col gap-8 md:flex-row md:gap-0">
        <div className="flex flex-initial flex-col items-center md:flex-1">
          <div className="relative flex h-48 w-48 items-center justify-center overflow-hidden rounded-full ">
            <div className="absolute left-0 top-0 h-full w-full rounded-full border-2 border-slate-800"></div>
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
          <div className="mt-5 flex flex-col gap-1 break-all">
            <Typography type="smallTitle">{author.fullname}</Typography>
            <Typography type="smaller">@{author.handle}</Typography>
            <Typography type="smaller" className="flex items-center gap-1">
              <FaRegEnvelope />{' '}
              <a href={`mailto:${author.email}`}>{author.email}</a>
            </Typography>
          </div>
        </div>
        <div className="flex-initial md:flex-[3_3_0%]">
          <div className="sm:px-14">
            <FetchWrapper
              Child={PostList}
              suffixUrl={`posts/?authorid=${author._id}`}
              minimized={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Author;
