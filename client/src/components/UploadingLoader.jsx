import React from 'react';

import '../styles/loader.css';

export const UploadingLoader = ({ styles }) => {
  return (
    <div className='flex flex-col justify-center items-center rounded-lg shadow-md pt-5 bg-white text-center w-96'>
      <div className='font-bold text-lg mb-5'>Uploading...</div>
      <div className='lds-dual-ring' style={styles}></div>;
    </div>
  );
};
