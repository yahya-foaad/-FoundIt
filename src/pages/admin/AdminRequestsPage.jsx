const reports = [
  {
    id: 1,
    name: "محفظة جلدية بنية",
    place: "المكتبة المركزية",
    spot: "الطابق الثاني",
    date: "12 أكتوبر 2026",
    status: "pending",
    img: "https://img.daisyui.com/images/profile/demo/2@94.webp",
  },
  {
    id: 2,
    name: "هاتف آيفون 14 أزرق",
    place: "كافتيريا كلية الهندسة",
    spot: "طاولة رقم 4",
    date: "10 أكتوبر 2026",
    status: "approved",
    img: "https://img.daisyui.com/images/profile/demo/3@94.webp",
  },
  {
    id: 3,
    name: "حقيبة ظهر سوداء",
    place: "قاعة المحاضرات B2",
    spot: "المقعد الأخير",
    date: "09 أكتوبر 2026",
    status: "rejected",
    img: "https://img.daisyui.com/images/profile/demo/4@94.webp",
  },
  {
    id: 4,
    name: "ساعة يد فضية",
    place: "صالة الألعاب الرياضية",
    spot: "غرفة تغيير الملابس",
    date: "07 أكتوبر 2026",
    status: "pending",
    img: "https://img.daisyui.com/images/profile/demo/5@94.webp",
  },
];

const STATUS = {
  pending: { label: "قيد المراجعة", className: "badge-warning" },
  approved: { label: "تمت الموافقة", className: "badge-success" },
  rejected: { label: "مرفوض", className: "badge-error" },
};

function StatusBadge({ status }) {
  const { label, className } = STATUS[status];
  return <span className={`badge whitespace-nowrap ${className}`}>{label}</span>;
}

function ItemInfo({ report }) {
  return (
    <div className="flex items-center gap-3">
      <div className="avatar">
        <div className="mask mask-squircle h-12 w-12">
          <img src={report.img} alt={report.name} />
        </div>
      </div>
      <div className="font-bold">{report.name}</div>
    </div>
  );
}

function Actions({ report, className = "" }) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <button className="btn btn-ghost btn-xs md:btn-sm">التفاصيل</button>
      <button
        className="btn btn-success btn-xs md:btn-sm text-white"
        disabled={report.status === "approved"}
      >
        موافقة
      </button>
      <button
        className="btn btn-error btn-xs md:btn-sm text-white"
        disabled={report.status === "rejected"}
      >
        رفض
      </button>
    </div>
  );
}

export default function ReportsTable() {
  return (
    <div dir="rtl">
      {/* Mobile: cards */}
      <div className="grid gap-4 md:hidden">
        {reports.map((report) => (
          <div
            key={report.id}
            className="card bg-base-100 shadow-sm border border-base-200"
          >
            <div className="card-body p-4 gap-3">
              <div className="flex items-start justify-between gap-2">
                <ItemInfo report={report} />
                <StatusBadge status={report.status} />
              </div>

              <div className="text-sm space-y-1">
                <p>
                  <span className="opacity-60">المكان: </span>
                  {report.place}
                  <span className="badge badge-ghost badge-sm mr-2">
                    {report.spot}
                  </span>
                </p>
                <p>
                  <span className="opacity-60">التاريخ: </span>
                  {report.date}
                </p>
              </div>

              <div className="card-actions">
                <Actions report={report} className="w-full [&>button]:flex-1" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tablet / desktop: table */}
      <div className="hidden md:block overflow-x-auto rounded-box border border-base-200">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>الاسم</th>
              <th>مكان العثور</th>
              <th className="hidden lg:table-cell">تاريخ العثور</th>
              <th>الحالة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>
                  <ItemInfo report={report} />
                </td>
                <td>
                  {report.place}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {report.spot}
                  </span>
                </td>
                <td className="hidden lg:table-cell whitespace-nowrap">
                  {report.date}
                </td>
                <td>
                  <StatusBadge status={report.status} />
                </td>
                <td>
                  <Actions report={report} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}