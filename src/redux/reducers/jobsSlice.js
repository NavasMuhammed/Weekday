import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const BASE_URL = 'https://api.weekday.technology/adhoc/getSampleJdJSON';

const initialState = {
    jobs: [],
    status: 'idle',
    error: null,
    page: 0,
};

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (_, { getState }) => {
    const state = getState();
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ limit: 10, offset: state.jobs.page * 10 }),
    });
    const data = await response.json();
    return data.jdList;
});

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const newJobs = action.payload.filter(job => !state.jobs.some(existingJob => existingJob.jdUid === job.jdUid));
                state.jobs = state.jobs.concat(newJobs);
                state.page += 1;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default jobsSlice.reducer;