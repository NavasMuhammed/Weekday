import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { fetchJobs } from './redux/reducers/jobsSlice';
import JobCard from './components/cards/jobCard';
function App() {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const status = useSelector((state) => state.jobs.status);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchJobs());
    }
  }, [status, dispatch]);

  return (
    <main className='app'>
      <div className='job-card-container'>
        {jobs.map((job) => (
          <JobCard key={job.jdUid} jobDetails={job} className='job-card' />
        ))}
      </div>
      {
        status === 'loading' && (
          <div className="loader">Loading...</div>
        )
      }
    </main>
  );
}

export default App;