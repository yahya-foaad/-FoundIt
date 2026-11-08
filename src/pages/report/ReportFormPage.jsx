import React from "react";

export default function ReportFormPage() {
  return (
    <div
      className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8"
      dir="rtl"
    >
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        {/* Header - العنوان الرئيسي */}
        <div className="flex items-center gap-3 mb-8 border-b pb-4">
          <span className="text-3xl">🔍</span>
          <h1 className="text-2xl font-bold text-gray-800">بلاغ جديد</h1>
        </div>

        <form className="space-y-6">
          {/* 1. اسم الحاجة اللي لقيتها */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              اسم الحاجة اللي لقيتها
            </label>
            <input
              type="text"
              placeholder="مثال: محفظة سوداء، مفاتيح عربية، موبايل..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm"
            />
          </div>

          {/* 2. تفاصيل ووصف الحاجة */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              تفاصيل ووصف الحاجة 📝
            </label>
            <textarea
              rows="3"
              placeholder="اكتب أي علامة مميزة (لون، خدش، مكان محدد جوه...)"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm resize-none"
            ></textarea>
          </div>

          {/* 3. المكان (لقيتها فين ؟؟) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              لقيتها فين ؟؟ 📍
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="اكتب اسم المكان أو المنطقة"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm"
              />
            </div>
          </div>

          {/* 4. الوقت والتاريخ (لقيتها امتى؟) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              لقيتها امتى؟ (التاريخ والوقت) 📅
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="date"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm text-gray-500"
              />
              <input
                type="time"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm text-gray-500"
              />
            </div>
          </div>

          {/* 5. صورة للحاجة */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              صورة للحاجة 📷
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-gray-300 transition-colors cursor-pointer bg-gray-50/50">
              <div className="text-3xl mb-2">📷</div>
              <p className="text-sm text-gray-600 font-medium">
                اضغط هنا عشان ترفع صورة أو اسحبها
              </p>
            </div>
          </div>

          {/* 7. أزرار التحكم */}
          <div className="flex items-center gap-4 pt-4 border-t">
            <button
              type="submit"
              className="px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm"
            >
              تأكيد ونشر البلاغ
            </button>
            <button
              type="button"
              className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
