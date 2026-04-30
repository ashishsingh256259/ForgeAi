import { useState, useEffect, useRef } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────

const FIELDS = [
  { id: "tech", label: "Technology & Engineering", icon: "⚙️", color: "#00F5FF" },
  { id: "design", label: "Design & Creative", icon: "🎨", color: "#FF6B9D" },
  { id: "business", label: "Business & Management", icon: "📊", color: "#FFD93D" },
  { id: "law", label: "Law & Legal Studies", icon: "⚖️", color: "#A8FF78" },
  { id: "healthcare", label: "Healthcare & Medicine", icon: "🏥", color: "#FF9A3C" },
  { id: "architecture", label: "Architecture & Civil", icon: "🏛️", color: "#B8A9FF" },
  { id: "finance", label: "Finance & Accounting", icon: "💰", color: "#78FFD6" },
  { id: "education", label: "Education & Teaching", icon: "📚", color: "#FFB347" },
  { id: "media", label: "Media & Journalism", icon: "📡", color: "#FF6B6B" },
  { id: "agriculture", label: "Agriculture & Environment", icon: "🌿", color: "#90EE90" },
  { id: "arts", label: "Arts & Performing Arts", icon: "🎭", color: "#DDA0DD" },
  { id: "science", label: "Science & Research", icon: "🔬", color: "#87CEEB" },
];

