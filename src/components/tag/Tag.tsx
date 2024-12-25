import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from '@/lib/shadcn/utils';


const tagVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-gray-300",
  {
    variants: {
      variant: {
        default:
          "bg-background-100 text-font-800 hover:bg-background-200 disabled:cursor-not-allowed dark:bg-background-700 dark:text-font-100 dark:hover:bg-background-800",
        outline:
          "border border-gray-200 bg-white shadow-sm hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
      colorScheme: {}
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface TagProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tagVariants> {}

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(tagVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Tag.displayName = "Tag"


export { Tag, tagVariants }