import Typography from '../../General/Typography';

function Select({ id, label, options, validations, register, errorMsg }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>
        <Typography>{label}</Typography>
      </label>
      <div className="flex rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-gray-600 sm:max-w-sm">
        <select
          id={id}
          {...register(id, { ...validations })}
          className="flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 outline-none focus:ring-0 sm:leading-6">
          {options.map((o, i) => (
            <option key={o.value} value={o.value}>
              {o.text}
            </option>
          ))}
        </select>
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

export default Select;
