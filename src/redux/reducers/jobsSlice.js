import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://api.weekday.technology/adhoc/getSampleJdJSON';

const initialState = {
    jobs: [],
    status: 'idle',
    error: null,
    page: 0,
    filters: {
        location: [],
        experience: null,
        remote: [],
        techStack: [],
        role: [],
        minBasePay: null,
        companyName: '',
    },
    noMoreJobs: false,
};

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (_, { getState, dispatch }) => {
    let jobsList = [];
    let hasMore = true;
    let currentPage = getState().jobs.page;
    const { filters, noMoreJobs } = getState().jobs;
    if (noMoreJobs) {
        return { jobsList: [], page: currentPage, noMoreJobs: true };
    }
    while (jobsList.length < 10 && hasMore) {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ limit: 10, offset: currentPage * 10 }),
        });
        const data = await response.json();
        if (data.jdList.length === 0) {
            hasMore = false; // No more jobs to fetch
            dispatch(jobsSlice.actions.setNoMoreJobs(true));
        } else {
            let filteredJobs = data.jdList;
            // Apply filters if they are not in their initial state
            if (filters) {
                if (filters.location && filters.location.length > 0) {
                    filteredJobs = filteredJobs.filter(job =>
                        filters.location.some(locationFilter => locationFilter.value.toLowerCase().includes(job.location.toLowerCase()))
                    );
                }
                if (filters.experience && filters.experience.value) {
                    filteredJobs = filteredJobs.filter(job => job.minExp <= filters.experience.value);
                }
                if (filters.remote && filters.remote.length > 0) {
                    filteredJobs = filteredJobs.filter(job =>
                        filters.remote.some(remoteFilter => {
                            if (remoteFilter.value.toLowerCase() === "remote") {
                                // If the filter value is "remote", include jobs that match "remote"
                                return job.location.toLowerCase().includes("remote");
                            } else {
                                // If the filter value is not "remote", include jobs that do not match "remote"
                                return !job.location.toLowerCase().includes("remote");
                            }
                        })
                    );
                }
                // if (filters.techStack && filters.techStack.length > 0) {
                //     filteredJobs = filteredJobs.filter(job =>
                //         filters.techStack.every(techStackFilter => job.techStack.includes(techStackFilter.value))
                //     );
                // }
                if (filters.role && filters.role.length > 0) {
                    filteredJobs = filteredJobs.filter(job =>
                        filters.role.some(roleFilter => roleFilter.value.toLowerCase().includes(job.jobRole.toLowerCase()))
                    );
                }
                if (filters.minimumBasePay && filters.minimumBasePay.value) {
                    filteredJobs = filteredJobs.filter(job =>
                        //check if the filter value lies between the min and max salary
                        (job.minJdSalary >= +filters.minimumBasePay.value)
                    );
                }

                if (filters.companyName) {
                    filteredJobs = filteredJobs.filter(job => job.companyName.toLowerCase().includes(filters.companyName.toLowerCase()));
                }


                // Add more filters as needed
            }
            jobsList = jobsList.concat(filteredJobs);
            currentPage += 1; // Prepare for next page fetch if needed
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
    initialState,
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