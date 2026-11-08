import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-500"
      dir="rtl"
    >
      <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-xl">
        <h2 className="text-xl font-bold mb-2">
          Admin Layout [Pending / تحت الإنشاء]
        </h2>
        <p className="text-sm mb-4">
          هذا الهيكل جاهز وقيد الانتظار للبدء في تنفيذه.
        </p>
        <Link to="/" className="text-blue-600 underline text-sm">
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
