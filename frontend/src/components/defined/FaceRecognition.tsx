import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { usePunchIn } from '@/context/AttendanceContext';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router';
const videoConstraints = {
  width: 480,
  height: 360,
  facingMode: "user"
};

interface FaceRecognitionResponse {
  id: number;
  date: string;
  checkInTime: string;
  checkOutTime: string | null;
  status: string;
  employee: {
    id: number;
    name: string;
    // other employee fields...
  };
}

export default function FaceRecognition() {
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState<FaceRecognitionResponse | null>(null);
  const navigate = useNavigate(); // đặt trong component

  // Use the same context as AttendanceButton
  const {
    isPunchedIn,
    setIsPunchedIn,
    setCheckInTime,
    secondsElapsed
  } = usePunchIn();

  const { user } = useAuth();

  const formatTime = (totalSeconds: number) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const capture = async () => {
    if (webcamRef.current) {
      const image = webcamRef.current.getScreenshot();
      setImageSrc(null);
      setIsLoading(true);
      setRecognitionResult(null);

      try {
        if (!image) throw new Error("Không lấy được ảnh");

        // Check if user already punched in today
        if (user) {
          const userKey = `checkinDate-${user.id}`;
          const today = new Date().toISOString().split('T')[0];
          const savedDate = localStorage.getItem(userKey);

          if (savedDate) {
            const savedDateOnly = new Date(savedDate).toISOString().split('T')[0];
            if (savedDateOnly === today) {
              alert('Chỉ có thể chấm công 1 lần trong ngày.');
              setIsLoading(false);
              return;
            }
          }
        }

        // Chuyển base64 thành Blob
        const blob = await fetch(image).then(res => res.blob());

        // Tạo FormData và đính kèm ảnh
        const formData = new FormData();
        formData.append("image", blob, "capture.jpg");

        // Gửi request với axios
        const response = await axios.post<FaceRecognitionResponse>(
          "http://localhost:8080/api/attendence/face",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              // Authorization: `Bearer ${token}`, // Nếu cần token
            },
          }
        );

        console.log("Kết quả từ server:", response.data);

        // Lưu kết quả nhận diện
        setRecognitionResult(response.data);
        setImageSrc(image);

        // Parse thời gian check-in từ response
        const checkInTimeString = response.data.checkInTime;
        const today = response.data.date;

        // Tạo Date object từ date và checkInTime
        const checkInDateTime = new Date(`${today}T${checkInTimeString}`);
        if (!checkInTimeString) {
          alert("Không có thời gian chấm công. Vui lòng thử lại.");
          setIsLoading(false);
          navigate("/login"); // Điều hướng sau khi nhấn OK
          return;
        }
        // Cập nhật trạng thái punch in (giống như AttendanceButton)
        setCheckInTime(checkInDateTime);
        setIsPunchedIn(true);


        // Lưu vào localStorage (giống như AttendanceButton)
        if (user) {
          const userKey = `checkinDate-${user.id}`;
          localStorage.setItem(userKey, checkInDateTime.toISOString());
        }

        alert(`Chấm công lúc ${checkInTimeString}`);

      } catch (error) {
        console.error("Lỗi khi gửi ảnh:", error);
        alert("Có lỗi xảy ra. Vui lòng thử lại.");

      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col md:flex-row gap-6 items-center max-w-4xl">
        {/* Webcam Section */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Chấm công bằng nhận diện khuôn mặt
          </h2>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="rounded-xl border border-gray-300 shadow-md"
          />
          <Button
            className="mt-4 px-8 py-2"
            onClick={capture}
            disabled={isLoading || isPunchedIn}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin w-4 h-4" /> Đang xử lý...
              </span>
            ) : isPunchedIn ? (
              "Đã chấm công"
            ) : (
              "Punch In"
            )}
          </Button>

          {/* Display timer if punched in */}
          {isPunchedIn && (
            <div className="mt-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {formatTime(secondsElapsed)}
              </div>
              <div className="text-sm text-green-600 font-medium">
                Đang làm việc
              </div>
            </div>
          )}
        </div>

        {/* Preview Section */}
        <div className="flex flex-col items-center">
          {isLoading && (
            <div className="text-center">
              <Loader2 className="animate-spin w-8 h-8 mx-auto mb-2 text-blue-500" />
              <p className="text-gray-600">Đang nhận diện khuôn mặt...</p>
            </div>
          )}

          {imageSrc && !isLoading && (
            <>
              <p className="mb-2 text-gray-700 font-medium">Ảnh đã chụp:</p>
              <img
                src={imageSrc}
                alt="Captured"
                className="rounded-xl border border-gray-300 shadow-md w-64 h-auto object-contain"
              />
            </>
          )}

          {recognitionResult && !isLoading && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">
                Kết quả nhận diện
              </h3>
              <div className="text-sm text-green-700 space-y-1">
                <p><strong>Tên:</strong> {recognitionResult.employee.name}</p>
                <p><strong>Ngày:</strong> {recognitionResult.date}</p>
                <p><strong>Giờ vào:</strong> {recognitionResult.checkInTime}</p>
                <p><strong>Trạng thái:</strong>
                  <span className={`ml-1 font-medium ${recognitionResult.status === 'PRESENT' ? 'text-green-600' :
                    recognitionResult.status === 'LATE' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                    {recognitionResult.status === 'PRESENT' ? 'Đúng giờ' :
                      recognitionResult.status === 'LATE' ? 'Muộn' : 'Vắng'}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}