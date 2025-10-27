import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { insertEquipmentSchema, categories, type InsertEquipment } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { CheckCircle2, Tractor } from "lucide-react";

export default function ListEquipment() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const form = useForm<InsertEquipment>({
    resolver: zodResolver(insertEquipmentSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      imageUrl: "",
      pricePerDay: 0,
      pricePerHour: 0,
      location: "",
      ownerName: "",
      ownerContact: "",
      condition: "",
      year: new Date().getFullYear(),
      brand: "",
      specifications: "",
      isAvailable: "true",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertEquipment) => {
      return await apiRequest("POST", "/api/equipment", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/equipment"] });
      toast({
        title: "Equipment Listed Successfully!",
        description: "Your equipment is now available for rent.",
      });
      form.reset();
      setLocation("/browse");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to list equipment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertEquipment) => {
    createMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Tractor className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">List Your Equipment</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share your idle farming equipment and earn extra income while helping fellow farmers
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Equipment Details</CardTitle>
            <CardDescription>
              Fill in the information about the equipment you want to rent out
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Basic Information</h3>
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Equipment Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., John Deere 5310 Tractor" {...field} data-testid="input-equipment-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-category">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your equipment, its features, and condition..."
                            rows={4}
                            {...field}
                            data-testid="input-description"
                          />
                        </FormControl>
                        <FormDescription>
                          Provide a detailed description to help renters understand what you're offering
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Equipment Details */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-semibold">Equipment Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="brand"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brand</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., John Deere" {...field} data-testid="input-brand" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 2020"
                              {...field}
                              value={value || ""}
                              onChange={(e) => onChange(e.target.valueAsNumber || 0)}
                              data-testid="input-year"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="condition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Condition *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-condition">
                              <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Excellent">Excellent</SelectItem>
                            <SelectItem value="Good">Good</SelectItem>
                            <SelectItem value="Fair">Fair</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="specifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specifications</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Key specifications (one per line)&#10;e.g.,&#10;50 HP Engine&#10;4WD Drive&#10;Hydraulic Lift"
                            rows={5}
                            {...field}
                            data-testid="input-specifications"
                          />
                        </FormControl>
                        <FormDescription>
                          List key specifications, one per line
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/image.jpg"
                            {...field}
                            data-testid="input-image-url"
                          />
                        </FormControl>
                        <FormDescription>
                          Provide a URL to a high-quality image of your equipment
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Pricing */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-semibold">Pricing</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="pricePerDay"
                      render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel>Price per Day (₹) *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 2000"
                              {...field}
                              value={value || ""}
                              onChange={(e) => onChange(e.target.valueAsNumber || 0)}
                              data-testid="input-price-per-day"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="pricePerHour"
                      render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel>Price per Hour (₹)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 250"
                              {...field}
                              value={value || ""}
                              onChange={(e) => onChange(e.target.valueAsNumber || 0)}
                              data-testid="input-price-per-hour"
                            />
                          </FormControl>
                          <FormDescription>Optional hourly rate</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Location & Contact */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-semibold">Location & Contact</h3>
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Pune, Maharashtra" {...field} data-testid="input-location" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ownerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Rajesh Kumar" {...field} data-testid="input-owner-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ownerContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., +91 98765 43210" {...field} data-testid="input-owner-contact" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Benefits */}
                <div className="bg-card p-6 rounded-lg border space-y-3">
                  <h3 className="font-semibold mb-3">Why List on KrishiLink?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Earn extra income from idle equipment</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Connect with verified renters</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Set your own rental terms</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Help fellow farmers grow</span>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={createMutation.isPending}
                  data-testid="button-submit-listing"
                >
                  {createMutation.isPending ? "Listing Equipment..." : "List Equipment"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
