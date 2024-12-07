'use client';
import { Search, SquarePen } from 'lucide-react';
import React from 'react';

import IconButton from '@/components/buttons/IconButton';

import regionCode from '@/constant/kode-wilayah.json';
import useModalState from '@/helpers/hooks/useModalState';

import SearchAreaAdmModal from './SearchAreaAdmModal';
import SearchAreaModal from './SearchAreaModal';

type RegionSearchModalProps = {
  code: keyof (typeof regionCode)['DATA'];
};

const RegionSearchModal = ({ code }: RegionSearchModalProps) => {
  const { isOpenModal, openModal, closeModal } = useModalState();
  const {
    isOpenModal: isOpenSearchModal,
    openModal: openSearchModal,
    closeModal: closeSearchModal,
  } = useModalState();

  return (
    <>
      <div className='flex gap-3 items-center'>
        <h3 className='font-medium text-lg'>{regionCode.DATA?.[code]}</h3>
        <IconButton variant='light' icon={SquarePen} onClick={openModal} />
        <IconButton variant='light' icon={Search} onClick={openSearchModal} />
      </div>
      <SearchAreaAdmModal
        isOpenModal={isOpenModal}
        closeModal={closeModal}
        code={code}
      />
      <SearchAreaModal
        isOpenModal={isOpenSearchModal}
        closeModal={closeSearchModal}
        code={code}
      />
    </>
  );
};

export default RegionSearchModal;
