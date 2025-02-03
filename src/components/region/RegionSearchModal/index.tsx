'use client';
import React, { useState } from 'react';

import SearchDropdown, { Option } from '@/components/SearchDropdown';

// import regionCode from '@/constant/kode-wilayah.json';

type RegionSearchModalProps = {
  code: string;
  placeholder: string;
};

const RegionSearchModal = ({ placeholder }: RegionSearchModalProps) => {
  // const [areaResult, setAreaResult] = useState<string>();
  const [searchResult, setSearchResult] = useState<Option[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const onChangeQuery = async (s: string) => {
    setIsLoading(true);
    const res = await fetch(`/api/search?query=${s}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = ((await res.json()) as any)?.data;
    setIsLoading(false);
    setSearchResult(data);
  };

  return (
    <div className='text-black'>
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
