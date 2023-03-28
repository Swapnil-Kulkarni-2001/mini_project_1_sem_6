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
    userType : "",
    userEmail : "",
    userPass : "",
    userId : "",
    userLoc : {} ,
    userAccessToken : "",
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
                console.log(payload.data);
                console.log(payload.data[0].email)
                state.userType = payload.data[0].occuopation;
                state.userEmail = payload.data[0].email;
                state.userId = payload.data[0]._id;
                state.userPass = payload.data[0].password;
                state.userAccessToken = payload.token;
            }

        });

        builder.addCase(loginUser.rejected,(state,action)=>{
            state.error = action.error;
        });
    }
})


export default authSlice.reducer