import toast, { Toaster } from 'react-hot-toast';

export const CopyLink = ({ link }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    toast.success('Copied to clipboard');
  };
  return (
    <div className='flex justify-between border-2 rounded-lg text-sm bg-gray-200'>
      <div className='w-56 flex items-center'>
        <div className='truncate pl-3'>{link}</div>
      </div>
      <button
        className='text-white text-sm hover:bg-blue-300 shadow-md bg-blue-400 rounded py-2 px-4 cursor-pointer'
        onClick={copyToClipboard}
      >
        Copy Link
      </button>
      <Toaster />
    </div>
  );
};
