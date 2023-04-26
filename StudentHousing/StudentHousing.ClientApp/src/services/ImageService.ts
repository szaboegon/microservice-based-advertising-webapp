const validateImageDimensions = async (file: File): Promise<boolean> => {
  var reader = new FileReader();

  reader.readAsDataURL(file);
  const validationResult = new Promise<boolean>((resolve, reject) => {
    reader.onload = function (e) {
      var image = new Image();

      if (e.target && e.target?.result) {
        image.src = e.target.result.toString();
      }

      image.onload = async function () {
        var height = image.height;
        var width = image.width;
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

  return validationResult;
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
