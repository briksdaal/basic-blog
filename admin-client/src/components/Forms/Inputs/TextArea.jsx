import Typography from '../../General/Typography';

function TextArea({ type, id, label, validations, register, errorMsg }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>
        <Typography>{label}</Typography>
      </label>
      <div className="flex w-full rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-gray-600 sm:max-w-2xl">
        <textarea
          rows="5"
          type={type}
          id={id}
          {...register(id, { ...validations })}
          autoComplete="on"
          className="w-full flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 outline-none focus:ring-0 sm:leading-6"></textarea>
        {/* <input
         
          className="flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 outline-none focus:ring-0 sm:leading-6"
        /> */}
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

export default TextArea;
