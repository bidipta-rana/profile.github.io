/*
  ALL SITE CONTENT LIVES HERE. You normally never need to touch index.html.

  HOW TO ADD YOUR MEDIA TO A PROJECT
  ----------------------------------
  images:  list of file paths, e.g. "assets/images/robotic-finger/1.jpg"
           (download from Google Drive, put in that folder, commit)
  videos:  list of items. Three formats are supported:
             "youtube:VIDEO_ID"          -> YouTube (upload as Unlisted)
             "drive:FILE_ID"             -> Google Drive video (file must be shared
                                            as "Anyone with the link can view")
             "assets/videos/demo.mp4"    -> a file in this repo (keep under 25 MB)
           Drive FILE_ID is the long part of the share link:
           https://drive.google.com/file/d/THIS_PART/view
  reports: list of { label, url }. url can be "assets/reports/name.pdf"
           or a Google Drive share link.
  cover:   one image path used on the project card (optional).
*/

const SITE = {
  email: "bidipta2905@gmail.com",
  phone: "+91 73918 32565",
  linkedin: "https://www.linkedin.com/in/bidipta-rana",
  github: ""
};

const PROJECTS = [
  {
    id: "raman-oral-cancer", category: "internship",
    status: "Completed", year: "2026", org: "BARC Mumbai", fit: "contain",
    title: "Raman spectra classification for oral cancer",
    kind: "Internship project",
    where: "Bhabha Atomic Research Centre (BARC), Mumbai · IIT Madras summer internship, 2026",
    summary: "Machine learning on Raman spectra to tell healthy and cancerous oral tissue apart.",
    description: "Guided by Dr. R. S. Sengar (Division of Remote Handling and Robotics, BARC). I compared signal pre-processing methods (baseline correction, normalisation, SURE wavelet denoising) and feature extraction with PCA and PLS, then trained SVM, Random Forest, XGBoost and QDA classifiers on a portable Raman system's data: 1682 spectra from 345 biopsy-verified patients (785 nm excitation). PLS + XGBoost performed best, with 72.4% accuracy, 73.3% sensitivity and 71.4% specificity. Generative data augmentation was also explored for the small dataset.",
    tags: ["Raman spectroscopy", "Machine learning", "Signal processing", "Oral cancer"],
    cover: "assets/images/raman-oral-cancer/slide-05.jpg",
    images: ["assets/images/raman-oral-cancer/slide-05.jpg", "assets/images/raman-oral-cancer/slide-06.jpg"],
    videos: [],
    reports: [
      { label: "Internship report (PDF, 28 pages)", url: "assets/reports/barc-raman-internship-report.pdf" },
      { label: "Presentation slides (PDF)", url: "assets/reports/barc-raman-internship-slides.pdf" }
    ]
  },
  {
    id: "robotic-finger", category: "research",
    status: "Paper accepted", year: "2025", org: "IIT Jodhpur", fit: "contain",
    title: "Anthropomorphic robotic finger",
    kind: "Research project",
    where: "IIT Jodhpur, Jan 2025 to Jul 2025 · with Bhivraj Suthar",
    summary: "Compared twisted string actuation with cable-pulling actuation for a human-like robotic finger.",
    description: "Design, fabrication and testing of two 3D-printed anthropomorphic finger prototypes: one tendon-style cable-pulling finger and one driven by twisted string actuation (TSA). Joint angles were read with rotary position sensors and the two mechanisms were compared on range of motion, actuation speed and energy consumption, to guide actuator choice for prosthetic and robotic hands. The paper is accepted at the December 2025 INACOMM International Conference on Machines and Mechanisms.",
    tags: ["Robotics", "Twisted string actuation", "CAD", "3D printing"],
    cover: "assets/images/robotic-finger/design.jpg",
    images: ["assets/images/robotic-finger/design.jpg", "assets/images/robotic-finger/cable-pulling-setup.jpg", "assets/images/robotic-finger/sensor-placement.jpg"],
    videos: [],
    reports: [{ label: "Paper: Cable pulling vs twisted string actuation (PDF)", url: "assets/reports/robotic-finger-paper.pdf" }]
  },
  {
    id: "chemistry-analyzer", category: "internship",
    status: "Published", year: "2023-24", org: "BioSpectronics", fit: "contain",
    title: "Portable chemistry analyzer",
    kind: "Internship project",
    where: "BioSpectronics Pvt. Ltd., Oct 2023 to Oct 2024",
    summary: "A paper-microfluidic device that measures blood analytes from just 100 µL of serum.",
    description: "A compact point-of-care analyzer that detects body analytes from fluid concentration. Wax-printed paper microchannels with reagents sit in a 3D-printed housing, where an AS7341 multi-spectral sensor and an ESP32 measure absorbed light in real time. Tested on albumin, creatinine, urea, triglycerides, total protein and glucose, it reached correlation coefficients above 0.98. Published in IEEE Sensors Journal.",
    tags: ["Point-of-care", "Biosensing", "ESP32", "Microfluidics"],
    cover: "assets/images/chemistry-analyzer/cad-design.png",
    images: ["assets/images/chemistry-analyzer/cad-design.png", "assets/images/chemistry-analyzer/prototype.jpg"],
    videos: [],
    reports: [{ label: "IEEE Sensors Journal paper (PDF)", url: "assets/reports/biochemistry-analyzer-paper.pdf" }]
  },
  {
    id: "vibration-device", category: "internship",
    status: "Completed", year: "2024", org: "NIT Rourkela", fit: "contain",
    title: "Wireless hand-transmitted vibration meter",
    kind: "Internship project",
    where: "NIT Rourkela, May 2024 to Jun 2024",
    summary: "A wearable ESP32 device that streams hand-arm vibration from power tools at 600 Hz.",
    description: "A wireless wearable module with a MEMS accelerometer and an ESP32 that measures hand-transmitted vibration while drilling and shows it live at 600 Hz. In the follow-up study, ten participants drilled teak wood bare-handed and with nylon, rubber and leather gloves. Gloves cut the frequency-weighted vibration magnitude by 16.78%, 30.91% and 23.78% respectively.",
    tags: ["ESP32", "MEMS accelerometer", "Wireless", "Python"],
    cover: "assets/images/vibration-device/setup.png",
    images: ["assets/images/vibration-device/setup.png"],
    videos: ["assets/videos/vibration-device.mp4"],
    reports: [
      { label: "Paper: Hand-transmitted vibration during drilling (PDF)", url: "assets/reports/vibration-monitoring-paper.pdf" },
      { label: "Python code for vibration filtering", url: "assets/reports/vibration-filtering-code.py" }
    ]
  },
  {
    id: "emg-hand", category: "academic",
    status: "Completed", year: "2024", org: "RCOEM Nagpur", fit: "cover",
    title: "Machine learning robotic hand using EMG",
    kind: "Academic project",
    where: "B.Tech final year, RCOEM Nagpur · guide Dr. Vivek Khetade",
    summary: "A 3D-printed hand that mimics natural hand movement from muscle signals.",
    description: "A team project (with Charvi Sharma, Abhijit Awasthi and Ayushh Khaire). EMG sensors read muscle activity, a machine learning model classifies the gesture, and an Arduino Uno drives five servo motors that pull strings to move the fingers of a 3D-printed hand, aimed at assistive technology.",
    tags: ["EMG", "Machine learning", "Arduino", "Assistive tech"],
    cover: "assets/images/emg-hand/cover.jpg",
    images: [],
    videos: ["assets/videos/emg-hand.mp4"],
    reports: [{ label: "Final year project report (PDF)", url: "assets/reports/emg-hand-project-report.pdf" }]
  },
  {
    id: "smart-glasses", category: "academic",
    status: "Completed", year: "", org: "RCOEM Nagpur", fit: "cover",
    title: "Smart glasses for the visually impaired",
    kind: "Academic project",
    where: "B.Tech, RCOEM Nagpur",
    summary: "Wearable obstacle detection with real-time audio alerts.",
    description: "An assistive wearable that improves mobility and spatial awareness for visually impaired people. Ultrasonic sensors and an NE555 timer circuit detect obstacles and trigger real-time audio alerts through a buzzer.",
    tags: ["Wearable", "Ultrasonic sensing", "Analog circuits"],
    cover: "", images: [], videos: [], reports: []
  },
  {
    id: "health-monitor", category: "academic",
    status: "Completed", year: "", org: "RCOEM Nagpur", fit: "cover",
    title: "IoT health monitoring system",
    kind: "Academic project",
    where: "B.Tech, RCOEM Nagpur",
    summary: "Pulse oximeter and temperature readings sent to a phone over Wi-Fi.",
    description: "A health monitoring system that interfaces an ESP32 with a pulse oximeter, a DS18B20 temperature sensor and a seven-segment display. A built-in web server shows the readings on a phone, enabling remote monitoring of vital parameters in real time.",
    tags: ["ESP32", "IoT", "Vitals monitoring"],
    cover: "assets/images/health-monitor/demo.jpg",
    images: ["assets/images/health-monitor/demo.jpg"],
    videos: [],
    reports: [{ label: "Interfacing slides (PDF)", url: "assets/reports/health-monitor-slides.pdf" }]
  },
  {
    id: "ironing-device", category: "patent",
    status: "Registered", year: "2024", org: "RCOEM Nagpur", fit: "contain",
    title: "Automated ironing device",
    kind: "Design patent",
    where: "Design No. 412341-001, registered June 2024 · with J. B. Zalke and A. Khaire",
    summary: "An ironing device that needs minimal human interaction.",
    description: "A registered design for an automated ironing device that minimises human interaction, combining sensors and automated structures for precise ironing, pressure control and movement. Registered in class 07-05 under the Designs Act, 2000.",
    tags: ["Design patent", "Mechanical design", "Sensors"],
    cover: "assets/images/ironing-device/certificate.png",
    images: ["assets/images/ironing-device/certificate.png"],
    videos: [],
    reports: [{ label: "Design registration certificate (PDF)", url: "assets/reports/design-certificate-412341-001.pdf" }]
  }
];

