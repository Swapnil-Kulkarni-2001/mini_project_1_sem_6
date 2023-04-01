const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "../../Axios/axios";

export const applyWork = createAsyncThunk("applyWork",async (data)=>{

    console.log("in applywork");
    console.log("in apply workworkId ",data);

    try{

        const resp = await axios.post("/employee/apply",{
            postId:data
        });

        console.log(resp.data);
        return resp.data;

    }catch(error){
        console.error(error);
    }

});

const initialState = {
    isApplyWorkLoading : false,
    applyRespData : "",
};

const applyWorkSlice = createSlice({
    name : "applyWork",
    initialState,

    extraReducers:(builder)=>{

        builder.addCase(applyWork.pending,(state,action)=>{
            state.isApplyWorkLoading = true;
        });

        builder.addCase(applyWork.fulfilled,(state,{payload})=>{
            state.isApplyWorkLoading = false;
            console.log("fullfiled");
            state.applyRespData = payload
            console.log(payload);
        });

        builder.addCase(applyWork.rejected,(state,action)=>{
            state.isApplyWorkLoading = false;
        });

    }
});

export default applyWorkSlice.reducer;