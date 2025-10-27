import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { EquipmentCard } from "@/components/equipment-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { categories, type Equipment } from "@shared/schema";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Browse() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [filterOpen, setFilterOpen] = useState(false);

  const { data: equipment, isLoading } = useQuery<Equipment[]>({
    queryKey: ["/api/equipment"],
  });

  const filteredEquipment = equipment?.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.pricePerDay - b.pricePerDay;
      case "price-high":
        return b.pricePerDay - a.pricePerDay;
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="category-filter" className="mb-3 block">Category</Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger id="category-filter" data-testid="select-category">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {(selectedCategory !== "all" || searchQuery) && (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            setSelectedCategory("all");
            setSearchQuery("");
          }}
          data-testid="button-clear-filters"
        >
          <X className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Browse Equipment</h1>
          <p className="text-muted-foreground">
            Discover quality farming equipment available for rent in your area
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, location, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search"
              />
            </div>
            
            <div className="flex gap-2">
              <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="sm:hidden" data-testid="button-filters-mobile">
                    <SlidersHorizontal className="h-5 w-5 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]" data-testid="select-sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(selectedCategory !== "all" || searchQuery) && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedCategory !== "all" && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                  className="h-7"
                >
                  {selectedCategory}
                  <X className="ml-1 h-3 w-3" />
                </Button>
              )}
              {searchQuery && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="h-7"
                >
                  Search: "{searchQuery}"
                  <X className="ml-1 h-3 w-3" />
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden sm:block">
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5" />
                  Filters
                </h2>
                <FilterContent />
              </CardContent>
            </Card>
          </aside>

          {/* Equipment Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i}>
                    <Skeleton className="aspect-[4/3] w-full" />
                    <CardContent className="p-4 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-8 w-1/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredEquipment && filteredEquipment.length > 0 ? (
              <>
                <div className="mb-4 text-sm text-muted-foreground">
                  <span data-testid="text-results-count">
                    Showing {filteredEquipment.length} {filteredEquipment.length === 1 ? 'result' : 'results'}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredEquipment.map((item) => (
                    <EquipmentCard key={item.id} equipment={item} />
                  ))}
                </div>
              </>
            ) : (
              <Card className="p-12 text-center">
                <div className="max-w-md mx-auto">
                  <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No equipment found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or filters to find what you're looking for
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                    data-testid="button-reset-search"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
