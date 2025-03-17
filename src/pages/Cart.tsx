import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingCart, CreditCard, Plus, Minus } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const checkoutSchema = z.object({
  fullName: z.string().min(2, { message: "נא להזין שם מלא" }),
  phone: z.string().min(9, { message: "נא להזין מספר טלפון תקין" }),
  email: z.string().email({ message: "נא להזין כתובת אימייל תקינה" }),
  address: z.string().min(5, { message: "נא להזין כתובת מלאה" }),
  city: z.string().min(2, { message: "נא להזין עיר" }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const formatPrice = (price: number) => {
  return parseFloat(price.toFixed(2));
};

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [coupon, setCoupon] = useState("");
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
    },
  });

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("הסל שלך ריק");
      return;
    }
    setShowCheckoutForm(true);
  };

  const onSubmitForm = (data: CheckoutFormValues) => {
    // Here we would integrate with GrowAPI
    console.log("Checkout data:", data);
    console.log("Cart data:", cartItems);
    
    toast.success("הזמנתך התקבלה בהצלחה!");
    clearCart();
    setShowCheckoutForm(false);
  };

  if (cartItems.length === 0 && !showCheckoutForm) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto py-12 pt-24 flex flex-col items-center justify-center flex-grow">
          <div className="text-center mb-8">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <h1 className="text-3xl font-bold mb-4">הסל שלך ריק</h1>
            <p className="text-muted-foreground">אין מוצרים בסל הקניות שלך כרגע</p>
          </div>
          <Link to="/shop">
            <Button className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              המשך בקניות
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (showCheckoutForm) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto py-12 pt-24">
          <h1 className="text-4xl font-bold mb-8 text-center">השלמת הזמנה</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>פרטי משלוח</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>שם מלא</FormLabel>
                              <FormControl>
                                <Input placeholder="ישראל ישראלי" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>טלפון</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="050-0000000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>אימייל</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>כתובת</FormLabel>
                            <FormControl>
                              <Input placeholder="רחוב ומספר בית" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>עיר</FormLabel>
                            <FormControl>
                              <Input placeholder="תל אביב" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex gap-2 justify-end">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setShowCheckoutForm(false)}
                        >
                          חזרה לסל
                        </Button>
                        <Button type="submit" className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          המשך לתשלום
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>סיכום הזמנה</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.name} x{item.quantity}</span>
                        <span>₪{formatPrice(item.price * (item.quantity || 1))}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>סה"כ מוצרים</span>
                      <span>₪{formatPrice(getCartTotal())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>משלוח</span>
                      <span>₪0.00</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>סה"כ לתשלום</span>
                    <span>₪{formatPrice(getCartTotal())}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-12 pt-24">
        <h1 className="text-4xl font-bold mb-8 text-center">סל הקניות שלי</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>המוצרים שלי ({cartItems.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col md:flex-row gap-4 py-4 border-b border-border last:border-0">
                    <div className="aspect-square w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg select-text">{item.name}</h3>
                      <p className="text-muted-foreground text-sm mb-2 line-clamp-1 select-text">{item.description}</p>
                      <p className="font-bold">₪{formatPrice(item.price)}</p>
                    </div>
                    
                    <div className="flex flex-col items-end justify-between">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 rounded-r-none"
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <div className="h-8 w-10 flex items-center justify-center border-y border-input">
                          {item.quantity || 1}
                        </div>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 rounded-l-none"
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>סיכום הזמנה</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="coupon">קוד קופון</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="coupon" 
                      value={coupon} 
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="הזן קוד קופון"
                    />
                    <Button variant="outline">החל</Button>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>סה"כ מוצרים</span>
                    <span>₪{formatPrice(getCartTotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>משלוח</span>
                    <span>₪0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>הנחה</span>
                    <span>₪0.00</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-bold text-lg">
                  <span>סה"כ לתשלום</span>
                  <span>₪{formatPrice(getCartTotal())}</span>
                </div>
                
                <Button 
                  className="w-full mt-4 flex items-center gap-2"
                  onClick={handleCheckout}
                >
                  <CreditCard className="w-4 h-4" />
                  מעבר לתשלום
                </Button>
                
                <Link to="/shop">
                  <Button variant="outline" className="w-full mt-2">
                    המשך בקניות
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
