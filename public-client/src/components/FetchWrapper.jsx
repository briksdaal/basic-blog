import useFetch from '../hooks/useFetch';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';

function FetchWrapper(Child, suffixUrl) {
  function WrappedChild(props) {
    const [data, loading, error] = useFetch(suffixUrl);
    if (loading) {
      return <Loading />;
    }
    if (error) {
      return <ErrorMessage error={error} />;
    }

    return <Child {...props} data={data} />;
  }

  return WrappedChild;
}

export default FetchWrapper;
