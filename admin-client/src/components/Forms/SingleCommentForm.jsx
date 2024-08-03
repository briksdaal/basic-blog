import useFormAction from '../../hooks/useFormAction';
import putFetcherJson from '../../fetchers/putFetcherJson';
import ModelForm from './ModelForm';
import Typography from '../General/Typography';
import { Link } from 'react-router-dom';

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
      <div className="mb-4">
        <Typography type="smaller">For post: </Typography>
        <Link to={`/posts/${data.comment.post._id}`}>
          <Typography type="smallerLink">{data.comment.post.title}</Typography>
        </Link>
      </div>
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
