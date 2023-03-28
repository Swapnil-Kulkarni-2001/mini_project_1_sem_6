const { createSlice,createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "../../Axios/axios";

export const fetchAllWorks = createAsyncThunk("fetchAllWorks",async (coordinates)=>{

    try{
        
        console.log("in fetch")

        const resp = await axios.post("/alljobs",{
            latitude : coordinates.lat,
            longitude : coordinates.lng,
        });
        return resp.data;
    }catch(error){
        console.error(error);
    }

});


const initialState = {
    data:[],
    isDataLoading : false,
}


const allWorkSlice = createSlice({
    name:"allworks",
    initialState,

    extraReducers:(builder)=>{

        builder.addCase(fetchAllWorks.pending,(state,action)=>{
            state.isDataLoading = true;
            console.log("loading");
        });

        builder.addCase(fetchAllWorks.fulfilled,(state,{payload})=>{
            state.isDataLoading = false;
            state.data = payload.jobPosts;
            //console.log(payload);
        });

        builder.addCase(fetchAllWorks.rejected,(state,action)=>{
            state.isDataLoading = true;
        })

    }

});

export default allWorkSlice.reducer;