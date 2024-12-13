import { account } from '@/appwrite/clientConfig';

export async function checkUserSession() {
  try {
    const session = await account.get();
    return { 
      isLoggedIn: true, 
      user: session 
    };
  } catch (error) {
    return { 
      isLoggedIn: false, 
      user: null 
    };
  }
}

export async function requireAuth(callback) {
  const { isLoggedIn, user } = await checkUserSession();
  
  if (!isLoggedIn) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    };
  }

  return callback ? await callback(user) : null;
}
