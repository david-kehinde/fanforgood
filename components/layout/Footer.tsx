import Link from 'next/link';
import { Instagram, Twitter, Youtube, Facebook, Mail } from 'lucide-react';

const footerLinks = {
  company: [
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
    { label: 'Charity Partners', href: '/impact' },
  ],
  legal: [
    { label: 'Terms & Conditions', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ],
  explore: [
    { label: 'Shop', href: '/store' },
    { label: 'Impact', href: '/impact' },
    { label: 'Winner Stories', href: '/winners' },
  ],
};

const social = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Facebook, href: '#', label: 'Facebook' },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="font-display text-2xl font-bold">
              Fan<span className="text-gold-400">For</span>Good
            </Link>
            <p className="mt-4 text-neutral-400 max-w-sm leading-relaxed">
              Connecting fans with celebrities to create lasting charitable impact
              through official merchandise and exclusive experiences.
            </p>
            <div className="flex gap-4 mt-6">
              {social.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2 rounded-full bg-ink-muted hover:bg-gold-500 hover:text-ink transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gold-400 mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gold-400 mb-4">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gold-400 mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          id="contact"
          className="mt-16 pt-8 border-t border-ink-soft flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} FanForGood. All rights reserved.
          </p>
          <a
            href="mailto:hello@fanforgood.com"
            className="flex items-center gap-2 text-neutral-400 hover:text-gold-400 transition-colors text-sm"
          >
            <Mail className="h-4 w-4" />
            hello@fanforgood.com
          </a>
        </div>
      </div>
    </footer>
  );
}
