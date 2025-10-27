import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const equipment = pgTable("equipment", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  pricePerDay: integer("price_per_day").notNull(),
  pricePerHour: integer("price_per_hour"),
  location: text("location").notNull(),
  ownerName: text("owner_name").notNull(),
  ownerContact: text("owner_contact").notNull(),
  condition: text("condition").notNull(),
  year: integer("year"),
  brand: text("brand"),
  specifications: text("specifications"),
  isAvailable: text("is_available").notNull().default('true'),
  rating: integer("rating").default(5),
  reviewCount: integer("review_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const inquiries = pgTable("inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  equipmentId: varchar("equipment_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  startDate: text("start_date"),
  endDate: text("end_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertEquipmentSchema = createInsertSchema(equipment).omit({
  id: true,
  createdAt: true,
  rating: true,
  reviewCount: true,
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
});

export type Equipment = typeof equipment.$inferSelect;
export type InsertEquipment = z.infer<typeof insertEquipmentSchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;

export const categories = [
  "Tractors",
  "Harvesters",
  "Irrigation Systems",
  "Tillers",
  "Seeders",
  "Hand Tools",
  "Storage Equipment",
  "Transport"
] as const;

export type Category = typeof categories[number];
