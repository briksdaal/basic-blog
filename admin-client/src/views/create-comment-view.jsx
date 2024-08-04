import SingleCommentForm from '../components/Forms/SingleCommentForm';
import PageTitle from '../components/General/PageTitle';
import Breadcrumbs from '../components/General/Breadcrumbs';

function CreateCommentView() {
  return (
    <div>
      <Breadcrumbs />
      <PageTitle>Create New Comment</PageTitle>
      <SingleCommentForm />
    </div>
  );
}

export default CreateCommentView;
