import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
import { initGoogleAPI } from '@/context/GoogleAPI';

export default function EmployeeCalendar() {
    const FIXED_CALENDAR_ID =
        'c_0deb9907774fbe70a967417ad86eebd3cf8ea308b1c89fb0b6a4b0e7d43b1781@group.calendar.google.com';
    const TIMEZONE = 'Asia%2FHo_Chi_Minh'; // Giữ nguyên định dạng encode
    const getFixedEmbedUrl = () => {
        return `https://calendar.google.com/calendar/embed?src=${FIXED_CALENDAR_ID}&ctz=${TIMEZONE}`;
    };

    return (
        <div className="p-8 max-w-4xl ">
            <h1 className="text-2xl font-bold">Lịch phòng ban</h1>
            <iframe
                        title="Google Calendar View"
                        src={getFixedEmbedUrl()}
                        width="1600"
                        height="600"
                    />
        </div>
        
    );
}
