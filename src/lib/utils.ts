import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const validateImageUrl = (url: string): boolean => {
  if (!url) return true; // Allow empty URLs

  try {
    // Use URL constructor to validate the URL format
    new URL(url);
    
    // Check if URL ends with common image extensions
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    return validExtensions.some(ext => url.toLowerCase().endsWith(ext));
  } catch {
    return false;
  }
};