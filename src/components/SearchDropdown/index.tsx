import { Transition } from '@headlessui/react';
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
      <div className='flex items-center justify-center'>
        <p>Ketik minimal 3 karakter untuk melakukan pencarian</p>
      </div>
    );
  } else if (isLoading) {
    return (
      <div className='flex items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  } else if (!!options && options?.length > 0) {
    return (
      <ul>
        {options?.map((o) => (
          <Link prefetch={false} href={o.href || ''} key={o.id}>
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
      <div className='flex items-center justify-center'>
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
    <>
      <input
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='mt-1 block w-full p-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    '
        placeholder={placeholder}
      />

      <Transition
        show={!!value}
        enter='transition-opacity duration-75'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-150'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div className='rounded-lg shadow-md mt-1 min-h-20 max-h-52 overflow-y-scroll'>
          <Content query={query} options={options} isLoading={isLoading} />
        </div>
      </Transition>
    </>
  );
};

export default SearchDropdown;
