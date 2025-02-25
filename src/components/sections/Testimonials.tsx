import React, { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const testimonials = [
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
    text: "אמינות ושירות שהיום לא רואים בכל מקום מהרגע שהגעתי, קיבלתי יחס חם והסבר מפורט על התהליך. הציפוי חידש את הרכב, שיפר משמעותית את הברק וההגנה של הרכב, ואני רואה את זה בכל יום מחדש. ממליץ לכל מי שרוצה שהרכב שלו יראה הכי טוב ואני עומד לעשות לרכבים הנוספים שלי גם ציפוי ננו ",
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

export const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState(null);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      const slideCount = testimonials.length;
      setCurrentSlide(((selectedIndex % slideCount) + slideCount) % slideCount);
    };

    api.on("select", onSelect);
    api.on("settle", onSelect);

    onSelect();

    return () => {
      api.off("select", onSelect);
      api.off("settle", onSelect);
    };
  }, [api]);

  const goToNext = useCallback(() => {
    if (!api) return;
    api.scrollPrev();
  }, [api]);

  const goToPrev = useCallback(() => {
    if (!api) return;
    api.scrollNext();
  }, [api]);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            מה הלקוחות אומרים
          </h2>
        </div>

        <div className="absolute left-4 md:left-0 top-1/2 mt-6 transform -translate-y-1/2 z-10">
          <button
            onClick={goToPrev}
            className="h-10 w-10 rounded-full border border-slate-200 bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary shadow-md hover:bg-slate-50 hover:border-primary/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="הקודם"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </button>
        </div>

        <div className="absolute right-4 md:right-0 top-1/2 mt-6 transform -translate-y-1/2 z-10">
          <button
            onClick={goToNext}
            className="h-10 w-10 rounded-full border border-slate-200 bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary shadow-md hover:bg-slate-50 hover:border-primary/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="הבא"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
        </div>

        <div className="overflow-hidden px-4 md:px-12">
          <Carousel
            dir="rtl"
            opts={{
              align: "center",
              loop: true,
              direction: "rtl",
              skipSnaps: false,
              dragFree: false,
              containScroll: "keepSnaps",
            }}
            className="w-full touch-pan-y"
            setApi={setApi}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="w-full md:w-1/2 lg:w-1/3">
                  <div className="p-1">
                    <Card className="glass-card max-w-80 mx-auto h-full">
                      {/* Vehicle Image - Centered with fixed width */}
                      <div className="w-80 h-80 rounded-t-lg overflow-hidden mx-auto">
                        <img
                          src={testimonial.vehicleImage || '/api/placeholder/250/150'}
                          alt={`רכב של ${testimonial.name}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 pt-0">
                        {/* Testimonial Text - Constrained to image width */}
                        <p className="text-gray-300 mb-6 text-center max-w-80 mx-auto">
                          {testimonial.text}
                        </p>

                        {/* Rating Stars */}
                        <div className="flex items-center justify-center mb-4 max-w-80 mx-auto">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${i < testimonial.rating ? "text-primary fill-primary" : "text-gray-600"}`}
                            />
                          ))}
                        </div>

                        {/* Name */}
                        <div className="font-medium text-center mb-4 max-w-80 mx-auto">
                          {testimonial.name}
                        </div>

                        {/* Profile Image - Centered within constrained width */}
                        <div className="flex justify-center max-w-80 mx-auto">
                          <div className="w-20 h-20 rounded-full overflow-hidden shadow-md">
                            <img
                              src={testimonial.profileImage || '/api/placeholder/200/200'}
                              alt={`תמונה של ${testimonial.name}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-8 bg-primary"
                    : "w-2.5 bg-gray-300"
                }`}
                onClick={() => api?.scrollTo(index)}
                aria-label={`עבור לדף ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;