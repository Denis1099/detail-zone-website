
// Define testimonial type
export type Testimonial = {
  rating: number;
  text: string;
  name: string;
  profileImage: string;
  vehicleImage: string;
};

export const testimonials: Testimonial[] = [
  {
    rating: 5,
    text: "תודה לכם אלופים, אהבתי את השירות הכל קל ומהיר והתוצאה מבריקה כמו שלא ראיתי את האופנוע כשהוא חדש",
    name: "מתן ניסטור",
    profileImage: "/testimonial-profiles/matan-pfp.webp",
    vehicleImage: "/testimonial-cars/matan-motorcycle.webp",
  },
  {
    rating: 5,
    text: "עבודה טובה מאוד בדיטייל זון. עשו לי ציפוי ננו לרכב והוא נראה מדהים. שירות מהיר ומקצועי, מומלץ בחום.",
    name: "פז פליישר",
    profileImage: "/testimonial-profiles/paz-pfp.webp",
    vehicleImage: "/testimonial-cars/paz-car.webp",
  },
  {
    rating: 5,
    text: "אחרי שהם עשו לי ציפוי למרצדס G class הכנסתי גם את ה מרצדס מייבאך השחורה לציפוי ננו ולמרות שצבע שחור זה הצבע הכי קשה להוציא אותו יפה, הם הוציאו אותה מבריקה מאוד כל רכב שלי אני מביא אליהם",
    name: "יקיר אבעדי",
    profileImage: "/testimonial-profiles/yakir-pfp.webp",
    vehicleImage: "/testimonial-cars/yakir-car.webp",
  },
  {
    rating: 5,
    text: "שירות ברמה הכי גבוהה שפגשתי! דניאל הסביר לי הכל בסבלנות, עמד במה שהבטיח, והתוצאה פשוט מדהימה, נראה כמו מראה פשות. הרכב נראה מבריק וחלק, והלכלוך לא נתפס עליו בכלל. ממליץ בחום",
    name: "שרון אדרי",
    profileImage: "/testimonial-profiles/sharon-edri-pfp.webp",
    vehicleImage: "/testimonial-cars/sharon-car.webp",
  },
  {
    rating: 5,
    text: "ציפוי ננו ברמה אחרת! מהשיחה הראשונה ועד קבלת הרכב – הכל היה מקצועי, ברור ועם יחס אישי.  התוצאה עלתה על הציפיות שלי, והכי חשוב – קיבלתי בדיוק מה שהובטח, בלי עיכובים",
    name: "אור רם",
    profileImage: "/testimonial-profiles/or-ram-pfp.webp",
    vehicleImage: "/testimonial-cars/or-car.webp",
  },
  {
    rating: 5,
    text: "אמינות ושירות שהיום לא רואים בכל מקום מהרגע שהגעתי, קיבלתי יחס חם והסבר מפורט על התהליך. הציפוי חידש את הרכב, שיפר משמעותית את הברק וההגנה של הרכב, ואני רואה את זה בכל יום מחדש. ממליץ לכל מי שרוצה שהרכב שלו יראה הכי טוב ",
    name: "דוד אבירם",
    profileImage: "/testimonial-profiles/david-aviram-pfp.webp",
    vehicleImage: "/testimonial-cars/david-car.webp",
  },
  {
    rating: 5,
    text: "תודה על השירות והמקצועיות, בהתחלה התלבטתי על התהליך אבל אחרי שהסברתם לי וכשראיתי בעיניים את השינוי על רכב חדש כמובן שאני מרוצה ואחזור שוב כדי לשמור על התוצאה תודה לכם ",
    name: "יוחאי מנדבי",
    profileImage: "/testimonial-profiles/yohai-pfp.webp",
    vehicleImage: "/testimonial-cars/yohai-car.webp",
  },
];
