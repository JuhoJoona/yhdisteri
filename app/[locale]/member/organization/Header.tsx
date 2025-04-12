import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Share2, Shield } from 'lucide-react';
import { Code } from 'lucide-react';
import { Building } from 'lucide-react';
import { Organization } from '@/lib/types/organization';
import { formatDateString } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const Header = ({ organization }: { organization: Organization }) => {
  const t = useTranslations('Member');
  return (
    <div className="mb-6">
      <Button variant="outline" size="sm" asChild className="mb-6">
        <Link href="/member/dashboard">
          <ChevronLeft className="h-4 w-4 mr-2" />
          {t('backToDashboard')}
        </Link>
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center">
          <div className="bg-primary/10 p-3 rounded-lg mr-4">
            <Building className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {organization.organization?.name}
            </h1>
            <div className="flex items-center mt-1 text-muted-foreground">
              <Code className="h-4 w-4 mr-1" />
              <span className="mr-4">
                {t('code')}: {organization.organization?.code || 'N/A'}
              </span>
              <Calendar className="h-4 w-4 mr-1" />
              <span>
                {t('created')}{' '}
                {formatDateString(organization.organization?.createdAt)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {organization.organization?.paymentsActive && (
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200"
            >
              {t('activeSubscription')}
            </Badge>
          )}
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            {t('share')}
          </Button>
          <Button size="sm">
            <Shield className="h-4 w-4 mr-2" />
            {t('manageSubscription')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
