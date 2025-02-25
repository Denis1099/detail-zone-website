
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { blogPosts } from "@/data/blog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { services } from "@/data/services";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(post => post.id === id);
  const relatedService = post?.serviceSlug 
    ? services.find(service => service.slug === post.serviceSlug)
    : null;

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <article className="max-w-3xl mx-auto">
          <Button 
            variant="ghost" 
            asChild 
            className="mb-8"
          >
            <Link to="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              חזרה לבלוג
            </Link>
          </Button>

          <div className="relative aspect-[21/9] mb-8 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-black/20" />
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('he-IL')}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} דקות קריאה</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

          <div className="prose prose-invert max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                {paragraph.trim()}
              </p>
            ))}
          </div>

          {relatedService && (
            <div className="mt-12 p-6 rounded-lg glass-card">
              <h2 className="text-xl font-semibold mb-4">מעוניינים בשירות?</h2>
              <p className="text-muted-foreground mb-4">
                למידע נוסף על שירות {relatedService.title} ותיאום טיפול
              </p>
              <Button asChild>
                <Link to={`/services/${relatedService.slug}`}>
                  מעבר לדף השירות
                </Link>
              </Button>
            </div>
          )}
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};
