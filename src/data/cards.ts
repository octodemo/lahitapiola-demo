export interface Card {
  id: string;
  title: string;
  price: number;
  occasion: string;
  emoji: string;
  bgColor: string;
  textColor: string;
  category: string;
  description: string;
  trending?: boolean;
}

export const cards: Card[] = [
  {
    id: "birthday-sis",
    title: "Happy Birthday Sis 🎂",
    price: 3.99,
    occasion: "Birthday",
    emoji: "🎂",
    bgColor: "#FFD6E7",
    textColor: "#C4124F",
    category: "Birthday Cards",
    description: "A gorgeous birthday card for your amazing sister. Tell her how much she means to you.",
    trending: true,
  },
  {
    id: "birthday-best-friend",
    title: "To My Best Friend 🥳",
    price: 3.49,
    occasion: "Birthday",
    emoji: "🥳",
    bgColor: "#D6F5FF",
    textColor: "#0066CC",
    category: "Birthday Cards",
    description: "Celebrate your best friend's special day with this fun and colourful card.",
    trending: true,
  },
  {
    id: "happy-anniversary",
    title: "Happy Anniversary 💕",
    price: 4.99,
    occasion: "Anniversary",
    emoji: "💕",
    bgColor: "#FFE8F0",
    textColor: "#E8175D",
    category: "Anniversary Cards",
    description: "Mark your special milestone with this beautiful anniversary card.",
    trending: true,
  },
  {
    id: "thank-you-bunches",
    title: "Thank You Bunches 🌸",
    price: 3.49,
    occasion: "Thank You",
    emoji: "🌸",
    bgColor: "#F5FFD6",
    textColor: "#558B2F",
    category: "Thank You Cards",
    description: "Show your gratitude with this delightful floral thank you card.",
    trending: false,
  },
  {
    id: "new-baby-boy",
    title: "It's a Boy! 🍼",
    price: 3.99,
    occasion: "New Baby",
    emoji: "🍼",
    bgColor: "#D6EAFF",
    textColor: "#1565C0",
    category: "Baby Cards",
    description: "Welcome the new arrival with this adorable baby boy card.",
    trending: true,
  },
  {
    id: "new-baby-girl",
    title: "Baby Girl Arrived 🌷",
    price: 3.99,
    occasion: "New Baby",
    emoji: "🌷",
    bgColor: "#FFE0F0",
    textColor: "#AD1457",
    category: "Baby Cards",
    description: "Celebrate the arrival of a precious baby girl.",
    trending: false,
  },
  {
    id: "get-well-soon",
    title: "Get Well Soon 🌻",
    price: 3.49,
    occasion: "Get Well",
    emoji: "🌻",
    bgColor: "#FFFDE7",
    textColor: "#F57F17",
    category: "Get Well Cards",
    description: "Send a warm get well wish with this sunny card.",
    trending: false,
  },
  {
    id: "congratulations",
    title: "Congratulations! 🎉",
    price: 4.49,
    occasion: "Congratulations",
    emoji: "🎉",
    bgColor: "#F3E5F5",
    textColor: "#7B1FA2",
    category: "Congratulations Cards",
    description: "Celebrate an achievement with this eye-catching congratulations card.",
    trending: true,
  },
  {
    id: "fathers-day",
    title: "Best Dad Ever 🏆",
    price: 3.99,
    occasion: "Father's Day",
    emoji: "🏆",
    bgColor: "#E8F5E9",
    textColor: "#2E7D32",
    category: "Father's Day Cards",
    description: "Let Dad know he's the best with this special card.",
    trending: false,
  },
  {
    id: "mothers-day",
    title: "World's Best Mum 💐",
    price: 4.49,
    occasion: "Mother's Day",
    emoji: "💐",
    bgColor: "#FFF8E1",
    textColor: "#E65100",
    category: "Mother's Day Cards",
    description: "Spoil your mum with this gorgeous Mother's Day card.",
    trending: true,
  },
  {
    id: "graduation",
    title: "You Did It! 🎓",
    price: 4.49,
    occasion: "Graduation",
    emoji: "🎓",
    bgColor: "#E0F2F1",
    textColor: "#00695C",
    category: "Graduation Cards",
    description: "Celebrate their incredible achievement with this graduation card.",
    trending: false,
  },
  {
    id: "wedding-day",
    title: "Happy Wedding Day 💍",
    price: 4.99,
    occasion: "Wedding",
    emoji: "💍",
    bgColor: "#FFF9C4",
    textColor: "#9E7D00",
    category: "Wedding Cards",
    description: "Wish the happy couple a wonderful life together.",
    trending: false,
  },
];

export const occasions = ["Birthday", "Anniversary", "Thank You", "New Baby", "Get Well", "Congratulations", "Father's Day", "Mother's Day", "Graduation", "Wedding"];

export const getCardById = (id: string): Card | undefined =>
  cards.find((c) => c.id === id);

export const getTrendingCards = (): Card[] =>
  cards.filter((c) => c.trending);

export const getCardsByOccasion = (occasion: string): Card[] =>
  cards.filter((c) => c.occasion === occasion);
