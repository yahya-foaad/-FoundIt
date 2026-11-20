import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// بيانات تجريبية مؤقتة، هنستبدلها بطلب API لما الباك إند يجهز
function getReportById(id) {
  return {
    id,
    itemName: "محفظة سوداء",
    description: "محفظة جلد سوداء فيها كارنيه الجامعة",
    location: "المكتبة المركزية",
    date: "2026-11-18",
    time: "14:30",
    images: [],
  };
}

const ErrorMsg = ({ show, text }) =>
  show ? <p className="text-red-500 text-xs mt-1">{text}</p> : null;

export default function EditFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initial] = useState(() => getReportById(id));
  const [form, setForm] = useState({
    itemName: initial.itemName,
    description: initial.description,
    location: initial.location,
    date: initial.date,
    time: initial.time,
  });
  const [errors, setErrors] = useState({});
  // كل صورة: { url, file? } ... الصور القديمة من غير file
  const [images, setImages] = useState(initial.images.map((url) => ({ url })));

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
    setImages((prev) => [...prev, ...newImages]);
    if (newImages.length > 0 && errors.images) {
      setErrors((prev) => ({ ...prev, images: false }));
    }
    e.target.value = "";
  };

  const removeImage = (index) => {
    setImages((prev) => {
      if (prev[index].file) URL.revokeObjectURL(prev[index].url);
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
    if (images.length === 0) newErrors.images = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("updated report:", { id, ...form, images });
    alert("تم حفظ التعديلات بنجاح!");
    navigate("/profile/my-reports");
  };

  const handleCancel = () => {
    images.forEach((img) => img.file && URL.revokeObjectURL(img.url));
    navigate(-1);
  };

  const handleDelete = () => {
    if (window.confirm("هل أنت متأكد من حذف البلاغ؟")) {
      console.log("deleted report:", id);
      navigate("/profile/my-reports");
    }
  };

  const inputClass = (name, extra = "") =>
    `w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${extra} ${
      errors[name]
        ? "border-red-500 bg-red-50 focus:ring-red-200"
        : "border-gray-200 focus:ring-gray-300"
    }`;

  return (
    <div
      className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8"
      dir="rtl"
    >
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8 border-b pb-4">
          <span className="text-3xl">✏️</span>
          <h1 className="text-2xl font-bold text-gray-800">تعديل البلاغ</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* 1. الاسم */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              اسم الحاجة
            </label>
            <input
              type="text"
              name="itemName"
              value={form.itemName}
              onChange={handleChange}
              placeholder="مثال: محفظة سوداء، مفاتيح عربية، موبايل..."
              className={inputClass("itemName")}
            />
            <ErrorMsg show={errors.itemName} text="لازم تكتب اسم الحاجة" />
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
              className={inputClass("description", "resize-none")}
            ></textarea>
            <ErrorMsg show={errors.description} text="لازم تكتب وصف الحاجة" />
          </div>

          {/* 3. المكان */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              المكان 📍
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="اكتب اسم المكان أو المنطقة"
              className={inputClass("location")}
            />
            <ErrorMsg show={errors.location} text="لازم تكتب المكان" />
          </div>

          {/* 4. التاريخ والوقت */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              التاريخ والوقت 📅
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
                <ErrorMsg show={errors.date} text="لازم تختار التاريخ" />
              </div>
              <div>
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  className={inputClass("time", "text-gray-500")}
                />
                <ErrorMsg show={errors.time} text="لازم تختار الوقت" />
              </div>
            </div>
          </div>

          {/* 5. الصور */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              صور للحاجة 📷 (يمكنك إضافة أكثر من صورة)
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
            <ErrorMsg
              show={errors.images}
              text="لازم تسيب صورة واحدة على الأقل"
            />

            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {images.map((img, index) => (
                  <div
                    key={img.url}
                    className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-square"
                  >
                    <img
                      src={img.url}
                      alt={`صورة ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 left-2 w-7 h-7 flex items-center justify-center bg-red-500 text-white rounded-full text-sm shadow hover:bg-red-600"
                      aria-label="حذف الصورة"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* الأزرار */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t">
            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm"
              >
                حفظ التعديلات
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                إلغاء
              </button>
            </div>
            <button
              type="button"
              onClick={handleDelete}
              className="px-6 py-3 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
            >
              حذف البلاغ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
