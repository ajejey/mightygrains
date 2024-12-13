import { cookies } from 'next/headers';
import { account } from '@/appwrite/clientConfig';

export async function checkAuthStatus() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('a_session_' + process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  if (sessionCookie) {
    try {
      // Verify session on server side
      const session = await account.get();
      return {
        isAuthenticated: true,
        user: session
      };
    } catch (error) {
      return {
        isAuthenticated: false,
        user: null
      };
    }
  }

  return {
    isAuthenticated: false,
    user: null
  };
}

export async function redirectIfAuthenticated(path = '/checkout/shipping-info') {
  const { isAuthenticated } = await checkAuthStatus();
  
  if (isAuthenticated) {
    return {
      redirect: {
        destination: path,
        permanent: false
      }
    };
  }

  return null;
}
