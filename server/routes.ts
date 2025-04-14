import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = express.Router();
  
  // Contact form submission endpoint
  apiRouter.post("/contact", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const contactData = insertContactSchema.parse({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
      });
      
      // Store the contact submission
      const submission = await storage.createContactSubmission(contactData);
      
      // Return success response
      return res.status(201).json({
        message: "Contact form submitted successfully",
        data: submission,
      });
    } catch (error) {
      // Handle validation errors
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          message: "Validation error",
          errors: validationError.details,
        });
      }
      
      // Handle other errors
      console.error("Error submitting contact form:", error);
      return res.status(500).json({
        message: "An error occurred while processing your request",
      });
    }
  });
  
  // Get all contact submissions (could be used for an admin dashboard)
  apiRouter.get("/contact", async (_req: Request, res: Response) => {
    try {
      const submissions = await storage.getContactSubmissions();
      return res.status(200).json({
        data: submissions,
      });
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      return res.status(500).json({
        message: "An error occurred while fetching contact submissions",
      });
    }
  });
  
  // Get a specific contact submission by ID
  apiRouter.get("/contact/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          message: "Invalid ID format",
        });
      }
      
      const submission = await storage.getContactSubmission(id);
      if (!submission) {
        return res.status(404).json({
          message: "Contact submission not found",
        });
      }
      
      return res.status(200).json({
        data: submission,
      });
    } catch (error) {
      console.error("Error fetching contact submission:", error);
      return res.status(500).json({
        message: "An error occurred while fetching the contact submission",
      });
    }
  });
  
  // Mount API router
  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
