import React, { useState, useEffect } from "react";

export default function ReportFormPage() {
  const [form, setForm] = useState({
    itemName: "",
    description: "",
    location: "",
    date: "",
    time: "",
  });
  const [errors, setErrors] = useState({});
  const [selectedImages, setSelectedImages] = useState([]); // [{ file, url }]

  // تنضيف روابط المعاينة لما الكومبوننت يتقفل
  useEffect(() => {
    return () => selectedImages.forEach((img) => URL.revokeObjectURL(img.url));
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setSelectedImages((prev) => [...prev, ...newImages]);
    if (newImages.length > 0 && errors.images) {
      setErrors((prev) => ({ ...prev, images: false }));
    }
    e.target.value = ""; // عشان تقدر تختار نفس الصورة تاني لو حذفتها
  };

  const removeImage = (index) => {
    setSelectedImages((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.itemName.trim()) newErrors.itemName = true;
    if (!form.description.trim()) newErrors.description = true;
    if (!form.location.trim()) newErrors.location = true;
    if (!form.date) newErrors.date = true;
    if (!form.time) newErrors.time = true;
    if (selectedImages.length === 0) newErrors.images = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    alert("تم إرسال البلاغ بنجاح!");
  };

  const handleCancel = () => {
    selectedImages.forEach((img) => URL.revokeObjectURL(img.url));
    setForm({
      itemName: "",
      description: "",
      location: "",
      date: "",
      time: "",
    });
    setSelectedImages([]);
    setErrors({});
  };

  const inputClass = (name, extra = "") =>
    `w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${extra} ${
      errors[name]
        ? "border-red-500 bg-red-50 focus:ring-red-200"
        : "border-gray-200 focus:ring-gray-300"
    }`;

  const ErrorMsg = ({ name, text }) =>
    errors[name] ? <p className="text-red-500 text-xs mt-1">{text}</p> : null;

  return (
    <div
      className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8"
      dir="rtl">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8 border-b pb-4">
          <span className="text-3xl">🔍</span>
          <h1 className="text-2xl font-bold text-gray-800">بلاغ جديد</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* 1. الاسم */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              اسم الحاجة اللي لقيتها
            </label>
            <input
              type="text"
              name="itemName"
              value={form.itemName}
              onChange={handleChange}
              placeholder="مثال: محفظة سوداء، مفاتيح عربية، موبايل..."
              className={inputClass("itemName")}
            />
            <ErrorMsg name="itemName" text="لازم تكتب اسم الحاجة" />
          </div>

          {/* 2. الوصف */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              تفاصيل ووصف الحاجة 📝
            </label>
            <textarea
              rows="3"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="اكتب أي علامة مميزة (لون، خدش، مكان محدد جوه...)"
              className={inputClass("description", "resize-none")}></textarea>
            <ErrorMsg name="description" text="لازم تكتب وصف الحاجة" />
          </div>

          {/* 3. المكان */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              لقيتها فين ؟؟ 📍
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="اكتب اسم المكان أو المنطقة"
              className={inputClass("location")}
            />
            <ErrorMsg name="location" text="لازم تكتب المكان" />
          </div>

          {/* 4. التاريخ والوقت */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              لقيتها امتى؟ (التاريخ والوقت) 📅
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className={inputClass("date", "text-gray-500")}
                />
                <ErrorMsg name="date" text="لازم تختار التاريخ" />
              </div>
              <div>
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  className={inputClass("time", "text-gray-500")}
                />
                <ErrorMsg name="time" text="لازم تختار الوقت" />
              </div>
            </div>
          </div>

          {/* 5. الصور */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              صور للحاجة 📷 (يمكنك اختيار أكثر من صورة)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImages}
              className={`${inputClass("images", "cursor-pointer")} ${
                errors.images ? "" : "bg-gray-50/50"
              }`}
            />
            <ErrorMsg name="images" text="لازم ترفع صورة واحدة على الأقل" />

            {selectedImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {selectedImages.map((img, index) => (
                  <div
                    key={img.url}
                    className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-square">
                    <img
                      src={img.url}
                      alt={`صورة ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 left-2 w-7 h-7 flex items-center justify-center bg-red-500 text-white rounded-full text-sm shadow hover:bg-red-600"
                      aria-label="حذف الصورة">
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* الأزرار */}
          <div className="flex items-center gap-4 pt-4 border-t">
            <button
              type="submit"
              className="px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
              تأكيد ونشر البلاغ
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
