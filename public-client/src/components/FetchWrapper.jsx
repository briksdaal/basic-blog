import useFetch from '../hooks/useFetch';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';

function FetchWrapper({ Child, suffixUrl, trigger, ...props }) {
  const [data, loading, error] = useFetch(suffixUrl, trigger);

  if (!data && loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }
  return <Child {...props} data={data} />;
}

export default FetchWrapper;