const ROADMAPS = {
  tech: {
    careers: ["Software Developer", "Data Analyst", "AI/ML Engineer", "Cybersecurity Analyst", "Cloud Engineer", "DevOps Engineer", "Web Developer", "Mobile App Developer"],
    subfields: {
      "Software Developer": {
        roadmap: ["Programming Basics (Python/Java)", "Data Structures & Algorithms", "OOP & Design Patterns", "Web Frameworks (Django/Spring)", "Databases (SQL/NoSQL)", "Git & Version Control", "REST APIs", "System Design", "Open Source Contribution", "Internship & Projects"],
        courses: [
          { name: "CS50 – Harvard", link: "https://cs50.harvard.edu", free: true, level: "Beginner" },
          { name: "The Odin Project", link: "https://www.theodinproject.com", free: true, level: "Beginner-Mid" },
          { name: "freeCodeCamp", link: "https://www.freecodecamp.org", free: true, level: "All Levels" },
          { name: "MIT OpenCourseWare", link: "https://ocw.mit.edu", free: true, level: "Advanced" },
          { name: "Coursera – Google IT", link: "https://www.coursera.org", free: false, level: "Mid" },
        ],
        skills: ["Python", "JavaScript", "SQL", "Git", "Problem Solving", "System Design"]
      },
      "Data Analyst": {
        roadmap: ["Excel & Spreadsheets", "Statistics Basics", "Python/R for Data", "Pandas & NumPy", "Data Visualization (Tableau/Power BI)", "SQL Mastery", "Business Intelligence", "Machine Learning Basics", "Case Studies", "Portfolio Projects"],
        courses: [
          { name: "Google Data Analytics – Coursera", link: "https://www.coursera.org", free: false, level: "Beginner" },
          { name: "Kaggle Learn", link: "https://www.kaggle.com/learn", free: true, level: "All Levels" },
          { name: "Mode SQL Tutorial", link: "https://mode.com/sql-tutorial", free: true, level: "Beginner" },
          { name: "DataCamp (Free Tier)", link: "https://www.datacamp.com", free: true, level: "Beginner-Mid" },
          { name: "IBM Data Science – Coursera", link: "https://www.coursera.org", free: false, level: "Mid" },
        ],
        skills: ["Python", "SQL", "Excel", "Tableau", "Statistics", "Data Storytelling"]
      },
      "AI/ML Engineer": {
        roadmap: ["Python Mastery", "Math (Linear Algebra, Calculus, Stats)", "ML Algorithms", "Deep Learning (TensorFlow/PyTorch)", "NLP Basics", "Computer Vision", "MLOps", "Cloud ML (AWS/GCP)", "Research Papers", "Kaggle Competitions"],
        courses: [
          { name: "Fast.ai – Practical Deep Learning", link: "https://www.fast.ai", free: true, level: "Mid-Advanced" },
          { name: "Andrew Ng – ML Specialization", link: "https://www.coursera.org", free: false, level: "Beginner-Mid" },
          { name: "Google ML Crash Course", link: "https://developers.google.com/machine-learning/crash-course", free: true, level: "Beginner" },
          { name: "Hugging Face Course", link: "https://huggingface.co/learn", free: true, level: "Mid" },
          { name: "Kaggle Competitions", link: "https://www.kaggle.com", free: true, level: "All Levels" },
        ],
        skills: ["Python", "TensorFlow", "PyTorch", "Mathematics", "Research", "Cloud"]
      },
      "Web Developer": {
        roadmap: ["HTML & CSS", "JavaScript Fundamentals", "Responsive Design", "React/Vue/Angular", "Node.js & Express", "REST APIs", "Databases", "Authentication", "Deployment (Vercel/Netlify)", "Full Stack Projects"],
        courses: [
          { name: "The Odin Project", link: "https://www.theodinproject.com", free: true, level: "Beginner" },
          { name: "freeCodeCamp", link: "https://www.freecodecamp.org", free: true, level: "All Levels" },
          { name: "web.dev by Google", link: "https://web.dev", free: true, level: "Beginner-Mid" },
          { name: "JavaScript.info", link: "https://javascript.info", free: true, level: "Beginner" },
          { name: "Full Stack Open – Helsinki", link: "https://fullstackopen.com", free: true, level: "Mid" },
        ],
        skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "Databases", "Deployment"]
      },
      "Cybersecurity Analyst": {
        roadmap: ["Networking Basics", "Linux Fundamentals", "Security Principles", "Ethical Hacking Basics", "OWASP Top 10", "Penetration Testing", "Security Tools (Wireshark, Nmap)", "Incident Response", "Certifications (CEH, CompTIA)", "Bug Bounty"],
        courses: [
          { name: "TryHackMe", link: "https://tryhackme.com", free: true, level: "Beginner" },
          { name: "Hack The Box Academy", link: "https://academy.hackthebox.com", free: true, level: "Mid" },
          { name: "Cybrary (Free Tier)", link: "https://www.cybrary.it", free: true, level: "All Levels" },
          { name: "OWASP Foundation", link: "https://owasp.org", free: true, level: "Mid-Advanced" },
          { name: "Google Cybersecurity Cert", link: "https://www.coursera.org", free: false, level: "Beginner" },
        ],
        skills: ["Networking", "Linux", "Ethical Hacking", "Security Tools", "Incident Response"]
      }
    }
  },
  design: {
    careers: ["UI/UX Designer", "Graphic Designer", "Motion Designer", "Product Designer", "Brand Designer", "Illustrator", "3D Designer", "Fashion Designer"],
    subfields: {
      "UI/UX Designer": {
        roadmap: ["Design Principles", "Figma Mastery", "User Research Methods", "Wireframing & Prototyping", "Usability Testing", "Design Systems", "Accessibility", "Interaction Design", "Portfolio Building", "Real Client Projects"],
        courses: [
          { name: "Google UX Design – Coursera", link: "https://www.coursera.org", free: false, level: "Beginner" },
          { name: "Figma Design Basics", link: "https://www.figma.com/resources/learn-design", free: true, level: "Beginner" },
          { name: "NN/g UX Articles", link: "https://www.nngroup.com", free: true, level: "All Levels" },
          { name: "Interaction Design Foundation", link: "https://www.interaction-design.org", free: false, level: "All Levels" },
          { name: "Coursera – UI/UX Design", link: "https://www.coursera.org", free: false, level: "Mid" },
        ],
        skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Accessibility"]
      },
      "Graphic Designer": {
        roadmap: ["Color Theory & Typography", "Adobe Illustrator", "Adobe Photoshop", "InDesign for Print", "Logo Design", "Branding Projects", "Layout Design", "Motion Basics (After Effects)", "Freelancing Basics", "Portfolio on Behance"],
        courses: [
          { name: "Canva Design School", link: "https://www.canva.com/designschool", free: true, level: "Beginner" },
          { name: "Adobe Express Tutorials", link: "https://www.adobe.com/express/learn", free: true, level: "Beginner" },
          { name: "Skillshare (Free Trial)", link: "https://www.skillshare.com", free: false, level: "All Levels" },
          { name: "GCF Global Design Courses", link: "https://edu.gcfglobal.org", free: true, level: "Beginner" },
          { name: "Typography Course – Google", link: "https://design.google/library/typography", free: true, level: "All Levels" },
        ],
        skills: ["Adobe Suite", "Typography", "Color Theory", "Branding", "Layout Design"]
      },
      "Motion Designer": {
        roadmap: ["Design Fundamentals", "After Effects Basics", "Keyframing & Easing", "Motion Principles", "Character Animation", "3D Motion (Cinema 4D)", "Video Editing", "VFX Basics", "Client Projects", "YouTube/Social Content"],
        courses: [
          { name: "Motion Design School (Free)", link: "https://motiondesign.school", free: false, level: "Beginner" },
          { name: "Adobe After Effects Tutorials", link: "https://helpx.adobe.com/after-effects/tutorials.html", free: true, level: "Beginner" },
          { name: "YouTube – School of Motion", link: "https://www.youtube.com/@SchoolofMotion", free: true, level: "All Levels" },
          { name: "Blender (3D Free)", link: "https://www.blender.org/support/tutorials", free: true, level: "Mid" },
          { name: "Domestika (Paid)", link: "https://www.domestika.org", free: false, level: "Mid" },
        ],
        skills: ["After Effects", "Cinema 4D", "Blender", "Animation Principles", "Video Editing"]
      }
    }
  },
  business: {
    careers: ["MBA Graduate", "Marketing Manager", "Entrepreneur", "HR Manager", "Business Analyst", "Operations Manager", "Supply Chain Manager", "Sales Manager"],
    subfields: {
      "Business Analyst": {
        roadmap: ["Business Communication", "Excel & Data Analysis", "SQL Basics", "Process Modeling (BPMN)", "Requirements Gathering", "Agile & Scrum", "BI Tools (Power BI)", "Stakeholder Management", "Case Studies", "Certification (CBAP/PMI)"],
        courses: [
          { name: "Business Analysis – Coursera", link: "https://www.coursera.org", free: false, level: "Beginner" },
          { name: "PMI Free Resources", link: "https://www.pmi.org", free: true, level: "All Levels" },
          { name: "LinkedIn Learning (Free Trial)", link: "https://www.linkedin.com/learning", free: false, level: "All Levels" },
          { name: "edX Business Courses", link: "https://www.edx.org", free: true, level: "All Levels" },
          { name: "HBR Articles & Cases", link: "https://hbr.org", free: true, level: "Advanced" },
        ],
        skills: ["Excel", "SQL", "Agile", "Power BI", "Communication", "Process Mapping"]
      },
      "Entrepreneur": {
        roadmap: ["Ideation & Validation", "Business Model Canvas", "Market Research", "Financial Basics", "MVP Building", "Pitching to Investors", "Legal Registration", "Marketing & Sales", "Scaling Operations", "Networking & Funding"],
        courses: [
          { name: "Stanford Entrepreneurship – Coursera", link: "https://www.coursera.org", free: false, level: "Beginner" },
          { name: "Y Combinator Startup School", link: "https://www.startupschool.org", free: true, level: "All Levels" },
          { name: "Google Digital Garage", link: "https://learndigital.withgoogle.com", free: true, level: "Beginner" },
          { name: "MOOC – MIT Sloan", link: "https://executive.mit.edu/open-programs", free: false, level: "Mid-Advanced" },
          { name: "Khan Academy Finance", link: "https://www.khanacademy.org", free: true, level: "Beginner" },
        ],
        skills: ["Business Strategy", "Financial Planning", "Marketing", "Leadership", "Pitching"]
      },
      "Marketing Manager": {
        roadmap: ["Marketing Fundamentals", "Digital Marketing Basics", "SEO & SEM", "Social Media Marketing", "Content Marketing", "Email Marketing", "Analytics (Google Analytics)", "Paid Advertising", "Brand Strategy", "Marketing Campaigns"],
        courses: [
          { name: "Google Digital Marketing Cert", link: "https://learndigital.withgoogle.com", free: true, level: "Beginner" },
          { name: "HubSpot Academy", link: "https://academy.hubspot.com", free: true, level: "All Levels" },
          { name: "Meta Blueprint", link: "https://www.facebook.com/business/learn", free: true, level: "Beginner-Mid" },
          { name: "SEMrush Academy", link: "https://www.semrush.com/academy", free: true, level: "All Levels" },
          { name: "Coursera Marketing Spec", link: "https://www.coursera.org", free: false, level: "Mid" },
        ],
        skills: ["SEO", "Social Media", "Analytics", "Content", "Email Marketing", "Advertising"]
      }
    }
  },
  law: {
    careers: ["Corporate Lawyer", "Criminal Lawyer", "Legal Consultant", "Paralegal", "Compliance Officer", "Judge (IAS/PCS)", "Legal Researcher", "Human Rights Advocate"],
    subfields: {
      "Corporate Lawyer": {
        roadmap: ["Constitutional Law Basics", "Contract Law", "Company Law", "Taxation Law", "Mergers & Acquisitions", "IPR & Patent Law", "Legal Drafting", "Negotiation Skills", "Moot Courts", "Internship at Law Firms"],
        courses: [
          { name: "NLSIU Free Legal Resources", link: "https://www.nls.ac.in", free: true, level: "All Levels" },
          { name: "Coursera – Law Courses", link: "https://www.coursera.org", free: false, level: "Beginner" },
          { name: "Yale Law School Open Courses", link: "https://law.yale.edu/studying-law-yale/online-learning", free: true, level: "Advanced" },
          { name: "Khan Academy Law", link: "https://www.khanacademy.org", free: true, level: "Beginner" },
          { name: "edX Law – Harvard", link: "https://www.edx.org", free: true, level: "Mid-Advanced" },
        ],
        skills: ["Legal Research", "Contract Drafting", "Negotiation", "Company Law", "Taxation"]
      },
      "Legal Consultant": {
        roadmap: ["Understanding Legal Systems", "Specialization Selection", "Regulatory Frameworks", "Legal Writing & Research", "Client Communication", "Ethics in Law", "International Law Basics", "Consulting Methodology", "Building Practice Area", "Networking in Legal Community"],
        courses: [
          { name: "Coursera – Legal Consulting", link: "https://www.coursera.org", free: false, level: "Mid" },
          { name: "Harvard Online Law", link: "https://online.law.harvard.edu", free: false, level: "Advanced" },
          { name: "LAWCTOPUS Resources", link: "https://www.lawctopus.com", free: true, level: "All Levels" },
          { name: "Bar and Bench", link: "https://www.barandbench.com", free: true, level: "All Levels" },
          { name: "Indian Kanoon", link: "https://indiankanoon.org", free: true, level: "All Levels" },
        ],
        skills: ["Legal Research", "Writing", "Client Management", "Specialization", "Ethics"]
      }
    }
  },
  healthcare: {
    careers: ["Doctor (MBBS)", "Nurse", "Pharmacist", "Medical Researcher", "Healthcare Administrator", "Physiotherapist", "Nutritionist/Dietitian", "Public Health Officer"],
    subfields: {
      "Medical Researcher": {
        roadmap: ["Biology & Chemistry Basics", "Research Methodology", "Clinical Trials Basics", "Biostatistics", "Scientific Writing", "Lab Skills", "Ethics in Research", "Grant Writing", "Publishing Papers", "Specialization Area"],
        courses: [
          { name: "Johns Hopkins Public Health – Coursera", link: "https://www.coursera.org", free: false, level: "Mid" },
          { name: "NIH Research Training", link: "https://www.nih.gov/training", free: true, level: "All Levels" },
          { name: "PubMed & Research Tools", link: "https://pubmed.ncbi.nlm.nih.gov", free: true, level: "All Levels" },
          { name: "Biostatistics – Khan Academy", link: "https://www.khanacademy.org", free: true, level: "Beginner" },
          { name: "edX Healthcare Courses", link: "https://www.edx.org", free: true, level: "Mid" },
        ],
        skills: ["Research Methods", "Biostatistics", "Lab Skills", "Scientific Writing", "Ethics"]
      },
      "Healthcare Administrator": {
        roadmap: ["Healthcare Systems Overview", "Hospital Management", "Health Policy", "Financial Management", "HR in Healthcare", "Quality Management", "Health IT Systems", "Compliance & Regulations", "Leadership", "Strategic Planning"],
        courses: [
          { name: "Coursera Healthcare Management", link: "https://www.coursera.org", free: false, level: "Beginner" },
          { name: "edX Health Administration", link: "https://www.edx.org", free: true, level: "Mid" },
          { name: "WHO Training Courses", link: "https://www.who.int/tools/training", free: true, level: "All Levels" },
          { name: "ACHE Resources", link: "https://www.ache.org", free: false, level: "Advanced" },
          { name: "Khan Academy Health Policy", link: "https://www.khanacademy.org", free: true, level: "Beginner" },
        ],
        skills: ["Healthcare Policy", "Management", "Finance", "HR", "Quality Management"]
      }
    }
  },
  architecture: {
    careers: ["Architect", "Interior Designer", "Urban Planner", "Landscape Architect", "Structural Engineer", "Civil Engineer", "Construction Manager", "Sustainability Consultant"],
    subfields: {
      "Architect": {
        roadmap: ["Architectural Drawing Basics", "AutoCAD Mastery", "Revit/BIM", "Design Principles", "Construction Materials", "Structural Basics", "Building Codes", "Project Management", "Portfolio (AutoCAD + Renders)", "Registration (COA India)"],
        courses: [
          { name: "Autodesk AutoCAD Tutorials", link: "https://www.autodesk.com/education/free-software/autocad", free: true, level: "Beginner" },
          { name: "Revit Architecture – Coursera", link: "https://www.coursera.org", free: false, level: "Mid" },
          { name: "ArchDaily Articles", link: "https://www.archdaily.com", free: true, level: "All Levels" },
          { name: "NPTEL Architecture Courses", link: "https://nptel.ac.in", free: true, level: "All Levels" },
          { name: "SketchUp Free", link: "https://www.sketchup.com", free: true, level: "Beginner" },
        ],
        skills: ["AutoCAD", "Revit", "Design", "Construction Knowledge", "Project Management"]
      },
      "Interior Designer": {
        roadmap: ["Principles of Design", "Color Theory & Space Planning", "AutoCAD for Interiors", "3ds Max / SketchUp", "Material & Furniture Selection", "Lighting Design", "Client Consultation", "Project Presentation", "Sourcing & Procurement", "Portfolio Building"],
        courses: [
          { name: "SketchUp Free Tutorials", link: "https://www.sketchup.com/learn", free: true, level: "Beginner" },
          { name: "Interior Design Courses – edX", link: "https://www.edx.org", free: true, level: "Mid" },
          { name: "Coursera Interior Design", link: "https://www.coursera.org", free: false, level: "Beginner" },
          { name: "Canva for Interior Moodboards", link: "https://www.canva.com", free: true, level: "Beginner" },
          { name: "Houzz Design Inspiration", link: "https://www.houzz.com", free: true, level: "All Levels" },
        ],
        skills: ["Space Planning", "CAD Tools", "Color Theory", "Client Communication", "3D Rendering"]
      }
    }
  },
  finance: {
    careers: ["Chartered Accountant", "Financial Analyst", "Investment Banker", "Tax Consultant", "Actuary", "Financial Planner", "Risk Analyst", "Audit Manager"],
    subfields: {
      "Financial Analyst": {
        roadmap: ["Financial Accounting Basics", "Excel for Finance", "Financial Modeling", "Valuation Methods (DCF, Comps)", "Financial Statement Analysis", "Equity Research", "Bloomberg/Refinitiv", "CFA Level 1 Prep", "Case Studies", "Internship at Finance Firms"],
        courses: [
          { name: "CFI Free Courses", link: "https://corporatefinanceinstitute.com", free: true, level: "Beginner-Mid" },
          { name: "Khan Academy Finance", link: "https://www.khanacademy.org", free: true, level: "Beginner" },
          { name: "CFA Institute Resources", link: "https://www.cfainstitute.org", free: false, level: "Advanced" },
          { name: "Investopedia Academy", link: "https://www.investopedia.com/financial-edge", free: true, level: "All Levels" },
          { name: "Coursera Finance Spec", link: "https://www.coursera.org", free: false, level: "Mid" },
        ],
        skills: ["Financial Modeling", "Excel", "Valuation", "Research", "Accounting"]
      },
      "Chartered Accountant": {
        roadmap: ["Foundation Course (CPT)", "Intermediate Level", "Articleship (3 Years)", "Advanced Accounting", "Taxation (Direct & Indirect)", "Auditing", "Corporate & Business Laws", "Financial Management", "Final CA Exams", "Practice or Job Placement"],
        courses: [
          { name: "ICAI Study Material", link: "https://www.icai.org", free: true, level: "All Levels" },
          { name: "Khan Academy Accounting", link: "https://www.khanacademy.org", free: true, level: "Beginner" },
          { name: "CA Final Classes – YouTube", link: "https://www.youtube.com", free: true, level: "Advanced" },
          { name: "Coursera Financial Accounting", link: "https://www.coursera.org", free: false, level: "Beginner" },
          { name: "Tally Prime Tutorials", link: "https://tallysolutions.com", free: true, level: "Beginner" },
        ],
        skills: ["Accounting", "Taxation", "Auditing", "Corporate Law", "Financial Reporting"]
      }
    }
  },
  education: {
    careers: ["Teacher", "Education Consultant", "Curriculum Designer", "School Principal", "EdTech Professional", "Academic Researcher", "Career Counselor", "Special Education Teacher"],
    subfields: {
      "Teacher": {
        roadmap: ["Pedagogy Basics", "Subject Matter Expertise", "Classroom Management", "Lesson Planning", "Inclusive Education", "Assessment Design", "EdTech Tools", "Communication Skills", "Child Psychology Basics", "Teaching Certification"],
        courses: [
          { name: "DIKSHA – National Platform", link: "https://diksha.gov.in", free: true, level: "All Levels" },
          { name: "Coursera – Teaching Skills", link: "https://www.coursera.org", free: false, level: "Beginner" },
          { name: "edX – Education Courses", link: "https://www.edx.org", free: true, level: "All Levels" },
          { name: "Khan Academy (Teach)", link: "https://www.khanacademy.org", free: true, level: "Beginner" },
          { name: "UNESCO OER Resources", link: "https://www.unesco.org/en/open-educational-resources", free: true, level: "All Levels" },
        ],
        skills: ["Pedagogy", "Communication", "Assessment", "Classroom Management", "EdTech"]
      }
    }
  },
  media: {
    careers: ["Journalist", "Content Creator", "Photographer", "Videographer", "Social Media Manager", "Film Director", "Radio Jockey", "Public Relations Manager"],
    subfields: {
      "Content Creator": {
        roadmap: ["Niche Identification", "Content Strategy", "Video Production Basics", "Editing (Premiere/DaVinci)", "Thumbnail & Graphics Design", "SEO for YouTube/Blog", "Social Media Growth", "Monetization Strategies", "Brand Collaborations", "Community Building"],
        courses: [
          { name: "YouTube Creator Academy", link: "https://www.youtube.com/creators", free: true, level: "Beginner" },
          { name: "DaVinci Resolve Tutorials", link: "https://www.blackmagicdesign.com/learn", free: true, level: "Beginner" },
          { name: "HubSpot Content Marketing", link: "https://academy.hubspot.com", free: true, level: "All Levels" },
          { name: "Canva for Social Media", link: "https://www.canva.com/designschool", free: true, level: "Beginner" },
          { name: "Coursera – Social Media Marketing", link: "https://www.coursera.org", free: false, level: "Mid" },
        ],
        skills: ["Video Editing", "Content Strategy", "SEO", "Social Media", "Analytics"]
      },
      "Journalist": {
        roadmap: ["Journalism Ethics", "News Writing", "Research & Fact-Checking", "Interviewing Techniques", "Photography Basics", "Digital Journalism Tools", "Data Journalism", "Social Media Journalism", "Beat Reporting", "Internship at Media Houses"],
        courses: [
          { name: "Knight Center – Journalism MOOC", link: "https://journalismcourses.org", free: true, level: "All Levels" },
          { name: "Reuters Journalism Training", link: "https://www.reuters.com/plus/journalism-training", free: true, level: "Mid" },
          { name: "Coursera – Journalism Courses", link: "https://www.coursera.org", free: false, level: "Beginner" },
          { name: "Columbia Journalism Review", link: "https://www.cjr.org", free: true, level: "All Levels" },
          { name: "Google News Initiative Training", link: "https://newsinitiative.withgoogle.com/training", free: true, level: "All Levels" },
        ],
        skills: ["Writing", "Fact-Checking", "Research", "Photography", "Digital Tools"]
      }
    }
  },
  agriculture: {
    careers: ["Agricultural Scientist", "Farm Manager", "Agri-Entrepreneur", "Food Technologist", "Environmental Consultant", "Soil Scientist", "Horticulturist", "Agricultural Officer (Govt)"],
    subfields: {
      "Agri-Entrepreneur": {
        roadmap: ["Crop Science Basics", "Modern Farming Techniques", "Agri-Business Planning", "Government Schemes (PMKVY)", "Market Linkages", "Food Processing", "Digital Agriculture Tools", "Financial Management", "Supply Chain", "Value Chain Development"],
        courses: [
          { name: "ICAR e-Course Materials", link: "https://ecourses.icar.gov.in", free: true, level: "All Levels" },
          { name: "NPTEL Agriculture Courses", link: "https://nptel.ac.in", free: true, level: "All Levels" },
          { name: "Coursera – Food & Agriculture", link: "https://www.coursera.org", free: false, level: "Beginner" },
          { name: "FAO Learning Resources", link: "https://www.fao.org/capacity-development/resources/en", free: true, level: "All Levels" },
          { name: "edX Sustainable Agriculture", link: "https://www.edx.org", free: true, level: "Mid" },
        ],
        skills: ["Crop Management", "Business Planning", "Digital Tools", "Supply Chain", "Finance"]
      }
    }
  },
  arts: {
    careers: ["Actor", "Musician", "Dancer", "Visual Artist", "Art Director", "Music Producer", "Theatre Director", "Art Curator"],
    subfields: {
      "Music Producer": {
        roadmap: ["Music Theory Basics", "DAW (FL Studio/Ableton)", "Sound Design", "Mixing & Mastering", "Composition & Arrangement", "Beat Making", "Recording Techniques", "Music Business", "Releasing on Spotify/YouTube", "Collaborations"],
        courses: [
          { name: "Coursera – Music Production", link: "https://www.coursera.org", free: false, level: "Beginner" },
          { name: "Berklee Online (Free Resources)", link: "https://online.berklee.edu", free: false, level: "Mid" },
          { name: "YouTube – In The Mix", link: "https://www.youtube.com/@inthemix", free: true, level: "All Levels" },
          { name: "FL Studio Tutorials", link: "https://www.image-line.com/fl-studio-learning", free: true, level: "Beginner" },
          { name: "LANDR Blog & Tutorials", link: "https://www.landr.com/learn", free: true, level: "All Levels" },
        ],
        skills: ["DAW", "Music Theory", "Mixing", "Sound Design", "Business"]
      },
      "Visual Artist": {
        roadmap: ["Drawing Fundamentals", "Color Theory", "Digital Art Tools (Procreate/Photoshop)", "Portfolio Development", "Art Styles Exploration", "NFT & Digital Markets", "Freelancing", "Gallery Submissions", "Artist Statement", "Social Media Presence"],
        courses: [
          { name: "Ctrl+Paint (Digital Painting)", link: "https://www.ctrlpaint.com", free: true, level: "Beginner" },
          { name: "Schoolism (Paid)", link: "https://www.schoolism.com", free: false, level: "Mid-Advanced" },
          { name: "Proko YouTube Channel", link: "https://www.youtube.com/@ProkoTV", free: true, level: "Beginner-Mid" },
          { name: "ArtStation Learning", link: "https://www.artstation.com/learning", free: false, level: "All Levels" },
          { name: "Krita Tutorials", link: "https://docs.krita.org/en/tutorials.html", free: true, level: "Beginner" },
        ],
        skills: ["Drawing", "Color Theory", "Digital Tools", "Portfolio", "Marketing"]
      }
    }
  },
  science: {
    careers: ["Research Scientist", "Laboratory Technician", "Data Scientist", "Environmental Scientist", "Pharmaceutical Researcher", "Astronomy & Physics Researcher", "Bioinformatician", "Chemical Engineer"],
    subfields: {
      "Research Scientist": {
        roadmap: ["Domain Specialization (Physics/Chem/Bio)", "Research Methods", "Lab Safety & Protocols", "Scientific Writing", "Data Analysis", "Literature Review", "Grant Writing", "Publishing Research", "Conferences & Networking", "PhD Pathway"],
        courses: [
          { name: "MIT OpenCourseWare Science", link: "https://ocw.mit.edu", free: true, level: "Advanced" },
          { name: "Khan Academy Science", link: "https://www.khanacademy.org", free: true, level: "Beginner" },
          { name: "Coursera Science Specializations", link: "https://www.coursera.org", free: false, level: "Mid" },
          { name: "edX Science – Harvard", link: "https://www.edx.org", free: true, level: "All Levels" },
          { name: "NPTEL Science Courses", link: "https://nptel.ac.in", free: true, level: "All Levels" },
        ],
        skills: ["Research Methods", "Lab Skills", "Data Analysis", "Scientific Writing", "Domain Knowledge"]
      }
    }
  }
};

