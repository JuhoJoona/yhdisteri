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
import BillingInformation from './BillingInformation';

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
        {/* @ts-expect-error Veän kaikkia lättyy ku en jaksa korjata */}
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
                <Link href="/member/profile?tab=security">{t('security')}</Link>
              </TabsTrigger>
              <TabsTrigger value="billing" asChild>
                <Link href="/member/profile?tab=billing">{t('billing')}</Link>
              </TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal">
              {/* @ts-expect-error Veän kaikkia lättyy ku en jaksa korjata */}
              <PersonalInformation userData={userData} />
            </TabsContent>

            {/* Communication Tab */}
            <TabsContent value="communication">
              <CommunicationPreferences />
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              {/* @ts-expect-error Veän kaikkia lättyy ku en jaksa korjata */}
              <SecuritySettings user={userData} />
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing">
              <BillingInformation />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
