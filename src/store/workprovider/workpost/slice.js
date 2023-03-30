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


export const deleteWorkPost = createAsyncThunk("deleteWorkPost", async ({ workid }) => {

    try {

        const resp = await axios.post("/employeer/deletePost", {
            postId: workid
        });

        return resp.data;

    } catch (error) {
        console.error(error);
    }
});


export const fetchApplicantList = createAsyncThunk("fetchApplicantList", async ({ workid }) => {
    try {
        const resp = await axios.post("/employeer/applicantList", {
            postId: workid
        });
        return resp.data;
    } catch (error) {
        console.error(error);
    }
});


export const fetchAssignedList = createAsyncThunk("fetchAssignedList", async ({ workid }) => {
    try {

        const resp = await axios.post("/employeer/assignedList", {
            postId: workid
        });
        return resp.data;
    } catch (error) {
        console.error(error);
    }

})


const initialState = {

    allWorkPost: [],
    workPost: "",
    workPostLoading : false,
    applicantList: [],
    applicantListLoading: false,
    assignedList: [],
    assignedListLoading: false,
    isLoading: false,
    error: "",
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

            if (payload.data != undefined) {
                for (let i = 0; i < payload.data.length; i++) {
                    state.allWorkPost.push(payload.data[i][0]);
                }
            }



        });

        builder.addCase(fetchAllWorkPost.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        //fetch work post by workId

        builder.addCase(fetchWorkPost.pending, (state, action) => {
            state.workPostLoading = true
        });

        builder.addCase(fetchWorkPost.fulfilled, (state, { payload }) => {
            // state.workPost = payload.data;
            if (payload != undefined) {
                state.workPost = payload.data;
                state.workPostLoading = false;
            }
        });

        builder.addCase(fetchWorkPost.rejected, (state, action) => {
            state.workPostLoading = true;
            state.error = action.error;
        });

        //delete work post by workID

        builder.addCase(deleteWorkPost.pending, (state, action) => {

            state.isLoading = true;

        });

        builder.addCase(deleteWorkPost.fulfilled, (state, { payload }) => {
            state.isLoading = true;
            //console.log(payload);
        });

        builder.addCase(deleteWorkPost.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });


        //fetch applicant list

        builder.addCase(fetchApplicantList.pending, (state, action) => {
            state.applicantListLoading = true;
        });

        builder.addCase(fetchApplicantList.fulfilled, (state, { payload }) => {
            state.applicantListLoading = false;
            state.applicantList = payload.data;
            //console.log(payload.data);
        });

        builder.addCase(fetchApplicantList.rejected, (state, action) => {
            state.applicantListLoading = false;
        });

        //fetch assigned list

        builder.addCase(fetchAssignedList.pending, (state, action) => {
            state.assignedListLoading = true;
        });

        builder.addCase(fetchAssignedList.fulfilled, (state, { payload }) => {
            state.assignedListLoading = false;
            state.assignedList = payload.data;
        });

        builder.addCase(fetchAssignedList.rejected, (state, action) => {
            state.assignedListLoading = false;
        });


    }

});

export default workPostSlice.reducer;

