import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertChatMessageSchema, 
  insertKnowledgeArticleSchema, 
  insertConsultationBookingSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat API routes
  app.get("/api/chat/messages", async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      const messages = await storage.getChatMessages(userId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.post("/api/chat/messages", async (req, res) => {
    try {
      const validatedData = insertChatMessageSchema.parse(req.body);
      const message = await storage.createChatMessage(validatedData);
      res.json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid message data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create message" });
      }
    }
  });

  // Knowledge base API routes
  app.get("/api/knowledge", async (req, res) => {
    try {
      const articles = await storage.getKnowledgeArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });

  app.get("/api/knowledge/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const article = await storage.getKnowledgeArticle(id);
      if (!article) {
        res.status(404).json({ message: "Article not found" });
        return;
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });

  app.post("/api/knowledge", async (req, res) => {
    try {
      const validatedData = insertKnowledgeArticleSchema.parse(req.body);
      const article = await storage.createKnowledgeArticle(validatedData);
      res.json(article);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid article data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create article" });
      }
    }
  });

  app.put("/api/knowledge/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertKnowledgeArticleSchema.partial().parse(req.body);
      const article = await storage.updateKnowledgeArticle(id, validatedData);
      if (!article) {
        res.status(404).json({ message: "Article not found" });
        return;
      }
      res.json(article);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid article data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update article" });
      }
    }
  });

  app.delete("/api/knowledge/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteKnowledgeArticle(id);
      if (!success) {
        res.status(404).json({ message: "Article not found" });
        return;
      }
      res.json({ message: "Article deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete article" });
    }
  });

  // Consultation booking API routes
  app.get("/api/consultations", async (req, res) => {
    try {
      const bookings = await storage.getConsultationBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  app.get("/api/consultations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const booking = await storage.getConsultationBooking(id);
      if (!booking) {
        res.status(404).json({ message: "Booking not found" });
        return;
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch booking" });
    }
  });

  app.post("/api/consultations", async (req, res) => {
    try {
      const validatedData = insertConsultationBookingSchema.parse(req.body);
      const booking = await storage.createConsultationBooking(validatedData);
      res.json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create booking" });
      }
    }
  });

  app.put("/api/consultations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertConsultationBookingSchema.partial().parse(req.body);
      const booking = await storage.updateConsultationBooking(id, validatedData);
      if (!booking) {
        res.status(404).json({ message: "Booking not found" });
        return;
      }
      res.json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update booking" });
      }
    }
  });

  // AI chat endpoint with mock responses for now
  app.post("/api/chat/ai-response", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message) {
        res.status(400).json({ message: "Message is required" });
        return;
      }

      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

      // Sample responses based on keywords
      const responses = [
        "Based on your question about contract law, here's what you need to know: Contracts require offer, acceptance, and consideration to be legally binding. Would you like me to explain any of these elements in detail?",
        "For employment law matters, it's important to understand your rights. Most employment relationships are 'at-will' unless specified otherwise. I recommend documenting any workplace issues. Would you like specific guidance on your situation?",
        "Regarding property law, tenant rights vary by state but generally include the right to habitable conditions and privacy. Landlords must provide proper notice before entry. What specific property issue are you facing?",
        "For business formation, LLCs offer liability protection and tax flexibility. Consider factors like ownership structure, state of incorporation, and operating agreements. Would you like me to explain the different business entity types?",
        "Family law matters can be complex and emotionally challenging. Each state has different requirements for divorce, custody, and support. I recommend consulting with a local family law attorney for your specific situation."
      ];

      // Basic keyword-based response selection
      const messageLower = message.toLowerCase();
      let response;
      
      if (messageLower.includes("contract")) {
        response = responses[0];
      } else if (messageLower.includes("employment") || messageLower.includes("work") || messageLower.includes("job")) {
        response = responses[1];
      } else if (messageLower.includes("tenant") || messageLower.includes("rent") || messageLower.includes("property")) {
        response = responses[2];
      } else if (messageLower.includes("business") || messageLower.includes("llc") || messageLower.includes("company")) {
        response = responses[3];
      } else if (messageLower.includes("family") || messageLower.includes("divorce") || messageLower.includes("custody")) {
        response = responses[4];
      } else {
        response = responses[Math.floor(Math.random() * responses.length)];
      }

      res.json({ response });
    } catch (error) {
      res.status(500).json({ message: "Failed to process AI response" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
