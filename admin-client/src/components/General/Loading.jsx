import { CgSpinner } from 'react-icons/cg';

function Loading() {
  return (
    <div className="mx-auto max-h-24 max-w-24">
      <CgSpinner className="h-full w-full animate-spin text-mantis-400" />
    </div>
  );
}

export default Loading;
