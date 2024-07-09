import { useState } from 'react';

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
        setAuthorError('Author must contain at least 1 charcters');
      }
      if (!data.content.length) {
        setContentError('Content must contain at least 1 charcters');
      }

      setGeneralError('Errors have occured. Please fix and try again');
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
      <h3>Add a comment...</h3>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="author">Name</label>
          <input type="text" id="author" name="author" />
          {authorError && <div className="text-red-600">{authorError}</div>}
          <label htmlFor="content">Your Comment</label>
          <textarea id="content" name="content"></textarea>
          {contentError && <div className="text-red-600">{contentError}</div>}
          <input type="hidden" id="post" name="post" value={postId} />
          <div>
            <button className="flex border-2 border-indigo-600" type="submit">
              Send
            </button>
            {loading && <h3>Sending...</h3>}
            {generalError && <div className="text-red-600">{generalError}</div>}
            {success && <div>Your comment was successfully sent!</div>}
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddComment;
