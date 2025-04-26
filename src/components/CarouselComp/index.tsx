import * as React from 'react';

import { Carousel, CarouselContent } from '@/components/ui/carousel';

type Props = {
  children: React.ReactNode;
};

export function CarouselComp({ children }: Props) {
  return (
    <Carousel
      opts={{
        align: 'center',
        loop: true,
      }}
      className='w-full'
      orientation='vertical'
    >
      <CarouselContent className='max-h-[500px]'>{children}</CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
