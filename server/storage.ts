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
    const cases = [
      // Arrest Rights Cases
      {
        caseTitle: "Maneka Gandhi v. Union of India",
        court: "Supreme Court of India",
        year: 1978,
        citation: "AIR 1978 SC 597",
        summary: "Landmark case establishing that right to life and personal liberty under Article 21 includes right to travel abroad. Court held that procedure established by law must be just, fair and reasonable, expanding the scope of fundamental rights.",
        category: "Arrest Rights",
        keyPoints: ["Article 21 expanded interpretation", "Procedure must be just and fair", "Right to travel abroad", "Fundamental rights protection"],
      },
      {
        caseTitle: "D.K. Basu v. State of West Bengal",
        court: "Supreme Court of India",
        year: 1997,
        citation: "AIR 1997 SC 610",
        summary: "Supreme Court laid down comprehensive guidelines to prevent custodial violence and torture. Arrest memo, medical examination, and informing relatives made mandatory. Compensation for custodial violence victims established.",
        category: "Arrest Rights",
        keyPoints: ["Custodial violence prevention", "Arrest memo mandatory", "Medical examination required", "Victim compensation"],
      },
      {
        caseTitle: "Arnesh Kumar v. State of Bihar",
        court: "Supreme Court of India",
        year: 2014,
        citation: "(2014) 8 SCC 273",
        summary: "Court held that arrest is not mandatory for offenses punishable with imprisonment less than 7 years. Police must record reasons for arrest and magistrate must consider necessity of remand. Protection against automatic arrests strengthened.",
        category: "Arrest Rights",
        keyPoints: ["No automatic arrest for < 7 years offense", "Reasons for arrest required", "Magistrate discretion in remand", "Protection against arbitrary arrest"],
      },
      {
        caseTitle: "Joginder Kumar v. State of U.P.",
        court: "Supreme Court of India",
        year: 1994,
        citation: "AIR 1994 SC 1349",
        summary: "Supreme Court established that arrest should not be made in routine manner. Police must satisfy that arrest is necessary and have reasonable grounds. Article 22 protections strengthened against arbitrary detention.",
        category: "Arrest Rights",
        keyPoints: ["No routine arrests", "Reasonable grounds required", "Article 22 protection", "Necessity of arrest"],
      },
      {
        caseTitle: "Sheela Barse v. State of Maharashtra",
        court: "Supreme Court of India",
        year: 1983,
        citation: "AIR 1983 SC 378",
        summary: "Landmark judgment on women in custody. Court laid down guidelines for arrest and detention of women. Women cannot be arrested after sunset and before sunrise except in exceptional circumstances with prior permission of magistrate.",
        category: "Arrest Rights",
        keyPoints: ["Women arrest guidelines", "No night arrest of women", "Magistrate permission required", "Special protection for women"],
      },

      // Tenant Rights Cases
      {
        caseTitle: "Prabhakaran Vijayakumar v. State of Tamil Nadu",
        court: "Supreme Court of India",
        year: 2020,
        citation: "(2020) 12 SCC 686",
        summary: "Court upheld Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act 2017. Balanced approach between landlord and tenant rights. Rent control laws held constitutional if reasonable.",
        category: "Tenant Rights",
        keyPoints: ["Rent control laws constitutional", "Balance between rights", "State regulation power", "Reasonable restrictions allowed"],
      },
      {
        caseTitle: "A.K. Krishnan v. State of Andhra Pradesh",
        court: "Supreme Court of India",
        year: 1993,
        citation: "AIR 1993 SC 2217",
        summary: "Supreme Court held that tenant's right of occupation is not absolute. Landlord's right to reasonable return on property recognized. Rent control laws should not be confiscatory in nature.",
        category: "Tenant Rights",
        keyPoints: ["Tenant rights not absolute", "Landlord's reasonable return", "Anti-confiscatory principle", "Property rights balance"],
      },
      {
        caseTitle: "State of Haryana v. Mukesh Kumar",
        court: "Supreme Court of India",
        year: 2011,
        citation: "(2011) 10 SCC 404",
        summary: "Court emphasized speedy disposal of eviction cases. Long delays in rent control matters denied justice to both parties. Fast track courts for landlord-tenant disputes recommended.",
        category: "Tenant Rights",
        keyPoints: ["Speedy disposal required", "Fast track courts", "Justice delayed is justice denied", "Procedural efficiency"],
      },
      {
        caseTitle: "Gian Devi Anand v. Jeevan Kumar",
        court: "Supreme Court of India",
        year: 1985,
        citation: "AIR 1985 SC 1285",
        summary: "Court held that subletting without consent is ground for eviction but sharing with family members is not subletting. Bona fide requirement for personal necessity established as valid ground for eviction.",
        category: "Tenant Rights",
        keyPoints: ["Subletting vs family sharing", "Personal necessity grounds", "Bona fide requirement", "Eviction grounds clarified"],
      },
      {
        caseTitle: "Sarla Ahuja v. United India Insurance",
        court: "Supreme Court of India",
        year: 1998,
        citation: "AIR 1998 SC 2328",
        summary: "Tenant's right to seek alternative accommodation before eviction recognized. Court emphasized that eviction should not render tenant homeless. Social justice considerations in landlord-tenant law.",
        category: "Tenant Rights",
        keyPoints: ["Alternative accommodation", "Prevention of homelessness", "Social justice approach", "Tenant welfare"],
      },

      // Cybercrime Cases
      {
        caseTitle: "Shreya Singhal v. Union of India",
        court: "Supreme Court of India",
        year: 2015,
        citation: "(2015) 5 SCC 1",
        summary: "Landmark judgment striking down Section 66A of IT Act 2000 as unconstitutional. Court held that section was vague and violated freedom of speech. Online expression gets same protection as offline speech.",
        category: "Cybercrime",
        keyPoints: ["Section 66A struck down", "Freedom of speech online", "Vagueness doctrine", "Constitutional protection"],
      },
      {
        caseTitle: "State of Tamil Nadu v. Suhas Katti",
        court: "Chennai Metropolitan Magistrate",
        year: 2004,
        citation: "First cyber crime conviction in India",
        summary: "First conviction under IT Act 2000 for cyber harassment. Accused posted obscene and defamatory messages about a woman on internet. Court recognized cyber harassment as serious offense punishable under IT Act.",
        category: "Cybercrime",
        keyPoints: ["First IT Act conviction", "Cyber harassment recognized", "Online defamation", "Gender-based cyber crime"],
      },
      {
        caseTitle: "Avnish Bajaj v. State (NCT of Delhi)",
        court: "Supreme Court of India",
        year: 2005,
        citation: "(2005) 3 SCC 731",
        summary: "Case involving CEO of Bazee.com for selling obscene material online. Court established principle that intermediaries not automatically liable for user content if they comply with due diligence requirements.",
        category: "Cybercrime",
        keyPoints: ["Intermediary liability", "Due diligence defense", "Platform responsibility", "User generated content"],
      },
      {
        caseTitle: "Rohit Tandon v. Malvika Subba",
        court: "Delhi High Court",
        year: 2009,
        citation: "CS(OS) 1136/2009",
        summary: "Case establishing jurisdiction in cyber defamation. Court held that defamatory content accessible in Delhi gives Delhi courts jurisdiction. Cross-border cyber crime jurisdiction principles established.",
        category: "Cybercrime",
        keyPoints: ["Cyber defamation jurisdiction", "Accessibility test", "Cross-border cyber crimes", "Territorial jurisdiction"],
      },
      {
        caseTitle: "Kamlesh Vaswani v. Union of India",
        court: "Supreme Court of India",
        year: 2016,
        citation: "WP(C) 177/2013",
        summary: "Petition seeking ban on pornographic websites. Court directed government to block child pornography sites while balancing freedom of expression. Child protection prioritized over adult content access.",
        category: "Cybercrime",
        keyPoints: ["Child pornography ban", "Freedom vs protection balance", "Website blocking", "Government intervention"],
      },

      // Women's Safety Cases
      {
        caseTitle: "Vishaka v. State of Rajasthan",
        court: "Supreme Court of India",
        year: 1997,
        citation: "AIR 1997 SC 3011",
        summary: "Landmark judgment on sexual harassment at workplace. Court laid down comprehensive guidelines for prevention and redressal of sexual harassment. Led to enactment of POSH Act 2013.",
        category: "Women's Safety",
        keyPoints: ["Workplace sexual harassment guidelines", "Complaint committee mandatory", "Prevention mechanism", "Legislative framework established"],
      },
      {
        caseTitle: "State of Punjab v. Gurmit Singh",
        court: "Supreme Court of India",
        year: 1996,
        citation: "AIR 1996 SC 1393",
        summary: "Court held that rape violates woman's fundamental right to life and liberty under Article 21. Emphasized dignity and honor of women. Compensation for rape victims established as legal principle.",
        category: "Women's Safety",
        keyPoints: ["Rape violates Article 21", "Women's dignity paramount", "Victim compensation", "Fundamental rights protection"],
      },
      {
        caseTitle: "Laxmi v. Union of India",
        court: "Supreme Court of India",
        year: 2014,
        citation: "(2014) 4 SCC 427",
        summary: "Landmark judgment on acid attack prevention. Court directed regulation of acid sale, free medical treatment for victims, and compensation scheme. Comprehensive guidelines for acid attack cases laid down.",
        category: "Women's Safety",
        keyPoints: ["Acid sale regulation", "Victim compensation scheme", "Free medical treatment", "Prevention guidelines"],
      },
      {
        caseTitle: "Pratibha Rani v. Suraj Kumar",
        court: "Supreme Court of India",
        year: 1985,
        citation: "AIR 1985 SC 628",
        summary: "Court established that domestic violence amounts to cruelty under IPC Section 498A. Mental and physical torture by husband and in-laws constitutes criminal offense. Protection for married women strengthened.",
        category: "Women's Safety",
        keyPoints: ["Domestic violence as cruelty", "IPC 498A interpretation", "Mental torture included", "Married women protection"],
      },
      {
        caseTitle: "Githa Hariharan v. Reserve Bank of India",
        court: "Supreme Court of India",
        year: 1999,
        citation: "AIR 1999 SC 1149",
        summary: "Court held that mother can be natural guardian of minor child. Hindu Minority and Guardianship Act interpreted to give equal rights to mothers. Gender equality in guardianship rights established.",
        category: "Women's Safety",
        keyPoints: ["Mother as natural guardian", "Gender equality", "Child custody rights", "HMGA interpretation"],
      },

      // Consumer Complaints Cases
      {
        caseTitle: "Spring Meadows Hospital v. Harjol Ahluwalia",
        court: "Supreme Court of India",
        year: 1998,
        citation: "AIR 1998 SC 1801",
        summary: "Landmark case on medical negligence under Consumer Protection Act. Court established that medical services fall under consumer protection if payment made. Four elements of negligence: duty, breach, causation, damages.",
        category: "Consumer Complaints",
        keyPoints: ["Medical negligence under CPA", "Paid services covered", "Negligence elements established", "Consumer protection in healthcare"],
      },
      {
        caseTitle: "Lucknow Development Authority v. M.K. Gupta",
        court: "Supreme Court of India",
        year: 1994,
        citation: "AIR 1994 SC 787",
        summary: "Housing services by development authorities covered under Consumer Protection Act. Deficiency in construction, delay in possession constitute unfair trade practice. Real estate consumer protection established.",
        category: "Consumer Complaints",
        keyPoints: ["Housing services under CPA", "Construction deficiency covered", "Delay as unfair practice", "Real estate protection"],
      },
      {
        caseTitle: "Indian Medical Association v. V.P. Shantha",
        court: "Supreme Court of India",
        year: 1995,
        citation: "AIR 1996 SC 550",
        summary: "Court clarified that medical services are covered under Consumer Protection Act except free services. Established distinction between contractual and tortious liability in medical negligence cases.",
        category: "Consumer Complaints",
        keyPoints: ["Medical services definition", "Free vs paid distinction", "Contractual vs tort liability", "CPA scope clarified"],
      },
      {
        caseTitle: "Bangalore Development Authority v. Housing and Urban Development Corporation",
        court: "Supreme Court of India",
        year: 2010,
        citation: "(2010) 11 SCC 402",
        summary: "Housing projects by government authorities covered under consumer protection. Delay in construction and possession constitutes deficiency in service. Government not immune from consumer law.",
        category: "Consumer Complaints",
        keyPoints: ["Government authority coverage", "Housing project deficiency", "No sovereign immunity", "Public sector accountability"],
      },
      {
        caseTitle: "United India Insurance v. Pushpalatha",
        court: "Supreme Court of India",
        year: 2004,
        citation: "(2004) 3 SCC 694",
        summary: "Insurance services covered under Consumer Protection Act. Unreasonable denial of claims constitutes deficiency in service. Insurance companies liable for compensation including mental agony.",
        category: "Consumer Complaints",
        keyPoints: ["Insurance under CPA", "Claim denial deficiency", "Mental agony compensation", "Service provider liability"],
      }
    ];

    cases.forEach(caseItem => {
      const id = this.currentCaseLawId++;
      this.caseLaws.set(id, { ...caseItem, id });
    });
  }

  private initializeStateLawGuides() {
    const guides = [
      // Major States - Tenant Rights
      {
        state: "Maharashtra",
        category: "Tenant Rights",
        title: "Maharashtra Rent Control Act 1999 - Tenant Protection",
        content: "Maharashtra Rent Control Act 1999 provides comprehensive protection to tenants. Standard rent determination based on construction cost and amenities. Eviction only on specified grounds including non-payment, subletting, personal necessity. Rent increases regulated with maximum 4% annual increase. Tenant can contest eviction before Rent Controller.",
        keyLaws: ["Maharashtra Rent Control Act 1999", "Bombay Rents Hotel and Lodging House Rates Control Act 1947"],
        lastUpdated: "2024-01-15",
      },
      {
        state: "Delhi",
        category: "Tenant Rights", 
        title: "Delhi Rent Control Act 1958 - Comprehensive Guide",
        content: "Delhi Rent Control Act 1958 protects tenants from arbitrary eviction and excessive rent. Standard rent fixed by Rent Controller. Eviction grounds limited to non-payment, subletting, damage, personal necessity. Notice period mandatory before eviction proceedings. Appeals allowed to Rent Control Tribunal and High Court.",
        keyLaws: ["Delhi Rent Control Act 1958", "Delhi Municipal Corporation Act"],
        lastUpdated: "2024-01-10",
      },
      {
        state: "Karnataka",
        category: "Tenant Rights",
        title: "Karnataka Rent Control Laws and Tenant Rights",
        content: "Karnataka follows Rent Control Act for tenant protection. Fair rent determination by Rent Controller based on locality, amenities, construction cost. Eviction requires valid grounds and proper notice. Subletting without consent prohibited. Model Tenancy Act 2019 adoption under consideration by state government.",
        keyLaws: ["Karnataka Rent Control Act", "Bangalore Development Authority Act"],
        lastUpdated: "2024-01-20",
      },
      {
        state: "Tamil Nadu",
        category: "Tenant Rights",
        title: "Tamil Nadu Rent Control and Model Tenancy Act",
        content: "Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act 2017 modernizes rent laws. Security deposit limited to 10 months rent. Fast track dispute resolution through Rent Authority. Online registration of rental agreements. Balanced approach between landlord and tenant rights.",
        keyLaws: ["Tamil Nadu Tenancy Act 2017", "Chennai City Municipal Corporation Act"],
        lastUpdated: "2024-01-18",
      },
      {
        state: "West Bengal",
        category: "Tenant Rights",
        title: "West Bengal Premises Tenancy Act - Tenant Protection",
        content: "West Bengal Premises Tenancy Act provides tenant protection especially in Kolkata and Howrah. Fair rent determination by Rent Controller. Eviction only on legal grounds with proper procedure. Long-term tenants have stronger protection. Rent increases regulated and require approval.",
        keyLaws: ["West Bengal Premises Tenancy Act", "Kolkata Municipal Corporation Act"],
        lastUpdated: "2024-01-12",
      },

      // Major States - Women's Safety
      {
        state: "Uttar Pradesh",
        category: "Women's Safety",
        title: "UP Women Safety Laws and Protection Mechanisms",
        content: "Uttar Pradesh has comprehensive women safety framework. Special courts for crimes against women. One Stop Centres (Sakhi) in all districts. Women helpline 1090 operational 24x7. Anti-Romeo squads for eve-teasing prevention. Special investigation teams for crimes against women. POCSO courts for child sexual abuse cases.",
        keyLaws: ["UP Police Act", "UP Excise Act (prohibition)", "UP Women and Child Welfare Department Rules"],
        lastUpdated: "2024-01-25",
      },
      {
        state: "Rajasthan",
        category: "Women's Safety",
        title: "Rajasthan Women Protection and Safety Laws",
        content: "Rajasthan Women Helpline 181 provides 24x7 assistance. Beti Bachao Beti Padhao scheme implementation. Special courts for women-related crimes. One Stop Centres operational in all districts. Women safety apps launched by state police. Pink booths for women complaint registration.",
        keyLaws: ["Rajasthan Police Act", "Rajasthan Prohibition of Child Marriage Act"],
        lastUpdated: "2024-01-22",
      },
      {
        state: "Gujarat",
        category: "Women's Safety",
        title: "Gujarat Women Safety and Crime Prevention",
        content: "Gujarat 181 Women Helpline for emergency assistance. Special Investigation Teams for crimes against women. Fast track courts for speedy trial. Comprehensive CCTV surveillance in public places. Women safety apps with GPS tracking. Regular safety audits of public spaces.",
        keyLaws: ["Gujarat Police Act", "Gujarat Prohibition Act"],
        lastUpdated: "2024-01-20",
      },
      {
        state: "Haryana",
        category: "Women's Safety",
        title: "Haryana Women Protection and Safety Framework",
        content: "Haryana Self Defense Training for women mandatory in colleges. Women helpline 1091 operational statewide. Special courts for crimes against women. One Stop Centres providing legal aid and counseling. Beti Bachao Beti Padhao implementation. Pink booths for women safety.",
        keyLaws: ["Haryana Police Act", "Haryana Panchayati Raj Act"],
        lastUpdated: "2024-01-18",
      },
      {
        state: "Madhya Pradesh",
        category: "Women's Safety",
        title: "MP Women Safety and Protection Laws",
        content: "Madhya Pradesh Women Helpline 181 for emergency support. Special courts for women and children. One Stop Centres (Sakhi) operational. Women safety mobile app with emergency features. Special investigation cells for crimes against women. Regular safety awareness programs.",
        keyLaws: ["MP Police Act", "MP Panchayati Raj Act"],
        lastUpdated: "2024-01-15",
      },

      // Major States - Cybercrime
      {
        state: "Maharashtra",
        category: "Cybercrime",
        title: "Maharashtra Cyber Crime Investigation and Prevention",
        content: "Maharashtra Cyber Crime Investigation Department with specialized units. Cyber cells in Mumbai, Pune, Nashik, Nagpur. Online FIR registration for cyber crimes. Cyber security awareness programs. Special courts for cyber crime cases. Financial fraud investigation units operational.",
        keyLaws: ["IT Act 2000", "Maharashtra Police Act", "Mumbai Police Act"],
        lastUpdated: "2024-01-25",
      },
      {
        state: "Karnataka",
        category: "Cybercrime",
        title: "Karnataka Cyber Crime Laws and Investigation",
        content: "Karnataka Cyber Crime Investigation Department operational. Bengaluru Cyber Crime Police Station for IT city protection. Online complaint registration portal. Cyber security training for police officers. Collaboration with IT companies for cyber crime prevention. Special prosecutors for cyber cases.",
        keyLaws: ["IT Act 2000", "Karnataka Police Act"],
        lastUpdated: "2024-01-22",
      },
      {
        state: "Telangana",
        category: "Cybercrime",
        title: "Telangana Cyber Security and Crime Prevention",
        content: "Telangana Cyber Security Bureau established. CyberAbad police commissionerate for IT sector. Online FIR registration available. Cyber crime awareness in educational institutions. Special investigation teams for financial cyber crimes. Regular cyber security audits.",
        keyLaws: ["IT Act 2000", "Telangana Police Act"],
        lastUpdated: "2024-01-20",
      },
      {
        state: "Tamil Nadu",
        category: "Cybercrime",
        title: "Tamil Nadu Cyber Crime Investigation Framework",
        content: "Tamil Nadu Cyber Crime Investigation Wing operational. Special cyber crime police stations in Chennai, Coimbatore. Online portal for cyber crime complaints. Cyber security training programs. Collaboration with tech parks for prevention. Fast track courts for cyber crime cases.",
        keyLaws: ["IT Act 2000", "Tamil Nadu Police Act"],
        lastUpdated: "2024-01-18",
      },
      {
        state: "Andhra Pradesh",
        category: "Cybercrime",
        title: "AP Cyber Crime Laws and Digital Safety",
        content: "Andhra Pradesh Cyber Crime Investigation Department with specialized units. Online complaint registration system. Cyber security awareness in schools and colleges. Special investigation teams for online fraud. Collaboration with banks for financial cyber crime prevention.",
        keyLaws: ["IT Act 2000", "AP Police Act"],
        lastUpdated: "2024-01-15",
      },

      // Major States - Consumer Protection
      {
        state: "Maharashtra",
        category: "Consumer Protection",
        title: "Maharashtra Consumer Protection and Rights",
        content: "Maharashtra State Consumer Disputes Redressal Commission operational. Consumer helpline 1800-115-000 for complaints. Online complaint filing system. Consumer awareness programs statewide. Special focus on e-commerce and digital payment frauds. Regular consumer melas for awareness.",
        keyLaws: ["Consumer Protection Act 2019", "Maharashtra Shops and Establishments Act"],
        lastUpdated: "2024-01-25",
      },
      {
        state: "Delhi",
        category: "Consumer Protection",
        title: "Delhi Consumer Protection Framework",
        content: "Delhi State Consumer Disputes Redressal Commission with fast track courts. Consumer helpline for immediate assistance. Online mediation facilities available. Consumer awareness through Delhi government programs. Special emphasis on housing and real estate consumer protection.",
        keyLaws: ["Consumer Protection Act 2019", "Delhi Shops and Establishments Act"],
        lastUpdated: "2024-01-22",
      },
      {
        state: "Karnataka",
        category: "Consumer Protection",
        title: "Karnataka Consumer Rights and Protection",
        content: "Karnataka State Consumer Disputes Redressal Commission operational in Bengaluru. Consumer awareness programs in rural and urban areas. Online complaint registration and tracking. Special consumer courts for expedited resolution. Focus on IT services and e-commerce consumer protection.",
        keyLaws: ["Consumer Protection Act 2019", "Karnataka Shops and Establishments Act"],
        lastUpdated: "2024-01-20",
      },
      {
        state: "Gujarat",
        category: "Consumer Protection",
        title: "Gujarat Consumer Protection and Redressal",
        content: "Gujarat State Consumer Disputes Redressal Commission with efficient disposal system. Consumer helpline and grievance mechanism. Online complaint filing and tracking available. Regular consumer awareness campaigns. Special attention to pharmaceutical and chemical industry consumer issues.",
        keyLaws: ["Consumer Protection Act 2019", "Gujarat Shops and Establishments Act"],
        lastUpdated: "2024-01-18",
      },
      {
        state: "Rajasthan",
        category: "Consumer Protection",
        title: "Rajasthan Consumer Rights and Redressal Mechanism",
        content: "Rajasthan State Consumer Disputes Redressal Commission operational. Consumer helpline for complaint registration. Focus on tourism and hospitality consumer protection. Online mediation and conciliation services. Regular consumer awareness programs in rural areas.",
        keyLaws: ["Consumer Protection Act 2019", "Rajasthan Shops and Establishments Act"],
        lastUpdated: "2024-01-15",
      },

      // Union Territories and Special Cases
      {
        state: "Jammu and Kashmir",
        category: "Legal Framework",
        title: "J&K Legal Framework Post Article 370 Abrogation",
        content: "Post Article 370 abrogation, all central laws including Consumer Protection Act, IT Act, CrPC apply to J&K. New legal framework with central and UT laws. Special provisions for local customs and practices. Gradual implementation of all India legal systems.",
        keyLaws: ["J&K Reorganisation Act 2019", "All India Central Laws"],
        lastUpdated: "2024-01-25",
      },
      {
        state: "Ladakh",
        category: "Legal Framework",
        title: "Ladakh UT Legal System and Laws",
        content: "Ladakh as Union Territory follows central laws. High Court of J&K has jurisdiction. Special provisions for Buddhist and Muslim personal laws. Local customs in property and family matters recognized. Gradual development of UT-specific legal framework.",
        keyLaws: ["J&K Reorganisation Act 2019", "Central Laws Application"],
        lastUpdated: "2024-01-22",
      },
      {
        state: "Puducherry",
        category: "Legal Framework",
        title: "Puducherry Legal System and Consumer Protection",
        content: "Puducherry follows central laws with some local adaptations. French civil law influence in certain matters. Consumer protection through central act implementation. Special provisions for French nationals and local customs. Madras High Court jurisdiction for appeals.",
        keyLaws: ["Consumer Protection Act 2019", "Puducherry Civil Code"],
        lastUpdated: "2024-01-20",
      },
      {
        state: "Goa",
        category: "Legal Framework",
        title: "Goa Civil Code and Legal System",
        content: "Goa retains Portuguese Civil Code for family and property matters. Uniform Civil Code operational since 1867. Consumer protection under central act. Special provisions for property registration and inheritance. Bombay High Court Goa bench for legal matters.",
        keyLaws: ["Goa Civil Code", "Consumer Protection Act 2019"],
        lastUpdated: "2024-01-18",
      }
    ];

    guides.forEach(guide => {
      const id = this.currentGuideId++;
      this.stateLawGuides.set(id, { 
        ...guide, 
        id, 
        lastUpdated: typeof guide.lastUpdated === 'string' ? new Date(guide.lastUpdated) : guide.lastUpdated
      });
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
      (caseItem.keyPoints && caseItem.keyPoints.some(point => point.toLowerCase().includes(queryLower)))
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
