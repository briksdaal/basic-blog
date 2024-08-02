import Typography from '../../General/Typography';

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

export default Input;
