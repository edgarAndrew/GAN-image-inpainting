import axios from "axios"
import '../axios'
import { inpaintingRequest,inpaintingSuccess,inpaintingFailure } from "../reducers/myReducer"

export const processImage = (image,mask,model)=>async(dispatch)=>{
    try {
        dispatch(inpaintingRequest())

        const formValues = { image,mask,model};
        const formData = new FormData();
          
        for (let key in formValues)
            formData.append(key, formValues[key]);
          
        const {data} = await axios.post('/process_images', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        })

        dispatch(inpaintingSuccess('data:image/png;base64,' + data.outputImageData))

    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch(inpaintingFailure(error.response.data))
    }    
}