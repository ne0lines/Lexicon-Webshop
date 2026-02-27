import { Funnel, Plus } from 'lucide-react';
import StatCard from './HeaderStatCard';
import { Category, Product } from '../types';
import AddProductButton from './ProductAddButton';
import Search from './Search';

interface HeaderProps {
  products: Product[];
  total: number;
  categories: Category[];
}

export default function Header({
  products: allProducts,
  total: totalProducts,
  categories: categories,
}: HeaderProps) {
  console.log(categories);
  return (
    <>
      <header className='fixed left-64 top-0 right-0 z-30'>
        <section className='px-8 py-4 bg-white flex items-center justify-between'>
          <div>
            <h1 className='text-xl font-bold'>Product management</h1>
            <span className='text-gray-500 text-sm'>
              Manage your store inventory
            </span>
          </div>
          <AddProductButton />
        </section>
        <StatCard products={allProducts} total={totalProducts} />
        <div className='flex items-center text-xs gap-4 mb-6 border-gray-300 px-8 py-4 bg-white'>
          <Search />
          <select className='px-3 py-2 border border-gray-300 rounded-md focus:outline-	none focus:ring-2 focus:ring-purple-600'>
            <option value=''>All Categories</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <label htmlFor='status' className='sr-only'>
            Stock status
          </label>
          <select
            id='status'
            className='px-3 py-2 border border-gray-300 rounded-md focus:outline-	none focus:ring-2 focus:ring-purple-600'
          >
            <option value=''>All Stock Status</option>
            <option value='1'>Low</option>
            <option value='2'>Medium</option>
            <option value='3'>High</option>
          </select>
          {/* <div className='flex items-center px-3 py-2 border border-gray-300 rounded-md'>
            <Funnel className='w-4 h-4' />
            <button type='button'>Filter</button>
          </div> */}
          <div className='flex gap-2 items-center px-3 py-2 border border-gray-300 rounded-md'>
            <Funnel className='w-4 h-4 text-gray-600' />
            <button type='button' className='text-sm font-medium'>
              Filter
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
