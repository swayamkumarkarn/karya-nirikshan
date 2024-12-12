// apiService.js
const SERVER_URL ="https://karyanirikshan-backend.vercel.app/api/v1"|| process.env.REACT_APP_SERVER_URL;

/**
 * Generic request function
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise<any>} - The response data
 */


export const request = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${SERVER_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request error: ${error.message}`);
    throw error;
  }
};


/**
 * Specific API calls
 */
export const fetchData = () => request('/data'); // GET request
export const postData = (payload) =>
  request('/data', {
    method: 'POST',
    body: JSON.stringify(payload),
  }); // POST request
