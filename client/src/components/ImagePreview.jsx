import { CopyLink } from './CopyLink';

import greenCheck from '../assets/green-check.svg';

export const ImagePreview = ({ imageUrl }) => {
  return (
    <div className='w-96 bg-white px-5 py-7 flex flex-col justify-center items-center rounded-lg shadow-lg'>
      <div className='mb-5'>
        <img src={greenCheck} />
      </div>
      <div className='text-xl mb-5'> Uploaded Successfully!</div>
      <div>
        <img
          src={imageUrl}
          alt='image preview'
          className='w-full h-full rounded-lg mb-5'
        />
      </div>
      <div className='w-full h-full'>
        <CopyLink link={imageUrl} />
      </div>
    </div>
  );
};
