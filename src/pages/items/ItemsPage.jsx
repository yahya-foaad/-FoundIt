import { FiSearch } from "react-icons/fi";
import { MdSort } from "react-icons/md";
import ItemCard from "../../components/ItemCard";

const items = [
  {
    id: 1,
    name: "بطاقة طالب",
    date: "1 نوفمبر 2026",
    image: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=400",
  },
  {
    id: 2,
    name: "مفاتيح مع سلسلة",
    date: "26 أكتوبر 2026",
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400",
  },
  {
    id: 3,
    name: "محفظة جلدية",
    date: "31 أكتوبر 2026",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400",
  },
  {
    id: 4,
    name: "سماعات AirPods",
    date: "2 نوفمبر 2026",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400",
  },
  {
    id: 5,
    name: "حقيبة ظهر",
    date: "28 أكتوبر 2026",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
  },
  {
    id: 6,
    name: "زجاجة مياه",
    date: "25 أكتوبر 2026",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
  },
  {
    id: 7,
    name: "نظارة طبية",
    date: "25 أكتوبر 2026",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400",
  },
  {
    id: 8,
    name: "سماعات لاسلكية",
    date: "30 أكتوبر 2026",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  },
];

export default function ItemsPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#eef3fc] px-4 py-6">
      <div className="mx-auto max-w-6xl space-y-5">
        {/* البانر */}
        <section className="relative overflow-hidden rounded-3xl bg-linear-to-l from-blue-100 via-white to-blue-50 shadow-sm">
          <div className="relative z-10 p-6 md:p-10 md:max-w-lg">
            <h1 className="text-2xl font-extrabold text-[#0b1f4b] md:text-4xl">
              ضايع منك حاجة في الجامعة؟
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
              هنا تقدر تشوف الحاجات اللي اتلاقت في الجامعة، وتعرف إذا كانت حاجتك
              من ضمنها، وتطالب بيها بسهولة.
            </p>
          </div>
          <img
            src="/images/770a083a-5515-4b5a-ac38-73201fc5ed89.png"
            alt=""
            className="absolute left-0 top-0 hidden h-full w-1/2 object-cover opacity-80 md:block"
            style={{
              maskImage: "linear-gradient(to left, black 60%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to left, black 60%, transparent)",
              transform: "scaleX(-1)",
            }}
          />
        </section>

        {/* البحث */}
        <div className="relative">
          <FiSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-xl text-slate-700" />
          <input
            type="text"
            placeholder="دوّر على غرض (مثلًا: شنطة، نضارة، موبايل...)"
            className="w-full rounded-full border border-slate-200 bg-white py-4 pr-14 pl-4 text-sm shadow-sm outline-none focus:border-blue-500"
          />
        </div>

        {/* الترتيب */}
        <button className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-[#0b1f4b] shadow-sm">
          <MdSort className="text-lg" />
          ترتيب: الأحدث
        </button>

        {/* الكروت */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
