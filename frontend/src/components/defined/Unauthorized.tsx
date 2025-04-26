import React from 'react'

export default function Unauthorized() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
    <h1 className="text-3xl font-bold text-center mb-4">
        Bạn không có quyền sử dụng trang này
        </h1>
    </div>
  </div>
  )
}
