import useAuth from '../hooks/useAuth';
import PageTitle from '../components/General/PageTitle';
import Table from '../components/Tables/Table';
import Breadcrumbs from '../components/General/Breadcrumbs';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

function DashboardView() {
  const { auth } = useAuth();

  const types = [
    { _id: 1, type: 'Posts', link: '/posts' },
    { _id: 2, type: 'Comments', link: '/comments' }
  ];

  if (auth?.admin) {
    types.push({ _id: 3, type: 'Users', link: '/users' });
  }

  return (
    <>
      <Breadcrumbs />
      <div>
        <PageTitle>JourneyJot Blog Management</PageTitle>
        <div>
          <Table
            data={types}
            columns={[
              {
                title: 'Type',
                field: 'type'
              },
              {
                title: '',
                className: 'text-right',
                field: 'new',
                fn: (v) => (
                  <Link
                    to={`${v.link}/new`}
                    className="flex justify-end text-sky-800">
                    <FaPlus />
                  </Link>
                )
              }
            ]}
          />
        </div>
      </div>
    </>
  );
}

export default DashboardView;
