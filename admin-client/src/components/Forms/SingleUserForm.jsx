import useFormAction from '../../hooks/useFormAction';
import putFetcherMulti from '../../fetchers/putFetcherMulti';
import postFetcherMulti from '../../fetchers/postFetcherMulti';
import ModelForm from './ModelForm';
import DeleteForm from './DeleteForm';
import { ReferenceToOuterLink } from '../General/ReferenceToLink';

function SingleUserForm({ data = { user: {} } }) {
  const formAction = data?.user?._id
    ? useFormAction(`/users/${data?.user?._id}`, putFetcherMulti)
    : useFormAction(`/users/`, postFetcherMulti);

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
          label: 'First Name:',
          validations: { required: 'First Name must not be empty' }
        },
        {
          type: 'text',
          id: 'lastname',
          label: 'Last Name:',
          validations: { required: 'Last Name must not be empty' }
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

  if (!data?.user?._id) {
    formFields.unshift(
      {
        type: 'email',
        id: 'email',
        label: 'Email:',
        validations: { required: 'Last Name must not be empty' }
      },
      {
        type: 'container',
        id: 'container-2',
        children: [
          {
            type: 'password',
            id: 'password',
            label: 'Password:',
            validations: { required: 'Password must not be empty' }
          },
          {
            type: 'password',
            id: 'password-confirm',
            label: 'Confirm Password:',
            validations: { required: 'Confirm password must not be empty' },
            validate: (watch) => (val) => {
              if (watch('password') !== val) {
                return "Passwords don't match";
              }
            }
          }
        ]
      }
    );
  }

  return (
    <>
      {data?.user?._id && (
        <ReferenceToOuterLink suffixUrl={`/authors/${data?.user?._id}`} />
      )}
      <ModelForm
        buttonText="Update"
        formFields={formFields}
        existingValues={{ handle, firstname, lastname, admin }}
        defaultValues={{
          admin: ''
        }}
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
