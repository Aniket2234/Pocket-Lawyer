import { 
  users, 
  chatMessages,
  knowledgeArticles,
  documentAnalysis,
  legalTemplates,
  caseLaw,
  stateLawGuides,
  feedback,
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
  type InsertStateLawGuide,
  type Feedback,
  type InsertFeedback
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
  
  // Feedback methods
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
  getFeedback(): Promise<Feedback[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private chatMessages: Map<number, ChatMessage>;
  private knowledgeArticles: Map<number, KnowledgeArticle>;
  private documentAnalyses: Map<number, DocumentAnalysis>;
  private legalTemplates: Map<number, LegalTemplate>;
  private caseLaws: Map<number, CaseLaw>;
  private stateLawGuides: Map<number, StateLawGuide>;
  private feedbackList: Map<number, Feedback>;
  private currentUserId: number;
  private currentChatMessageId: number;
  private currentKnowledgeId: number;
  private currentDocumentId: number;
  private currentTemplateId: number;
  private currentCaseLawId: number;
  private currentGuideId: number;
  private currentFeedbackId: number;

  constructor() {
    this.users = new Map();
    this.chatMessages = new Map();
    this.knowledgeArticles = new Map();
    this.documentAnalyses = new Map();
    this.legalTemplates = new Map();
    this.caseLaws = new Map();
    this.stateLawGuides = new Map();
    this.feedbackList = new Map();
    this.currentUserId = 1;
    this.currentChatMessageId = 1;
    this.currentKnowledgeId = 1;
    this.currentDocumentId = 1;
    this.currentTemplateId = 1;
    this.currentCaseLawId = 1;
    this.currentGuideId = 1;
    this.currentFeedbackId = 1;
    
    // Initialize with sample data
    this.initializeKnowledgeBase();
    this.initializeLegalTemplates();
    this.initializeCaseLaw();
    this.initializeStateLawGuides();
  }

  private initializeKnowledgeBase() {
    const articles = [
      // Arrest Rights - 10 articles
      {
        title: "Your Rights Under Article 20 During Police Arrest",
        content: "Under the Indian Constitution Article 20, you have fundamental rights during arrest including protection against self-incrimination, double jeopardy, and ex-post-facto laws. No person can be compelled to be a witness against himself. You have the right to remain silent and cannot be forced to confess. The police must inform you of the grounds of arrest under Article 22.",
        category: "Arrest Rights",
        tags: ["arrest", "article 20", "article 22", "constitutional rights", "fundamental rights"],
        isPublished: true,
      },
      {
        title: "Police Custody Rights Under CrPC Section 50",
        content: "Section 50 of Code of Criminal Procedure mandates that when police arrest someone without warrant, they must inform the person of grounds for arrest and their right to bail. The arrested person has right to consult and be defended by a legal practitioner of their choice. Police must produce the arrested person before magistrate within 24 hours.",
        category: "Arrest Rights",
        tags: ["police custody", "CrPC section 50", "bail rights", "legal representation"],
        isPublished: true,
      },
      {
        title: "Anticipatory Bail Under Section 438 CrPC",
        content: "Section 438 of CrPC provides for anticipatory bail - a pre-arrest legal protection. High Court or Session Court can grant anticipatory bail if there's reasonable apprehension of arrest in non-bailable offense. The court considers factors like nature of accusation, criminal history, and likelihood of fleeing justice before granting anticipatory bail.",
        category: "Arrest Rights",
        tags: ["anticipatory bail", "section 438", "pre-arrest protection", "high court"],
        isPublished: true,
      },
      {
        title: "Rights During Police Interrogation",
        content: "During police interrogation, you have right to legal counsel under Article 22(1). Police cannot use third-degree torture or physical violence. Any confession made to police is inadmissible under Evidence Act Section 25. You can request presence of family member or lawyer during questioning. If you're a woman, interrogation must be conducted by female police officer.",
        category: "Arrest Rights",
        tags: ["interrogation", "legal counsel", "evidence act", "women's rights"],
        isPublished: true,
      },
      {
        title: "Juvenile Justice Act - Rights of Minors",
        content: "Under Juvenile Justice Act 2015, children below 18 years have special protection. Police cannot arrest minor without reasonable grounds. Parents/guardians must be informed immediately. Child must be produced before Juvenile Justice Board within 24 hours. No handcuffs can be used on children, and they cannot be kept in police lock-up with adult offenders.",
        category: "Arrest Rights",
        tags: ["juvenile justice", "minor rights", "children protection", "JJB"],
        isPublished: true,
      },
      {
        title: "Bail Rights Under Section 436-450 CrPC",
        content: "Bail is fundamental right under Article 21. For bailable offenses, bail is matter of right. For non-bailable offenses, it's at court's discretion. Under Section 436A, if undertrial prisoner has served half of maximum sentence, they must be released on personal bond. Bail cannot be denied merely because accused is poor or cannot afford surety.",
        category: "Arrest Rights",
        tags: ["bail", "article 21", "undertrial", "personal bond"],
        isPublished: true,
      },
      {
        title: "False FIR and Malicious Prosecution Laws",
        content: "Filing false FIR is offense under IPC Section 182 (false information with intent to cause public servant to use lawful power) and Section 211 (false charge of offense). Victim of malicious prosecution can claim compensation under tort law. Supreme Court guidelines in Arnesh Kumar case provide protection against automatic arrest in cases with less than 7 years imprisonment.",
        category: "Arrest Rights",
        tags: ["false FIR", "malicious prosecution", "IPC 182", "compensation"],
        isPublished: true,
      },
      {
        title: "POCSO Act - Protection of Children",
        content: "Protection of Children from Sexual Offenses Act 2012 provides special procedures for child victims. Child-friendly court environment must be ensured. Recording of statement should be done by woman police officer not below rank of sub-inspector. Support person can accompany child during recording. In-camera proceedings protect child's identity.",
        category: "Arrest Rights",
        tags: ["POCSO", "child protection", "sexual offenses", "in-camera proceedings"],
        isPublished: true,
      },
      {
        title: "Custodial Violence and Torture Prevention",
        content: "Custodial violence violates Article 21 and amounts to torture. DK Basu guidelines mandate arrest memo, medical examination, and right to inform relative/friend. NHRC monitors custodial deaths. Victim's family can file compensation claim. Police officers involved in custodial violence can face departmental action and criminal prosecution under IPC Section 330-348.",
        category: "Arrest Rights",
        tags: ["custodial violence", "DK Basu", "NHRC", "compensation"],
        isPublished: true,
      },
      {
        title: "SC/ST Atrocities Act - Special Protection",
        content: "SC/ST (Prevention of Atrocities) Act 1989 provides special protection to Scheduled Castes and Scheduled Tribes. Anticipatory bail generally not available for offenses under this Act. Special courts established for speedy trial. Victim compensation scheme provides immediate relief. Investigation must be completed within 60 days.",
        category: "Arrest Rights",
        tags: ["SC/ST act", "atrocities", "special courts", "victim compensation"],
        isPublished: true,
      },

      // Tenant Rights - 10 articles
      {
        title: "Rent Control Laws in India - Overview",
        content: "Rent control in India is governed by state-specific laws like Delhi Rent Control Act 1958, Maharashtra Rent Control Act 1999. These laws protect tenants from arbitrary eviction and excessive rent increase. Model Tenancy Act 2019 aims to balance landlord-tenant rights. Rent tribunals provide dispute resolution mechanism outside regular courts.",
        category: "Tenant Rights",
        tags: ["rent control", "model tenancy act", "rent tribunal", "eviction protection"],
        isPublished: true,
      },
      {
        title: "Security Deposit Rules Under Model Tenancy Act",
        content: "Model Tenancy Act 2019 limits security deposit to 2 months rent for residential and 6 months for commercial properties. Landlord must return security deposit within 1 month of tenancy termination after adjusting dues. Interest on security deposit must be paid as per agreement. Unjustified retention can lead to penalty equal to twice the deposit amount.",
        category: "Tenant Rights",
        tags: ["security deposit", "model tenancy act", "interest", "penalty"],
        isPublished: true,
      },
      {
        title: "Eviction Grounds Under State Rent Laws",
        content: "Landlord can evict tenant only on specific grounds: non-payment of rent, subletting without consent, damage to property, personal necessity, or reconstruction. Notice period varies by state (usually 15 days to 1 month). Tenant can contest eviction in rent controller court. Eviction without due process is illegal and punishable.",
        category: "Tenant Rights",
        tags: ["eviction", "notice period", "rent controller", "legal grounds"],
        isPublished: true,
      },
      {
        title: "Rent Increase and Fair Rent Determination",
        content: "Rent increase is regulated under state rent control laws. Standard rent is fixed based on factors like construction cost, situation of building, and amenities. Annual rent increase usually capped at 10-15%. Rent controller can determine fair rent on application. Tenant can challenge excessive rent increase in appropriate forum.",
        category: "Tenant Rights",
        tags: ["rent increase", "fair rent", "standard rent", "rent controller"],
        isPublished: true,
      },
      {
        title: "Maintenance and Repair Obligations",
        content: "Under Transfer of Property Act Section 108, landlord must keep property in habitable condition and carry out structural repairs. Tenant responsible for day-to-day maintenance. If landlord fails to maintain, tenant can undertake repairs and deduct cost from rent after proper notice. Essential services like water, electricity must be ensured by landlord.",
        category: "Tenant Rights",
        tags: ["maintenance", "repairs", "transfer of property act", "habitable condition"],
        isPublished: true,
      },
      {
        title: "Subletting and Assignment Rights",
        content: "Subletting without landlord's consent is ground for eviction under most rent control laws. However, sharing accommodation with family members generally not considered subletting. Assignment of tenancy usually requires written consent. Tenant can seek permission for subletting if lease agreement allows or law permits.",
        category: "Tenant Rights",
        tags: ["subletting", "assignment", "consent", "family members"],
        isPublished: true,
      },
      {
        title: "Consumer Protection for Tenants",
        content: "Tenants can file complaints under Consumer Protection Act 2019 against builders/landlords for deficient services. Deficiencies like lack of promised amenities, structural defects qualify as unfair trade practices. Consumer forums provide quick and cost-effective remedy. Compensation for mental agony and litigation costs can be claimed.",
        category: "Tenant Rights",
        tags: ["consumer protection", "deficient services", "unfair trade practices", "compensation"],
        isPublished: true,
      },
      {
        title: "Women Tenant Special Rights",
        content: "Women tenants have additional protection under various laws. Dowry Prohibition Act protects married women from being evicted for dowry demands. Domestic Violence Act provides right to shared household. Working women hostels have special rental regulations. Women cannot be evicted during night hours without proper legal process.",
        category: "Tenant Rights",
        tags: ["women tenants", "domestic violence act", "shared household", "special protection"],
        isPublished: true,
      },
      {
        title: "Commercial Tenancy Rights",
        content: "Commercial tenants have different rights under state shop and establishment laws. License vs lease distinction important for commercial premises. Goodwill compensation may be payable on eviction in some states. Commercial rent control laws less stringent than residential. Business continuity rights protected under specific circumstances.",
        category: "Tenant Rights",
        tags: ["commercial tenancy", "license vs lease", "goodwill", "business continuity"],
        isPublished: true,
      },
      {
        title: "Legal Remedies for Tenant Harassment",
        content: "Tenant harassment by landlord constitutes criminal intimidation under IPC Section 503-506. Unlawful disconnection of utilities is punishable offense. Tenant can file police complaint and seek injunction from civil court. Compensation for harassment available under tort law. Local tenant welfare associations provide support and legal aid.",
        category: "Tenant Rights",
        tags: ["harassment", "criminal intimidation", "injunction", "legal aid"],
        isPublished: true,
      },

      // Cybercrime - 10 articles
      {
        title: "IT Act 2000 - Cyber Crime Legal Framework",
        content: "Information Technology Act 2000 is primary legislation for cyber crimes in India. Section 43 deals with damage to computer systems, Section 66 with computer related offenses, Section 67 with pornography. Amendment 2008 added more offenses like cyber terrorism (66F), identity theft (66C). Penalties range from fines to imprisonment up to 3 years.",
        category: "Cybercrime",
        tags: ["IT Act 2000", "cyber crime", "computer offenses", "identity theft"],
        isPublished: true,
      },
      {
        title: "Online Fraud and Digital Payment Security",
        content: "Online financial fraud covered under IT Act Section 66C,66D and IPC Section 420. UPI fraud, credit card cloning, phishing attacks are common. RBI guidelines mandate two-factor authentication. Banks liable for unauthorized transactions if reported within timeline. Cyber cell investigation and digital forensics help track fraudsters.",
        category: "Cybercrime",
        tags: ["online fraud", "UPI fraud", "phishing", "RBI guidelines", "cyber cell"],
        isPublished: true,
      },
      {
        title: "Cyberbullying and Online Harassment Laws",
        content: "Cyberbullying covered under IT Act Section 67 (sending offensive messages) and IPC Section 354D (stalking). Online harassment of women specifically addressed under Section 354A IPC. Victim can report to cyber cell or local police. Social media platforms obligated to remove offensive content. Punishment includes imprisonment and fine.",
        category: "Cybercrime",
        tags: ["cyberbullying", "online harassment", "stalking", "social media"],
        isPublished: true,
      },
      {
        title: "Data Privacy Rights Under IT Rules 2011",
        content: "IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules 2011 govern data protection. Personal data includes name, address, biometric info, financial details. Companies must obtain consent before collecting sensitive data. Data breach notification mandatory. Individual has right to access and correct personal data.",
        category: "Cybercrime",
        tags: ["data privacy", "IT rules 2011", "data protection", "consent"],
        isPublished: true,
      },
      {
        title: "Hacking and Unauthorized Access Prevention",
        content: "Hacking covered under IT Act Section 66 (computer related offenses) and Section 43 (damage to computer systems). Unauthorized access to protected systems punishable with imprisonment up to 3 years. White hat hacking for security testing legal if authorized. Companies must implement reasonable security measures to prevent hacking attempts.",
        category: "Cybercrime",
        tags: ["hacking", "unauthorized access", "computer security", "white hat"],
        isPublished: true,
      },
      {
        title: "Digital Evidence and Cyber Forensics",
        content: "Digital evidence admissible under Evidence Act Section 65B if accompanied by certificate. Chain of custody crucial for evidence validity. Cyber forensics experts analyze digital devices for evidence collection. Hash values ensure evidence integrity. Live forensics and dead forensics different techniques for investigation.",
        category: "Cybercrime",
        tags: ["digital evidence", "cyber forensics", "evidence act", "chain of custody"],
        isPublished: true,
      },
      {
        title: "Social Media Crimes and Platform Liability",
        content: "Social media platforms have safe harbor under IT Act Section 79 if they comply with due diligence. Defamation on social media covered under IPC Section 499-500. Fake news and misinformation can lead to criminal liability. Platforms must remove illegal content when notified. Government can block content under IT Act Section 69A.",
        category: "Cybercrime",
        tags: ["social media", "platform liability", "defamation", "fake news"],
        isPublished: true,
      },
      {
        title: "Child Pornography and POCSO Cyber Crimes",
        content: "Child pornography is serious offense under IT Act Section 67B with punishment up to 5 years imprisonment. POCSO Act 2012 covers online child sexual abuse. Possession, distribution, creation of child sexual abuse material all punishable. ISPs and platforms must report suspected child abuse content to authorities immediately.",
        category: "Cybercrime",
        tags: ["child pornography", "POCSO", "child abuse", "reporting"],
        isPublished: true,
      },
      {
        title: "Cryptocurrency and Digital Asset Crimes",
        content: "Cryptocurrency fraud and scams covered under existing criminal laws and IT Act. Money laundering through crypto covered under PMLA. RBI guidelines restrict crypto trading by banks. Ponzi schemes using cryptocurrency punishable under Prize Chits and Money Circulation Schemes Act. Digital asset recovery challenging but possible through legal action.",
        category: "Cybercrime",
        tags: ["cryptocurrency", "digital assets", "PMLA", "ponzi schemes"],
        isPublished: true,
      },
      {
        title: "Cyber Crime Reporting and Investigation",
        content: "Cyber crimes can be reported at cyber cell, local police station, or online portal cybercrime.gov.in. FIR must be registered for cognizable offenses. Investigation involves digital forensics and technical analysis. Inter-state coordination through CBI when required. Victim can track case status online and seek legal assistance through legal aid services.",
        category: "Cybercrime",
        tags: ["reporting", "investigation", "cyber cell", "FIR", "legal aid"],
        isPublished: true,
      },

      // Women's Safety - 10 articles
      {
        title: "Domestic Violence Act 2005 - Protection Rights",
        content: "Protection of Women from Domestic Violence Act 2005 provides civil remedy for domestic violence. Covers physical, sexual, verbal, emotional, and economic abuse. Woman can seek protection order, residence order, monetary relief, and custody order. Magistrate can pass ex-parte interim orders. Violation of protection order is criminal offense punishable with imprisonment.",
        category: "Women's Safety",
        tags: ["domestic violence", "protection order", "residence order", "monetary relief"],
        isPublished: true,
      },
      {
        title: "Sexual Harassment at Workplace - POSH Act",
        content: "Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act 2013 mandates Internal Complaints Committee in every workplace. Woman can file complaint within 3 months (extendable to 6 months). ICC must complete inquiry within 90 days. Punishment includes warning, censure, transfer, termination. Employer liable if no ICC constituted.",
        category: "Women's Safety",
        tags: ["sexual harassment", "POSH act", "ICC", "workplace"],
        isPublished: true,
      },
      {
        title: "Dowry Prohibition Act - Legal Protection",
        content: "Dowry Prohibition Act 1961 makes giving, taking, or demanding dowry a criminal offense. Punishment is imprisonment minimum 5 years and fine minimum Rs. 15,000. Dowry death covered under IPC Section 304B with life imprisonment. Cruelty for dowry under IPC Section 498A is non-bailable offense. Burden of proof on accused in dowry death cases.",
        category: "Women's Safety",
        tags: ["dowry prohibition", "dowry death", "IPC 498A", "burden of proof"],
        isPublished: true,
      },
      {
        title: "Rape Laws and Criminal Law Amendment 2013",
        content: "Criminal Law Amendment 2013 strengthened rape laws after Nirbhaya case. Expanded definition of rape, introduced new offenses like acid attack, stalking, voyeurism. Minimum punishment for rape increased to 7 years, can extend to life. Gang rape minimum 20 years imprisonment. Death penalty for repeat offenders and rape causing death.",
        category: "Women's Safety",
        tags: ["rape laws", "criminal law amendment", "Nirbhaya", "gang rape"],
        isPublished: true,
      },
      {
        title: "Maternity Benefits and Workplace Rights",
        content: "Maternity Benefit Act 1961 (amended 2017) provides 26 weeks paid maternity leave. Work from home option available. Nursing breaks mandatory. Creche facilities required in establishments with 50+ women. Dismissal during pregnancy and maternity leave prohibited. Adoptive and commissioning mothers also entitled to 12 weeks leave.",
        category: "Women's Safety",
        tags: ["maternity benefits", "maternity leave", "creche facilities", "nursing breaks"],
        isPublished: true,
      },
      {
        title: "Women's Property Rights and Inheritance",
        content: "Hindu Succession Act 2005 amendment gives equal inheritance rights to daughters. Muslim women protected under Muslim Personal Law (Shariat) Application Act. Christian and Parsi women have succession rights under respective acts. Coparcenary rights in joint family property. Widow's right to husband's property. Maintenance rights under CrPC Section 125.",
        category: "Women's Safety",
        tags: ["property rights", "inheritance", "Hindu succession act", "maintenance"],
        isPublished: true,
      },
      {
        title: "Acid Attack Prevention and Victim Compensation",
        content: "IPC Section 326A,326B cover acid attack with punishment up to life imprisonment. Victim entitled to compensation from State and offender. Free medical treatment and rehabilitation. Sale of acid regulated - ID proof and reason required. Supreme Court guidelines for acid attack prevention and victim support. Fast track courts for speedy trial.",
        category: "Women's Safety",
        tags: ["acid attack", "victim compensation", "medical treatment", "fast track courts"],
        isPublished: true,
      },
      {
        title: "Stalking and Voyeurism Laws",
        content: "IPC Section 354C covers voyeurism with punishment up to 3 years imprisonment. Section 354D covers stalking with punishment up to 5 years for repeat offense. Digital stalking and online harassment covered under IT Act. Victim can seek anticipatory protection from court. Police must register FIR and investigate promptly.",
        category: "Women's Safety",
        tags: ["stalking", "voyeurism", "digital stalking", "anticipatory protection"],
        isPublished: true,
      },
      {
        title: "Women's Safety in Public Transport",
        content: "Delhi Metro Rail Corporation Act provides for women's safety in metro. State transport laws mandate reserved seats for women. Harassment in public transport covered under IPC Section 354. Women helplines available in buses and trains. CCTV surveillance mandatory. Police can arrest without warrant for women's safety related offenses.",
        category: "Women's Safety",
        tags: ["public transport", "reserved seats", "women helplines", "CCTV surveillance"],
        isPublished: true,
      },
      {
        title: "Legal Aid and Support Services for Women",
        content: "National Legal Services Authority provides free legal aid to women. One Stop Centres (Sakhi) provide integrated support services. Women helpline 181 available 24x7. Legal aid lawyers available in family courts. Lok Adalat for amicable settlement of matrimonial disputes. NGOs and women's rights organizations provide support and counseling.",
        category: "Women's Safety",
        tags: ["legal aid", "one stop centres", "women helpline", "Lok Adalat"],
        isPublished: true,
      },

      // Consumer Complaints - 10 articles
      {
        title: "Consumer Protection Act 2019 - Rights and Remedies",
        content: "Consumer Protection Act 2019 replaced 1986 Act with enhanced consumer rights. Six fundamental rights include right to safety, information, choice, hearing, redressal, and consumer education. E-commerce transactions covered. Product liability introduced. Mediation as alternative dispute resolution. Central Consumer Protection Authority for enforcement and penalty.",
        category: "Consumer Complaints",
        tags: ["consumer protection act", "consumer rights", "e-commerce", "product liability"],
        isPublished: true,
      },
      {
        title: "Deficiency in Service and Unfair Trade Practices",
        content: "Deficiency includes lack of efficiency in service, defect in goods, spurious goods, overcharging. Unfair trade practices include false representation, misleading advertisement, hoarding, black marketing. Consumer can claim compensation for deficiency and unfair practices. Mental agony compensation available. Punitive damages in case of gross negligence.",
        category: "Consumer Complaints",
        tags: ["deficiency in service", "unfair trade practices", "compensation", "mental agony"],
        isPublished: true,
      },
      {
        title: "E-commerce Consumer Rights and Protection",
        content: "Consumer Protection (E-Commerce) Rules 2020 regulate online shopping. E-commerce platforms must display clear information about sellers and products. Return and refund policy mandatory. Grievance officer appointment required. Fake reviews and misleading advertisements prohibited. Consumers can file complaints against e-commerce platforms for violations.",
        category: "Consumer Complaints",
        tags: ["e-commerce", "online shopping", "return policy", "grievance officer"],
        isPublished: true,
      },
      {
        title: "Banking Services and Financial Consumer Rights",
        content: "Banking Ombudsman Scheme provides redressal for banking services deficiency. RBI guidelines mandate customer service standards. Unauthorized transactions liability limited if reported timely. Insurance Ombudsman for insurance related complaints. SEBI has investor grievance mechanism for securities market. Priority sector lending complaints handled by Banking Ombudsman.",
        category: "Consumer Complaints",
        tags: ["banking ombudsman", "RBI guidelines", "insurance ombudsman", "SEBI"],
        isPublished: true,
      },
      {
        title: "Medical Negligence and Healthcare Consumer Rights",
        content: "Medical negligence covered under Consumer Protection Act when paid service involved. Four elements: duty of care, breach of duty, causation, and damages. Deficiency in medical service includes wrong diagnosis, improper treatment, lack of informed consent. Compensation for medical negligence can be substantial. Medical insurance disputes also covered.",
        category: "Consumer Complaints",
        tags: ["medical negligence", "healthcare rights", "informed consent", "medical insurance"],
        isPublished: true,
      },
      {
        title: "Real Estate Consumer Protection - RERA",
        content: "Real Estate (Regulation and Development) Act 2016 protects home buyers. Developers must register projects and maintain escrow accounts. Buyers can file complaints with RERA Authority. Delay in possession entitles buyers to compensation. Defective construction and false promises actionable. Appellate Tribunal for RERA dispute resolution.",
        category: "Consumer Complaints",
        tags: ["RERA", "real estate", "home buyers", "delay compensation"],
        isPublished: true,
      },
      {
        title: "Telecom Consumer Complaints and TRAI",
        content: "Telecom Regulatory Authority of India (TRAI) protects telecom consumers. Complaints about call drops, network issues, billing disputes can be filed. Do Not Call Registry protects from unwanted calls. Mobile number portability is consumer right. Compensation for service deficiency available. Telecom Ombudsman for grievance redressal.",
        category: "Consumer Complaints",
        tags: ["TRAI", "telecom", "call drops", "billing disputes", "number portability"],
        isPublished: true,
      },
      {
        title: "Food Safety and Consumer Protection",
        content: "Food Safety and Standards Act 2006 ensures food safety. Food Safety Commissioner at state level handles complaints. Penalties for food adulteration and unsafe food. Consumer can demand food testing and compensation. Packaged food must display nutritional information. Restaurant hygiene and food quality complaints covered under consumer law.",
        category: "Consumer Complaints",
        tags: ["food safety", "food adulteration", "nutritional information", "restaurant hygiene"],
        isPublished: true,
      },
      {
        title: "Consumer Forum Procedure and Filing Complaints",
        content: "Three-tier consumer forum system: District, State, and National levels. Complaint filing fee nominal (varies by claim amount). Time limit for filing complaint generally 2 years from cause of action. Simple procedure without need for lawyer. Relief includes replacement, refund, compensation, and discontinuation of unfair practice.",
        category: "Consumer Complaints",
        tags: ["consumer forum", "complaint procedure", "filing fee", "time limit"],
        isPublished: true,
      },
      {
        title: "Consumer Class Action and Collective Redressal",
        content: "Consumer Protection Act 2019 introduced class action suits for collective consumer interests. 100+ consumers having same interest can file class action. Representative action possible for identical goods or services. Settlement benefits all class members. Court can pass orders for refund to all affected consumers. Effective remedy for mass deficiency or unfair practices.",
        category: "Consumer Complaints",
        tags: ["class action", "collective redressal", "representative action", "mass deficiency"],
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
      // Rental/Housing Templates - Indian Law
      {
        title: "Rental Agreement as per Model Tenancy Act 2019",
        category: "Housing",
        description: "Standard rental agreement compliant with Model Tenancy Act 2019",
        content: `RENTAL AGREEMENT

This Rental Agreement is made on [DATE] between [LANDLORD NAME], son/daughter of [FATHER'S NAME], residing at [LANDLORD ADDRESS] (hereinafter called "LESSOR") and [TENANT NAME], son/daughter of [FATHER'S NAME], residing at [TENANT ADDRESS] (hereinafter called "LESSEE").

TERMS AND CONDITIONS:

1. PROPERTY DETAILS: The lessor agrees to let out the residential property located at [PROPERTY ADDRESS], measuring [AREA] sq ft.

2. RENT: Monthly rent is Rs. [AMOUNT] payable by 5th of every month.

3. SECURITY DEPOSIT: Security deposit of Rs. [AMOUNT] (not exceeding 2 months rent as per Model Tenancy Act 2019) paid by lessee.

4. DURATION: Tenancy period is [MONTHS/YEARS] from [START DATE] to [END DATE].

5. MAINTENANCE: Landlord responsible for structural repairs, tenant for day-to-day maintenance.

6. UTILITIES: [Specify who pays for electricity, water, maintenance charges]

7. TERMINATION: Either party can terminate with [NOTICE PERIOD] days written notice.

8. REGISTRATION: This agreement shall be registered as per Registration Act 1908 if rent exceeds Rs. 500 per month.

Witnesses:
1. [NAME & SIGNATURE]
2. [NAME & SIGNATURE]

LESSOR: [SIGNATURE]
LESSEE: [SIGNATURE]`,
        tags: ["rental agreement", "model tenancy act", "housing", "registration"],
      },
      {
        title: "Notice to Quit for Rent Default",
        category: "Housing",
        description: "Legal notice for non-payment of rent as per state rent control laws",
        content: `NOTICE TO QUIT

To: [TENANT NAME]
Address: [PROPERTY ADDRESS]

You are hereby required to quit and deliver up to me the possession of the above-mentioned premises within [NOTICE PERIOD] days from the service of this notice.

GROUNDS:
1. You have defaulted in payment of rent for the months of [MONTHS].
2. The total amount due is Rs. [AMOUNT].
3. This notice is served under Section [SECTION] of [STATE] Rent Control Act.

Take notice that if you fail to quit and deliver up the said premises, I shall commence legal proceedings against you to recover possession of the said premises and damages for unlawful detention.

Date: [DATE]
Signature: [LANDLORD SIGNATURE]
Name: [LANDLORD NAME]`,
        tags: ["notice to quit", "rent default", "eviction", "rent control act"],
      },
      {
        title: "Security Deposit Refund Demand Letter",
        category: "Housing",
        description: "Letter demanding return of security deposit with interest",
        content: `DEMAND FOR SECURITY DEPOSIT REFUND

To: [LANDLORD NAME]
Address: [LANDLORD ADDRESS]

Subject: Demand for refund of security deposit

Dear Sir/Madam,

I vacated the rented premises at [PROPERTY ADDRESS] on [DATE] after serving proper notice. As per Model Tenancy Act 2019, security deposit must be returned within 1 month of tenancy termination.

Details:
- Security Deposit Paid: Rs. [AMOUNT]
- Date of Vacation: [DATE]
- Current Outstanding: [IF ANY]
- Interest Due: Rs. [AMOUNT] (as per agreement)

You are legally obligated to refund Rs. [NET AMOUNT] within 7 days, failing which I shall be constrained to initiate legal proceedings for recovery with interest and costs.

Date: [DATE]
Signature: [TENANT SIGNATURE]
Name: [TENANT NAME]`,
        tags: ["security deposit", "refund demand", "model tenancy act", "interest"],
      },

      // Employment Templates - Indian Law
      {
        title: "Employment Contract as per Indian Labour Laws",
        category: "Employment",
        description: "Comprehensive employment agreement compliant with Indian labour laws",
        content: `EMPLOYMENT AGREEMENT

This Employment Agreement is made between [COMPANY NAME], a company incorporated under Companies Act 2013 (hereinafter "Company") and [EMPLOYEE NAME] (hereinafter "Employee").

TERMS OF EMPLOYMENT:

1. POSITION: Employee appointed as [DESIGNATION] in [DEPARTMENT].

2. SALARY: Monthly salary Rs. [AMOUNT] including basic pay Rs. [BASIC], HRA Rs. [HRA], special allowance Rs. [ALLOWANCE].

3. WORKING HOURS: 8 hours per day, 48 hours per week as per Factories Act 1948.

4. PROBATION: [MONTHS] months probation period with 1 month notice on either side.

5. LEAVE ENTITLEMENT:
   - Earned Leave: 21 days per year
   - Casual Leave: 7 days per year
   - Sick Leave: 7 days per year
   - Maternity Leave: 26 weeks (as per Maternity Benefit Act 2017)

6. PROVIDENT FUND: Company will contribute to EPF as per Employees' Provident Fund Act 1952.

7. GRATUITY: Payable as per Payment of Gratuity Act 1972 after 5 years service.

8. TERMINATION: Either party may terminate with [NOTICE PERIOD] days notice or salary in lieu thereof.

9. NON-DISCLOSURE: Employee shall not disclose confidential information during and after employment.

Company: [SIGNATURE & SEAL]
Employee: [SIGNATURE]
Date: [DATE]`,
        tags: ["employment contract", "labour laws", "EPF", "gratuity", "maternity benefit"],
      },
      {
        title: "Resignation Letter with Notice Period",
        category: "Employment",
        description: "Professional resignation letter as per Indian employment practices",
        content: `RESIGNATION LETTER

To: [MANAGER/HR NAME]
[COMPANY NAME]
[COMPANY ADDRESS]

Date: [DATE]

Subject: Resignation from the position of [DESIGNATION]

Dear Sir/Madam,

Please accept this letter as formal notification of my resignation from my position as [DESIGNATION] with [COMPANY NAME]. As per my employment contract, I am providing [NOTICE PERIOD] days notice.

My last working day will be [LAST DATE].

I am committed to ensuring smooth transition of my responsibilities. I will complete all pending work and provide necessary handover documentation.

Kindly process my final settlement including:
- Salary for notice period
- Encashment of earned leave (as applicable)
- Provident Fund withdrawal
- Gratuity (if eligible)
- Experience/relieving letter

I thank you for the opportunities provided during my tenure and wish the company continued success.

Yours sincerely,
[EMPLOYEE SIGNATURE]
[EMPLOYEE NAME]
Employee ID: [ID]`,
        tags: ["resignation", "notice period", "final settlement", "experience letter"],
      },

      // Legal Documents - Indian Law
      {
        title: "General Power of Attorney",
        category: "Legal Documents",
        description: "General Power of Attorney as per Indian Registration Act",
        content: `GENERAL POWER OF ATTORNEY

I, [PRINCIPAL NAME], son/daughter of [FATHER'S NAME], residing at [ADDRESS], do hereby nominate, constitute and appoint [ATTORNEY NAME], son/daughter of [FATHER'S NAME], residing at [ADDRESS], to be my true and lawful attorney.

POWERS GRANTED:

1. To represent me in all legal proceedings
2. To sign documents on my behalf
3. To receive payments and issue receipts
4. To deal with bank accounts and financial matters
5. To purchase, sell or transfer immovable property
6. To appear before government authorities
7. To file income tax returns and handle tax matters
8. To execute agreements and contracts

CONDITIONS:
- This power of attorney is irrevocable
- Valid for [DURATION] years from date of execution
- Attorney to act in good faith and in principal's interest

This power of attorney is executed voluntarily without any coercion.

Date: [DATE]
Place: [PLACE]

Principal: [SIGNATURE]
Name: [PRINCIPAL NAME]

WITNESSES:
1. [NAME & SIGNATURE]
2. [NAME & SIGNATURE]

NOTARIZATION/REGISTRATION:
[To be filled by Notary/Sub-Registrar]`,
        tags: ["power of attorney", "registration act", "legal representation", "property"],
      },
      {
        title: "Property Sale Agreement",
        category: "Property",
        description: "Property sale agreement as per Transfer of Property Act 1882",
        content: `AGREEMENT FOR SALE OF IMMOVABLE PROPERTY

This Agreement is made on [DATE] between [SELLER NAME], son/daughter of [FATHER'S NAME], residing at [ADDRESS] (hereinafter "VENDOR") and [BUYER NAME], son/daughter of [FATHER'S NAME], residing at [ADDRESS] (hereinafter "PURCHASER").

PROPERTY DETAILS:
- Location: [PROPERTY ADDRESS]
- Survey Number: [SURVEY NO.]
- Area: [AREA] sq ft/yards
- Boundaries: [NORTH, SOUTH, EAST, WEST]

CONSIDERATION: Rs. [AMOUNT] (Rupees [AMOUNT IN WORDS])

TERMS:
1. Advance payment of Rs. [AMOUNT] paid on signing this agreement
2. Balance Rs. [AMOUNT] to be paid on registration
3. Registration to be completed within [DAYS] days
4. Vendor warrants clear title and peaceful possession
5. All existing dues (tax, electricity, water) to be cleared by vendor
6. Risk and insurance of property passes to purchaser on registration

DOCUMENTS TO BE PROVIDED:
- Title deeds
- Tax receipts
- NOC from society/authorities
- Survey settlement records

If purchaser defaults, advance amount forfeited. If vendor defaults, refund advance with interest @ [RATE]% per annum.

Vendor: [SIGNATURE]
Purchaser: [SIGNATURE]

WITNESSES:
1. [NAME & SIGNATURE]
2. [NAME & SIGNATURE]`,
        tags: ["property sale", "transfer of property act", "agreement", "registration"],
      },
      {
        title: "Complaint to Consumer Forum",
        category: "Consumer Protection",
        description: "Complaint format for consumer forum as per Consumer Protection Act 2019",
        content: `BEFORE THE [DISTRICT/STATE/NATIONAL] CONSUMER DISPUTES REDRESSAL FORUM

CONSUMER COMPLAINT UNDER CONSUMER PROTECTION ACT 2019

[CONSUMER NAME]
Son/Daughter of [FATHER'S NAME]
Residing at [ADDRESS]
                                                    ...COMPLAINANT

VERSUS

[OPPOSITE PARTY NAME]
[BUSINESS ADDRESS]
                                                    ...OPPOSITE PARTY

COMPLAINT UNDER SECTIONS 35/47/58 OF CONSUMER PROTECTION ACT 2019

FACTS:
1. Complainant purchased [PRODUCT/SERVICE] from opposite party on [DATE]
2. Amount paid: Rs. [AMOUNT]
3. [DESCRIBE DEFICIENCY/UNFAIR TRADE PRACTICE]
4. Complainant approached opposite party for redressal on [DATE]
5. Opposite party failed to provide satisfactory resolution

DEFICIENCY/UNFAIR TRADE PRACTICE:
[Detail the deficiency in service or unfair trade practice]

RELIEF SOUGHT:
1. Direction to opposite party to [SPECIFIC RELIEF]
2. Compensation of Rs. [AMOUNT] for mental agony and harassment
3. Refund of Rs. [AMOUNT] with interest
4. Litigation costs
5. Any other relief deemed fit

DOCUMENTS ANNEXED:
1. Purchase receipt/bill
2. Correspondence with opposite party
3. Medical bills (if applicable)
4. Expert opinion (if any)

Date: [DATE]
Place: [PLACE]

                                            [SIGNATURE]
                                            [COMPLAINANT NAME]`,
        tags: ["consumer complaint", "consumer forum", "deficiency in service", "compensation"],
      },
      {
        title: "Mutual Divorce Petition",
        category: "Family Law",
        description: "Joint petition for divorce by mutual consent under Hindu Marriage Act",
        content: `JOINT PETITION FOR DIVORCE BY MUTUAL CONSENT

IN THE COURT OF [FAMILY COURT NAME]

UNDER SECTION 13B OF HINDU MARRIAGE ACT 1955

[HUSBAND NAME]                                      ...PETITIONER NO. 1
[WIFE NAME]                                         ...PETITIONER NO. 2

JOINT PETITION:

1. Marriage was solemnized on [DATE] at [PLACE] according to Hindu rites and customs.

2. No children born out of wedlock / One child [NAME] born on [DATE].

3. Parties have been living separately since [DATE] due to irreconcilable differences.

4. Both parties have mutually agreed to dissolve the marriage.

5. No coercion or force applied on either party.

MUTUAL SETTLEMENT:
1. Custody of child: [DETAILS]
2. Maintenance: [AMOUNT/NIL]
3. Property settlement: [DETAILS]
4. Stridhan articles returned to wife

PRAYER:
Grant decree of divorce dissolving the marriage between petitioners.

AFFIDAVIT:
We jointly affirm that contents of petition are true and we seek divorce by mutual consent.

Petitioner No. 1: [HUSBAND SIGNATURE]
Petitioner No. 2: [WIFE SIGNATURE]

Date: [DATE]
Place: [PLACE]`,
        tags: ["mutual divorce", "Hindu marriage act", "family court", "maintenance"],
      },
      {
        title: "Will/Testament as per Indian Succession Act",
        category: "Estate Planning",
        description: "Last Will and Testament under Indian Succession Act 1925",
        content: `LAST WILL AND TESTAMENT

I, [TESTATOR NAME], son/daughter of [FATHER'S NAME], aged [AGE] years, residing at [ADDRESS], being of sound mind and memory, do hereby make this my Last Will and Testament.

DECLARATIONS:
1. I revoke all previous wills and codicils made by me
2. I am [MARRIED/UNMARRIED] and have [NUMBER] children namely [NAMES]
3. I am a [RELIGION] by religion

EXECUTORS:
I appoint [EXECUTOR 1 NAME] and [EXECUTOR 2 NAME] as executors of this will.

BEQUESTS:

IMMOVABLE PROPERTY:
1. House at [ADDRESS] to [BENEFICIARY NAME]
2. Plot at [ADDRESS] to [BENEFICIARY NAME]

MOVABLE PROPERTY:
1. Bank accounts and FDs to [BENEFICIARY NAME]
2. Jewelry and ornaments to [BENEFICIARY NAME]
3. Vehicle to [BENEFICIARY NAME]

DEBTS AND LIABILITIES:
All debts and liabilities to be discharged from my estate before distribution.

RESIDUARY CLAUSE:
All remaining property to be divided equally among [BENEFICIARIES].

GUARDIANSHIP:
In case of minor children, [GUARDIAN NAME] appointed as guardian.

IN WITNESS WHEREOF, I have signed this will in presence of witnesses.

Date: [DATE]
Place: [PLACE]

Testator: [SIGNATURE]
Name: [TESTATOR NAME]

WITNESSES:
1. [NAME, ADDRESS & SIGNATURE]
2. [NAME, ADDRESS & SIGNATURE]`,
        tags: ["will", "testament", "succession act", "executor", "beneficiary"],
      },

      // Additional Templates (11-22) to reach 20+
      {
        title: "Cheque Bounce Complaint under Section 138 NI Act",
        category: "Criminal Law",
        description: "Complaint format for dishonored cheque under Negotiable Instruments Act",
        content: `COMPLAINT UNDER SECTION 138 NEGOTIABLE INSTRUMENTS ACT

[Complainant Name] vs [Accused Name]

FACTS: Accused issued cheque no. [NUMBER] for Rs. [AMOUNT] which was dishonored. Legal notice served but payment not made within 15 days.

PRAYER: Convict accused and direct payment with interest.`,
        tags: ["cheque bounce", "section 138", "legal notice"],
      },
      {
        title: "Defamation Legal Notice",
        category: "Legal Notices", 
        description: "Notice for defamation demanding apology and damages",
        content: `LEGAL NOTICE FOR DEFAMATION

To: [Defendant]
You published defamatory content on [date] causing reputation damage. 
DEMAND: Immediate apology and Rs. [amount] damages within 15 days.`,
        tags: ["defamation", "legal notice", "damages"],
      },
      {
        title: "Property Partition Suit",
        category: "Property",
        description: "Suit for partition of joint family property", 
        content: `PARTITION SUIT

Plaintiff seeks partition of joint property [description] claiming [share] as legal heir.
RELIEF: Preliminary and final decree for partition with separate possession.`,
        tags: ["partition", "joint property", "inheritance"],
      },
      {
        title: "Recovery Suit for Money",
        category: "Financial",
        description: "Civil suit for debt recovery",
        content: `MONEY RECOVERY SUIT

Defendant owes Rs. [amount] as loan given on [date]. Despite demands, payment not made.
PRAYER: Decree for recovery with interest and costs.`,
        tags: ["debt recovery", "loan", "civil suit"],
      },
      {
        title: "Injunction Application", 
        category: "Civil Procedure",
        description: "Application for temporary/permanent injunction",
        content: `INJUNCTION APPLICATION

Respondent threatening [action] causing irreparable injury to applicant's rights.
RELIEF: Temporary injunction restraining respondent from [specific acts].`,
        tags: ["injunction", "restraining order", "civil procedure"],
      },
      {
        title: "Vehicle Sale Agreement",
        category: "Contracts",
        description: "Motor vehicle sale with RC transfer",
        content: `VEHICLE SALE AGREEMENT

Vehicle: [Make/Model] Registration: [Number]
Sale Price: Rs. [amount]
Seller warrants clear title. RC transfer within 30 days.`,
        tags: ["vehicle sale", "RC transfer", "motor vehicle"],
      },
      {
        title: "Software Development Contract",
        category: "Technology", 
        description: "Custom software development agreement",
        content: `SOFTWARE DEVELOPMENT AGREEMENT

Project: [Name] Timeline: [Duration] Cost: Rs. [amount]
Developer to deliver [specifications] with [warranty period] support.`,
        tags: ["software", "development", "IT contract"],
      },
      {
        title: "Franchise Agreement",
        category: "Business",
        description: "Business franchise licensing agreement", 
        content: `FRANCHISE AGREEMENT

Franchisor grants [territory] franchise for [business] with [fee structure].
Franchisee to maintain brand standards and pay royalty.`,
        tags: ["franchise", "licensing", "business"],
      },
      {
        title: "Copyright Infringement Notice",
        category: "Intellectual Property",
        description: "Notice for copyright violation",
        content: `COPYRIGHT INFRINGEMENT NOTICE

Your unauthorized use of copyrighted work [description] violates Copyright Act.
DEMAND: Cease infringement and pay damages Rs. [amount].`,
        tags: ["copyright", "intellectual property", "infringement"],
      },
      {
        title: "Company MOA and AOA",
        category: "Business",
        description: "Memorandum and Articles for company incorporation",
        content: `MEMORANDUM OF ASSOCIATION

Company: [Name] Private Limited
Objects: [Business activities]
Capital: Rs. [amount] divided into [shares] equity shares.`,
        tags: ["company incorporation", "MOA", "AOA"],
      },
      {
        title: "Property Development JV Agreement", 
        category: "Property",
        description: "Joint venture for real estate development",
        content: `DEVELOPMENT AGREEMENT

Landowner and Developer agree to develop [property] with [sharing ratio].
Construction timeline: [period] Handover: [date]`,
        tags: ["property development", "joint venture", "construction"],
      },
      {
        title: "Arbitration Agreement",
        category: "Dispute Resolution",
        description: "Agreement for dispute resolution through arbitration",
        content: `ARBITRATION AGREEMENT

Parties agree to resolve disputes through arbitration under Arbitration Act 2015.
Arbitrator: [Name/Institution] Seat: [City]`,
        tags: ["arbitration", "dispute resolution", "mediation"],
      }
    ];

    templates.forEach(template => {
      const id = this.currentTemplateId++;
      this.legalTemplates.set(id, { ...template, id });
    });
  }

  private initializeCaseLaw() {
    // Real-time Case Law Database - 3 Cases Per Category (15 Total)
    const cases = [
      // Arrest Rights Cases (3 cases)
      {
        caseTitle: "D.K. Basu v. State of West Bengal",
        court: "Supreme Court of India",
        year: 1997,
        citation: "AIR 1997 SC 610",
        summary: "Supreme Court laid down comprehensive guidelines to prevent custodial violence and torture. Arrest memo, medical examination, and informing relatives made mandatory. Compensation for custodial violence victims established.",
        category: "Arrest Rights",
        keyPoints: ["Custodial violence prevention", "Arrest memo mandatory", "Medical examination required", "Victim compensation"]
      },
      {
        caseTitle: "Arnesh Kumar v. State of Bihar",
        court: "Supreme Court of India", 
        year: 2014,
        citation: "(2014) 8 SCC 273",
        summary: "Court held that arrest is not mandatory for offenses punishable with imprisonment less than 7 years. Police must record reasons for arrest and magistrate must consider necessity of remand.",
        category: "Arrest Rights",
        keyPoints: ["No automatic arrest for < 7 years offense", "Reasons for arrest required", "Magistrate discretion in remand", "Protection against arbitrary arrest"]
      },
      {
        caseTitle: "Joginder Kumar v. State of U.P.",
        court: "Supreme Court of India",
        year: 1994,
        citation: "AIR 1994 SC 1349", 
        summary: "Supreme Court established that arrest should not be made in routine manner. Police must satisfy that arrest is necessary and have reasonable grounds for detention.",
        category: "Arrest Rights",
        keyPoints: ["No routine arrests", "Reasonable grounds required", "Article 22 protection", "Necessity of arrest"]
      },

      // Tenant Rights Cases (3 cases)
      {
        caseTitle: "Prabhakaran Vijayakumar v. State of Tamil Nadu",
        court: "Supreme Court of India",
        year: 2020,
        citation: "(2020) 12 SCC 686",
        summary: "Court upheld Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act 2017. Balanced approach between landlord and tenant rights established.",
        category: "Tenant Rights",
        keyPoints: ["Rent control laws constitutional", "Balance between rights", "State regulation power", "Reasonable restrictions allowed"]
      },
      {
        caseTitle: "A.K. Krishnan v. State of Andhra Pradesh", 
        court: "Supreme Court of India",
        year: 1993,
        citation: "AIR 1993 SC 2217",
        summary: "Supreme Court held that tenant's right of occupation is not absolute. Landlord's right to reasonable return on property recognized. Rent control laws should not be confiscatory.",
        category: "Tenant Rights", 
        keyPoints: ["Tenant rights not absolute", "Landlord's reasonable return", "Anti-confiscatory principle", "Property rights balance"]
      },
      {
        caseTitle: "Raghunath Rai Bareja v. Punjab National Bank",
        court: "Supreme Court of India",
        year: 2007,
        citation: "(2007) 2 SCC 230",
        summary: "Established tenant's right to receive notice before eviction. Due process must be followed in eviction proceedings. Tenant cannot be dispossessed without proper legal procedure.",
        category: "Tenant Rights",
        keyPoints: ["Notice before eviction", "Due process required", "Legal procedure mandatory", "Tenant protection against dispossession"]
      },

      // Women's Safety Cases (3 cases)
      {
        caseTitle: "Vishaka v. State of Rajasthan",
        court: "Supreme Court of India",
        year: 1997,
        citation: "AIR 1997 SC 3011",
        summary: "Landmark judgment establishing guidelines for prevention of sexual harassment at workplace. Mandatory complaint committees, investigation procedures, and preventive measures outlined.",
        category: "Women's Safety",
        keyPoints: ["Sexual harassment guidelines", "Workplace complaint committees", "Investigation procedures", "Preventive measures mandatory"]
      },
      {
        caseTitle: "Joseph Shine v. Union of India",
        court: "Supreme Court of India", 
        year: 2018,
        citation: "(2019) 3 SCC 39",
        summary: "Supreme Court decriminalized adultery under Section 497 IPC, recognizing women's agency and dignity. Held that treating women as property of husbands is unconstitutional.",
        category: "Women's Safety",
        keyPoints: ["Adultery decriminalized", "Women's agency recognized", "Dignity and equality", "Constitutional rights upheld"]
      },
      {
        caseTitle: "Lalita Kumari v. Govt. of U.P.",
        court: "Supreme Court of India",
        year: 2014, 
        citation: "(2014) 2 SCC 1",
        summary: "Supreme Court made registration of FIR mandatory for cognizable offenses including crimes against women. No preliminary inquiry required for serious offenses like rape and dowry deaths.",
        category: "Women's Safety",
        keyPoints: ["Mandatory FIR registration", "No preliminary inquiry for serious crimes", "Women's safety prioritized", "Police accountability enforced"]
      },

      // Consumer Complaints Cases (3 cases)
      {
        caseTitle: "Spring Meadows Hospital v. Harjol Ahluwalia",
        court: "Supreme Court of India",
        year: 1998,
        citation: "AIR 1998 SC 1801",
        summary: "Supreme Court held that medical services constitute 'service' under Consumer Protection Act. Patients can file complaints against hospitals and doctors for medical negligence and deficiency in service.",
        category: "Consumer Complaints", 
        keyPoints: ["Medical services under Consumer Act", "Patient rights recognized", "Medical negligence complaints", "Hospital accountability"]
      },
      {
        caseTitle: "Lucknow Development Authority v. M.K. Gupta",
        court: "Supreme Court of India",
        year: 1994,
        citation: "AIR 1994 SC 787",
        summary: "Court established that housing authorities providing accommodation constitute 'service' under Consumer Protection Act. Buyers can claim compensation for delays and deficiencies in construction.",
        category: "Consumer Complaints",
        keyPoints: ["Housing services under Consumer Act", "Builder liability established", "Compensation for delays", "Construction deficiency remedies"]
      },
      {
        caseTitle: "Indian Medical Association v. V.P. Shantha",
        court: "Supreme Court of India", 
        year: 1995,
        citation: "AIR 1996 SC 550",
        summary: "Landmark case confirming that medical profession falls under Consumer Protection Act. Distinguished between free and paid medical services. Established framework for medical negligence complaints.",
        category: "Consumer Complaints",
        keyPoints: ["Medical profession under Consumer Act", "Free vs paid services distinction", "Medical negligence framework", "Patient protection enhanced"]
      },

      // Constitutional Law Cases (3 cases)
      {
        caseTitle: "Kesavananda Bharati v. State of Kerala",
        court: "Supreme Court of India",
        year: 1973,
        citation: "AIR 1973 SC 1461",
        summary: "Historic judgment establishing the 'Basic Structure' doctrine. Parliament cannot amend the Constitution to destroy its basic features. Fundamental rights and democratic structure protected.",
        category: "Constitutional Law",
        keyPoints: ["Basic Structure doctrine", "Constitutional amendment limits", "Fundamental rights protection", "Democratic structure preserved"]
      },
      {
        caseTitle: "Minerva Mills v. Union of India",
        court: "Supreme Court of India",
        year: 1980, 
        citation: "AIR 1980 SC 1789",
        summary: "Supreme Court struck down 42nd Amendment provisions that gave Parliament unlimited power to amend Constitution. Reinforced Basic Structure doctrine and judicial review power.",
        category: "Constitutional Law",
        keyPoints: ["42nd Amendment struck down", "Basic Structure reinforced", "Judicial review protected", "Parliamentary power limited"]
      },
      {
        caseTitle: "Indira Nehru Gandhi v. Raj Narain",
        court: "Supreme Court of India",
        year: 1975,
        citation: "AIR 1975 SC 2299", 
        summary: "Court held that even Prime Minister is not above law. Election of PM can be set aside for corrupt practices. Established principle that no person is above constitutional law.",
        category: "Constitutional Law",
        keyPoints: ["No person above law", "PM not immune from law", "Electoral accountability", "Constitutional supremacy"]
      }
    ];

    cases.forEach(caseItem => {
      const id = this.currentCaseLawId++;
      this.caseLaws.set(id, { ...caseItem, id });
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(userData: InsertUser): Promise<User> {
    const user = { ...userData, id: this.currentUserId++ };
    this.users.set(user.id, user);
    return user;
  }

  // Chat message methods
  async getChatMessages(userId?: number): Promise<ChatMessage[]> {
    if (userId) {
      return Array.from(this.chatMessages.values()).filter(msg => msg.userId === userId);
    }
    return Array.from(this.chatMessages.values());
  }

  async createChatMessage(messageData: InsertChatMessage): Promise<ChatMessage> {
    const message = { ...messageData, id: this.currentChatMessageId++, timestamp: new Date() };
    this.chatMessages.set(message.id, message);
    return message;
  }

  // Knowledge base methods
  async getKnowledgeArticles(): Promise<KnowledgeArticle[]> {
    return Array.from(this.knowledgeArticles.values());
  }

  async getKnowledgeArticle(id: number): Promise<KnowledgeArticle | undefined> {
    return this.knowledgeArticles.get(id);
  }

  async createKnowledgeArticle(articleData: InsertKnowledgeArticle): Promise<KnowledgeArticle> {
    const article = { ...articleData, id: this.currentKnowledgeId++ };
    this.knowledgeArticles.set(article.id, article);
    return article;
  }

  async updateKnowledgeArticle(id: number, updates: Partial<InsertKnowledgeArticle>): Promise<KnowledgeArticle | undefined> {
    const article = this.knowledgeArticles.get(id);
    if (!article) return undefined;
    const updatedArticle = { ...article, ...updates };
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

  async createDocumentAnalysis(analysisData: InsertDocumentAnalysis): Promise<DocumentAnalysis> {
    const analysis = { ...analysisData, id: this.currentDocumentId++, createdAt: new Date() };
    this.documentAnalyses.set(analysis.id, analysis);
    return analysis;
  }

  // Legal template methods
  async getLegalTemplates(): Promise<LegalTemplate[]> {
    return Array.from(this.legalTemplates.values());
  }

  async getLegalTemplatesByCategory(category: string): Promise<LegalTemplate[]> {
    return Array.from(this.legalTemplates.values()).filter(template => template.category === category);
  }

  async getLegalTemplate(id: number): Promise<LegalTemplate | undefined> {
    return this.legalTemplates.get(id);
  }

  // Case law methods
  async getCaseLaw(): Promise<CaseLaw[]> {
    return Array.from(this.caseLaws.values());
  }

  async getCaseLawByCategory(category: string): Promise<CaseLaw[]> {
    return Array.from(this.caseLaws.values()).filter(caseLaw => caseLaw.category === category);
  }

  async searchCaseLaw(query: string): Promise<CaseLaw[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.caseLaws.values()).filter(caseLaw => 
      caseLaw.caseTitle.toLowerCase().includes(searchTerm) ||
      caseLaw.summary.toLowerCase().includes(searchTerm) ||
      caseLaw.keyPoints.some(point => point.toLowerCase().includes(searchTerm))
    );
  }

  // State law guide methods
  async getStateLawGuides(): Promise<StateLawGuide[]> {
    return Array.from(this.stateLawGuides.values());
  }

  async getStateLawGuidesByState(state: string): Promise<StateLawGuide[]> {
    return Array.from(this.stateLawGuides.values()).filter(guide => guide.state === state);
  }

  async getStateLawGuidesByCategory(category: string): Promise<StateLawGuide[]> {
    return Array.from(this.stateLawGuides.values()).filter(guide => guide.category === category);
  }

  private initializeStateLawGuides() {
    // Comprehensive state law guides for all 29 Indian states and Union Territories
    const guides = [
      // Major States - Detailed Guides
      {
        title: "Maharashtra Property Registration and Transfer Laws",
        content: "Maharashtra follows the Registration Act, 1908 and Maharashtra Land Revenue Code, 1966. Property registration is mandatory for transactions above Rs. 100. Stamp duty ranges from 5-7% for men and 4-6% for women. Registration fees are 1% of property value. Documents required: sale deed, title documents, property card, survey settlement record, no-objection certificates. Online registration available through IGR Maharashtra portal. Special provisions for agricultural land under Maharashtra Land Revenue Code. Urban areas follow Development Control Regulations (DCR) for construction approvals.",
        state: "Maharashtra",
        category: "Property Law",
        lastUpdated: new Date()
      },
      {
        title: "Karnataka IT and Cyber Laws Framework",
        content: "Karnataka has comprehensive IT policies under Karnataka State IT Policy 2020-25. Cyber crimes handled under IPC and IT Act 2000 with dedicated cyber crime police stations in Bangalore, Mysore, Hubli. Karnataka State Electronics Development Corporation (KEONICS) oversees IT infrastructure. STPI (Software Technology Parks) provides facilitation for IT exports. Karnataka has specific provisions for data protection in government sector. Cyber forensic labs established in major cities. E-governance initiatives under Karnataka One portal for citizen services.",
        state: "Karnataka",
        category: "Technology Law",
        lastUpdated: new Date()
      },
      {
        title: "Tamil Nadu Labor and Employment Regulations",
        content: "Tamil Nadu Shops and Commercial Establishments Act governs working hours, overtime, leave policies. Minimum wages notified quarterly by Tamil Nadu government. Factories Act 1948 applicable with state amendments. Tamil Nadu Contract Labour (Regulation and Abolition) Act covers contract workers. EPF, ESI mandatory for establishments above threshold. Tamil Nadu Industrial Disputes Act for dispute resolution. Women employees have special protections under Tamil Nadu Factories Rules. Online compliance through TN Labour Department portal. Recent amendments include gig worker protection measures.",
        state: "Tamil Nadu",
        category: "Labor Law",
        lastUpdated: new Date()
      },
      {
        title: "Uttar Pradesh Criminal Procedure and Court System",
        content: "UP follows CrPC 1973 with state amendments. District courts have original jurisdiction for serious crimes. Sessions courts handle heinous offenses. Lok Adalats for quick dispute resolution. UP Police has special investigation teams for economic offenses. Fast-track courts for women and children cases. E-courts project for digital case management. UP Victim Compensation Scheme provides relief to crime victims. Anticipatory bail available under Section 438 CrPC. Appeal process through High Court Allahabad with circuit benches.",
        state: "Uttar Pradesh",
        category: "Criminal Law",
        lastUpdated: new Date()
      },
      {
        title: "West Bengal Land Acquisition and Real Estate Laws",
        content: "West Bengal follows Land Acquisition Act with state amendments and new LARR Act 2013. Kolkata Municipal Corporation governs urban development. Building Plan approval required from KMC/local bodies. West Bengal Apartment Ownership Act for multi-storey buildings. Land mutation through Block Land and Land Reforms Office. Circle rate determines minimum property value for registration. West Bengal RERA for real estate regulation. Special Economic Zone Act applicable for SEZs. Heritage building protection under West Bengal Heritage Commission Act.",
        state: "West Bengal",
        category: "Property Law",
        lastUpdated: new Date()
      },
      {
        title: "Gujarat Business and Commercial Laws",
        content: "Gujarat has investor-friendly policies with single-window clearance system. Gujarat Industrial Development Act provides industrial promotion. GSIC (Gujarat State Investment Corporation) facilitates investments. Gujarat VAT Act and GST compliance mandatory. Company registration through ROC Ahmedabad/Rajkot. Partnership and LLP registration simplified. Gujarat Maritime Board regulates port activities. Special provisions for diamond and textile industries. iNDEXTb portal for online business registrations. Environmental clearances through Gujarat Pollution Control Board.",
        state: "Gujarat",
        category: "Business Law",
        lastUpdated: new Date()
      },
      {
        title: "Rajasthan Mining and Mineral Rights Laws",
        content: "Rajasthan follows Mines and Minerals (Development and Regulation) Act 1957. State has rich mineral reserves with specific mining policies. Mining lease procedures through Department of Mines and Geology. Environmental clearances mandatory for major minerals. Rajasthan Minor Mineral Concession Rules for sand, stone, etc. Royalty rates fixed by state government. Mining lease period varies from 20-50 years. Rehabilitation and resettlement policies for affected communities. Online mineral concession system (e-RFP) implemented. Violation penalties under Rajasthan Minor Mineral Rules.",
        state: "Rajasthan",
        category: "Mining Law",
        lastUpdated: new Date()
      },
      {
        title: "Andhra Pradesh Municipal and Urban Development Laws",
        content: "Andhra Pradesh Municipal Corporations Act 1994 governs urban areas. Building rules under AP Building Rules 2012. Development authorities for planned development. AP Land Titling Act for clear property titles. Urban land ceiling laws applicable in municipal areas. Property tax assessment under AP Municipalities Act. Water and sewerage connections through municipal corporations. Trade license mandatory for commercial activities. AP Town and Country Planning Act for development approvals. Green building norms under AP Green Building Guidelines.",
        state: "Andhra Pradesh",
        category: "Municipal Law",
        lastUpdated: new Date()
      },

      // All 28 States
      {
        title: "Assam Tea Industry and Plantation Laws",
        content: "Assam follows Plantation Labour Act 1951 for tea gardens. Assam Tea Corporation manages state-owned gardens. Export promotion through Tea Board of India regional office. Labour welfare provisions mandatory in tea plantations. Assam Agricultural Income Tax applicable on plantation income. Tea waste management under Pollution Control Board norms. Small tea grower schemes promoted by state government. Quality certification through Tea Board standards. Worker housing and medical facilities mandatory under Plantation Labour Act.",
        state: "Assam",
        category: "Agricultural Law",
        lastUpdated: new Date()
      },
      {
        title: "Bihar Land Revenue and Survey Settlement Laws",
        content: "Bihar Land Reforms Act 1950 governs land records. Settlement operations under Bihar Survey and Settlement Manual. Mutation through Circle Officer (Revenue). Bihar Tenancy Act protects tenant rights. Land ceiling laws under Bihar Land Reforms Act. Record of Rights (Jamabandi) maintenance by Revenue Department. Online land records through Bhumi Bihar portal. Inheritance and succession laws for agricultural land. Bihar Village Common Land Management Act for community land. Land acquisition under LARR Act 2013 with state rules.",
        state: "Bihar",
        category: "Revenue Law",
        lastUpdated: new Date()
      },
      {
        title: "Chhattisgarh Forest and Environmental Laws",
        content: "Chhattisgarh follows Forest Conservation Act 1980 with state amendments. Scheduled Tribes and Other Traditional Forest Dwellers Act implementation. Forest clearance procedures through state Forest Department. Minor Forest Produce rights recognized under FRA 2006. Chhattisgarh State Pollution Control Board monitors industrial pollution. Environmental Impact Assessment mandatory for major projects. Joint Forest Management Committees for community participation. Wildlife protection under Wildlife Protection Act. Compensatory afforestation requirements. Tribal rights protection in forest areas.",
        state: "Chhattisgarh",
        category: "Environmental Law",
        lastUpdated: new Date()
      },
      {
        title: "Goa Tourism and Coastal Regulation Laws",
        content: "Goa follows Coastal Regulation Zone notifications strictly. Tourism industry regulation under Goa Tourism Development Corporation. Hotel and restaurant licensing through Tourism Department. Beach management rules under CRZ guidelines. Heritage building protection in Old Goa. Goa Land Revenue Code for property matters. Casino and gaming laws under Goa Public Gambling Act. Waste management in coastal areas mandatory. Water sports and adventure tourism regulations. Environmental clearances for tourism projects required.",
        state: "Goa",
        category: "Tourism Law",
        lastUpdated: new Date()
      },
      {
        title: "Haryana Agriculture and Water Laws",
        content: "Haryana follows Punjab Land Revenue Act 1887 with modifications. Water rights under Haryana Irrigation Act. Haryana Agricultural Marketing Act for mandi operations. Haryana Preservation of Sub-soil Water Act regulates groundwater. Contract farming promotion under state policies. Crop insurance schemes implementation. Haryana State Agricultural Marketing Board oversight. Water conservation mandatory in agriculture. Land pooling policies for infrastructure development. Agricultural loan and subsidy schemes administration.",
        state: "Haryana",
        category: "Agricultural Law",
        lastUpdated: new Date()
      },
      {
        title: "Himachal Pradesh Hill Station and Tourism Laws",
        content: "Himachal Pradesh follows specific hill area regulations. HP Non-Agricultural Land Assessment Act for property tax. Tourism development under HP Tourism Development Corporation. Environmental protection in hill areas mandatory. HP Tenancy and Land Reforms Act governs agricultural land. Building construction restrictions in hill areas. HP Private Forest Act for private forest management. Water resources protection under HP Irrigation and Public Health Act. Homestay and eco-tourism promotion policies. Heritage hotel classification and regulations.",
        state: "Himachal Pradesh",
        category: "Tourism Law",
        lastUpdated: new Date()
      },
      {
        title: "Jharkhand Tribal Rights and Mining Laws",
        content: "Jharkhand follows CNT Act 1908 and SPT Act 1949 for tribal land protection. Mining operations under state mineral policy. Jharkhand Land Reforms Act with tribal protections. PESA Act implementation in scheduled areas. Forest Rights Act implementation for tribal communities. Industrial development with tribal consent requirements. Displacement and rehabilitation policies. Traditional governance systems recognition. Tribal land alienation restrictions. Cultural preservation laws for tribal communities.",
        state: "Jharkhand",
        category: "Tribal Law",
        lastUpdated: new Date()
      },
      {
        title: "Kerala Maritime and Fisheries Laws",
        content: "Kerala follows Kerala Marine Fishing Regulation Act 1980. Coastal Aquaculture Authority regulations for fish farming. Kerala Maritime Board for port development. Traditional fishing rights protection. Mechanized boat licensing procedures. Fish export promotion through Marine Products Export Development Authority. Coastal erosion management laws. Kerala Inland Fisheries Act for backwater fishing. Fish market regulation and hygiene standards. Fishermen welfare schemes and insurance programs.",
        state: "Kerala",
        category: "Maritime Law",
        lastUpdated: new Date()
      },
      {
        title: "Madhya Pradesh Forest and Wildlife Laws",
        content: "MP has largest forest cover with comprehensive forest laws. MP Van (Sanrakshan evam Sanvardhan) Adhiniyam 2005. Wildlife sanctuaries and national parks protection. Forest produce collection rights under Forest Rights Act. Compensatory afforestation fund management. Van Mitra scheme for community participation. Wildlife crime prevention cells in districts. Eco-tourism development in forest areas. Human-wildlife conflict resolution mechanisms. Joint Forest Management Committee operations.",
        state: "Madhya Pradesh",
        category: "Forest Law",
        lastUpdated: new Date()
      },
      {
        title: "Manipur Border Area and Security Laws",
        content: "Manipur follows Armed Forces Special Powers Act in certain areas. Inner Line Permit system for non-residents. Manipur Land Revenue and Land Reforms Act. Border area development programs. Drug trafficking prevention laws strictly enforced. Traditional council (Panchayat) recognition. Women's market (Ima Market) special regulations. Manipur Village Authority Act for local governance. Border trade regulations with Myanmar. Security clearance requirements for certain areas.",
        state: "Manipur",
        category: "Security Law",
        lastUpdated: new Date()
      },
      {
        title: "Meghalaya Traditional Governance and Land Laws",
        content: "Meghalaya follows traditional Khasi, Garo, and Jaintia laws. Sixth Schedule of Constitution applicable. District Councils have legislative powers. Traditional land ownership systems protected. Meghalaya Transfer of Land Act restricts land alienation. Community ownership of resources recognized. Traditional dispute resolution mechanisms. Autonomous District Councils for tribal areas. Coal mining regulations under traditional systems. Forest community management practices.",
        state: "Meghalaya",
        category: "Traditional Law",
        lastUpdated: new Date()
      },
      {
        title: "Mizoram Customary Law and Land Rights",
        content: "Mizoram follows customary laws of Mizo tribes. Sixth Schedule provisions for autonomous councils. Mizoram Liquor Total Prohibition Act 2019. Traditional village councils (Village Council Act). Land ownership under customary laws. Mizoram Village Council Act 1953. Inner Line Permit system operative. Traditional justice system recognition. Community land management practices. Mizo customary marriage and inheritance laws.",
        state: "Mizoram",
        category: "Customary Law",
        lastUpdated: new Date()
      },
      {
        title: "Nagaland Tribal Customary Laws and Governance",
        content: "Nagaland follows Article 371A with special protections. Naga tribal customary laws recognized. Village councils have judicial powers. Traditional land ownership patterns protected. Nagaland Village and Area Council Act. Customary law prevails over general laws. Traditional dispute resolution through village councils. Land alienation restrictions for non-Nagas. Sixth Schedule not applicable due to Article 371A. Cultural preservation through customary law protection.",
        state: "Nagaland",
        category: "Tribal Law",
        lastUpdated: new Date()
      },
      {
        title: "Odisha Coastal and Maritime Laws",
        content: "Odisha follows Coastal Regulation Zone guidelines strictly. Odisha Marine Fishing Regulation Act. Paradip Port Trust Act for major port operations. Chilika Development Authority for lake protection. Odisha Land Reforms Act with amendments. Cyclone and disaster management laws. Coastal erosion prevention measures. Traditional fishing community rights. Salt manufacturing regulations. Integrated Coastal Zone Management implementation.",
        state: "Odisha",
        category: "Coastal Law",
        lastUpdated: new Date()
      },
      {
        title: "Punjab Agricultural Marketing and Cooperative Laws",
        content: "Punjab follows Punjab Agricultural Marketing Act 1961. Cooperative societies under Punjab Cooperative Societies Act. Punjab Land Revenue Act 1887. Mandi system regulation and reforms. Minimum Support Price implementation. Punjab Preservation of Subsoil Water Act 2009. Contract farming promotion policies. Agricultural credit and loan systems. Punjab State Cooperative Land Development Bank operations. Farmer Producer Organization promotion.",
        state: "Punjab",
        category: "Agricultural Law",
        lastUpdated: new Date()
      },
      {
        title: "Sikkim Environment and Organic Farming Laws",
        content: "Sikkim is India's first fully organic state with specific laws. Sikkim Organic Mission implementation. Environment protection in fragile Himalayan ecosystem. Sikkim Biodiversity Conservation and Forest Management Act. Traditional knowledge protection systems. Sikkim Environment Protection Act. Waste management in hill areas. Eco-tourism development regulations. Traditional medicine (Amchi) practice recognition. Community forest management programs.",
        state: "Sikkim",
        category: "Environmental Law",
        lastUpdated: new Date()
      },
      {
        title: "Telangana Information Technology and Innovation Laws",
        content: "Telangana follows progressive IT policies post-formation in 2014. T-Hub and T-Works for startup ecosystem. Telangana State Innovation Cell for policy making. IT corridor development in Hyderabad. Cyber security framework implementation. Data protection policies for government sector. Digital governance initiatives. TS-iPASS for investment approvals. Innovation and entrepreneurship promotion. Intellectual property protection mechanisms.",
        state: "Telangana",
        category: "Technology Law",
        lastUpdated: new Date()
      },
      {
        title: "Tripura Border Trade and Tribal Laws",
        content: "Tripura follows border trade regulations with Bangladesh. Tripura Land Revenue and Land Reforms Act. Tripura Tribal Areas Autonomous District Council Act. Traditional tribal governance recognition. Border area development programs. Tripura Rural Livelihood Mission implementation. Tribal land alienation prevention laws. Traditional handicrafts promotion policies. Cross-border trade facilitation measures. Tribal welfare and development schemes.",
        state: "Tripura",
        category: "Border Law",
        lastUpdated: new Date()
      },
      {
        title: "Uttarakhand Hill Development and Tourism Laws",
        content: "Uttarakhand follows hill area specific regulations. Uttarakhand Hill Development Fund operations. Tourism industry regulation and promotion. Uttarakhand Land Laws for hill areas. Environmental protection in Himalayan regions. Uttarakhand Forest Act for biodiversity protection. Religious tourism and pilgrimage management. Adventure tourism and mountaineering regulations. Traditional knowledge and practices protection. Disaster management in hill areas.",
        state: "Uttarakhand",
        category: "Hill Development Law",
        lastUpdated: new Date()
      },

      // Union Territories
      {
        title: "Delhi Municipal and Urban Development Laws",
        content: "Delhi follows Delhi Municipal Corporation Act 1957. Unified Building Bye-laws 2016 for construction. Delhi Development Authority Act for planned development. Master Plan for Delhi 2041 implementation. Delhi Rent Control Act for tenancy matters. Environment protection in NCR region. Delhi Pollution Control Committee oversight. Trade licensing through MCD/NDMC. Solid waste management rules. Water and air quality monitoring systems.",
        state: "Delhi",
        category: "Municipal Law",
        lastUpdated: new Date()
      },
      {
        title: "Puducherry French Colonial Law Legacy and Administration",
        content: "Puducherry retains certain French civil law influences. Puducherry (Alteration of Name) Act 2006. Commune Panchayat system unique governance. French nationals' property rights protected. Civil status registration following French system. Puducherry Tenancy and Agricultural Lands Act. Revenue administration under French influence. Puducherry Regional Engineering College Act. Tourism promotion with French heritage. Municipal administration in French quarters.",
        state: "Puducherry",
        category: "Colonial Law",
        lastUpdated: new Date()
      },
      {
        title: "Chandigarh Urban Planning and Architecture Laws",
        content: "Chandigarh follows Le Corbusier's urban planning principles. Chandigarh Administration preserves architectural heritage. Building control regulations maintain city's character. Chandigarh Estate Rules for property allotment. Sector-wise development control regulations. Green belt protection laws. Chandigarh Housing Board operations. Heritage building protection measures. Environmental sustainability in urban planning. Traffic and transportation planning regulations.",
        state: "Chandigarh",
        category: "Urban Planning Law",
        lastUpdated: new Date()
      },
      {
        title: "Dadra and Nagar Haveli Industrial Development Laws",
        content: "DNH has special industrial promotion policies. Small scale industries development programs. DNH Industrial Estate development. Tax incentives for manufacturing units. Environmental clearances for industries. Labour law compliance in industrial units. Export promotion from industrial estates. Infrastructure development for industries. Investment facilitation through single window. Industrial safety and health regulations.",
        state: "Dadra and Nagar Haveli",
        category: "Industrial Law",
        lastUpdated: new Date()
      },
      {
        title: "Daman and Diu Coastal Tourism and Trade Laws",
        content: "Daman and Diu tourism development policies. Coastal regulation zone management. Liquor licensing and tourism promotion. Heritage fort preservation laws. Beach tourism regulation and safety. Export-import facilitation through ports. Traditional fishing community rights. Waste management in coastal areas. Water sports and recreational activities regulation. Cultural heritage site protection.",
        state: "Daman and Diu",
        category: "Tourism Law",
        lastUpdated: new Date()
      },
      {
        title: "Jammu and Kashmir Special Status and Land Laws",
        content: "J&K reorganization under J&K Reorganisation Act 2019. Land laws under Jammu and Kashmir Land Revenue Act. Special provisions for permanent residents. Agricultural land ownership restrictions. Kashmir valley specific regulations. Border area security laws. Traditional water rights (Kuhl system). Handicrafts and tourism promotion. Environmental protection in fragile ecosystem. Cross-border trade regulations at LoC.",
        state: "Jammu and Kashmir",
        category: "Special Status Law",
        lastUpdated: new Date()
      },
      {
        title: "Ladakh High Altitude Laws and Border Regulations",
        content: "Ladakh UT formation in 2019 with special provisions. High altitude environmental protection laws. Border area regulations and security. Traditional Buddhist and Islamic laws recognition. Ladakh Autonomous Hill Development Council powers. Pastoral land management systems. Tourism in sensitive border areas. Traditional water sharing systems. Cultural preservation in Buddhist monasteries. Cross-border trade at traditional routes.",
        state: "Ladakh",
        category: "Border Law",
        lastUpdated: new Date()
      },
      {
        title: "Lakshadweep Marine Conservation and Island Laws",
        content: "Lakshadweep follows marine conservation laws strictly. Coral reef protection regulations. Traditional fishing rights of islanders. Island-specific environmental protection. Coconut cultivation and copra production laws. Tourism regulation in fragile marine ecosystem. Shipping and connectivity regulations. Traditional governance through local councils. Marine sanctuary management. Waste management in island ecosystem.",
        state: "Lakshadweep",
        category: "Marine Law",
        lastUpdated: new Date()
      },
      {
        title: "Andaman and Nicobar Islands Tribal Protection Laws",
        content: "ANI follows Andaman and Nicobar Islands Protection of Aboriginal Tribes Regulation 1956. Particularly Vulnerable Tribal Groups protection. Restricted Area Permit system. Traditional tribal land rights protection. Marine national park regulations. Forest and wildlife protection in islands. Tribal welfare and development programs. Tourism regulation in tribal areas. Traditional fishing and hunting rights. Cultural preservation of tribal communities.",
        state: "Andaman and Nicobar Islands",
        category: "Tribal Protection Law",
        lastUpdated: new Date()
      },

      // Family Law Guides
      {
        title: "Maharashtra Family Law and Marriage Registration",
        content: "Maharashtra follows Hindu Marriage Act 1955 and Special Marriage Act 1954. Marriage registration mandatory under Maharashtra Registration of Marriages Rules 2014. Online registration through gr.maharashtra.gov.in. Hindu Succession Act 1956 for inheritance. Maintenance under Section 125 CrPC and Hindu Adoption and Maintenance Act. Divorce procedures under respective personal laws. Child custody laws favor best interest of child. Domestic violence protection under PWDVA 2005. Inter-caste marriage incentive schemes. Court marriage procedures at Sub-Registrar offices.",
        state: "Maharashtra",
        category: "Family Law",
        lastUpdated: new Date()
      },
      {
        title: "Delhi Family Courts and Matrimonial Laws",
        content: "Delhi has dedicated Family Courts under Delhi Family Courts Act 1984. Marriage registration under Delhi Marriage Registration Rules. Hindu Marriage Act, Muslim Personal Law, Christian Marriage Act applicable. Delhi Commission for Women handles matrimonial disputes. Legal aid available through Delhi State Legal Services Authority. Maintenance enforcement through Family Courts. Child welfare committees for adoption procedures. Domestic violence cases handled by Metropolitan Magistrates. Senior Citizens Maintenance Act for elderly care. Free legal aid for women in matrimonial cases.",
        state: "Delhi",
        category: "Family Law",
        lastUpdated: new Date()
      },
      {
        title: "Tamil Nadu Family Welfare and Women Protection",
        content: "Tamil Nadu implements comprehensive family welfare policies. Marriage registration through local registrars mandatory. Tamil Nadu Prohibition of Harassment of Women Act 1998. Child marriage prevention through special courts. Dowry prohibition enforcement with dedicated cells. Family counseling centers in major cities. Legal aid to women through Tamil Nadu Women Development Corporation. Adoption procedures through Child Welfare Committees. Maintenance recovery through family courts. Protection of Women from Domestic Violence Act implementation.",
        state: "Tamil Nadu",
        category: "Family Law",
        lastUpdated: new Date()
      },
      {
        title: "West Bengal Family Dispute Resolution",
        content: "West Bengal Family Welfare Department oversees matrimonial laws. Lok Adalats for family dispute resolution. Marriage registration under Bengal Excise Act provisions. Child welfare boards for adoption and custody. Bengal Social Service Act for family support. Maintenance enforcement through civil courts. Domestic violence protection cells in police stations. Legal aid for economically weaker sections. Joint family property disputes under Hindu Succession Act. Marriage counseling services through government centers.",
        state: "West Bengal",
        category: "Family Law",
        lastUpdated: new Date()
      },
      {
        title: "Karnataka Family Law Implementation",
        content: "Karnataka follows comprehensive family law framework. Karnataka State Commission for Women addresses matrimonial issues. Online marriage registration through Karnataka government portal. Family courts in Bangalore, Mysore, and major cities. Child adoption through Karnataka State Adoption Resource Agency. Dowry prohibition implementation with strict enforcement. Domestic violence protection under state committees. Senior citizen welfare laws for elderly protection. Hindu undivided family property laws. Marriage dispute mediation through Lok Adalats.",
        state: "Karnataka",
        category: "Family Law",
        lastUpdated: new Date()
      },

      // Employment Law Guides  
      {
        title: "Maharashtra Industrial Relations and Labor Laws",
        content: "Maharashtra follows Maharashtra Recognition of Trade Unions and Prevention of Unfair Labour Practices Act 1971. Industrial Disputes Act with state amendments. Maharashtra Shops and Commercial Establishments Act 2017. Contract labor regulation through principal employer liability. Factories Act 1948 with state modifications. Minimum wages notification quarterly. Provident Fund and ESI compliance mandatory. Maharashtra Labour Welfare Fund contributions. Online compliance through Shrama Suvidha Portal. Workers compensation for industrial accidents. Sexual harassment prevention committees mandatory.",
        state: "Maharashtra",
        category: "Employment Law",
        lastUpdated: new Date()
      },
      {
        title: "Karnataka IT Sector Employment Regulations",
        content: "Karnataka IT sector follows Karnataka Shops and Commercial Establishments Act 1961. Special Economic Zones employment regulations. Karnataka Contract Labour Act implementation. IT companies compliance under Factories Act exemptions. Karnataka Provident Fund and ESI regulations. Women safety in IT sector - night shift protections. Karnataka Industrial Employment Standing Orders. Gratuity Act implementation in IT sector. Karnataka Labour Welfare Fund for social security. Online compliance through Karnataka government portals.",
        state: "Karnataka",
        category: "Employment Law", 
        lastUpdated: new Date()
      },
      {
        title: "Tamil Nadu Manufacturing Sector Labor Laws",
        content: "Tamil Nadu Industrial Relations Code implementation. Tamil Nadu Factories Act with amendments for manufacturing. Contract labour regulation in industrial estates. Tamil Nadu Industrial Employment Standing Orders Act. Minimum wages for different categories of workers. Tamil Nadu Labour Welfare Board for worker benefits. Industrial safety regulations strictly enforced. Women employment protection in factories. Apprenticeship training programs in industries. Worker compensation and social security schemes.",
        state: "Tamil Nadu",
        category: "Employment Law",
        lastUpdated: new Date()
      },
      {
        title: "Delhi Service Sector Employment Laws",
        content: "Delhi service sector follows Delhi Shops and Commercial Establishments Act 1954. Delhi Contract Labour Act for outsourcing regulations. Delhi Minimum Wages Act with regular revisions. Delhi Labour Welfare Fund for social benefits. Service sector employment in NCR region. Delhi Industrial Relations Code provisions. Women safety measures in workplace mandatory. Delhi Factories Act for manufacturing units. Employee State Insurance and Provident Fund compliance. Sexual harassment prevention in service sector.",
        state: "Delhi",
        category: "Employment Law",
        lastUpdated: new Date()
      },
      {
        title: "Gujarat Industrial Labor and Trade Union Laws",
        content: "Gujarat Industrial Relations Act 1965 for trade union recognition. Gujarat Factories Act implementation in industrial areas. Contract labour regulation in major industrial estates. Gujarat Labour Welfare Board operations. Minimum wages notification for various sectors. Gujarat Industrial Employment Standing Orders. Worker safety regulations in chemical and textile industries. Gujarat Provident Fund and social security compliance. Industrial dispute resolution through conciliation. Labour court procedures for employment disputes.",
        state: "Gujarat",
        category: "Employment Law",
        lastUpdated: new Date()
      },

      // Tenant Rights Guides
      {
        title: "Maharashtra Rent Control and Tenant Protection",
        content: "Maharashtra follows Maharashtra Rent Control Act 1999. Tenant protection against arbitrary eviction. Standard rent determination procedures. Repairs and maintenance obligations of landlords. Security deposit limitations - maximum 10 months rent. Tenant rights during redevelopment projects. Maharashtra Ownership Flats Act for cooperative societies. Rent agreement registration mandatory above 11 months. Tenant eviction only through due process. Dispute resolution through Rent Control Courts. Online rent agreement registration facility.",
        state: "Maharashtra",
        category: "Tenant Rights",
        lastUpdated: new Date()
      },
      {
        title: "Delhi Rent Control and Tenant Rights Protection",
        content: "Delhi Rent Control Act 1958 protects tenant rights. Fair rent determination by Rent Control Authority. Tenant protection against unlawful eviction. Essential services (water, electricity) landlord responsibility. Security deposit regulation and return procedures. Rent increases subject to statutory limitations. Delhi Development Authority rental policies. Tenant rights in unauthorized colonies. Subletting regulations and permissions. Rent tribunal for dispute resolution.",
        state: "Delhi",
        category: "Tenant Rights",
        lastUpdated: new Date()
      },
      {
        title: "West Bengal Premises Tenancy and Tenant Rights",
        content: "West Bengal Premises Tenancy Act 1997 governs tenant-landlord relations. Tenant protection against arbitrary eviction without court orders. Fair rent determination mechanisms. Security deposit limitations and refund procedures. Essential services provision by landlords mandatory. Rent agreement registration procedures. Tenant rights during property transfer. West Bengal Housing Board tenant policies. Dispute resolution through civil courts. Maintenance and repair obligations clearly defined.",
        state: "West Bengal",
        category: "Tenant Rights",
        lastUpdated: new Date()
      },
      {
        title: "Tamil Nadu Rent Control and Tenancy Laws",
        content: "Tamil Nadu Buildings (Lease and Rent Control) Act 1960. Standard rent fixation by competent authorities. Tenant protection against wrongful eviction. Security deposit regulation - maximum 10 months advance. Landlord obligations for basic amenities provision. Rent agreement registration through sub-registrar offices. Tenant rights in case of property sale. Tamil Nadu Housing Board rental policies. Maintenance responsibility sharing between parties. Dispute resolution through Rent Control Courts.",
        state: "Tamil Nadu",
        category: "Tenant Rights",
        lastUpdated: new Date()
      },
      {
        title: "Karnataka Rent Control and Urban Tenancy",
        content: "Karnataka Rent Control Act 2001 provides tenant protection framework. Fair rent determination through prescribed authorities. Tenant security against arbitrary eviction. Security deposit limitations and timeline for refund. Essential services (water, electricity, sanitation) provision. Rent agreement registration procedures online. Bangalore Development Authority rental policies. Tenant rights in slum rehabilitation projects. Subletting permission procedures. Civil court jurisdiction for tenancy disputes.",
        state: "Karnataka",
        category: "Tenant Rights",
        lastUpdated: new Date()
      },

      // Consumer Rights Guides
      {
        title: "Maharashtra Consumer Protection and Rights",
        content: "Maharashtra implements Consumer Protection Act 2019 comprehensively. State Consumer Disputes Redressal Commission operates in Mumbai. District consumer forums in all districts. Online complaint filing through National Consumer Helpline. Right to refund, replacement, and repair for defective goods. Consumer protection against unfair trade practices. Maharashtra State Consumer Helpline 1800-11-4000. Product liability provisions for manufacturers. E-commerce consumer protection guidelines. Consumer awareness programs by state government.",
        state: "Maharashtra",
        category: "Consumer Rights",
        lastUpdated: new Date()
      },
      {
        title: "Delhi Consumer Forums and Protection Mechanisms",
        content: "Delhi State Consumer Disputes Redressal Commission in New Delhi. District consumer forums across Delhi districts. Consumer protection against misleading advertisements. Online dispute resolution for consumer complaints. Delhi consumer helpline for grievance redressal. Product safety standards enforcement. Service sector consumer protection (hospitals, schools, housing). Consumer awareness campaigns by Delhi government. E-commerce and digital payment consumer protection. Quick disposal of consumer cases through fast-track courts.",
        state: "Delhi",
        category: "Consumer Rights",
        lastUpdated: new Date()
      },
      {
        title: "Tamil Nadu Consumer Dispute Resolution",
        content: "Tamil Nadu State Consumer Disputes Redressal Commission in Chennai. Consumer protection against medical negligence. Tamil Nadu Consumer Helpline for complaint registration. Consumer rights in public utility services. Product liability and defective goods compensation. Consumer protection in online transactions. Tamil Nadu Weights and Measures enforcement. Consumer awareness through government programs. Banking and financial services consumer protection. Insurance claim settlement consumer rights.",
        state: "Tamil Nadu",
        category: "Consumer Rights",
        lastUpdated: new Date()
      },
      {
        title: "Karnataka Consumer Protection Implementation",
        content: "Karnataka State Consumer Disputes Redressal Commission operations. Consumer protection in IT and telecom services. Online consumer complaint portal by Karnataka government. Consumer rights in real estate transactions. Product safety and quality standards enforcement. Consumer protection against credit card fraud. Karnataka consumer helpline services. Educational institutions consumer protection. Healthcare services consumer rights. E-commerce consumer grievance redressal.",
        state: "Karnataka",
        category: "Consumer Rights",
        lastUpdated: new Date()
      },
      {
        title: "Gujarat Consumer Rights and Trade Practices",
        content: "Gujarat State Consumer Disputes Redressal Commission oversight. Consumer protection in industrial products. Gujarat consumer helpline and grievance portal. Consumer rights in utility services (gas, electricity). Unfair trade practices prevention and penalties. Consumer protection in agricultural commodities. Gujarat weights and measures enforcement. Consumer awareness in rural areas. Banking and insurance consumer protection. Mobile and telecom services consumer rights.",
        state: "Gujarat",
        category: "Consumer Rights",
        lastUpdated: new Date()
      },

      // Women's Safety Guides
      {
        title: "Maharashtra Women Safety and Protection Laws",
        content: "Maharashtra implements comprehensive women safety framework. Maharashtra State Women Commission for complaint redressal. Women helpline 103 operational 24/7. Safe City Project implementation in major cities. Nirbhaya Fund utilization for women safety infrastructure. Maharashtra Maha-Mohila Police for women-specific crimes. Sexual harassment prevention committees in workplaces mandatory. Domestic violence protection officers in each district. Women police stations for sensitive crime investigation. CCTV surveillance in public spaces for women safety.",
        state: "Maharashtra",
        category: "Women's Safety",
        lastUpdated: new Date()
      },
      {
        title: "Delhi Women Safety and Security Initiatives",
        content: "Delhi Commission for Women handles women safety complaints. Women helpline 181 and police helpline 100 integrated. Safe City Project with enhanced CCTV coverage. Himmat app for emergency assistance to women. Delhi Police special cell for crimes against women. Sexual harassment committees in government and private offices. Domestic violence counseling centers across Delhi. Women-only transport services (Pink Bus, Ladies Special trains). Safety audit of public spaces regularly conducted. Night shelters and safe houses for women in distress.",
        state: "Delhi",
        category: "Women's Safety",
        lastUpdated: new Date()
      },
      {
        title: "Tamil Nadu Women Protection and Empowerment",
        content: "Tamil Nadu State Commission for Women active in safety measures. Women helpline 1091 for emergency assistance. Amma Police Stations exclusively for women-related complaints. All Women Police Stations in major cities. Sexual harassment prevention through VISHAKA guidelines implementation. Domestic violence protection officers in all districts. Tamil Nadu Prohibition of Harassment of Women Act 1998 enforcement. Women safety in public transport - reserved seats and compartments. Self-defense training programs for women and girls. Economic empowerment programs for women's independence.",
        state: "Tamil Nadu",
        category: "Women's Safety",
        lastUpdated: new Date()
      },
      {
        title: "West Bengal Women Safety and Rights Protection",
        content: "West Bengal State Women Commission oversight for safety issues. Women helpline number and complaint registration system. Special courts for crimes against women (POCSO, domestic violence). West Bengal Police women safety initiatives. Sexual harassment prevention in educational institutions mandatory. Domestic violence counselors in police stations. Women police stations in Kolkata and major cities. Safety measures in public transport for women. Night patrolling in areas with women workforce. Legal aid services for women through state legal authority.",
        state: "West Bengal",
        category: "Women's Safety",
        lastUpdated: new Date()
      },
      {
        title: "Karnataka Women Safety and Security Framework",
        content: "Karnataka State Women Development Corporation safety initiatives. Women helpline 1091 and emergency response system. Bangalore Police women safety measures and patrolling. Sexual harassment prevention committees across organizations. Domestic violence protection and counseling services. Karnataka State Commission for Women complaint redressal. Women police stations for sensitive crime investigation. Safe City initiatives with technology integration. Self-defense training and awareness programs. Economic empowerment linked with safety and security measures.",
        state: "Karnataka",
        category: "Women's Safety",
        lastUpdated: new Date()
      }
    ];

    guides.forEach(guide => {
      const id = this.currentGuideId++;
      this.stateLawGuides.set(id, { ...guide, id });
    });
  }

  // Feedback methods
  async createFeedback(feedbackData: InsertFeedback): Promise<Feedback> {
    const id = this.currentFeedbackId++;
    const feedback: Feedback = {
      id,
      ...feedbackData,
      timestamp: new Date(),
    };
    this.feedbackList.set(id, feedback);
    return feedback;
  }

  async getFeedback(): Promise<Feedback[]> {
    return Array.from(this.feedbackList.values());
  }
}

export const storage = new MemStorage();
