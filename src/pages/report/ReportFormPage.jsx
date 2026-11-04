import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CameraIcon,
  ClockIcon,
  MapPinIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const fieldClass =
  "w-full rounded-lg border border-sky-200 bg-sky-50/60 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200";

function Field({ label, optional, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-slate-800">
        {label}
        {optional && (
          <span className="mr-1 font-normal text-slate-400">(اختياري)</span>
        )}
      </span>
      {children}
    </label>
  );
}

export default function ReportFormPage() {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState({
    type: "lost",
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
    contact: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setReportData((prev) => ({ ...prev, [name]: value }));
  }

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (preview) URL.revokeObjectURL(preview);

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  function removeImage(e) {
    e.preventDefault();
    if (preview) URL.revokeObjectURL(preview);
    setImage(null);
    setPreview("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log({ ...reportData, image });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div dir="rtl" className="mx-auto max-w-xl px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-lg"
      >
        <h1 className="text-2xl font-bold text-slate-900">سجل بلاغ جديد</h1>

        <Field label="نوع البلاغ إيه؟">
          <select
            name="type"
            value={reportData.type}
            onChange={handleChange}
            className={fieldClass}
          >
            <option value="lost">حاجة ضاعت مني (مفقود)</option>
            <option value="found">لقيت حاجة وعايز أرجعها (لقيت)</option>
          </select>
        </Field>

        <Field label="اسم الحاجة اللي ضاعت أو لقيتها">
          <input
            name="title"
            value={reportData.title}
            onChange={handleChange}
            placeholder="مثال: محفظة سودة، مفاتيح عربية، موبايل..."
            required
            className={fieldClass}
          />
        </Field>

        <Field label="تفاصيل ووصف الحاجة">
          <textarea
            name="description"
            value={reportData.description}
            onChange={handleChange}
            placeholder="اكتب أي علامة مميزة (لون، خدش، مكان محدد جوه...)"
            rows={4}
            className={fieldClass}
          />
        </Field>

        <Field label="آخر مكان شفتها فيه">
          <div className="grid grid-cols-2 gap-2">
            <input
              name="location"
              value={reportData.location}
              onChange={handleChange}
              placeholder="اكتب اسم المكان أو المنطقة"
              className={fieldClass}
            />
            <div className="flex cursor-pointer items-center justify-center gap-1 rounded-lg border border-sky-200 bg-sky-100 text-sm font-medium text-sky-700 hover:bg-sky-200 transition">
              <MapPinIcon className="size-5" />
              حدد على الخريطة
            </div>
          </div>
        </Field>

        <Field label="حصلت امتى؟ (التاريخ والوقت)">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              name="date"
              value={reportData.date}
              onChange={handleChange}
              className={fieldClass}
            />
            <div className="relative">
              <ClockIcon className="pointer-events-none absolute right-3 top-2.5 size-5 text-sky-600" />
              <input
                type="time"
                name="time"
                value={reportData.time}
                onChange={handleChange}
                className={`${fieldClass} pr-10`}
              />
            </div>
          </div>
        </Field>

        {/* تم تعديل gap.1.5 إلى gap-1.5 صحيحة هنا */}
        <div className="flex flex-col gap-1.5">
          <p className="text-sm font-semibold text-slate-800">
            صورة للحاجة (لو متوفرة)
          </p>
          <label className="relative flex h-40 cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed border-sky-300 bg-sky-50 text-sm text-slate-600 hover:bg-sky-100/50 transition">
            {preview ? (
              <div className="relative h-full w-full">
                <img
                  src={preview}
                  alt="معاينة الصورة"
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={removeImage}
                  className="absolute left-2 top-2 rounded-full bg-slate-900/70 p-1 text-white hover:bg-slate-900"
                  title="حذف الصورة"
                >
                  <XMarkIcon className="size-4" />
                </button>
              </div>
            ) : (
              <>
                <CameraIcon className="size-8 text-sky-600" />
                <span>اضغط هنا عشان ترفع صورة أو اسحبها</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="absolute inset-0 cursor-pointer opacity-0"
              disabled={!!preview}
            />
          </label>
        </div>

        <Field label="نتواصل معاك إزاي؟" optional>
          <input
            name="contact"
            value={reportData.contact}
            onChange={handleChange}
            placeholder="رقم الموبايل أو الإيميل"
            className={fieldClass}
          />
        </Field>

        <div className="mt-2 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            إلغاء
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {isSubmitting ? "جاري النشر..." : "تأكيد ونشر البلاغ"}
          </button>
        </div>
      </form>
    </div>
  );
}
