import React from 'react'
import {useDispatch} from 'react-redux'
import { setInputImage,setPrevImage } from '../reducers/myReducer';

const FileSelector = () => {

  const dispatch = useDispatch()
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      dispatch(setInputImage(event.target.result));
      dispatch(setPrevImage(event.target.result))
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };


  return (
    <input type="file" id="fileInput" accept="image/*" onChange={handleFileChange}/>
  )
}

export default FileSelector