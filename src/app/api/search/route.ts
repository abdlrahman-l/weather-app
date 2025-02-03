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
      filteredAreas = [];
      const areaKeys = Object.keys(area);

      for (let i = 0; i < areaKeys.length; i++) {
        const curr = areaKeys[i] as keyof typeof area;

        if (filteredAreas.length >= 25) {
          break;
        }

        if (!area[curr].toLowerCase().includes(query)) {
          continue;
        }

        const subArea = curr?.split('.');

        if (subArea.length > 0) {
          subArea.pop();
        }

        let areaName = '';
        for (let j = 0; j < subArea.length; j++) {
          if (j === 0) {
            areaName = subArea[j];
          } else {
            areaName = `${areaName}.${subArea[j]}`;
          }
        }

        filteredAreas.push({
          id: curr,
          value: `${area[curr]}${
            subArea.length > 0 ? `, ${area[areaName]}` : ''
          }`,
        });
      }
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
