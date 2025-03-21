
import { BlogPost } from "@/types/blog";
import { services } from "@/data/services";

// Helper function to get service image by slug
const getServiceImageBySlug = (slug: string): string => {
  const service = services.find(s => s.slug === slug);
  return service ? service.image : "/placeholder.svg";
};

export const coatingPosts: BlogPost[] = [
  {
    id: 6,
    title: "ציפוי ננו לכל חלקי הרכב",
    excerpt: "מדריך לציפוי ננו מקצועי לשמירה על הרכב",
    content: `ציפוי ננו מספק שכבת הגנה ברמה מולקולרית לכל חלקי הרכב החיצוניים. הטכנולוגיה המתקדמת מאפשרת עמידות גבוהה בפני פגעי מזג האוויר, זיהום אוויר וחומרים כימיים שונים.

    יתרונות ציפוי הננו:
    • הגנה מפני שריטות קלות
    • דחיית מים וחומרים מזהמים
    • שמירה על ברק הצבע לאורך זמן
    • הקלה על ניקוי ותחזוקת הרכב`,
    date: "2024-03-05",
    imageUrl: getServiceImageBySlug("nano-coating"),
    serviceSlug: "nano-coating",
    readTime: 3
  },
  {
    id: 7,
    title: "ציפוי ננו לעור הרכב",
    excerpt: "כיצד לשמור על ריפודי העור לאורך זמן",
    content: `ריפוד עור מוסיף יוקרה לפנים הרכב, אך מצריך תחזוקה נכונה. ציפוי ננו לעור מספק הגנה מתקדמת ששומרת על המראה והתחושה של העור לאורך זמן.

    תהליך ציפוי העור כולל:
    1. ניקוי יסודי של העור
    2. טיפול בכתמים קיימים
    3. יישום ציפוי הננו
    4. ייבוש והתקשות`,
    date: "2024-03-12",
    imageUrl: getServiceImageBySlug("leather-coating"),
    serviceSlug: "leather-coating",
    readTime: 3
  },
  {
    id: 8,
    title: "ציפוי ג'אנטים מקצועי",
    excerpt: "כיצד להגן על ג'אנטי הרכב באמצעות ציפוי ננו",
    content: `ג'אנטים איכותיים הם חלק משמעותי במראה הרכב, אך הם גם חשופים לנזקים רבים: אבק בלמים, לכלוך דרכים ופגיעות מכניות. ציפוי ננו ייעודי לג'אנטים יכול להאריך את חייהם ולשמור על מראה חדש.

    יתרונות ציפוי ננו לג'אנטים:
    • הגנה מפני אבק בלמים קורוזיבי
    • קלות בניקוי וניקיון לאורך זמן
    • שמירה על הברק המקורי
    • מניעת חמצון והצהבה`,
    date: "2024-03-07",
    imageUrl: getServiceImageBySlug("wheel-coating"),
    serviceSlug: "wheel-coating",
    readTime: 3
  }
];
