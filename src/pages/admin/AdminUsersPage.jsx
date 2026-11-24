import React from "react";
import users from "../../data/users.js";
import StatsCards from "../../layout/adminpanal/StatsCards.jsx";

const STATS_CARD = ["totalUsers"];

const AdminUsersPage = () => {
  const stats = {
    totalUsers: users.length,
  };

  //     const fetchUsers = async () => {
  //       try {
  //         setIsLoading(true);
  //         setError(null);

  //         const res = await fetch("/api/users", {
  //           signal: controller.signal,
  //         });
  //         if (!res.ok) throw new Error("فشل تحميل بيانات المستخدمين");

  //         const data = await res.json();
  //         setUsers(Array.isArray(data) ? data : data.users || []);
  //       } catch (err) {
  //         if (err.name !== "AbortError") {
  //           setError(err.message);
  //         }
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  // useEffect(() => {
  //
  //     fetchUsers();
  //     return () => controller.abort();
  //   }, []);

  //   const stats = {
  //     totalUsers: users.length,
  //   };

  return (
    <main
      dir="rtl"
      lang="ar"
      data-theme="light"
      className="min-h-screen space-y-6 bg-slate-50 p-4 font-['Cairo',sans-serif] sm:p-6"
    >
      <header className="text-start">
        <h1 className="text-2xl font-bold text-slate-900">إدارة المستخدمين</h1>
        <p className="mt-1 text-sm text-slate-600">
          عرض بيانات المستخدمين المسجلين وحالة طلباتهم
        </p>
      </header>

      <StatsCards
        cardKeys={STATS_CARD}
        stats={stats}
        gridClassName="grid-cols-1 sm:w-1/2 lg:w-1/4"
      />

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="table table-zebra w-full border-collapse">
          <thead className="border-b border-slate-200 bg-slate-100/80 text-slate-700">
            <tr>
              <th className="border-e border-slate-200">الاسم</th>
              <th className="border-e border-slate-200">البريد الإلكتروني</th>
              <th className="border-e border-slate-200">الهاتف</th>
              <th className="border-e border-slate-200">عدد الطلبات</th>
              <th>طلبات تحت المراجعة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 text-center opacity-60">
                  لا يوجد مستخدمون
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="border-e border-slate-200 font-bold whitespace-nowrap">
                    {user.name}
                  </td>
                  <td
                    dir="ltr"
                    className="border-e border-slate-200 text-right"
                  >
                    {user.email}
                  </td>
                  <td
                    dir="ltr"
                    className="border-e border-slate-200 text-right whitespace-nowrap"
                  >
                    {user.phone}
                  </td>
                  <td className="border-e border-slate-200">
                    {user.ordersCount}
                  </td>
                  <td>
                    <span
                      className={`badge whitespace-nowrap ${
                        user.pendingCount > 0 ? "badge-warning" : "badge-ghost"
                      }`}
                    >
                      {user.pendingCount}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AdminUsersPage;
