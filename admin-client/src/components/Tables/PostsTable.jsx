import Typography from '../General/Typography';
import Table from './Table';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

function PostsTable({ data }) {
  return (
    <div>
      <Typography>Posts</Typography>
      <Table
        data={data.posts}
        columns={[
          {
            title: 'Title',
            field: 'title'
          },
          {
            title: 'Author',
            field: 'author',
            fn: (v) => (
              <Link to={`/users/${v.author._id}`}>{v.author.handle}</Link>
            )
          },
          {
            title: 'Date',
            field: 'createdAt',
            fn: (v) => format(v.createdAt, 'dd/MM/yyyy hh:mm:ss')
          },
          {
            title: 'Published',
            field: 'published',
            fn: (v) => (v.published ? 'Yes' : 'No')
          }
        ]}
        route="/posts"
      />
    </div>
  );
}

export default PostsTable;
