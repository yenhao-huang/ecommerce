import { cn } from '@/lib/utils'
import type { HTMLAttributes, ReactNode } from 'react'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode
  tone?: 'default' | 'muted' | 'accent'
}

export function Badge({ className, children, tone = 'default', ...props }: BadgeProps) {
  return (
    <span className={cn('ui-badge', `ui-badge-${tone}`, className)} {...props}>
      {children}
    </span>
  )
}
