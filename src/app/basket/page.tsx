"use client";

import { useBasket } from "@/context/BasketContext";
import { Trash2, Plus, Minus, ShoppingBasket } from "lucide-react";
import Link from "next/link";

const DELIVERY = 2.99;

// TODO: Add promo code field

export default function BasketPage() {
  const { items, removeItem, updateQuantity, clearBasket } = useBasket();

  const subtotal = items.reduce((sum, item) => sum + item.card.price * item.quantity, 0);
  const total = subtotal + (items.length > 0 ? DELIVERY : 0);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <ShoppingBasket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-black text-gray-900 mb-2">Your basket is empty</h1>
        <p className="text-gray-500 mb-8">Add some cards or gifts to get started!</p>
        <Link href="/cards" className="btn-primary inline-block">
          Browse Cards
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-black text-gray-900">Your Basket</h1>
        <button
          onClick={clearBasket}
          className="text-sm text-gray-400 hover:text-red-500 transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.card.id}
              className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 flex gap-4"
            >
              {/* Card visual */}
              <div
                className="w-20 h-20 rounded-xl flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: item.card.bgColor }}
              >
                <span className="text-3xl">{item.card.emoji}</span>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 truncate">{item.card.title}</h3>
                {item.message && (
                  <p className="text-xs text-gray-500 italic truncate mt-0.5">
                    &quot;{item.message}&quot;
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-0.5">{item.card.occasion}</p>

                <div className="flex items-center justify-between mt-3">
                  {/* Quantity controls */}
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.card.id, item.quantity - 1)}
                      className="p-1.5 hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.card.id, item.quantity + 1)}
                      className="p-1.5 hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-moonpig-pink">
                      £{(item.card.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeItem(item.card.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Link
            href="/cards"
            className="block text-center text-moonpig-pink font-semibold text-sm py-3 border-2 border-dashed border-pink-200 rounded-2xl hover:bg-pink-50 transition-colors"
          >
            + Add more cards
          </Link>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 sticky top-24">
            <h2 className="font-bold text-gray-800 text-lg mb-5">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-medium">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className="font-medium">£{DELIVERY.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-black text-lg text-gray-900">
                <span>Total</span>
                <span className="text-moonpig-pink">£{total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full btn-primary mt-6">
              Checkout Securely 🔒
            </button>

            <div className="mt-4 text-center text-xs text-gray-400 space-y-1">
              <p>🔒 SSL encrypted checkout</p>
              <p>💳 Visa, Mastercard, PayPal accepted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
