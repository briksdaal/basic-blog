import FetchWrapper from '../components/General/FetchWrapper';
import CommentsTable from '../components/Tables/CommentsTable';

function CommentsView() {
  return (
    <div>
      <FetchWrapper
        Child={CommentsTable}
        suffixUrl={'/comments'}
        title="Comments"
      />
    </div>
  );
}

export default CommentsView;
