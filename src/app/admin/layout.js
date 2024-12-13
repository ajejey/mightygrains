'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { account } from '@/appwrite/clientConfig';
import { useEffect } from 'react';
import { checkAdminStatus } from './actions';

const AdminSidebar = ({ activeRoute }) => {
  const adminRoutes = [
    { 
      name: 'Dashboard', 
      href: '/admin', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
      )
    },
    { 
      name: 'Orders', 
      href: '/admin/orders', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    { 
      name: 'Users', 
      href: '/admin/users', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 py-6 px-4">
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-2xl font-bold text-green-900">Admin Panel</h1>
      </div>
      <nav className="space-y-2">
        {adminRoutes.map((route) => (
          <Link 
            key={route.href} 
            href={route.href} 
            className={`
              flex items-center px-4 py-2 rounded-md transition-colors duration-200
              ${activeRoute === route.href 
                ? 'bg-green-100 text-green-900' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }
            `}
          >
            <span className="mr-3">{route.icon}</span>
            {route.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default function AdminLayout({ children }) {
    const router = useRouter();
    
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const session = await account.get();

                if (!session) {
                    console.log('No active session');
                    router.push('/');
                    return;
                }

                const isAdmin = await checkAdminStatus(session.$id);
                
                if (!isAdmin) {
                    console.log('User is not an admin');
                    router.push('/');
                    return;
                }

            } catch (error) {
                console.error('Authentication error:', error);
                router.push('/');
            }
        };
        checkAuth();
    }, [router]);
  
    return (
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar activeRoute={null} />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    );
}