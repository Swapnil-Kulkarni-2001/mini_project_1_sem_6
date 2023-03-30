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
        
            state.recommendedWorks = payload.recommendationData;
            state.recommendedWorksLoading = false;

        });

        builder.addCase(fetchRecommendedWorks.rejected, (state, action) => {
            state.recommendedWorksLoading = false;
        });


    }
});


export default workSlice.reducer;