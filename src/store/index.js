import { configureStore } from "@reduxjs/toolkit";
import  sideDrowerSlice  from "../store/accountSidePanel/slice"; 

import authSlice from "../store/auth/slice";
import allWorkSlice from "../store/public/slice";
// import postWorkSlice from "../store/postWork/slice"
import applyWorkSlice  from "./applyWork/slice"
// import workPostByEmployeerSlice from "../store/workPostByEmployeer/slice"

// import singleWorkPostSlice from "./individualWorkPost/slice";

import workPostSlice from "./workprovider/workpost/slice";
import workSlice from "./worker/work/slice";
import userInfoSlice from "./userInfo/slice";


const store = configureStore({
    reducer:{
        sideDrower : sideDrowerSlice,
        auth : authSlice,
        allWork : allWorkSlice,
        // postWork : postWorkSlice,
        applyWork : applyWorkSlice, 
        // workPostByEmployeer : workPostByEmployeerSlice,
        // singleWorkPost : singleWorkPostSlice,
        workPost : workPostSlice,
        work : workSlice,
        userInfo : userInfoSlice,
    },
});

export default store;