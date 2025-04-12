'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { formatDate } from '@/lib/utils';
import { typedApiClient } from '@/lib/client';
import { MemberByExternalId } from '@/lib/types/member';

export function MemberDetails({
  member,
  isEditMode,
  organizationId,
}: {
  member: MemberByExternalId;
  isEditMode: boolean;
  organizationId: string;
}) {
  const router = useRouter();
  const originalMemberRef = useRef(member);
  const [formData, setFormData] = useState<MemberByExternalId>(member);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [displayData, setDisplayData] = useState<MemberByExternalId>(member);

  useEffect(() => {
    if (member && Object.keys(member).length > 0) {
      originalMemberRef.current = member;
      setFormData(member);
      setDisplayData(member);
    }
  }, [member]);

  useEffect(() => {
    if (!isEditMode) {
      setDisplayData(originalMemberRef.current);
    }
  }, [isEditMode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateMember = async (member: MemberByExternalId) => {
    console.log('Updating member with data:', member);
    if (!member.id) {
      throw new Error('Member ID is required');
    }
    const resp = await typedApiClient.PUT(
      '/users/organization/{organizationId}/members/{memberId}',
      {
        params: {
          path: {
            organizationId: organizationId,
            memberId: member.id,
          },
        },
        body: member,
      }
    );
    console.log('Response:', resp);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateMember(formData);
      console.log('Updating member with data:', formData);

      router.push(
        `/admin/dashboard/organization/members/${member.id}?organizationId=${organizationId}`
      );
    } catch (error) {
      console.error('Failed to update member:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">
          {isEditMode ? 'Edit Member' : 'Member Details'}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={isEditMode ? handleSubmit : undefined}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              {isEditMode ? (
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              ) : (
                <p className="text-lg">{displayData.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              {isEditMode ? (
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              ) : (
                <p className="text-lg">{displayData.lastName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              {isEditMode ? (
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              ) : (
                <p className="text-lg">{displayData.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              {isEditMode ? (
                <Input
                  id="notes"
                  name="notes"
                  value={formData.notes || ''}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-lg">{displayData.notes || 'No notes'}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              {isEditMode ? (
                <select
                  id="status"
                  name="status"
                  className="w-full p-2 border rounded"
                  value={formData.status || ''}
                  onChange={handleChange}
                >
                  <option value="">Select status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                  <option value="deleted">Deleted</option>
                  <option value="suspended">Suspended</option>
                </select>
              ) : (
                <p className="text-lg">{displayData.status || 'Not set'}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              {isEditMode ? (
                <select
                  id="role"
                  name="role"
                  className="w-full p-2 border rounded"
                  value={formData.role || ''}
                  onChange={handleChange}
                >
                  <option value="">Select role</option>
                  <option value="admin">Admin</option>
                  <option value="member">Member</option>
                  <option value="guest">Guest</option>
                </select>
              ) : (
                <p className="text-lg">{displayData.role || 'Not set'}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Last Active</Label>
              <p className="text-lg">
                {displayData.lastActive
                  ? formatDate(new Date(displayData.lastActive))
                  : 'Never'}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <Label>Member ID</Label>
            <p className="text-sm text-gray-500">{displayData.id}</p>
          </div>

          <div className="mt-2">
            <Label>Created</Label>
            <p className="text-sm text-gray-500">
              {displayData.createdAt
                ? formatDate(new Date(displayData.createdAt))
                : ''}
            </p>
          </div>

          <div className="mt-2">
            <Label>Last Updated</Label>
            <p className="text-sm text-gray-500">
              {displayData.updatedAt
                ? formatDate(new Date(displayData.updatedAt))
                : ''}
            </p>
          </div>

          {isEditMode && (
            <CardFooter className="flex justify-end mt-6 px-0">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardFooter>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
