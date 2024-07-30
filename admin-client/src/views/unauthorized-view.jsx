import { Link, useNavigate } from 'react-router-dom';
import Typography from '../components/General/Typography';

function UnauthorizedView() {
  const Navigate = useNavigate();

  return (
    <div>
      <Typography>You're not authorized to view this page</Typography>
      <Link to="/">
        <Typography type="link">Go back to dashboard</Typography>
      </Link>
    </div>
  );
}

export default UnauthorizedView;
