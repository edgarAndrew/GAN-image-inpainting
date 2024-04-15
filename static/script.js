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
let maskDataURL
let canvasDataURL
let canvasImg
let maskImg
let isDrawing = false;

fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function() {
        img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            canvas_hidden.width = img.width;
            canvas_hidden.height = img.height;
            ctx.drawImage(img, 0, 0);
        }
        img.src = reader.result;
    }
    reader.readAsDataURL(file);
});


canvas.addEventListener('mousedown', function(e) {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.strokeStyle = 'white'; // Set brush color to white
    
    ctx2.beginPath();
    ctx2.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx2.strokeStyle = 'white'; // Set brush color to white
});

canvas.addEventListener('mousemove', function(e) {
    if (isDrawing) {
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();

        ctx2.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx2.stroke();
    }
});

canvas.addEventListener('mouseup', function() {
    isDrawing = false;
});


thicknessSlider.addEventListener('input', function() {
    ctx.lineWidth = thicknessSlider.value
    ctx2.lineWidth = thicknessSlider.value
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
        outputImg.src = 'data:image/png;base64,' + result.outputImageData;
        outputImg.height = img.height
        outputImg.width = img.width
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