const EXPERIENCE = [
  {
    when: "Summer 2026",
    role: "Research intern",
    org: "Bhabha Atomic Research Centre (BARC), Mumbai",
    text: "Built a machine learning pipeline to classify Raman spectra of healthy and cancerous oral tissue, with Dr. R. S. Sengar.",
    project: "raman-oral-cancer"
  },
  {
    when: "Jan 2025 to Jul 2025",
    role: "Research intern",
    org: "IIT Jodhpur",
    text: "Designed and compared two actuation mechanisms for an anthropomorphic robotic finger. The article is accepted at INACOMM, December 2025.",
    project: "robotic-finger"
  },
  {
    when: "May 2024 to Jun 2024",
    role: "Research intern",
    org: "NIT Rourkela",
    text: "Built a wireless ESP32 device that measures hand-transmitted vibration in power tools and plots it live at 600 Hz.",
    project: "vibration-device"
  },
  {
    when: "Oct 2023 to Oct 2024",
    role: "Research intern",
    org: "BioSpectronics Pvt. Ltd. (startup)",
    text: "Worked on a portable chemistry analyzer that detects body analytes from fluid concentration.",
    project: "chemistry-analyzer"
  },
  {
    when: "May 2023",
    role: "Biomedical intern",
    org: "MGM Medical College and Hospital",
    text: "Learned the working principles of health monitors, ECG machines, ventilators and defibrillators, and did their routine maintenance.",
    project: ""
  }
];

