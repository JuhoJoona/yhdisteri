import { getUserOrganizations } from '@/lib/services/usersService';
import {
  Building,
  Settings,
  ChevronRight,
  Plus,
  HelpCircle,
  Calendar,
  Code,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function Dashboard({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const organizations = await getUserOrganizations();
  const t = await getTranslations({ locale, namespace: 'lander' });

  // Empty state when no organizations exist
  if (!organizations || organizations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
          <Building className="w-20 h-20 mx-auto text-blue-500 mb-6" />
          <h1 className="text-2xl font-bold mb-4">{t('noOrganizations')}</h1>
          <p className="text-gray-600 mb-8">
            {t('noOrganizationsDescription')}
          </p>
          <Link
            href="/admin/dashboard/organization/create"
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full"
          >
            <Plus className="w-5 h-5 mr-2" />
            {t('createOrganization')}
          </Link>

          <Link href="/join" className="p-4">
            <h3 className="text-gray-400">{t('joinOrganization')}</h3>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Your Organizations
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and access your organizations
            </p>
          </div>
          <Link
            href="/dashboard/organization/create"
            className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Organization
          </Link>
        </div>

        {organizations.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
            <Building className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">
              No Organizations Found
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              You haven&apos;t joined any organizations yet. Create a new
              organization to get started.
            </p>
            <Link
              href="/dashboard/organization/create"
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Organization
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {organizations.map((org) => (
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
                            {formatDate(org.createdAt)}
                          </span>
                          {org.paymentsActive && (
                            <span className="ml-3 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                              Active Subscription
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
                    href={`/dashboard/organization?organizationId=${org.id}`}
                    className={`flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${
                      org.role === 'admin'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    Go to Dashboard
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-start">
            <HelpCircle className="w-6 h-6 text-blue-500 mr-4 mt-1" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Need Help?</h2>
              <p className="text-gray-600">
                If you&apos;re having trouble accessing your organizations or
                need assistance with account settings, please visit our{' '}
                <Link href="/help" className="text-blue-600 hover:underline">
                  Help Center
                </Link>{' '}
                or contact{' '}
                <a
                  href="mailto:support@example.com"
                  className="text-blue-600 hover:underline"
                >
                  support@example.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
