import { Policy } from "@/data/policies";
import Link from "next/link";

interface PolicyImageProps {
  policy: Policy;
  size?: "sm" | "md" | "lg";
}

export default function PolicyImage({ policy, size = "md" }: PolicyImageProps) {
  const sizeClasses = { sm: "h-40", md: "h-52", lg: "h-72" };

  return (
    <div
      className={`w-full ${sizeClasses[size]} rounded-xl flex items-center justify-center relative overflow-hidden`}
      style={{ backgroundColor: policy.bgColor }}
    >
      {/* Decorative circles */}
      <div
        className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-20"
        style={{ backgroundColor: policy.textColor }}
      />
      <div
        className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full opacity-10"
        style={{ backgroundColor: policy.textColor }}
      />
      <span className="text-6xl drop-shadow-sm z-10 select-none">{policy.emoji}</span>
      <div className="absolute bottom-3 left-0 right-0 text-center px-2">
        <p className="text-xs font-semibold" style={{ color: policy.textColor }}>
          {policy.shortTitle}
        </p>
      </div>
    </div>
  );
}

export function PolicyCard({ policy }: { policy: Policy }) {
  return (
    <Link href={`/policies/${policy.id}`} className="group block">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover">
        <PolicyImage policy={policy} size="md" />
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 text-sm leading-snug group-hover:text-lt-navy transition-colors">
            {policy.title}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lt-orange font-bold text-lg">
              €{policy.monthlyPremium.toFixed(2)}
              <span className="text-xs text-gray-400 font-normal">/mo</span>
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full capitalize">
              {policy.type}
            </span>
          </div>
          <button className="w-full mt-3 bg-lt-navy hover:bg-lt-navy-dark text-white font-semibold py-2 px-4 rounded-full transition-all text-sm">
            Get Quote
          </button>
        </div>
      </div>
    </Link>
  );
}
