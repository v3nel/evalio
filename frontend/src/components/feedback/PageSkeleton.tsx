import { Skeleton } from '@/components/ui/skeleton.tsx'

export function PageSkeleton() {
  return (
    <div className="flex min-h-svh bg-surface">
      <div className="hidden w-56 shrink-0 bg-canvas p-6 lg:block">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="mt-8 h-11 w-full" />
        <Skeleton className="mt-2 h-11 w-full" />
        <Skeleton className="mt-2 h-11 w-full" />
      </div>
      <div className="flex-1 p-8">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="mt-2 h-4 w-80" />
        <Skeleton className="mt-6 h-36 w-full" />
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <Skeleton className="h-52" />
          <Skeleton className="h-52" />
          <Skeleton className="h-52" />
          <Skeleton className="h-52" />
          <Skeleton className="h-52" />
          <Skeleton className="h-52" />
        </div>
      </div>
    </div>
  )
}

export function ContentSkeleton() {
  return (
    <div className="flex flex-col gap-5 p-8">
      <Skeleton className="h-8 w-72" />
      <Skeleton className="h-4 w-96" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  )
}
