import { setCookie, parseCookies, destroyCookie } from 'nookies';



export const storeUserDataInCookies = (data: any) => {
  setCookie(null, 'access_token', data.access_token, {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/', // Make it available site-wide
  });

  setCookie(null, 'refresh_token', data.refresh_token, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });

  setCookie(null, 'user_name', data.user.user_name || '', {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });

  setCookie(null, 'user_email', data.user.user_email, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });

  setCookie(null, 'user_id', String(data.user.user_id), {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });
};

// Get user name from cookies


export const getUserDataFromCookies = () => {
  const cookies = parseCookies();
  return {
    access_token: cookies.access_token || null,
    refresh_token: cookies.refresh_token || null,
    user_name: cookies.user_name || 'Guest',
    user_email: cookies.user_email || null,
    user_id: cookies.user_id ? parseInt(cookies.user_id) : null,
  };
};


// Clear all cookies
export const clearUserDataFromCookies = () => {
    destroyCookie(null, 'access_token');
    destroyCookie(null, 'refresh_token');
    destroyCookie(null, 'user_name');
    destroyCookie(null, 'user_email');
    destroyCookie(null, 'user_id');
  };
