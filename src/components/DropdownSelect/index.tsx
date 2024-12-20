'use client';
import { Combobox, Transition } from '@headlessui/react';
import { Check, ChevronsDownUp } from 'lucide-react';
// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { forwardRef, Fragment, useState } from 'react';

export type Option = {
  id: string;
  value: string;
  href?: string;
};

export type DropdownSelectProps = {
  options: Option[];
  defaultOption?: Option;
  onSelect?: (id: Option) => void;
  placeholder?: string;
};

export default forwardRef<HTMLInputElement, DropdownSelectProps>(
  function DropdownSelect(
    { options, defaultOption, onSelect, placeholder }: DropdownSelectProps,
    ref
  ) {
    const [query, setQuery] = useState('');

    const filteredOptions =
      query === ''
        ? options
        : options.filter((option) =>
            option.value
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.toLowerCase().replace(/\s+/g, ''))
          );

    return (
      <Combobox onChange={onSelect} defaultValue={defaultOption}>
        <div className='relative mt-1'>
          <div className='relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
            <Combobox.Input
              className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
              displayValue={(option: Option) => option.value}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={placeholder}
              ref={ref}
            />
            <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronsDownUp size={20} strokeWidth={1} color='#000000' />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className='absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
              {filteredOptions.length === 0 && query !== '' ? (
                <div className='relative cursor-default select-none px-4 py-2 text-gray-700'>
                  Nothing found.
                </div>
              ) : (
                filteredOptions.map((option) => (
                  // <Link
                  //   key={option.id}
                  //   href={option?.href || ''}
                  //   prefetch={false}
                  // >
                  <Combobox.Option
                    key={option.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? 'bg-teal-600 text-white'
                          : 'bg-white  text-gray-900'
                      }`
                    }
                    value={option}
                    defaultChecked={option.id === defaultOption?.id}
                    defaultValue={defaultOption?.id}
                    style={{
                      zIndex: 2,
                    }}
                  >
                    {(props) => {
                      const { selected: selectedOption, active } = props;
                      const selected =
                        selectedOption || option.id === defaultOption?.id;
                      return (
                        <div>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {option.value}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? 'text-white' : 'text-teal-600'
                              }`}
                            >
                              <Check size={20} strokeWidth={1} />
                            </span>
                          ) : null}
                        </div>
                      );
                    }}
                  </Combobox.Option>
                  // </Link>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    );
  }
);
