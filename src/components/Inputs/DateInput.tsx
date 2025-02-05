import { useCallback, useEffect, useRef, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { CalendarIcon } from '@/components/Icons/CalendarIcon'
import { Input } from './Input'
import { format, isValid, parse } from 'date-fns'

export const useClickOutside = (ref: React.RefObject<HTMLDivElement>, onClose: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, onClose])
}

export const DateInput = ({ className, value, onChange, ...props }: React.InputHTMLAttributes<HTMLDivElement>) => {
  const [month, setMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [inputValue, setInputValue] = useState(() => {
    if (!value) return ''
    const date = new Date(value as string)
    return format(new Date(date.getTime() + date.getTimezoneOffset() * 60000), 'MM/dd/yyyy')
  })
  const calendarRef = useRef(null)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  useClickOutside(calendarRef, () => setIsCalendarOpen(false))

  const handleDayPickerSelect = useCallback(
    (date: Date | undefined) => {
      if (!date) {
        setInputValue('')
        setSelectedDate(undefined)
      } else {
        const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
        setSelectedDate(utcDate)
        setMonth(utcDate)
        setInputValue(format(utcDate, 'MM/dd/yyyy'))
        onChange?.({
          target: { name: props.name, value: utcDate.toISOString().split('T')[0] },
        } as React.ChangeEvent<HTMLInputElement>)
      }

      setIsCalendarOpen(false)
    },
    [onChange, props.name]
  )

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    value = value.replace(/[^\d/]/g, '')

    if (value.length > 2 && value[2] !== '/') {
      value = value.slice(0, 2) + '/' + value.slice(2)
    }
    if (value.length > 5 && value[5] !== '/') {
      value = value.slice(0, 5) + '/' + value.slice(5)
    }

    if (value.length > 10) {
      value = value.slice(0, 10)
    }

    setInputValue(value)

    const parsedDate = parse(e.target.value, 'MM/dd/yyyy', new Date())

    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate)
      setMonth(parsedDate)
    } else {
      setSelectedDate(undefined)
    }
  }, [])

  const toggleCalendar = () => {
    setIsCalendarOpen((prev) => !prev)
  }

  return (
    <div className={`relative ${className}`}>
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="MM/DD/YYYY"
        className={`w-full pr-[40px]`}
        {...props}
      />
      <button onClick={toggleCalendar} className="absolute right-[8px] translate-y-1/2" type="button">
        <CalendarIcon />
      </button>

      {isCalendarOpen && (
        <div ref={calendarRef} className="absolute right-0 z-10">
          <DayPicker
            month={month}
            onMonthChange={setMonth}
            mode="single"
            selected={selectedDate}
            onSelect={handleDayPickerSelect}
            disabled={{ before: new Date() }}
            classNames={{
              selected: `bg-[#80CD57] border-[#80CD57] text-white rounded-lg`,
              root: `shadow-lg p-5 bg-[#FFFFFF]`,
              chevron: `fill-[#80CD57]`,
              day: 'hover:bg-[#F5F6F8] rounded-lg h-[44px] w-[44px] text-center data-[disabled="true"]:text-[#B7B7B7]',
              nav: 'absolute top-[20px] right-[20px]',
              month_caption: 'pb-[10px] font-bold',
              weekday: 'font-normal text-gray-600',
            }}
          />
        </div>
      )}
    </div>
  )
}
