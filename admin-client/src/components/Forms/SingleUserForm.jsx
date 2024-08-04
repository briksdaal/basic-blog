import useFormAction from '../../hooks/useFormAction';
import putFetcherMulti from '../../fetchers/putFetcherMulti';
import ModelForm from './ModelForm';
import DeleteForm from './DeleteForm';
import { ReferenceToOuterLink } from '../General/ReferenceToLink';

function SingleUserForm({ data = { user: {} } }) {
  const formAction = useFormAction(
    `/users/${data?.user?._id}`,
    putFetcherMulti
  );

  const { handle, firstname, lastname, imageUrl, admin } = data?.user;

  const fullUrl = imageUrl && `${import.meta.env.VITE_API_URL}/${imageUrl}`;

  const adminOptions = [
    {
      value: false,
      text: 'Not Admin'
    },
    {
      value: true,
      text: 'Admin'
    }
  ];

  const formFields = [
    {
      type: 'text',
      id: 'handle',
      label: 'Handle:',
      validations: { required: 'Handle must not be empty' }
    },
    {
      type: 'container',
      id: 'container-1',
      children: [
        {
          type: 'text',
          id: 'firstname',
          label: 'Firstname:',
          validations: { required: 'Firstname must not be empty' }
        },
        {
          type: 'text',
          id: 'lastname',
          label: 'Lastname:',
          validations: { required: 'Lastname must not be empty' }
        }
      ]
    },
    {
      type: 'imagefile',
      id: 'image',
      label: 'Profile Image:',
      existing: fullUrl
    },
    {
      type: 'select',
      id: 'admin',
      label: 'Admin Status:',
      options: adminOptions
    }
  ];

  return (
    <>
      {data?.user && (
        <ReferenceToOuterLink suffixUrl={`/authors/${data?.user?._id}`} />
      )}
      <ModelForm
        buttonText="Update"
        formFields={formFields}
        existingValues={{ handle, firstname, lastname, admin }}
        formAction={formAction}
        successMsg="Successfully updated! You're being redirected to main users page..."
        redirectPath="/users"
      />
      {data?.user?._id && (
        <DeleteForm
          type="User"
          suffixUrl={`/users/${data.user._id}`}
          redirectPath={'/users'}
        />
      )}
    </>
  );
}

export default SingleUserForm;
