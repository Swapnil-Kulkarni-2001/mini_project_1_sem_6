import axios from "../../../Axios/axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const postWork = createAsyncThunk("postWork", async (data) => {

    try {
        const resp = await axios.post("/employeer/jobPostForm", {
            workName: data.workName,
            workAddress: data.workAddress,
            workDuration: data.workDuration,
            workTime: data.workTime,
            workFrom: data.workFrom,
            latitude: data.latitude,
            longitude: data.longitude,
            postTime: data.postTime,
            workDescription: data.workDescription
        });

        return resp.data;

    } catch (error) {
        console.log(error);
    }
});

export const fetchAllWorkPost = createAsyncThunk("fetchAllWorkPost", async () => {

    console.log("fetchAllWorkPost")

    try {

        const resp = await axios.get("/employeer/jobPostsPerEmployeer");
        console.log(resp.data);
        return resp.data;

    } catch (error) {
        console.error(error);
    }

});


export const fetchWorkPost = createAsyncThunk("fetchWorkPost", async ({ workid }) => {

    try {

        const resp = await axios.post("/employeer/singlePost", {
            postId: workid
        });

        // console.log(resp.data);

        return resp.data;

    } catch (error) {
        console.error(error);
    }

});


export const deleteWorkPost = createAsyncThunk("deleteWorkPost",async ({workid})=>{

    try{

        const resp = await axios.post("/employeer/deletePost",{
            postId : workid
        });

        return resp.data;

    }catch(error){
        console.error(error);
    }
});


const initialState = {

    allWorkPost: [],
    workPost: "",
    isLoading: false,
    error : "",
};


const workPostSlice = createSlice({
    name: "workPost",
    initialState,
    extraReducers: (builder) => {

        //post new work

        builder.addCase(postWork.pending, (state, action) => {
            state.isLoading = true
        });

        builder.addCase(postWork.fulfilled, (state, action) => {
            console.log(action.payload);
            state.isLoading = false
        });

        builder.addCase(postWork.rejected, (state, action) => {
            state.error = action.error;
            state.isLoading = false;
        });

        //fetch all work posts by work provider

        builder.addCase(fetchAllWorkPost.pending, (state, action) => {
            state.isLoading = true;
        });

        builder.addCase(fetchAllWorkPost.fulfilled, (state, { payload }) => {
            state.isLoading = false;

            state.allWorkPost = [];

            for (let i = 0; i < payload.data.length; i++) {
                state.allWorkPost.push(payload.data[i][0]);
            }

        });

        builder.addCase(fetchAllWorkPost.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        //fetch work post by workId

        builder.addCase(fetchWorkPost.pending,(state,action)=>{
            state.isLoading = true
        });

        builder.addCase(fetchWorkPost.fulfilled,(state,{payload})=>{
            state.workPost = payload.data;
            if(payload.data!=undefined)
            {
                state.isLoading = false;
            }
        });

        builder.addCase(fetchWorkPost.rejected,(state,action)=>{
            state.isLoading = true;
            state.error = action.error;
        });

        //delete work post by workID

        builder.addCase(deleteWorkPost.pending,(state,action)=>{

            state.isLoading = true;

        });

        builder.addCase(deleteWorkPost.fulfilled,(state,{payload})=>{
            state.isLoading = true;
            console.log(payload);
        });

        builder.addCase(deleteWorkPost.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.error;
        });
    }

});

export default workPostSlice.reducer;

