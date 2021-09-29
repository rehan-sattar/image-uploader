export const validateImageByExtension = (extension) => {
  if (
    !extension ||
    (extension !== 'png' && extension !== 'jpg' && extension !== 'jpeg')
  ) {
    return false;
  }
  return true;
};
