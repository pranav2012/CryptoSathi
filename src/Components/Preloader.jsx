import React from 'react';
import { Lines } from 'react-preloaders';

function Preloader() {
  return (
    <React.Fragment>
      <Lines
      time={800}
      customLoading={false}
       />
    </React.Fragment>
  );
}

export default Preloader;