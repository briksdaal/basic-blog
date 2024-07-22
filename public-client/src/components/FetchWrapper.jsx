import useFetch from '../hooks/useFetch';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';
import ScrollToAnchor from './ScrollToAnchor';
import ScrollToTop from './ScrollToTop';

function FetchWrapper({ Child, suffixUrl, trigger, ...props }) {
  const [data, loading, error] = useFetch(suffixUrl, trigger);

  if (!data && loading) {
    return (
      <>
        <ScrollToTop />
        <Loading />
      </>
    );
  }
  if (error) {
    return (
      <>
        <ScrollToTop />
        <ErrorMessage error={error} />
      </>
    );
  }
  return (
    <>
      <ScrollToTop />
      <ScrollToAnchor />
      <Child {...props} data={data} />
    </>
  );
}

export default FetchWrapper;
