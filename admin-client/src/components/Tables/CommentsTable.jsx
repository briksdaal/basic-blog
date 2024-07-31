import Typography from '../General/Typography';
import Table from './Table';
import { formatDate } from '../../helpers/formatDate';

function CommentsTable({ data }) {
  return (
    <div>
      <Typography>Comments</Typography>
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
            className: 'w-96 line-clamp-1 overflow-hidden text-ellipsis'
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
