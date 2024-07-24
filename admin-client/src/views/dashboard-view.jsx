import { Link } from 'react-router-dom';
import Typography from '../components/General/Typography';

function DashboardView() {
  return (
    <div>
      <Typography>This is the protected dashboard for all users</Typography>
      <Link to="/users">
        <Typography type="link">Users</Typography>
      </Link>
    </div>
  );
}

export default DashboardView;
