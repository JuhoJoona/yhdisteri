'use client';

import { Input } from '@/components/ui/input';
import { OrganizationMembershipType } from '@/lib/types/plans';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface AccessCodeInputProps {
  accessCodeMembershipTypes: OrganizationMembershipType[];
}

const AccessCodeInput = ({
  accessCodeMembershipTypes,
}: AccessCodeInputProps) => {
  const router = useRouter();
  const t = useTranslations('Member');

  const handleAccessCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value.toUpperCase();
    const matchingType = accessCodeMembershipTypes.find(
      (type) => type.accessCode === code
    );
    if (matchingType) {
      router.push(
        `/member/organization/${matchingType.organizationId}/billing/${matchingType.id}`
      );
    }
  };

  return (
    <Input
      type="text"
      placeholder={t('enterAccessCode')}
      className="flex-1"
      maxLength={5}
      onChange={handleAccessCodeChange}
    />
  );
};

export default AccessCodeInput;
