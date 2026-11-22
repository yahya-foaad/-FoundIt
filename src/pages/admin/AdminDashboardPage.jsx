import React, { useMemo } from "react";
import { Button, Card, Chip, Separator, Skeleton } from "@heroui/react";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  ClipboardList,
  Clock,
  PlusCircle,
  Search,
  Sparkles,
  Users,
} from "lucide-react";

const DEFAULT_STATS = {
  totalReports: 0,
  openReports: 0,
  resolved: 0,
  totalUsers: 0,
};

const DEFAULT_TRENDS = {
  totalReports: 0,
  openReports: 0,
  resolved: 0,
  totalUsers: 0,
};

const CARDS_CONFIG = [
  {
    key: "totalReports",
    title: "إجمالي البلاغات",
    iconLabel: "أيقونة إجمالي البلاغات",
    Icon: ClipboardList,
    iconWrapperClass:
      "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400",
  },
  {
    key: "openReports",
    title: "بلاغات مفتوحة",
    iconLabel: "أيقونة البلاغات المفتوحة",
    Icon: Search,
    iconWrapperClass:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400",
  },
  {
    key: "resolved",
    title: "تم الحل",
    iconLabel: "أيقونة البلاغات المحلولة",
    Icon: CheckCircle2,
    iconWrapperClass:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400",
  },
  {
    key: "totalUsers",
    title: "المستخدمين",
    iconLabel: "أيقونة إجمالي المستخدمين",
    Icon: Users,
    iconWrapperClass:
      "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400",
  },
];

const DEFAULT_ACTIVITIES = [
  {
    id: "act-1",
    user: "أحمد محمود",
    action: "تم تسليم حقيبة لابتوب سوداء إلى صاحبها بعد التحقق",
    location: "مبنى كلية الحاسبات - الدور الثاني",
    time: "منذ ٥ دقائق",
    statusLabel: "تم الحل",
    chipColor: "success",
    Icon: CheckCircle2,
    iconWrapperClass:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400",
  },
  {
    id: "act-2",
    user: "سارة خالد",
    action: "أضافت بلاغاً جديداً عن العثور على كارنيه جامعي ومفاتيح",
    location: "المكتبة المركزية",
    time: "منذ ٢٢ دقيقة",
    statusLabel: "بلاغ جديد",
    chipColor: "accent",
    Icon: PlusCircle,
    iconWrapperClass:
      "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400",
  },
  {
    id: "act-3",
    user: "نظام المطابقة",
    action: "تم رصد تطابق محتمل بين بلاغ سماعة لاسلكية وبلاغ مفقودات",
    location: "كافتيريا الحرم الجامعي",
    time: "منذ ساعة",
    statusLabel: "قيد المراجعة",
    chipColor: "warning",
    Icon: Sparkles,
    iconWrapperClass:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400",
  },
  {
    id: "act-4",
    user: "عمر طارق",
    action: "أرسل طلب استلام لهاتف محمول ويحتاج إلى مراجعة المشرف",
    location: "مدرج ١ - مبنى الهندسة",
    time: "منذ ٣ ساعات",
    statusLabel: "يحتاج إجراء",
    chipColor: "danger",
    Icon: AlertCircle,
    iconWrapperClass:
      "bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400",
  },
];

