import React from 'react'
import FileSelector from '../components/FileSelector'
import ModelSelector from '../components/ModelSelector'
import ThicknessSlider from '../components/ThicknessSlider'
import Canvas from '../components/Canvas'
import ModelOutput from '../components/ModelOutput'
import UserActions from '../components/UserActions'

export const Home = () => {
  return (
      <div>
        <FileSelector/>
        <ModelSelector/>
        <ThicknessSlider/>
        <Canvas/>
        <ModelOutput/>
        <UserActions/>
      </div>
  )
}
