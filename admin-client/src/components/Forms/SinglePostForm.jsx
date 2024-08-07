import useFormAction from '../../hooks/useFormAction';
import putFetcherMulti from '../../fetchers/putFetcherMulti';
import postFetcherMulti from '../../fetchers/postFetcherMulti';
import ModelForm from './ModelForm';
import useFetch from '../../hooks/useFetch';
import getFetcher from '../../fetchers/getFetcher';
import Loading from '../General/Loading';
import ErrorMessage from '../General/ErrorMessage';
import DeleteForm from './DeleteForm';
import { ReferenceToOuterLink } from '../General/ReferenceToLink';
import { formatForDatePicker } from '../../helpers/formatDate';

function SinglePostForm({ data = { post: {} } }) {
  const [authorsData, loading, error] = useFetch('/users', getFetcher);
  const formAction = data?.post?._id
    ? useFormAction(`/posts/${data?.post?._id}`, putFetcherMulti)
    : useFormAction(`/posts/`, postFetcherMulti);

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

  const { published, title, author, content, createdAt, editedAt, imageUrl } =
    data?.post;

  const publishedOptions = [
    {
      value: false,
      text: 'Unpublished'
    },
    {
      value: true,
      text: 'Published'
    }
  ];

  const authorsList = authorsData?.users?.map((a) => ({
    value: a._id,
    text: a.handle
  }));

  const formattedCreatedAt = createdAt && formatForDatePicker(createdAt);
  const formattedEditedAt = editedAt && formatForDatePicker(editedAt);

  const fullUrl = imageUrl && `${import.meta.env.VITE_API_URL}/${imageUrl}`;

  const formFields = [
    {
      type: 'select',
      id: 'published',
      label: 'Published Status:',
      options: publishedOptions
    },
    {
      type: 'container',
      id: 'container-1',
      children: [
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
        }
      ]
    },
    {
      type: 'imagefile',
      id: 'image',
      label: 'Post Image:',
      existing: fullUrl
    },
    {
      type: 'textarea',
      id: 'content',
      label: 'Content:',
      validations: { required: 'Content must not be empty' },
      rows: 20
    },
    {
      type: 'container',
      id: 'container-2',
      children: [
        {
          type: 'datetime-local',
          id: 'createdAt',
          label: 'Created At:'
        },
        {
          type: 'datetime-local',
          id: 'editedAt',
          label: 'Edited At:'
        }
      ]
    }
  ];

  return (
    <>
      {published && (
        <ReferenceToOuterLink suffixUrl={`/posts/${data?.post?._id}`} />
      )}
      <ModelForm
        buttonText="Update"
        formFields={formFields}
        existingValues={{
          published,
          title,
          content,
          author: author?._id,
          createdAt: formattedCreatedAt,
          editedAt: formattedEditedAt
        }}
        defaultValues={{
          published: '',
          author: ''
        }}
        formAction={formAction}
        successMsg="Successfully updated! You're being redirected to main posts page..."
        redirectPath="/posts"
      />
      {data?.post?._id && (
        <DeleteForm
          type="Post"
          suffixUrl={`/posts/${data.post._id}`}
          redirectPath={'/posts'}
        />
      )}
    </>
  );
}

export default SinglePostForm;
