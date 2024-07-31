import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import Typography from '../components/General/Typography';
import PageTitle from '../components/General/PageTitle';

function DashboardView() {
  const { auth } = useAuth();
  return (
    <div>
      <PageTitle>JourneyJot Blog Management</PageTitle>
      <div>
        <Link to="/posts">
          <Typography type="link">Posts</Typography>
        </Link>
      </div>
      <div>
        <Link to="/comments">
          <Typography type="link">Comments</Typography>
        </Link>
      </div>
      {auth?.admin && (
        <div>
          <Link to="/users">
            <Typography type="link">Users</Typography>
          </Link>
        </div>
      )}
    </div>
  );
}

export default DashboardView;
