import useFetch from '../hooks/useFetch';
import getFetcher from '../fetchers/getFetcher';
import ErrorMessage from './General/ErrorMessage';
import Loading from './General/Loading';
import Breadcrumbs from './General/Breadcrumbs';
import PageTitle from './General/PageTitle';
import { getTitle } from '../helpers/getTitle';
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
      {computedTitle && (
        <Helmet>
          <title>JourneyJot - {computedTitle}</title>
        </Helmet>
      )}
      <Breadcrumbs title={computedTitle} />
      {title && <PageTitle>{title}</PageTitle>}
      <Child {...props} data={data} />
    </>
  );
}

export default FetchWrapper;
