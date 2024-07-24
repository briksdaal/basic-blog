import Typography from './Typography';
import useLogout from '../hooks/useLogout';

function Logout() {
  const logout = useLogout();

  return (
    <div className="mr-2 xl:mr-0">
      <button type="button" onClick={logout}>
        <Typography type="smaller" className="underline">
          Logout
        </Typography>
      </button>
    </div>
  );
}

function HeaderUserArea({ user }) {
  return (
    <div className="flex gap-4">
      <Typography type="smaller" className="hidden sm:block">
        You are logged in as {user}
      </Typography>
      <Logout />
    </div>
  );
}

export default HeaderUserArea;
