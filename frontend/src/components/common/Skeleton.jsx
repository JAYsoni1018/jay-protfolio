export const SkeletonBox = ({ className = '' }) => (
    <div className={`animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800 ${className}`} />
)

export const ProjectCardSkeleton = () => (
    <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
        <SkeletonBox className="h-52 w-full rounded-none" />
        <div className="space-y-2 p-5">
            <SkeletonBox className="h-3 w-16" />
            <SkeletonBox className="h-5 w-3/4" />
            <SkeletonBox className="h-3 w-full" />
            <SkeletonBox className="h-3 w-2/3" />
        </div>
    </div>
)