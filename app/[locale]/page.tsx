import { Button } from '@/components/ui/button';
import {
  SignInButton,
  SignUpButton,
  SignedOut,
  SignedIn,
  UserButton,
} from '@/components/auth/AuthComponents';
import {
  ChevronRight,
  Users,
  CreditCard,
  Calendar,
  BarChart,
  Shield,
  Mail,
  Globe,
  ChevronDown,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLocale } from 'next-intl';
import { NavBar } from '@/components/NavBar';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('home.title'),
    description: t('home.description'),
  };
}

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale });

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar locale={locale} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4 animate-slideUp">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                  {t('hero.tip')}
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t('hero.title')}
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  {t('hero.description')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" asChild>
                    <Link href="/sign-up">
                      {t('hero.getStarted')}{' '}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/demo">{t('hero.requestDemo')}</Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end animate-fadeIn">
                <div className="relative w-full max-w-[500px] aspect-video rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/happy.avif?height=500&width=800"
                    alt="Yhdisteri Dashboard"
                    width={800}
                    height={500}
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  {t('features.features')}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t('features.title')}
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  {t('features.description')}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: <Users className="h-10 w-10" />,
                  title: t('features.memberManagement'),
                  description: t('features.memberManagementDescription'),
                  includedInAll: true,
                },
                {
                  icon: <CreditCard className="h-10 w-10" />,
                  title: t('features.billingAndPayments'),
                  description: t('features.billingAndPaymentsDescription'),
                  includedInAll: false,
                },
                {
                  icon: <Calendar className="h-10 w-10" />,
                  title: t('features.eventManagement'),
                  description: t('features.eventManagementDescription'),
                  includedInAll: false,
                },
                {
                  icon: <BarChart className="h-10 w-10" />,
                  title: t('features.reportingAndAnalytics'),
                  description: t('features.reportingAndAnalyticsDescription'),
                  includedInAll: true,
                },
                {
                  icon: <Shield className="h-10 w-10" />,
                  title: t('features.gdprCompliance'),
                  description: t('features.gdprComplianceDescription'),
                  includedInAll: true,
                },
                {
                  icon: <Mail className="h-10 w-10" />,
                  title: t('features.communicationTools'),
                  description: t('features.communicationToolsDescription'),
                  includedInAll: false,
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm border card-hover animate-fadeIn relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {!feature.includedInAll ? (
                    <div className="absolute top-3 right-3 bg-orange-100 text-primary text-xs px-2 py-1 rounded-full">
                      {t('features.proAndEnterprise')}
                    </div>
                  ) : (
                    <div className="absolute top-3 right-3 bg-green-100 text-primary text-xs px-2 py-1 rounded-full">
                      {t('features.allPlans')}
                    </div>
                  )}
                  <div className="p-2 rounded-full bg-primary/10 text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-center">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  {t('howItWorks.howItWorks')}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t('howItWorks.title')}
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  {t('howItWorks.description')}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  step: '01',
                  title: t('howItWorks.signUp'),
                  description: t('howItWorks.signUpDescription'),
                },
                {
                  step: '02',
                  title: t('howItWorks.importMembers'),
                  description: t('howItWorks.importMembersDescription'),
                },
                {
                  step: '03',
                  title: t('howItWorks.startManaging'),
                  description: t('howItWorks.startManagingDescription'),
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center p-6 animate-slideUp"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="absolute -top-4 text-6xl font-bold text-primary/10">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mt-8 mb-2 relative z-10">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-center">
                    {step.description}
                  </p>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                      <ChevronRight className="h-8 w-8 text-muted" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  {t('testimonials.testimonials')}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t('testimonials.title')}
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  {t('testimonials.description')}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[
                {
                  quote: t('testimonials.quote1'),
                  author: t('testimonials.author1'),
                  role: t('testimonials.role1'),
                },
                {
                  quote: t('testimonials.quote2'),
                  author: t('testimonials.author2'),
                  role: t('testimonials.role2'),
                },
                {
                  quote: t('testimonials.quote3'),
                  author: t('testimonials.author3'),
                  role: t('testimonials.role3'),
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="flex flex-col p-6 bg-card rounded-lg shadow-sm border animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-1">
                    <p className="italic text-muted-foreground mb-4">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  {t('pricing.pricing')}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t('pricing.title')}
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  {t('pricing.description')}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  name: 'Starter',
                  price: '€29',
                  description:
                    'Perfect for small associations with up to 50 members.',
                  features: [
                    t('pricing.starterFeature1'),
                    t('pricing.starterFeature2'),
                    t('pricing.starterFeature3'),
                    t('pricing.starterFeature4'),
                    t('pricing.starterFeature5'),
                  ],
                  cta: t('pricing.starterCta'),
                  popular: false,
                },
                {
                  name: t('pricing.professional'),
                  price: '€59',
                  description: t('pricing.professionalDescription'),
                  features: [
                    t('pricing.professionalFeature1'),
                    t('pricing.professionalFeature2'),
                    t('pricing.professionalFeature3'),
                    t('pricing.professionalFeature4'),
                    t('pricing.professionalFeature5'),
                  ],
                  cta: t('pricing.professionalCta'),
                  popular: true,
                },
                {
                  name: t('pricing.enterprise'),
                  price: '€99',
                  description: t('pricing.enterpriseDescription'),
                  features: [
                    t('pricing.enterpriseFeature1'),
                    t('pricing.enterpriseFeature2'),
                    t('pricing.enterpriseFeature3'),
                    t('pricing.enterpriseFeature4'),
                    t('pricing.enterpriseFeature5'),
                  ],
                  cta: t('pricing.enterpriseCta'),
                  popular: false,
                },
              ].map((plan, index) => (
                <div
                  key={index}
                  className={`flex flex-col p-6 rounded-lg shadow-sm border animate-slideUp ${
                    plan.popular
                      ? 'border-primary ring-1 ring-primary relative'
                      : 'bg-card'
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                      {t('pricing.popular')}
                    </div>
                  )}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <div className="mt-2 flex items-baseline">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="ml-1 text-muted-foreground">/month</span>
                    </div>
                    <p className="mt-2 text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-primary mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                    asChild
                  >
                    <Link
                      href={
                        plan.cta === t('pricing.enterpriseCta')
                          ? '/demo'
                          : '/sign-up'
                      }
                    >
                      {plan.cta}
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  {t('faq.faq')}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t('faq.title')}
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  {t('faq.description')}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {[
                {
                  question: t('faq.question1'),
                  answer: t('faq.answer1'),
                },
                {
                  question: t('faq.question2'),
                  answer: t('faq.answer2'),
                },
                {
                  question: t('faq.question3'),
                  answer: t('faq.answer3'),
                },
                {
                  question: t('faq.question4'),
                  answer: t('faq.answer4'),
                },
                {
                  question: t('faq.question5'),
                  answer: t('faq.answer5'),
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="p-6 bg-card rounded-lg shadow-sm border animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center bg-primary text-primary-foreground p-8 md:p-12 rounded-lg">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {t('cta.title')}
              </h2>
              <p className="max-w-[700px] md:text-xl">{t('cta.description')}</p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/sign-up">
                    {t('cta.getStarted')}{' '}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link href="/demo">{t('cta.requestDemo')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Users className="size-4" />
                </div>
                <span className="text-xl font-bold">Yhdisteri</span>
              </div>
              <p className="text-muted-foreground">{t('footer.description')}</p>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">
                {t('footer.product')}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#features"
                    className="text-muted-foreground hover:text-primary"
                  >
                    {t('footer.features')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-muted-foreground hover:text-primary"
                  >
                    {t('footer.pricing')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/demo"
                    className="text-muted-foreground hover:text-primary"
                  >
                    {t('footer.demo')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/roadmap"
                    className="text-muted-foreground hover:text-primary"
                  >
                    {t('footer.roadmap')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">
                {t('footer.resources')}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blog"
                    className="text-muted-foreground hover:text-primary"
                  >
                    {t('footer.blog')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/documentation"
                    className="text-muted-foreground hover:text-primary"
                  >
                    {t('footer.documentation')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guides"
                    className="text-muted-foreground hover:text-primary"
                  >
                    {t('footer.guides')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="text-muted-foreground hover:text-primary"
                  >
                    {t('footer.support')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">
                {t('footer.company')}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-primary"
                  >
                    {t('footer.about')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-primary"
                  >
                    {t('footer.contact')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-primary"
                  >
                    {t('footer.privacy')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground hover:text-primary"
                  >
                    {t('footer.terms')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Yhdisteri.{' '}
              {t('footer.allRightsReserved')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
