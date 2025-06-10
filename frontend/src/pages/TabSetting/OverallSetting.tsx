import React, { useState } from "react";
import { Button } from "@/components/ui/button";
const themes = [
    {
        name: "Sáng",
        value: "light",
        colors: ["#ffffff", "#e2e8f0"], // trắng + xám nhạt
    },
    {
        name: "Tối",
        value: "dark",
        colors: ["#2D1F3D", "#d9d5d4", "#f3eeef"], // xám đậm + đen
    },
    {
        name: "Xanh biển",
        value: "blue",
        colors: ["#242425", "#f4f2ee", "#f4f2ee"], // xanh sáng + xanh đậm
    },
];

const fontSizes = [
    { label: "Nhỏ", value: "small" },
    { label: "Trung bình", value: "medium" },
    { label: "Lớn", value: "large" },
];

export default function OverallSetting() {
    const [selectedTheme, setSelectedTheme] = useState("light");
    const [selectedFontSize, setSelectedFontSize] = useState("medium");

    return (
        <div className="flex flex-col gap-6 p-6 max-w-3xl">
            <h1 className="text-2xl font-bold">Cài đặt giao diện</h1>

            {/* Chọn Theme */}
            <div>
                <h2 className="text-lg font-semibold mb-2">Chọn giao diện</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {themes.map((theme) => (
                        <button
                            key={theme.value}
                            onClick={() => setSelectedTheme(theme.value)}
                            className={`rounded-lg p-2 border-2 transition-all w-full ${selectedTheme === theme.value ? "border-blue-500" : "border-gray-300"
                                }`}
                        >
                            <div className="flex flex-col items-center gap-2">
                                {/* Diagonal Color Box */}
                                <div
                                    className="w-16 h-16 rounded shadow"
                                    style={{
                                        background: `linear-gradient(135deg, ${theme.colors[0]} 50%, ${theme.colors[1]} 50%)`,
                                    }}
                                />
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Chọn cỡ chữ */}
            <div>
                <h2 className="text-lg font-semibold mb-2">Cỡ chữ</h2>
                <div className="flex gap-4">
                    {fontSizes.map((size) => (
                        <button
                            key={size.value}
                            onClick={() => setSelectedFontSize(size.value)}
                            className={`px-4 py-2 rounded-lg border-2 transition-all ${selectedFontSize === size.value
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-300"
                                }`}
                        >
                            {size.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Preview (nếu muốn test) */}
            <div className="mt-8">
                <p className="text-base">
                    <strong>Theme hiện tại:</strong> {selectedTheme}
                </p>
                <p className="text-base">
                    <strong>Cỡ chữ:</strong> {selectedFontSize}
                </p>
            </div>
        </div>
    );
}
