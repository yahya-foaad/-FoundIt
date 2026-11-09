import { Link } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiMapPin,
  FiCalendar,
  FiCheckCircle,
  FiUser,
  FiFlag,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiArrowRight,
} from "react-icons/fi";
import { FaHandshake } from "react-icons/fa";

const thumbs = [
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300",
  "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
];

const details = [
  { label: "التصنيف", value: "إلكترونيات", icon: <FiBox /> },
  {
    label: "مكان العثور",
    value: "المكتبة المركزية – الدور الثاني",
    icon: <FiMapPin />,
  },
  { label: "تاريخ العثور", value: "2 نوفمبر 2026", icon: <FiCalendar /> },
  { label: "الحالة", value: "جيدة", icon: <FiCheckCircle /> },
  { label: "المُبلغ", value: "أحد موظفي الجامعة", icon: <FiUser /> },
];

export default function ItemDetailsPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#eef3fc] px-4 py-6">
      <div className="mx-auto max-w-6xl">
        {/* مسار التنقل */}
        <nav className="flex items-center gap-2 text-sm text-slate-600">
          <Link to="/" className="text-blue-600">
            <FiHome className="text-lg" />
          </Link>
          <FiChevronLeft className="text-xs" />
          <Link to="/items" className="hover:text-blue-600">
            الأغراض المعثور عليها
          </Link>
          <FiChevronLeft className="text-xs" />
          <span className="font-bold text-[#0b1f4b]">تفاصيل الغرض</span>
        </nav>

        <h1 className="mt-3 mb-5 text-3xl font-extrabold text-[#0b1f4b]">
          تفاصيل الغرض
        </h1>

        <div className="grid gap-6 rounded-3xl bg-white p-5 shadow-sm lg:grid-cols-2 lg:p-6">
          {/* الصور (يمين) */}
          <div>
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900"
                alt="سماعات لاسلكية"
                className="h-72 w-full object-cover sm:h-96"
              />
              <button className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow">
                <FiChevronLeft />
              </button>
              <button className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow">
                <FiChevronRight />
              </button>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-3">
              {thumbs.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className={`h-16 w-full rounded-xl object-cover border-2 ${
                    i === 3 ? "border-blue-600" : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* البيانات (شمال) */}
          <div className="flex flex-col">
            <span className="flex w-fit items-center gap-1 rounded-full bg-green-600 px-4 py-1 text-sm font-bold text-white">
              <FiCheck /> معثور عليه
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-[#0b1f4b]">
              سماعات لاسلكية
            </h2>
            <p className="mt-2 leading-8 text-slate-600">
              سماعات لاسلكية سوداء بحالة جيدة، تم العثور عليها في المكتبة
              المركزية بالدور الثاني.
            </p>

            <ul className="mt-5 divide-y divide-slate-200 rounded-2xl bg-slate-50 px-4">
              {details.map((d) => (
                <li
                  key={d.label}
                  className="flex items-center justify-between gap-3 py-3 text-sm"
                >
                  <span className="flex items-center gap-2 font-bold text-[#0b1f4b]">
                    <span className="text-lg text-blue-600">{d.icon}</span>
                    {d.label}
                  </span>
                  <span className="text-slate-600">{d.value}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-bold text-white shadow hover:bg-blue-700">
                <FaHandshake className="text-xl" />
                المطالبة بالغرض
              </button>
              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-3 font-bold text-[#0b1f4b] hover:bg-slate-50">
                <FiFlag />
                الإبلاغ عن مشكلة
              </button>
            </div>

            <Link
              to="/items"
              className="mt-4 flex items-center gap-2 text-sm font-bold text-blue-600 hover:underline"
            >
              <FiArrowRight />
              رجوع لصفحة الأغراض
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
