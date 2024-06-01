import React from 'react'
import FileSelector from '../components/FileSelector'
import ModelSelector from '../components/ModelSelector'
import ThicknessSlider from '../components/ThicknessSlider'
import Canvas from '../components/Canvas'
import ModelOutput from '../components/ModelOutput'
import Header from '../components/Header'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'

export const Home = () => {
  const {isLoading} = useSelector((state) => state.myReducer)

  if(isLoading)
    return(
      <Loader/>
  )
  else
  return (
      <div>
        <Header/>
        <div className='inputs'>
          <FileSelector/>
          <ModelSelector/>
          <ThicknessSlider/>
        </div>
        <div className='myCanvas'>
          <Canvas/>
          <ModelOutput/>
        </div>
      </div>
  )
}
