const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    open:false,
};

const sideDrowerSlice = createSlice({

    name:"sideDrower",
    initialState,
    reducers:{
        openToggle:(state,{payload})=>{
            state.open = !payload;
        }
    }
});

export const {
    openToggle
} = sideDrowerSlice.actions;

export default sideDrowerSlice.reducer;