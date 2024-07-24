function ErrorMessage({ error }) {
  return (
    <>
      <h3 className="text-2xl">{error.toString()}</h3>
      <h4 className="text-xl">There seems to have been an error...</h4>
    </>
  );
}

export default ErrorMessage;
