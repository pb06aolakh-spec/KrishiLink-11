import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  MapPin,
  Star,
  Calendar,
  User,
  Mail,
  Phone,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import type { Equipment, InsertInquiry } from "@shared/schema";
import { useState } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema } from "@shared/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function EquipmentDetail() {
  const [, params] = useRoute("/equipment/:id");
  const { toast } = useToast();
  const [inquiryDialogOpen, setInquiryDialogOpen] = useState(false);

  const { data: equipment, isLoading } = useQuery<Equipment>({
    queryKey: ["/api/equipment", params?.id],
    enabled: !!params?.id,
  });

  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      equipmentId: params?.id || "",
      name: "",
      email: "",
      phone: "",
      message: "",
      startDate: "",
      endDate: "",
    },
  });

  const inquiryMutation = useMutation({
    mutationFn: async (data: InsertInquiry) => {
      return await apiRequest("POST", "/api/inquiries", data);
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Sent!",
        description: "The equipment owner will contact you soon.",
      });
      setInquiryDialogOpen(false);
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send inquiry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertInquiry) => {
    inquiryMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="aspect-video w-full rounded-lg" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div>
              <Skeleton className="h-96 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!equipment) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-12 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Equipment Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The equipment you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/browse">
            <Button>Browse All Equipment</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const specifications = equipment.specifications
    ? equipment.specifications.split("\n").filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <Link href="/browse">
          <Button variant="ghost" className="mb-6" data-testid="button-back">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src={equipment.imageUrl}
                alt={equipment.name}
                className="w-full h-full object-cover"
                data-testid="img-equipment"
              />
            </div>

            {/* Details */}
            <div>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-equipment-name">
                    {equipment.name}
                  </h1>
                  <div className="flex items-center gap-4 flex-wrap">
                    <Badge variant="secondary">{equipment.category}</Badge>
                    {equipment.brand && (
                      <span className="text-muted-foreground">
                        {equipment.brand} {equipment.year && `• ${equipment.year}`}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="font-semibold">{equipment.rating}</span>
                  <span className="text-muted-foreground">
                    ({equipment.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span data-testid="text-location">{equipment.location}</span>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-description">
                    {equipment.description}
                  </p>
                </CardContent>
              </Card>

              {specifications.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {specifications.map((spec, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Equipment Owner</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold" data-testid="text-owner-name">{equipment.ownerName}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>Verified Owner</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{equipment.ownerContact}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <div className="text-3xl font-bold text-primary mb-1" data-testid="text-price-per-day">
                    ₹{equipment.pricePerDay}
                    <span className="text-base font-normal text-muted-foreground">/day</span>
                  </div>
                  {equipment.pricePerHour && (
                    <div className="text-sm text-muted-foreground">
                      ₹{equipment.pricePerHour}/hour
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Condition</span>
                    <Badge variant="outline">{equipment.condition}</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Availability</span>
                    {equipment.isAvailable === 'true' ? (
                      <Badge variant="default" className="bg-primary/10 text-primary border-primary/20">
                        <Calendar className="h-3 w-3 mr-1" />
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Currently Booked</Badge>
                    )}
                  </div>
                </div>

                <Dialog open={inquiryDialogOpen} onOpenChange={setInquiryDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full"
                      size="lg"
                      disabled={equipment.isAvailable !== 'true'}
                      data-testid="button-request-booking"
                    >
                      Request Booking
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Request Booking</DialogTitle>
                      <DialogDescription>
                        Send an inquiry to the equipment owner. They will contact you to confirm availability and rental terms.
                      </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Your Name</FormLabel>
                              <FormControl>
                                <Input {...field} data-testid="input-inquiry-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" {...field} data-testid="input-inquiry-email" />
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
                                <Input {...field} data-testid="input-inquiry-phone" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} data-testid="input-inquiry-start-date" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} data-testid="input-inquiry-end-date" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message (Optional)</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="Any specific requirements or questions..."
                                  rows={3}
                                  data-testid="input-inquiry-message"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={inquiryMutation.isPending}
                          data-testid="button-submit-inquiry"
                        >
                          {inquiryMutation.isPending ? "Sending..." : "Send Inquiry"}
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>

                <div className="pt-4 border-t space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Verified equipment and owner</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Flexible rental terms</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Direct communication with owner</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
