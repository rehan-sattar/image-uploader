import { useState } from 'react';

function App() {
  const [file, setFile] = useState();
  const [uploading, setUploading] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');
  const [fileValidationErr, setFileValidationErr] = useState('');

  const uploadFile = () => {
    setUploading(true);
    // .. call api here
    setUploadedFileUrl('');
    setUploading(false);
  };

  const handleFileInputChange = event => {
    const file = event.target.files[0];
    const [, imageExtension] = file.type.split('/');
    if (validateImageByExtension(imageExtension.toLowerCase())) {
      setFile(file);
      setFileValidationErr('');
    } else {
      setFileValidationErr('Please select a file only of png or jpg format.');
    }
  };

  const validateImageByExtension = extension => {
    if (
      !extension ||
      (extension !== 'png' && extension !== 'jpg' && extension !== 'jpeg')
    ) {
      return false;
    }
    return true;
  };

  return (
    <div className="bg-gray-100 h-screen">
      <div className="h-full w-full flex justify-center items-center">
        <div className="h-96 w-96 bg-white rounded-lg shadow-md">
          <div className="h-full flex flex-col py-8 px-6 justify-between items-center">
            <div className="mx-auto text-center">
              <h1 className="text-xl">Upload Your Image</h1>
              <input type="file" onChange={handleFileInputChange} />
              <div className="mt-3 text-sm text-gray-500">
                File should be png or jpg
              </div>
              {fileValidationErr && (
                <div className="mt-3 text-sm text-red-500">
                  {fileValidationErr}
                </div>
              )}
            </div>
            <div className="h-full w-full border-2 rounded border-dashed my-6 bg-gray-100"></div>
            <div className="text-sm">Or</div>
            <button className="text-white text-sm hover:bg-blue-300 shadow-md bg-blue-400 rounded py-2 px-4 mt-4">
              Choose File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
