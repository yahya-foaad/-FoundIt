export default function ReportFormPage() {
  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-base-content/20 bg-base-200 text-base-content text-sm placeholder:text-base-content/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30";
  const labelClass = "block text-sm font-medium text-base-content/80";
  return (
    <div
      className="min-h-screen bg-base-200 py-10 px-4 sm:px-6 lg:px-8"
      dir="rtl">
      <div className="max-w-2xl mx-auto bg-base-100 text-base-content p-8 rounded-2xl shadow-sm border border-base-300">
        {/* العنوان */}
        <div className="flex items-center gap-3 mb-8 border-b border-base-300 pb-4">
          <span className="text-3xl">🔍</span>
          <h1 className="text-2xl font-bold text-base-content">بلاغ جديد</h1>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className={labelClass}>اسم الحاجة اللي لقيتها</label>
            <input
              type="text"
              placeholder="مثال: محفظة سوداء، مفاتيح عربية، موبايل..."
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label className={labelClass}>تفاصيل ووصف الحاجة 📝</label>
            <textarea
              rows="3"
              placeholder="اكتب أي علامة مميزة (لون، خدش، مكان محدد جوه...)"
              className={`${inputClass} resize-none`}></textarea>
          </div>

          <div className="space-y-2">
            <label className={labelClass}>لقيتها فين ؟؟ 📍</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="اكتب اسم المكان أو المنطقة"
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClass}>
              لقيتها امتى؟ (التاريخ والوقت) 📅
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input type="date" className={inputClass} />
              <input type="time" className={inputClass} />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClass}>صورة للحاجة 📷</label>
            <div className="border-2 border-dashed border-base-300 rounded-2xl p-6 text-center hover:border-primary transition-colors cursor-pointer bg-base-200">
              <div className="text-3xl mb-2">📷</div>
              <p className="text-sm text-base-content/70 font-medium">
                اضغط هنا عشان ترفع صورة أو اسحبها
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-base-300">
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-primary-content rounded-xl text-sm font-medium hover:opacity-90 transition shadow-sm">
              تأكيد ونشر البلاغ
            </button>
            <button
              type="button"
              className="px-6 py-3 bg-base-200 text-base-content rounded-xl text-sm font-medium hover:bg-base-300 transition-colors">
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
