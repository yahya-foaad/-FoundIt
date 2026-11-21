import { Button, FieldError, Form, Input, TextField } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { BiLogoGmail } from "react-icons/bi";
import { MdOutlineLock } from "react-icons/md";
import { useAuth } from "../AuthContext";
import { useState } from "react";

const API_URL =
  "https://login-mock-d799cf.mock.minarady94-24614.postman.dev/login";

const inputCls =
  "w-full py-2.5 pr-10 text-sm text-base-content placeholder:text-base-content/50 rounded-xl border border-base-300 bg-base-100 focus:border-primary text-right focus:outline-none";
const iconCls =
  "absolute right-3.5 top-1/2 -translate-y-1/2 text-primary text-lg pointer-events-none z-10";

const LoginCard = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget));

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      const result = await res.json();
      console.log("status:", res.status, "response:", result);

      if (!res.ok) {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
        return;
      }

      const user = result.user;

      login({
        name: user.name,
        role: user.role ?? "طالب جامعي",
        image: user.image || "/images/default-avatar.png",
      });
      navigate("/");
    } catch (err) {
      console.error("error:", err);
      setError("حصل خطأ في الاتصال بالسيرفر: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full flex items-center justify-center p-4 sm:p-8">
      <Form
        onSubmit={handleSubmit}
        dir="rtl"
        className="flex w-full max-w-xl flex-col gap-4 rounded-2xl bg-base-100 text-base-content p-5 sm:p-8 shadow-2xl border border-base-300">
        <div className="flex flex-col gap-2 text-center text-primary font-bold">
          <p className="text-2xl">تسجيل الدخول</p>
          <p className="text-lg">اهلا بك! يرجي تسجيل بياناتك..</p>
        </div>

        {/* Email Field */}
        <TextField
          isRequired
          name="email"
          type="email"
          className="flex flex-col gap-2"
          validate={(value) =>
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ? null
              : "البريد الإلكتروني الذي أدخلته غير صحيح"
          }>
          <div className="relative w-full">
            <BiLogoGmail className={iconCls} />
            <Input
              placeholder="البريد الإلكتروني الجامعي"
              className={`${inputCls} pl-4`}
            />
          </div>
          <FieldError className="text-xs text-error" />
        </TextField>

        {/* Password Field */}
        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          className="flex flex-col gap-2"
          validate={(value) =>
            value.length < 8 ? "كلمة السر يجب أن تكون 8 أحرف على الأقل" : null
          }>
          <div className="relative w-full">
            <MdOutlineLock className={iconCls} />
            <Input placeholder="كلمة المرور" className={`${inputCls} pl-10`} />
          </div>
          <FieldError className="text-xs text-error" />
        </TextField>

        {/* Form Buttons */}
        <div className="flex gap-4 pt-4 items-center justify-center flex-col">
          {error && (
            <p className="text-sm text-error text-center w-full">{error}</p>
          )}
          <Button
            type="submit"
            isDisabled={loading}
            className="flex items-center gap-2 px-6 py-2 text-base w-full rounded-xl bg-primary text-primary-content hover:opacity-90 transition-opacity">
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </Button>
        </div>

        <div className="flex gap-4 pt-4 items-center justify-center">
          <Button
            type="button"
            className="flex items-center gap-2 px-6 py-2 text-base w-full text-primary bg-transparent hover:bg-base-200 transition-colors"
            onPress={() => navigate("/Signup")}>
            ليس لديك حساب؟ انشاء حساب
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginCard;
