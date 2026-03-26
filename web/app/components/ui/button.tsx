import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'default' | 'outline' | 'ghost'
type ButtonSize = 'default' | 'sm'

const variantClassName: Record<ButtonVariant, string> = {
  default: 'ui-button ui-button-default',
  outline: 'ui-button ui-button-outline',
  ghost: 'ui-button ui-button-ghost',
}

const sizeClassName: Record<ButtonSize, string> = {
  default: '',
  sm: 'ui-button-sm',
}

type SharedProps = {
  children: ReactNode
  className?: string
  variant?: ButtonVariant
  size?: ButtonSize
}

type ButtonProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  children,
  className,
  variant = 'default',
  size = 'default',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(variantClassName[variant], sizeClassName[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}

type ButtonLinkProps = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    href: string
  }

export function ButtonLink({
  children,
  className,
  variant = 'default',
  size = 'default',
  href,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(variantClassName[variant], sizeClassName[size], className)}
      {...props}
    >
      {children}
    </Link>
  )
}
