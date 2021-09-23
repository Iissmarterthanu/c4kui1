import React from 'react';
import Banner from '../components/banner/Banner';
import Spotlight from '../components/spotlight/Spotlight';

function Home({groups}) {
  return (
    <div>
      <Banner />
      <Spotlight groups={groups}/>
    </div>
  );
}

export default Home;