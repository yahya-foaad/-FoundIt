import { Link } from "react-router-dom";
import { useState } from "react";
const MyReportsPage = () => {
  const [filter, setFilter] = useState("all");
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
            {/* row 1 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-10 w-10 md:h-12 md:w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">محفظة جلدية بنية</div>
                    <div className="text-xs opacity-60 sm:hidden">
                      المكتبة المركزية - الطابق الثاني
                    </div>
                  </div>
                </div>
              </td>
              <td className="hidden sm:table-cell">
                المكتبة المركزية
                <br />
                <span className="badge badge-ghost badge-sm">
                  الطابق الثاني
                </span>
              </td>
              <td className="hidden lg:table-cell whitespace-nowrap">
                12 أكتوبر 2026
              </td>
              <td>
                <span className="badge badge-warning whitespace-nowrap">
                  قيد المراجعة
                </span>
              </td>
              <td>
                <div className="flex flex-wrap gap-2">
                  <Link to="/items/1" className="btn btn-ghost btn-xs">
                    التفاصيل
                  </Link>
                  <Link to="/report/edit/1" className="btn btn-outline btn-xs">
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

            {/* row 2 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-10 w-10 md:h-12 md:w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                        alt="Avatar"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">هاتف آيفون 14 أزرق</div>
                    <div className="text-xs opacity-60 sm:hidden">
                      كافتيريا كلية الهندسة - طاولة رقم 4
                    </div>
                  </div>
                </div>
              </td>
              <td className="hidden sm:table-cell">
                كافتيريا كلية الهندسة
                <br />
                <span className="badge badge-ghost badge-sm">طاولة رقم 4</span>
              </td>
              <td className="hidden lg:table-cell whitespace-nowrap">
                10 أكتوبر 2026
              </td>
              <td>
                <span className="badge badge-success whitespace-nowrap">
                  تمت الموافقة
                </span>
              </td>
              <td>
                <div className="flex flex-wrap gap-2">
                  <Link to="/items/2" className="btn btn-ghost btn-xs">
                    التفاصيل
                  </Link>
                  <Link to="/report/edit/2" className="btn btn-outline btn-xs">
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

            {/* row 3 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-10 w-10 md:h-12 md:w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/4@94.webp"
                        alt="Avatar"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">حقيبة ظهر سوداء</div>
                    <div className="text-xs opacity-60 sm:hidden">
                      قاعة المحاضرات B2 - المقعد الأخير
                    </div>
                  </div>
                </div>
              </td>
              <td className="hidden sm:table-cell">
                قاعة المحاضرات B2
                <br />
                <span className="badge badge-ghost badge-sm">
                  المقعد الأخير
                </span>
              </td>
              <td className="hidden lg:table-cell whitespace-nowrap">
                09 أكتوبر 2026
              </td>
              <td>
                <span className="badge badge-error whitespace-nowrap">
                  مرفوض
                </span>
              </td>
              <td>
                <div className="flex flex-wrap gap-2">
                  <Link to="/items/3" className="btn btn-ghost btn-xs">
                    التفاصيل
                  </Link>
                  <Link to="/report/edit/3" className="btn btn-outline btn-xs">
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

            {/* row 4 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-10 w-10 md:h-12 md:w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                        alt="Avatar"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">ساعة يد فضية</div>
                    <div className="text-xs opacity-60 sm:hidden">
                      صالة الألعاب الرياضية - غرفة تغيير الملابس
                    </div>
                  </div>
                </div>
              </td>
              <td className="hidden sm:table-cell">
                صالة الألعاب الرياضية
                <br />
                <span className="badge badge-ghost badge-sm">
                  غرفة تغيير الملابس
                </span>
              </td>
              <td className="hidden lg:table-cell whitespace-nowrap">
                07 أكتوبر 2026
              </td>
              <td>
                <span className="badge badge-warning whitespace-nowrap">
                  قيد المراجعة
                </span>
              </td>
              <td>
                <div className="flex flex-wrap gap-2">
                  <Link to="/items/4" className="btn btn-ghost btn-xs">
                    التفاصيل
                  </Link>
                  <Link to="/report/edit/4" className="btn btn-outline btn-xs">
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
