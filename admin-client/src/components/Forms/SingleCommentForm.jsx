import useFormAction from '../../hooks/useFormAction';
import putFetcher from '../../fetchers/putFetcher';
import ModelForm from './ModelForm';

function SingleCommentForm({ data = { comment: {} } }) {
  const formAction = useFormAction(
    `/comments/${data?.comment?._id}`,
    putFetcher
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
    <ModelForm
      buttonText="Update"
      formFields={formFields}
      existingValues={{ author, content }}
      formAction={formAction}
      successMsg="Successfully updated! You're being redirected to main comments page..."
      redirectPath="/comments"
    />
  );
}

export default SingleCommentForm;
