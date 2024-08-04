import Table from './Table';
import { formatDate } from '../../helpers/formatDate';
import { Link } from 'react-router-dom';

function PostsTable({ data }) {
  return (
    <div>
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
            fn: (v) => {
              if (v?.author?._id) {
                return (
                  <Link to={`/users/${v.author._id}`}>{v.author.handle}</Link>
                );
              } else {
                return;
              }
            },
            typographyType: 'smallerLink'
          },
          {
            title: 'Date',
            field: 'createdAt',
            fn: (v) => formatDate(v.createdAt)
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
