import { useState } from "react";
import { Button, FieldError, Form, Input, TextField } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { IoMdPerson } from "react-icons/io";
import { BiLogoGmail } from "react-icons/bi";
import { MdOutlineLock, MdOutlinePhoneEnabled } from "react-icons/md";
import { HiOutlinePhotograph } from "react-icons/hi";
import { FiEye, FiEyeOff } from "react-icons/fi";

const baseInput =
  "w-full py-2.5 pr-10 text-sm text-sky-700 placeholder:text-sky-700/60 rounded-xl border border-gray-300 focus:border-slate-800 text-right focus:outline-none";
const iconCls =
  "absolute right-3.5 top-1/2 -translate-y-1/2 text-sky-700 text-lg pointer-events-none z-10";

/* حقل عادي بأيقونة */
const IconField = ({ icon: Icon, placeholder, ...props }) => (
  <TextField
    isRequired
    aria-label={placeholder}
    className="flex flex-col gap-1"
    {...props}>
    <div className="relative w-full">
      <Icon className={iconCls} />
      <Input placeholder={placeholder} className={`${baseInput} pl-4`} />
    </div>
    <FieldError className="text-xs text-red-600 text-right" />
  </TextField>
);

/* حقل كلمة مرور بزرار إظهار/إخفاء */
const PasswordField = ({ placeholder, ...props }) => {
  const [show, setShow] = useState(false);
  return (
    <TextField
      isRequired
      type={show ? "text" : "password"}
      aria-label={placeholder}
      className="flex flex-col gap-1"
      {...props}>
      <div className="relative w-full">
        <MdOutlineLock className={iconCls} />
        <Input placeholder={placeholder} className={`${baseInput} pl-10`} />
        <button
          type="button"
          aria-label={show ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
          onClick={() => setShow((s) => !s)}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sky-700 text-lg z-10">
          {show ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
      <FieldError className="text-xs text-red-600 text-right" />
    </TextField>
  );
};

const Cardforcreat = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [imageError, setImageError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userImage) {
      setImageError("يرجى اختيار صورة شخصية");
      return;
    }

    const data = new FormData(e.currentTarget);
    console.log(Object.fromEntries(data));

    // ابعت data للـ API هنا
    navigate("/next-page"); // غيّر المسار
  };

  return (
    <div className="w-full flex items-center justify-center md:p-8">
      <Form
        onSubmit={handleSubmit}
        dir="rtl"
        className="flex w-full max-w-xl flex-col gap-4 rounded-2xl bg-white p-5 shadow-none border-0 md:p-8 md:shadow-2xl md:border md:border-gray-100">
        {/* Title */}
        <div className="flex flex-col gap-1.5 text-center mb-2">
          <p className="text-2xl sm:text-3xl font-extrabold text-sky-700">
            إنشاء حساب جديد
          </p>
          <p className="text-sm text-sky-700 font-medium">
            أهلاً بك! يرجى إدخال بياناتك للانضمام إلينا
          </p>
        </div>

        <IconField
          icon={IoMdPerson}
          name="fullName"
          placeholder="الاسم الكامل"
          validate={(v) =>
            !v || v.trim().length === 0 ? "يرجى إدخال الاسم بالكامل" : null
          }
        />

        <IconField
          icon={BiLogoGmail}
          name="email"
          type="email"
          placeholder="البريد الإلكتروني الجامعي"
          validate={(v) =>
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v)
              ? null
              : "يرجى إدخال بريد إلكتروني صحيح"
          }
        />

        <IconField
          icon={MdOutlinePhoneEnabled}
          name="phone"
          type="tel"
          inputMode="numeric"
          placeholder="رقم الهاتف المحمول"
          value={phone}
          onChange={(v) => setPhone(v.replace(/\D/g, "").slice(0, 11))}
          validate={(v) =>
            /^01[0125]\d{8}$/.test(v) ? null : "يرجى إدخال رقم هاتف مصري صحيح"
          }
        />

        {/* حقل الصورة الشخصية */}
        <div className="flex flex-col gap-1">
          <div
            className={`relative flex items-center justify-between w-full py-2 px-4 rounded-xl border bg-white ${
              imageError ? "border-red-500" : "border-gray-300"
            }`}>
            <input
              type="file"
              name="userImage"
              aria-label="تحميل الصورة الشخصية"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0] || null;
                setUserImage(file);
                setImageError(file ? "" : "يرجى اختيار صورة شخصية");
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />

            <div className="flex items-center gap-3 min-w-0">
              <HiOutlinePhotograph className="text-xl text-sky-700 shrink-0" />
              <span
                className={`text-sm truncate ${
                  userImage ? "text-sky-700" : "text-sky-700/60"
                }`}>
                {userImage ? userImage.name : "الصورة الشخصية"}
              </span>
            </div>

            <span className="px-3 py-1 text-xs font-bold bg-sky-700 text-white rounded-lg pointer-events-none">
              اختر ملف
            </span>
          </div>

          {imageError && (
            <p className="text-xs text-red-600 text-right">{imageError}</p>
          )}
        </div>

        <PasswordField
          name="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={setPassword}
          validate={(v) =>
            v.length < 8 ? "كلمة المرور يجب أن تكون 8 أحرف على الأقل" : null
          }
        />

        <PasswordField
          name="confirmPassword"
          placeholder="تأكيد كلمة المرور"
          validate={(v) =>
            !v
              ? "يرجى تأكيد كلمة المرور"
              : v !== password
                ? "كلمتا المرور غير متطابقتين"
                : null
          }
        />

        <Button
          type="submit"
          onPress={() => {
            if (!userImage) setImageError("يرجى اختيار صورة شخصية");
          }}
          className="w-full py-3 mt-2 text-base font-bold bg-sky-700 text-white rounded-xl hover:bg-[#071324] transition-colors">
          إنشاء حساب
        </Button>

        <Button
          type="button"
          className="w-full px-6 py-2 text-base text-sky-700 bg-white hover:bg-gray-50 transition-colors"
          onPress={() => navigate("/login")}>
          لديك حساب؟ تسجيل الدخول
        </Button>
      </Form>
    </div>
  );
};

export default Cardforcreat;
