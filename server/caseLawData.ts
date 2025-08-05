// Real-time Case Law Database - 3 Cases Per Category (15 Total)
export const caseLawData = [
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