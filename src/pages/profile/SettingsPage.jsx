import { useAuth } from "../auth/AuthContext"; // ✏️ EDIT 1: replaces the unused useState import

const SettingsPage = () => {
  const { user, login } = useAuth(); // ✏️ EDIT 2: ADD, reads the user (login is reused to save changes)

  // ✏️ EDIT 3: ADD this whole function
  const handleSave = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    login({
      ...user, // keeps role, image, etc.
      name: data.name,
      email: data.email,
      phone: data.phone,
      faculty: data.faculty,
    });
  };

  return (
    <form // ✏️ EDIT 4: was <div>, now a form so Save works
      onSubmit={handleSave}
      dir="rtl"
      className="card glass w-full max-w-2xl mx-auto p-6 text-right"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg opacity-90">الاسم</legend>
          <input
            name="name" // ✏️ EDIT 5: ADD name
            defaultValue={user?.name} // ✏️ EDIT 5: ADD defaultValue
            type="text"
            className="input w-full"
            placeholder="سارة أحمد"
          />
        </fieldset>

        {/* Email */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg opacity-90">
            البريد الإلكتروني
          </legend>
          <input
            name="email" // ✏️ EDIT 6
            defaultValue={user?.email} // ✏️ EDIT 6
            type="email"
            className="input w-full"
            placeholder="sara.ahmed@campus.edu"
          />
        </fieldset>

        {/* Phone Number */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg opacity-90">
            رقم الهاتف
          </legend>
          <input
            name="phone" // ✏️ EDIT 7
            defaultValue={user?.phone} // ✏️ EDIT 7
            type="tel"
            className="input w-full"
            placeholder="0123456789"
          />
        </fieldset>

        {/* Faculty */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg opacity-90">الكلية</legend>
          <input
            name="faculty" // ✏️ EDIT 8
            defaultValue={user?.faculty} // ✏️ EDIT 8
            type="text"
            className="input w-full"
            placeholder="كلية الهندسة"
          />
        </fieldset>

        {/* Password (unchanged) */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg opacity-90">
            كلمة المرور
          </legend>
          <input
            type="password"
            className="input w-full"
            placeholder="••••••••"
          />
        </fieldset>

        {/* Confirm Password (unchanged) */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg opacity-90">
            تأكيد كلمة المرور
          </legend>
          <input
            type="password"
            className="input w-full"
            placeholder="••••••••"
          />
        </fieldset>

        {/* File Upload (unchanged) */}
        <div className="md:col-span-2 mt-2">
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend text-lg opacity-70">
              اختر ملفاً (صورة شخصية)
            </legend>
            <input type="file" className="file-input w-full" />
            <label className="label">الحد الأقصى للحجم 2 ميجابايت</label>
          </fieldset>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between items-center mt-6">
        <button type="button" className="btn btn-ghost text-primary btn-sm">
          {" "}
          {/* ✏️ EDIT 9: ADD type="button" so it doesn't submit */}
          إعادة تعيين كلمة المرور
        </button>
        <button type="submit" className="btn btn-neutral px-8">
          {" "}
          {/* ✏️ EDIT 10: ADD type="submit" */}
          حفظ
        </button>
      </div>
    </form>
  );
};

export default SettingsPage;
