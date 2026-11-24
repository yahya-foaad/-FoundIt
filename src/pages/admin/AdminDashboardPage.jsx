import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Chip, Separator, Skeleton } from "@heroui/react";
import { CheckCircle2, Clock, PlusCircle, XCircle } from "lucide-react";
import StatsCards from "../../layout/adminpanal/StatsCards";
import { useAdminReports } from "../../context/adminReportsContext";

const DASHBOARD_CARDS = ["totalReports", "openReports"];

const STATUS_UI = {
  pending: {
    actionText: "أضاف بلاغاً جديداً عن العثور على",
    statusLabel: "بلاغ جديد",
    chipColor: "accent",
    Icon: PlusCircle,
    iconWrapperClass:
      "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400",
  },
  approved: {
    actionText: "تمت الموافقة على بلاغ",
    statusLabel: "تم الحل",
    chipColor: "success",
    Icon: CheckCircle2,
    iconWrapperClass:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400",
  },
  rejected: {
    actionText: "تم رفض بلاغ",
    statusLabel: "مرفوض",
    chipColor: "danger",
    Icon: XCircle,
    iconWrapperClass:
      "bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400",
  },
};

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { reports, stats, isLoading, error } = useAdminReports();

  // Derive the latest 5 activities from the shared reports context
  const activities = useMemo(() => {
    return (reports || []).slice(0, 5).map((report) => {
      const ui = STATUS_UI[report.status] || STATUS_UI.pending;

      return {
        id: report.id,
        user: report.finder || "مستخدم",
        action: `${ui.actionText} ${report.name}`,
        location: `${report.place}${report.spot ? ` - ${report.spot}` : ""}`,
        time: report.date,
        statusLabel: ui.statusLabel,
        chipColor: ui.chipColor,
        Icon: ui.Icon,
        iconWrapperClass: ui.iconWrapperClass,
      };
    });
  }, [reports]);

  const handleViewAll = () => {
    navigate("requests");
  };

  return (
    <main
      dir="rtl"
      lang="ar"
      className="min-h-screen space-y-6 bg-slate-50 p-4 font-['Cairo',sans-serif] sm:p-6 dark:bg-zinc-950"
    >
      <header className="text-start">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          لوحة تحكم المسؤول
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          نظرة عامة على بلاغات المفقودات والنشاط اليومي في الكلية
        </p>
      </header>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* بطاقات الإحصائيات */}
      <StatsCards
        cardKeys={DASHBOARD_CARDS}
        stats={stats}
        isLoading={isLoading}
        gridClassName="grid-cols-1 sm:grid-cols-2 lg:w-3/5 xl:w-1/2"
      />

      {/* قسم النشاط الأخير */}
      <section aria-label="النشاط الأخير" className="w-full">
        <Card className="rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <Card.Header className="flex flex-col gap-3 p-5 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-start">
              <Card.Title className="text-lg font-bold text-slate-900 dark:text-white">
                النشاط الأخير
              </Card.Title>
              <Card.Description className="mt-0.5 text-xs text-slate-600 sm:text-sm dark:text-slate-400">
                آخر التحديثات والبلاغات المسجلة في النظام
              </Card.Description>
            </div>

            <Button
              size="sm"
              variant="secondary"
              onPress={handleViewAll}
              className="w-full shrink-0 sm:w-auto"
            >
              عرض الكل
            </Button>
          </Card.Header>

          <Separator />

          <Card.Content className="p-5 pt-4">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((row) => (
                  <div
                    key={row}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="flex flex-1 items-center gap-3">
                      <Skeleton className="size-10 shrink-0 rounded-xl" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4 rounded-md" />
                        <Skeleton className="h-3 w-1/3 rounded-md" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                ))}
              </div>
            ) : activities.length === 0 ? (
              <p className="py-6 text-center text-sm text-slate-500">
                لا توجد أنشطة مسجلة حالياً
              </p>
            ) : (
              <div className="flex flex-col">
                {activities.map((item, index) => {
                  const { Icon } = item;

                  return (
                    <React.Fragment key={item.id}>
                      <div className="flex flex-col gap-3 py-3.5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                        <div className="flex min-w-0 items-start gap-3">
                          <div
                            className={`mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl sm:mt-0 ${item.iconWrapperClass}`}
                            aria-hidden="true"
                          >
                            <Icon className="size-5" />
                          </div>

                          <div className="min-w-0 flex-1 text-start">
                            <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-100">
                              <span className="font-bold text-slate-900 dark:text-white">
                                {item.user}
                              </span>{" "}
                              <span className="text-slate-400">—</span>{" "}
                              {item.action}
                            </p>

                            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                              <span>{item.location}</span>
                              <span aria-hidden="true">•</span>
                              <span className="inline-flex items-center gap-1">
                                <Clock
                                  className="size-3.5"
                                  aria-hidden="true"
                                />
                                {item.time}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center justify-end sm:justify-start">
                          <Chip
                            size="sm"
                            variant="soft"
                            color={item.chipColor}
                            className="font-semibold"
                          >
                            {item.statusLabel}
                          </Chip>
                        </div>
                      </div>

                      {index < activities.length - 1 && <Separator />}
                    </React.Fragment>
                  );
                })}
              </div>
            )}
          </Card.Content>
        </Card>
      </section>
    </main>
  );
};

export default AdminDashboardPage;