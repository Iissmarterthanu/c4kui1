import React from 'react';
import Banner from '../components/banner/Banner';
import Blurb from '../components/blurb/Blurb';
import Spotlight from '../components/spotlight/Spotlight';

function Home({groups}) {
  return (
    <div>
      <Banner />
      <Blurb /> 
      <Spotlight groups={groups}/>
    </div>
  );
}
 
export default Home;