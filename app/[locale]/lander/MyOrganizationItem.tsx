import { Building, Calendar, ChevronRight, Code, Settings } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';
import { UserOrganization } from '@/lib/services/usersService';

export default async function MyOrganizationItem({
  org,
  locale,
}: {
  org: UserOrganization;
  locale: string;
}) {
  const t = await getTranslations({ locale, namespace: 'lander' });

  if (!org) return null;
  return (
    <div
      key={org.id}
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
                {org.name || 'Unnamed Organization'}
              </h3>
              <div className="flex items-center mt-1">
                <Code className="w-4 h-4 text-gray-500 mr-1" />
                <span className="text-gray-500 text-sm mr-3">
                  {org.code || 'N/A'}
                </span>
                <Calendar className="w-4 h-4 text-gray-500 mr-1" />
                <span className="text-gray-500 text-sm">
                  {formatDate(new Date(org.createdAt!))}
                </span>
                {org.paymentsActive && (
                  <span className="ml-3 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    {t('activeSubscription')}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          {org.role === 'admin' && (
            <Link
              href={`/dashboard/${org.id}/settings`}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
              <Settings className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <Link
          href={`/member/organization/${org.id}`}
          className={`flex items-center justify-center px-4 py-2 rounded-lg transition-colors bg-gray-100 text-gray-800 hover:bg-gray-200`}
        >
          {t('goToDashboard')}
          <ChevronRight className="ml-1 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
