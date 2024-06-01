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
    <div className='cont2'>
        <h3>Brush Thickeness</h3>
        <div className='cont3'>
          <input type="range" id="thicknessSlider" min="5" max="40" value={brush_thickness} onChange={handleChange}></input>
        </div>
        
    </div>
    
  )
}

export default ThicknessSlider