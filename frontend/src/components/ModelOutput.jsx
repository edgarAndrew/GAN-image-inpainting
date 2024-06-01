import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {setRedoFlag} from '../reducers/myReducer'

const ModelOutput = () => {
  const {model_output} = useSelector((state) => state.myReducer)
  const dispatch = useDispatch()

  const handleRedo = () =>{
    dispatch(setRedoFlag(true))
  }

  if(model_output)
  return (
    <div className='cont1'>
      <div className='white-border'>
        <img id="outputImage" src={model_output} alt=""/>
      </div>
      <div className='inputs'>
        <button id="redoBtn" onClick={handleRedo}>Redo</button>
      </div>
    </div>
    
  )
  else
    return(null)
}

export default ModelOutput