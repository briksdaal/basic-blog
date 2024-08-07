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
  defaultValues,
  formAction,
  successMsg,
  redirectPath = '/dashboard',
  dropBeforeSend,
  submitColor = 'green',
  centered = false
}) {
  const { action, loading, errors: serverError, success } = formAction;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({ values: existingValues, defaultValues: defaultValues });

  const navigate = useNavigate();

  const greenColors =
    'bg-mantis-400 hover:bg-mantis-300 focus-visible:outline-mantis-400 disabled:bg-mantis-300';

  const redColors =
    'bg-red-500 hover:bg-red-300 focus-visible:outline-red-500 disabled:bg-red-300';

  function onSubmit(data) {
    const processedData = { ...data };

    if (dropBeforeSend) {
      if (
        dropBeforeSend.email &&
        processedData.email === dropBeforeSend.email
      ) {
        delete processedData.email;
      }

      if (
        dropBeforeSend.password &&
        processedData.password === '' &&
        processedData['password-confirm'] === ''
      ) {
        delete processedData.password;
        delete processedData['password-confirm'];
      }
    }

    action(processedData);
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate(redirectPath);
      }, 1000);
    }

    return () => {
      if (success) {
        navigate(redirectPath);
      }
    };
  }, [success]);

  function populateWithWatch(fields) {
    return fields?.map((f) => {
      if (f.type === 'container') {
        return { ...f, children: populateWithWatch(f.children) };
      }
      if (f.validate) {
        return {
          ...f,
          validations: { ...f.validations, validate: f.validate(watch) }
        };
      }
      return f;
    });
  }

  const populatedFormFields = populateWithWatch(formFields);

  return (
    <div className="mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          {populatedFormFields?.map((ff) =>
            ff.type !== 'container' ? (
              <div key={ff.id}>
                <GeneralInput
                  {...ff}
                  register={register}
                  errorMsg={errors[ff.id]?.message}
                  setValue={setValue}
                />
              </div>
            ) : (
              <div
                key={ff.id}
                className="flex w-full flex-col justify-between gap-2 sm:max-w-2xl sm:flex-row sm:gap-8">
                {ff.children.map((ffi) => (
                  <div key={ffi.id} className="flex-1">
                    <GeneralInput
                      {...ffi}
                      register={register}
                      errorMsg={errors[ffi.id]?.message}
                      setValue={setValue}
                    />
                  </div>
                ))}
              </div>
            )
          )}
        </div>
        <div className={`flex flex-col gap-2 ${centered && 'items-center'}`}>
          <div
            className={`flex justify-between sm:max-w-sm ${centered && 'flex-col gap-6'}`}>
            <button
              type="submit"
              disabled={loading || success}
              className={`text-md rounded-md px-6 py-2 font-bold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${submitColor === 'green' ? greenColors : redColors}`}>
              {buttonText}
            </button>
            {loading && (
              <div
                className={`flex items-center ${centered && 'justify-center'}`}>
                <div className="h-8 w-8">
                  <Loading />
                </div>
              </div>
            )}
          </div>
          <div className="min-h-8">
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
        </div>
      </form>
    </div>
  );
}

export default ModelForm;
