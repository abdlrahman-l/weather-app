'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { ReactNode, useState } from 'react';

interface AccordionItem {
  title: string;
  content: ReactNode;
}

const Accordion: React.FC<{ items: AccordionItem[] }> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onTitleClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const renderedItems = items.map((item, index) => {
    const isActive = index === activeIndex;

    const content = (
      <div
        className={`overflow-y-scroll transition-all duration-300 ${
          isActive ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <p className='text-gray-700'>{item.content}</p>
      </div>
    );

    return (
      <div
        key={item.title}
        className='border-b border-gray-200 mb-2 last:border-b-0'
      >
        <div
          className='flex justify-between cursor-pointer p-3'
          onClick={() => onTitleClick(index)}
        >
          <h3 className='text-lg font-medium'>{item.title}</h3>
          {isActive ? <ChevronUp /> : <ChevronDown />}
        </div>
        {isActive ? content : null}
      </div>
    );
  });

  return <div className='accordion'>{renderedItems}</div>;
};

export default Accordion;
