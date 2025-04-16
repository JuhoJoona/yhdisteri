import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileSideBar from './Sidebar';
import { getOwnData } from '@/lib/services/usersService';
import PersonalInformation from './PersonalInformation';
import CommunicationPreferences from './CommunicationPreferences';
import SecuritySettings from './SecuritySettings';
import { getTranslations } from 'next-intl/server';

export default async function ProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Member' });

  const userData = await getOwnData();

  const { tab } = await searchParams;
  const activeTab = tab || 'personal';

  if (!userData) {
    return <div>{t('memberNotFound')}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Button variant="outline" size="sm" asChild className="mb-6">
        <Link href="/member/dashboard">
          <ChevronLeft className="h-4 w-4 mr-2" />
          {t('nav.dashboard')}
        </Link>
      </Button>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Sidebar */}
        <ProfileSideBar user={userData} />

        {/* Main Content */}
        <div className="flex-1">
          <Tabs defaultValue={activeTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="personal" asChild>
                <Link href="/member/profile?tab=personal">
                  {t('personalInformation')}
                </Link>
              </TabsTrigger>
              <TabsTrigger value="communication" asChild>
                <Link href="/member/profile?tab=communication">
                  {t('communication')}
                </Link>
              </TabsTrigger>
              <TabsTrigger value="security" asChild>
                <Link href="/member/profile?tab=security">
                  {t('securitySettings')}
                </Link>
              </TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal">
              <PersonalInformation userData={userData} />
            </TabsContent>

            {/* Communication Tab */}
            <TabsContent value="communication">
              <CommunicationPreferences locale={locale} />
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <SecuritySettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
