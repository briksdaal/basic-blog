import { useForm } from 'react-hook-form';
import GeneralInput from './Inputs/GeneralInput';
import Typography from '../General/Typography';
import Loading from '../General/Loading';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ModelForm({
  buttonText,
  formFields,
  existingValues,
  formAction,
  successMsg,
  redirectPath = '/dashboard'
}) {
  const { action, loading, errors: serverError, success } = formAction;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ values: existingValues });

  const navigate = useNavigate();

  function onSubmit(data) {
    action(data);
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate(redirectPath);
      }, 1000);
    }
  }, [success]);

  return (
    <div className="mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          {formFields.map((ff) =>
            ff.type !== 'container' ? (
              <div key={ff.id}>
                <GeneralInput
                  {...ff}
                  register={register}
                  errorMsg={errors[ff.id]?.message}
                />
              </div>
            ) : (
              <div
                key={ff.id}
                className="flex w-full flex-col justify-between gap-2 sm:max-w-2xl sm:flex-row sm:gap-8">
                {ff.children.map((ffi) => (
                  <div key={ffi.id} className="grow">
                    <GeneralInput
                      {...ffi}
                      register={register}
                      errorMsg={errors[ffi.id]?.message}
                    />
                  </div>
                ))}
              </div>
            )
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between sm:max-w-sm">
            <button
              type="submit"
              disabled={loading || success}
              className="text-md rounded-md bg-mantis-400 px-6 py-2 font-bold text-white shadow-sm hover:bg-mantis-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mantis-400 disabled:bg-mantis-300">
              {buttonText}
            </button>
            {loading && (
              <div className="flex items-center">
                <div className="h-8 w-8">
                  <Loading />
                </div>
              </div>
            )}
          </div>
          {serverError && (
            <Typography type="small" className="text-red-600">
              {serverError}
            </Typography>
          )}
          {success && (
            <Typography type="small">
              {successMsg || 'Success! Redirecting...'}
            </Typography>
          )}
        </div>
      </form>
    </div>
  );
}

export default ModelForm;
