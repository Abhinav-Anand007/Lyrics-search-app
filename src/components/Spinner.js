import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading..."
        style={{ width: '200px', margin: '40px auto', display: 'block' }}
        className="spinner-img"
      />
    </div>
  );
};

export default Spinner;
