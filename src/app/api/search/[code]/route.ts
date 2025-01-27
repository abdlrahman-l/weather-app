import { NextRequest, NextResponse } from 'next/server';

import regionCode from '@/constant/kode-wilayah.json';

// This is a mock database

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  const area = regionCode.DATA;
  const areaVal = area[params.code];

  try {
    return NextResponse.json({
      success: true,
      data: areaVal,
      message: 'Area fetched successfully',
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
