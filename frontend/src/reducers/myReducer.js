import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  input_image: '',
  model_output: '',
  brush_thickness:15,
  model_name:'nfd_256',
  error: '',
};

export const myReducerSlice = createSlice({
  name: 'myReducer',
  initialState,
  reducers: {
    inpaintingRequest: (state) => {
      state.isLoading = true;
      state.error = '';
      state.model_output = '';
    },
    inpaintingSuccess: (state, action) => {
      state.isLoading = false;
      state.model_output = action.payload;
      state.error = '';
    },
    inpaintingFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setInputImage: (state, action) => {
      state.input_image = action.payload;
    },
    setBrushThickness:(state,action) =>{
      state.brush_thickness = action.payload
    },
    setModel:(state,action)=>{
      state.model_name =action.payload
    }
  },
});

export const {
  inpaintingRequest,
  inpaintingSuccess,
  inpaintingFailure,
  setInputImage,
  setBrushThickness,
  setModel
} = myReducerSlice.actions;

export default myReducerSlice.reducer;
