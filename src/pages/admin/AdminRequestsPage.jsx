import React from "react";
import { useAdminReports } from "../../context/adminReportsContext.jsx"; 

const STATUS = {
  pending: { label: "قيد المراجعة", className: "badge-warning" },
  approved: { label: "تمت الموافقة", className: "badge-success" },
  rejected: { label: "مرفوض", className: "badge-error" },
};

const StatusBadge = ({ status }) => {
  const { label, className } = STATUS[status] || STATUS.pending;
  return (
    <span className={`badge whitespace-nowrap ${className}`}>{label}</span>
  );
};

const ItemInfo = ({ report }) => (
  <div className="flex items-center gap-3">
    <div className="avatar">
      <div className="mask mask-squircle h-12 w-12">
        <img src={report.img} alt={report.name} />
      </div>
    </div>
    <div className="font-bold">{report.name}</div>
  </div>
);

const Actions = ({ report, onStatusChange, className = "" }) => (
  <div className={`flex gap-2 ${className}`}>
    <button className="btn btn-ghost btn-xs md:btn-sm">التفاصيل</button>
    <button
      onClick={() => onStatusChange(report.id, "approved")}
      className="btn btn-success btn-xs md:btn-sm text-white"
      disabled={report.status === "approved"}
    >
      موافقة
    </button>
    <button
      onClick={() => onStatusChange(report.id, "rejected")}
      className="btn btn-error btn-xs md:btn-sm text-white"
      disabled={report.status === "rejected"}
    >
      رفض
    </button>
  </div>
);

const ReportsTable = () => {
  // 1. Call the hook at the top of the component
  const { reports, setReports, isLoading, error } = useAdminReports();

  // 2. Use setReports when clicking موافقة or رفض (updates Dashboard stats automatically)
  const handleStatusChange = (id, newStatus) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === id ? { ...report, status: newStatus } : report
      )
    );
  };


  

  return (
    <main
      dir="rtl"
      lang="ar"
      data-theme="light"
      className="min-h-screen space-y-6 bg-slate-50 p-4 font-['Cairo',sans-serif] sm:p-6"
    >
      <header className="text-start">
        <h1 className="text-2xl font-bold text-slate-900">إدارة البلاغات</h1>
        <p className="mt-1 text-sm text-slate-600">
          مراجعة طلبات نشر المعثورات واتخاذ الإجراءات المناسبة
        </p>
      </header>

      {/* 3. Show error or loading states from Context */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : (
        <>
          {/* Mobile: cards */}
          <div className="grid gap-4 md:hidden">
            {reports.length === 0 ? (
              <p className="rounded-2xl border border-slate-200 bg-white py-8 text-center text-sm text-slate-500">
                لا توجد بلاغات حالياً
              </p>
            ) : (
              reports.map((report) => (
                <div
                  key={report.id}
                  className="card border border-slate-200 bg-white shadow-sm"
                >
                  <div className="card-body gap-3 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <ItemInfo report={report} />
                      <StatusBadge status={report.status} />
                    </div>

                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="opacity-60">العاثر: </span>
                        <span className="font-medium">{report.finder}</span>
                      </p>
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
                      <Actions
                        report={report}
                        onStatusChange={handleStatusChange}
                        className="w-full [&>button]:flex-1"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Tablet / desktop: table */}
          <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
            <table className="table table-zebra w-full border-collapse">
              <thead className="border-b border-slate-200 bg-slate-100/80 text-slate-700">
                <tr>
                  <th className="border-e border-slate-200">الاسم</th>
                  <th className="border-e border-slate-200">العاثر</th>
                  <th className="border-e border-slate-200">مكان العثور</th>
                  <th className="hidden border-e border-slate-200 lg:table-cell">
                    تاريخ العثور
                  </th>
                  <th className="border-e border-slate-200">الحالة</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {reports.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center opacity-60">
                      لا توجد بلاغات حالياً
                    </td>
                  </tr>
                ) : (
                  reports.map((report) => (
                    <tr key={report.id} className="hover:bg-slate-50">
                      <td className="border-e border-slate-200">
                        <ItemInfo report={report} />
                      </td>
                      <td className="border-e border-slate-200 font-medium whitespace-nowrap">
                        {report.finder}
                      </td>
                      <td className="border-e border-slate-200">
                        {report.place}
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          {report.spot}
                        </span>
                      </td>
                      <td className="hidden border-e border-slate-200 whitespace-nowrap lg:table-cell">
                        {report.date}
                      </td>
                      <td className="border-e border-slate-200">
                        <StatusBadge status={report.status} />
                      </td>
                      <td>
                        <Actions
                          report={report}
                          onStatusChange={handleStatusChange}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
};

export default ReportsTable;