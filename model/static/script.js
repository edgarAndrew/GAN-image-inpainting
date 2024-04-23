// canvas
const canvas = document.getElementById('canvas');
const canvas_hidden = document.getElementById('canvas-hidden')

// canvas context
const ctx = canvas.getContext('2d');
const ctx2 = canvas_hidden.getContext('2d')

// DOM elements
const fileInput = document.getElementById('fileInput');
const extractBtn = document.getElementById('extractBtn');
const thicknessSlider = document.getElementById('thicknessSlider');
const outputImg = document.getElementById('outputImage')
const doneBtn = document.getElementById('sendServer')

// variables
let img;
let maskDataURL;
let canvasDataURL;
let canvasImg;
let maskImg;
let isDrawing = false;

fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function() {
        img = new Image();
        img.onload = function() {
            // Resize the image to 450x450
            resizeImageTo450x450(img).then(function(resizedImg) {
                canvas.width = resizedImg.width;
                canvas.height = resizedImg.height;
                canvas_hidden.width = resizedImg.width;
                canvas_hidden.height = resizedImg.height;
                ctx.drawImage(resizedImg, 0, 0);
            }).catch(function(error) {
                console.error('Error resizing image:', error);
            });
        }
        img.src = reader.result;
    }
    reader.readAsDataURL(file);
});

canvas.addEventListener('mousedown', function(e) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY);
    ctx.strokeStyle = 'white'; // Set brush color to white
    
    ctx2.beginPath();
    ctx2.moveTo(mouseX, mouseY);
    ctx2.strokeStyle = 'white'; // Set brush color to white
});

canvas.addEventListener('mousemove', function(e) {
    if (isDrawing) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();

        ctx2.lineTo(mouseX, mouseY);
        ctx2.stroke();
    }
});

canvas.addEventListener('mouseup', function() {
    isDrawing = false;
});


thicknessSlider.addEventListener('input', function() {
    ctx.lineWidth = thicknessSlider.value;
    ctx2.lineWidth = thicknessSlider.value;
});


async function sendToServer() {
    try{
        doneBtn.disabled = true
        createMask()
        const formData = new FormData();
        const canvasFile = dataURLtoFile(canvasDataURL, 'canvas_image.png');
        const maskFile = dataURLtoFile(maskDataURL, 'mask_image.png');

        formData.append('image', canvasFile);
        formData.append('mask', maskFile);
        formData.append('model',document.getElementById('modelSelect').value)

        const response = await fetch('/process_images', { method: 'POST', body: formData})
        const result = await response.json()
        
        // Resize output image to 450x450
        outputImg.src = 'data:image/png;base64,' + result.outputImageData;
        outputImg.width = 450;
        outputImg.height = 450;
        
        doneBtn.disabled = false
        
    }catch(error){
        console.log(error)
    }
}

function createMask(){
    // Code to create the mask
    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = canvas.width;
    maskCanvas.height = canvas.height;
    const maskCtx = maskCanvas.getContext('2d');
    maskCtx.fillStyle = 'black';
    maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
    maskCtx.drawImage(canvas_hidden, 0, 0);
    maskDataURL = maskCanvas.toDataURL(); 
    maskImg = new Image();
    maskImg.src = maskDataURL;
    maskImg.id = 'maskImg';


    // Convert canvas and mask images to data URLs
    canvasDataURL = canvas.toDataURL();
    canvasImg = new Image();
    canvasImg.src = canvasDataURL;
    canvasImg.id = 'canvasImg';
}

// Convert image data to File object
function dataURLtoFile(dataURL, filename) {
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

function resizeImageTo450x450(inputImage) {
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



