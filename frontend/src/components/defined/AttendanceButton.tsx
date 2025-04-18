import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

export default function Attendance() {
  const [isPunchedIn, setIsPunchedIn] = useState(false)
  const [secondsElapsed, setSecondsElapsed] = useState(0)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isPunchedIn) {
      timer = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1)
      }, 1000)
    } else {
      setSecondsElapsed(0)
    }

    return () => clearInterval(timer)
  }, [isPunchedIn])

  const handleClick = () => {
    setIsPunchedIn((prev) => !prev)
  }

  const formatTime = (totalSeconds: number) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0')
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')
    const seconds = String(totalSeconds % 60).padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }

  return (
    <> 
      <Button
        className="border hover:bg-transparent text-black bg-transparent"
        onClick={handleClick}
      >
        {isPunchedIn ? "Punch out" : "Punch in"}
      </Button>

      <span className="text-black text-lg font-semibold">
        {formatTime(secondsElapsed)}
      </span>
    </>
  )
}
