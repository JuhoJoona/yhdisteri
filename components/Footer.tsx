import { Users } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

const Footer = async ({ locale }: { locale: string }) => {
  const t = await getTranslations({ locale, namespace: 'Footer' });
  return (
    <footer className="border-t py-12 md:py-16 justify-self-center">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Users className="size-4" />
              </div>
              <span className="text-xl font-bold">Yhdisteri</span>
            </div>
            <p className="text-muted-foreground">{t('description')}</p>
            <div className="flex space-x-4">
              <Link
                href="https://www.linkedin.com/company/p%C3%B6hin%C3%A4-group/"
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
            <h3 className="text-lg font-medium mb-4">{t('product')}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#features"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t('features')}
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t('pricing')}
                </Link>
              </li>
              <li>
                <Link
                  href="/demo"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t('demo')}
                </Link>
              </li>
              <li>
                <Link
                  href="/roadmap"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t('roadmap')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">{t('company')}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Yhdisteri. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
