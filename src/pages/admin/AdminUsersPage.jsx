import React from 'react'
import users from "../../data/users.js"
const AdminUsersPage = () => {
  return (
    <div dir="rtl" data-theme="light">
      <div className="overflow-x-auto rounded-box border border-base-200">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>الاسم</th>
              <th>البريد الإلكتروني</th>
              <th>الهاتف</th>
              <th>عدد الطلبات</th>
              <th>طلبات تحت المراجعة</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 opacity-60">
                  لا يوجد مستخدمون
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="font-bold whitespace-nowrap">{user.name}</td>
                  <td dir="ltr" className="text-right">
                    {user.email}
                  </td>
                  <td dir="ltr" className="text-right whitespace-nowrap">
                    {user.phone}
                  </td>
                  <td>{user.ordersCount}</td>
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
    </div>
  );
};

export default AdminUsersPage;


