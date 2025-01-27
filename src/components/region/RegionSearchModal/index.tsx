'use client';
import React, { useEffect, useState } from 'react';

import SearchDropdown, { Option } from '@/components/SearchDropdown';

// import regionCode from '@/constant/kode-wilayah.json';

type RegionSearchModalProps = {
  code: string;
};

const RegionSearchModal = ({ code }: RegionSearchModalProps) => {
  const [areaResult, setAreaResult] = useState<string>();
  const [searchResult, setSearchResult] = useState<Option[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const onChangeQuery = async (s: string) => {
    const res = await fetch(`/api/search?query=${s}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSearchResult(((await res.json()) as any)?.data);
  };

  useEffect(() => {
    const fetchArea = async () => {
      setIsLoading(true);
      const res = await fetch(`/api/search/${code}`);

      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = (await res.json())?.data;
      setAreaResult(data);
    };

    fetchArea();
  }, [code]);

  return (
    <div className='text-black'>
      <section className='mb-5 max-w-screen-sm'>
        <SearchDropdown
          onChangeQuery={onChangeQuery}
          options={searchResult}
          isLoading={isLoading}
          placeholder={areaResult}
        />
      </section>
    </div>
  );
};

export default RegionSearchModal;
