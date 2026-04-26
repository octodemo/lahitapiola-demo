import Link from "next/link";
import { getFeaturedPolicies, policyTypes, policyTypeLabels, policyTypeEmojis } from "@/data/policies";
import { PolicyCard } from "@/components/PolicyCard";
import { ArrowRight, Shield, Clock, Users, Award } from "lucide-react";

export default function HomePage() {
  const featured = getFeaturedPolicies();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-lt-navy via-lt-navy to-blue-900 py-20 md:py-28 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-lt-teal text-white text-sm font-semibold px-4 py-1 rounded-full mb-5">
                🇫🇮 Finland's most trusted mutual insurer
              </span>
              <h1 className="text-4xl md:text-5xl font-black leading-tight mb-5">
                Insurance that works{" "}
                <span className="text-lt-teal">for you,</span>{" "}
                not just for us.
              </h1>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                As a mutual insurance group, our customers are our owners. Get a personalised quote in minutes — home, car, health, life, travel and pet.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/policies"
                  className="inline-flex items-center gap-2 bg-lt-orange hover:bg-lt-orange-dark text-white font-semibold py-3 px-7 rounded-full transition-all shadow-lg hover:shadow-xl active:scale-95"
                >
                  Get a Quote <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/policies"
                  className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-lt-navy font-semibold py-3 px-7 rounded-full transition-all"
                >
                  Browse Policies
                </Link>
              </div>
            </div>

            {/* Hero card grid */}
            <div className="relative hidden md:grid grid-cols-2 gap-4">
              {policyTypes.slice(0, 4).map((type) => (
                <Link key={type} href={`/policies?type=${type}`}>
                  <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center h-36 hover:-translate-y-1 hover:bg-white/20 transition-all cursor-pointer">
                    <span className="text-4xl mb-2">{policyTypeEmojis[type]}</span>
                    <p className="text-sm font-semibold text-center text-white">
                      {policyTypeLabels[type]} Insurance
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-lt-teal py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 text-white text-sm font-medium">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>1.5 million Finnish customers</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Rated #1 insurer in Finland 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Mutual group — no shareholders</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Claims settled in 24 hours avg.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-black text-gray-900 mb-2">What would you like to insure?</h2>
        <p className="text-gray-500 mb-8">Simple cover for every stage of life.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {policyTypes.map((type) => (
            <Link key={type} href={`/policies?type=${type}`}>
              <div className="bg-lt-cream rounded-2xl p-5 flex flex-col items-center justify-center gap-3 h-28 card-hover cursor-pointer border border-transparent hover:border-lt-navy/20">
                <span className="text-3xl">{policyTypeEmojis[type]}</span>
                <p className="text-xs font-semibold text-center text-lt-navy">
                  {policyTypeLabels[type]}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured policies */}
      <section className="bg-lt-cream py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-1">Most popular policies</h2>
              <p className="text-gray-500 text-sm">Chosen by Finnish families this month</p>
            </div>
            <Link href="/policies" className="text-lt-orange font-semibold text-sm hover:underline flex items-center gap-1">
              See all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {featured.map((policy) => (
              <PolicyCard key={policy.id} policy={policy} />
            ))}
          </div>
        </div>
      </section>

      {/* Bundle CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="bg-gradient-to-r from-lt-navy to-blue-800 rounded-3xl p-10 text-white text-center">
          <h2 className="text-3xl font-black mb-3">Bundle & save 10% 💡</h2>
          <p className="text-blue-100 text-lg mb-6">
            Add 3 or more policies to your quote and automatically receive a 10% bundle discount.
          </p>
          <Link
            href="/policies"
            className="inline-block bg-lt-orange hover:bg-lt-orange-dark text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg"
          >
            Build My Bundle
          </Link>
        </div>
      </section>

      {/* Why mutual */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-100">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { icon: "🤝", title: "Mutual ownership", body: "You are a co-owner, not just a customer. Profits go back to you in the form of better service and lower premiums." },
            { icon: "📍", title: "Local expertise", body: "Over 20 regional companies covering all of Finland — we know your neighbourhood, risks and community." },
            { icon: "⚡", title: "Fast claims", body: "Simple claims paid within 24 hours. Complex cases within 7 days. No fine print, no surprises." },
          ].map((item) => (
            <div key={item.title} className="p-6">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-bold text-lt-navy mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
