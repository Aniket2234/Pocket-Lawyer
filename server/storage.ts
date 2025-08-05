import { 
  users, 
  chatMessages,
  knowledgeArticles,
  documentAnalysis,
  legalTemplates,
  caseLaw,
  stateLawGuides,
  type User, 
  type InsertUser,
  type ChatMessage,
  type InsertChatMessage,
  type KnowledgeArticle,
  type InsertKnowledgeArticle,
  type DocumentAnalysis,
  type InsertDocumentAnalysis,
  type LegalTemplate,
  type InsertLegalTemplate,
  type CaseLaw,
  type InsertCaseLaw,
  type StateLawGuide,
  type InsertStateLawGuide
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
  
  // Document analysis methods
  getDocumentAnalyses(): Promise<DocumentAnalysis[]>;
  createDocumentAnalysis(analysis: InsertDocumentAnalysis): Promise<DocumentAnalysis>;
  
  // Legal template methods
  getLegalTemplates(): Promise<LegalTemplate[]>;
  getLegalTemplatesByCategory(category: string): Promise<LegalTemplate[]>;
  getLegalTemplate(id: number): Promise<LegalTemplate | undefined>;
  
  // Case law methods
  getCaseLaw(): Promise<CaseLaw[]>;
  getCaseLawByCategory(category: string): Promise<CaseLaw[]>;
  searchCaseLaw(query: string): Promise<CaseLaw[]>;
  
  // State law guide methods
  getStateLawGuides(): Promise<StateLawGuide[]>;
  getStateLawGuidesByState(state: string): Promise<StateLawGuide[]>;
  getStateLawGuidesByCategory(category: string): Promise<StateLawGuide[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private chatMessages: Map<number, ChatMessage>;
  private knowledgeArticles: Map<number, KnowledgeArticle>;
  private documentAnalyses: Map<number, DocumentAnalysis>;
  private legalTemplates: Map<number, LegalTemplate>;
  private caseLaws: Map<number, CaseLaw>;
  private stateLawGuides: Map<number, StateLawGuide>;
  private currentUserId: number;
  private currentChatMessageId: number;
  private currentKnowledgeId: number;
  private currentDocumentId: number;
  private currentTemplateId: number;
  private currentCaseLawId: number;
  private currentGuideId: number;

  constructor() {
    this.users = new Map();
    this.chatMessages = new Map();
    this.knowledgeArticles = new Map();
    this.documentAnalyses = new Map();
    this.legalTemplates = new Map();
    this.caseLaws = new Map();
    this.stateLawGuides = new Map();
    this.currentUserId = 1;
    this.currentChatMessageId = 1;
    this.currentKnowledgeId = 1;
    this.currentDocumentId = 1;
    this.currentTemplateId = 1;
    this.currentCaseLawId = 1;
    this.currentGuideId = 1;
    
    // Initialize with sample data
    this.initializeKnowledgeBase();
    this.initializeLegalTemplates();
    this.initializeCaseLaw();
    this.initializeStateLawGuides();
  }

  private initializeKnowledgeBase() {
    const articles = [
      // Arrest Rights
      {
        title: "Your Rights During Police Encounters",
        content: "You have the right to remain silent, the right to an attorney, and the right to refuse searches. Police must inform you of these rights upon arrest (Miranda Rights).",
        category: "Arrest Rights",
        tags: ["arrest", "police", "miranda rights", "constitutional rights"],
        isPublished: true,
      },
      {
        title: "What to Do During a Traffic Stop",
        content: "Remain calm, keep hands visible, provide required documents when asked, and avoid sudden movements. You have the right to ask if you're free to leave.",
        category: "Arrest Rights",
        tags: ["traffic stop", "police encounter", "rights"],
        isPublished: true,
      },
      // Tenant Rights
      {
        title: "Security Deposit Laws and Tenant Protection",
        content: "Landlords must return security deposits within specified timeframes (usually 14-30 days). Deductions must be for actual damages beyond normal wear and tear.",
        category: "Tenant Rights",
        tags: ["security deposit", "rental", "tenant protection"],
        isPublished: true,
      },
      {
        title: "Eviction Process and Tenant Defenses",
        content: "Landlords must follow proper legal procedures for eviction, including proper notice and court proceedings. Tenants have rights to defend against wrongful evictions.",
        category: "Tenant Rights",
        tags: ["eviction", "tenant rights", "housing law"],
        isPublished: true,
      },
      // Cybercrime
      {
        title: "Identity Theft Protection and Recovery",
        content: "Steps to protect against identity theft include monitoring credit reports, using secure passwords, and reporting suspicious activity immediately to authorities.",
        category: "Cybercrime",
        tags: ["identity theft", "cybersecurity", "online safety"],
        isPublished: true,
      },
      {
        title: "Online Harassment and Digital Rights",
        content: "Cyberbullying and online harassment are punishable by law. Document evidence, report to platforms and authorities, and seek legal protection when necessary.",
        category: "Cybercrime",
        tags: ["cyberbullying", "online harassment", "digital rights"],
        isPublished: true,
      },
      // Women's Safety
      {
        title: "Domestic Violence Protection Orders",
        content: "Protection orders can provide legal protection from abusive partners. They can include provisions for no contact, custody arrangements, and financial support.",
        category: "Women's Safety",
        tags: ["domestic violence", "protection order", "women's rights"],
        isPublished: true,
      },
      {
        title: "Workplace Sexual Harassment Laws",
        content: "Federal and state laws protect against sexual harassment at work. Employees have the right to file complaints and receive protection from retaliation.",
        category: "Women's Safety",
        tags: ["sexual harassment", "workplace rights", "employment law"],
        isPublished: true,
      },
      // Consumer Complaints
      {
        title: "Consumer Protection Against Fraud",
        content: "Consumers have rights against deceptive practices, false advertising, and defective products. Various agencies provide recourse for consumer complaints.",
        category: "Consumer Complaints",
        tags: ["consumer protection", "fraud", "consumer rights"],
        isPublished: true,
      },
      {
        title: "Product Liability and Warranty Rights",
        content: "Manufacturers and sellers are responsible for defective products. Consumers have rights under warranty laws and product liability statutes.",
        category: "Consumer Complaints",
        tags: ["product liability", "warranty", "consumer protection"],
        isPublished: true,
      }
    ];

    articles.forEach(article => {
      const id = this.currentKnowledgeId++;
      this.knowledgeArticles.set(id, { ...article, id });
    });
  }

  private initializeLegalTemplates() {
    const templates = [
      // Rental/Housing Templates
      {
        title: "Residential Lease Agreement",
        category: "Housing",
        description: "Standard residential lease agreement template",
        content: "RESIDENTIAL LEASE AGREEMENT\n\nThis lease agreement is made between [LANDLORD NAME] and [TENANT NAME] for the property located at [PROPERTY ADDRESS]...",
        tags: ["lease", "rental", "housing"],
      },
      {
        title: "Security Deposit Demand Letter",
        category: "Housing", 
        description: "Letter to demand return of security deposit",
        content: "DEMAND FOR RETURN OF SECURITY DEPOSIT\n\nDear [LANDLORD NAME],\n\nI am writing to demand the return of my security deposit in the amount of $[AMOUNT]...",
        tags: ["security deposit", "tenant rights"],
      },
      // Employment Templates
      {
        title: "Employment Contract Template",
        category: "Employment",
        description: "Basic employment agreement template",
        content: "EMPLOYMENT AGREEMENT\n\nThis agreement is between [EMPLOYER] and [EMPLOYEE] for the position of [JOB TITLE]...",
        tags: ["employment", "contract"],
      },
      {
        title: "Resignation Letter",
        category: "Employment",
        description: "Professional resignation letter template",
        content: "RESIGNATION LETTER\n\nDear [SUPERVISOR NAME],\n\nPlease accept this letter as formal notification of my resignation from [COMPANY NAME]...",
        tags: ["resignation", "employment"],
      },
      // Business Templates
      {
        title: "LLC Operating Agreement",
        category: "Business",
        description: "Operating agreement for Limited Liability Company",
        content: "LIMITED LIABILITY COMPANY OPERATING AGREEMENT\n\nThis Operating Agreement is made for [LLC NAME], a [STATE] limited liability company...",
        tags: ["LLC", "business", "operating agreement"],
      },
      {
        title: "Non-Disclosure Agreement",
        category: "Business",
        description: "Confidentiality agreement template",
        content: "NON-DISCLOSURE AGREEMENT\n\nThis Non-Disclosure Agreement is entered into between [PARTY 1] and [PARTY 2]...",
        tags: ["NDA", "confidentiality", "business"],
      }
    ];

    // Add more templates to reach 50+
    const additionalTemplates = [
      { title: "Power of Attorney", category: "Legal Documents", description: "Legal document granting authority", content: "POWER OF ATTORNEY...", tags: ["power of attorney"] },
      { title: "Living Will", category: "Estate Planning", description: "Medical directive document", content: "LIVING WILL...", tags: ["living will", "healthcare"] },
      { title: "Last Will and Testament", category: "Estate Planning", description: "Basic will template", content: "LAST WILL AND TESTAMENT...", tags: ["will", "estate planning"] },
      { title: "Divorce Petition", category: "Family Law", description: "Divorce filing document", content: "PETITION FOR DIVORCE...", tags: ["divorce", "family law"] },
      { title: "Child Custody Agreement", category: "Family Law", description: "Custody arrangement template", content: "CHILD CUSTODY AGREEMENT...", tags: ["custody", "children"] },
      { title: "Sales Contract", category: "Contracts", description: "General sales agreement", content: "SALES CONTRACT...", tags: ["sales", "contract"] },
      { title: "Service Agreement", category: "Contracts", description: "Service provider contract", content: "SERVICE AGREEMENT...", tags: ["services", "contract"] },
      { title: "Promissory Note", category: "Financial", description: "Loan agreement document", content: "PROMISSORY NOTE...", tags: ["loan", "financial"] },
      { title: "Debt Settlement Letter", category: "Financial", description: "Debt negotiation template", content: "DEBT SETTLEMENT PROPOSAL...", tags: ["debt", "settlement"] },
      { title: "Cease and Desist Letter", category: "Legal Notices", description: "Stop harassment letter", content: "CEASE AND DESIST...", tags: ["cease and desist"] }
    ];

    [...templates, ...additionalTemplates].forEach(template => {
      const id = this.currentTemplateId++;
      this.legalTemplates.set(id, { ...template, id });
    });
  }

  private initializeCaseLaw() {
    const cases = [
      {
        caseTitle: "Miranda v. Arizona",
        court: "U.S. Supreme Court",
        year: 1966,
        citation: "384 U.S. 436",
        summary: "Established the requirement for police to inform suspects of their constitutional rights before interrogation.",
        category: "Arrest Rights",
        keyPoints: ["Right to remain silent", "Right to attorney", "Miranda warnings required"],
      },
      {
        caseTitle: "Terry v. Ohio", 
        court: "U.S. Supreme Court",
        year: 1968,
        citation: "392 U.S. 1",
        summary: "Established the legal basis for police to conduct brief stops and searches based on reasonable suspicion.",
        category: "Arrest Rights",
        keyPoints: ["Stop and frisk", "Reasonable suspicion standard", "Officer safety"],
      },
      {
        caseTitle: "Lindsey v. Normet",
        court: "U.S. Supreme Court", 
        year: 1972,
        citation: "405 U.S. 56",
        summary: "Addressed constitutional issues in landlord-tenant law and eviction procedures.",
        category: "Tenant Rights",
        keyPoints: ["Due process in evictions", "Equal protection", "Housing rights"],
      },
      {
        caseTitle: "Edwards v. Habib",
        court: "D.C. Circuit",
        year: 1968,
        citation: "397 F.2d 687",
        summary: "Established that landlords cannot retaliate against tenants for reporting housing code violations.",
        category: "Tenant Rights", 
        keyPoints: ["Retaliatory eviction", "Housing code enforcement", "Tenant protection"],
      },
      {
        caseTitle: "Meritor Savings Bank v. Vinson",
        court: "U.S. Supreme Court",
        year: 1986,
        citation: "477 U.S. 57",
        summary: "Established that sexual harassment constitutes employment discrimination under Title VII.",
        category: "Women's Safety",
        keyPoints: ["Sexual harassment", "Hostile work environment", "Title VII protection"],
      }
    ];

    cases.forEach(caseItem => {
      const id = this.currentCaseLawId++;
      this.caseLaws.set(id, { ...caseItem, id });
    });
  }

  private initializeStateLawGuides() {
    const guides = [
      {
        state: "California",
        title: "California Tenant Rights Guide",
        category: "Tenant Rights",
        content: "California Civil Code provides extensive tenant protections including rent control in certain cities, just cause eviction requirements, and security deposit limits...",
      },
      {
        state: "New York",
        title: "New York Employment Law Overview",
        category: "Employment",
        content: "New York has strong worker protections including paid family leave, minimum wage laws, and anti-discrimination statutes...",
      },
      {
        state: "Texas",
        title: "Texas Business Formation Guide",
        category: "Business",
        content: "Texas offers business-friendly incorporation laws with no state income tax and simplified LLC formation procedures...",
      },
      {
        state: "Florida", 
        title: "Florida Consumer Protection Laws",
        category: "Consumer Rights",
        content: "Florida Deceptive and Unfair Trade Practices Act provides remedies for consumers against fraudulent business practices...",
      },
      {
        state: "Illinois",
        title: "Illinois Domestic Violence Resources",
        category: "Women's Safety", 
        content: "Illinois Domestic Violence Act provides comprehensive protections including emergency orders of protection and housing assistance...",
      }
    ];

    // Add more guides for different states and categories
    const states = ["Alabama", "Alaska", "Arizona", "Arkansas", "Colorado", "Connecticut", "Delaware", "Georgia", "Hawaii", "Idaho", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
    
    const categories = ["Criminal Law", "Family Law", "Property Law", "Business Law", "Employment Law"];
    
    states.forEach(state => {
      categories.forEach(category => {
        const id = this.currentGuideId++;
        this.stateLawGuides.set(id, {
          id,
          state,
          title: `${state} ${category} Guide`,
          category,
          content: `Comprehensive guide to ${category.toLowerCase()} in ${state}. This guide covers the essential legal principles and procedures specific to ${state} jurisdiction...`,
          lastUpdated: new Date(),
        });
      });
    });

    guides.forEach(guide => {
      const id = this.currentGuideId++;
      this.stateLawGuides.set(id, { ...guide, id, lastUpdated: new Date() });
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

  // Document analysis methods
  async getDocumentAnalyses(): Promise<DocumentAnalysis[]> {
    return Array.from(this.documentAnalyses.values());
  }

  async createDocumentAnalysis(insertAnalysis: InsertDocumentAnalysis): Promise<DocumentAnalysis> {
    const id = this.currentDocumentId++;
    const analysis: DocumentAnalysis = { 
      ...insertAnalysis, 
      id, 
      timestamp: new Date() 
    };
    this.documentAnalyses.set(id, analysis);
    return analysis;
  }

  // Legal template methods
  async getLegalTemplates(): Promise<LegalTemplate[]> {
    return Array.from(this.legalTemplates.values());
  }

  async getLegalTemplatesByCategory(category: string): Promise<LegalTemplate[]> {
    return Array.from(this.legalTemplates.values()).filter(template => 
      template.category.toLowerCase() === category.toLowerCase()
    );
  }

  async getLegalTemplate(id: number): Promise<LegalTemplate | undefined> {
    return this.legalTemplates.get(id);
  }

  // Case law methods
  async getCaseLaw(): Promise<CaseLaw[]> {
    return Array.from(this.caseLaws.values());
  }

  async getCaseLawByCategory(category: string): Promise<CaseLaw[]> {
    return Array.from(this.caseLaws.values()).filter(caseItem => 
      caseItem.category.toLowerCase() === category.toLowerCase()
    );
  }

  async searchCaseLaw(query: string): Promise<CaseLaw[]> {
    const queryLower = query.toLowerCase();
    return Array.from(this.caseLaws.values()).filter(caseItem => 
      caseItem.caseTitle.toLowerCase().includes(queryLower) ||
      caseItem.summary.toLowerCase().includes(queryLower) ||
      caseItem.keyPoints.some(point => point.toLowerCase().includes(queryLower))
    );
  }

  // State law guide methods
  async getStateLawGuides(): Promise<StateLawGuide[]> {
    return Array.from(this.stateLawGuides.values());
  }

  async getStateLawGuidesByState(state: string): Promise<StateLawGuide[]> {
    return Array.from(this.stateLawGuides.values()).filter(guide => 
      guide.state.toLowerCase() === state.toLowerCase()
    );
  }

  async getStateLawGuidesByCategory(category: string): Promise<StateLawGuide[]> {
    return Array.from(this.stateLawGuides.values()).filter(guide => 
      guide.category.toLowerCase() === category.toLowerCase()
    );
  }
}

export const storage = new MemStorage();
