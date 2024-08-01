import useFetch from '../../hooks/useFetch';
import getFetcher from '../../fetchers/getFetcher';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';
import Breadcrumbs from './Breadcrumbs';
import PageTitle from './PageTitle';
import { getTitle } from '../../helpers/getTitle';
import { Helmet } from 'react-helmet-async';
function FetchWrapper({ Child, suffixUrl, trigger, title, ...props }) {
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
      {title && <PageTitle>{title}</PageTitle>}
      <Child {...props} data={data} />
    </>
  );
}

export default FetchWrapper;
