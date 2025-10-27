import { type Equipment, type InsertEquipment, type Inquiry, type InsertInquiry } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getAllEquipment(): Promise<Equipment[]>;
  getEquipment(id: string): Promise<Equipment | undefined>;
  createEquipment(equipment: InsertEquipment): Promise<Equipment>;
  updateEquipment(id: string, equipment: Partial<InsertEquipment>): Promise<Equipment | undefined>;
  deleteEquipment(id: string): Promise<boolean>;
  
  getAllInquiries(): Promise<Inquiry[]>;
  getInquiry(id: string): Promise<Inquiry | undefined>;
  getInquiriesByEquipment(equipmentId: string): Promise<Inquiry[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
}

export class MemStorage implements IStorage {
  private equipment: Map<string, Equipment>;
  private inquiries: Map<string, Inquiry>;

  constructor() {
    this.equipment = new Map();
    this.inquiries = new Map();
    this.seedData();
  }

  private seedData() {
    const sampleEquipment: InsertEquipment[] = [
      {
        name: "John Deere 5310 Tractor",
        category: "Tractors",
        description: "Premium 55 HP tractor with 4WD drive system. Perfect for all farming operations including plowing, tilling, and hauling. Well-maintained and serviced regularly. Includes basic implements.",
        imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop",
        pricePerDay: 2500,
        pricePerHour: 350,
        location: "Pune, Maharashtra",
        ownerName: "Rajesh Patil",
        ownerContact: "+91 98765 43210",
        condition: "Excellent",
        year: 2021,
        brand: "John Deere",
        specifications: "55 HP Engine\n4WD Drive System\nHydraulic Lift Capacity: 1600 kg\nPower Steering\nComfortable Operator Seat",
        isAvailable: "true",
        rating: 5,
        reviewCount: 24,
      },
      {
        name: "Mahindra Arjun 605 DI",
        category: "Tractors",
        description: "Powerful 60 HP tractor suitable for heavy-duty farming. Features modern technology and excellent fuel efficiency. Ideal for large farms and intensive agricultural work.",
        imageUrl: "https://images.unsplash.com/photo-1589479218876-f0f29f08a0b5?w=800&auto=format&fit=crop",
        pricePerDay: 2800,
        pricePerHour: 400,
        location: "Nashik, Maharashtra",
        ownerName: "Suresh Kumar",
        ownerContact: "+91 98234 56789",
        condition: "Good",
        year: 2020,
        brand: "Mahindra",
        specifications: "60 HP Engine\n2200 kg Lifting Capacity\nMulti-speed Gearbox\nOil-immersed Brakes\nFuel Efficient Engine",
        isAvailable: "true",
        rating: 5,
        reviewCount: 18,
      },
      {
        name: "New Holland TC5070 Combine Harvester",
        category: "Harvesters",
        description: "Advanced combine harvester with efficient grain collection and minimal losses. Perfect for wheat, rice, and other cereal crops. Large grain tank capacity.",
        imageUrl: "https://images.unsplash.com/photo-1574787342711-18ca3b6937d3?w=800&auto=format&fit=crop",
        pricePerDay: 8500,
        pricePerHour: 0,
        location: "Ludhiana, Punjab",
        ownerName: "Harpreet Singh",
        ownerContact: "+91 98456 78901",
        condition: "Excellent",
        year: 2022,
        brand: "New Holland",
        specifications: "175 HP Engine\nCutting Width: 4.2 meters\nGrain Tank: 4500 liters\nAdvanced Threshing System\nAir-conditioned Cabin",
        isAvailable: "true",
        rating: 5,
        reviewCount: 12,
      },
      {
        name: "Swaraj 855 FE Tractor",
        category: "Tractors",
        description: "Reliable 58 HP tractor known for durability and low maintenance. Perfect for medium-sized farms. Comes with rotavator attachment included in rental.",
        imageUrl: "https://images.unsplash.com/photo-1504909781568-e42b4fb32fc5?w=800&auto=format&fit=crop",
        pricePerDay: 2200,
        pricePerHour: 300,
        location: "Jaipur, Rajasthan",
        ownerName: "Vikram Sharma",
        ownerContact: "+91 97654 32109",
        condition: "Good",
        year: 2019,
        brand: "Swaraj",
        specifications: "58 HP Engine\n1800 kg Lift Capacity\nDual Clutch\n8 Forward + 2 Reverse Gears\nRotavator Included",
        isAvailable: "true",
        rating: 4,
        reviewCount: 31,
      },
      {
        name: "Kubota Combine Harvester",
        category: "Harvesters",
        description: "Compact and efficient harvester ideal for small to medium farms. Easy to operate with excellent maneuverability in tight spaces. Suitable for various crops.",
        imageUrl: "https://images.unsplash.com/photo-1628618758384-5b68e0f77823?w=800&auto=format&fit=crop",
        pricePerDay: 6500,
        pricePerHour: 0,
        location: "Coimbatore, Tamil Nadu",
        ownerName: "Murugan Krishnan",
        ownerContact: "+91 96543 21098",
        condition: "Good",
        year: 2020,
        brand: "Kubota",
        specifications: "140 HP Engine\n3.5 meter Cutting Width\n3000 liter Grain Tank\nLow Grain Loss System\nEasy Maintenance",
        isAvailable: "true",
        rating: 4,
        reviewCount: 15,
      },
      {
        name: "Rainbird Sprinkler Irrigation System",
        category: "Irrigation Systems",
        description: "Complete drip irrigation system covering up to 5 acres. Energy efficient with timer controls. Includes mainline, sub-mains, drippers, and all fittings.",
        imageUrl: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop",
        pricePerDay: 1500,
        pricePerHour: 0,
        location: "Belgaum, Karnataka",
        ownerName: "Prakash Desai",
        ownerContact: "+91 95432 10987",
        condition: "Excellent",
        year: 2021,
        brand: "Rainbird",
        specifications: "Coverage: Up to 5 acres\nAutomatic Timer Control\nPressure Regulator Included\nComplete Drip System\nEnergy Efficient Pump",
        isAvailable: "true",
        rating: 5,
        reviewCount: 8,
      },
      {
        name: "Rotary Tiller Heavy Duty",
        category: "Tillers",
        description: "Professional grade rotary tiller for soil preparation. Suitable for both wet and dry land. Multiple speed options and adjustable working depth.",
        imageUrl: "https://images.unsplash.com/photo-1589479218876-f0f29f08a0b5?w=800&auto=format&fit=crop",
        pricePerDay: 1800,
        pricePerHour: 250,
        location: "Indore, Madhya Pradesh",
        ownerName: "Ramesh Patel",
        ownerContact: "+91 94321 09876",
        condition: "Good",
        year: 2020,
        brand: "Lemken",
        specifications: "Working Width: 180 cm\nPTO Driven\nAdjustable Depth Control\nHeavy Duty Blades\nSuitable for 45+ HP Tractors",
        isAvailable: "true",
        rating: 4,
        reviewCount: 22,
      },
      {
        name: "Professional Farming Tool Kit",
        category: "Hand Tools",
        description: "Complete set of essential hand tools for farming. Includes shovels, hoes, rakes, pruning shears, and more. All tools are high quality and well-maintained.",
        imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&auto=format&fit=crop",
        pricePerDay: 400,
        pricePerHour: 0,
        location: "Ahmedabad, Gujarat",
        ownerName: "Kiran Joshi",
        ownerContact: "+91 93210 98765",
        condition: "Excellent",
        year: 2022,
        brand: "Fiskars",
        specifications: "Garden Spade\nDigging Fork\nGarden Rake\nHoe\nPruning Shears\nHand Trowel\nCarrying Bag Included",
        isAvailable: "true",
        rating: 5,
        reviewCount: 45,
      },
      {
        name: "Seed Drill Planter Machine",
        category: "Seeders",
        description: "Precision seed planter for multiple crops. Ensures uniform spacing and depth for optimal germination. Compatible with standard tractors.",
        imageUrl: "https://images.unsplash.com/photo-1574787342711-18ca3b6937d3?w=800&auto=format&fit=crop",
        pricePerDay: 2000,
        pricePerHour: 0,
        location: "Jalandhar, Punjab",
        ownerName: "Gurpreet Kaur",
        ownerContact: "+91 92109 87654",
        condition: "Good",
        year: 2021,
        brand: "Mahindra",
        specifications: "9 Row Planter\nAdjustable Row Spacing\nMetering System\nFertilizer Attachment\nSuitable for Multiple Crops",
        isAvailable: "true",
        rating: 4,
        reviewCount: 11,
      },
      {
        name: "Mini Power Tiller",
        category: "Tillers",
        description: "Compact power tiller perfect for small farms and kitchen gardens. Easy to maneuver and operate. Fuel efficient with low maintenance requirements.",
        imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop",
        pricePerDay: 800,
        pricePerHour: 120,
        location: "Kolkata, West Bengal",
        ownerName: "Debashis Sen",
        ownerContact: "+91 91098 76543",
        condition: "Excellent",
        year: 2022,
        brand: "Honda",
        specifications: "5.5 HP Engine\nWorking Width: 60 cm\nReverse Gear\nAdjustable Handle\nLightweight Design",
        isAvailable: "true",
        rating: 5,
        reviewCount: 19,
      },
      {
        name: "Sprayer Pump Agricultural",
        category: "Irrigation Systems",
        description: "High-pressure agricultural sprayer for pesticides and fertilizers. Large tank capacity with adjustable nozzles for different spray patterns.",
        imageUrl: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop",
        pricePerDay: 600,
        pricePerHour: 100,
        location: "Hyderabad, Telangana",
        ownerName: "Venkat Reddy",
        ownerContact: "+91 90987 65432",
        condition: "Good",
        year: 2021,
        brand: "Neptune",
        specifications: "Tank Capacity: 500 liters\nPressure Range: 5-20 bar\nAdjustable Nozzles\nPTO/Engine Driven\nCorrosion Resistant",
        isAvailable: "true",
        rating: 4,
        reviewCount: 14,
      },
      {
        name: "Grain Storage Silo (10 Ton)",
        category: "Storage Equipment",
        description: "Weather-proof grain storage silo with moisture control. Protects harvest from pests and weather damage. Ideal for long-term storage of cereals.",
        imageUrl: "https://images.unsplash.com/photo-1504909781568-e42b4fb32fc5?w=800&auto=format&fit=crop",
        pricePerDay: 500,
        pricePerHour: 0,
        location: "Bareilly, Uttar Pradesh",
        ownerName: "Ajay Singh",
        ownerContact: "+91 89876 54321",
        condition: "Excellent",
        year: 2022,
        brand: "Silos Cordoba",
        specifications: "Capacity: 10 Tons\nWeather Proof\nRodent Protection\nVentilation System\nEasy Loading/Unloading",
        isAvailable: "true",
        rating: 5,
        reviewCount: 6,
      },
    ];

    sampleEquipment.forEach((eq) => {
      const id = randomUUID();
      const equipment: Equipment = {
        ...eq,
        id,
        rating: eq.rating || 5,
        reviewCount: eq.reviewCount || 0,
        createdAt: new Date(),
      };
      this.equipment.set(id, equipment);
    });
  }

