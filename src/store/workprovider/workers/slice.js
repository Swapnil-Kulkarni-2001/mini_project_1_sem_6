import axios from "../../../Axios/axios";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchAllWorkersInfo = createAsyncThunk("fetchAllWorkersInfo", async () => {

    try {

        const resp = await axios.get("/employee/allEmployeeInfo");
        return resp.data;
    } catch (error) {
        console.log(error);
    }

});


export const fetchWorkerDataById = createAsyncThunk("fetchWorkerDataById",async({emp_id})=>{

    try{

        const resp = await axios.post("/employee/employeeInfo",{
            employeeId:emp_id
        });

        return resp.data;

    }catch(error){
        console.log(error);
    }

});


const initialState = {
    workersData: [],
    workersDataLoading: false,
    singleWorkerData: "",
    singleWorkerDataLoading: []
}

const workerSlice = createSlice({
    name: "worker",
    initialState,

    extraReducers: (builder) => {

        builder.addCase(fetchAllWorkersInfo.pending, (state) => {
            state.workersDataLoading = true;
        });

        builder.addCase(fetchAllWorkersInfo.fulfilled, (state, { payload }) => {
            if (payload != undefined) {
                state.workersDataLoading = false;
                state.workersData = payload.data;
            }
        });


        builder.addCase(fetchAllWorkersInfo.rejected, (state) => {
            state.workersDataLoading = false;
        });

        //fetch worker data by id

        builder.addCase(fetchWorkerDataById.pending, (state) => {
            state.singleWorkerDataLoading = true;
        });

        builder.addCase(fetchWorkerDataById.fulfilled, (state, { payload }) => {
            if (payload != undefined) {
                state.singleWorkerDataLoading = false;
                state.singleWorkerData = payload.data;
            }
        });


        builder.addCase(fetchWorkerDataById.rejected, (state) => {
            state.singleWorkerDataLoading = false;
        });
    }
});


export default workerSlice.reducer;