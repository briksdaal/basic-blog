import useFetch from '../../hooks/useFetch';
import getFetcher from '../../fetchers/getFetcher';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';
import Breadcrumbs from './Breadcrumbs';
import PageTitle from './PageTitle';
import Typography from './Typography';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { getTitle } from '../../helpers/getTitle';
import { Helmet } from 'react-helmet-async';

function FetchWrapper({ Child, suffixUrl, trigger, title, addNew, ...props }) {
  const [data, loading, error] = useFetch(suffixUrl, getFetcher, trigger);

  if (!data && loading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  if (error) {
    return (
      <>
        <ErrorMessage error={error} />
      </>
    );
  }

  const computedTitle = getTitle(data);
  return (
    <>
      {computedTitle.current && (
        <Helmet>
          <title>
            JourneyJot Admin - {computedTitle.parent} - {computedTitle.current}
          </title>
        </Helmet>
      )}
      <Breadcrumbs title={computedTitle.current} />
      <div className="flex justify-between">
        {title && <PageTitle>{title}</PageTitle>}
        {addNew && (
          <Typography type="smallTitle" className="flex gap-2">
            Create New{' '}
            <Link to={`${suffixUrl}/new`}>
              <FaPlus className="mt-1 text-sky-800" />
            </Link>
          </Typography>
        )}
      </div>
      <Child {...props} data={data} />
    </>
  );
}

export default FetchWrapper;
