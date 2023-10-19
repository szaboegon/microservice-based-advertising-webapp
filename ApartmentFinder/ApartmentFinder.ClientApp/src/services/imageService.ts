const validateImageDimensions = async (file: File): Promise<boolean> => {
  const reader = new FileReader();

  reader.readAsDataURL(file);
  return new Promise<boolean>((resolve, reject) => {
    reader.onload = function (e) {
      const image = new Image();

      if (e.target && e.target?.result) {
        image.src = e.target.result.toString();
      }

      image.onload = async function () {
        const height = image.height;
        const width = image.width;
        console.log(width);
        console.log(height);
        if (height < 600 || width < 600) {
          resolve(false);
        } else {
          resolve(true);
        }
      };
      image.onerror = reject;
    };
  });
};

const convertToBase64Image = (image: Uint8Array) => {
  var result = "data:image/png;base64," + image;
  return result;
};

const ImageService = {
  validateImageDimensions,
  convertToBase64Image,
};
export default ImageService;
