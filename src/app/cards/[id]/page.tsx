"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { getCardById } from "@/data/cards";
import CardImage from "@/components/CardImage";
import { useBasket } from "@/context/BasketContext";
import { ShoppingBasket, Check, ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";

// TODO: Add Copilot-suggested add-ons (e.g. gift wrap, balloon)

export default function CardDetailPage({ params }: { params: { id: string } }) {
  const card = getCardById(params.id);
  if (!card) notFound();

  const { addItem } = useBasket();
  const [message, setMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToBasket = () => {
    addItem(card, message, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-moonpig-pink">Home</Link>
        <span>/</span>
        <Link href="/cards" className="hover:text-moonpig-pink">Cards</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">{card.title}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        {/* Left: Card Preview */}
        <div className="space-y-4">
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <CardImage card={card} size="lg" />
          </div>

          {/* Live message preview */}
          {message && (
            <div
              className="rounded-2xl p-6 border-2 border-dashed"
              style={{ borderColor: card.textColor + "40", backgroundColor: card.bgColor }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: card.textColor }}>
                Your message preview
              </p>
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap italic">
                {message}
              </p>
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-moonpig-pink bg-pink-50 px-3 py-1 rounded-full mb-3">
            {card.occasion}
          </span>
          <h1 className="text-3xl font-black text-gray-900 mb-2">{card.title}</h1>
          <p className="text-gray-500 mb-4 leading-relaxed">{card.description}</p>

          <div className="text-4xl font-black text-moonpig-pink mb-6">
            £{card.price.toFixed(2)}
            <span className="text-sm text-gray-400 font-normal ml-2">+ £2.99 delivery</span>
          </div>

          {/* Message Input */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ✍️ Add your personal message
            </label>
            <textarea
              rows={4}
              maxLength={300}
              placeholder="Write something heartfelt… e.g. Happy Birthday! Hope your day is as amazing as you are! 🎉"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-moonpig-pink focus:border-transparent resize-none transition-all"
            />
            <p className="text-xs text-gray-400 text-right mt-1">{message.length}/300</p>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-semibold text-gray-700">Quantity</span>
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-gray-50 transition-colors"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 font-semibold text-gray-800 min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-gray-50 transition-colors"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add to Basket */}
          <button
            onClick={handleAddToBasket}
            className={`w-full btn-primary flex items-center justify-center gap-3 text-base ${added ? "!bg-green-500 !shadow-green-200" : ""}`}
          >
            {added ? (
              <>
                <Check className="w-5 h-5" />
                Added to Basket!
              </>
            ) : (
              <>
                <ShoppingBasket className="w-5 h-5" />
                Add to Basket — £{(card.price * quantity).toFixed(2)}
              </>
            )}
          </button>

          {added && (
            <Link
              href="/basket"
              className="block text-center text-moonpig-pink font-semibold text-sm mt-3 hover:underline"
            >
              View Basket →
            </Link>
          )}

          {/* Delivery info */}
          <div className="mt-6 bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
            <p>🚚 <strong>Next Day Delivery</strong> available on orders before 9pm</p>
            <p>📦 <strong>Standard Delivery</strong> £2.99 — arrives in 2–3 days</p>
            <p>✅ <strong>Satisfaction Guaranteed</strong> — not happy? We&apos;ll resend for free</p>
          </div>
        </div>
      </div>
    </div>
  );
}
