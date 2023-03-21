import { configureStore } from "@reduxjs/toolkit";
import  sideDrowerSlice  from "../store/accountSidePanel/slice"; 

import authSlice from "../store/auth/slice"
import userSlice from "../store/user/slice"

const store = configureStore({
    reducer:{
        sideDrower : sideDrowerSlice,
        auth : authSlice,
    },
});

export default store;