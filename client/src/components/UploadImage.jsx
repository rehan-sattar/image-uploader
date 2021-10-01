import { useEffect, useRef, useState } from 'react';

import { uploadImage } from '../services/uploadImage';
import { toBase64 } from '../utils/toBase64';
import { ImagePreview } from './ImagePreview';
import { validateImageByExtension } from '../utils/imageValidation';
import { UploadingLoader } from './UploadingLoader';

import imageUploadIcon from '../assets/image-upload.svg';
import '../styles/App.css';

/**
 * Referenced Article for Drag and Drop: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
 */

function UploadImage() {
  const [file, setFile] = useState();
  const [uploading, setUploading] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');
  const [highlighted, setHighlighted] = useState(false);
  const [fileValidationErr, setFileValidationErr] = useState('');
  const fileUploadContainerRef = useRef();

  const uploadFile = async () => {
    setUploading(true);
    try {
      const base64 = await toBase64(file);
      const response = await uploadImage(base64);
      const completeURL = `http://localhost:8080/${response.data.url}`;
      setUploadedFileUrl(completeURL);
      setUploading(false);
    } catch (err) {
      console.log('Error: ', JSON.stringify(err));
    } finally {
      setUploading(false);
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    validateAndSaveFile(file);
  };

  const validateAndSaveFile = (file) => {
    const [, imageExtension] = file.type.split('/');
    if (validateImageByExtension(imageExtension.toLowerCase())) {
      setFile(file);
      setFileValidationErr('');
    } else {
      setFileValidationErr('Please select a file only of png or jpg format.');
    }
  };

  const preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const highlight = () => {
    if (!highlighted) setHighlighted(true);
  };

  const unHighlight = () => {
    setHighlighted(false);
  };

  const handleDrop = (e) => {
    const dataTransfer = e.dataTransfer;
    const [file] = dataTransfer.files;
    validateAndSaveFile(file);
  };

  useEffect(() => {
    // register all the drag and drop events here
    const dropArea = fileUploadContainerRef.current;
    const dragAndDropEvents = ['dragenter', 'dragover', 'dragleave', 'drop'];
    if (dropArea) {
      dragAndDropEvents.forEach((eventName) => {
        dropArea.addEventListener(eventName, preventDefaults, false);
      });
      [('dragenter', 'dragover')].forEach((eventName) => {
        dropArea.addEventListener(eventName, highlight, false);
      });
      ['dragleave', 'drop'].forEach((eventName) => {
        dropArea.addEventListener(eventName, unHighlight, false);
      });
      dropArea.addEventListener('drop', handleDrop, false);
    }

    // remove all the drag and drop events here
    return () => {
      dragAndDropEvents.forEach((eventName) => {
        dropArea.removeEventListener(eventName, preventDefaults, false);
      });
    };
  }, []);

  useEffect(() => {
    if (file) {
      uploadFile();
    }
  }, [file]);

  if (uploading) {
    return <UploadingLoader />;
  }

  if (uploadedFileUrl) {
    return <ImagePreview imageUrl={uploadedFileUrl} />;
  }

  return (
    <div className='bg-gray-100 h-screen'>
      <div className='h-full w-full flex justify-center items-center'>
        <div className='image-upload-container w-96 bg-white rounded-lg shadow-md'>
          <div className='h-full flex flex-col py-8 px-6 justify-between items-center'>
            <div className='mx-auto text-center'>
              <h1 className='text-xl'>Upload Your Image</h1>
              <input
                id='file-upload'
                type='file'
                onChange={handleFileInputChange}
                className='invisible'
              />
              <div className='text-sm text-gray-500'>
                File should be png or jpg
              </div>
              {fileValidationErr && (
                <div className='mt-3 text-sm text-red-500'>
                  {fileValidationErr}
                </div>
              )}
            </div>
            <div
              className={`h-full w-full border-2 rounded-lg border-dashed ${
                highlighted
                  ? 'border-blue-500 bg-blue-100 '
                  : 'border-blue-300 bg-gray-100'
              }  my-6 flex flex-col justify-center items-center`}
              ref={fileUploadContainerRef}
            >
              <img src={imageUploadIcon} alt='upload-image' className='h-28' />
              <p className='text-sm text-gray-500 mt-3'>
                {highlighted ? 'Drop' : 'Drag'} your image here
              </p>
            </div>
            <div className='text-sm'>Or</div>
            <label
              htmlFor='file-upload'
              className='text-white text-sm hover:bg-blue-300 shadow-md bg-blue-400 rounded py-2 px-4 mt-4 cursor-pointer'
            >
              Choose File
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadImage;
