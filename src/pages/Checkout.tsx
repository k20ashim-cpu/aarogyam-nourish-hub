import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCart } from "@/hooks/useCart";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const createCheckoutSchema = (isGuest: boolean) =>
  z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    email: z.string().email("Invalid email address").max(255),
    phone: z.string().min(10, "Phone number must be at least 10 digits").max(15),
    address: z.string().min(10, "Please provide a complete address").max(500),
    password: isGuest
      ? z.string().min(6, "Password must be at least 6 characters").max(100)
      : z.string().optional(),
  });

type CheckoutFormData = z.infer<ReturnType<typeof createCheckoutSchema>>;

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isGuest = !user;

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(createCheckoutSchema(isGuest)),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
    },
  });

  // Auto-fill form with user profile data when logged in
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profile) {
          form.reset({
            name: profile.full_name || "",
            email: profile.email || user.email || "",
            phone: profile.phone || "",
            address: profile.address || "",
            password: "",
          });
        }
      }
    };

    fetchProfile();
  }, [user, form]);
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  const sendWhatsAppNotification = (orderId: string, data: CheckoutFormData) => {
    const orderItems = items
      .map((item) => `• ${item.product.name} x${item.quantity} - ${formatPrice(Number(item.product.price) * item.quantity)}`)
      .join("%0A");

    const message = `🛒 *New Order Received!*%0A%0A*Order ID:* ${orderId.slice(0, 8)}%0A%0A*Customer Details:*%0AName: ${encodeURIComponent(data.name)}%0AEmail: ${encodeURIComponent(data.email)}%0APhone: ${encodeURIComponent(data.phone)}%0AAddress: ${encodeURIComponent(data.address)}%0A%0A*Order Items:*%0A${orderItems}%0A%0A*Total Amount:* ${formatPrice(totalPrice())}%0A%0A_Order placed at: ${new Date().toLocaleString("en-IN")}_`;

    const whatsappUrl = `https://wa.me/917667227333?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsSubmitting(true);

    try {
      let userId = user?.id || null;

      // If user is not logged in, create an account automatically
      if (!userId && data.password) {
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: data.name,
            },
          },
        });

        if (signUpError) {
          // If user already exists, try to place order as guest
          if (signUpError.message.includes("already registered")) {
            toast.info("An account with this email exists. Placing order as guest.");
          } else {
            throw signUpError;
          }
        } else if (authData.user) {
          userId = authData.user.id;
          
          // Update profile with checkout details
          await supabase
            .from("profiles")
            .update({
              full_name: data.name,
              phone: data.phone,
              address: data.address,
            })
            .eq("id", userId);

          toast.success("Account created! You can now login with your email and password.");
        }
      }

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: userId,
          customer_name: data.name,
          customer_email: data.email,
          customer_phone: data.phone,
          customer_address: data.address,
          total_amount: totalPrice(),
          status: "pending",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product.id,
        product_name: item.product.name,
        quantity: item.quantity,
        unit_price: Number(item.product.price),
        total_price: Number(item.product.price) * item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Send WhatsApp notification
      sendWhatsAppNotification(order.id, data);

      clearCart();
      toast.success("Order placed successfully! 🎉");
      navigate("/order-success", { state: { orderId: order.id } });
    } catch (error: any) {
      toast.error(error.message || "Failed to place order");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container">
          <h1 className="mb-8 font-display text-3xl font-bold">
            <span className="text-gradient-nature">Checkout</span>
          </h1>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-6 font-display text-xl font-bold">Delivery Details</h2>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" {...field} />
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
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="+91 98765 43210" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Delivery Address</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter your complete delivery address"
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {isGuest && (
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Create Password</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder="Create a password for your account"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                              <p className="text-xs text-muted-foreground">
                                This will create an account so you can track your orders
                              </p>
                            </FormItem>
                          )}
                        />
                      )}

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full gap-2 bg-gradient-nature shadow-nature"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Placing Order...
                          </>
                        ) : (
                          `Place Order - ${formatPrice(totalPrice())}`
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-bold">Order Summary</h2>

                  <div className="mt-4 space-y-3">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.product.name} x {item.quantity}
                        </span>
                        <span>{formatPrice(Number(item.product.price) * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(totalPrice())}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className="text-muted-foreground">Based on your location</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between font-display text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(totalPrice())}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;