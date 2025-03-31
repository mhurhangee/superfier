import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getEnvironment() {
  const env = process.env.NODE_ENV
  const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV // Available on Vercel

  if (vercelEnv === 'preview') return '(pre) '
  if (env === 'development') return '(dev) '
  return ''
}

export const fetcher = (...args: [string]) => fetch(...args).then(res => res.json())
