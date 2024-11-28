'use client';
import clsx from 'clsx';
import { SquarePen } from 'lucide-react';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import DropdownSelect, { Option } from '@/components/DropdownSelect';
import Modal from '@/components/Modal';

import regionCode from '@/constant/kode-wilayah.json';
import useModalState from '@/helpers/hooks/useModalState';

type RegionSearchModalProps = {
  code: keyof (typeof regionCode)['DATA'];
};

const RegionSearchModal = ({ code }: RegionSearchModalProps) => {
  const [choosenCode, setChoosenCode] = useState(code);
  const subRegions = choosenCode?.split('.');

  const { isOpenModal, openModal, closeModal } = useModalState();

  //TODO: simplify this
  const subRegion2 = subRegions?.[0];
  const subRegion3 = `${subRegions?.[0]}.${subRegions?.[1]}`;
  const subRegion4 = `${subRegions?.[0]}.${subRegions?.[1]}.${subRegions?.[2]}`;

  const options = useMemo(
    () =>
      Object.keys(regionCode.DATA).reduce(
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
      ),
    [choosenCode]
  );

  const onSelect = (v: Option) => {
    setChoosenCode(v.id);
  };

  return (
    <>
      <div className='flex gap-3 items-center'>
        <h3 className='font-medium text-lg'>
          {regionCode.DATA?.[choosenCode]}
        </h3>
        <IconButton variant='light' icon={SquarePen} onClick={openModal} />
      </div>
      <Modal
        isOpen={isOpenModal}
        onClose={closeModal}
        containerClassname={clsx(
          'min-h-[350px] min-w-38 bg-white',
          'flex flex-col justify-between'
          // `${bgColor?.[0]}`,
          // `bg-primary-${bgColor?.[1]}`
        )}
      >
        <div>
          <section className='mb-5 max-w-screen-sm'>
            <DropdownSelect
              onSelect={onSelect}
              options={options[1]}
              defaultOption={{
                id: subRegions?.[0] || choosenCode,
                value: regionCode.DATA?.[subRegions?.[0] || choosenCode],
              }}
            />
            {!!subRegions?.[0] && (
              <DropdownSelect
                onSelect={onSelect}
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
                onSelect={onSelect}
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
                onSelect={onSelect}
                options={options[4]}
                defaultOption={
                  subRegions?.[3]
                    ? {
                        id: code,
                        value: regionCode.DATA?.[choosenCode],
                      }
                    : undefined
                }
                placeholder='Pilih Kelurahan / Desa'
              />
            )}
          </section>
        </div>
        <div className='flex w-full items-end justify-end'>
          <Link href={`/region/${choosenCode}`} replace>
            <Button size='sm' variant='outline'>
              Submit
            </Button>
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default RegionSearchModal;
