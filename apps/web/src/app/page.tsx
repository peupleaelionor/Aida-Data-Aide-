import Link from 'next/link'
import { ArrowRight, Brain, Globe, Shield, Zap, Users, FileCheck, Star, CheckCircle } from 'lucide-react'

const stats = [
  { value: '50,000+', label: 'Citizens helped' },
  { value: '200+', label: 'Benefit programs' },
  { value: '15', label: 'Countries' },
  { value: '98%', label: 'Satisfaction rate' },
]

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Matching',
    description: 'Our GPT-4o engine analyzes your profile and instantly identifies all benefits you qualify for.',
  },
  {
    icon: Globe,
    title: 'Multi-Language Support',
    description: 'Available in 20+ languages. Navigate benefits in your native language with full accuracy.',
  },
  {
    icon: Zap,
    title: 'Real-Time Updates',
    description: 'Our crawlers check government portals daily so your benefit data is never stale.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'GDPR compliant. Your data is encrypted, never sold, and deletable on request.',
  },
  {
    icon: Users,
    title: 'Expert Guidance',
    description: 'AI advisor explains eligibility criteria in plain language and guides applications step-by-step.',
  },
  {
    icon: FileCheck,
    title: 'Simple Application',
    description: 'Pre-filled application forms and document checklists save you hours of paperwork.',
  },
]

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: ['5 benefit searches/month', 'Basic eligibility check', 'Email support'],
    cta: 'Get started',
    href: '/register',
    highlighted: false,
  },
  {
    name: 'Basic',
    price: '$9',
    period: '/month',
    features: ['50 benefit searches/month', 'Full eligibility report', 'Application tracking', 'Priority email'],
    cta: 'Start free trial',
    href: '/register?plan=basic',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    features: ['Unlimited searches', 'AI benefits advisor', 'Document generator', 'All countries', 'Phone support'],
    cta: 'Start free trial',
    href: '/register?plan=pro',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    features: ['Everything in Pro', 'White-labelling', 'API access', 'SLA guarantee', 'Dedicated CSM'],
    cta: 'Contact sales',
    href: '/contact',
    highlighted: false,
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
            <Brain className="h-7 w-7" />
            AIDA
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <Link href="/benefits/us" className="hover:text-blue-600 transition-colors">Benefits</Link>
            <Link href="#features" className="hover:text-blue-600 transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700 mb-6">
            <Star className="h-4 w-4" /> Trusted by 50,000+ citizens worldwide
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
            Find every government benefit<br />
            <span className="text-blue-600">you qualify for</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            AIDA uses AI to scan 200+ benefit programs across 15 countries and instantly tells you what you qualify for — in minutes, not months.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all hover:shadow-xl"
            >
              Check my eligibility free <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/benefits/us"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-8 py-4 text-base font-semibold text-gray-700 hover:border-blue-300 transition-colors"
            >
              Browse US benefits
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl font-extrabold text-white">{s.value}</div>
                <div className="text-blue-200 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need to claim what's yours</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Built for citizens, designed by policy experts, powered by AI.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-gray-100 bg-white p-8 hover:shadow-lg transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 mb-5">
                  <f.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-xl text-gray-500">Start free. Upgrade when you're ready.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 flex flex-col ${
                  plan.highlighted
                    ? 'bg-blue-600 text-white shadow-2xl shadow-blue-300 scale-105'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className="mb-6">
                  <div className={`font-bold text-lg ${plan.highlighted ? 'text-blue-100' : 'text-gray-500'}`}>
                    {plan.name}
                  </div>
                  <div className="flex items-end gap-1 mt-2">
                    <span className={`text-4xl font-extrabold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                      {plan.price}
                    </span>
                    <span className={`mb-1 ${plan.highlighted ? 'text-blue-200' : 'text-gray-400'}`}>{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm">
                      <CheckCircle className={`h-4 w-4 flex-shrink-0 ${plan.highlighted ? 'text-blue-200' : 'text-green-500'}`} />
                      <span className={plan.highlighted ? 'text-blue-100' : 'text-gray-600'}>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`rounded-xl py-3 text-center font-semibold transition-all ${
                    plan.highlighted
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-lg mb-4">
                <Brain className="h-6 w-6 text-blue-400" /> AIDA
              </div>
              <p className="text-sm leading-relaxed">AI-powered benefits discovery for citizens worldwide.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                {['Features', 'Pricing', 'Security', 'Changelog'].map((l) => (
                  <li key={l}><Link href="#" className="hover:text-white transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Benefits</h4>
              <ul className="space-y-2 text-sm">
                {['United States', 'United Kingdom', 'Canada', 'Germany', 'Australia'].map((l) => (
                  <li key={l}><Link href="#" className="hover:text-white transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'].map((l) => (
                  <li key={l}><Link href="#" className="hover:text-white transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            © {new Date().getFullYear()} AIDA — AI Data Aides. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
