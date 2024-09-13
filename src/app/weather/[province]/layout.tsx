import SearchLocationSC from '@/components/ServerComponents/SearchLocationSC';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { province: string };
}) {
  return (
    <div>
      <div className='space-y-3'>
        <SearchLocationSC provinceId={params.province} />
        {children}
      </div>
    </div>
  );
}
