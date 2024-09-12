import { getProvinceList } from '@/lib/queries';

import SearchLocation from '@/components/SearchLocation';

type SearchLocationSCProps = {
  provinceId?: string;
};

export default async function SearchLocationSC({
  provinceId,
}: SearchLocationSCProps) {
  const provinceList = await getProvinceList();

  if (!provinceList) return <p>No data available...</p>;

  const provinces = provinceList.data;
  const defaultProvince = provinces.find((p) =>
    provinceId ? provinceId === p.id : p.name.toLowerCase().includes('jakarta')
  );

  return (
    <SearchLocation provinces={provinces} defaultProvince={defaultProvince} />
  );
}
