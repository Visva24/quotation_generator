import { parseCookies } from 'nookies';

export const postMethod = async (url: string, payload?: any): Promise<Response | any> => {
  const environment = process.env.NODE_ENV; // This works in Node.js (server-side)
  
  // Make sure that the environment is properly checked and fallback to a default value if needed
  let apiUrl = environment === 'development' 
    ? `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}${url}` // Use public environment variables
    : `${process.env.NEXT_PUBLIC_PRODUCTION_URL}${url}`; // Default to production URL

  const cookies = parseCookies(); // Retrieve cookies
  const token = cookies?.token || ''; // Use the token from cookies if available
     
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : '', // Add token to Authorization header if present
      },
    });

    const json: any = await response.json();
    console.log(json, "qwertyuiuytrewqwertyuiuytrew");

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


// export const postMethod = async (url: string, payload?: any): Promise<Response|any> => {
//     const environment = process.env.NODE_ENV;

//      let apiUrl = environment === 'development' ? ${process.env.development}${url} : ""
//     const cookies = parseCookies(); // Retrieve cookies
//     const token = cookies?.token || ''; // Use the token from cookies if available
     
//     try {
//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         body: JSON.stringify(payload),
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": token ? `Bearer ${token}` : '', // Add token to Authorization header if present
//         },
//       });
//       const json: any = await response.json();
//       console.log(json,"qwertyuiuytrewqwertyuiuytrew")
//       if (!response.ok) {
//         // Return JSON response with status failure if response is not okay
//         return {
//           data: json || '',
//           status: 'failure',
//           message: json?.message || 'FAILED',
//         };
//       }
  
//       // Return JSON response if everything is fine
//       return json;
//     } catch (error) {
//       console.error('Error in postMethod:', error);
  
//       // Handle network or unexpected errors
//       return {
//         data: '',
//         status: 'failure',
//         message: 'An unexpected error occurred.',
//       };
//     }
//   };



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