  async getAllEquipment(): Promise<Equipment[]> {
    return Array.from(this.equipment.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getEquipment(id: string): Promise<Equipment | undefined> {
    return this.equipment.get(id);
  }

  async createEquipment(insertEquipment: InsertEquipment): Promise<Equipment> {
    const id = randomUUID();
    const equipment: Equipment = {
      ...insertEquipment,
      id,
      rating: 5,
      reviewCount: 0,
      createdAt: new Date(),
    };
    this.equipment.set(id, equipment);
    return equipment;
  }

  async updateEquipment(
    id: string,
    updateData: Partial<InsertEquipment>
  ): Promise<Equipment | undefined> {
    const existing = this.equipment.get(id);
    if (!existing) return undefined;

    const updated: Equipment = {
      ...existing,
      ...updateData,
    };
    this.equipment.set(id, updated);
    return updated;
  }

  async deleteEquipment(id: string): Promise<boolean> {
    return this.equipment.delete(id);
  }

  async getAllInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getInquiry(id: string): Promise<Inquiry | undefined> {
    return this.inquiries.get(id);
  }

  async getInquiriesByEquipment(equipmentId: string): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values())
      .filter((inquiry) => inquiry.equipmentId === equipmentId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = randomUUID();
    const inquiry: Inquiry = {
      ...insertInquiry,
      id,
      createdAt: new Date(),
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }
}

export const storage = new MemStorage();
