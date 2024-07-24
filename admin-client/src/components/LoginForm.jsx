import Typography from './Typography';
import useLogin from '../hooks/useLogin.jsx';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';

function Input({ type, id, label }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>
        <Typography>{label}</Typography>
      </label>
      <div className="flex rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-gray-600 sm:max-w-sm">
        <input
          required
          type={type}
          id={id}
          name={id}
          autoComplete="on"
          className="flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 outline-none focus:ring-0 sm:leading-6"
        />
      </div>
    </div>
  );
}

const inputs = [
  {
    type: 'email',
    id: 'email',
    label: 'Email:'
  },
  {
    type: 'password',
    id: 'password',
    label: 'Password:'
  }
];

function LoginForm() {
  const [login, loading, errorMsg, success] = useLogin();
  const { auth } = useAuth();

  if (auth?.user) return <Navigate to="/dashboard" replace={true} />;

  function handleSubmit(e) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));

    login(data);
  }

  return (
    <div className="mx-auto">
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="flex flex-col gap-5">
        {inputs.map((i) => (
          <Input key={i.id} {...i} />
        ))}
        <div className="flex flex-col gap-2">
          <div>
            <button
              type="submit"
              disabled={loading}
              className="bg-mantis-400 hover:bg-mantis-300 disabled:bg-mantis-300 focus-visible:outline-mantis-400 text-md rounded-md px-6 py-2 font-bold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
              Login
            </button>
          </div>
          {errorMsg && (
            <Typography type="small" className="text-red-600">
              {errorMsg}
            </Typography>
          )}
          {success && (
            <Typography type="small">
              Successfully logged in. You're being redirected to the admin
              panel...
            </Typography>
          )}
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
