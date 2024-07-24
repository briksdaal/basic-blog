import { Helmet } from 'react-helmet-async';
import DashboardView from '../views/dashboard-view';

function DashboardPage() {
  return (
    <>
      <Helmet>
        <title>JourneyJot - Admin Dashboard</title>
      </Helmet>

      <DashboardView />
    </>
  );
}

export default DashboardPage;
