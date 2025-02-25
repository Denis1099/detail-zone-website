
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl: string;
  serviceSlug?: string;
  readTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: "nano-coating-guide",
    title: "ציפוי ננו לכל חלקי הרכב",
    excerpt: "מדריך מקיף על היתרונות והתהליך של ציפוי ננו לרכב",
    content: `ציפוי ננו הוא אחד הפתרונות המתקדמים ביותר להגנה על הרכב שלכם. הטכנולוגיה החדשנית מספקת שכבת הגנה שקופה לחלוטין ברמה המולקולרית, המגנה על צבע הרכב מפני נזקי סביבה, שריטות קלות, וקרינת UV.

    יתרונות הציפוי:
    • הגנה ארוכת טווח על צבע הרכב
    • דחיית מים משופרת
    • הפחתת הצטברות אבק ולכלוך
    • שמירה על הברק המקורי
    • עמידות משופרת בפני שריטות קלות
    
    התהליך כולל ניקוי יסודי של הרכב, תיקון פגמים קלים בצבע במידת הצורך, והחלת שכבת הציפוי בצורה מקצועית. התוצאה היא רכב מוגן יותר, נקי יותר, ומבריק יותר לאורך זמן.`,
    date: "2024-03-15",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1470&auto=format&fit=crop",
    serviceSlug: "nano-coating",
    readTime: 5
  }
];
