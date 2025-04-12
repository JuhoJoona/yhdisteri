import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CircleUserRound,
  Clock,
  UserCheck,
  UserX,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

type StatCardProps = {
  title: string;
  value: number | string;
  description?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
};

type MemberStats = {
  total: number;
  active: number;
  inactive: number;
  pending: number;
  newThisMonth: number;
  retention: number;
};

const StatCard = ({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  className = '',
}: StatCardProps) => {
  const trendIcon = () => {
    if (trend === 'up') return <TrendingUp className="h-3 w-3" />;
    if (trend === 'down') return <TrendingDown className="h-3 w-3" />;
    return <Minus className="h-3 w-3" />;
  };

  const trendColor = () => {
    if (trend === 'up')
      return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30';
    if (trend === 'down') return 'text-rose-500 bg-rose-50 dark:bg-rose-950/30';
    return 'text-slate-500 bg-slate-50 dark:bg-slate-800/30';
  };

  return (
    <Card
      className={cn(
        'overflow-hidden transition-all hover:shadow-md',
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-9 w-9 rounded-full bg-primary/10 p-2 text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        <div className="mt-2 flex items-center text-xs">
          {trendValue && (
            <span
              className={cn(
                'mr-2 flex items-center gap-1 rounded-full px-1.5 py-0.5',
                trendColor()
              )}
            >
              {trendIcon()}
              {trendValue}
            </span>
          )}
          {description && (
            <span className="text-muted-foreground">{description}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

type StatsGridProps = {
  stats: MemberStats;
  className?: string;
};

export const StatsGrid = ({ stats, className = '' }: StatsGridProps) => {
  const trends = useMemo(() => {
    const newMembersTrend: 'up' | 'down' | 'neutral' =
      stats.newThisMonth > 0 ? 'up' : 'neutral';
    const newMembersTrendValue =
      stats.newThisMonth > 0 ? `+${stats.newThisMonth}` : '0';

    const activeMembersTrend: 'up' | 'down' | 'neutral' =
      stats.retention > 90 ? 'up' : stats.retention < 80 ? 'down' : 'neutral';

    const activePercentage = Math.round(
      (stats.active / (stats.total || 1)) * 100
    );

    let activeTrendValue = '0%';
    if (stats.retention > 95) activeTrendValue = '+3%';
    else if (stats.retention > 90) activeTrendValue = '+1%';
    else if (stats.retention < 80) activeTrendValue = '-2%';

    // For inactive members, we can infer from active members trend (inverse relationship)
    const inactiveMembersTrend: 'up' | 'down' | 'neutral' =
      activeMembersTrend === 'up'
        ? 'down'
        : activeMembersTrend === 'down'
        ? 'up'
        : 'neutral';
    let inactiveTrendValue = '0%';
    if (activeMembersTrend === 'up') inactiveTrendValue = '-1%';
    else if (activeMembersTrend === 'down') inactiveTrendValue = '+2%';

    return {
      newMembersTrend,
      newMembersTrendValue,
      activeMembersTrend,
      activeTrendValue,
      inactiveMembersTrend,
      inactiveTrendValue,
      activePercentage,
      inactivePercentage: Math.round(
        (stats.inactive / (stats.total || 1)) * 100
      ),
    };
  }, [stats]);

  return (
    <div className={cn('grid gap-4 md:grid-cols-2 lg:grid-cols-4', className)}>
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
        description={`${trends.activePercentage}% of total`}
        icon={<UserCheck className="h-full w-full" />}
        trend={trends.activeMembersTrend}
        trendValue={trends.activeTrendValue}
      />
      <StatCard
        title="Inactive Members"
        value={stats.inactive}
        description={`${trends.inactivePercentage}% of total`}
        icon={<UserX className="h-full w-full" />}
        trend={trends.inactiveMembersTrend}
        trendValue={trends.inactiveTrendValue}
      />
      <StatCard
        title="New This Month"
        value={stats.newThisMonth}
        description="Members joined recently"
        icon={<Clock className="h-full w-full" />}
        trend={trends.newMembersTrend}
        trendValue={trends.newMembersTrendValue}
      />
    </div>
  );
};

type StatsCardProps = {
  stats: MemberStats;
  className?: string;
};

export const StatsCard = ({ stats, className = '' }: StatsCardProps) => {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Membership Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <StatsGrid stats={stats} />
      </CardContent>
    </Card>
  );
};

export default StatsCard;
