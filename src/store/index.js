import { configureStore } from "@reduxjs/toolkit";
import  sideDrowerSlice  from "../store/accountSidePanel/slice"; 

const store = configureStore({
    reducer:{
        sideDrower : sideDrowerSlice,
    },
});

export default store;