const PUBLICATIONS = [
  {
    type: "Journal article", status: "Published", year: "2025",
    title: "Microfluidic Paper-Based Portable Biochemistry Analyzer for Blood Parameter Sensing",
    authors: "S. Palekar, B. Rana, A. Khaire, A. Awasthi, M. Mahule, J. Kalambe",
    venue: "IEEE Sensors Journal, vol. 25, no. 10, pp. 18155-18162, May 2025",
    url: "https://doi.org/10.1109/JSEN.2025.3558549"
  },
  {
    type: "Conference paper", status: "Presented", year: "2025",
    title: "Graphite Electrode Based Bipolar Electrode Electrochemiluminescence Portable Platform for Point-of-Care-Testing Applications",
    authors: "A. Khaire, B. Rana, A. Awasthi, S. Palekar, M. Bhaiyya, J. Kalambe",
    venue: "IEEE Applied Sensing Conference (APSCON), Hyderabad, 2025, pp. 395-398",
    url: "https://doi.org/10.1109/APSCON63569.2025.11144259"
  },
  {
    type: "Book chapter", status: "Published", year: "2025",
    title: "Enzymatic Chemiresistive Interdigitated Electrodes Fabricated by Screen-Printing and Functionalized with Novel Green Synthesized Nanoparticles for Detection of Glucose Concentrations",
    authors: "J. B. Zalke, N. P. Narkhede, D. Rotake, B. Rana, C. Sharma",
    venue: "Lecture Notes in Electrical Engineering, pp. 505-519, Jan 2025",
    url: "https://doi.org/10.1007/978-981-96-3758-443"
  },
  {
    type: "Conference paper", status: "Accepted", year: "2025",
    title: "Anthropomorphic Robotic Fingers Driven by Cable Pulling and Twisted String Actuation: Design and Experimental Evaluation",
    authors: "B. Rana, B. Suthar",
    venue: "INACOMM International Conference on Machines and Mechanisms, December 2025",
    url: "", project: "robotic-finger"
  },
  {
    type: "Design patent", status: "Registered", year: "2024",
    title: "Automated Ironing Device",
    authors: "Shri Ramdeobaba College of Engineering and Management, J. B. Zalke, B. Rana, A. Khaire",
    venue: "Design No. 412341-001, class 07-05, registered June 2024",
    url: "", project: "ironing-device"
  }
];

