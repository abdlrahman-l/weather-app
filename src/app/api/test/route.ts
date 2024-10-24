import { NextResponse } from 'next/server';

// export const revalidate = 10

export const dynamic = 'force-dynamic';

export async function GET() {
  const currentDate = new Date();

  return NextResponse.json(
    {
      currentDateTime: currentDate.toISOString(),
      unixTimestamp: currentDate.getTime(),
      formattedDate: currentDate.toLocaleString(),
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}
