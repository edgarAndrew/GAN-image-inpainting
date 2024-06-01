import React from 'react'
import { setModel } from '../reducers/myReducer'
import { useDispatch } from 'react-redux'

const models = [
  {
    name:"places2",
    value:"release_places2_256"
  },
  {
    name:"celeba_hq",
    value:"release_celeba_hq_256"
  },
  {
    name:"vrodaa",
    value:"nfd_256"
  },
]
const ModelSelector = () => {
  const dispatch = useDispatch()

  const handleChange = (e) =>{
    console.log(e.target.value)
    dispatch(setModel(e.target.value))
  }
  return (
    <div className='cont2'>
        <h3>Select Model</h3>
        <select id="modelSelect" defaultValue='nfd_256' onChange={handleChange}>
            {
              models.map((item,index)=>
                <option key={index} value={item.value}>{item.name}</option>
              )
            }
        </select>
    </div>
  )
}

export default ModelSelector