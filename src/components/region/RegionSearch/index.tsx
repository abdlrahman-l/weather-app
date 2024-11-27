'use client';
import React from 'react';

import DropdownSelect from '@/components/DropdownSelect';

import regionCode from '@/constant/kode-wilayah.json';

type RegionSearchProps = {
  code: keyof (typeof regionCode)['DATA'];
};

const RegionSearch = ({ code }: RegionSearchProps) => {
  const subRegions = code?.split('.');

  //TODO: simplify this
  const subRegion2 = subRegions?.[0];
  const subRegion3 = `${subRegions?.[0]}.${subRegions?.[1]}`;
  const subRegion4 = `${subRegions?.[0]}.${subRegions?.[1]}.${subRegions?.[2]}`;

  const options = Object.keys(regionCode.DATA).reduce(
    (acc, curr) => {
      const isProvince = !curr.includes('.');
      const key = curr as keyof (typeof regionCode)['DATA'];

      const newData = {
        id: curr,
        value: regionCode?.DATA?.[key],
        href: `/region/${curr}`,
      };

      return {
        1: !isProvince ? acc?.[1] : [...(acc?.[1] || []), newData],
        2:
          curr.length === 5 && curr.startsWith(subRegion2)
            ? [...(acc?.[2] || []), newData]
            : acc?.[2],
        3:
          curr.length === 8 && curr.startsWith(subRegion3)
            ? [...(acc?.[3] || []), newData]
            : acc?.[3],
        4:
          curr.length === 13 && curr.startsWith(subRegion4)
            ? [...(acc?.[4] || []), newData]
            : acc?.[4],
      };
    },
    {
      1: null,
      2: null,
      3: null,
      4: null,
    }
  );

  return (
    <section className='mb-5 max-w-screen-sm'>
      <DropdownSelect
        options={options[1]}
        defaultOption={{
          id: subRegions?.[0] || code,
          value: regionCode.DATA?.[subRegions?.[0] || code],
        }}
      />
      {!!subRegions?.[0] && (
        <DropdownSelect
          options={options[2]}
          defaultOption={
            subRegions?.[1]
              ? {
                  id: subRegion3,
                  value: regionCode.DATA?.[subRegion3],
                }
              : undefined
          }
          placeholder='Pilih Kabupaten / Kota'
        />
      )}
      {!!subRegions?.[1] && (
        <DropdownSelect
          options={options[3]}
          defaultOption={
            subRegions?.[2]
              ? {
                  id: subRegion4,
                  value: regionCode.DATA?.[subRegion4],
                }
              : undefined
          }
          placeholder='Pilih Kecamatan'
        />
      )}
      {!!subRegions?.[2] && (
        <DropdownSelect
          options={options[4]}
          defaultOption={
            subRegions?.[3]
              ? {
                  id: code,
                  value: regionCode.DATA?.[code],
                }
              : undefined
          }
          placeholder='Pilih Kelurahan / Desa'
        />
      )}
    </section>
  );
};

export default RegionSearch;
