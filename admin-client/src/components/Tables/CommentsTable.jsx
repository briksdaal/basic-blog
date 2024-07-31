import Table from './Table';
import { formatDate } from '../../helpers/formatDate';

function CommentsTable({ data }) {
  return (
    <div>
      <Table
        data={data.comments}
        columns={[
          {
            title: 'By',
            field: 'author'
          },
          {
            title: 'Content',
            field: 'content',
            className: 'max-w-96 line-clamp-1 overflow-hidden text-ellipsis'
          },
          {
            title: 'Date',
            field: 'createdAt',
            fn: (v) => formatDate(v.createdAt)
          }
        ]}
        route="/comments"
      />
    </div>
  );
}

export default CommentsTable;
