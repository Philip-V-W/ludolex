import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function stripHtml(html: string) {
  return html?.replace(/<[^>]*>/g, '\n').replace(/\n{2,}/g, '\n').trim() || ''
}