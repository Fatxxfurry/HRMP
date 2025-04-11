import React from 'react'
import { Calendar } from "@/components/ui/calendar"

export default function CalendarManagement() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
     
    <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-md border w-[600px] h-[600px] text-lg"
  />
  )
}
