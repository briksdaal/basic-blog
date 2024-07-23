import { Helmet } from 'react-helmet-async';
import HomeView from '../views/home-view';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>JourneyJot - Home</title>
      </Helmet>

      <HomeView />
    </>
  );
}

export default HomePage;
