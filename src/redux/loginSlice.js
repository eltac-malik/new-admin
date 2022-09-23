import {createSlice} from '@reduxjs/toolkit'

const loginSlice = createSlice({
    name:"login",
    initialState:{
        isLogged:JSON.parse(localStorage.getItem("route"))
    },
    reducers:{
        setLog:(state,action)=>
        {
            state.isLogged = action.payload
        }
    }
})

export default loginSlice.reducer
export const {setLog} = loginSlice.actions