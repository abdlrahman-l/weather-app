import Skeleton from '@/components/Skeleton';

export default function Loading() {
  return (
    <div className='flex flex-col gap-y-3'>
      <div className='flex flex-row gap-x-2 justify-start'>
        <Skeleton className='h-10 w-24 rounded-lg' />
        <Skeleton className='h-10 w-24 rounded-lg' />
        <Skeleton className='h-10 w-24 rounded-lg' />
      </div>
      <div className='flex grid gap-5'>
        <Skeleton className='h-20 w-24 rounded-lg w-full' />
        <Skeleton className='h-20 w-24 rounded-lg w-full' />
        <Skeleton className='h-20 w-24 rounded-lg w-full' />
        <Skeleton className='h-20 w-24 rounded-lg w-full' />
        <Skeleton className='h-20 w-24 rounded-lg w-full' />
      </div>
    </div>
  );
}
