import PageTitle from '../components/General/PageTitle';
import GoBack from '../components/General/GoBack';

function UnauthorizedView() {
  return (
    <div>
      <PageTitle>You're not authorized to view this page</PageTitle>
      <GoBack />
    </div>
  );
}

export default UnauthorizedView;
