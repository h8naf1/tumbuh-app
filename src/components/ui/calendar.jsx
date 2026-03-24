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
        caption_label: 'text-sm font-medium text-slate-100 capitalize',
        nav: 'absolute inset-x-0 top-0 flex items-center justify-between',
        button_previous: cn(
          buttonVariants({ variant: 'outline', size: 'icon-sm' }),
          'h-7 w-7 border-slate-700 bg-slate-900/80 p-0 text-slate-200 hover:bg-slate-800 hover:text-white',
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline', size: 'icon-sm' }),
          'h-7 w-7 border-slate-700 bg-slate-900/80 p-0 text-slate-200 hover:bg-slate-800 hover:text-white',
        ),
        weekdays: 'flex',
        weekday:
          'w-8 rounded-md text-[0.8rem] font-normal text-slate-400 capitalize',
        week: 'mt-2 flex w-full',
        day: 'relative h-8 w-8 p-0 text-center text-sm [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day_button: cn(
          buttonVariants({ variant: 'ghost', size: 'icon-sm' }),
          'h-8 w-8 p-0 font-normal text-slate-200 aria-selected:opacity-100',
        ),
        range_start: 'day-range-start',
        range_end: 'day-range-end',
        selected:
          'bg-blue-600 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white',
        today: 'bg-slate-800 text-white',
        outside:
          'day-outside text-slate-500 aria-selected:bg-slate-800/50 aria-selected:text-slate-500',
        disabled: 'text-slate-600 opacity-50',
        range_middle:
          'aria-selected:bg-blue-600/15 aria-selected:text-slate-100',
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
