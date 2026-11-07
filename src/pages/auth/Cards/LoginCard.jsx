import { Button, FieldError, Form, Input, TextField } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { BiLogoGmail } from "react-icons/bi";
import { MdOutlineLock } from "react-icons/md";

const LoginCard = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* القسم الأيمن: كارت التسجيل */}
      <div className="flex-1 w-full flex items-center justify-center p-4 sm:p-8">
        <Form
          dir="rtl"
          className="flex w-full max-w-xl flex-col gap-4 rounded-2xl bg-white p-5 sm:p-8 shadow-2xl border border-gray-100 ">
          <div className="flex flex-col gap-2 text-center text-sky-700 font-bold">
            <p className="text-2xl">تسجيل الدخول</p>
            <p className="text-lg">اهلا بك! يرجي تسجيل بياناتك..</p>
          </div>
          {/* Email Field */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="flex flex-col gap-2"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "البريد الإلكتروني أو رقم الهاتف المحمول الذي أدخلته غير مرتبط بحساب";
              }
              return null;
            }}>
            <div className="relative w-full">
              <BiLogoGmail className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sky-700 text-lg pointer-events-none z-10" />
              <Input
                placeholder="البريد الإلكتروني الجامعي"
                className="w-full py-2.5 pr-10 pl-4 text-sm text-sky-700 placeholder:text-sky-700 rounded-xl border border-gray-300 focus:border-slate-800 text-right focus:outline-none"
              />
            </div>
            <FieldError className="text-xs text-red-600" />
          </TextField>

          {/* Password Field */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            className="flex flex-col gap-2 "
            validate={(value) => {
              if (value.length < 8) {
                return "إن كلمة السر التي أدخلتها غير صحيحة";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}>
            <div className="relative w-full">
              {/* أيقونة القفل جهة اليمين */}
              <MdOutlineLock className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sky-700 text-lg pointer-events-none z-10" />

              <Input
                placeholder="كلمة المرور"
                className="w-full py-2.5 pr-10 pl-10 text-sm text-sky-700 placeholder:text-sky-700   rounded-xl border border-gray-300 focus:border-slate-800 text-right focus:outline-none"
              />
            </div>

            <FieldError className="text-xs text-red-600" />
          </TextField>

          {/* Show Password Checkbox */}

          {/* Form Buttons */}
          <div className="flex gap-4 pt-4 items-center justify-center flex-col  ">
            <Button
              type="تسجيل الدخول"
              className="flex items-center gap-2 px-6 py-2 text-base w-full  bg-sky-700  hover:bg-[#071324] transition-colors">
              تسجيل الدخول
            </Button>
            <Button
              className="flex items-center gap-2 px-6 py-2 text-sky-700 w-full bg-white  "
              onClick={() => navigate("/forgetpassword")}>
              هل نسيت كلمه السر ؟
            </Button>
          </div>

          <div className="flex gap-4 pt-4 items-center justify-center">
            <Button
              className="flex items-center gap-2 px-6 py-2 text-base w-full  text-sky-700   bg-white"
              onClick={() => navigate("/Signup")}>
              ليس لديك حساب؟انشاء حساب
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default LoginCard;
