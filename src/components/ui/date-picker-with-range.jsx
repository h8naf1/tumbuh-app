import * as React from 'react'
import { format } from 'date-fns'
import { id as localeId } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/Button.jsx'
import { Calendar } from '@/components/ui/calendar'
import { Field, FieldLabel } from '@/components/ui/field'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

function DatePickerWithRange({
  value,
  onChange,
  label,
  id = 'date-picker-range',
  className = 'w-full sm:w-[320px]',
}) {
  const [date, setDate] = React.useState(value)

  React.useEffect(() => {
    setDate(value)
  }, [value])

  const handleSelect = (nextDate) => {
    setDate(nextDate)
    onChange?.(nextDate)
  }

  return (
    <Field className={className}>
      {label ? <FieldLabel htmlFor={id}>{label}</FieldLabel> : null}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={id}
            className="w-full justify-start px-2.5 font-normal text-slate-100"
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-slate-400" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'dd MMM yyyy', { locale: localeId })} -{' '}
                  {format(date.to, 'dd MMM yyyy', { locale: localeId })}
                </>
              ) : (
                format(date.from, 'dd MMM yyyy', { locale: localeId })
              )
            ) : (
              <span>Pilih rentang tanggal</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto border-slate-800 bg-slate-950 p-0" align="start">
          <Calendar
            mode="range"
            locale={localeId}
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}

export { DatePickerWithRange }
