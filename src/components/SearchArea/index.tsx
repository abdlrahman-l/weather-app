'use client';
import React, { useEffect } from 'react';

import { FormattedArea } from '@/lib/types';

import DropdownSelect from '../DropdownSelect';
import { useWeatherContext } from '../WeatherProvider';

type SearchAreaProps = {
  areas: FormattedArea[];
  defaultArea?: FormattedArea;
};

const SearchArea = ({ areas, defaultArea }: SearchAreaProps) => {
  const { setArea, province } = useWeatherContext();
  const selectedArea = defaultArea || areas?.[0];

  useEffect(() => {
    if (defaultArea) setArea(defaultArea);
  }, [defaultArea, setArea]);

  return (
    <div>
      <DropdownSelect
        options={areas.map((v) => ({
          id: v.id,
          value: v.name?.[1] || v.description,
          href: `/weather/${province?.id}/${v.id}`,
        }))}
        defaultOption={
          selectedArea
            ? {
                id: selectedArea.id,
                value: selectedArea.name?.[1] || selectedArea.description,
              }
            : undefined
        }
        onSelect={({ id }) => {
          const selectedAreaOption = areas?.find((a) => a.id === id);
          if (selectedAreaOption) setArea(selectedAreaOption);
        }}
      />
    </div>
  );
};

export default SearchArea;
