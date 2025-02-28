
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CircleUserRound, Clock, UserCheck, UserX } from "lucide-react";
import { MemberStats } from "@/types/member";

type StatCardProps = {
  title: string;
  value: number | string;
  description?: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
};

const StatCard = ({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  className = "",
}: StatCardProps) => {
  const trendColor = useMemo(() => {
    if (trend === "up") return "text-green-500";
    if (trend === "down") return "text-red-500";
    return "text-gray-500";
  }, [trend]);

  return (
    <Card className={`overflow-hidden ${className} animate-fadeIn`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-md bg-primary/10 p-1.5 text-primary">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-sm text-muted-foreground">
          {trendValue && (
            <span className={`mr-1 ${trendColor}`}>{trendValue}</span>
          )}
          {description && <span>{description}</span>}
        </div>
      </CardContent>
    </Card>
  );
};

type StatsGridProps = {
  stats: MemberStats;
  className?: string;
};

export const StatsGrid = ({ stats, className = "" }: StatsGridProps) => {
  return (
    <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-4 ${className}`}>
      <StatCard
        title="Total Members"
        value={stats.total}
        description="Total registered members"
        icon={<CircleUserRound className="h-full w-full" />}
        trend="neutral"
      />
      <StatCard
        title="Active Members"
        value={stats.active}
        description={`${Math.round((stats.active / stats.total) * 100)}% of total`}
        icon={<UserCheck className="h-full w-full" />}
        trend="up"
        trendValue="+3%"
      />
      <StatCard
        title="Inactive Members"
        value={stats.inactive}
        description={`${Math.round((stats.inactive / stats.total) * 100)}% of total`}
        icon={<UserX className="h-full w-full" />}
        trend="down"
        trendValue="-2%"
      />
      <StatCard
        title="New This Month"
        value={stats.newThisMonth}
        description="Members joined recently"
        icon={<Clock className="h-full w-full" />}
        trend="up"
        trendValue="+7"
      />
    </div>
  );
};

type StatsCardProps = {
  stats: MemberStats;
  className?: string;
};

export const StatsCard = ({ stats, className = "" }: StatsCardProps) => {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader>
        <CardTitle className="text-xl">Membership Overview</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <StatsGrid stats={stats} />
      </CardContent>
    </Card>
  );
};

export default StatsCard;
