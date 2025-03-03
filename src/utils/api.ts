import { parseCookies } from "nookies";


export const postMethod = async (url: string, payload?: any): Promise<Response | any> => {
  const environment = process.env.NODE_ENV;
  const apiUrl = environment === 'development'
    ? `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}${url}`
    : `${process.env.NEXT_PUBLIC_PRODUCTION_URL}${url}`;

  const cookies = parseCookies();
  const token = cookies?.access_token || '';
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : '',
      },
    });

    const json: any = await response?.json();

    if (!response.ok) {

      return {
        data: json || '',
        status: 'failure',
        message: json?.message || 'FAILED',
      };
    }

    return json;
  } catch (error) {
    console.error('Error in postMethod:', error);
    return {
      data: '',
      status: 'failure',
      message: 'An unexpected error occurred.',
    };
  }
};


export const getMethod = async (url: string): Promise<Response | any> => {
  const environment = process.env.NODE_ENV;
  const apiUrl = environment === 'development'
    ? `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}${url}`
    : `${process.env.NEXT_PUBLIC_PRODUCTION_URL}${url}`;

  const cookies = parseCookies(); // Use the imported function
  const token = cookies?.access_token || '';

  try {
    const response = await fetch(apiUrl, {
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

export const deleteMethod = async (url: string): Promise<Response | any> => {
  const cookies = parseCookies()
  const token = cookies?.access_token || '';
  const environment = process.env.NODE_ENV;
  const apiUrl = environment === 'development'
    ? `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}${url}`
    : `${process.env.NEXT_PUBLIC_PRODUCTION_URL}${url}`;
  try {
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      // body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,  // Set the token here
      },
    });
    const json: any = await response.json();
    return json;
  } catch (error) {
    console.error('Error in postMethod:', error);
    throw error;
  }
}


export const patchMethod = async (url: string, payload?: any): Promise<Response | any> => {
  const environment = process.env.NODE_ENV;
  const apiUrl = environment === 'development'
    ? `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}${url}`
    : `${process.env.NEXT_PUBLIC_PRODUCTION_URL}${url}`;

  const cookies = parseCookies();
  const token = cookies?.token || '';

  try {
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : '',
      },
    });

    const json: any = await response?.json();

    if (!response.ok) {
      return {
        data: json || '',
        status: 'failure',
        message: json?.message || 'FAILED',
      };
    }

    return json;
  } catch (error) {
    console.error('Error in patchMethod:', error);
    return {
      data: '',
      status: 'failure',
      message: 'An unexpected error occurred.',
    };
  }
};


