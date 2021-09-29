import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const uploadImage = (base64, uploadProgress) => {
  const config = {
    onUploadProgress: function (progressEvent) {
      let percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      if (uploadProgress) uploadProgress(percentCompleted);
    }
  };
  const END_POINT = `${API_BASE_URL}/image-upload`;
  return axios.post(END_POINT, { image: base64 }, config);
};