const ABOUT = [
  "I am a biomedical engineer who likes building things that measure the body: wearable sensors, low-cost diagnostic devices and robotic hands. My work sits where embedded electronics, signal processing and machine learning meet clinical needs.",
  "I am doing my M.Tech in Biomedical Engineering at IIT Madras. Before that I finished my B.Tech with honors in bioinformatics and a CGPA of 10/10, and spent several summers in research labs, from a startup building a portable blood analyzer to BARC, where I worked on machine learning for oral cancer detection with Raman spectroscopy."
];

const TYPED = ["wearable sensors", "robotic hands", "point-of-care diagnostics", "ML for cancer detection"];

const MARQUEE = ["IIT Madras", "BARC Mumbai", "IIT Jodhpur", "NIT Rourkela", "BioSpectronics", "MGM Medical College", "RCOEM Nagpur", "IEEE EMBS"];

const EDUCATION = [
  { degree: "M.Tech, Biomedical Engineering", school: "Indian Institute of Technology Madras", when: "2025 to 2027", note: "Tamil Nadu" },
  { degree: "B.Tech, Biomedical Engineering (Honors in Bioinformatics)", school: "Shri Ramdeobaba College of Engineering and Management", when: "2021 to 2025", note: "CGPA 10/10 · Nagpur" },
  { degree: "Higher Secondary (HSC)", school: "Pace Junior Science College, Nerul", when: "2019 to 2021", note: "93.17%" },
  { degree: "Secondary School (SSC)", school: "J H Ambani School, Lodhivali", when: "2019", note: "95.6%" }
];

const SKILL_GROUPS = [
  { title: "Embedded and sensing", items: ["ESP32", "Arduino", "EMG sensors", "Pulse oximetry", "MEMS accelerometers", "Ultrasonic sensing", "Multi-spectral sensing (AS7341)", "NE555 circuits"] },
  { title: "Programming and ML", items: ["Python", "C", "CNN models", "SVM", "Random Forest", "XGBoost", "PCA and PLS", "Wavelet denoising"] },
  { title: "Design and fabrication", items: ["Fusion 360", "3D printing", "Prototyping", "Enclosure design", "Design patent"] },
  { title: "Biomedical", items: ["Raman spectroscopy", "Point-of-care diagnostics", "Biosensors", "Microfluidic paper devices", "ECG, ventilator and defibrillator upkeep"] },
  { title: "Research", items: ["Technical writing", "Literature review", "Problem solving", "Critical thinking", "Conference presenting"] }
];

const RECOGNITION = [
  ["GATE 2025", "All India Rank 82 in Biomedical Engineering"],
  ["Leadership", "Vice Chairperson, IEEE EMBS RCOEM Student Branch. Executive Member, REEF RCOEM"],
  ["Certifications", "IBM: Python for Data Science. L&T Edutech: Data Analytics Fundamentals"],
  ["Workshops and conferences", "IEEE APSCON 2025 (presenter). Electrochemical Biosensor Technology workshop, Dec 2024. Clinical Engineering and Health Technology Management Congress, AMTZ, Nov 2023"]
];
