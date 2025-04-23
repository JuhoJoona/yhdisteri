'use client';

import { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTranslations } from 'next-intl';

export function DemoRequestForm() {
  const t = useTranslations('DemoRequestForm');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="mb-4 rounded-full bg-green-100 dark:bg-green-900 p-3">
          <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
          {t('thankYou')}
        </h3>
        <p className="mb-6 text-center text-slate-600 dark:text-slate-300">
          {t('thankYouMessage')}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">{t('name')}</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Smith"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t('email')}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="organization">{t('organization')}</Label>
          <Input
            id="organization"
            name="organization"
            placeholder="Your Association"
            value={formData.organization}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">{t('message')}</Label>
          <Textarea
            id="message"
            name="message"
            placeholder={t('messagePlaceholder')}
            rows={4}
            value={formData.message}
            onChange={handleChange}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('processing')}
          </>
        ) : (
          t('requestDemo')
        )}
      </Button>

      <p className="text-center text-xs text-slate-500">
        {t('bySubmitting')}
        <a href="/privacy" className="text-blue-600 hover:underline">
          {t('privacyPolicy')}
        </a>
        {t('and')}
        <a href="/terms-of-service" className="text-blue-600 hover:underline">
          {t('termsOfService')}
        </a>
        .
      </p>
    </form>
  );
}
