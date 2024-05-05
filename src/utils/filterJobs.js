export const filterJobsByCriteria = (jobs, filters) => {
    let filteredJobs = jobs;
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
    return filteredJobs; // Return filtered jobs
};