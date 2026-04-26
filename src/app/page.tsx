import Link from "next/link";
import { cards, getTrendingCards } from "@/data/cards";
import { ProductCard } from "@/components/CardImage";
import { ArrowRight, Truck, Shield, Star } from "lucide-react";

const categories = [
  { name: "Birthday Cards", emoji: "🎂", href: "/cards?occasion=Birthday", bg: "#FFD6E7", color: "#C4124F" },
  { name: "Anniversary Cards", emoji: "💕", href: "/cards?occasion=Anniversary", bg: "#FFE8F0", color: "#E8175D" },
  { name: "Thank You Cards", emoji: "🌸", href: "/cards?occasion=Thank+You", bg: "#F5FFD6", color: "#558B2F" },
  { name: "Flowers", emoji: "💐", href: "/cards?category=flowers", bg: "#FFF8E1", color: "#E65100" },
  { name: "Gifts", emoji: "🎁", href: "/cards?category=gifts", bg: "#F3E5F5", color: "#7B1FA2" },
];

export default function HomePage() {
  const trending = getTrendingCards();

  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-pink-50 via-white to-rose-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block bg-moonpig-pink text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
                ✨ Free Personalisation
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
                Send something{" "}
                <span className="text-moonpig-pink">they'll never forget</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Personalised greeting cards, flowers and gifts delivered direct. From just £3.49 — because everyone deserves to feel special.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/cards" className="btn-primary inline-flex items-center gap-2">
                  Shop Cards <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/cards?category=gifts" className="btn-secondary inline-flex items-center gap-2">
                  Browse Gifts
                </Link>
              </div>
            </div>
            {/* Hero visual */}
            <div className="relative hidden md:block">
              <div className="grid grid-cols-2 gap-4">
                {cards.slice(0, 4).map((card) => (
                  <Link key={card.id} href={`/cards/${card.id}`}>
                    <div
                      className="rounded-2xl p-6 flex flex-col items-center justify-center h-36 card-hover cursor-pointer"
                      style={{ backgroundColor: card.bgColor }}
                    >
                      <span className="text-4xl mb-1">{card.emoji}</span>
                      <p className="text-xs font-semibold text-center" style={{ color: card.textColor }}>
                        {card.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="bg-moonpig-pink py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 text-white text-sm font-medium">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              <span>Next Day Delivery Available</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>4.8/5 from 20M+ reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>100% Satisfaction Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-black text-gray-900 mb-2">Shop by Occasion</h2>
        <p className="text-gray-500 mb-8">Whatever the moment, we've got the perfect card.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link key={cat.name} href={cat.href}>
              <div
                className="rounded-2xl p-6 flex flex-col items-center justify-center gap-3 h-32 card-hover cursor-pointer"
                style={{ backgroundColor: cat.bg }}
              >
                <span className="text-4xl">{cat.emoji}</span>
                <p className="text-xs font-semibold text-center" style={{ color: cat.color }}>
                  {cat.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section className="bg-pink-50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-1">🔥 Trending Now</h2>
              <p className="text-gray-500 text-sm">Most loved cards this week</p>
            </div>
            <Link href="/cards" className="text-moonpig-pink font-semibold text-sm hover:underline flex items-center gap-1">
              See all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {trending.slice(0, 6).map((card) => (
              <ProductCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="bg-gradient-to-r from-moonpig-pink to-moonpig-pink-light rounded-3xl p-10 text-white text-center">
          <h2 className="text-3xl font-black mb-3">Make it personal 💌</h2>
          <p className="text-white/80 text-lg mb-6">Add your own message, choose your font, make it truly yours.</p>
          <Link href="/cards" className="inline-block bg-white text-moonpig-pink font-bold py-3 px-8 rounded-full hover:bg-pink-50 transition-colors shadow-lg">
            Start Personalising
          </Link>
        </div>
      </section>
    </div>
  );
}
