const { createSlice,createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "../../Axios/axios";

export const loginUser = createAsyncThunk("loginUser",async (data)=>{

    try{
        const resp = await axios.post("/login",{
            email : data.email,
            password : data.password
        });
        //console.log(resp.data)
        return resp.data;

    }catch(error){
        console.error(error);
    }
})

const initialState = {
    isAuthenticated : false,
    authLoading : false,
    isFirstTime : true,
    userType : 0,
    userEmail : "",
    userPass : "",
    userId : "",
    userLoc : {} ,
    error : "",
}

const authSlice = createSlice({
    name : "auth",
    initialState,

    extraReducers:(builder)=>{

        builder.addCase(loginUser.pending,(state,action)=>{
            state.authLoading = true;
        });

        builder.addCase(loginUser.fulfilled,(state,{payload})=>{
            state.authLoading = false;
            
            // if(payload.status==="Successful as employee")
            // {
            //     state.isAuthenticated = true;
            //     console.log("Auth");
            // }

            if(payload.status==="failed to login")
            {
                console.log("unAuth");
                state.isAuthenticated = false;
            }
            else{
                state.isAuthenticated = true;
                console.log("Auth");
                console.log(payload.data[0].email)
                if(payload.data[0].occupation==="Employee")
                {
                    state.userType = 1;
                }
                if(payload.data[0].occupation==="Employeer")
                {
                    state.userType = 2;
                }
                state.userEmail = payload.data[0].email;
                state.userId = payload.data[0]._id;
                state.userPass = payload.data[0].password;
            }

        });

        builder.addCase(loginUser.rejected,(state,action)=>{
            state.error = action.error;
        });
    }
})


export default authSlice.reducer