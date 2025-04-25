'use client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import SearchDropdown, { Option } from '@/components/SearchDropdown';

type RegionSearchModalProps = {
  code: string;
  placeholder: string;
};

const fetchRegions = async (query: string) => {
  const res = await fetch(`/api/search?query=${query}`);
  const data = await res.json();
  return data?.data as Option[];
};

const RegionSearchModal = ({ placeholder }: RegionSearchModalProps) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const { data: searchResult, isLoading } = useQuery({
    queryKey: ['regions', searchQuery],
    queryFn: () => fetchRegions(searchQuery),
    enabled: searchQuery.length > 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const onChangeQuery = (s: string) => {
    setSearchQuery(s);
  };

  return (
    <div className='text-black w-full'>
      <SearchDropdown
        onChangeQuery={onChangeQuery}
        options={searchResult}
        isLoading={isLoading}
        placeholder={placeholder}
      />
    </div>
  );
};

export default RegionSearchModal;
