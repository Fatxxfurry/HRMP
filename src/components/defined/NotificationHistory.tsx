import React from 'react'
import { Bell } from 'lucide-react';

interface NotificationHistoryProps {
    Header?: string;
    Date?: string; // hoặc kiểu phù hợp tùy vào cách bạn dùng
}

export default function NotificationHistory({ Header, Date }: NotificationHistoryProps) {
    return (
        <div className="flex flex-row gap-4 p-4 pt-0 m-4 bg-gray-200 rounded-lg">
            <div className="flex items-center">
                <Bell />
            </div>            
            <div className="flex flex-col gap-2 mt-2">
                <span className="font-bold text-lg ">
                    {Header}
                </span>
                <span>
                    {Date}
                </span>
            </div>
        </div>
    )
}
