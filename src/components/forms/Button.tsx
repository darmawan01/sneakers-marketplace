import { cn } from '@/lib/utils';

export default function Button({ 
  children, 
  onClick, 
  className,
  disabled 
}: { 
  children: React.ReactNode; 
  onClick: () => void; 
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full flex justify-center py-2 px-4 border border-transparent rounded-md",
        "shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",
        "cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed hover:bg-black",
        className
      )}
      type="button"
    >
      {children}
    </button>
  );
}