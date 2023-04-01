import axios from "../../Axios/axios";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const fetchUserInfoEmp = createAsyncThunk("fetchUserInfoEmp", async () => {

    try {
        const resp = await axios.get("/employee/personalInfo");
        return resp.data;
    } catch (error) {
        console.error(error);
    }

});


export const fetchUserInfoEmplr = createAsyncThunk("fetchUserInfoEmplr", async () => {

    try {
        const resp = await axios.get("/employeer/personalInfo");
        return resp.data;
    } catch (error) {
        console.error(error);
    }

});


const initialState = {
    userInfoData: "",
    userInfoDataLoading: false,
};

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,

    extraReducers: (builder) => {

        //fetch employee info

        builder.addCase(fetchUserInfoEmp.pending, (state) => {
            state.userInfoDataLoading = true;
        });

        builder.addCase(fetchUserInfoEmp.fulfilled, (state, { payload }) => {
            state.userInfoDataLoading = false;
            if (payload != null) {
                state.userInfoData = payload.data;
            }
        });

        builder.addCase(fetchUserInfoEmp.rejected, (state) => {
            state.userInfoDataLoading = false;
        });

        //fetch employeer info

        builder.addCase(fetchUserInfoEmplr.pending, (state) => {
            state.userInfoDataLoading = true;
        });

        builder.addCase(fetchUserInfoEmplr.fulfilled, (state, { payload }) => {
            state.userInfoDataLoading = false;
            if (payload != null) {
                state.userInfoData = payload.data;
            }
        });

        builder.addCase(fetchUserInfoEmplr.rejected, (state) => {
            state.userInfoDataLoading = false;
        });
    }
});

export default userInfoSlice.reducer;