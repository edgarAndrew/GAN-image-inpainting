import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBrushThickness } from '../reducers/myReducer'

const ThicknessSlider = () => {
  const dispatch = useDispatch()
  const {brush_thickness} = useSelector((state)=>state.myReducer)

  const handleChange = (e) =>{
    const newThickness = parseInt(e.target.value);
    dispatch(setBrushThickness(newThickness));
  }

  return (
    <input type="range" id="thicknessSlider" min="8" max="40" value={brush_thickness} onChange={handleChange}></input>
  )
}

export default ThicknessSlider