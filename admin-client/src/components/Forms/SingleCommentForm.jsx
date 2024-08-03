import useFormAction from '../../hooks/useFormAction';
import putFetcherJson from '../../fetchers/putFetcherJson';
import ModelForm from './ModelForm';
import { ReferenceToInnerLink } from '../General/ReferenceToLink';

function SingleCommentForm({ data = { comment: {} } }) {
  const formAction = useFormAction(
    `/comments/${data?.comment?._id}`,
    putFetcherJson
  );
  const { author, content } = data?.comment;

  const formFields = [
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
        existingValues={{ author, content }}
        formAction={formAction}
        successMsg="Successfully updated! You're being redirected to main comments page..."
        redirectPath="/comments"
      />
    </>
  );
}

export default SingleCommentForm;
