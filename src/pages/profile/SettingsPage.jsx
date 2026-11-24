import { useAuth } from "../auth/AuthContext";

const SettingsPage = () => {
  const { user, login } = useAuth();

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

  /* 🔒 BACKEND VERSION: امسح handleSave اللي فوق وفك الـ comment عن ده
const handleSave = async (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const data = Object.fromEntries(new FormData(form));

  // validation للباسورد (بس لو كتب حاجة)
  if (data.newPassword || data.confirmPassword) {
    if (data.newPassword.length < 8) {
      alert("كلمة المرور يجب ألا تقل عن 8 أحرف");
      return;
    }
    if (data.newPassword !== data.confirmPassword) {
      alert("كلمتا المرور غير متطابقتين");
      return;
    }
  }

  // validation للصورة (2MB)
  const avatar = data.avatar;
  if (avatar && avatar.size > 2 * 1024 * 1024) {
    alert("حجم الصورة أكبر من 2 ميجابايت");
    return;
  }

  // الملفات لازم تتبعت FormData مش JSON
  const body = new FormData();
  body.append("name", data.name);
  body.append("email", data.email);
  body.append("phone", data.phone);
  body.append("faculty", data.faculty);
  if (data.newPassword) body.append("password", data.newPassword);
  if (avatar && avatar.size > 0) body.append("avatar", avatar);

  try {
    const res = await fetch("/api/users/me", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        // مفيش Content-Type هنا، المتصفح بيحطه لوحده مع FormData
      },
      body,
    });

    if (!res.ok) throw new Error("Update failed");

    const updatedUser = await res.json();
    login(updatedUser);
    form.reset();
    alert("تم الحفظ بنجاح");
  } catch (err) {
    console.error(err);
    alert("حدث خطأ، حاول مرة أخرى");
  }
};
*/
  return (
    <form
      //key={user?.id}
      // onSubmit={handleSave}
      dir="rtl"
      className="card glass w-full max-w-2xl mx-auto p-6 text-right"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg opacity-90">الاسم</legend>
          <input
            name="name"
            defaultValue={user?.name}
            type="text"
            className="input w-full text-base-content"
            // placeholder={user?.name }
            placeholder="سارة احمد"
          />
        </fieldset>

        {/* Email */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg opacity-90">
            البريد الإلكتروني
          </legend>
          <input
            name="email"
            defaultValue={user?.email}
            type="email"
            className="input w-full text-base-content"
            //placeholder ={user?.email}
            placeholder="sara.ahmed@campus.edu"
          />
        </fieldset>

        {/* Phone Number */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg opacity-90">
            رقم الهاتف
          </legend>
          <input
            name="phone"
            defaultValue={user?.phone}
            type="tel"
            className="input w-full text-base-content"
            //placeholder ={user?.phone}
            placeholder="0123456789"
          />
        </fieldset>

        {/* Faculty */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg opacity-90">الكلية</legend>
          <input
            name="faculty"
            defaultValue={user?.faculty}
            type="text"
            className="input w-full text-base-content"
            //placeholder ={user?.faculty}
            placeholder="كلية الهندسة"
          />
        </fieldset>

        {/* Password (unchanged) */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg opacity-90">
            كلمة المرور
          </legend>
          <input
            name="newPassword"
            type="password"
            autoComplete="new-password"
            className="input w-full text-base-content"
            placeholder="••••••••"
          />
        </fieldset>

        {/* Confirm Password (unchanged) */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg opacity-90">
            تأكيد كلمة المرور
          </legend>
          <input
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            className="input w-full text-base-content"
            placeholder="••••••••"
          />
        </fieldset>

        {/* File Upload (unchanged) */}
        <div className="md:col-span-2 mt-2">
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend text-lg opacity-70">
              اختر ملفاً (صورة شخصية)
            </legend>
            <input
              name="avatar"
              type="file"
              accept="image/*"
              className="file-input w-full"
            />
            <label className="label">الحد الأقصى للحجم 2 ميجابايت</label>
          </fieldset>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-center items-center mt-6">
  <button type="submit" className="btn btn-neutral px-8">
    حفظ
  </button>
</div>
    </form>
  );
};

export default SettingsPage;
