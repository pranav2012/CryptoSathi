import React from 'react';
import { Lines } from 'react-preloaders';

function Preloader() {
  return (
    <React.Fragment>
      <Lines
       time={1500} 
       />
    </React.Fragment>
  );
}

export default Preloader;