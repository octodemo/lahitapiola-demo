import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">🐷 Moonpig</h3>
            <p className="text-sm leading-relaxed">
              UK's favourite personalised card company. Send love, laughter and joy.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Cards</h3>
            <ul className="space-y-2 text-sm">
              {["Birthday Cards", "Anniversary Cards", "Thank You Cards", "Wedding Cards", "Baby Cards"].map(item => (
                <li key={item}>
                  <Link href="/cards" className="hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Gifts</h3>
            <ul className="space-y-2 text-sm">
              {["Flowers", "Chocolates", "Hampers", "Personalised Gifts", "Gift Wrap"].map(item => (
                <li key={item}>
                  <Link href="/cards" className="hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Help</h3>
            <ul className="space-y-2 text-sm">
              {["FAQ", "Delivery Info", "Returns", "Contact Us", "Accessibility"].map(item => (
                <li key={item}>
                  <Link href="/" className="hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">© 2024 Moonpig Demo. Made with 💕 for demo purposes.</p>
          <div className="flex gap-4 text-sm">
            <Link href="/" className="hover:text-white">Privacy Policy</Link>
            <Link href="/" className="hover:text-white">Terms of Use</Link>
            <Link href="/" className="hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
