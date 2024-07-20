import { CgSpinner } from 'react-icons/cg';

function Loading() {
  return (
    <div className="mx-auto max-h-24 max-w-24">
      <CgSpinner className="text-mantis-400 h-full w-full animate-spin" />
    </div>
  );
  return <div className="text-2xl">Loading...</div>;
}

export default Loading;
