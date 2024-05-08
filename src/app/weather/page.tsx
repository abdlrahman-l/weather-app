
import { Suspense } from "react";

import SearchLocationSC from "@/components/ServerComponents/SearchLocationSC";
import Skeleton from "@/components/Skeleton";


export default async function TestPage() {
    return (
        <div className="flex flex-col">
            {/* <Geolocation /> */}
            <Suspense fallback={
              <Skeleton className='h-[40px] rounded-lg w-full' />
            }>
                <SearchLocationSC />
            </Suspense>
        </div>
    )
}
