import { useState } from "react";

const SettingsPage = () => {
  return (
    <div
      dir="rtl"
      className="card glass w-full max-w-2xl mx-auto p-6 text-right"
    >
      {/* Grid Layout for the form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg opacity-90">الاسم</legend>
          <input type="text" className="input w-full" placeholder="سارة أحمد" />
        </fieldset>

        {/* Email */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg opacity-90">
            البريد الإلكتروني
          </legend>
          <input
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
          <input type="tel" className="input w-full" placeholder="0123456789" />
        </fieldset>

        {/* Faculty */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg opacity-90">الكلية</legend>
          <input
            type="text"
            className="input w-full"
            placeholder="كلية الهندسة"
          />
        </fieldset>

        {/* Password */}
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

        {/* Confirm Password */}
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

        {/* File Upload - Kept exactly as it was */}
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
        <button className="btn btn-ghost text-primary btn-sm">
          إعادة تعيين كلمة المرور
        </button>
        <button className="btn btn-neutral px-8">حفظ</button>
      </div>
    </div>
  );
};

export default SettingsPage;
