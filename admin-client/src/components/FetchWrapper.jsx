import useFetch from '../hooks/useFetch';
import getFetcher from '../fetchers/getFetcher';
import ErrorMessage from './General/ErrorMessage';
import Loading from './General/Loading';

function FetchWrapper({ Child, suffixUrl, trigger, ...props }) {
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
  return (
    <>
      <Child {...props} data={data} />
    </>
  );
}

export default FetchWrapper;
