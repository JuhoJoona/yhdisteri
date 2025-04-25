'use client';

import { useState, useEffect } from 'react';
import { OrganizationMember } from '@/lib/types/member';
import { Button } from '@/components/ui/button';
import {
  Users,
  Download,
  Search,
  Filter,
  X,
  ChevronDown,
  RefreshCw,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MemberCard } from '@/components/MemberCard';
import { useTranslations } from 'next-intl';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const MembersTable = ({
  members,
  searchQuery = '',
  statusFilter = 'all',
  organizationId,
  locale,
}: {
  members: OrganizationMember[];
  searchQuery?: string;
  statusFilter?: string;
  organizationId: string | undefined;
  locale: string;
}) => {
  const t = useTranslations('Member');

  // State for client-side filtering
  const [filterStatus, setFilterStatus] = useState(statusFilter);
  const [search, setSearch] = useState(searchQuery);
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filteredMembers, setFilteredMembers] = useState<OrganizationMember[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  // Count members by status
  const activeMembersCount = members.filter(
    (m) => m.status === 'active'
  ).length;
  const inactiveMembersCount = members.filter(
    (m) => m.status === 'inactive'
  ).length;
  const pendingMembersCount = members.filter(
    (m) => m.status === 'pending'
  ).length;

  // Filter and sort members when dependencies change
  useEffect(() => {
    setIsLoading(true);

    // Simulate loading delay
    const timer = setTimeout(() => {
      const filtered = filterMembers(members, search, filterStatus);
      const sorted = sortMembers(filtered, sortBy, sortDirection);
      setFilteredMembers(sorted);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [members, search, filterStatus, sortBy, sortDirection]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Already handled by state changes
  };

  const resetFilters = () => {
    setSearch('');
    setFilterStatus('all');
    setSortBy('name');
    setSortDirection('asc');
  };

  const handleTabChange = (value: string) => {
    setFilterStatus(value);
  };

  const convertToCSV = (members: OrganizationMember[]): string => {
    const headers = ['First Name', 'Last Name', 'Email', 'Status', 'Join Date'];
    const rows = members.map((member) => [
      member.firstName || '',
      member.lastName || '',
      member.email || '',
      member.status || '',
      member.joinDate || '',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    return csvContent;
  };

  // Function to trigger download
  const handleExportMembers = () => {
    const csvContent = convertToCSV(members);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `members-export-${new Date().toISOString().split('T')[0]}.csv`
    );
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg border border-primary/20">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight flex items-center text-primary">
            <Users className="mr-2 h-6 w-6" />
            {t('members')}
            <Badge
              variant="outline"
              className="ml-2 bg-primary/10 text-primary"
            >
              {members.length}
            </Badge>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {t('manageYourOrganizationMembers')}
          </p>
        </div>

        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="self-start sm:self-auto"
                  onClick={handleExportMembers}
                >
                  <Download className="mr-2 h-4 w-4" />
                  {t('exportMembers')}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('exportMembersDescription')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Filters section */}
      <Card className="border border-muted">
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t('search')}
                  className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                {search && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                    onClick={() => setSearch('')}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">{t('clearSearch')}</span>
                  </Button>
                )}
              </div>

              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex gap-2 min-w-40"
                    >
                      <Filter className="h-4 w-4" />
                      {t('sort')}: {t(sortBy)}
                      <ChevronDown className="h-4 w-4 ml-auto" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>{t('sortBy')}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => setSortBy('name')}>
                        {sortBy === 'name' && (
                          <span className="text-primary mr-2">✓</span>
                        )}
                        {t('name')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy('joinDate')}>
                        {sortBy === 'joinDate' && (
                          <span className="text-primary mr-2">✓</span>
                        )}
                        {t('joinDate')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy('status')}>
                        {sortBy === 'status' && (
                          <span className="text-primary mr-2">✓</span>
                        )}
                        {t('status')}
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>{t('direction')}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => setSortDirection('asc')}>
                        {sortDirection === 'asc' && (
                          <span className="text-primary mr-2">✓</span>
                        )}
                        {t('ascending')}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setSortDirection('desc')}
                      >
                        {sortDirection === 'desc' && (
                          <span className="text-primary mr-2">✓</span>
                        )}
                        {t('descending')}
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="flex gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  {t('reset')}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Tabs for status filtering */}
      <Tabs
        value={filterStatus}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="mb-4 w-full grid grid-cols-4 h-auto p-1">
          <TabsTrigger value="all" className="py-2">
            {t('all')}
            <Badge variant="secondary" className="ml-2">
              {members.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="active" className="py-2">
            {t('active')}
            <Badge
              variant="secondary"
              className="ml-2 bg-green-100 text-green-800"
            >
              {activeMembersCount}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="inactive" className="py-2">
            {t('inactive')}
            <Badge variant="secondary" className="ml-2 bg-red-100 text-red-800">
              {inactiveMembersCount}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="pending" className="py-2">
            {t('pending')}
            <Badge
              variant="secondary"
              className="ml-2 bg-yellow-100 text-yellow-800"
            >
              {pendingMembersCount}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <MembersGrid
            members={filteredMembers}
            organizationId={organizationId || ''}
            locale={locale}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="active" className="mt-0">
          <MembersGrid
            members={filteredMembers}
            organizationId={organizationId || ''}
            locale={locale}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="inactive" className="mt-0">
          <MembersGrid
            members={filteredMembers}
            organizationId={organizationId || ''}
            locale={locale}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="pending" className="mt-0">
          <MembersGrid
            members={filteredMembers}
            organizationId={organizationId || ''}
            locale={locale}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

function filterMembers(
  members: OrganizationMember[],
  query: string,
  status: string
): OrganizationMember[] {
  let result = [...members];

  // Apply search query filtering
  if (query) {
    const lowerCaseQuery = query.toLowerCase().trim();
    result = result.filter(
      (member) =>
        member.firstName?.toLowerCase().includes(lowerCaseQuery) ||
        member.lastName?.toLowerCase().includes(lowerCaseQuery) ||
        member.email?.toLowerCase().includes(lowerCaseQuery) ||
        `${member.firstName} ${member.lastName}`
          .toLowerCase()
          .includes(lowerCaseQuery)
    );
  }

  // Apply status filtering
  if (status !== 'all') {
    result = result.filter((member) => member.status === status);
  }

  return result;
}

function sortMembers(
  members: OrganizationMember[],
  sortBy: string,
  direction: string
): OrganizationMember[] {
  return [...members].sort((a, b) => {
    let compareA, compareB;

    switch (sortBy) {
      case 'name':
        compareA = `${a.firstName || ''} ${a.lastName || ''}`.toLowerCase();
        compareB = `${b.firstName || ''} ${b.lastName || ''}`.toLowerCase();
        break;
      case 'joinDate':
        compareA = new Date(a.joinDate || '').getTime();
        compareB = new Date(b.joinDate || '').getTime();
        break;
      case 'status':
        compareA = a.status || '';
        compareB = b.status || '';
        break;
      default:
        return 0;
    }

    if (direction === 'asc') {
      return compareA > compareB ? 1 : -1;
    } else {
      return compareA < compareB ? 1 : -1;
    }
  });
}

// Enhanced MembersGrid component with loading state
const MembersGrid = ({
  members,
  organizationId,
  locale,
  isLoading,
}: {
  members: OrganizationMember[];
  organizationId: string;
  locale: string;
  isLoading: boolean;
}) => {
  const t = useTranslations('Member');

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="overflow-hidden transition-all h-80">
            <div className="p-6 animate-pulse">
              <div className="flex justify-between mb-4">
                <div className="h-5 bg-muted rounded w-20"></div>
                <div className="h-5 bg-muted rounded w-8"></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-20 w-20 bg-muted rounded-full mb-4"></div>
                <div className="h-6 bg-muted rounded w-32 mb-2"></div>
                <div className="h-4 bg-muted rounded w-20 mb-4"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
              </div>
            </div>
            <div className="p-4 border-t bg-muted/20">
              <div className="h-8 bg-muted rounded w-full"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="col-span-full text-center py-12 border border-dashed rounded-lg bg-muted/20">
        <Users className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
        <h3 className="text-lg font-medium">{t('noMembersFound')}</h3>
        <p className="text-muted-foreground max-w-md mx-auto mt-1">
          {t('tryAdjustingSearchOrFilterCriteriaToFindWhatYouAreLookingFor')}
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-470px)] min-h-[400px] pr-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-4">
        {members.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            organizationId={organizationId}
            locale={locale}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default MembersTable;
