import { integer, pgTable, uuid, varchar, text, timestamp, time, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
});


export const clientTable = pgTable("client", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

export const clinicTableRelations = relations(clientTable, ({ many, one }) => ({
  doctors: many(doctorsTable),
  patients: many(patientTable),
  appointments: many(appointmentTable),
}));

export const doctorsTable = pgTable("doctors", {
  id: uuid("id").defaultRandom().primaryKey(),
  clinicId: uuid("clinic_id").references(() => clientTable.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  avatarImageUrl: text("avatar_image_url"),
  // 1 - Monday, 2 - Tuesday, 3 - Wednesday, 4 - Thursday, 5 - Friday, 6 - Saturday, 7 - Sunday
  availableFromWeekDay: integer("available_from_week_day").notNull(),
  availableToWeekDay: integer("available_to_week_day").notNull(), 
  availableFromTime: time("available_from_time").notNull(),
  availableToTime: time("available_to_time").notNull(),
  specialty: text("specialty").notNull(),
  appointmentPriceInCents: integer("appointment_price_in_cents").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

export const doctorsTableRelations = relations(doctorsTable, ({ one }) => ({
  clinic: one(clientTable, {
    fields: [doctorsTable.clinicId],
    references: [clientTable.id],
  }),
}));



export const patientSexEnum = pgEnum("patient_sex", ["male", "female"]);

export const patientTable = pgTable("patients", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phoneNumber: text("phone_number").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  sex: patientSexEnum("sex").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

export const appointmentTable = pgTable("appointments", {
  id: uuid("id").defaultRandom().primaryKey(),
  date: timestamp("date").notNull(),
  patientId: uuid("patient_id").references(() => patientTable.id, { onDelete: "cascade" }),
  doctorId: uuid("doctor_id").references(() => doctorsTable.id, { onDelete: "cascade" }),
  clinicId: uuid("clinic_id").references(() => clientTable.id, { onDelete: "cascade" }),
});
