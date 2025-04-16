'use client';
import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Badge } from './ui/badge';
import { useTranslations } from 'next-intl';
import {
  OrganizationMembershipType,
  OrganizationMembershipTypes,
} from '@/lib/types/plans';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { createMembershipType } from '@/lib/services/plansClientService';
import { toast } from 'sonner';

const MembershipTypesTable = ({
  membershipTypes,
  organizationId,
  stripeAccountConnected,
}: {
  membershipTypes: OrganizationMembershipTypes;
  organizationId: string;
  stripeAccountConnected: boolean;
}) => {
  const t = useTranslations('Organization');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTypeData, setNewTypeData] = useState({
    name: '',
    description: '',
    price: '',
    interval: '',
  });

  console.log('stripeAccountConnected', stripeAccountConnected);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTypeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMembershipType = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting new membership type:', newTypeData);

    const membershipType: OrganizationMembershipType = {
      ...newTypeData,
      organizationId,
      stripeProductId: '',
      price: newTypeData.price,
      interval: newTypeData.interval as 'month' | 'year',
    };
    await createMembershipType(organizationId, membershipType);
    setIsAddDialogOpen(false); // Close dialog on submit for now

    setNewTypeData({ name: '', description: '', price: '', interval: '' });
  };

  return (
    <div className="bg-card rounded-lg p-6 mb-8 border border-border">
      <h2 className="text-xl font-semibold mb-4">
        {t('organizationMembershipTypes')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {membershipTypes?.map((type) => (
          <Card key={type.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {type.name}
                <Badge variant="outline">
                  {type.price}€ / {t(type.interval || '')}
                </Badge>
              </CardTitle>
              <CardDescription>{type.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-xs text-muted-foreground">
                Stripe ID: {type.stripeProductId}
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                {t('edit')}
              </Button>
            </CardFooter>
          </Card>
        ))}

        <Dialog
          open={isAddDialogOpen}
          onOpenChange={(open) => {
            setIsAddDialogOpen(open);
          }}
        >
          <DialogTrigger asChild>
            <Card
              className="flex items-center justify-center border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer"
              onClick={(e) => {
                if (!stripeAccountConnected) {
                  e.preventDefault();
                  toast.error(t('stripeAccountNotConnected'));
                  return;
                }
              }}
            >
              <div className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary p-4 text-center">
                <PlusCircle className="h-8 w-8 mb-2" />
                {t('addNewMembershipType')}
              </div>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('addNewMembershipType')}</DialogTitle>
              <DialogDescription>
                {t('fillFormToAddMembershipType')}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddMembershipType} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">{t('formFieldName')}</Label>
                <Input
                  id="name"
                  name="name"
                  value={newTypeData.name}
                  onChange={handleInputChange}
                  placeholder={t('formFieldNamePlaceholder')}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">{t('formFieldDescription')}</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newTypeData.description}
                  onChange={handleInputChange}
                  placeholder={t('formFieldDescriptionPlaceholder')}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">{t('formFieldPrice')}</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={newTypeData.price}
                    onChange={handleInputChange}
                    placeholder="e.g. 10"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="interval">{t('formFieldInterval')}</Label>
                  <Input
                    id="interval"
                    name="interval"
                    value={newTypeData.interval}
                    onChange={handleInputChange}
                    placeholder={t('formFieldIntervalPlaceholder')}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                {t('addMembershipTypeButton')}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MembershipTypesTable;
