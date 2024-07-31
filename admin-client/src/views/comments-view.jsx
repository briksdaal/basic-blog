import FetchWrapper from '../components/FetchWrapper';
import CommentsTable from '../components/Tables/CommentsTable';
import PageTitle from '../components/General/PageTitle';

function CommentsView() {
  return (
    <div>
      <PageTitle>Comments</PageTitle>
      <FetchWrapper Child={CommentsTable} suffixUrl={'/comments'} />
    </div>
  );
}

export default CommentsView;
