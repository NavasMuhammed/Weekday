import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { fetchJobs } from './redux/reducers/jobsSlice';
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
    <main>
      {jobs.map((job) => (
        <div key={job.jdUid} className='job'>
          <h2>{job.jdTitle}</h2>
          <p>{job.jdDescription}</p>
        </div>
      ))}
      {
        status === 'loading' && (
          <div className="loader">Loading...</div>
        )
      }
    </main>
  );
}

export default App;