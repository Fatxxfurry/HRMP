import React from 'react'
import { Button } from "@/components/ui/button"
import { useAuth } from '@/context/AuthContext'
import axios from 'axios'
import { date } from 'zod'
import { usePunchIn } from '@/context/AttendanceContext'
import { useNavigate } from 'react-router'
export default function FaceRegButton() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const handleClick = async () => {
        navigate('/face-recognition');

    }
    return (
        <Button className="border hover:bg-transparent text-black bg-transparent"
        onClick={handleClick}>Face Recognition Punch in</Button>
    )
}
