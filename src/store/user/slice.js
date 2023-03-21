const { createSlice } = require("@reduxjs/toolkit");


const initialState = {
    userType : "",
    userEmail : "",
    userId : "",
    userLoc : ""    
}

const userSlice = createSlice({

    name : "user",
    initialState,
    reducers : {
        setUserBaseInfo:(state,{payload})=>{
            state.userType = payload.userType;
            state.userEmail = payload.userEmail;
            state.userId = payload.userId;
            state.userLoc = payload.userLoc;
        },
    }
});

export const {
    setUserBaseInfo
} = userSlice.actions;

export default userSlice.reducer;