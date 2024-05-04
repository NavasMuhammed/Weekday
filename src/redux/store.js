import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './reducers/jobsSlice';
export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
  },
});