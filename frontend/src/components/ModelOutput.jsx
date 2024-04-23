import React from 'react'
import { useSelector } from 'react-redux'

const ModelOutput = () => {
  const {model_output} = useSelector((state) => state.myReducer)

  if(model_output)
  return (
    <div>
        <h3>Model Output</h3>
        <img id="outputImage" src={model_output} alt=""/>
    </div>
  )
  else
    return(null)
}

export default ModelOutput