const BASE_URL = 'https://api.weekday.technology/adhoc/getSampleJdJSON';

export const fetchJobsFromAPI = async (currentPage) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ limit: 10, offset: currentPage * 10 }),
    });
    return response.json();
};