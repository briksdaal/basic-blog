import SinglePostForm from '../components/Forms/SinglePostForm';
import PageTitle from '../components/General/PageTitle';
import Breadcrumbs from '../components/General/Breadcrumbs';

function CreatePostView() {
  return (
    <div>
      <Breadcrumbs />
      <PageTitle>Create New Post</PageTitle>
      <SinglePostForm />
    </div>
  );
}

export default CreatePostView;
