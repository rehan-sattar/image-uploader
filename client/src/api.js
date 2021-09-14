const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const uploadImage = base64 => {
  const END_POINT = `${API_BASE_URL}/image-upload`;
  return fetch(END_POINT, {
    method: 'POST',
    body: JSON.stringify({
      image: base64,
    }),
  });
};