const SURVEY_QUESTIONS_BY_FIELD = {
  tech: [
    { q: "Have you written code before?", opts: ["Never", "A little (tutorials)", "Yes, projects", "Professionally"] },
    { q: "Which area excites you most?", opts: ["Building websites/apps", "Working with data", "AI & Machine Learning", "Security & Networks"] },
    { q: "How much time can you dedicate daily?", opts: ["<1 hour", "1-2 hours", "3-5 hours", "Full time"] },
    { q: "What's your goal?", opts: ["Land a job", "Freelance", "Build a startup", "Upskill in current role"] }
  ],
  design: [
    { q: "Do you have any design experience?", opts: ["Total beginner", "Used Canva/basic tools", "Know Figma/Photoshop", "Professional level"] },
    { q: "Which design area calls you?", opts: ["UI/UX (apps & websites)", "Graphic & Brand Design", "Motion & Animation", "3D & Product Design"] },
    { q: "What's your end goal?", opts: ["Work at a company", "Freelance client work", "Start a design agency", "Build personal brand"] },
    { q: "Which software interest you?", opts: ["Figma", "Adobe Suite", "Blender/Cinema 4D", "All of them"] }
  ],
  business: [
    { q: "What's your business background?", opts: ["No background", "Some commerce knowledge", "Graduate in business", "Working professional"] },
    { q: "Which business role appeals to you?", opts: ["Marketing & Growth", "Strategy & Analysis", "Entrepreneurship", "HR & Operations"] },
    { q: "What's your primary motivation?", opts: ["Corporate career", "Start my own venture", "Climb management ranks", "Consulting"] },
    { q: "Do you have industry experience?", opts: ["None", "Internship", "1-3 years", "3+ years"] }
  ],
  law: [
    { q: "What's your current law knowledge?", opts: ["Complete beginner", "Studied some law", "Law student", "Law graduate"] },
    { q: "Which legal area interests you?", opts: ["Corporate & Business Law", "Criminal Law", "Family & Civil Law", "International Law"] },
    { q: "What's your career goal?", opts: ["Join a law firm", "Government/Judiciary", "In-house counsel", "Legal consulting"] },
    { q: "Are you preparing for any exam?", opts: ["CLAT", "Bar Exam", "Judicial Services", "None currently"] }
  ],
  healthcare: [
    { q: "What's your healthcare background?", opts: ["No background", "Science student", "Medical student", "Healthcare professional"] },
    { q: "Which area interests you?", opts: ["Clinical Practice", "Research & Development", "Healthcare Management", "Public Health"] },
    { q: "What degree are you pursuing?", opts: ["MBBS/BDS", "Nursing/Pharmacy", "BPT/Allied Health", "MBA Healthcare"] },
    { q: "What's your primary goal?", opts: ["Patient care", "Medical research", "Hospital management", "Health policy"] }
  ],
  architecture: [
    { q: "What's your current level?", opts: ["Interested, no knowledge", "Architecture student", "Fresh graduate", "Working architect"] },
    { q: "Which specialization interests you?", opts: ["Building Architecture", "Interior Design", "Urban Planning", "Sustainable Design"] },
    { q: "Which software do you know?", opts: ["None yet", "AutoCAD basics", "Revit/SketchUp", "Advanced tools"] },
    { q: "What's your career goal?", opts: ["Join an architecture firm", "Start own studio", "Government projects", "Teaching/Research"] }
  ],
  finance: [
    { q: "What's your finance background?", opts: ["Complete beginner", "Commerce student", "Finance graduate", "Working in finance"] },
    { q: "Which finance path excites you?", opts: ["Investment & Markets", "Accounting & Taxation", "Banking & Insurance", "Financial Planning"] },
    { q: "Are you targeting any certification?", opts: ["CA/CMA/CS", "CFA/FRM", "CFP", "None yet"] },
    { q: "What's your career goal?", opts: ["Corporate finance role", "Start consulting practice", "Investment banking", "Entrepreneurship in finance"] }
  ],
  education: [
    { q: "What's your teaching experience?", opts: ["None", "Tutoring only", "Some classroom experience", "Professional teacher"] },
    { q: "Which education area calls you?", opts: ["School Teaching", "Higher Education", "EdTech & Online Learning", "Special Education"] },
    { q: "What subjects do you want to teach?", opts: ["STEM subjects", "Humanities & Social", "Arts & Sports", "Vocational Skills"] },
    { q: "What's your career goal?", opts: ["School/college teacher", "Corporate trainer", "EdTech professional", "Start my own institute"] }
  ],
  media: [
    { q: "What's your media background?", opts: ["None", "Personal blog/channel", "College media", "Working professional"] },
    { q: "Which media area excites you?", opts: ["Journalism & Reporting", "Content Creation & YouTube", "Film & Video Production", "Radio & Podcasting"] },
    { q: "What do you want to create?", opts: ["News & investigative content", "Entertainment content", "Educational content", "Documentary & stories"] },
    { q: "What's your career goal?", opts: ["Join a media house", "Independent creator", "Production company", "Social media influencer"] }
  ],
  agriculture: [
    { q: "What's your agriculture background?", opts: ["No background", "Rural/farming family", "Agri science student", "Working in agriculture"] },
    { q: "Which area interests you?", opts: ["Modern/Smart Farming", "Agri-Business", "Food Technology", "Environmental Conservation"] },
    { q: "What's your primary goal?", opts: ["Become an agricultural officer", "Start agri-business", "Do research", "Sustainable farming"] },
    { q: "Which technology interests you?", opts: ["Drone & precision farming", "Organic & sustainable methods", "Food processing", "Supply chain & marketing"] }
  ],
  arts: [
    { q: "What's your arts experience?", opts: ["Complete beginner", "Hobby/self-taught", "Formal training", "Professional artist"] },
    { q: "Which arts form calls you?", opts: ["Music & Composition", "Visual Art & Illustration", "Performing Arts (Dance/Theatre)", "Film & Photography"] },
    { q: "What's your career goal?", opts: ["Professional performer/artist", "Art teacher/trainer", "Creative direction", "Independent business"] },
    { q: "How do you want to monetize?", opts: ["Freelance clients", "YouTube/Social Media", "Performances & events", "Teaching/workshops"] }
  ],
  science: [
    { q: "What's your science background?", opts: ["High school science", "Undergraduate student", "Science graduate", "Postgraduate/PhD"] },
    { q: "Which science domain excites you?", opts: ["Physical Sciences (Physics/Chemistry)", "Life Sciences (Biology/Biotech)", "Environmental Sciences", "Applied Sciences & Engineering"] },
    { q: "What's your preferred work style?", opts: ["Lab-based research", "Field work", "Data analysis & computation", "Teaching & academia"] },
    { q: "What's your career goal?", opts: ["Research & development", "Government research labs", "Academic career", "Industry R&D"] }
  ]
};

