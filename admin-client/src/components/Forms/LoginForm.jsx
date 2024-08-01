import Typography from '../General/Typography.jsx';
import useLogin from '../../hooks/useLogin.jsx';
import { useForm } from 'react-hook-form';

function Input({ type, id, label, validations, register, errorMsg }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>
        <Typography>{label}</Typography>
      </label>
      <div className="flex rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-gray-600 sm:max-w-sm">
        <input
          type={type}
          id={id}
          {...register(id, { ...validations })}
          autoComplete="on"
          className="flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 outline-none focus:ring-0 sm:leading-6"
        />
      </div>
      <div>
        {errorMsg && (
          <Typography type="small" className="text-red-600">
            {errorMsg}
          </Typography>
        )}
      </div>
    </div>
  );
}

const inputs = [
  {
    type: 'email',
    id: 'email',
    label: 'Email:',
    validations: { required: 'Email must not be empty' }
  },
  {
    type: 'password',
    id: 'password',
    label: 'Password:',
    validations: { required: 'Password must not be empty' }
  }
];

function LoginForm() {
  const [login, loading, errorMsg, success] = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  function onSubmit(data) {
    login(data);
  }

  return (
    <div className="mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {inputs.map((i) => (
          <Input
            key={i.id}
            {...i}
            register={register}
            errorMsg={errors[i.id]?.message}
          />
        ))}
        <div className="flex flex-col gap-2">
          <div>
            <button
              type="submit"
              disabled={loading}
              className="text-md rounded-md bg-mantis-400 px-6 py-2 font-bold text-white shadow-sm hover:bg-mantis-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mantis-400 disabled:bg-mantis-300">
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
