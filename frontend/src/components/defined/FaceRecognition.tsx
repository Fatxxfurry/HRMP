import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button"; // Giả sử bạn đang dùng shadcn/ui

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "user",
};

export default function FaceRecognition() {
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const capture = () => {
    if (webcamRef.current) {
      const image = webcamRef.current.getScreenshot();
      setImageSrc(image);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col md:flex-row gap-6 items-center">
        {/* Webcam Section */}
        <div className="flex flex-col items-center">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="rounded-xl border border-gray-300 shadow-md"
          />
          <Button className="mt-4" onClick={capture}>
            📸 Chụp ảnh
          </Button>
        </div>

        {/* Preview Section */}
        {imageSrc && (
          <div className="flex flex-col items-center">
            <p className="mb-2 text-gray-700 font-medium">Ảnh đã chụp:</p>
            <img
              src={imageSrc}
              alt="Captured"
              className="rounded-xl border border-gray-300 shadow-md w-64 h-auto object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
}
