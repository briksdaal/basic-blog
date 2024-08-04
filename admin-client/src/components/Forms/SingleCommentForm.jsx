import useFormAction from '../../hooks/useFormAction';
import useFetch from '../../hooks/useFetch';
import getFetcher from '../../fetchers/getFetcher';
import putFetcherJson from '../../fetchers/putFetcherJson';
import postFetcherJson from '../../fetchers/postFetcherJson';
import Loading from '../General/Loading';
import ErrorMessage from '../General/ErrorMessage';
import ModelForm from './ModelForm';
import DeleteForm from './DeleteForm';
import { ReferenceToInnerLink } from '../General/ReferenceToLink';

function SingleCommentForm({ data = { comment: {} } }) {
  const [postsData, loading, error] = useFetch('/posts', getFetcher);
  const formAction = data?.comment?._id
    ? useFormAction(`/comments/${data?.comment?._id}`, putFetcherJson)
    : useFormAction(`/comments/`, postFetcherJson);

  const { author, content, post } = data?.comment;

  if (!postsData && loading) {
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

  const postsList = postsData?.posts?.map((a) => ({
    value: a._id,
    text: a.title.slice(0, 30)
  }));

  const formFields = [
    {
      type: 'select',
      id: 'post',
      label: 'Post:',
      options: postsList
    },
    {
      type: 'text',
      id: 'author',
      label: 'Name:',
      validations: { required: 'Name must not be empty' }
    },
    {
      type: 'textarea',
      id: 'content',
      label: 'Content:',
      validations: { required: 'Content must not be empty' }
    }
  ];

  return (
    <>
      {data?.comment?.post && (
        <ReferenceToInnerLink
          text="For Post:"
          suffixUrl={`/posts/${data.comment.post?._id}`}
          linkText={data.comment.post?.title}
        />
      )}
      <ModelForm
        buttonText="Update"
        formFields={formFields}
        existingValues={{ post: post?._id, author, content }}
        defaultValues={{
          post: ''
        }}
        formAction={formAction}
        successMsg="Successfully updated! You're being redirected to main comments page..."
        redirectPath="/comments"
      />
      {data?.comment?._id && (
        <DeleteForm
          type="Comment"
          suffixUrl={`/comments/${data.comment._id}`}
          redirectPath={'/comments'}
        />
      )}
    </>
  );
}

export default SingleCommentForm;
