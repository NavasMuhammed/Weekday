import { createSlice } from '@reduxjs/toolkit';
import { jobSliceInitialState } from '../../utils/constants';
import { fetchJobs } from './fetchJob';
const jobsSlice = createSlice({
    name: 'jobs',
    initialState: jobSliceInitialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = action.payload; // Set the entire filters object as the state
            state.jobs = []; // Reset the jobs array
            state.page = 0; // Reset the page state
        },
        resetFilters: (state) => {
            state.filters = {};
            state.jobs = []; // Reset the jobs array
            state.page = 0; // Reset the page state
        },
        resetJobs: (state) => {
            state.jobs = [];
            state.page = 0; // Reset the page state
            state.noMoreJobs = false;
        },
        setNoMoreJobs: (state, action) => {
            state.noMoreJobs = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Update jobs list with the newly fetched jobs
                state.jobs = [...state.jobs, ...action.payload.jobsList];
                // Update the page state with the last page fetched
                state.page = action.payload.page;
                state.noMoreJobs = action.payload.noMoreJobs;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});
export const { resetJobs, setFilters, resetFilters, setNoMoreJobs } = jobsSlice.actions;

export const selectFilters = (state) => state.jobs.filters;

export default jobsSlice.reducer;