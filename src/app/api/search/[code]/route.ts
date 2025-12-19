import { NextRequest, NextResponse } from 'next/server';

import regionCode from '@/constant/kode-wilayah.json';

// This is a mock database

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ code: string }> },
) {
  try {
    const params = await props.params;
    const area = regionCode.DATA;
    const areaVal = area[params.code as keyof typeof area];

    if (!areaVal) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: 'Area not found',
        },
        { status: 404 },
      );
    }

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
      { status: 500 },
    );
  }
}
