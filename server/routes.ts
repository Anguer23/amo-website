import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import { insertConsultationSchema } from "@shared/schema";
import { sendConsultationEmail, sendTestEmail, sendInternalNotification } from "./email-service.js";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // POST /api/consultations — book a consultation, send email + embedded calendar invite
  app.post("/api/consultations", async (req, res) => {
    try {
      const parsed = insertConsultationSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid consultation data", details: parsed.error.flatten() });
      }

      const { fleetOperatorName, email, fleetCapacity, selectedDate, selectedTime, tier } = parsed.data;

      // Save to storage
      const consultation = await storage.createConsultation(parsed.data);
      console.log(`✓ Consultation created: ${consultation.id}`);

      // Send confirmation email with embedded iCal calendar invite
      const emailResult = await sendConsultationEmail(
        email,
        fleetOperatorName,
        selectedDate,
        selectedTime,
        tier,
        fleetCapacity
      );

      if (!emailResult.success) {
        console.error("Email send failed:", emailResult.error);
      }

      // Send internal notification to the AM Ops team (fire-and-forget)
      sendInternalNotification(
        fleetOperatorName,
        email,
        selectedDate,
        selectedTime,
        tier,
        fleetCapacity
      ).catch((err) => console.error("Internal notification failed:", err));

      res.status(201).json({
        success: true,
        id: consultation.id,
        message: "Consultation request submitted successfully",
        emailSent: emailResult.success,
        calendarInviteSent: emailResult.success, // calendar invite is embedded in the email
      });
    } catch (error) {
      console.error("Error creating consultation:", error);
      res.status(500).json({ error: "Failed to create consultation" });
    }
  });

  // GET /api/consultations — list all bookings
  app.get("/api/consultations", async (req, res) => {
    try {
      const consultations = await storage.getConsultations();
      res.json(consultations);
    } catch (error) {
      console.error("Error fetching consultations:", error);
      res.status(500).json({ error: "Failed to fetch consultations" });
    }
  });

  // GET /api/consultations/:id
  app.get("/api/consultations/:id", async (req, res) => {
    try {
      const consultation = await storage.getConsultationById(req.params.id);
      if (!consultation) {
        return res.status(404).json({ error: "Consultation not found" });
      }
      res.json(consultation);
    } catch (error) {
      console.error("Error fetching consultation:", error);
      res.status(500).json({ error: "Failed to fetch consultation" });
    }
  });

  // POST /api/test-email — send a test email + sample calendar invite
  app.post("/api/test-email", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email || typeof email !== "string") {
        return res.status(400).json({ error: "email is required" });
      }
      const result = await sendTestEmail(email);
      if (result.success) {
        res.json({ success: true, messageId: result.messageId, message: "Test email sent successfully" });
      } else {
        res.status(500).json({ success: false, error: result.error || "Failed to send test email" });
      }
    } catch (error) {
      console.error("Error sending test email:", error);
      res.status(500).json({ error: "Failed to send test email" });
    }
  });

  return httpServer;
}
