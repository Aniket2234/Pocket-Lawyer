import { 
  users, 
  chatMessages,
  knowledgeArticles,
  consultationBookings,
  type User, 
  type InsertUser,
  type ChatMessage,
  type InsertChatMessage,
  type KnowledgeArticle,
  type InsertKnowledgeArticle,
  type ConsultationBooking,
  type InsertConsultationBooking
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Chat message methods
  getChatMessages(userId?: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  
  // Knowledge base methods
  getKnowledgeArticles(): Promise<KnowledgeArticle[]>;
  getKnowledgeArticle(id: number): Promise<KnowledgeArticle | undefined>;
  createKnowledgeArticle(article: InsertKnowledgeArticle): Promise<KnowledgeArticle>;
  updateKnowledgeArticle(id: number, article: Partial<InsertKnowledgeArticle>): Promise<KnowledgeArticle | undefined>;
  deleteKnowledgeArticle(id: number): Promise<boolean>;
  
  // Consultation booking methods
  getConsultationBookings(): Promise<ConsultationBooking[]>;
  getConsultationBooking(id: number): Promise<ConsultationBooking | undefined>;
  createConsultationBooking(booking: InsertConsultationBooking): Promise<ConsultationBooking>;
  updateConsultationBooking(id: number, booking: Partial<InsertConsultationBooking>): Promise<ConsultationBooking | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private chatMessages: Map<number, ChatMessage>;
  private knowledgeArticles: Map<number, KnowledgeArticle>;
  private consultationBookings: Map<number, ConsultationBooking>;
  private currentUserId: number;
  private currentChatMessageId: number;
  private currentKnowledgeId: number;
  private currentBookingId: number;

  constructor() {
    this.users = new Map();
    this.chatMessages = new Map();
    this.knowledgeArticles = new Map();
    this.consultationBookings = new Map();
    this.currentUserId = 1;
    this.currentChatMessageId = 1;
    this.currentKnowledgeId = 1;
    this.currentBookingId = 1;
    
    // Initialize with sample knowledge articles
    this.initializeKnowledgeBase();
  }

  private initializeKnowledgeBase() {
    const articles = [
      {
        title: "Understanding Contract Law Basics",
        content: "A contract is a legally binding agreement between two or more parties. For a contract to be valid, it must have offer, acceptance, consideration, and legal purpose.",
        category: "Contract Law",
        tags: ["contracts", "business", "legal basics"],
        isPublished: true,
      },
      {
        title: "Tenant Rights and Responsibilities",
        content: "Tenants have the right to habitable living conditions, privacy, and protection from unlawful eviction. Landlords must provide proper notice before entry.",
        category: "Property Law", 
        tags: ["rental", "housing", "tenant rights"],
        isPublished: true,
      },
      {
        title: "Starting an LLC",
        content: "A Limited Liability Company (LLC) provides liability protection for its owners while offering tax flexibility. Key considerations include state of formation and operating agreements.",
        category: "Business Law",
        tags: ["business formation", "LLC", "entrepreneurship"],
        isPublished: true,
      }
    ];

    articles.forEach(article => {
      const id = this.currentKnowledgeId++;
      this.knowledgeArticles.set(id, { ...article, id });
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Chat message methods
  async getChatMessages(userId?: number): Promise<ChatMessage[]> {
    const messages = Array.from(this.chatMessages.values());
    if (userId) {
      return messages.filter(msg => msg.userId === userId);
    }
    return messages;
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentChatMessageId++;
    const message: ChatMessage = { 
      ...insertMessage, 
      id, 
      timestamp: new Date(),
      userId: insertMessage.userId ?? null
    };
    this.chatMessages.set(id, message);
    return message;
  }

  // Knowledge base methods
  async getKnowledgeArticles(): Promise<KnowledgeArticle[]> {
    return Array.from(this.knowledgeArticles.values()).filter(article => article.isPublished);
  }

  async getKnowledgeArticle(id: number): Promise<KnowledgeArticle | undefined> {
    return this.knowledgeArticles.get(id);
  }

  async createKnowledgeArticle(insertArticle: InsertKnowledgeArticle): Promise<KnowledgeArticle> {
    const id = this.currentKnowledgeId++;
    const article: KnowledgeArticle = { 
      ...insertArticle, 
      id,
      tags: insertArticle.tags ?? null,
      isPublished: insertArticle.isPublished ?? true
    };
    this.knowledgeArticles.set(id, article);
    return article;
  }

  async updateKnowledgeArticle(id: number, updateData: Partial<InsertKnowledgeArticle>): Promise<KnowledgeArticle | undefined> {
    const existingArticle = this.knowledgeArticles.get(id);
    if (!existingArticle) return undefined;
    
    const updatedArticle = { ...existingArticle, ...updateData };
    this.knowledgeArticles.set(id, updatedArticle);
    return updatedArticle;
  }

  async deleteKnowledgeArticle(id: number): Promise<boolean> {
    return this.knowledgeArticles.delete(id);
  }

  // Consultation booking methods
  async getConsultationBookings(): Promise<ConsultationBooking[]> {
    return Array.from(this.consultationBookings.values());
  }

  async getConsultationBooking(id: number): Promise<ConsultationBooking | undefined> {
    return this.consultationBookings.get(id);
  }

  async createConsultationBooking(insertBooking: InsertConsultationBooking): Promise<ConsultationBooking> {
    const id = this.currentBookingId++;
    const booking: ConsultationBooking = { 
      ...insertBooking, 
      id,
      status: "pending",
      phone: insertBooking.phone ?? null,
      message: insertBooking.message ?? null,
      preferredDate: insertBooking.preferredDate ?? null
    };
    this.consultationBookings.set(id, booking);
    return booking;
  }

  async updateConsultationBooking(id: number, updateData: Partial<InsertConsultationBooking>): Promise<ConsultationBooking | undefined> {
    const existingBooking = this.consultationBookings.get(id);
    if (!existingBooking) return undefined;
    
    const updatedBooking = { ...existingBooking, ...updateData };
    this.consultationBookings.set(id, updatedBooking);
    return updatedBooking;
  }
}

export const storage = new MemStorage();
