import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { fetchJobs, resetJobs } from './redux/reducers/jobsSlice';
import JobCard from './components/cards/jobCard';
import FilterBar from './components/filterBar/filterBar';
import { CircularProgress, Stack } from '@mui/material';
import NotFound from './components/noJobsFound';
function App() {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const status = useSelector((state) => state.jobs.status);
  const filters = useSelector((state) => state.jobs.filters);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status


  useEffect(() => {
    // Reset jobs list and fetch new jobs whenever filters change
    dispatch(resetJobs());
    setIsLoading(true);
    dispatch(fetchJobs()).then(() => setIsLoading(false));
  }, [dispatch, filters]);


  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 500 ||
        status === 'loading' || isLoading
      ) return;
      setIsLoading(true);
      dispatch(fetchJobs()).then(() => setIsLoading(false));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch, status, isLoading]);

  return (
    <main className='app'>
      <FilterBar />
      <div className='job-card-container'>
        {jobs.map((job) => (
          <JobCard key={job.jdUid} jobDetails={job} className='job-card' />
        ))}
      </div>
      {
        status === 'loading' && (
          <Stack alignItems='center'>
            <CircularProgress />
          </Stack>
        )
      }
      {
        jobs.length === 0 && status === 'succeeded' && (
          <div className='no-jobs'>
            <NotFound />
          </div>
        )
      }
    </main>
  );
}

export default App;




