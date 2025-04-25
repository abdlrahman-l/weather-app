import { Transition } from '@headlessui/react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import useDebounce from '@/helpers/hooks/useDebounce';

import LoadingSpinner from '../LoadingSpinner';

export type Option = {
  id: string;
  value: string;
  href?: string;
};

type SearchDropdownProps = {
  // isShow: boolean;
  options?: Option[];
  onChangeQuery?: (q: string) => void;
  isLoading?: boolean;
  placeholder?: string;
};

const Content = ({
  options,
  isLoading,
  query,
}: Omit<SearchDropdownProps, 'onChangeQuery'> & {
  query: string;
}) => {
  if (query.length < 3) {
    return (
      <div className='flex items-center justify-center text-center text-sm'>
        <p>Ketik minimal 3 karakter untuk melakukan pencarian</p>
      </div>
    );
  } else if (isLoading) {
    return (
      <div className='flex justify-center'>
        <LoadingSpinner />
      </div>
    );
  } else if (!!options && options?.length > 0) {
    return (
      <ul>
        {options?.map((o) => (
          <Link prefetch={false} href={`/region/${o.id}`} key={o.id}>
            <li
              className='px-3 py-1 hover:bg-primary-100 cursor-pointer text-sm text-dark'
              key={o.id}
            >
              {o.value}
            </li>
          </Link>
        ))}
      </ul>
    );
  } else {
    return (
      <div className='flex items-center justify-center text-sm'>
        <p>Pencarian tidak ditemukan</p>
      </div>
    );
  }
};

const SearchDropdown = ({
  // isShow,
  options,
  onChangeQuery,
  isLoading,
  placeholder,
}: SearchDropdownProps) => {
  const [value, setValue] = useState('');
  const query = useDebounce(value, 500);

  useEffect(() => {
    if (query.length >= 3) {
      onChangeQuery?.(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className='w-full'>
      <div className='relative'>
        <div className='absolute inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none'>
          <Search width={18} height={18} />
        </div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          type='text'
          id='input-group-1'
          className='text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-9 p-2.5 '
        />
      </div>

      <Transition
        show={!!value}
        enter='transition-opacity duration-75'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-150'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div className='rounded-lg shadow-md mt-1 min-h-20 max-h-52 overflow-y-scroll absolute z-10 bg-white w-11/12'>
          <Content query={query} options={options} isLoading={isLoading} />
        </div>
      </Transition>
    </div>
  );
};

export default SearchDropdown;
