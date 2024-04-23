export function resizeImageTo450x450(inputImage) {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        canvas.width = 450;
        canvas.height = 450;
        const ctx = canvas.getContext('2d');
        
        const img = new Image();
        img.onload = function() {
            // Calculate aspect ratio
            const aspectRatio = img.width / img.height;
            
            // Determine the resizing dimensions
            let newWidth, newHeight;
            if (aspectRatio >= 1) {
                newWidth = 450;
                newHeight = 450 / aspectRatio;
            } else {
                newWidth = 450 * aspectRatio;
                newHeight = 450;
            }
            
            // Draw the resized image onto the canvas
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            
            // Convert canvas content to base64 data URL
            const resizedDataURL = canvas.toDataURL();
            
            // Create new Image object with the resized image
            const resizedImg = new Image();
            resizedImg.onload = function() {
                resolve(resizedImg);
            };
            resizedImg.src = resizedDataURL;
        };
        img.onerror = function(error) {
            reject(error);
        };
        img.src = inputImage.src; // Assuming inputImage is an Image object
    });
}

export function dataURLtoFile(dataURL, filename) {
    var arr = dataURL.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
}