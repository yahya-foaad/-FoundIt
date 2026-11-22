import { Link } from "react-router-dom";
import { useState } from "react";
import { useItems } from "../../context/ItemContext.jsx";
const statusMap = {
  review: { label: "قيد المراجعة", className: "badge-warning" },
  approved: { label: "تمت الموافقة", className: "badge-success" },
  rejected: { label: "مرفوض", className: "badge-error" },
};

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("ar-EG-u-nu-latn", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
const MyReportsPage = () => {
  const { items } = useItems();
  // const [filter, setFilter] = useState("all");

   
  return (
    <div dir="rtl" className="max-w-5xl mx-auto px-4 py-6">
  <div className="overflow-x-auto rounded-box border border-base-200">
    <table className="table table-zebra">
      {/* head */}
      <thead>
        <tr>
          <th>الاسم</th>
          <th className="hidden sm:table-cell">مكان العثور</th>
          <th className="hidden lg:table-cell">تاريخ العثور</th>
          <th>الحالة</th>
          <th>الإجراءات</th>
        </tr>
      </thead>
      <tbody>
        {items.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center py-6 opacity-60">
              لا توجد بلاغات
            </td>
          </tr>
        ) : (
          items.map((item) => {
            const status = statusMap[item.status];
            return (
              <tr key={item.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-10 w-10 md:h-12 md:w-12">
                        <img src={item.image} alt={item.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                      <div className="text-xs opacity-60 sm:hidden">
                        {item.location} - {item.place}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="hidden sm:table-cell">
                  {item.location}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {item.place}
                  </span>
                </td>
                <td className="hidden lg:table-cell whitespace-nowrap">
                  {formatDate(item.date)}
                </td>
                <td>
                  <span
                    className={`badge ${status?.className} whitespace-nowrap`}
                  >
                    {status?.label}
                  </span>
                </td>
                <td>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/items/${item.id}`}
                      className="btn btn-ghost btn-xs"
                    >
                      التفاصيل
                    </Link>
                    <Link
                      to={`/report/edit/${item.id}`}
                      className="btn btn-outline btn-xs"
                    >
                      تعديل
                    </Link>
                    <button
                      className="btn btn-error btn-outline btn-xs"
                      onClick={() =>
                        document.getElementById("delete_modal").showModal()
                      }
                    >
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  </div>

  {/* delete confirmation modal (one for the whole page) */}
  <dialog id="delete_modal" className="modal">
    <div className="modal-box">
      <h3 className="font-bold text-lg">حذف البلاغ</h3>
      <p className="py-4">هل أنت متأكد من حذف هذا البلاغ؟</p>
      <div className="modal-action">
        <form method="dialog" className="flex gap-2">
          <button className="btn">إلغاء</button>
          <button className="btn btn-error text-white">حذف</button>
        </form>
      </div>
    </div>
    <form method="dialog" className="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</div>
  );
};

export default MyReportsPage;
