import { NextRequest, NextResponse } from 'next/server';

import regionCode from '@/constant/kode-wilayah.json';

// This is a mock database

export async function GET(request: NextRequest) {
  const area = regionCode.DATA;
  const areaKeys = Object.keys(area);

  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get('lat')?.toLowerCase();
  const lon = searchParams.get('lon')?.toLowerCase();

  try {
    if (lat && lon) {
      const location = await fetch(
        `https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lon}&zoom=18&format=jsonv2&accept-language=idn`,
      );
      const dataJson = await location.json();
      const data = dataJson.address;

      const villageOrSuburb = (data.village || data.suburb || '').toLowerCase();

      const code = areaKeys.find((a) => {
        const areaVal = (area[a] as string)?.toLowerCase?.();

        return areaVal.includes(villageOrSuburb);
      });

      return NextResponse.json({
        success: true,
        data: code,
        message: !code ? 'Code not found' : 'Code fetched successfully',
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: 'Failed to fetch code',
      },
      { status: 500 },
    );
  }
}
