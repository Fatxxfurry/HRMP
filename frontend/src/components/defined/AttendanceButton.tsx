import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { useAuth } from '@/context/AuthContext'
import axios from 'axios'
import { date } from 'zod'
import { usePunchIn } from '@/context/AttendanceContext'
export default function Attendance() {

  const [checkinDate, setCheckInDate] = useState<Date | null>(null)
  const { user } = useAuth()
  const {
    isPunchedIn,
    setIsPunchedIn,
    checkInTime,
    setCheckInTime,
    secondsElapsed,
  } = usePunchIn()
  const statusMap = {
    PRESENT: 0,
    ABSENT: 1,
    LATE: 2
  }

  const formatTimeString = (date: Date) => {
    return date.toTimeString().split(' ')[0] // HH:MM:SS
  }



  useEffect(() => {
    const userKey = `checkinDate-${user?.id}`
    const savedDate = localStorage.getItem(userKey)
    if (savedDate) {
      setCheckInDate(new Date(savedDate))
    }
  }, [user?.id])

  const handleClick = async () => {
    const userKey = `checkinDate-${user?.id}`
    const today = new Date().toISOString().split('T')[0]
    console.log(`User ID hiện tại: ${user?.id}`);

    if (!isPunchedIn) {
      // === PUNCH IN ===
      // Kiểm tra xem user đã punch in hôm nay chưa
      const savedDate = localStorage.getItem(userKey)

      if (savedDate) {
        const savedDateOnly = new Date(savedDate).toISOString().split('T')[0]
        if (savedDateOnly === today) {
          alert('Chỉ có thể chấm công 1 lần trong ngày.')
          return
        }
      }

      // Thực hiện punch in
      const now = new Date()
      setCheckInTime(now)
      setIsPunchedIn(true)
      setCheckInDate(now)

      console.log('Punched in at:', formatTimeString(now))

    } else {
      // === PUNCH OUT ===
      // Không cần kiểm tra giới hạn 1 lần/ngày ở đây
      // vì user đã được phép punch in rồi

      const now = new Date()
      const checkOutTime = formatTimeString(now)
      const checkIn = checkInTime ? formatTimeString(checkInTime) : '00:00:00'
      try {
        // Kiểm tra xem có record nào với checkOutTime = null trong ngày hôm nay không
        const checkExistingResponse = await axios.get(
          `http://localhost:8080/api/attendence`
        )
        const filteredRecords = checkExistingResponse.data.filter((record: any) => {
          const recordDate = new Date(record.date).toISOString().split('T')[0]
          return recordDate === today && record.checkOutTime === null && record.employee.id === user?.id
        })
        const existingRecord = filteredRecords[0]
        console.log('Existing record check:', existingRecord)

        if (existingRecord && existingRecord.id && existingRecord.checkOutTime === null) {
          // Có record với checkOutTime = null, cập nhật checkOutTime
          console.log('Found existing record with null checkOutTime, updating...')

          const updatePayload = {
            employee: {
              id: user?.id
            },
            checkOutTime: checkOutTime,
            checkInTime: checkIn,
            date: today
          }

          await axios.put(
            `http://localhost:8080/api/attendence/${existingRecord.id}`,
            updatePayload
          )

          console.log('Updated existing record with checkOutTime:', checkOutTime)
          alert('Cập nhật giờ ra thành công!')
          setIsPunchedIn(false)
          setCheckInTime(null)
          localStorage.setItem(userKey, new Date().toISOString())
          return
        } else {
          // Không có record nào với checkOutTime = null, tạo mới
          console.log('No existing record found, creating new attendance record...')
        }
      } catch (error) {
        console.error('Error checking existing attendance records:', error)
        alert('Failed to check existing attendance records.')
      }

      const calculateStatusPayload = {
        date: today,
        localTime: checkIn,
        employee: {
          id: user?.id,
        }
      }

      console.log('Calculate status payload:', calculateStatusPayload)

      try {
        const statusResponse = await axios.post('http://localhost:8080/api/attendence/calculateStatus', calculateStatusPayload)
        const statusText = statusResponse.data as 'PRESENT' | 'ABSENT' | 'LATE';
        const statusId = statusMap[statusText];

        console.log('Status ID:', statusId)

        const createPayload = {
          checkInTime: checkIn,
          checkOutTime: checkOutTime,
          date: today,
          employee: {
            id: user?.id,
          },
          status: statusId
        }

        console.log('Attendance payload:', createPayload)

        await axios.post('http://localhost:8080/api/attendence', createPayload)

        // Chỉ lưu vào localStorage khi hoàn thành thành công chu trình punch in/out
        localStorage.setItem(userKey, new Date().toISOString())

        alert('Chấm công thành công!')
        setIsPunchedIn(false)
        setCheckInTime(null)
      } catch (error) {
        console.error('Error during punch out:', error)
        alert('Failed to calculate or save attendance.')
        // Không reset state nếu có lỗi, để user có thể thử lại
        return
      }

      // Reset state sau khi hoàn thành thành công


    }
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
        className="border hover:bg-transparent text-black bg-transparent border-[#212021] "
        onClick={handleClick}
      >
        {isPunchedIn ? "Punch out" : "Punch in"}
      </Button>

      <span className="text-black text-lg font-semibold">
        {formatTime(secondsElapsed)}
      </span>

      <span
        className={`text-lg font-semibold ${isPunchedIn ? 'text-[#5CB338]' : 'text-red-600'}`}
      >
        {isPunchedIn ? 'Checked In' : 'Checked Out'}
      </span>
    </>
  )
}
