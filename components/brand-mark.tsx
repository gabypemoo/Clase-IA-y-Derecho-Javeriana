import { cn } from '@/lib/utils'

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid size-9 shrink-0 place-items-center rounded-xl bg-primary font-display text-sm font-extrabold text-primary-foreground',
        className,
      )}
    >
      DB
    </span>
  )
}
