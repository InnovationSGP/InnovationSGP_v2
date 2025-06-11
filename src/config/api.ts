export const fetchAPI = async ({ endpoint, method = 'GET', data = null }:any) => {
  const options:any = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json(); // or response.text() if it's not JSON
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};