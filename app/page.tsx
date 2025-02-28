import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Users,
  CreditCard,
  Calendar,
  BarChart,
  Shield,
  Mail,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Users className="size-4" />
            </div>
            <span className="text-xl font-bold">Yhdisteri</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-primary"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-primary"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium hover:text-primary"
            >
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/sign-in">Log in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4 animate-slideUp">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                  Simplify association management
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  All-in-one solution for managing your association
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Yhdisteri helps associations manage member registers, handle
                  billing, and streamline operations all in one place.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" asChild>
                    <Link href="/sign-up">
                      Get Started <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/demo">Request Demo</Link>
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="inline-block h-8 w-8 rounded-full bg-muted overflow-hidden border-2 border-background"
                      >
                        <Image
                          src={`/placeholder.svg?height=32&width=32`}
                          alt="User"
                          width={32}
                          height={32}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <span>Trusted by 500+ associations across Finland</span>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end animate-fadeIn">
                <div className="relative w-full max-w-[500px] aspect-video rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/placeholder.svg?height=500&width=800"
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
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Everything you need to run your association
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Yhdisteri provides all the tools you need to manage your
                  association efficiently.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: <Users className="h-10 w-10" />,
                  title: "Member Management",
                  description:
                    "Keep track of all your members, their contact information, and membership status in one place.",
                },
                {
                  icon: <CreditCard className="h-10 w-10" />,
                  title: "Billing & Payments",
                  description:
                    "Send invoices, track payments, and manage your association's finances with ease.",
                },
                {
                  icon: <Calendar className="h-10 w-10" />,
                  title: "Event Management",
                  description:
                    "Create and manage events, handle registrations, and send reminders to participants.",
                },
                {
                  icon: <BarChart className="h-10 w-10" />,
                  title: "Reporting & Analytics",
                  description:
                    "Get insights into your association's performance with detailed reports and analytics.",
                },
                {
                  icon: <Shield className="h-10 w-10" />,
                  title: "GDPR Compliance",
                  description:
                    "Ensure your member data is handled in compliance with GDPR regulations.",
                },
                {
                  icon: <Mail className="h-10 w-10" />,
                  title: "Communication Tools",
                  description:
                    "Send emails, newsletters, and notifications to your members directly from the platform.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm border card-hover animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
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
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Simple and intuitive process
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Get started with Yhdisteri in just a few simple steps.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  step: "01",
                  title: "Sign Up",
                  description:
                    "Create your account and set up your association profile with basic information.",
                },
                {
                  step: "02",
                  title: "Import Members",
                  description:
                    "Import your existing member data or start adding members manually to your register.",
                },
                {
                  step: "03",
                  title: "Start Managing",
                  description:
                    "Begin using all features to manage members, billing, events, and communications.",
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
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  What our users say
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Hear from associations that have transformed their operations
                  with Yhdisteri.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[
                {
                  quote:
                    "Yhdisteri has completely transformed how we manage our sports club. The member management and billing features have saved us countless hours.",
                  author: "Matti Virtanen",
                  role: "Chairman, Helsinki Sports Club",
                },
                {
                  quote:
                    "As a small cultural association, we needed an affordable solution that could handle all our needs. Yhdisteri delivered beyond our expectations.",
                  author: "Liisa Korhonen",
                  role: "Secretary, Tampere Cultural Association",
                },
                {
                  quote:
                    "The GDPR compliance features give us peace of mind, and the reporting tools help us make better decisions for our student organization.",
                  author: "Juha Mäkinen",
                  role: "Treasurer, Turku Student Union",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="flex flex-col p-6 bg-card rounded-lg shadow-sm border animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-1">
                    <p className="italic text-muted-foreground mb-4">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="h-10 w-10 rounded-full bg-muted overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=40&width=40`}
                        alt={testimonial.author}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
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
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Simple, transparent pricing
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Choose the plan that fits your association's needs.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  name: "Starter",
                  price: "€29",
                  description:
                    "Perfect for small associations with up to 50 members.",
                  features: [
                    "Member management",
                    "Basic billing",
                    "Email notifications",
                    "GDPR compliance",
                    "1 admin user",
                  ],
                  cta: "Get Started",
                  popular: false,
                },
                {
                  name: "Professional",
                  price: "€59",
                  description:
                    "Ideal for growing associations with up to 200 members.",
                  features: [
                    "Everything in Starter",
                    "Advanced billing & payments",
                    "Event management",
                    "Basic reporting",
                    "3 admin users",
                  ],
                  cta: "Get Started",
                  popular: true,
                },
                {
                  name: "Enterprise",
                  price: "€99",
                  description: "For large associations with unlimited members.",
                  features: [
                    "Everything in Professional",
                    "Advanced reporting & analytics",
                    "Custom integrations",
                    "Priority support",
                    "Unlimited admin users",
                  ],
                  cta: "Contact Sales",
                  popular: false,
                },
              ].map((plan, index) => (
                <div
                  key={index}
                  className={`flex flex-col p-6 rounded-lg shadow-sm border animate-slideUp ${
                    plan.popular
                      ? "border-primary ring-1 ring-primary relative"
                      : "bg-card"
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                      Most Popular
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
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link
                      href={
                        plan.cta === "Contact Sales" ? "/contact" : "/register"
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
                  FAQ
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Frequently asked questions
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Find answers to common questions about Yhdisteri.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {[
                {
                  question: "Can I import my existing member data?",
                  answer:
                    "Yes, Yhdisteri allows you to import your existing member data from Excel, CSV, or other formats. We also offer assistance with data migration for larger associations.",
                },
                {
                  question: "Is Yhdisteri GDPR compliant?",
                  answer:
                    "Absolutely. Yhdisteri is built with GDPR compliance in mind. We provide tools to manage consent, data access requests, and the right to be forgotten.",
                },
                {
                  question: "Can I customize the billing templates?",
                  answer:
                    "Yes, you can customize invoice templates with your association's logo, colors, and specific information to maintain your brand identity.",
                },
                {
                  question: "How secure is my association's data?",
                  answer:
                    "We take security seriously. All data is encrypted both in transit and at rest. We perform regular security audits and backups to ensure your data is safe.",
                },
                {
                  question: "Can multiple people manage the association?",
                  answer:
                    "Yes, depending on your plan, you can have multiple admin users with different permission levels to manage various aspects of your association.",
                },
                {
                  question: "Is there a mobile app available?",
                  answer:
                    "Yhdisteri is fully responsive and works on all devices. We also offer native mobile apps for iOS and Android for on-the-go management.",
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
                Ready to transform your association?
              </h2>
              <p className="max-w-[700px] md:text-xl">
                Join hundreds of associations already using Yhdisteri to
                streamline their operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/register">
                    Get Started <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link href="/demo">Request Demo</Link>
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
              <p className="text-muted-foreground">
                The all-in-one solution for associations to manage members,
                billing, and more.
              </p>
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
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
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
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
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
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                  <span className="sr-only">Instagram</span>
                </Link>
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
              <h3 className="text-lg font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#features"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/demo"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Demo
                  </Link>
                </li>
                <li>
                  <Link
                    href="/roadmap"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blog"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/documentation"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guides"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-primary"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} Yhdisteri. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
