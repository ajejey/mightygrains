'use client';

import { FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

export default function SupportBanner() {
  return (
    <div className="bg-amber-50 border-t border-b border-amber-200 py-3 px-4 text-amber-800">
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm sm:flex-nowrap">
        <FaEnvelope className="text-amber-700" />
        <span className="hidden sm:inline">Need help? Contact us at </span>
        <span className="sm:hidden">Contact us at </span>
        <Link 
          href="mailto:mightygrains656@gmail.com" 
          className="font-medium text-amber-700 hover:text-amber-800 hover:underline break-all sm:break-normal"
        >
          mightygrains656@gmail.com
        </Link>
      </div>
    </div>
  );
}
