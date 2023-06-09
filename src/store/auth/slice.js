const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "../../Axios/axios";

export const loginUser = createAsyncThunk("loginUser", async (data) => {

    try {
        const resp = await axios.post("/login", {
            email: data.email,
            password: data.password
        });
        //console.log(resp.data)
        return resp.data;

    } catch (error) {
        console.error(error);
    }
})

export const logoutUser = createAsyncThunk("logoutUser", async () => {

    try {

        const resp = await axios.get("/logout");
        return resp.data;

    } catch (error) {
        console.error(error);
    }

});

export const fetchProfilePicEmp = createAsyncThunk("fetchProfilePicEmp", async () => {

    console.log("fetchProfilePicEmp");

    try {

        const resp = await axios.get("/employee/uploadProfileImg");
        console.log(resp.data);
        return resp.data;

    } catch (error) {
        console.error(error);
    }

});

export const fetchProfilePicEmplr = createAsyncThunk("fetchProfilePicEmplr", async () => {
    console.log("fetchProfilePicEmplr");
    try {

        const resp = await axios.get("/employeer/uploadProfileImg");
        console.log(resp.data);
        return resp.data;

    } catch (error) {
        console.error(error);
    }

});

const initialState = {
    isAuthenticated: "nil",
    authLoading: false,
    isLogoutLoding: false,
    isFirstTime: true,
    userName: "",
    userType: "",
    userEmail: "",
    userPass: "",
    userId: "",
    userLoc: {},
    userAccessToken: "",
    profilePic: "",
    profilePicLoading: false,
    error: "",
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        }

    },
    extraReducers: (builder) => {

        builder.addCase(loginUser.pending, (state, action) => {
            state.authLoading = true;
        });

        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            state.authLoading = false;
            if (payload.status === "failed to login") {
                console.log("unAuth");
                state.isAuthenticated = false;
            }
            else {
                state.isAuthenticated = true;
                try {
                    state.profilePic = payload.data[0].profileImg;
                    state.userType = payload.data[0].occuopation;
                    state.userEmail = payload.data[0].email;
                    state.userId = payload.data[0]._id;
                    state.userPass = payload.data[0].password;
                    state.userAccessToken = payload.token;
                } catch (error) {
                    state.isAuthenticated = "nil";
                }
            }

        });

        builder.addCase(loginUser.rejected, (state, action) => {
            state.error = action.error;
        });

        //logout user

        builder.addCase(logoutUser.pending, (state, action) => {
            state.isLogoutLoding = true;
        });

        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.isLogoutLoding = false;
        });

        builder.addCase(logoutUser.rejected, (state, action) => {
            state.isLogoutLoding = false;
        });


        //fetch profilepic for employee

        builder.addCase(fetchProfilePicEmp.pending, (state, action) => {
            state.profilePicLoading = true;
        });

        builder.addCase(fetchProfilePicEmp.fulfilled, (state, { payload }) => {
            state.profilePicLoading = false;
            //console.log(payload);
            try {
                state.profilePic = payload.url;
            } catch (err) {
                console.log(err);
            }

        });

        builder.addCase(fetchProfilePicEmp.rejected, (state, action) => {
            state.profilePicLoading = false;
        });


        //fetch profilepic for employeer

        builder.addCase(fetchProfilePicEmplr.pending, (state, action) => {
            state.profilePicLoading = true;
        });

        builder.addCase(fetchProfilePicEmplr.fulfilled, (state, { payload }) => {
            state.profilePicLoading = false;
            //console.log(payload);
            try {
                state.profilePic = payload.url;
            } catch (err) {
                console.log(err);
            }
        });

        builder.addCase(fetchProfilePicEmplr.rejected, (state, action) => {
            state.profilePicLoading = false;
        });


    }
})

export const { setIsAuthenticated } = authSlice.actions;

export default authSlice.reducer

