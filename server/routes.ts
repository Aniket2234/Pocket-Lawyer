import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendFeedbackNotification } from "./emailService";
import { 
  insertChatMessageSchema, 
  insertKnowledgeArticleSchema,
  insertDocumentAnalysisSchema,
  insertLegalTemplateSchema,
  insertCaseLawSchema,
  insertStateLawGuideSchema,
  insertFeedbackSchema
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

  // Document analysis API routes
  app.get("/api/documents", async (req, res) => {
    try {
      const analyses = await storage.getDocumentAnalyses();
      res.json(analyses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch document analyses" });
    }
  });

  app.post("/api/documents/analyze", async (req, res) => {
    try {
      const { fileName, fileType, content } = req.body;
      
      if (!fileName || !fileType) {
        res.status(400).json({ message: "File name and type are required" });
        return;
      }

      // Simulate document analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const analysisResult = `Document Analysis for ${fileName}:
      
      Document Type: ${fileType}
      Analysis Summary: This document appears to be a ${fileType.toLowerCase()} file. Based on the content structure, this could be a legal document requiring careful review.
      
      Key Findings:
      - Document contains standard legal language
      - Proper formatting detected
      - No obvious red flags identified
      
      Recommendations:
      - Review all terms carefully before signing
      - Consider consulting with a legal professional
      - Ensure all parties understand their obligations`;

      const analysis = await storage.createDocumentAnalysis({
        fileName,
        fileType,
        analysisResult
      });
      
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ message: "Failed to analyze document" });
    }
  });

  // Legal templates API routes
  app.get("/api/templates", async (req, res) => {
    try {
      const category = req.query.category as string;
      const templates = category 
        ? await storage.getLegalTemplatesByCategory(category)
        : await storage.getLegalTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch templates" });
    }
  });

  app.get("/api/templates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const template = await storage.getLegalTemplate(id);
      if (!template) {
        res.status(404).json({ message: "Template not found" });
        return;
      }
      res.json(template);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch template" });
    }
  });

  // Case law API routes
  app.get("/api/cases", async (req, res) => {
    try {
      const category = req.query.category as string;
      const search = req.query.search as string;
      
      console.log("Cases API called with:", { category, search, query: req.query });
      
      let cases;
      if (search) {
        console.log("Searching cases with query:", search);
        cases = await storage.searchCaseLaw(search);
      } else if (category) {
        console.log("Filtering cases by category:", category);
        cases = await storage.getCaseLawByCategory(category);
      } else {
        console.log("Getting all cases");
        cases = await storage.getCaseLaw();
      }
      
      console.log("Returning", cases.length, "cases");
      res.json(cases);
    } catch (error) {
      console.error("Error fetching cases:", error);
      res.status(500).json({ message: "Failed to fetch case law" });
    }
  });

  // State law guides API routes
  app.get("/api/guides", async (req, res) => {
    try {
      const state = req.query.state as string;
      const category = req.query.category as string;
      
      let guides;
      if (state) {
        guides = await storage.getStateLawGuidesByState(state);
      } else if (category) {
        guides = await storage.getStateLawGuidesByCategory(category);
      } else {
        guides = await storage.getStateLawGuides();
      }
      
      res.json(guides);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch state law guides" });
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

  // Feedback API routes
  app.post("/api/feedback", async (req, res) => {
    try {
      const validatedData = insertFeedbackSchema.parse(req.body);
      const feedback = await storage.createFeedback(validatedData);
      
      // Send email notification to workfree613@gmail.com
      try {
        const emailSent = await sendFeedbackNotification(feedback);
        if (emailSent) {
          console.log(`✅ Feedback #${feedback.id} - email sent to workfree613@gmail.com`);
        } else {
          console.log(`⚠️ Feedback #${feedback.id} saved but email not sent (API key needed)`);
        }
      } catch (error) {
        console.error("Failed to send feedback notification:", error);
      }
      
      res.json(feedback);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid feedback data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create feedback" });
      }
    }
  });

  app.get("/api/feedback", async (req, res) => {
    try {
      const feedback = await storage.getFeedback();
      res.json(feedback);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch feedback" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
