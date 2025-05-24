// context/PunchInContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react'

interface PunchInContextType {
    isPunchedIn: boolean
    setIsPunchedIn: (value: boolean) => void
    checkInTime: Date | null
    setCheckInTime: (time: Date | null) => void
    secondsElapsed: number
    setSecondsElapsed: (value: number) => void
}

const PunchInContext = createContext<PunchInContextType | undefined>(undefined)

export const PunchInProvider = ({ children }: { children: React.ReactNode }) => {
    const [isPunchedIn, setIsPunchedIn] = useState(false)
    const [checkInTime, setCheckInTime] = useState<Date | null>(null)
    const [secondsElapsed, setSecondsElapsed] = useState(0)

    useEffect(() => {
        const storedPunchIn = localStorage.getItem('isPunchedIn') === 'true'
        const storedCheckInTime = localStorage.getItem('checkInTime')

        if (storedPunchIn && storedCheckInTime) {
            setIsPunchedIn(true)
            setCheckInTime(new Date(storedCheckInTime))
        }
    }, [])
    useEffect(() => {
        localStorage.setItem('isPunchedIn', String(isPunchedIn))
        if (checkInTime) {
            localStorage.setItem('checkInTime', checkInTime.toISOString())
        } else {
            localStorage.removeItem('checkInTime')
        }
    }, [isPunchedIn, checkInTime])
    // Tính thời gian trôi nếu đã punch in
    useEffect(() => {
        let timer: NodeJS.Timeout
        if (isPunchedIn && checkInTime) {
            timer = setInterval(() => {
                const diff = Math.floor((Date.now() - checkInTime.getTime()) / 1000)
                setSecondsElapsed(diff)
            }, 1000)
        } else {
            setSecondsElapsed(0)
        }

        return () => clearInterval(timer)
    }, [isPunchedIn, checkInTime])

    return (
        <PunchInContext.Provider
            value={{
                isPunchedIn,
                setIsPunchedIn,
                checkInTime,
                setCheckInTime,
                secondsElapsed,
                setSecondsElapsed,
            }}
        >
            {children}
        </PunchInContext.Provider>
    )
}

export const usePunchIn = () => {
    const context = useContext(PunchInContext)
    if (!context) {
        throw new Error('usePunchIn must be used within a PunchInProvider')
    }
    return context
}
