import { NextRequest, NextResponse } from 'next/server';

import regionCode from '@/constant/kode-wilayah.json';

// This is a mock database

export async function GET(request: NextRequest) {
  const area = regionCode.DATA;
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query')?.toLowerCase();

  try {
    let filteredAreas;
    if (query) {
      filteredAreas = Object.keys(area).reduce(
        (acc, curr: keyof typeof area) => {
          if (!area[curr].toLowerCase().includes(query)) {
            return acc;
          }

          const subArea = curr?.split('.');

          if (subArea.length > 0) {
            subArea.pop();
          }

          const areaName = subArea?.reduce((acc, curr, i) => {
            if (i === 0) {
              return curr;
            }
            return `${acc}.${curr}`;
          }, '');

          return [
            ...acc,
            {
              id: curr,
              value: `${area[curr]}${
                subArea.length > 0 ? `, ${area[areaName]}` : ''
              }`,
              href: `/region/${curr}`,
            },
          ];
        },
        []
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredAreas,
      message:
        !filteredAreas || filteredAreas.length === 0
          ? 'Area not found'
          : 'Area fetched successfully',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: 'Failed to fetch area',
      },
      { status: 500 }
    );
  }
}
