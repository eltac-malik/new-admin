import {createSlice} from '@reduxjs/toolkit'

const textSlice = createSlice({
    name:"text",
    initialState:{
       text:{},
       slidId:null,
       evenData:{}
    },
    reducers:{
        setText:(state,action)=>
        {
            state.text = action.payload
        },
        setId:(state,action)=>
        {
            state.slidId = action.payload
        },
        setEvenData:(state,action)=>
        {
            state.evenData = action.payload
        }
    }
})

export default textSlice.reducer
export const {setText,setId,setEvenData} = textSlice.actions