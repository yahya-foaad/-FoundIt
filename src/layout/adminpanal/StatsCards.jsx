import { useMemo } from "react";
import { Card, Skeleton } from "@heroui/react";
import { ClipboardList, Search, Users } from "lucide-react";

const DEFAULT_STATS = {
  totalReports: 0,
  openReports: 0,
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
    title: "بلاغات قيد الانتظار",
    iconLabel: "أيقونة البلاغات المفتوحة",
    Icon: Search,
    iconWrapperClass:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400",
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

export default function StatsCards({
  stats,
  cardKeys, // e.g. ["totalUsers"]; leave undefined to show all cards
  gridClassName = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  isLoading = false,
}) {
  const visibleConfig = useMemo(
    () => CARDS_CONFIG.filter((c) => !cardKeys || cardKeys.includes(c.key)),
    [cardKeys]
  );

  const cardsData = useMemo(() => {
    const safeStats = { ...DEFAULT_STATS, ...(stats || {}) };

    return visibleConfig.map((config) => {
      const rawValue = Number(safeStats[config.key] ?? 0);

      return {
        ...config,
        formattedValue: Number.isFinite(rawValue)
          ? rawValue.toLocaleString("ar-EG")
          : (0).toLocaleString("ar-EG"),
      };
    });
  }, [stats, visibleConfig]);

  return (
    <section aria-label="إحصائيات لوحة التحكم" className="w-full">
      <div className={`grid gap-4 ${gridClassName}`}>
        {isLoading
          ? visibleConfig.map((item) => (
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
                </Card.Content>
              </Card>
            ))
          : cardsData.map((card) => {
              const { Icon } = card;

              return (
                <Card
                  key={card.key}
                  className="h-full rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <Card.Content className="flex h-full flex-col justify-between p-5">
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
                  </Card.Content>
                </Card>
              );
            })}
      </div>
    </section>
  );
}