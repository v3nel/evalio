import { cn } from '@/lib/utils.ts'

function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-lg bg-canvas', className)} />
}

export { Skeleton }
