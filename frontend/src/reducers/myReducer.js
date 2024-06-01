import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  input_image: '',
  model_output: '',
  brush_thickness:10,
  model_name:'nfd_256',
  error: '',
  prevImage:'',
  currentImage:'',
  redoFlag:false
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
      state.currentImage = action.payload;
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
    },
    setPrevImage:(state,action)=>{
      state.prevImage =action.payload
    },
    setRedoFlag:(state,action)=>{
      state.redoFlag = action.payload
      state.model_output = ''
    }
  },
});

export const {
  inpaintingRequest,
  inpaintingSuccess,
  inpaintingFailure,
  setInputImage,
  setBrushThickness,
  setModel,
  setPrevImage,
  setRedoFlag
} = myReducerSlice.actions;

export default myReducerSlice.reducer;
