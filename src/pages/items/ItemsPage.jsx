import { FiSearch } from "react-icons/fi";
import { MdSort } from "react-icons/md";
import { useState } from "react";
import ItemCard from "../../components/ItemCard";
import { useItems } from "../../context/ItemContext";

export default function ItemsPage() {
  const { items: allItems } = useItems();
  const [query, setQuery] = useState("");
  const [newestFirst, setNewestFirst] = useState(true);

  const q = query.trim().toLowerCase();
  const items = allItems
    .filter((i) => i.status === "approved")
    .filter(
      (i) =>
        !q ||
        [i.name, i.location, i.place].some((f) =>
          (f || "").toLowerCase().includes(q),
        ),
    )
    .sort((a, b) =>
      newestFirst
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date),
    );

  return (
    <div dir="rtl" className="min-h-screen bg-base-200 px-4 py-6">
      <div className="mx-auto max-w-6xl space-y-5">
        {/* البانر */}
        <section className="relative overflow-hidden rounded-3xl bg-linear-to-l from-primary/20 via-base-100 to-base-100 shadow-sm">
          <div className="relative z-10 p-6 md:p-10 md:max-w-lg">
            <h1 className="text-2xl font-extrabold text-base-content md:text-4xl">
              ضايع منك حاجة في الجامعة؟
            </h1>
            <p className="mt-3 text-sm leading-7 text-base-content/70 md:text-base">
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
          <FiSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-xl text-base-content/70" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="دوّر على غرض (مثلًا: شنطة، نضارة، موبايل...)"
            className="w-full rounded-full border border-base-300 bg-base-100 py-4 pr-14 pl-4 text-sm text-base-content shadow-sm outline-none placeholder:text-base-content/50 focus:border-primary  "
          />
        </div>

        {/* الترتيب */}
        <button
          onClick={() => setNewestFirst((v) => !v)}
          className="flex items-center gap-2 rounded-full border border-base-300 bg-base-100 px-5 py-2 text-sm font-bold text-base-content shadow-sm">
          <MdSort className="text-lg" />
          ترتيب: {newestFirst ? "الأحدث" : "الأقدم"}
        </button>

        {/* الكروت */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
        {items.length === 0 && (
          <p className="py-10 text-center text-base-content/70">
            مفيش أغراض مطابقة للبحث.
          </p>
        )}
      </div>
    </div>
  );
}
