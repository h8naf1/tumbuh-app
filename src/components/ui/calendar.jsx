import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/Button.jsx'

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col gap-4 sm:flex-row',
        month: 'space-y-4',
        month_caption: 'relative flex h-8 items-center justify-center',
        caption_label: 'text-sm font-medium text-[var(--app-text)] capitalize',
        nav: 'absolute inset-x-0 top-0 flex items-center justify-between',
        button_previous: cn(
          buttonVariants({ variant: 'outline', size: 'icon-sm' }),
          'h-7 w-7 border-[var(--app-border)] bg-[var(--app-surface)] p-0 text-[var(--app-text)] hover:bg-[var(--app-surface-strong)] hover:text-[var(--app-text)]',
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline', size: 'icon-sm' }),
          'h-7 w-7 border-[var(--app-border)] bg-[var(--app-surface)] p-0 text-[var(--app-text)] hover:bg-[var(--app-surface-strong)] hover:text-[var(--app-text)]',
        ),
        weekdays: 'flex',
        weekday:
          'w-8 rounded-md text-[0.8rem] font-normal text-[var(--app-text-soft)] capitalize',
        week: 'mt-2 flex w-full',
        day: 'relative h-8 w-8 p-0 text-center text-sm [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day_button: cn(
          buttonVariants({ variant: 'ghost', size: 'icon-sm' }),
          'h-8 w-8 p-0 font-normal text-[var(--app-text)] aria-selected:opacity-100',
        ),
        range_start: 'day-range-start',
        range_end: 'day-range-end',
        selected:
          'bg-blue-600 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white',
        today: 'bg-blue-500/10 text-blue-600',
        outside:
          'day-outside text-[var(--app-text-muted)] aria-selected:bg-blue-500/10 aria-selected:text-[var(--app-text-muted)]',
        disabled: 'text-[var(--app-text-muted)] opacity-50',
        range_middle:
          'aria-selected:bg-blue-600/15 aria-selected:text-[var(--app-text)]',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ className: iconClassName, orientation, ...iconProps }) =>
          orientation === 'left' ? (
            <ChevronLeft className={cn('h-4 w-4', iconClassName)} {...iconProps} />
          ) : (
            <ChevronRight className={cn('h-4 w-4', iconClassName)} {...iconProps} />
          ),
      }}
      {...props}
    />
  )
}

export { Calendar }
