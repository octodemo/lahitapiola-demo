import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-lt-navy text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-lt-navy font-black text-sm">LT</span>
              </div>
              <span className="text-white font-bold text-lg">LähiTapiola</span>
            </div>
            <p className="text-sm leading-relaxed">
              Your trusted Finnish mutual insurance company. We insure what matters to you.
            </p>
            <p className="text-xs mt-3 text-gray-400">
              © 2024 LähiTapiola Demo.<br />Built for GitHub Copilot demo purposes.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Insurance</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home Insurance", href: "/policies?type=home" },
                { label: "Car Insurance", href: "/policies?type=car" },
                { label: "Health Insurance", href: "/policies?type=health" },
                { label: "Life Insurance", href: "/policies?type=life" },
                { label: "Travel Insurance", href: "/policies?type=travel" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              {["Report a Claim", "My Pages", "Policy Documents", "Direct Compensation", "Business Insurance"].map((item) => (
                <li key={item}>
                  <Link href="/policies" className="hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>📞 <a href="tel:0200600600" className="hover:text-white transition-colors">020 060 0600</a></li>
              <li>🕐 Mon–Fri 8:00–18:00</li>
              <li className="pt-2">
                {["FAQ", "Accessibility", "Privacy Policy", "Cookies"].map((item) => (
                  <p key={item}>
                    <Link href="/" className="hover:text-white transition-colors">{item}</Link>
                  </p>
                ))}
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>LähiTapiola is a mutual insurance group — your interests are our interests.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-white">Privacy Policy</Link>
            <Link href="/" className="hover:text-white">Terms of Use</Link>
            <Link href="/" className="hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
