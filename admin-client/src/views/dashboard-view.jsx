import { Link } from 'react-router-dom';
import Typography from '../components/General/Typography';

function DashboardView() {
  return (
    <div>
      <Typography>JourneyJot Blog Management</Typography>
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
      <div>
        <Link to="/users">
          <Typography type="link">Users</Typography>
        </Link>
      </div>
    </div>
  );
}

export default DashboardView;
