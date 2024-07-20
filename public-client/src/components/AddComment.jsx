import { useState } from 'react';
import Typography from './Typography';
import Loading from './Loading';

function AddComment({ postId, updateList }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [authorError, setAuthorError] = useState('');
  const [contentError, setContentError] = useState('');

  function validations(data) {
    return data.author.length && data.content.length;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    setLoading(true);
    setSuccess(false);
    setGeneralError('');
    setAuthorError('');
    setContentError('');

    if (!validations(data)) {
      if (!data.author.length) {
        setAuthorError('Author must contain at least 1 characters');
      }
      if (!data.content.length) {
        setContentError('Content must contain at least 1 characters');
      }

      setGeneralError('Errors have occured, please fix and try again');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      fetch(`${import.meta.env.VITE_API_URL}comments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then((data) => {
          const errors = data.errors?.errors;
          if (errors) {
            setGeneralError('Errors have occured. Please fix and try again');
            errors.forEach((singleEr) => {
              if (singleEr.path === 'author') {
                setAuthorError(singleEr.msg);
              } else if (singleEr.path === 'content') {
                setContentError(singleEr.msg);
              }
            });
          } else if (data.success) {
            form.reset();
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
              updateList();
            }, 2000);
          }
        })
        .catch((e) => {
          setGeneralError(e.message);
        })
        .finally(() => setLoading(false));
    }, 500);
  }

  return (
    <div className="my-4">
      <Typography type="smallTitle">Leave a Comment</Typography>
      <form method="POST" onSubmit={handleSubmit} className="mt-3">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="author">
              <Typography type="smaller">Name</Typography>
            </label>
            <div className="flex rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-gray-600 sm:max-w-sm">
              <input
                type="text"
                id="author"
                name="author"
                className="flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 outline-none focus:ring-0 sm:leading-6"
              />
            </div>
            {authorError && (
              <div>
                <Typography type="smaller" className="text-red-600">
                  {authorError}
                </Typography>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="content">
              <Typography type="smaller">Your Comment</Typography>
            </label>
            <div className="flex rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-gray-600 sm:max-w-xl">
              <textarea
                id="content"
                name="content"
                className="flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 outline-none focus:ring-0 sm:leading-6"></textarea>
            </div>
            {contentError && (
              <div>
                <Typography type="smaller" className="text-red-600">
                  {contentError}
                </Typography>
              </div>
            )}
          </div>
          <input type="hidden" id="post" name="post" value={postId} />
          <div className="flex flex-col gap-2 sm:max-w-xl">
            <div className="flex items-center justify-between gap-2">
              <button
                className="bg-mantis-400 hover:bg-mantis-300 focus-visible:outline-mantis-400 text-md rounded-md px-6 py-2 font-bold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                type="submit"
                disabled={loading}>
                Send
              </button>
              <div>
                {loading && <Loading />}
                {success && (
                  <Typography type="small">
                    Your comment was successfully sent!
                  </Typography>
                )}
              </div>
            </div>
            <div className="min-h-8">
              {generalError && (
                <div className="text-red-600">{generalError}</div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddComment;
