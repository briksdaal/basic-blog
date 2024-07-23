import { useState } from 'react';
import Typography from './Typography';

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

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

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

  function handleSubmit(e) {
    e.preventDefault();

    setErrorMsg('');
    setSuccess(false);
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.target));

    fetch(`${import.meta.env.VITE_API_URL}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(async (res) => {
        if (res.status > 200) {
          const json = await res.json();
          throw new Error(json.errors[0].msg);
        }
        return res.json();
      })
      .then((data) => {
        setSuccess(true);

        console.log(data);
      })
      .catch((err) => {
        setErrorMsg(err.message);
      })
      .finally(() => setLoading(false));
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
