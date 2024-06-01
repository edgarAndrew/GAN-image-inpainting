import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { processImage } from '../actions/myActions';
import { dataURLtoFile } from '../utils';
import {setRedoFlag} from '../reducers/myReducer'

const Canvas = () => {
  const dispatch = useDispatch();
  
  const [canvas, setCanvas] = useState(null);
  const [canvasHidden, setCanvasHidden] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [ctx2, setCtx2] = useState(null);
  const [isDrawing,setIsDrawing] = useState(false)

  const {input_image:inputImage,brush_thickness,model_name,model_output,isLoading,
    prevImage,redoFlag,currentImage
  } = useSelector((state) => state.myReducer)

  useEffect(() => {
    const canvasElement = document.getElementById('canvas');
    const canvasHiddenElement = document.getElementById('canvas-hidden');
    setCanvas(canvasElement);
    setCanvasHidden(canvasHiddenElement);
    setCtx(canvasElement.getContext('2d'));
    setCtx2(canvasHiddenElement.getContext('2d'));
  }, []);

  useEffect(()=>{
    if(ctx && ctx2){
      ctx.lineWidth = brush_thickness;
      ctx2.lineWidth = brush_thickness;
    }
  },[brush_thickness])

  // useEffect(() => {
  //   if (ctx && inputImage) {
  //     const img = new Image();
  //     img.onload = function () {
  //       canvas.width = img.width;
  //       canvas.height = img.height;
  //       canvasHidden.width = img.width;
  //       canvasHidden.height = img.height;
  //       ctx.drawImage(img, 0, 0);
  //     };
  //     img.src = inputImage;
  //   }
  // }, [ctx, inputImage]);

  useEffect(() => {
    if (ctx && inputImage) {
      const img = new Image();
      img.onload = function () {
        const targetWidth = 480;
        const targetHeight = 450;
        
        // Calculate scaled dimensions
        const scale = Math.min(targetWidth / img.width, targetHeight / img.height);
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        
        // Set canvas dimensions
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        canvasHidden.width = targetWidth;
        canvasHidden.height = targetHeight;
        
        // Clear canvases
        ctx.clearRect(0, 0, targetWidth, targetHeight);
        ctx2.clearRect(0, 0, targetWidth, targetHeight);
        
        // Draw the image centered
        const xOffset = (targetWidth - scaledWidth) / 2;
        const yOffset = (targetHeight - scaledHeight) / 2;
        ctx.drawImage(img, xOffset, yOffset, scaledWidth, scaledHeight);
      };
      img.src = inputImage;
    }
  }, [ctx, inputImage]);

  const handleMouseDown = (e) => {
    setIsDrawing(true)
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY);
    ctx.strokeStyle = 'white';
    
    ctx2.beginPath();
    ctx2.moveTo(mouseX, mouseY);
    ctx2.strokeStyle = 'white';
  };

  const handleMouseMove = (e) => {
    if (isDrawing) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      ctx.lineTo(mouseX, mouseY);
      ctx.stroke();

      ctx2.lineTo(mouseX, mouseY);
      ctx2.stroke();
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false)
  };

  const handleSubmit = async() =>{
    const canvasFile = dataURLtoFile(canvas.toDataURL(), 'canvas_image.png');
    const maskFile = dataURLtoFile(canvasHidden.toDataURL(), 'mask_image.png');
    await dispatch(processImage(canvasFile,maskFile,model_name))
  }

  const handleUndo = () =>{
    if (ctx && prevImage) {
      const img = new Image();
      img.onload = function () {
        const targetWidth = 480;
        const targetHeight = 450;
        
        // Calculate scaled dimensions
        const scale = Math.min(targetWidth / img.width, targetHeight / img.height);
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        
        // Set canvas dimensions
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        canvasHidden.width = targetWidth;
        canvasHidden.height = targetHeight;
        
        // Clear canvases
        ctx.clearRect(0, 0, targetWidth, targetHeight);
        ctx2.clearRect(0, 0, targetWidth, targetHeight);
        
        // Draw the image centered
        const xOffset = (targetWidth - scaledWidth) / 2;
        const yOffset = (targetHeight - scaledHeight) / 2;
        ctx.drawImage(img, xOffset, yOffset, scaledWidth, scaledHeight);
      };
      img.src = prevImage;
    }
  }

  useEffect(()=>{
    if(redoFlag){
      if (ctx && currentImage) {
        const img = new Image();
        img.onload = function () {
          const targetWidth = 480;
          const targetHeight = 450;
          
          // Calculate scaled dimensions
          const scale = Math.min(targetWidth / img.width, targetHeight / img.height);
          const scaledWidth = img.width * scale;
          const scaledHeight = img.height * scale;
          
          // Set canvas dimensions
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          canvasHidden.width = targetWidth;
          canvasHidden.height = targetHeight;
          
          // Clear canvases
          ctx.clearRect(0, 0, targetWidth, targetHeight);
          ctx2.clearRect(0, 0, targetWidth, targetHeight);
          
          // Draw the image centered
          const xOffset = (targetWidth - scaledWidth) / 2;
          const yOffset = (targetHeight - scaledHeight) / 2;
          ctx.drawImage(img, xOffset, yOffset, scaledWidth, scaledHeight);
        };
        img.src = currentImage;
      }
      dispatch(setRedoFlag(false))
    }
  },[redoFlag])


  return (
    <div className='cont1'>
        <div>
            <canvas id="canvas" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}></canvas>
            <canvas id="canvas-hidden" hidden></canvas>
        </div>
        <div className='cont2'>
            <button id="sendServer" disabled={isLoading} onClick={handleSubmit}>Done</button>
            <button id="undoBtn" onClick={handleUndo} disabled={isLoading}>Undo</button>
        </div>
    </div>
  )
}

export default Canvas