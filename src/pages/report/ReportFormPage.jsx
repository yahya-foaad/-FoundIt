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
      className="min-h-screen bg-base-200 py-10 px-4 sm:px-6 lg:px-8"
      dir="rtl">
      <div className="max-w-2xl mx-auto bg-base-100 text-base-content p-8 rounded-2xl shadow-sm border border-base-300">
        {/* Header - العنوان الرئيسي */}
        <div className="flex items-center gap-3 mb-8 border-b border-base-300 pb-4">
          <span className="text-3xl">🔍</span>
          <h1 className="text-2xl font-bold text-base-content">بلاغ جديد</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* 1. الاسم */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-base-content/80">
              اسم الحاجة اللي لقيتها
            </label>
            <input
              type="text"
              name="itemName"
              value={form.itemName}
              onChange={handleChange}
              placeholder="مثال: محفظة سوداء، مفاتيح عربية، موبايل..."
              className="input input-bordered w-full rounded-xl bg-base-100 text-sm focus:outline-none focus:border-primary"
            />
            <ErrorMsg name="itemName" text="لازم تكتب اسم الحاجة" />
          </div>

          {/* 2. الوصف */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-base-content/80">
              تفاصيل ووصف الحاجة 📝
            </label>
            <textarea
              rows="3"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="اكتب أي علامة مميزة (لون، خدش، مكان محدد جوه...)"
              className="textarea textarea-bordered w-full rounded-xl bg-base-100 text-sm resize-none focus:outline-none focus:border-primary"></textarea>
          </div>

          {/* 3. المكان */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-base-content/80">
              لقيتها فين ؟؟ 📍
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="اكتب اسم المكان أو المنطقة"
                className="input input-bordered w-full rounded-xl bg-base-100 text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* 4. التاريخ والوقت */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-base-content/80">
              لقيتها امتى؟ (التاريخ والوقت) 📅
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="date"
                className="input input-bordered w-full rounded-xl bg-base-100 text-sm text-base-content/70 focus:outline-none focus:border-primary"
              />
              <input
                type="time"
                className="input input-bordered w-full rounded-xl bg-base-100 text-sm text-base-content/70 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* 5. الصور */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-base-content/80">
              صورة للحاجة 📷
            </label>
            <div className="border-2 border-dashed border-base-300 rounded-2xl p-6 text-center hover:border-primary transition-colors cursor-pointer bg-base-200/50">
              <div className="text-3xl mb-2">📷</div>
              <p className="text-sm text-base-content/70 font-medium">
                اضغط هنا عشان ترفع صورة أو اسحبها
              </p>
            </div>
          </div>

          {/* 7. أزرار التحكم */}
          <div className="flex items-center gap-4 pt-4 border-t border-base-300">
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-primary-content rounded-xl text-sm font-medium hover:opacity-90 transition-opacity shadow-sm">
              تأكيد ونشر البلاغ
            </button>
            <button
              type="button"
              className="px-6 py-3 bg-base-200 text-base-content/70 rounded-xl text-sm font-medium hover:bg-base-300 transition-colors">
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
