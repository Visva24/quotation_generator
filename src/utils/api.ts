import { parseCookies } from 'nookies';

export const postMethod = async (url: string, payload?: any): Promise<Response|any> => {
    const cookies = parseCookies(); // Retrieve cookies
    const token = cookies?.token || ''; // Use the token from cookies if available
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : '', // Add token to Authorization header if present
        },
      });
  
      const json: any = await response.json();
  
      if (!response.ok) {
        // Return JSON response with status failure if response is not okay
        return {
          data: json || '',
          status: 'failure',
          message: json?.message || 'FAILED',
        };
      }
  
      // Return JSON response if everything is fine
      return json;
    } catch (error) {
      console.error('Error in postMethod:', error);
  
      // Handle network or unexpected errors
      return {
        data: '',
        status: 'failure',
        message: 'An unexpected error occurred.',
      };
    }
  };



export const getMethod = async (url: string): Promise<Response|any> => {
  const cookies = parseCookies(); // Use the imported function
  const token = cookies?.token || '';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error in getMethod:', error);
    throw error;
  }
};



