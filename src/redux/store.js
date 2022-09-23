import {configureStore} from '@reduxjs/toolkit'
import loginSlice from './loginSlice'
import textSlice from './textSlice'

export  const store = configureStore({
    reducer:{
        login:loginSlice,
        text:textSlice
    }
})