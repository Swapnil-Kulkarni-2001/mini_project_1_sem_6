import axios from "../../../Axios/axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const fetchRecommendedWorks = createAsyncThunk("fetchRecommendedWorks", async () => {

    try {
        const resp = await axios.get("/employee/recommendationList");

        //console.log(resp.data);
        return resp.data;
    } catch (error) {
        console.error(error);
    }

});

export const fetchInvitationList = createAsyncThunk("fetchInvitationList",async()=>{

    try {
        const resp = await axios.get("/employee/invitaionList");

        //console.log(resp.data);
        return resp.data;
    } catch (error) {
        console.error(error);
    }

});

const initialState = {
    recommendedWorks: [],
    recommendedWorksLoading: false,
    invitedWorks: [],
    invitedWorksLoading: false,
}


const workSlice = createSlice({
    name: "work",
    initialState,

    extraReducers: (builder) => {

        //fetch recommended works

        builder.addCase(fetchRecommendedWorks.pending, (state, action) => {
            state.recommendedWorksLoading = true;
        });

        builder.addCase(fetchRecommendedWorks.fulfilled, (state, { payload }) => {
        
            try{
                state.recommendedWorks = payload.recommendationData;
                state.recommendedWorksLoading = false;
            }catch(err){
                console.log(err);
            }

        });

        builder.addCase(fetchRecommendedWorks.rejected, (state, action) => {
            state.recommendedWorksLoading = false;
        });


        //fetch invitation list

        builder.addCase(fetchInvitationList.pending,(state,action)=>{
            state.invitedWorksLoading = true;
        });

        builder.addCase(fetchInvitationList.fulfilled,(state,{payload})=>{
            state.invitedWorksLoading = false;
            if(payload!=null || payload!=undefined){
                state.invitedWorks = payload.data;
            }
        });

        builder.addCase(fetchInvitationList.rejected,(state,action)=>{
            state.invitedWorksLoading = false;
        });

    }
});


export default workSlice.reducer;