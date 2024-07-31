import { useNavigate } from 'react-router-dom';
import Typography from './Typography';

function GoBack() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)}>
      <Typography type="smallerLink" className="font-bold">
        Go back
      </Typography>
    </button>
  );
}

export default GoBack;
