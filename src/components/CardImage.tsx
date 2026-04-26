import { Card as CardType } from "@/data/cards";
import Link from "next/link";

interface CardImageProps {
  card: CardType;
  size?: "sm" | "md" | "lg";
}

export default function CardImage({ card, size = "md" }: CardImageProps) {
  const sizeClasses = {
    sm: "h-40",
    md: "h-52",
    lg: "h-72",
  };

  return (
    <div
      className={`w-full ${sizeClasses[size]} rounded-xl flex items-center justify-center relative overflow-hidden`}
      style={{ backgroundColor: card.bgColor }}
    >
      {/* Decorative circles */}
      <div
        className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-20"
        style={{ backgroundColor: card.textColor }}
      />
      <div
        className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full opacity-10"
        style={{ backgroundColor: card.textColor }}
      />
      {/* Emoji */}
      <span className="text-6xl drop-shadow-sm z-10 select-none">{card.emoji}</span>
      {/* Card text */}
      <div className="absolute bottom-3 left-0 right-0 text-center px-2">
        <p className="text-xs font-semibold" style={{ color: card.textColor }}>
          {card.title}
        </p>
      </div>
    </div>
  );
}

export function ProductCard({ card }: { card: CardType }) {
  return (
    <Link href={`/cards/${card.id}`} className="group block">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover">
        <CardImage card={card} size="md" />
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 text-sm leading-snug group-hover:text-moonpig-pink transition-colors">
            {card.title}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-moonpig-pink font-bold text-lg">
              £{card.price.toFixed(2)}
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {card.occasion}
            </span>
          </div>
          <button className="w-full mt-3 btn-primary text-sm py-2 px-4">
            Personalise
          </button>
        </div>
      </div>
    </Link>
  );
}
