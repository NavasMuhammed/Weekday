import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchJobsFromAPI } from "../../services/fetchApi";
import { filterJobsByCriteria } from "../../utils/filterJobs";
import { setNoMoreJobs } from "./jobsSlice";

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
            dispatch(setNoMoreJobs(true));
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