// ─── AI CHAT BOT ────────────────────────────────────────────────────────────

const res = await fetch("https://forgeai-a8xi.onrender.com/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    messages,
    systemPrompt
  })
});

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div style={{ display: "flex", gap: 6, padding: "12px 16px", background: "rgba(255,255,255,0.05)", borderRadius: 16, width: "fit-content", alignItems: "center" }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 8, height: 8, borderRadius: "50%", background: "#00F5FF",
          animation: "bounce 1.2s infinite",
          animationDelay: `${i * 0.2}s`
        }} />
      ))}
    </div>
  );
}

function ChatBot({ userProfile, onClose }) {
  const [messages, setMessages] = useState([{
    role: "assistant",
    content: `Hi ${userProfile.name}! 👋 I'm your AI mentor on Forge. I know your profile — you're interested in **${FIELDS.find(f => f.id === userProfile.field)?.label}**, aiming to become a **${userProfile.career}**. Ask me anything — skill gaps, next steps, course suggestions, resume tips, or placement advice!`
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const systemPrompt = `You are an expert AI mentor on Forge - a Smart Mentoring System. 
Student Profile:
- Name: ${userProfile.name}
- Field: ${FIELDS.find(f => f.id === userProfile.field)?.label}
- Target Career: ${userProfile.career}
- Education Level: ${userProfile.educationLevel}
- Survey Answers: ${JSON.stringify(userProfile.surveyAnswers)}

Your role: Give personalized, actionable career guidance. Be specific, encouraging, and data-backed. 
Help with: skill gaps, learning roadmap, course recommendations (prefer free ones), resume building, interview prep, placement opportunities.
Keep responses concise but highly valuable. Use bullet points when listing items. Always relate advice to their specific field and target role.`;

  useEffect(() => { chatRef.current?.scrollTo(0, chatRef.current.scrollHeight); }, [messages]);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setLoading(true);
    const history = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }));
    const reply = await askClaude(history, systemPrompt);
    setMessages(m => [...m, { role: "assistant", content: reply }]);
    setLoading(false);
  }

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16
    }}>
      <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-8px)} }`}</style>
      <div style={{
        width: "100%", maxWidth: 680, height: "85vh", background: "#0A0A1A",
        borderRadius: 24, border: "1px solid rgba(0,245,255,0.2)",
        display: "flex", flexDirection: "column", overflow: "hidden",
        boxShadow: "0 0 60px rgba(0,245,255,0.1)"
      }}>
        <div style={{
          padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "rgba(0,245,255,0.05)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#00F5FF,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🤖</div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>Forge AI Mentor</div>
              <div style={{ color: "#00F5FF", fontSize: 12 }}>● Online — Personalized for {userProfile.name}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: 22, lineHeight: 1 }}>✕</button>
        </div>

        <div ref={chatRef} style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
              <div style={{
                maxWidth: "80%", padding: "12px 16px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                background: m.role === "user" ? "linear-gradient(135deg,#7C3AED,#4F46E5)" : "rgba(255,255,255,0.06)",
                color: "#fff", fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap",
                border: m.role === "assistant" ? "1px solid rgba(0,245,255,0.1)" : "none"
              }}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && <TypingIndicator />}
        </div>

        <div style={{ padding: 16, borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 10 }}>
          {["What skills am I missing?", "Build my resume", "Job opportunities"].map(s => (
            <button key={s} onClick={() => setInput(s)} style={{
              padding: "6px 12px", borderRadius: 20, background: "rgba(0,245,255,0.08)",
              border: "1px solid rgba(0,245,255,0.2)", color: "#00F5FF", fontSize: 11,
              cursor: "pointer", whiteSpace: "nowrap"
            }}>{s}</button>
          ))}
        </div>

        <div style={{ padding: "0 16px 16px", display: "flex", gap: 10 }}>
          <input
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Ask your AI mentor anything..."
            style={{
              flex: 1, padding: "12px 16px", borderRadius: 12,
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff", fontSize: 14, outline: "none"
            }}
          />
          <button onClick={send} style={{
            padding: "12px 20px", borderRadius: 12,
            background: "linear-gradient(135deg,#00F5FF,#7C3AED)",
            border: "none", color: "#000", fontWeight: 700, cursor: "pointer", fontSize: 14
          }}>Send</button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────────────

export default function ForgeApp() {
  const [step, setStep] = useState("landing"); // landing | name | education | field | survey | career | dashboard
  const [name, setName] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [selectedField, setSelectedField] = useState(null);
  const [surveyAnswers, setSurveyAnswers] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [activeTab, setActiveTab] = useState("roadmap");
  const [animIn, setAnimIn] = useState(true);

  function transition(nextStep) {
    setAnimIn(false);
    setTimeout(() => { setStep(nextStep); setAnimIn(true); }, 300);
  }

  function handleSurveyAnswer(ans) {
    const updated = [...surveyAnswers, ans];
    setSurveyAnswers(updated);
    const questions = SURVEY_QUESTIONS_BY_FIELD[selectedField.id] || [];
    if (currentQ + 1 < questions.length) {
      setCurrentQ(c => c + 1);
    } else {
      transition("career");
    }
  }

  const fieldData = selectedField ? ROADMAPS[selectedField.id] : null;
  const careerData = selectedCareer && fieldData ? (fieldData.subfields[selectedCareer] || Object.values(fieldData.subfields)[0]) : null;

  const userProfile = {
    name, educationLevel, field: selectedField?.id,
    career: selectedCareer, surveyAnswers
  };

  // ─── STYLES ───────────────────────────────────────────────────────────────
  const s = {
    root: { minHeight: "100vh", background: "#060612", color: "#fff", fontFamily: "'Syne', sans-serif", overflow: "hidden auto" },
    page: { minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", transition: "opacity 0.3s, transform 0.3s", opacity: animIn ? 1 : 0, transform: animIn ? "translateY(0)" : "translateY(20px)" },
    logo: { fontSize: "clamp(48px,10vw,96px)", fontWeight: 900, letterSpacing: -4, background: "linear-gradient(90deg,#00F5FF,#7C3AED,#FF6B9D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1, marginBottom: 0 },
    tagline: { color: "rgba(255,255,255,0.45)", fontSize: 14, letterSpacing: 6, textTransform: "uppercase", marginBottom: 48 },
    h2: { fontSize: "clamp(24px,5vw,42px)", fontWeight: 800, marginBottom: 8, textAlign: "center", lineHeight: 1.2 },
    sub: { color: "rgba(255,255,255,0.45)", fontSize: 15, marginBottom: 36, textAlign: "center" },
    input: { width: "100%", maxWidth: 440, padding: "16px 20px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "2px solid rgba(0,245,255,0.2)", color: "#fff", fontSize: 18, outline: "none", fontFamily: "inherit", boxSizing: "border-box", transition: "border-color 0.2s" },
    btn: { padding: "14px 36px", borderRadius: 12, background: "linear-gradient(135deg,#00F5FF,#7C3AED)", border: "none", color: "#000", fontSize: 16, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.5 },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 14, width: "100%", maxWidth: 860 },
    card: (active, color) => ({
      padding: "20px 16px", borderRadius: 16, border: `2px solid ${active ? color : "rgba(255,255,255,0.07)"}`,
      background: active ? `${color}18` : "rgba(255,255,255,0.03)", cursor: "pointer",
      transition: "all 0.2s", textAlign: "center"
    }),
  };

  return (
    <div style={s.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #7C3AED44; border-radius: 4px; }
        .opt-btn:hover { transform: scale(1.02); }
        .field-card:hover { transform: translateY(-3px); }
      `}</style>

      {showChat && <ChatBot userProfile={userProfile} onClose={() => setShowChat(false)} />}

      {/* ── LANDING ── */}
      {step === "landing" && (
        <div style={s.page}>
          <div style={{ textAlign: "center", maxWidth: 700 }}>
            <div style={{ marginBottom: 24 }}>
              <div style={s.logo}>FORGE</div>
              <div style={s.tagline}>Smart Mentoring System</div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 18, lineHeight: 1.7, marginBottom: 48, maxWidth: 560, margin: "0 auto 48px" }}>
              Your AI-powered career intelligence platform. Get a personalized roadmap, skill gap analysis, and mentorship — for <strong style={{ color: "#00F5FF" }}>every field</strong>, every ambition.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginBottom: 48 }}>
              {["🎯 Career Clarity", "🗺️ Personalized Roadmap", "📚 Free Courses", "🤖 AI Mentor", "📝 Resume Builder", "💼 Placements"].map(f => (
                <span key={f} style={{ padding: "8px 16px", borderRadius: 20, background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.15)", color: "#00F5FF", fontSize: 13 }}>{f}</span>
              ))}
            </div>
            <button style={s.btn} onClick={() => transition("name")}>Start Your Journey →</button>
            <div style={{ marginTop: 20, color: "rgba(255,255,255,0.25)", fontSize: 12 }}>No signup required. Completely free to use.</div>
          </div>
        </div>
      )}

      {/* ── NAME ── */}
      {step === "name" && (
        <div style={s.page}>
          <div style={{ textAlign: "center", width: "100%", maxWidth: 500 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>👋</div>
            <h2 style={s.h2}>What's your name?</h2>
            <p style={s.sub}>Let's make this personal.</p>
            <input style={s.input} value={name} onChange={e => setName(e.target.value)}
              placeholder="Enter your name..." onKeyDown={e => e.key === "Enter" && name.trim() && transition("education")} autoFocus />
            <br /><br />
            <button style={{ ...s.btn, opacity: name.trim() ? 1 : 0.4 }}
              disabled={!name.trim()} onClick={() => transition("education")}>
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* ── EDUCATION ── */}
      {step === "education" && (
        <div style={s.page}>
          <div style={{ textAlign: "center", width: "100%", maxWidth: 600 }}>
            <h2 style={s.h2}>Hi {name}! 👋<br />What's your education level?</h2>
            <p style={s.sub}>This helps us tailor the right resources for you.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 420, margin: "0 auto" }}>
              {["High School (10th / 12th)", "Undergraduate (1st-2nd year)", "Undergraduate (3rd-4th year)", "Graduate / Postgraduate", "Working Professional", "Career Switch / Self-taught"].map(level => (
                <button key={level} className="opt-btn" onClick={() => { setEducationLevel(level); transition("field"); }}
                  style={{ padding: "16px 24px", borderRadius: 12, border: `2px solid ${educationLevel === level ? "#00F5FF" : "rgba(255,255,255,0.1)"}`, background: educationLevel === level ? "rgba(0,245,255,0.1)" : "rgba(255,255,255,0.04)", color: "#fff", cursor: "pointer", fontSize: 15, fontFamily: "inherit", textAlign: "left", transition: "all 0.2s" }}>
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── FIELD SELECTION ── */}
      {step === "field" && (
        <div style={{ ...s.page, justifyContent: "flex-start", paddingTop: 60 }}>
          <h2 style={s.h2}>Which field are you passionate about?</h2>
          <p style={s.sub}>We have roadmaps for every career — tech, arts, law, science, and more.</p>
          <div style={s.grid}>
            {FIELDS.map(field => (
              <div key={field.id} className="field-card"
                style={s.card(selectedField?.id === field.id, field.color)}
                onClick={() => setSelectedField(field)}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{field.icon}</div>
                <div style={{ color: selectedField?.id === field.id ? field.color : "#fff", fontWeight: 700, fontSize: 13, lineHeight: 1.3 }}>{field.label}</div>
              </div>
            ))}
          </div>
          <br />
          <button style={{ ...s.btn, opacity: selectedField ? 1 : 0.4, marginTop: 8 }}
            disabled={!selectedField} onClick={() => { setSurveyAnswers([]); setCurrentQ(0); transition("survey"); }}>
            Continue →
          </button>
        </div>
      )}

      {/* ── SURVEY ── */}
      {step === "survey" && (
        <div style={s.page}>
          <div style={{ width: "100%", maxWidth: 560 }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
              {(SURVEY_QUESTIONS_BY_FIELD[selectedField?.id] || []).map((_, i) => (
                <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= currentQ ? "#00F5FF" : "rgba(255,255,255,0.1)" }} />
              ))}
            </div>
            <div style={{ color: "#00F5FF", fontSize: 13, marginBottom: 8, fontWeight: 700 }}>
              Question {currentQ + 1} of {(SURVEY_QUESTIONS_BY_FIELD[selectedField?.id] || []).length}
            </div>
            <h2 style={{ ...s.h2, textAlign: "left", marginBottom: 28 }}>
              {(SURVEY_QUESTIONS_BY_FIELD[selectedField?.id] || [])[currentQ]?.q}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {((SURVEY_QUESTIONS_BY_FIELD[selectedField?.id] || [])[currentQ]?.opts || []).map(opt => (
                <button key={opt} className="opt-btn" onClick={() => handleSurveyAnswer(opt)}
                  style={{ padding: "16px 20px", borderRadius: 12, border: "2px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#fff", cursor: "pointer", fontSize: 15, fontFamily: "inherit", textAlign: "left", transition: "all 0.2s" }}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── CAREER SELECT ── */}
      {step === "career" && (
        <div style={s.page}>
          <div style={{ textAlign: "center", width: "100%", maxWidth: 700 }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>{selectedField?.icon}</div>
            <h2 style={s.h2}>Which career are you targeting?</h2>
            <p style={s.sub}>Based on your answers in {selectedField?.label}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12, marginBottom: 28 }}>
              {(fieldData?.careers || []).map(career => (
                <div key={career} className="opt-btn"
                  style={{ padding: "16px", borderRadius: 12, border: `2px solid ${selectedCareer === career ? selectedField?.color : "rgba(255,255,255,0.1)"}`, background: selectedCareer === career ? `${selectedField?.color}15` : "rgba(255,255,255,0.04)", color: selectedCareer === career ? selectedField?.color : "#fff", cursor: "pointer", fontWeight: selectedCareer === career ? 700 : 400, transition: "all 0.2s", textAlign: "center", fontSize: 14 }}
                  onClick={() => setSelectedCareer(career)}>
                  {career}
                </div>
              ))}
            </div>
            <button style={{ ...s.btn, opacity: selectedCareer ? 1 : 0.4 }}
              disabled={!selectedCareer} onClick={() => transition("dashboard")}>
              View My Roadmap →
            </button>
          </div>
        </div>
      )}

      {/* ── DASHBOARD ── */}
      {step === "dashboard" && (
        <div style={{ minHeight: "100vh", background: "#060612", padding: "0 0 60px" }}>
          {/* Header */}
          <div style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={s.logo}>FORGE</div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>Welcome, <strong style={{ color: "#fff" }}>{name}</strong></span>
              <button onClick={() => setShowChat(true)} style={{ padding: "10px 20px", borderRadius: 10, background: "linear-gradient(135deg,#7C3AED,#00F5FF)", border: "none", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>🤖 AI Mentor</button>
              <button onClick={() => transition("field")} style={{ padding: "10px 16px", borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>Switch Field</button>
            </div>
          </div>

          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 20px" }}>
            {/* Profile Banner */}
            <div style={{ background: `linear-gradient(135deg, ${selectedField?.color}15, rgba(124,58,237,0.15))`, border: `1px solid ${selectedField?.color}30`, borderRadius: 20, padding: "28px 32px", marginBottom: 28, display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ fontSize: 56 }}>{selectedField?.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: selectedField?.color, fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>{selectedField?.label}</div>
                <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900 }}>Target: {selectedCareer}</h2>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, marginTop: 4 }}>{educationLevel} • {name}</div>
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {[{ label: "Skills to Learn", val: careerData?.skills?.length || 0 }, { label: "Road Steps", val: careerData?.roadmap?.length || 0 }, { label: "Courses", val: careerData?.courses?.length || 0 }].map(stat => (
                  <div key={stat.label} style={{ textAlign: "center", padding: "12px 20px", background: "rgba(0,0,0,0.3)", borderRadius: 12 }}>
                    <div style={{ fontSize: 28, fontWeight: 900, color: selectedField?.color }}>{stat.val}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "rgba(255,255,255,0.03)", padding: 4, borderRadius: 12, width: "fit-content" }}>
              {[["roadmap", "🗺️ Roadmap"], ["courses", "📚 Courses"], ["skills", "⚡ Skills"], ["resume", "📝 Resume & Placement"]].map(([id, label]) => (
                <button key={id} onClick={() => setActiveTab(id)}
                  style={{ padding: "10px 18px", borderRadius: 10, border: "none", background: activeTab === id ? "rgba(0,245,255,0.15)" : "transparent", color: activeTab === id ? "#00F5FF" : "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: 13, fontWeight: activeTab === id ? 700 : 400, fontFamily: "inherit", transition: "all 0.2s", whiteSpace: "nowrap" }}>
                  {label}
                </button>
              ))}
            </div>

            {/* ROADMAP TAB */}
            {activeTab === "roadmap" && (
              <div>
                <h3 style={{ color: "#fff", fontSize: 20, marginBottom: 20 }}>Your Step-by-Step Learning Roadmap</h3>
                <div style={{ position: "relative" }}>
                  {(careerData?.roadmap || []).map((step, i) => (
                    <div key={i} style={{ display: "flex", gap: 20, marginBottom: 16 }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg,${selectedField?.color},#7C3AED)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, flexShrink: 0 }}>{i + 1}</div>
                        {i < (careerData?.roadmap?.length || 1) - 1 && <div style={{ width: 2, flex: 1, minHeight: 20, background: `${selectedField?.color}30`, margin: "4px 0" }} />}
                      </div>
                      <div style={{ flex: 1, padding: "10px 20px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, marginBottom: 4 }}>
                        <div style={{ color: "#fff", fontWeight: 600, fontSize: 15 }}>{step}</div>
                        <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, marginTop: 3 }}>
                          {i < 3 ? "🟢 Start here" : i < 6 ? "🟡 Intermediate" : "🔴 Advanced"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* COURSES TAB */}
            {activeTab === "courses" && (
              <div>
                <h3 style={{ color: "#fff", fontSize: 20, marginBottom: 20 }}>Curated Courses — Free to Advanced</h3>
                <div style={{ display: "grid", gap: 14 }}>
                  {(careerData?.courses || []).map((c, i) => (
                    <div key={i} style={{ padding: "20px 24px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{c.name}</div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <span style={{ padding: "3px 10px", borderRadius: 6, background: c.free ? "rgba(0,245,255,0.15)" : "rgba(255,107,61,0.15)", color: c.free ? "#00F5FF" : "#FF6B3D", fontSize: 11, fontWeight: 700 }}>
                            {c.free ? "✓ FREE" : "PAID"}
                          </span>
                          <span style={{ padding: "3px 10px", borderRadius: 6, background: "rgba(124,58,237,0.2)", color: "#B8A9FF", fontSize: 11 }}>{c.level}</span>
                        </div>
                      </div>
                      <a href={c.link} target="_blank" rel="noreferrer" style={{ padding: "10px 20px", borderRadius: 10, background: "linear-gradient(135deg,#00F5FF,#7C3AED)", color: "#000", fontWeight: 800, fontSize: 13, textDecoration: "none", whiteSpace: "nowrap" }}>
                        Start Learning →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SKILLS TAB */}
            {activeTab === "skills" && (
              <div>
                <h3 style={{ color: "#fff", fontSize: 20, marginBottom: 20 }}>Core Skills for {selectedCareer}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 14, marginBottom: 32 }}>
                  {(careerData?.skills || []).map((skill, i) => (
                    <div key={i} style={{ padding: "20px", background: "rgba(255,255,255,0.04)", border: `1px solid ${selectedField?.color}30`, borderRadius: 16, textAlign: "center" }}>
                      <div style={{ fontSize: 28, marginBottom: 8 }}>⚡</div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: selectedField?.color }}>{skill}</div>
                      <div style={{ marginTop: 10, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${30 + i * 10}%`, background: `linear-gradient(90deg,${selectedField?.color},#7C3AED)`, borderRadius: 2 }} />
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, marginTop: 4 }}>Priority Level {i + 1}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: 24, background: "rgba(0,245,255,0.05)", border: "1px solid rgba(0,245,255,0.2)", borderRadius: 16 }}>
                  <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 8, color: "#00F5FF" }}>🤖 AI Skill Gap Analysis</div>
                  <p style={{ color: "rgba(255,255,255,0.6)", margin: "0 0 14px" }}>Want a personalized analysis of your current skills vs what you need for {selectedCareer}?</p>
                  <button onClick={() => setShowChat(true)} style={{ ...s.btn, fontSize: 14, padding: "12px 24px" }}>Ask AI Mentor for Skill Gap Analysis</button>
                </div>
              </div>
            )}

            {/* RESUME & PLACEMENT TAB */}
            {activeTab === "resume" && (
              <div style={{ display: "grid", gap: 16 }}>
                {[
                  { icon: "📝", title: "Build Your Resume", desc: `Create a professional resume tailored for ${selectedCareer} roles. Get AI feedback on format, content, and keywords.`, action: "Build Resume with AI →", prompt: `Help me build a professional resume for a ${selectedCareer} role. I am in the field of ${selectedField?.label}. My education level is ${educationLevel}. Guide me step by step on what sections to include, what to write, and how to optimize it for ATS systems.` },
                  { icon: "🎤", title: "Mock Interview Practice", desc: `Practice common ${selectedCareer} interview questions. Get real-time feedback on your answers from your AI mentor.`, action: "Start Mock Interview →", prompt: `Conduct a mock interview for a ${selectedCareer} position. Ask me 5 relevant technical and behavioral questions one at a time and give feedback on my answers.` },
                  { icon: "💼", title: "Job Opportunities", desc: `Discover relevant job boards, internship platforms, and companies actively hiring ${selectedCareer}s.`, action: "Explore Jobs →", prompt: `List the top job boards, platforms, and companies where I can find ${selectedCareer} opportunities in India and globally. Include both internships and full-time roles, and tips on how to apply effectively.` },
                  { icon: "🌐", title: "Portfolio & LinkedIn", desc: "Get guidance on building a strong online presence that attracts recruiters for your target role.", action: "Optimize Profile →", prompt: `Help me build a strong LinkedIn profile and online portfolio as a ${selectedCareer}. What should I include, how should I present my projects, and what keywords should I use to attract recruiters?` },
                  { icon: "📊", title: "Employability Score", desc: "Get an honest assessment of your current readiness and a clear plan to reach 100%.", action: "Check My Score →", prompt: `Based on my profile — education level: ${educationLevel}, target career: ${selectedCareer}, field: ${selectedField?.label} — give me an estimated employability score out of 100. Explain what I'm missing and give me a 90-day action plan to improve my score.` },
                ].map((item, i) => (
                  <div key={i} style={{ padding: "24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
                    <div style={{ fontSize: 40 }}>{item.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 6 }}>{item.title}</div>
                      <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.5 }}>{item.desc}</div>
                    </div>
                    <button onClick={() => { setShowChat(true); }} style={{ padding: "12px 22px", borderRadius: 10, background: "linear-gradient(135deg,#7C3AED,#4F46E5)", border: "none", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 13, fontFamily: "inherit", whiteSpace: "nowrap" }}>
                      {item.action}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
