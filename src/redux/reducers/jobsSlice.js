import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchJobsFromAPI } from '../../services/fetchApi';
import { filterJobsByCriteria } from '../../utils/filterJobs';
import { jobSliceInitialState } from '../../utils/constants';



export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (_, { getState, dispatch }) => {
    let jobsList = [];
    let hasMore = true;
    let currentPage = getState().jobs.page;
    const { filters, noMoreJobs } = getState().jobs;
    if (noMoreJobs) {
        return { jobsList: [], page: currentPage, noMoreJobs: true };
    }
    while (jobsList.length < 10 && hasMore) {
        const data = await fetchJobsFromAPI(currentPage)
        if (data.jdList.length === 0) {
            hasMore = false; // No more jobs to fetch
            dispatch(jobsSlice.actions.setNoMoreJobs(true));
        } else {
            if (filters) {
                let filteredJobs = filterJobsByCriteria(data.jdList, filters);
                jobsList = jobsList.concat(filteredJobs);
                currentPage += 1; // Prepare for next page fetch if needed
            }
        }
    }
    // If jobsList is more than 10 due to the last fetch, trim it down to 10
    if (jobsList.length > 10) {
        jobsList = jobsList.slice(0, 10);
    }

    return { jobsList, page: currentPage, noMoreJobs: !hasMore || jobsList.length === 0 }; // Adjust page count for state
});

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