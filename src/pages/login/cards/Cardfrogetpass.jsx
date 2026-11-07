import { Button, TextField, Input, FieldError } from "@heroui/react";
import { SlArrowRight } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

const Cardfrogetpass = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 w-full flex items-center justify-center p-4 sm:p-8">
      <form
        dir="rtl"
        className="flex w-full max-w-xl flex-col gap-4 rounded-2xl bg-white p-5 sm:p-8 shadow-2xl border border-gray-100 ">
        <div className="flex justify-start">
          <Button
            isIconOnly
            aria-label="رجوع"
            className="text-sky-700 bg-white hover:bg-sky-100 transition-colors"
            onPress={() => navigate("/Login")}>
            <SlArrowRight />
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-center text-sky-700">
            هل نسيت كلمة المرور؟
          </h1>
          <p className="text-sm sm:text-lg text-center text-sky-700">
            يرجى إدخال البريد الإلكتروني الخاص بك لاستعادة كلمة المرور
          </p>
        </div>

        <TextField
          isRequired
          className="flex flex-col gap-2"
          validate={(value) => {
            const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
              value,
            );
            const isPhone = /^\d{10}$/.test(value);
            if (!isEmail && !isPhone) {
              return "البريد الإلكتروني أو رقم الهاتف الذي أدخلته غير صحيح";
            }
            return null;
          }}>
          <Input
            placeholder="البريد الإلكتروني"
            className="w-full py-2 text-sky-700"
          />
          <FieldError className="text-xs text-red-600" />
        </TextField>

        <Button
          type="submit"
          className="w-full px-6 py-2 text-base bg-sky-700 hover:bg-[#071324] transition-colors">
          استعادة كلمة المرور
        </Button>
      </form>
    </div>
  );
};

export default Cardfrogetpass;
