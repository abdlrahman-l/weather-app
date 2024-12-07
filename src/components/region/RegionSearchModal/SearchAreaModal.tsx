import clsx from 'clsx';
import React, { useState } from 'react';

import Modal from '@/components/Modal';
import SearchDropdown, { Option } from '@/components/SearchDropdown';

import regionCode from '@/constant/kode-wilayah.json';

type SearchAreaAdmModalProps = {
  code: string;
  isOpenModal: boolean;
  closeModal: () => void;
};

const SearchAreaModal = ({
  code,
  isOpenModal,
  closeModal,
}: SearchAreaAdmModalProps) => {
  const [searchResult, setSearchResult] = useState<Option[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const onChangeQuery = async (s: string) => {
    setIsLoading(true);
    const res = await fetch(`/api/search?query=${s}`);
    setIsLoading(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSearchResult(((await res.json()) as any)?.data);
  };

  return (
    <Modal
      isOpen={isOpenModal}
      onClose={closeModal}
      containerClassname={clsx(
        'min-h-[350px] min-w-38 bg-white',
        'flex flex-col justify-between'
      )}
    >
      <div className='text-black'>
        <section className='mb-5 max-w-screen-sm'>
          <SearchDropdown
            onChangeQuery={onChangeQuery}
            options={searchResult}
            isLoading={isLoading}
            placeholder={regionCode.DATA?.[code]}
          />
        </section>
      </div>
    </Modal>
  );
};

export default SearchAreaModal;
