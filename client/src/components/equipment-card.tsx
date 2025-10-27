import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Calendar } from "lucide-react";
import { Link } from "wouter";
import type { Equipment } from "@shared/schema";

interface EquipmentCardProps {
  equipment: Equipment;
}

export function EquipmentCard({ equipment }: EquipmentCardProps) {
  return (
    <Link href={`/equipment/${equipment.id}`}>
      <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all cursor-pointer h-full" data-testid={`card-equipment-${equipment.id}`}>
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={equipment.imageUrl}
            alt={equipment.name}
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg line-clamp-1" data-testid={`text-equipment-name-${equipment.id}`}>
              {equipment.name}
            </h3>
            <Badge variant="secondary" className="shrink-0 text-xs">
              {equipment.category}
            </Badge>
          </div>

          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-medium">{equipment.rating}</span>
            <span className="text-muted-foreground">({equipment.reviewCount})</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="truncate" data-testid={`text-location-${equipment.id}`}>{equipment.location}</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <div className="text-2xl font-bold text-primary" data-testid={`text-price-${equipment.id}`}>
                ₹{equipment.pricePerDay}
                <span className="text-sm font-normal text-muted-foreground">/day</span>
              </div>
              {equipment.pricePerHour && (
                <div className="text-xs text-muted-foreground">
                  ₹{equipment.pricePerHour}/hour
                </div>
              )}
            </div>
            {equipment.isAvailable === 'true' ? (
              <Badge variant="default" className="bg-primary/10 text-primary border-primary/20">
                <Calendar className="h-3 w-3 mr-1" />
                Available
              </Badge>
            ) : (
              <Badge variant="secondary">Booked</Badge>
            )}
          </div>

          {equipment.brand && (
            <div className="text-xs text-muted-foreground">
              {equipment.brand} {equipment.year && `• ${equipment.year}`}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
