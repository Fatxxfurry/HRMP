import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
import { initGoogleAPI } from '@/context/GoogleAPI';

export default function CalendarManagement() {
  const FIXED_CALENDAR_ID =
    'c_0deb9907774fbe70a967417ad86eebd3cf8ea308b1c89fb0b6a4b0e7d43b1781@group.calendar.google.com';
  const TIMEZONE = 'Asia%2FHo_Chi_Minh'; // Giữ nguyên định dạng encode

  const [eventTitle, setEventTitle] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  useEffect(() => {
    initGoogleAPI().catch(console.error);
  }, []);
  const handleLogin = async () => {
    const auth = gapi.auth2.getAuthInstance();
    if (!auth.isSignedIn.get()) {
      await auth.signIn();
    }
  };

  const createEvent = async () => {
    await handleLogin();

    if (!eventStartDate || !eventEndDate) {
      alert('Vui lòng nhập thời gian bắt đầu và kết thúc');
      return;
    }

    const event = {
      summary: eventTitle,
      start: { dateTime: new Date(eventStartDate).toISOString() },
      end: { dateTime: new Date(eventEndDate).toISOString() },
    };

    try {
      const response = await gapi.client.calendar.events.insert({
        calendarId: FIXED_CALENDAR_ID,
        resource: event,
      });
      console.log('Event created:', response);
      alert('Tạo sự kiện thành công!');
    } catch (error) {
      console.error(error);
      alert('Tạo sự kiện thất bại.');
    }
  };

  const getFixedEmbedUrl = () => {
    return `https://calendar.google.com/calendar/embed?src=${FIXED_CALENDAR_ID}&ctz=${TIMEZONE}`;
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Quản lý Lịch phòng ban</h1>

      <div className="space-y-4 bg-gray-100 p-4 rounded">
        <h2 className="text-lg font-semibold">Tạo sự kiện mới</h2>
        <input
          type="text"
          placeholder="Tiêu đề sự kiện"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="datetime-local"
          value={eventStartDate}
          onChange={(e) => setEventStartDate(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          placeholder="Thời gian bắt đầu"
        />
        <input
          type="datetime-local"
          value={eventEndDate}
          onChange={(e) => setEventEndDate(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          placeholder="Thời gian kết thúc"
        />
        <button
          onClick={createEvent}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tạo sự kiện
        </button>
      </div>
        <div className="space-y-4">
        <h2 className="text-lg font-semibold">Lịch công khai</h2>
        <div className="w-full h-[800px]">
          <iframe
            title="Google Calendar View"
            src={getFixedEmbedUrl()}
            className="w-full h-full border rounded"
          />
        </div>
      </div>
    </div>
  );
}
