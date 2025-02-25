
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
  },
  {
    id: "interior-detailing-guide",
    title: "דיטיילינג וחידוש פנים הרכב",
    excerpt: "כל מה שצריך לדעת על תהליך הדיטיילינג המקצועי לפנים הרכב",
    content: `דיטיילינג מקצועי לפנים הרכב הוא תהליך מקיף שנועד להחזיר את פנים הרכב למצב חדש ככל האפשר. התהליך כולל ניקוי עמוק של כל חלקי הפנים, כולל ריפוד, שטיחים, לוח המחוונים והקונסולה המרכזית.`,
    date: "2024-03-14",
    imageUrl: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=1374&auto=format&fit=crop",
    serviceSlug: "interior-detailing",
    readTime: 4
  },
  {
    id: "leather-coating-benefits",
    title: "ציפוי ננו לעור - שמירה על הריפוד",
    excerpt: "הגנה מתקדמת על ריפודי העור ברכב",
    content: `ציפוי ננו לעור הוא פתרון מתקדם להגנה על ריפודי העור ברכב. הציפוי מספק שכבת הגנה בלתי נראית המונעת ספיגת נוזלים, מקלה על הניקוי ומאריכה את חיי העור.`,
    date: "2024-03-13",
    imageUrl: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?q=80&w=1469&auto=format&fit=crop",
    serviceSlug: "leather-coating",
    readTime: 3
  },
  {
    id: "wheel-protection",
    title: "ציפוי ננו לג׳אנטים",
    excerpt: "הגנה מושלמת לחישוקי הרכב",
    content: `ציפוי ננו לג'אנטים מספק הגנה מתקדמת מפני אבק בלמים, לכלוך וקורוזיה. הציפוי מקל על ניקוי הג'אנטים ושומר על המראה המבריק שלהם לאורך זמן.`,
    date: "2024-03-12",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1470&auto=format&fit=crop",
    serviceSlug: "wheel-coating",
    readTime: 3
  },
  {
    id: "ppf-protection-guide",
    title: "הגנה מקסימלית עם ציפוי PPF",
    excerpt: "כל מה שצריך לדעת על ציפוי PPF להגנה משריטות",
    content: `ציפוי PPF הוא פתרון ההגנה המתקדם ביותר לצבע הרכב. השכבה השקופה מספקת הגנה מקסימלית מפני שריטות, אבנים מתעופפות ופגעי מזג האוויר.`,
    date: "2024-03-11",
    imageUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=1470&auto=format&fit=crop",
    serviceSlug: "ppf-protection",
    readTime: 4
  },
  {
    id: "paint-correction",
    title: "חידוש צבע ופוליש מקצועי",
    excerpt: "מדריך מקיף לתהליך חידוש צבע הרכב",
    content: `תהליך הפוליש המקצועי כולל מספר שלבים המיועדים להסיר שריטות, סימני סיבוב ופגמים בצבע הרכב. התהליך מחזיר את הברק המקורי ומכין את הרכב לציפוי מגן.`,
    date: "2024-03-10",
    imageUrl: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1470&auto=format&fit=crop",
    serviceSlug: "paint-correction",
    readTime: 5
  },
  {
    id: "pre-sale-preparation",
    title: "הכנת רכב למכירה",
    excerpt: "איך להעלות את ערך הרכב לפני מכירה",
    content: `הכנה מקצועית של הרכב למכירה כוללת סדרת טיפולים שנועדו להעלות את ערך הרכב ולהרשים קונים פוטנציאליים. התהליך כולל חידוש פנים וחוץ הרכב.`,
    date: "2024-03-09",
    imageUrl: "https://images.unsplash.com/photo-1439337153520-7082a56a81f4?q=80&w=1470&auto=format&fit=crop",
    serviceSlug: "pre-sale",
    readTime: 4
  },
  {
    id: "paint-repair-guide",
    title: "תיקוני צבע מקצועיים",
    excerpt: "מדריך לתיקון פגמים בצבע הרכב",
    content: `תיקוני צבע מקצועיים דורשים מיומנות וציוד מתקדם. במאמר זה נסביר על התהליך המדויק של תיקון שריטות, מכות ופגמים בצבע הרכב.`,
    date: "2024-03-08",
    imageUrl: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1374&auto=format&fit=crop",
    serviceSlug: "paint-repair",
    readTime: 4
  }
];
