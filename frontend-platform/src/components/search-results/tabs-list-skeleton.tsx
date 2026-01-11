import { Skeleton } from "@/recipes/skeleton/skeleton";

export function TabsListSkeleton() {
    return (
        <div
            className={
                "grid w-full grid-cols-3 mb-10 bg-white p-2 rounded-2xl shadow-sm border relative"
            }
        >
            {/* All Results Skeleton */}
            <div className="rounded-xl font-medium relative flex items-center justify-center h-8">
                <Skeleton className="w-24 h-4" />
            </div>

            {/* Parks Skeleton */}
            <div className="rounded-xl font-medium relative flex items-center justify-center h-8">
                <Skeleton className="w-20 h-4" />
            </div>

            {/* Experiences Skeleton */}
            <div className="rounded-xl font-medium relative flex items-center justify-center h-8">
                <Skeleton className="w-28 h-4" />
            </div>
        </div>
    );
}
