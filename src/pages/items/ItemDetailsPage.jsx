import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useItems } from "../../context/ItemContext";
import { formatDate } from "../../components/formatDate";
import {
  FiHome,
  FiBox,
  FiMapPin,
  FiCalendar,
  FiCheckCircle,
  FiFlag,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiArrowRight,
} from "react-icons/fi";
import { FaHandshake } from "react-icons/fa";

export default function ItemDetailsPage() {
  const { id } = useParams();
  const { items } = useItems();
  const [claimed, setClaimed] = useState(false);
  const [reported, setReported] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  const item = items.find(
    (i) => String(i.id) === String(id) && i.status === "approved",
  );

  if (!item) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-base-200 px-4 py-16 text-center"
      >
        <h1 className="text-2xl font-extrabold text-base-content">
          الغرض ده مش موجود
        </h1>
        <p className="mt-2 text-base-content/70">
          يمكن اتحذف أو لسه مش متوافق عليه.
        </p>
        <Link to="/items" className="mt-5 inline-block font-bold text-primary">
          رجوع لصفحة الأغراض
        </Link>
      </div>
    );
  }

  const images = item.images?.length ? item.images : [item.image];
  const name = item.name?.trim();
  const details = [
    { label: "مكان العثور", value: item.location, icon: <FiMapPin /> },
    { label: "المكان بالتحديد", value: item.place, icon: <FiBox /> },
    {
      label: "تاريخ العثور",
      value: formatDate(item.date),
      icon: <FiCalendar />,
    },
    { label: "الحالة", value: "معثور عليه", icon: <FiCheckCircle /> },
  ].filter((d) => d.value);

  return (
    <div dir="rtl" className="min-h-screen bg-base-200 px-4 py-6">
      <div className="mx-auto max-w-6xl">
        {/* مسار التنقل */}
        <nav className="flex items-center gap-2 text-sm text-base-content/70">
          <Link to="/" className="text-primary">
            <FiHome className="text-lg" />
          </Link>
          <FiChevronLeft className="text-xs" />
          <Link to="/items" className="hover:text-primary">
            الأغراض المعثور عليها
          </Link>
          <FiChevronLeft className="text-xs" />
          <span className="font-bold text-base-content">تفاصيل الغرض</span>
        </nav>

        <h1 className="mt-3 mb-5 text-3xl font-extrabold text-base-content">
          تفاصيل الغرض
        </h1>

        <div className="grid gap-6 rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm lg:grid-cols-2 lg:p-6">
          {/* الصور (يمين) */}
          <div>
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={images[imgIndex]}
                alt={name}
                className="h-72 w-full object-cover sm:h-96"
              />
              <>
                <button
                  onClick={() => setImgIndex((imgIndex + 1) % images.length)}
                  className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-base-100/90 text-base-content shadow"
                >
                  <FiChevronLeft />
                </button>
                <button
                  onClick={() =>
                    setImgIndex((imgIndex - 1 + images.length) % images.length)
                  }
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-base-100/90 text-base-content shadow"
                >
                  <FiChevronRight />
                </button>
              </>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-3">
              {images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  onClick={() => setImgIndex(i)}
                  className={`h-16 w-full cursor-pointer rounded-xl border-2 object-cover ${
                    i === imgIndex ? "border-primary" : "border-transparent"
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

            <h2 className="mt-3 text-3xl font-extrabold text-primary">
              {name}
            </h2>

            <ul className="mt-5 divide-y divide-base-300 rounded-2xl bg-base-200 px-4">
              {details.map((d) => (
                <li
                  key={d.label}
                  className="flex items-center justify-between gap-3 py-3 text-sm"
                >
                  <span className="flex items-center gap-2 font-bold text-base-content">
                    <span className="text-lg text-primary">{d.icon}</span>
                    {d.label}
                  </span>
                  <span className="text-base-content/70">{d.value}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setClaimed(true)}
                disabled={claimed}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold text-white shadow hover:opacity-90"
              >
                <FaHandshake className="text-xl" />
                {claimed ? "طلبك اتسجل" : "المطالبة بالغرض"}
              </button>
              <button
                onClick={() => setReported(true)}
                disabled={reported}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-base-300 bg-base-100 py-3 font-bold text-base-content hover:bg-base-200"
              >
                <FiFlag />
                {reported ? "البلاغ اتسجل" : "الإبلاغ عن مشكلة"}
              </button>
            </div>

            <Link
              to="/items"
              className="mt-4 flex items-center gap-2 text-sm font-bold text-primary hover:underline"
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
