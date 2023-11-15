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
    return "data:image/png;base64," + image;
};

const ImageService = {
    validateImageDimensions,
    convertToBase64Image,
};
export default ImageService;
