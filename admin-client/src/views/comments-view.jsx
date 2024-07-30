import FetchWrapper from '../components/FetchWrapper';
import CommentsTable from '../components/Tables/CommentsTable';

function CommentsView() {
  return (
    <div>
      <FetchWrapper Child={CommentsTable} suffixUrl={'/comments'} />
    </div>
  );
}

export default CommentsView;
