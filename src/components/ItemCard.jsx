import { Link } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";

export default function ItemCard({ item }) {
  return (
    <Link
      to={`/items/${item.id}`}
      className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <img
        src={item.image}
        alt={item.name}
        className="h-24 w-24 shrink-0 rounded-xl object-cover"
      />

      <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
        <span className="rounded-full bg-green-600 px-3 py-0.5 text-xs font-bold text-white">
          معثور عليه
        </span>

        <h3 className="w-full truncate text-base font-extrabold text-[#0b1f4b]">
          {item.name}
        </h3>

        <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
          <FiCalendar className="text-blue-600" />
          {item.date}
        </p>
      </div>
    </Link>
  );
}
