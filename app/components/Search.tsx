'use client';

import { Search as SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Search() {
  const router = useRouter();
  const [value, setValue] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Update the URL with the search query
      router.push(`/?search=${value}`);
    }, 500); // Adjust the debounce delay as needed
    return () => clearTimeout(delayDebounceFn);
  }, [value, router]);

  return (
    <div className='relative w-full max-w-md'>
      {/* Icon */}
      <SearchIcon
        className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'
        size={16}
      />

      <label htmlFor='search-input' className='sr-only'>
        Search products
      </label>
      <input
        className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-purple-600'
        type='search'
        name='search-input'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='Search products...'
      />
    </div>
  );
}
