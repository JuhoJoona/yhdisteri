import { UserOrganization } from '@/lib/types/member';
import { formatDate } from '@/lib/utils';
import { Building, Calendar, ChevronRight, Code } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function AdminOrganizationItem({
  organization,
  locale,
}: {
  organization: UserOrganization;
  locale: string;
}) {
  const t = await getTranslations({ locale, namespace: 'lander' });
  return (
    <div
      key={organization.id}
      className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all bg-white hover:border-blue-200"
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center mb-2">
            <div className="bg-blue-100 p-2 rounded-lg mr-4">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {organization.name || 'Unnamed Organization'}
              </h3>
              <div className="flex items-center mt-1">
                <Code className="w-4 h-4 text-gray-500 mr-1" />
                <span className="text-gray-500 text-sm mr-3">
                  {organization.code || 'N/A'}
                </span>
                <Calendar className="w-4 h-4 text-gray-500 mr-1" />
                <span className="text-gray-500 text-sm">
                  {formatDate(new Date(organization.createdAt!))}
                </span>
                {organization.paymentsActive && (
                  <span className="ml-3 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    {t('activeSubscription')}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 flex  w-1/4">
        <Link
          href={`/admin/dashboard/organization?organizationId=${organization.id}`}
          className={`flex items-center justify-center px-4 py-2 rounded-lg transition-colors bg-blue-600 text-white hover:bg-blue-700`}
        >
          {t('goToDashboard')}
          <ChevronRight className="ml-1 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