function StatsCards({ stats, trends, isLoading = false }) {
  const cardsData = useMemo(() => {
    const safeStats = { ...DEFAULT_STATS, ...(stats || {}) };
    const safeTrends = { ...DEFAULT_TRENDS, ...(trends || {}) };

    return CARDS_CONFIG.map((config) => {
      const rawValue = Number(safeStats[config.key] ?? 0);
      const rawTrend = Number(safeTrends[config.key] ?? 0);

      return {
        ...config,
        formattedValue: Number.isFinite(rawValue)
          ? rawValue.toLocaleString("ar-EG")
          : (0).toLocaleString("ar-EG"),
        trendValue: Number.isFinite(rawTrend) ? rawTrend : 0,
      };
    });
  }, [stats, trends]);

  return (
    <section aria-label="إحصائيات لوحة التحكم" className="w-full">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? CARDS_CONFIG.map((item) => (
              <Card
                key={item.key}
                className="h-full rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <Card.Content className="flex h-full flex-col justify-between p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1 space-y-3 text-start">
                      <Skeleton className="h-4 w-24 rounded-md" />
                      <Skeleton className="h-8 w-20 rounded-lg" />
                    </div>
                    <Skeleton className="size-12 shrink-0 rounded-xl" />
                  </div>
                  <div className="mt-4 flex items-center justify-start">
                    <Skeleton className="h-6 w-28 rounded-full" />
                  </div>
                </Card.Content>
              </Card>
            ))
          : cardsData.map((card) => {
              const { Icon } = card;
              const isPositive = card.trendValue >= 0;
              const formattedTrend = Math.abs(card.trendValue).toLocaleString(
                "ar-EG"
              );

              return (
                <Card
                  key={card.key}
                  className="h-full rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <Card.Content className="flex h-full flex-col justify-between p-5">
                    {/* الصف العلوي: العنوان والرقم في البداية (يمين) والأيقونة في النهاية (يسار) */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1 text-start">
                        <p className="truncate text-sm font-medium text-slate-600 dark:text-slate-400">
                          {card.title}
                        </p>
                        <p className="mt-1.5 truncate text-2xl font-bold tracking-tight text-slate-900 tabular-nums sm:text-3xl dark:text-white">
                          {card.formattedValue}
                        </p>
                      </div>

                      <div
                        role="img"
                        aria-label={card.iconLabel}
                        className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${card.iconWrapperClass}`}
                      >
                        <Icon className="size-6" aria-hidden="true" />
                      </div>
                    </div>

                    {/* الصف السفلي: شارة التغيير الأسبوعي */}
                    <div className="mt-4 flex items-center justify-start">
                      <Chip
                        size="sm"
                        variant="soft"
                        color={isPositive ? "success" : "danger"}
                        className="h-6 px-2.5 text-xs font-semibold"
                      >
                        <span className="inline-flex items-center gap-1">
                          {isPositive ? (
                            <ArrowUp
                              className="size-3.5 shrink-0"
                              aria-hidden="true"
                            />
                          ) : (
                            <ArrowDown
                              className="size-3.5 shrink-0"
                              aria-hidden="true"
                            />
                          )}
                          <span dir="ltr" className="tabular-nums">
                            {isPositive ? "+" : "-"}
                            {formattedTrend}%
                          </span>
                          <span>هذا الأسبوع</span>
                        </span>
                      </Chip>
                    </div>
                  </Card.Content>
                </Card>
              );
            })}
      </div>
    </section>
  );
}

function RecentActivitySection({
  activities = DEFAULT_ACTIVITIES,
  isLoading = false,
  onViewAll,
}) {
  return (
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
            onPress={onViewAll}
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
          ) : (
            <div className="flex flex-col">
              {activities.map((item, index) => {
                const { Icon } = item;

                return (
                  <React.Fragment key={item.id}>
                    <div className="flex flex-col gap-3 py-3.5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                      {/* الأيقونة وتفاصيل النشاط */}
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
                              <Clock className="size-3.5" aria-hidden="true" />
                              {item.time}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* شارة الحالة */}
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
  );
}

export default function AdminDashboardPage() {
  // استبدل هذه البيانات التجريبية ببيانات الـ API الخاصة بمشروع FoundIt
  const stats = {
    totalReports: 1248,
    openReports: 86,
    resolved: 1162,
    totalUsers: 3420,
  };

  const trends = {
    totalReports: 12,
    openReports: -5,
    resolved: 18,
    totalUsers: 9,
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

      {/* بطاقات الإحصائيات الأربع */}
      <StatsCards stats={stats} trends={trends} isLoading={false} />

      {/* قسم النشاط الأخير */}
      <RecentActivitySection
        activities={DEFAULT_ACTIVITIES}
        isLoading={false}
        onViewAll={() => {
          // انتقل إلى صفحة سجل الأنشطة الكامل
        }}
      />
    </main>
  );
}