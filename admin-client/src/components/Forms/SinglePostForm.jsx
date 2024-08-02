import useFormAction from '../../hooks/useFormAction';
import putFetcher from '../../fetchers/putFetcher';
import ModelForm from './ModelForm';
import useFetch from '../../hooks/useFetch';
import getFetcher from '../../fetchers/getFetcher';
import Loading from '../General/Loading';
import ErrorMessage from '../General/ErrorMessage';

function SinglePostForm({ data = { post: {} } }) {
  const [authorsData, loading, error] = useFetch('/users', getFetcher);
  const formAction = useFormAction(`/posts/${data?.post?._id}`, putFetcher);

  if (!authorsData && loading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  if (error) {
    return (
      <>
        <ErrorMessage error={error} />
      </>
    );
  }

  const { title, content, author } = data?.post;
  const authorsList = authorsData.users.map((a) => ({
    _id: a._id,
    handle: a.handle
  }));
  const formFields = [
    {
      type: 'text',
      id: 'title',
      label: 'Title:',
      validations: { required: 'Title must not be empty' }
    },
    {
      type: 'select',
      id: 'author',
      label: 'Author:',
      options: authorsList
    },
    {
      type: 'textarea',
      id: 'content',
      label: 'Content:',
      validations: { required: 'Content must not be empty' },
      rows: 20
    }
  ];

  return (
    <ModelForm
      buttonText="Update"
      formFields={formFields}
      existingValues={{ title, content, author: author._id }}
      formAction={formAction}
      successMsg="Successfully updated! You're being redirected to main posts page..."
      redirectPath="/posts"
    />
  );
}

export default SinglePostForm;
