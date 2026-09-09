import { initCanvas, renderCanvas } from './canvas.js';
import { initWheel, renderWheel } from './wheel.js';

// --- Domain Models & Data from lifemap.ts ---
export const gradePersonalizationMap = {
  m4: {
    grade: "m4",
    label: { th: "ม.4", en: "Grade 10" },
    heroTitle: { th: "เริ่มค้นหาตัวเองแบบไม่ต้องรีบเลือกคณะ", en: "Start exploring yourself without picking a major yet" },
    heroSubtitle: { th: "LifeMap จะช่วยจับความสนใจ จุดแข็ง และกิจกรรมที่ควรลอง เพื่อให้การสำรวจอนาคตเริ่มจากความมั่นใจ ไม่ใช่ความกดดัน", en: "LifeMap helps match interests, strengths, and recommended activities to start future exploration with confidence, not pressure." },
    quizIntro: { th: "สำหรับ ม.4 Quiz นี้จะชวนสังเกตความสนใจ สไตล์การเรียน และจุดแข็งที่เริ่มเห็นจากกิจกรรมใกล้ตัว โดยยังไม่ต้องรีบตัดสินคณะหรืออาชีพสุดท้าย", en: "For Grade 10, this quiz reflects on your interests, learning styles, and emerging strengths without rushing to pick a final major or career." },
    ctaLabel: { th: "ลอง 1 โปรเจกต์เล็กใน 7 วัน", en: "Try 1 micro-project in 7 days" },
    nextActionText: { th: "เริ่มจากเลือกกิจกรรมหรือโปรเจกต์เล็ก 1 อย่างที่อยากลองใน 7 วัน แล้วเก็บ reflection ว่าอะไรทำให้รู้สึกมีพลัง", en: "Start by choosing 1 small activity or project to try for 7 days, then reflect on what energized you." },
    goalPrompt: { th: "ช่วงนี้อยากให้ LifeMap ช่วยสำรวจอะไรแบบไม่กดดัน", en: "What would you like LifeMap to help you explore without pressure?" },
    goalOptions: {
      th: ["ค้นหาความสนใจของตัวเอง", "รู้จุดแข็งจากกิจกรรมที่ชอบ", "ลองชมรมหรือโปรเจกต์เล็ก", "คุยเรื่องอนาคตกับครอบครัวแบบสบายขึ้น"],
      en: ["Find my interests", "Identify strengths from favorite activities", "Try a club or a micro-project", "Talk about future with family comfortably"]
    },
  },
  m5: {
    grade: "m5",
    label: { th: "ม.5", en: "Grade 11" },
    heroTitle: { th: "เปรียบเทียบสายที่เป็นไปได้ แล้วเก็บหลักฐานจากการลองจริง", en: "Compare possible paths and build real portfolio evidence" },
    heroSubtitle: { th: "LifeMap จะช่วยจัดทางเลือกให้เห็นชัดขึ้น พร้อมชวนสร้าง portfolio evidence จากกิจกรรม ค่าย หรือโปรเจกต์ที่สะท้อนตัวตนจริง", en: "LifeMap helps list options clearly and guides you to create portfolio evidence from projects that reflect your true self." },
    quizIntro: { th: "สำหรับ ม.5 Quiz เดิมจะถูกจัดกรอบให้ช่วยเทียบเส้นทางที่เป็นไปได้ ดูความเข้ากันของวิชา สกิล และหลักฐานที่ควรเริ่มสะสมใน portfolio", en: "For Grade 11, the quiz helps compare pathways, examine alignment of subjects and skills, and identify what portfolio evidence to collect." },
    ctaLabel: { th: "เลือก 2 เส้นทางมาเทียบ", en: "Pick 2 pathways to compare" },
    nextActionText: { th: "เลือก 2 เส้นทางที่ยังลังเล แล้วเทียบด้วยเกณฑ์เดียวกัน เช่น วิชาที่ถนัด สกิลที่ต้องใช้ หลักฐาน portfolio และโอกาสทดลองจริง", en: "Select 2 paths you are hesitant about and compare them using criteria like favorite subjects, skills, and portfolio evidence." },
    goalPrompt: { th: "ตอนนี้อยากให้ LifeMap ช่วยเทียบหรือเตรียมอะไรเป็นพิเศษ", en: "What would you like LifeMap to help you prepare or compare right now?" },
    goalOptions: {
      th: ["เปรียบเทียบ 2–3 เส้นทาง", "หาแนว portfolio ที่ควรเริ่ม", "เลือกค่ายหรือกิจกรรมทดลอง", "ตั้งเกณฑ์ตัดสินใจให้ชัดขึ้น"],
      en: ["Compare 2-3 pathways", "Find portfolio directions to start", "Choose camps or trial activities", "Set clearer decision criteria"]
    },
  },
  m6: {
    grade: "m6",
    label: { th: "ม.6", en: "Grade 12" },
    heroTitle: { th: "ช่วยจัดลำดับตัวเลือกคณะ/อาชีพอย่างปลอดภัย ไม่ตัดสินแทน", en: "Rank majors/careers safely without decisions made for you" },
    heroSubtitle: { th: "LifeMap จะช่วยแปลงข้อมูลตัวเองเป็นแผนสมัครหรือแผนตัดสินใจระยะใกล้ พร้อมทางเลือกสำรองและพื้นที่ดูแลความเครียด", en: "LifeMap helps turn self-insights into near-term applications or decisions, complete with backup options and stress-management spaces." },
    quizIntro: { th: "สำหรับ ม.6 Quiz นี้จะเน้นความพร้อมในการตัดสินใจ เงื่อนไขที่ต้องคำนึงถึง timeline สมัคร และการวางแผนสำรอง โดยยังคงเป็นเครื่องมือสะท้อนตัวเอง ไม่ใช่คำตัดสินแทนคุณ", en: "For Grade 12, the quiz focuses on decision readiness, key application timelines, and backups—serving as a reflection tool, not deciding for you." },
    ctaLabel: { th: "สร้างแผนสมัคร/ตัดสินใจ 30 วัน", en: "Create a 30-day decision plan" },
    nextActionText: { th: "จัดลำดับตัวเลือกหลัก ตัวเลือกสำรอง และ action 30 วันถัดไป เช่น เช็กกำหนดสมัคร เตรียม portfolio หรือคุยกับผู้ปกครองด้วยข้อมูลจริง", en: "Rank primary and backup options, listing actions for the next 30 days like checking timelines, drafting portfolios, or family talks." },
    goalPrompt: { th: "ช่วงใกล้สมัครนี้อยากให้ LifeMap ช่วยเรื่องไหนก่อน", en: "Which area do you want LifeMap to help with first during this application season?" },
    goalOptions: {
      th: ["จัดลำดับคณะหรือเส้นทาง", "ทำ checklist สมัคร/portfolio", "เตรียมคุยกับผู้ปกครอง", "วางแผนสำรองอย่างปลอดภัย"],
      en: ["Rank majors or paths", "Create an application/portfolio checklist", "Prepare for talking to parents", "Design safe backup plans"]
    },
  },
  pvc: {
    grade: "pvc",
    label: { th: "ปวช.", en: "Voc. Cert." },
    heroTitle: { th: "เน้นทักษะวิชาชีพ ลองโปรเจกต์จริง และสะสมประสบการณ์ฝึกงาน", en: "Focus on vocational skills, real projects, and internship experience" },
    heroSubtitle: { th: "LifeMap จะช่วยต่อยอดทักษะเฉพาะทางที่คุณกำลังเรียน เชื่อมโยงกับโปรเจกต์ โอกาสแข่งขัน และเป้าหมายการฝึกงานจริงในอุตสาหกรรม", en: "LifeMap helps build upon your specialized vocational skills, linking them to projects, competitions, and real internship goals." },
    quizIntro: { th: "สำหรับ ปวช. Quiz นี้จะเน้นความสนใจในงานสายปฏิบัติการ ทักษะเชิงฝีมือ และการเตรียมสะสมผลงานโปรเจกต์สิ่งประดิษฐ์หรือการฝึกงานจริง", en: "For Voc. Cert., this quiz highlights hands-on interests, craftsmanship skills, and preparing invention projects or internship portfolios." },
    ctaLabel: { th: "วางแผนทักษะและโปรเจกต์", en: "Plan skills and projects" },
    nextActionText: { th: "ระบุทักษะวิชาชีพหลักและโปรเจกต์สิ่งประดิษฐ์ หรือแผนการฝึกงานที่สนใจ แล้วดูว่าสอดคล้องกับทักษะตลาดแรงงานอย่างไร", en: "Identify your main vocational skills, invention projects, or internship plans, and see how they match labor market needs." },
    goalPrompt: { th: "ในสายอาชีพนี้อยากให้ LifeMap ช่วยเน้นเรื่องใดเป็นพิเศษ", en: "Which area would you like LifeMap to help focus on in your vocational path?" },
    goalOptions: {
      th: ["ค้นหาทักษะเด่นของสายงาน", "เตรียมผลงานสิ่งประดิษฐ์/ฝึกงาน", "เปรียบเทียบระหว่างเรียนต่อ ปวส. หรือทำงาน", "หาช่องทางแข่งขันทักษะวิชาชีพ"],
      en: ["Identify key industry skills", "Prepare invention/internship portfolio", "Compare working vs. studying High Voc. Cert.", "Find vocational skill competitions"]
    },
  },
  pvs: {
    grade: "pvs",
    label: { th: "ปวส.", en: "High Voc. Cert." },
    heroTitle: { th: "เตรียมก้าวสู่การทำงานจริงหรือต่อยอดปวส.สู่มหาวิทยาลัย", en: "Prepare for entering the workforce or bridging to university" },
    heroSubtitle: { th: "LifeMap ช่วยจัดแผนเปลี่ยนผ่านสู่ตลาดงาน หรือเชื่อมโยงปริญญาตรีสายเทคโนโลยี/ปฏิบัติการ พร้อมวิเคราะห์ทักษะตลาดล่าสุด", en: "LifeMap helps plan your transition into the job market or bridging to a bachelor degree, analyzing the latest industry skills." },
    quizIntro: { th: "สำหรับ ปวส. Quiz นี้จะประเมินทักษะความพร้อมในการทำงาน ความเข้าใจโจทย์อุตสาหกรรมจริง และความสนใจการเรียนต่อสายทักษะขั้นสูง", en: "For High Voc. Cert., this quiz evaluates work readiness, understanding industry challenges, and interest in advanced technical degrees." },
    ctaLabel: { th: "วางแผนก้าวเปลี่ยนผ่านทำงาน/เรียนต่อ", en: "Plan your transition (work/degree)" },
    nextActionText: { th: "ทำเช็คลิสต์ตรวจสอบทักษะความพร้อม (Workplace Skills) และเลือกเป้าหมายที่ชัดเจน เช่น สมัครงาน, ร่วมโปรเจกต์อุตสาหกรรม หรือเทียบโอน ป.ตรี", en: "Complete a workplace skills readiness checklist and select clear goals like job applications, industry projects, or university transfer." },
    goalPrompt: { th: "ช่วงปีสุดท้ายของ ปวส. นี้อยากเน้นเรื่องไหนมากที่สุด", en: "During your final High Voc. Cert. year, which area do you want to focus on the most?" },
    goalOptions: {
      th: ["เตรียมตัวสมัครงานและรีวิวเรซูเม่", "เปรียบเทียบการเทียบโอน ป.ตรี", "พัฒนาทักษะหัวหน้างาน (Supervisor Skills)", "ค้นหาแหล่งทุน/โจทย์โครงงานอุตสาหกรรม"],
      en: ["Job applications & resume review", "Compare bachelor degree transfers", "Develop supervisor skills", "Find funding/industrial project prompts"]
    },
  },
  uni: {
    grade: "uni",
    label: { th: "มหาวิทยาลัย", en: "University" },
    heroTitle: { th: "สร้างโพรไฟล์วิชาชีพ ค้นหาที่ฝึกงาน และเตรียมก้าวสู่การทำงาน", en: "Build professional profile, find internships, and prepare for work" },
    heroSubtitle: { th: "LifeMap ช่วยคุณวิเคราะห์จับคู่ทักษะคณะที่เรียน เข้ากับสายงานจริง โอกาสฝึกงานบริษัทชั้นนำ และเตรียมเรซูเมแบบมีเป้าหมาย", en: "LifeMap helps match your college skills to real career paths, top internships, and goal-driven resumes." },
    quizIntro: { th: "สำหรับมหาวิทยาลัย Quiz นี้จะเน้นความถนัดวิชาชีพขั้นสูง (Hard Skills) ความเข้ากันกับวัฒนธรรมองค์กร และสายอาชีพย่อยที่สอดคล้องกับคุณ", en: "For university students, this quiz focuses on advanced vocational skills, corporate culture fit, and micro-career specialization paths." },
    ctaLabel: { th: "จัดการ Portfolio & ฝึกงาน", en: "Manage Portfolio & Internships" },
    nextActionText: { th: "เลือกกิจกรรมและเป้าหมายการฝึกงาน หรือโปรเจกต์อิสระที่สนใจทำช่วงศึกษา และตรวจวิเคราะห์ความพร้อมร่วมกับ AI Advisor", en: "Select internship goals or independent projects to do during college, and assess your readiness with the AI Advisor." },
    goalPrompt: { th: "ในระดับมหาวิทยาลัยนี้ อยากให้ LifeMap เน้นจุดประสงค์ใดเป็นพิเศษ", en: "At the university level, which primary objective do you want LifeMap to focus on?" },
    goalOptions: {
      th: ["วางแผนหาสถานที่ฝึกงาน", "ทำเรซูเมเทียบทักษะสมัครงาน", "พัฒนาทักษะเฉพาะทาง (Specialty Skills)", "เปรียบเทียบศึกษาต่อ ป.โท หรือทำงาน"],
      en: ["Plan internship searches", "Create skill-matched resume for jobs", "Develop specialized skills", "Compare Master's degrees vs. working"]
    },
  },
  work: {
    grade: "work",
    label: { th: "วัยทำงาน", en: "Working / Career" },
    heroTitle: { th: "ประเมินและทบทวนทักษะเพื่อการเปลี่ยนผ่านหรือเติบโตในสายงาน", en: "Assess and review skills for career transition or promotion" },
    heroSubtitle: { th: "LifeMap ช่วยประเมินดัชนีชี้วัดทักษะทำงานของคุณ แนะนำหลักสูตรยกระดับความสามารถ (Upskilling) และทิศทางการย้ายงานเชิงกลยุทธ์", en: "LifeMap helps evaluate your workplace skills, recommends upskilling courses, and suggests strategic job transitions." },
    quizIntro: { th: "สำหรับวัยทำงาน Quiz นี้จะประเมินดัชนีชี้วัดทักษะการทำงานจริง (Workplace Skills) ความต้องการการเติบโต และความสมดุลชีวิตส่วนตัวกับงาน (Work-Life Balance)", en: "For working professionals, this quiz evaluates actual workplace skills indicators, growth expectations, and work-life balance." },
    ctaLabel: { th: "ทบทวนประเมินทักษะ & ย้ายงาน", en: "Review Skills & Job Transition" },
    nextActionText: { th: "ทบทวนแผนพัฒนาตนเองระยะยาว (Long-term IDP) และอัปเดตทักษะล่าสุดร่วมกับ AI Guide เพื่อเตรียมรับข้อเสนอจากอุตสาหกรรม", en: "Review your Individual Development Plan (IDP) and update your skills with the AI Guide to prepare for industry opportunities." },
    goalPrompt: { th: "ในช่วงการทำงานนี้ เป้าหมายหลักของท่านคือข้อใด", en: "During this working phase, what is your primary career goal?" },
    goalOptions: {
      th: ["ทบทวนการย้ายสายงาน (Career Transition)", "ยกระดับทักษะทำงานล่าสุด (Upskilling)", "ปรับสมดุลชีวิตส่วนตัวและงาน (Work-Life Balance)", "พัฒนาทักษะความเป็นผู้นำ (Leadership)"],
      en: ["Review career transition options", "Upskill for latest market needs", "Optimize work-life balance", "Develop leadership/management skills"]
    },
  },
};

export const quizQuestions = [
  {
    id: "q1",
    key: "q1",
    domain: "Profile Archetype",
    prompt: {
      th: "Q1. ถ้าได้เริ่มโปรเจกต์ใหม่ในโรงเรียน คุณอยากรับบทบาทไหนมากที่สุด?",
      en: "Q1. If you were starting a new project in school, which role would you want to take the most?"
    },
    options: [
      { label: { th: "A. ออกแบบภาพรวม เล่าเรื่อง และทำคอนเทนต์ให้น่าสนใจ", en: "A. Design overall vision, storytelling, and engaging content" }, value: 4, cluster: "creator", riasec: "A", bigFive: "openness", code: "A" },
      { label: { th: "B. ทดลองสร้างต้นแบบ ใช้เครื่องมือ และแก้ปัญหาให้ใช้งานได้จริง", en: "B. Build prototypes, use tools, and solve functional problems" }, value: 4, cluster: "builder", riasec: "R", bigFive: "conscientiousness", code: "B" },
      { label: { th: "C. ค้นหาข้อมูล วิเคราะห์ pattern และสรุปเหตุผลด้วยหลักฐาน", en: "C. Research data, analyze patterns, and summarize logic with evidence" }, value: 4, cluster: "analyst", riasec: "I", bigFive: "conscientiousness", code: "C" },
      { label: { th: "D. เข้าใจผู้ใช้ ประสานทีม และช่วยให้ทุกคนทำงานร่วมกันได้ดี", en: "D. Understand users, coordinate team, and facilitate collaboration" }, value: 4, cluster: "helper", riasec: "S", bigFive: "agreeableness", code: "D" },
      { label: { th: "E. มองหาโอกาส คิดวิธีขยายผล หรือทำให้โปรเจกต์เติบโต", en: "E. Look for opportunities, scale impact, or grow the project" }, value: 4, cluster: "entrepreneur", riasec: "E", bigFive: "extraversion", code: "E" }
    ]
  },
  {
    id: "q2",
    key: "q2",
    domain: "Learning Style",
    prompt: {
      th: "Q2. เวลาเรียนเรื่องยาก วิธีไหนช่วยให้คุณไปต่อได้ดีที่สุด?",
      en: "Q2. When studying a difficult topic, which method helps you keep going best?"
    },
    options: [
      { label: { th: "A. เชื่อมโยงกับภาพ ตัวอย่าง และไอเดียสร้างสรรค์ใหม่ ๆ", en: "A. Associate with visuals, examples, and creative new ideas" }, value: 3, cluster: "creator", riasec: "A", bigFive: "openness", code: "A" },
      { label: { th: "B. แบ่งเป็นขั้นตอน ลองทำจริง และทำซ้ำจนมั่นใจ", en: "B. Break into steps, practice hands-on, and repeat until confident" }, value: 3, cluster: "builder", riasec: "C", bigFive: "conscientiousness", code: "B" },
      { label: { th: "C. ถามคำถามลึก ๆ แล้วหาเหตุผลหรือหลักฐานรองรับ", en: "C. Ask deep questions and find supporting logic or evidence" }, value: 3, cluster: "analyst", riasec: "I", bigFive: "openness", code: "C" },
      { label: { th: "D. คุยกับเพื่อนหรือครูเพื่อแลกเปลี่ยนมุมมอง", en: "D. Talk with friends or teachers to exchange perspectives" }, value: 3, cluster: "helper", riasec: "S", bigFive: "extraversion", code: "D" },
      { label: { th: "E. เชื่อมกับเป้าหมายในอนาคต ว่าจะนำไปใช้ทำอะไรได้", en: "E. Connect with future goals and real-world application" }, value: 3, cluster: "entrepreneur", riasec: "E", bigFive: "conscientiousness", code: "E" }
    ]
  },
  {
    id: "q3",
    key: "q3",
    domain: "Extracurricular Exploration",
    prompt: {
      th: "Q3. กิจกรรมเสริมแบบไหนที่คุณอยากลองเพื่อสำรวจอาชีพ?",
      en: "Q3. What kind of extracurricular activities do you want to try to explore careers?"
    },
    options: [
      { label: { th: "A. ค่ายสื่อ คอนเทนต์ การออกแบบ หรือทำ portfolio creative", en: "A. Media, content, design camps, or creative portfolio" }, value: 3, cluster: "creator", riasec: "A", bigFive: "openness", code: "A" },
      { label: { th: "B. ค่าย maker วิศวกรรม หุ่นยนต์ หรือสิ่งประดิษฐ์", en: "B. Maker, engineering, robotics camps, or inventions" }, value: 3, cluster: "builder", riasec: "R", bigFive: "conscientiousness", code: "B" },
      { label: { th: "C. data challenge งานวิจัย วิทยาศาสตร์ หรือวิเคราะห์ธุรกิจ", en: "C. Data challenges, scientific research, or business analysis" }, value: 3, cluster: "analyst", riasec: "I", bigFive: "conscientiousness", code: "C" },
      { label: { th: "D. อาสาแนะแนว สุขภาวะ การศึกษา หรือกิจกรรมชุมชน", en: "D. Guidance volunteering, wellbeing, education, or community service" }, value: 3, cluster: "helper", riasec: "S", bigFive: "agreeableness", code: "D" },
      { label: { th: "E. แข่งขัน startup pitch ทำเพจ หรือลองขายของออนไลน์", en: "E. Startup pitch competitions, page building, or e-commerce" }, value: 3, cluster: "entrepreneur", riasec: "E", bigFive: "extraversion", code: "E" }
    ]
  },
  {
    id: "q4",
    key: "q4",
    domain: "Team & Competition Role",
    prompt: {
      th: "Q4. ถ้าอยู่ในทีมประกวดหรือ startup school project คุณอยากดูแลส่วนไหน?",
      en: "Q4. If in a competition or startup school project team, which part would you manage?"
    },
    options: [
      { label: { th: "A. branding storytelling และการสื่อสารให้คนเชื่อในไอเดีย", en: "A. Branding, storytelling, and persuasive communication" }, value: 3, cluster: "creator", riasec: "A", bigFive: "openness", code: "A" },
      { label: { th: "B. prototype, demo หรือการทดสอบกับผู้ใช้จริง", en: "B. Prototype, demo, or real user testing" }, value: 3, cluster: "builder", riasec: "R", bigFive: "conscientiousness", code: "B" },
      { label: { th: "C. data analysis วางแผนเชิงตัวเลข หรือทำ research", en: "C. Data analysis, numerical planning, or research" }, value: 3, cluster: "analyst", riasec: "I", bigFive: "conscientiousness", code: "C" },
      { label: { th: "D. สัมภาษณ์ผู้ใช้ และเข้าใจปัญหาของคนจริง", en: "D. User interviews and understanding human problems" }, value: 3, cluster: "helper", riasec: "S", bigFive: "agreeableness", code: "D" },
      { label: { th: "E. pitch หาทุน หานักลงทุน หรือขยายตลาด", en: "E. Pitching for funding, investor relations, or market expansion" }, value: 3, cluster: "entrepreneur", riasec: "E", bigFive: "extraversion", code: "E" }
    ]
  },
  {
    id: "q5",
    key: "q5",
    domain: "Future Vision Goal",
    prompt: {
      th: "Q5. ภาพอนาคตแบบไหนทำให้คุณรู้สึก \"อยากค่อย ๆ สร้างไปถึง\" ที่สุด?",
      en: "Q5. Which future vision makes you feel most motivated to gradually build towards?"
    },
    options: [
      { label: { th: "A. มีผลงานสร้างสรรค์ที่สะท้อนตัวตนและคนจดจำ", en: "A. Creative work that reflects identity and is remembered" }, value: 4, cluster: "creator", riasec: "A", bigFive: "openness", code: "A" },
      { label: { th: "B. สร้าง product หรือระบบที่แก้ปัญหาได้จริง", en: "B. Build products or systems that solve real problems" }, value: 4, cluster: "builder", riasec: "R", bigFive: "conscientiousness", code: "B" },
      { label: { th: "C. เป็นคนที่คนไว้วางใจให้วิเคราะห์และตัดสินใจด้วยหลักฐาน", en: "C. Be trusted to analyze and make decisions based on evidence" }, value: 4, cluster: "analyst", riasec: "I", bigFive: "emotional_regulation", code: "C" },
      { label: { th: "D. ทำงานที่ช่วยให้ผู้คนมีชีวิต การเรียน หรือสุขภาวะดีขึ้น", en: "D. Work that improves people's lives, learning, or wellbeing" }, value: 4, cluster: "helper", riasec: "S", bigFive: "agreeableness", code: "D" },
      { label: { th: "E. สร้างธุรกิจหรือแบรนด์ที่สร้างโอกาสให้ตัวเองและคนอื่น", en: "E. Build a business or brand creating opportunities for all" }, value: 4, cluster: "entrepreneur", riasec: "E", bigFive: "extraversion", code: "E" }
    ]
  },
  {
    id: "q6",
    key: "q6",
    domain: "Wellbeing Scale",
    prompt: {
      th: "Q6. ตอนนี้คุณกังวลเรื่องอนาคตแค่ไหน?",
      en: "Q6. How anxious are you about the future right now?"
    },
    options: [
      { label: { th: "1 - ไม่กังวลเลย (มั่นใจมาก)", en: "1 - Not anxious at all" }, value: 1, cluster: "helper", riasec: "S", bigFive: "emotional_regulation" },
      { label: { th: "2 - กังวลเล็กน้อย", en: "2 - Slightly anxious" }, value: 2, cluster: "builder", riasec: "R", bigFive: "emotional_regulation" },
      { label: { th: "3 - กังวลปานกลาง", en: "3 - Moderately anxious" }, value: 3, cluster: "analyst", riasec: "I", bigFive: "emotional_regulation" },
      { label: { th: "4 - กังวลค่อนข้างมาก", en: "4 - Fairly anxious" }, value: 4, cluster: "creator", riasec: "A", bigFive: "emotional_regulation" },
      { label: { th: "5 - กังวลมากที่สุด", en: "5 - Extremely anxious" }, value: 5, cluster: "entrepreneur", riasec: "E", bigFive: "emotional_regulation" }
    ]
  },
  {
    id: "q7",
    key: "q7",
    domain: "PMF Signal",
    prompt: {
      th: "Q7. ถ้ามีระบบช่วยสรุปว่า \"คุณเป็นสายไหน และควรลองอะไรต่อ\" คุณอยากเห็นผลลัพธ์ไหม?",
      en: "Q7. If a system summarizes 'what pathway you are and what to try next', do you want to see results?"
    },
    options: [
      { label: { th: "อยากเห็นมาก", en: "Definitely want to see" }, value: 5, cluster: "creator", riasec: "A", bigFive: "openness" },
      { label: { th: "อยากเห็น", en: "Want to see" }, value: 4, cluster: "builder", riasec: "R", bigFive: "conscientiousness" },
      { label: { th: "เฉย ๆ", en: "Neutral" }, value: 3, cluster: "analyst", riasec: "I", bigFive: "openness" },
      { label: { th: "ไม่ค่อยอยากเห็น", en: "Not really" }, value: 2, cluster: "helper", riasec: "S", bigFive: "agreeableness" },
      { label: { th: "ไม่อยากเห็น", en: "Don't want to see" }, value: 1, cluster: "entrepreneur", riasec: "E", bigFive: "extraversion" }
    ]
  },
  {
    id: "q8",
    key: "q8",
    domain: "PMF Signal",
    prompt: {
      th: "Q8. ถ้ามีคำแนะนำกิจกรรม 7 วันที่เหมาะกับคุณ คุณอยากลองทำไหม?",
      en: "Q8. If personalized 7-day activities are recommended, do you want to try them?"
    },
    options: [
      { label: { th: "อยากลองมาก", en: "Definitely want to try" }, value: 5, cluster: "creator", riasec: "A", bigFive: "openness" },
      { label: { th: "อยากลอง", en: "Want to try" }, value: 4, cluster: "builder", riasec: "R", bigFive: "conscientiousness" },
      { label: { th: "ไม่แน่ใจ", en: "Not sure" }, value: 3, cluster: "analyst", riasec: "I", bigFive: "openness" },
      { label: { th: "ไม่ค่อยอยากลอง", en: "Not really" }, value: 2, cluster: "helper", riasec: "S", bigFive: "agreeableness" },
      { label: { th: "ไม่อยากลอง", en: "Don't want to try" }, value: 1, cluster: "entrepreneur", riasec: "E", bigFive: "extraversion" }
    ]
  },
  {
    id: "q9",
    key: "q9",
    domain: "PMF Signal",
    prompt: {
      th: "Q9. คุณคิดว่าผลลัพธ์ Future Profile นี้จะช่วยให้คุณตัดสินใจเรื่องอนาคตได้ดีขึ้นแค่ไหน?",
      en: "Q9. How much do you think Future Profile results will help you decide on your future?"
    },
    options: [
      { label: { th: "ช่วยมาก", en: "Helps very much" }, value: 5, cluster: "creator", riasec: "A", bigFive: "openness" },
      { label: { th: "ช่วยได้", en: "Helps" }, value: 4, cluster: "builder", riasec: "R", bigFive: "conscientiousness" },
      { label: { th: "กลางๆ", en: "Moderate" }, value: 3, cluster: "analyst", riasec: "I", bigFive: "openness" },
      { label: { th: "ช่วยน้อย", en: "Helps little" }, value: 2, cluster: "helper", riasec: "S", bigFive: "agreeableness" },
      { label: { th: "ไม่ช่วย", en: "Does not help" }, value: 1, cluster: "entrepreneur", riasec: "E", bigFive: "extraversion" }
    ]
  },
  {
    id: "q10",
    key: "q10",
    domain: "PMF Signal",
    prompt: {
      th: "Q10. คุณจะแนะนำเพื่อนให้ลองทำแบบสำรวจนี้ไหม?",
      en: "Q10. Would you recommend this survey to a friend?"
    },
    options: [
      { label: { th: "แนะนำแน่นอน", en: "Definitely recommend" }, value: 5, cluster: "creator", riasec: "A", bigFive: "openness" },
      { label: { th: "แนะนำ", en: "Recommend" }, value: 4, cluster: "builder", riasec: "R", bigFive: "conscientiousness" },
      { label: { th: "ไม่แน่ใจ", en: "Not sure" }, value: 3, cluster: "analyst", riasec: "I", bigFive: "openness" },
      { label: { th: "คงไม่แนะนำ", en: "Probably not" }, value: 2, cluster: "helper", riasec: "S", bigFive: "agreeableness" },
      { label: { th: "ไม่แนะนำ", en: "Would not recommend" }, value: 1, cluster: "entrepreneur", riasec: "E", bigFive: "extraversion" }
    ]
  },
  {
    id: "q11",
    key: "q11",
    domain: "Need-finding",
    prompt: {
      th: "Q11. คุณอยากให้ระบบช่วยเรื่องไหนมากที่สุด?",
      en: "Q11. What area do you want the system to help you with the most?"
    },
    options: [
      { label: { th: "รู้ว่าตัวเองถนัดอะไร", en: "Know my strengths" }, value: 3, cluster: "creator", riasec: "A", bigFive: "openness" },
      { label: { th: "รู้ว่าควรเรียนต่อทางไหนดี", en: "Know what major to study" }, value: 3, cluster: "analyst", riasec: "I", bigFive: "conscientiousness" },
      { label: { th: "รู้ว่าอาชีพไหนน่าลองสำรวจ", en: "Know what careers to explore" }, value: 3, cluster: "builder", riasec: "R", bigFive: "conscientiousness" },
      { label: { th: "ช่วยทำ Portfolio / ผลงาน", en: "Help build Portfolio / Works" }, value: 3, cluster: "creator", riasec: "A", bigFive: "openness" },
      { label: { th: "ช่วยหาโอกาส เช่น ค่าย ทุน คอร์ส หรือ mentor", en: "Find opportunities (camps, scholarships, courses, mentors)" }, value: 3, cluster: "entrepreneur", riasec: "E", bigFive: "extraversion" },
      { label: { th: "ช่วยให้คุยกับพ่อแม่/ครูเรื่องอนาคตง่ายขึ้น", en: "Easier to talk with parents/teachers about future" }, value: 3, cluster: "helper", riasec: "S", bigFive: "agreeableness" },
      { label: { th: "ยังไม่แน่ใจ", en: "Not sure yet" }, value: 1, cluster: "analyst", riasec: "I", bigFive: "openness" }
    ]
  }
];

export const thinkingStyleQuestions = [
  {
    id: "ts_q1",
    dimension: "energy",
    prompt: {
      th: "หลังจากทำโปรเจกต์กลุ่มที่เคร่งเครียดเสร็จสิ้น คุณเลือกชาร์จพลังด้วยวิธีไหน?",
      en: "After finishing a stressful group project, how do you prefer to recharge?"
    },
    options: [
      { label: { th: "แยกตัวไปพักผ่อนคนเดียว อ่านหนังสือ หรือทำกิจกรรมเงียบ ๆ", en: "Spend time alone, reading or doing a quiet hobby" }, value: "I" },
      { label: { th: "ออกไปพูดคุย กินข้าว หรือทำกิจกรรมสนุกสนานกับเพื่อน ๆ", en: "Go out to talk, eat, or do fun activities with friends" }, value: "E" }
    ]
  },
  {
    id: "ts_q2",
    dimension: "energy",
    prompt: {
      th: "เมื่อคุณมีไอเดียใหม่ ๆ คุณรู้สึกอยากทำอย่างไรกับมันมากที่สุด?",
      en: "When you have a new idea, what do you feel like doing first?"
    },
    options: [
      { label: { th: "คิดและประมวลผลเงียบ ๆ ในใจก่อนจะเริ่มพูดหรือทำ", en: "Think and process it quietly in your head before sharing" }, value: "I" },
      { label: { th: "พูดคุยเพื่อแลกเปลี่ยนและต่อยอดไอเดียกับคนอื่นทันที", en: "Talk to others immediately to brainstorm and build on it" }, value: "E" }
    ]
  },
  {
    id: "ts_q3",
    dimension: "energy",
    prompt: {
      th: "ในงานกิจกรรมที่มีคนจำนวนมาก คุณมักจะทำตัวอย่างไร?",
      en: "At a large social event, how do you usually behave?"
    },
    options: [
      { label: { th: "คุยกับคนคุ้นเคยหรือกลุ่มเล็ก ๆ และรู้สึกหมดพลังได้ง่าย", en: "Talk to a few close friends and feel drained quickly" }, value: "I" },
      { label: { th: "เดินไปพูดคุยทำความรู้จักคนใหม่ ๆ และรู้สึกตื่นตัวสนุกสนาน", en: "Walk around to meet new people and feel energized" }, value: "E" }
    ]
  },
  {
    id: "ts_q4",
    dimension: "energy",
    prompt: {
      th: "วิธีใดที่คุณชอบใช้ในการระดมความคิด (Brainstorm)?",
      en: "Which brainstorming method do you prefer?"
    },
    options: [
      { label: { th: "คิดโจทย์ล่วงหน้าคนเดียว แล้วค่อยเขียนสรุปส่งทีม", en: "Think about the prompt alone beforehand, then write a summary for the team" }, value: "I" },
      { label: { th: "นั่งประชุมวงคุยกันสด ๆ คิดพรั่งพรูออกมาระหว่างสนทนา", en: "Sit in a live group meeting and speak ideas out during the conversation" }, value: "E" }
    ]
  },
  {
    id: "ts_q5",
    dimension: "lens",
    prompt: {
      th: "เวลาคุณศึกษาเรื่องใหม่ คุณมักจะสนใจเรื่องใดก่อน?",
      en: "When learning something new, what interests you first?"
    },
    options: [
      { label: { th: "ขั้นตอนที่ชัดเจน ข้อมูลจริง และตัวอย่างจริงในปัจจุบัน", en: "Clear steps, real facts, and current practical examples" }, value: "S" },
      { label: { th: "ภาพรวมของแนวคิด ทฤษฎีเบื้องหลัง และการประยุกต์ใช้อนาคต", en: "The overall concept, underlying theories, and future applications" }, value: "N" }
    ]
  },
  {
    id: "ts_q6",
    dimension: "lens",
    prompt: {
      th: "เวลาแก้ปัญยาก ๆ คุณชอบใช้วิธีไหน?",
      en: "When solving a difficult problem, which approach do you prefer?"
    },
    options: [
      { label: { th: "ใช้วิธีเดิมที่เคยได้ผลและได้รับการพิสูจน์แล้วทีละขั้นตอน", en: "Use established methods that have been proven to work step-by-step" }, value: "S" },
      { label: { th: "คิดค้นวิธีใหม่ ๆ นอกกรอบที่ยังไม่เคยมีใครทำมาก่อน", en: "Brainstorm creative, out-of-the-box methods that haven't been tried" }, value: "N" }
    ]
  },
  {
    id: "ts_q7",
    dimension: "lens",
    prompt: {
      th: "คำแนะนำแบบใดที่คุณรู้สึกว่ามีประโยชน์ในการทบทวนตัวเอง?",
      en: "What kind of advice is most helpful to you during reflection?"
    },
    options: [
      { label: { th: "คำแนะนำที่เฉพาะเจาะจง มีรายละเอียดชัดเจนและจับต้องได้", en: "Specific advice with clear, detailed, and tangible steps" }, value: "S" },
      { label: { th: "คำแนะนำเชิงกว้างเชิงแรงบันดาลใจ เปิดกว้างให้คิดสร้างสรรค์", en: "Broad, inspirational advice that leaves room for creative interpretation" }, value: "N" }
    ]
  },
  {
    id: "ts_q8",
    dimension: "lens",
    prompt: {
      th: "เมื่อคุณอ่านหนังสือหรือฟังคนบรรยาย คุณมักจะสังเกตสิ่งใดก่อน?",
      en: "When reading or listening to a lecture, what do you notice first?"
    },
    options: [
      { label: { th: "รายละเอียด ข้อมูลข้อเท็จจริง และตัวเลขสถิติที่แน่นอน", en: "Details, factual statements, and precise statistics" }, value: "S" },
      { label: { th: "ความเชื่อมโยงภาพรวม ความหมายแฝง และไอเดียกว้าง ๆ", en: "Overall connections, hidden meanings, and high-level ideas" }, value: "N" }
    ]
  },
  {
    id: "ts_q9",
    dimension: "decision",
    prompt: {
      th: "เมื่อต้องตัดสินใจในงานกลุ่ม คุณมักให้น้ำหนักกับอะไรมากที่สุด?",
      en: "When making a group decision, what do you weigh the most?"
    },
    options: [
      { label: { th: "ความสมเหตุสมผลของระบบ ผลลัพธ์ และความถูกต้องตรงไปตรงมา", en: "Logical reasoning, efficiency, and objective correctness" }, value: "T" },
      { label: { th: "ความรู้สึกของสมาชิกในทีม ความสามัคคี และผลกระทบต่อจิตใจคน", en: "Team members' feelings, harmony, and psychological impact" }, value: "F" }
    ]
  },
  {
    id: "ts_q10",
    dimension: "decision",
    prompt: {
      th: "เมื่อมีเพื่อนสนิทมาเล่าปัญหาหนักใจให้ฟัง คุณมักตอบสนองอย่างไร?",
      en: "When a close friend shares a personal problem, how do you usually respond?"
    },
    options: [
      { label: { th: "วิเคราะห์สาเหตุและเสนอทางออกของปัญหาที่เป็นไปได้จริง", en: "Analyze the causes and offer realistic solutions to the problem" }, value: "T" },
      { label: { th: "รับฟัง แสดงความเข้าใจ ปลอบใจ และยืนยันความรู้สึกของเพื่อน", en: "Listen with empathy, comfort them, and validate their feelings" }, value: "F" }
    ]
  },
  {
    id: "ts_q11",
    dimension: "decision",
    prompt: {
      th: "คุณมองว่าการติเพื่อก่อ (Constructive Criticism) ที่ดีควรเป็นอย่างไร?",
      en: "What do you think makes good constructive criticism?"
    },
    options: [
      { label: { th: "ตรงประเด็น ไม่ใช้ความรู้สึก และชี้ข้อบกพร่องตามจริง", en: "Direct, objective, and pointing out flaws exactly as they are" }, value: "T" },
      { label: { th: "นุ่มนวล รักษาน้ำใจ และเน้นให้กำลังใจเพื่อปรับปรุงทีหลัง", en: "Gentle, tactful, and focusing on encouraging them to improve" }, value: "F" }
    ]
  },
  {
    id: "ts_q12",
    dimension: "decision",
    prompt: {
      th: "เวลามีข้อขัดแย้งในห้องเรียนหรือที่ทำงาน คุณรู้สึกอย่างไร?",
      en: "How do you feel when there is a conflict in school or work?"
    },
    options: [
      { label: { th: "มองว่าเป็นเรื่องปกติเพื่อถกเถียงหาข้อเท็จจริงที่สมเหตุสมผลที่สุด", en: "View it as normal debate to find the most logical truth" }, value: "T" },
      { label: { th: "รู้สึกอึดอัดใจและอยากรีบปรับความเข้าใจเพื่อคืนความปรองดอง", en: "Feel uncomfortable and want to restore harmony as soon as possible" }, value: "F" }
    ]
  },
  {
    id: "ts_q13",
    dimension: "planning",
    prompt: {
      th: "เมื่อต้องเริ่มทำโปรเจกต์ใหม่ที่มีเวลา 1 เดือน คุณชอบทำตัวอย่างไร?",
      en: "When starting a new project due in 1 month, how do you prefer to manage it?"
    },
    options: [
      { label: { th: "วางแผนขั้นตอนละเอียดย่อย กำหนดวันส่งงาน และทำตามแผนนั้น", en: "Plan detailed sub-steps, set deadlines, and follow that schedule" }, value: "J" },
      { label: { th: "เริ่มลงมือทำกว้าง ๆ แล้วปรับเปลี่ยนรายละเอียดไปตามสถานการณ์หน้างาน", en: "Start broadly and adapt the details to the situation as it develops" }, value: "P" }
    ]
  },
  {
    id: "ts_q14",
    dimension: "planning",
    prompt: {
      th: "คุณรู้สึกอย่างไรกับแผนงานที่มีความยืดหยุ่นไม่มีกำหนดการแน่นอน?",
      en: "How do you feel about flexible plans with no fixed schedule?"
    },
    options: [
      { label: { th: "รู้สึกกังวลและอึดอัดใจ เพราะไม่มีอะไรการันตีความคืบหน้า", en: "Feel anxious and uncomfortable because progress isn't guaranteed" }, value: "J" },
      { label: { th: "รู้สึกผ่อนคลายและอิสระ เพราะสามารถปรับเปลี่ยนได้ตามความเหมาะสม", en: "Feel relaxed and free because you can adapt as you go" }, value: "P" }
    ]
  },
  {
    id: "ts_q15",
    dimension: "planning",
    prompt: {
      th: "วิธีการทำงานชิ้นใหญ่ของคุณมักเป็นอย่างไร?",
      en: "How do you usually work on a major assignment?"
    },
    options: [
      { label: { th: "ทยอยทำทีละนิดล่วงหน้าอย่างสม่ำเสมอ เพื่อไม่ให้กระชั้นชิดเกินไป", en: "Do a little bit consistently in advance to avoid rush" }, value: "J" },
      { label: { th: "รอแรงบันดาลใจหรือช่วงเวลากระชั้นชิด แล้วเร่งทำแบบรวดเดียวจบ", en: "Wait for inspiration or near the deadline, then complete it in a rush" }, value: "P" }
    ]
  },
  {
    id: "ts_q16",
    dimension: "planning",
    prompt: {
      th: "หากเพื่อนชวนไปทริปเที่ยวช่วงวันหยุดสุดสัปดาห์ คุณอยากให้ทริปนั้นเป็นแบบใด?",
      en: "If a friend invites you to a weekend trip, what kind of trip would you prefer?"
    },
    options: [
      { label: { th: "มีตารางเวลา แหล่งท่องเที่ยว และที่พักจองเรียบร้อยล่วงหน้าชัดเจน", en: "Have a clear itinerary, destinations, and accommodation booked in advance" }, value: "J" },
      { label: { th: "ระบุแค่สถานที่กว้าง ๆ แล้วไปตัดสินใจเลือกกิจกรรมจริงหน้างานตามใจชอบ", en: "Decide only on the broad destination and choose activities on the fly" }, value: "P" }
    ]
  }
];

export const thinkingStyleProfiles = {
  ENFJ: {
    name: { th: "Human-Centered Helper (ผู้ประสานใจมุ่งผลลัพธ์)", en: "Human-Centered Helper" },
    headline: { th: "มีแนวโน้มชอบสนับสนุนการเติบโตของผู้อื่น วางแผนกิจกรรมโดยคำนึงถึงความรู้สึกและความร่วมมือของทีม", en: "Tends to support others' growth, planning activities with deep empathy and team alignment." },
    strengths: {
      th: ["การสร้างแรงบันดาลใจให้เพื่อนร่วมทีม", "ความเข้าใจความรู้สึกผู้อื่นอย่างลึกซึ้ง", "การจัดโครงสร้างกิจกรรมเพื่อส่วนรวม"],
      en: ["Inspiring and motivating team members", "Deep understanding of others' feelings", "Structuring activities for collective wellbeing"]
    },
    watchouts: {
      th: ["อาจกดดันตัวเองเพื่อความคาดหวังของคนอื่นมากเกินไป", "หลีกเลี่ยงความขัดแย้งจนละเลยความต้องการที่แท้จริงของตนเอง", "รู้สึกเครียดเมื่อทีมไม่กลมเกลียวกัน"],
      en: ["May over-pressure yourself to meet others' expectations", "Avoiding conflicts at the expense of your own needs", "Feeling stressed when team harmony is disrupted"]
    },
    bestLearningMode: { th: "การเรียนรู้ผ่านกิจกรรมกลุ่ม โครงการบำเพ็ญประโยชน์ หรือเวิร์กช็อปร่วมกัน", en: "Collaborative projects, peer mentoring, and interactive workshops." },
    parentAdvice: { th: "ลูกของคุณมีน้ำใจเด่นชัดและรับผิดชอบต่อเพื่อน ๆ ควรสนับสนุนให้ลูกสร้างขอบเขตที่ดีและมีเวลาดูแลตนเองโดยไม่ต้องแบกรับปัญหาของคนอื่นทั้งหมด", en: "Your child is highly empathetic and responsible. Encourage them to set healthy boundaries and spend time on self-care instead of carrying everyone's burdens." }
  },
  ENFP: {
    name: { th: "Creative Pathfinder (ผู้บุกเบิกแนวคิดสร้างสรรค์)", en: "Creative Pathfinder" },
    headline: { th: "มีแนวโน้มชอบมองหาโอกาสและพลังงานแปลกใหม่ ยืดหยุ่นและพร้อมปรับเปลี่ยนไปตามแรงบันดาลใจ", en: "Tends to seek new possibilities, staying highly flexible and driven by sparks of inspiration." },
    strengths: {
      th: ["ความคิดสร้างสรรค์อันหลากหลาย", "พลังงานบวกในการขับเคลื่อนงานและผู้คน", "ความยืดหยุ่นปรับตัวเก่งในสถานการณ์ท้าทาย"],
      en: ["Limitless creative brainstorming", "Spreading positive energy to move people", "Adapting quickly to changing circumstances"]
    },
    watchouts: {
      th: ["เริ่มทำหลายอย่างพร้อมกันแต่ทำเสร็จยาก", "เบื่อง่ายเมื่อเจองานรูทีนหรือรายละเอียดเอกสาร", "อาจละเลยรายละเอียดเล็ก ๆ ที่จำเป็น"],
      en: ["Starting many projects but struggling to finish them", "Bored easily by routine tasks or detailed documentation", "Overlooking small but critical project details"]
    },
    bestLearningMode: { th: "การทดลองแก้โจทย์ใหม่ ๆ โครงงานอิสระที่สร้างสรรค์ หรือสตาร์ทอัพจำลอง", en: "Exploratory learning, brainstorming sessions, and creative startup simulators." },
    parentAdvice: { th: "ลูกชื่นชอบการริเริ่มสิ่งใหม่ ๆ และมีจินตนาการกว้างไกล ควรให้ลูกทดลองทำกิจกรรมหลากหลายชนิด และช่วยสะกิดแนะนำวิธีสะสางงานให้เสร็จทีละชิ้นอย่างใจเย็น", en: "Your child loves starting new things and has a broad imagination. Let them explore various activities and gently guide them to complete projects one at a time." }
  },
  ENTJ: {
    name: { th: "Strategic Builder (นักสร้างกลยุทธ์และผู้นำ)", en: "Strategic Builder" },
    headline: { th: "มีแนวโน้มชอบจัดระเบียบ วางแผนภาพกว้าง และนำทีมไปสู่เป้าหมายที่ต้องการด้วยหลักการเหตุผล", en: "Tends to organize resources, build long-term plans, and drive the team logically toward goals." },
    strengths: {
      th: ["การวางวิสัยทัศน์และแผนกลยุทธ์ระยะยาว", "ความเด็ดขาดในการตัดสินใจแก้ปัญหา", "ความสามารถในการจัดระเบียบโครงสร้างงาน"],
      en: ["Formulating long-term visions and strategies", "Decisive problem-solving abilities", "Structuring workflows and systems efficiently"]
    },
    watchouts: {
      th: ["อาจดูเข้มงวดหรือบีบกดดันคนอื่นมากเกินไป", "มองข้ามมิติความรู้สึกหรือความเหนื่อยล้าของคนรอบข้าง", "หงุดหงิดง่ายเมื่อแผนไม่ตรงเป้าหรือไม่มีระเบียบ"],
      en: ["Can appear overly demanding or critical", "Overlooking team members' emotional states or fatigue", "Impatient with inefficiency or lack of structure"]
    },
    bestLearningMode: { th: "โครงการแข่งขันแผนงาน คอร์สพัฒนาผู้นำ หรือการบริหารโปรเจกต์ท้าทาย", en: "Case study competitions, leadership labs, and structured project management." },
    parentAdvice: { th: "ลูกมีภาวะผู้นำและทักษะการวางแผนที่ชัดเจน ควรชื่นชมในความกล้าคิดกล้าทำของลูก และคอยชี้แนะวิธีรับฟังและยืดหยุ่นต่อความเห็นของเพื่อนร่วมทีม", en: "Your child displays strong leadership and planning skills. Praise their initiative while encouraging them to practice active listening and patience with peers." }
  },
  ENTP: {
    name: { th: "Opportunity Designer (นักคิดค้นโอกาสและนวัตกรรม)", en: "Opportunity Designer" },
    headline: { th: "มีแนวโน้มรักการทดลองแนวคิดใหม่ ชอบความท้าทายสมอง และสนุกกับการแก้โจทย์ยากที่ซับซ้อน", en: "Tends to love mental challenges, exploring new concepts, and solving complex problems." },
    strengths: {
      th: ["การเชื่อมโยงทฤษฎีหรือไอเดียแปลกใหม่", "การวิเคราะห์และโต้แย้งอย่างเป็นตรรกะ", "การมองหาโอกาสและวิธีนอกกรอบ"],
      en: ["Connecting disparate concepts creatively", "Logical debate and conceptual analysis", "Seeing novel opportunities and workarounds"]
    },
    watchouts: {
      th: ["เบื่อง่ายในขั้นตอนการลงมือทำรายละเอียดระยะยาว", "อาจโต้เถียงเพื่อหาความถูกต้องจนลืมรักษาความรู้สึกคนอื่น", "วางแผนแบบเปลี่ยนไปมาจนทีมตามไม่ทัน"],
      en: ["Losing interest during long-term implementation details", "Debating logically but unintentionally hurting feelings", "Changing plans too frequently for the team to keep up"]
    },
    bestLearningMode: { th: "การแข่งขันแฮกกาธอน (Hackathon) การโต้วาทีเชิงวิชาการ หรือการวิจัยนวัตกรรม", en: "Hackathons, academic debates, and interactive innovation labs." },
    parentAdvice: { th: "ลูกเป็นนักคิดนักตั้งคำถามที่มีชีวิตชีวา ควรเปิดโอกาสให้ลูกพูดคุยโต้แย้งในประเด็นต่าง ๆ และช่วยฝึกให้ลูกพัฒนาวินัยในการปิดโครงการให้สำเร็จตามกติกา", en: "Your child is a vibrant thinker who loves questioning. Engage in discussions with them and help them develop the discipline to follow through on their projects." }
  },
  ESFJ: {
    name: { th: "Collaborative Supporter (ผู้สนับสนุนทีมและระเบียบวินัย)", en: "Collaborative Supporter" },
    headline: { th: "มีแนวโน้มชอบสร้างบรรยากาศที่อบอุ่นและปลอดภัย ใส่ใจรายละเอียดชีวิตและความสุขรอบตัว", en: "Tends to create warm, stable environments, paying close attention to others' comfort and daily needs." },
    strengths: {
      th: ["ความรับผิดชอบและหน้าที่ต่อส่วนรวมเป็นเลิศ", "การดูแลจัดการเอาใจใส่คนใกล้ชิด", "ความละเอียดรอบคอบเป็นระบบในชีวิตประจำวัน"],
      en: ["Exceptional responsibility toward group duties", "Nurturing and coordinating care for close ones", "Practical organization and attention to details"]
    },
    watchouts: {
      th: ["อาจกังวลใจง่ายเมื่อพบคำวิพากษ์วิจารณ์เชิงลบ", "ยึดติดขั้นตอนเดิมจนปรับตัวรับสิ่งใหม่ได้ช้าในบางครั้ง", "ละเลยความต้องการของตนเองเพื่อดูแลคนอื่น"],
      en: ["Sensitive to criticism and prone to worry", "Struggling to adapt to sudden departures from guidelines", "Neglecting personal needs to keep others happy"]
    },
    bestLearningMode: { th: "โครงการบำเพ็ญประโยชน์ร่วมกัน การประสานงานของโรงเรียน หรือวิชาการเชิงปฏิบัติจริง", en: "Structured group work, service-oriented programs, and hands-on vocational courses." },
    parentAdvice: { th: "ลูกเป็นคนน่ารักและใส่ใจคนรอบข้างเป็นอย่างมาก ควรสร้างความมั่นใจให้ลูกรู้ว่าความมีน้ำใจของเขามีค่า และช่วยแนะนำให้เขารู้จักปฏิเสธเมื่อเกินขีดจำกัดตัวเอง", en: "Your child is highly caring and dutiful. Validate their kindness and support them in learning to say no when they are taking on too much." }
  },
  ESFP: {
    name: { th: "Active Communicator (ผู้นำเสนอพลังงานและการลงมือทำ)", en: "Active Communicator" },
    headline: { th: "มีแนวโน้มชื่นชอบการปฏิบัติงานจริงท่ามกลางผู้คน มีชีวิตชีวาและมอบความสุขให้คนรอบข้าง", en: "Tends to learn best by doing, bringing positive vibes and immediate action to social settings." },
    strengths: {
      th: ["ความมีไหวพริบและคล่องแคล่วประสานงาน", "ทักษะนำเสนอและการกระตุ้นความตื่นตัวของกลุ่ม", "ความตื่นเต้นและรักความสนุกสนานในการทดลองจริง"],
      en: ["Vibrant communication and social coordination", "Engaging presentation and performance skills", "Active enthusiasm for hands-on, concrete tasks"]
    },
    watchouts: {
      th: ["ละเลยการคิดวิเคราะห์ถึงผลกระทบระยะยาว", "หลีกเลี่ยงการนั่งศึกษาทฤษฎีเชิงลึกที่ต้องใช้เวลานาน", "อาจตัดสินใจฉับพลันตามอารมณ์ชั่ววูบ"],
      en: ["Overlooking long-term consequences of actions", "Avoiding dense, theoretical reading that lacks activity", "Making impulsive choices based on current excitement"]
    },
    bestLearningMode: { th: "เวิร์กช็อปปฏิบัติการ โครงการนำเสนอสื่อสารสร้างสรรค์ หรือทัศนศึกษาภาคสนาม", en: "Experiential learning, creative media projects, and active field trips." },
    parentAdvice: { th: "ลูกมีความสุขที่สุดเมื่อได้ทำกิจกรรมจริงท่ามกลางผู้คน ควรสนับสนุนพื้นที่ให้ลูกแสดงความสามารถ และช่วยฝึกให้ลูกหยุดคิดประเมินแผนระยะยาวอย่างเป็นมิตร", en: "Your child thrives in active, social spaces. Provide opportunities for them to express themselves and help them practice reflection and long-term planning." }
  },
  ESTJ: {
    name: { th: "Practical Director (ผู้นำจัดการระบบและผลลัพธ์จริง)", en: "Practical Director" },
    headline: { th: "มีแนวโน้มชอบจัดการงานตามระบบที่มีประสิทธิภาพ มุ่งเน้นผลงานสำเร็จและประจักษ์พยานความจริง", en: "Tends to direct tasks efficiently, focusing on concrete outcomes, facts, and established rules." },
    strengths: {
      th: ["การบริหารทรัพยากรและตารางงานอย่างแม่นยำ", "ความรับผิดชอบหน้าที่และกฎกติกาอย่างมั่นคง", "ความเด็ดขาดชัดเจนในการทำงาน"],
      en: ["Precise management of schedules and resources", "Dependable compliance with standards and rules", "Clear, direct guidance in project execution"]
    },
    watchouts: {
      th: ["อาจปฏิเสธแนวคิดใหม่ที่ยังไม่มีการทดสอบ", "ดูตึงตังหรือแข็งกระด้างเมื่อเร่งรัดความเร็วในงาน", "มองข้ามมิติทางอารมณ์ของเพื่อนร่วมงาน"],
      en: ["Skeptical of unproven theories or sudden experiments", "Appearing rigid when driving team performance", "Neglecting team morale and emotional subtleties"]
    },
    bestLearningMode: { th: "วิชาการที่มีขั้นตอนแบบแผนชัดเจน การจำลองการบริหารจัดการ หรือโครงการเน้นผลสัมฤทธิ์", en: "Structured coursework, simulated operations, and goal-focused team management." },
    parentAdvice: { th: "ลูกมีวินัยและการทำงานที่เป็นระบบอย่างโดดเด่น ควรชื่นชมความทุ่มเทจริงจังของลูก และคอยชวนคุยประเด็นที่ปลายเปิด ยืดหยุ่นเพื่อลดความตึงเครียดของสมอง", en: "Your child possesses outstanding self-discipline and organization. Appreciate their diligence and encourage open-ended discussions where there is no single right answer." }
  },
  ESTP: {
    name: { th: "Active Explorer (นักปฏิบัติลุยงานจริงและการแก้ปัญหา)", en: "Active Explorer" },
    headline: { th: "มีแนวโน้มชอบความท้าทายเฉพาะหน้า ใช้ไหวพริบและลงมือแก้ไขสิ่งของหรือระบบกายภาพจริง", en: "Tends to enjoy spontaneous challenges, using practical skills to solve problems in real-time." },
    strengths: {
      th: ["การประเมินและการแก้ปัญหาฉุกเฉินเฉพาะหน้า", "ความกล้าลงมือทำและทดสอบสิ่งใหม่ทันที", "ทักษะงานช่าง กายภาพ หรือการคิดนอกกรอบเชิงปฏิบัติ"],
      en: ["Quick reflexes in tactical, real-time crisis resolution", "Fearless approach to try new physical activities", "Strong technical, mechanical, or physical coordination"]
    },
    watchouts: {
      th: ["อาจทำสิ่งต่าง ๆ เสี่ยงอันตรายโดยไม่มีแผนรองรับ", "เบื่อง่ายกับทฤษฎีเชิงนามธรรมหรือแผนการระยะยาวมาก", "ขาดความอดทนในงานเอกสารหรืองานละเอียดอ่อน"],
      en: ["Taking unnecessary risks without a backup plan", "Impatient with long-term theoretical analysis", "Struggling with sedentary paperwork or delicate social details"]
    },
    bestLearningMode: { th: "การทำโครงงานหุ่นยนต์ วิศวกรรม ค่ายปฏิบัติการลุยสนาม หรือการฝึกฝีมือจริง", en: "Vocational workshops, engineering builds, field research, and tactical simulators." },
    parentAdvice: { th: "ลูกเรียนรู้ได้ดีผ่านประสาทสัมผัสและการทดลองลุยจริง ควรสนับสนุนกิจกรรมแนวลุยและวิชาชีพเชิงเทคนิค พร้อมช่วยกระตุ้นเตือนความปลอดภัยรอบด้านเป็นระยะ", en: "Your child learns best by touch and movement. Support hands-on technical workshops and outdoor activities, while gently setting safety parameters." }
  },
  INFJ: {
    name: { th: "Reflective Vision Builder (นักคิดวิสัยทัศน์และอุดมการณ์)", en: "Reflective Vision Builder" },
    headline: { th: "มีแนวโน้มคิดลึกซึ้งมองภาพกว้าง สนใจความหมายเชิงจิตวิทยาและตั้งเป้าช่วยเหลือโลกในแบบตนเอง", en: "Tends to think deeply about systemic patterns, motivated by inner ideals and compassionate growth." },
    strengths: {
      th: ["การมองเห็นภาพปลายทางและความเชื่อมโยงระยะยาว", "ความเข้าอกเข้าใจและวิเคราะห์นิสัยผู้คนลึกซึ้ง", "ความมุ่งมั่นทุ่มเททำงานอย่างเงียบสงบตามอุดมการณ์"],
      en: ["Synthesizing long-term concepts and visions", "Insightful understanding of human motivations", "Quiet persistence in tasks aligning with core values"]
    },
    watchouts: {
      th: ["กดดันตัวเองกับแผนการอนาคตจนละเลยชีวิตปัจจุบัน", "ทำงานทุ่มเทมากไปจนเหนื่อยล้าสะสมง่าย (Burnout)", "ตั้งมาตรฐานความสมบูรณ์แบบส่วนตัวไว้สูงเกินจริง"],
      en: ["Anxious about future visions, missing the present", "Overworking to exhaustion by carrying too much care", "Holding yourself and others to unrealistically high standards"]
    },
    bestLearningMode: { th: "การบันทึกทบทวนเงียบ ๆ (Reflection) โครงงานวิจัยจิตวิทยา หรือการช่วยเหลือสังคมแบบเฉพาะเจาะจง", en: "Independent reflection, psychology studies, and writing in-depth research papers." },
    parentAdvice: { th: "ลูกมีความคิดที่อ่อนโยนและละเอียดอ่อนมาก ควรให้เวลาลูกได้พักสมองทบทวนไอเดียในห้องส่วนตัวเงียบ ๆ หลีกเลี่ยงการบังคับให้ลูกโต้ตอบหรือแสดงความเห็นกะทันหัน", en: "Your child's inner thoughts are highly complex and sensitive. Allow them quiet space to recharge, avoiding demands for immediate responses or public spotlight." }
  },
  INFP: {
    name: { th: "Meaning Explorer (นักสำรวจคุณค่าและความหมาย)", en: "Meaning Explorer" },
    headline: { th: "มีแนวโน้มยึดมั่นในคุณค่าจิตใจส่วนบุคคล ต้องการความสอดคล้องกับคุณค่าภายในตนเองอย่างลึกซึ้ง", en: "Tends to prioritize core personal values, seeking authenticity and harmony with their inner beliefs." },
    strengths: {
      th: ["ความชื่อสัตย์ต่อความจริงและคุณค่าภายใน", "ความคิดสร้างสรรค์ทางศิลปะหรือมุมมองที่ไม่ซ้ำใคร", "ความเข้าใจความบอบช้ำทางใจและช่วยเหลืออย่างอ่อนโยน"],
      en: ["Fidelity to personal integrity and ideals", "Unique creative expression and writing flair", "Deep empathy for individual struggles and healing"]
    },
    watchouts: {
      th: ["ยากในการจัดโครงสร้างขั้นตอนการลงมือทำงานชิ้นใหญ่", "ยอมเก็บความรู้สึกอึดอัดไว้เพื่อไม่ให้เกิดความขัดแย้ง", "มักสงสัยและประเมินคุณค่าตนเองต่ำกว่าความเป็นจริง"],
      en: ["Struggling to structure complex projects step-by-step", "Holding in distress to avoid confrontation", "Underestimating your own talents and self-worth"]
    },
    bestLearningMode: { th: "การเขียนบล็อก งานศิลปะสร้างสรรค์ คอนเทนต์เล่าเรื่อง หรือโครงการบำเพ็ญประโยชน์เดี่ยว", en: "Self-paced study, creative writing, artistic projects, and small-scale volunteering." },
    parentAdvice: { th: "ลูกเป็นนักสะท้อนคิดที่เปี่ยมไปด้วยจินตนาการและอบอุ่น ควรหลีกเลี่ยงการกดดันเปรียบเทียบลูกกับเด็กคนอื่น และคอยประคองให้ลูกทำก้าวเล็ก ๆ อย่างสม่ำเสมอตามจังหวะของตัวเอง", en: "Your child is a gentle, imaginative reflector. Avoid comparing them to others and support them in taking steady, small actions at their own pace." }
  },
  INTJ: {
    name: { th: "Strategic Designer (นักคิดกลยุทธ์และจัดระบบ)", en: "Strategic Designer" },
    headline: { th: "มีแนวโน้มชอบวิเคราะห์แผนงานเชิงลึก คิดค้นระบบงานให้ถูกต้องสมบูรณ์แบบด้วยตรรกะอิสระ", en: "Tends to analyze structures deeply, designing independent, logical systems with high standards." },
    strengths: {
      th: ["การวิเคราะห์ตรรกะระดับสูงและการวางระบบแผนป้องกัน", "ความเป็นอิสระเด็ดเดี่ยวในการศึกษาหาความรู้", "ความแม่นยำประเมินข้อผิดพลาดล่วงหน้า"],
      en: ["High-level logical design and systemic mapping", "Self-directed mastery of complex disciplines", "Anticipating flaws and designing contingency plans"]
    },
    watchouts: {
      th: ["มักเลือกทำงานคนเดียวเพราะกลัวผู้อื่นทำผิดพลาด", "อาจดูเฉยชาหรือแข็งเกินไปเมื่อต้องพูดคุยเรื่องความรู้สึก", "เคร่งเครียดง่ายหากโครงสร้างระบบงานยืดหยุ่นเกินไป"],
      en: ["Preferring to work alone to maintain quality control", "Appearing cold when discussing feelings or vibes", "Stressed by unstructured environments or fuzzy tasks"]
    },
    bestLearningMode: { th: "การทำวิจัยเดี่ยว โครงงานเขียนโปรแกรม วิเคราะห์ข้อมูลระบบ หรือวางกลยุทธ์เกมท้าทาย", en: "Independent analytical research, software engineering, and strategic modeling." },
    parentAdvice: { th: "ลูกเป็นเด็กมีตรรกะชัดเจนและต้องการความเป็นอิสระสูง ควรเคารพการตัดสินใจและมุมมองที่เป็นเหตุผลของลูก และค่อย ๆ ชวนชี้ให้เห็นมุมมองเรื่องความรู้สึกผู้คนรอบตัว", en: "Your child is highly logical and independent. Respect their reasoned choices, while gently highlighting the value of empathy and human dynamics." }
  },
  INTP: {
    name: { th: "Analytical Thinker (นักวิเคราะห์ทฤษฎีและตรรกะ)", en: "Analytical Thinker" },
    headline: { th: "มีแนวโน้มให้ความสำคัญกับเหตุผลเชิงสัจธรรม ค้นหารูปแบบทฤษฎี และแก้ไขข้อผิดพลาดระบบข้อมูล", en: "Tends to focus on objective truth, seeking theoretical patterns and resolving logical errors." },
    strengths: {
      th: ["การตรวจพบความไม่สมเหตุสมผลหรือตรรกะวิบัติ", "ความเข้าใจโมเดลความรู้ที่ลึกซึ้งได้อย่างรวดเร็ว", "ความมีใจเป็นกลางไม่ใช้ความรู้สึกด่วนสรุป"],
      en: ["Pinpointing logical inconsistencies in arguments", "Grasping complex conceptual frameworks quickly", "Objective analysis detached from emotional bias"]
    },
    watchouts: {
      th: ["สื่อสารประเด็นยากให้เข้าใจง่ายได้ยากในกลุ่มคนทั่วไป", "เบื่อง่ายในท่อนปลายของโครงการเมื่อต้องรวบรวมส่งเอกสาร", "อาจจมอยู่กับการวิเคราะห์แนวคิดจนไม่ได้ลงมือทำ"],
      en: ["Explaining complex models to others simply", "Impatience with routine paperwork or follow-through", "Getting stuck in 'analysis paralysis' without acting"]
    },
    bestLearningMode: { th: "วิชาวิทยาศาสตร์ทฤษฎี คณิตศาสตร์ ตรรกศาสตร์ หรือโครงงานแก้โจทย์ปริศนาซับซ้อน", en: "Advanced science and math theory, logic puzzles, and independent engineering designs." },
    parentAdvice: { th: "ลูกมีความสงสัยใคร่รู้เชิงทฤษฎีที่ลึกซึ้ง ควรเปิดทางให้ลูกได้ศึกษาค้นคว้า และคอยช่วยเหลือสนับสนุนในการวางก้าวแรกของการปฏิบัติตามแผนอย่างใจเย็น", en: "Your child has deep theoretical curiosity. Support their drive to learn and gently help them outline the first step of practical execution." }
  },
  ISFJ: {
    name: { th: "Dedicated Supporter (ผู้สนับสนุนผู้เปี่ยมความรับผิดชอบ)", en: "Dedicated Supporter" },
    headline: { th: "มีแนวโน้มรับผิดชอบสูง ตรงต่อเวลา ทำงานเป็นขั้นตอนสม่ำเสมอเพื่อปกป้องดูแลความสงบเรียบร้อยของทีม", en: "Tends to be loyal and practical, working step-by-step to support the team's security and order." },
    strengths: {
      th: ["ความสม่ำเสมอรักษาคำสัญญาและดูแลรายละเอียดงาน", "ความเอาใจใส่ช่วยเหลือคนอื่นอย่างอบอุ่น", "ความมีระเบียบวินัยทุ่มเทให้กับหน้าที่อย่างไม่ย่อท้อ"],
      en: ["Reliable execution of daily tasks and promises", "Warm, detailed support for individuals", "Patience and persistence in performing duties"]
    },
    watchouts: {
      th: ["มักสะสมความกังวลไว้คนเดียวเพราะปฏิเสธใครไม่ค่อยลง", "กังวลกับการทดลองสิ่งใหม่ที่แหวกแนวหรือไม่มีกฎชัดเจน", "อาจถูกเอาเปรียบจากความเกรงใจและขยันเกินตัว"],
      en: ["Accumulating stress silently due to difficulty saying no", "Anxious about sudden changes or vague instructions", "Subject to burnout by taking on others' workloads"]
    },
    bestLearningMode: { th: "การเรียนรู้ตามคู่มือปฏิบัติที่ชัดเจน เวิร์กช็อปวิทยาศาสตร์สุขภาพ หรือโครงงานอาสาจัดระบบ", en: "Structured guidelines, health/social sciences, and organized service projects." },
    parentAdvice: { th: "ลูกทำงานหนักด้วยความรับผิดชอบเงียบสงบ ควรแสดงความขอบคุณในความน่ารักและทุ่มเทของลูกเป็นประจำ คอยประคองบอกลูกให้รู้จักขอความช่วยเหลือบ้างเมื่อรู้สึกเหนื่อย", en: "Your child is highly reliable and dutiful. Regularly express gratitude for their quiet effort, and remind them that it's okay to ask for help." }
  },
  ISFP: {
    name: { th: "Adaptive Creator (นักสร้างสรรค์ยืดหยุ่นและศิลปะ)", en: "Adaptive Creator" },
    headline: { th: "มีแนวโน้มรักอิสระและธรรมชาติ แสดงออกผ่านงานปฏิบัติจริงหรือศิลปะอย่างนุ่มนวลตามปัจจุบันขณะ", en: "Tends to enjoy hands-on projects, expressing feelings artistically and staying fluid in the present." },
    strengths: {
      th: ["สัมผัสเชิงสุนทรียภาพและความนุ่มนวลในการปฏิสัมพันธ์", "ความยืดหยุ่นเปิดรับและพร้อมปรับปรุงรายละเอียดเฉพาะหน้า", "ความประณีตในการสร้างสรรค์ชิ้นงาน"],
      en: ["Aesthetic appreciation and gentle demeanor", "Fluid adaptability to changing environments", "Hands-on craftsmanship and visual talent"]
    },
    watchouts: {
      th: ["กดดันและหลีกเลี่ยงแผนงานที่มีข้อกำหนดตารางแน่นเกินไป", "ยากในการวิเคราะห์คาดเดาความเสี่ยงระยะยาว", "อาจสื่อสารปัญหาในใจตนเองได้ไม่ตรงจุด"],
      en: ["Feeling trapped by rigid, micro-managed schedules", "Neglecting abstract, long-term risk assessment", "Keeping inner conflicts bottled up instead of speaking out"]
    },
    bestLearningMode: { th: "การฝึกหัดด้านศิลปะ ดนตรี วิทยศาสตร์การเกษตร การลงมือประดิษฐ์งานฝีมือจริง", en: "Visual arts, crafting, hands-on science experiments, and nature field studies." },
    parentAdvice: { th: "ลูกแสดงออกได้ดีผ่านการลงมือประดิษฐ์และงานฝีมือเชิงสร้างสรรค์ ควรสนับสนุนพื้นที่ทำงานเงียบ ๆ ของเขา และให้กำลังใจในก้าวปฏิบัติงานโดยไม่พยายามเปรียบเทียบผลงานของลูก", en: "Your child communicates beautifully through concrete creative works. Provide a peaceful workspace and support their process without judgment." }
  },
  ISTJ: {
    name: { th: "Calm Planner (นักวางแผนระบบความปลอดภัยและวินัย)", en: "Calm Planner" },
    headline: { th: "มีแนวโน้มทำงานเป็นระบบ ระบุข้อมูลที่จับต้องได้ตรงความจริง และซื่อตรงต่อหน้าที่อย่างลึกซึ้ง", en: "Tends to work methodically and quietly, focusing on verified facts and dependable logic." },
    strengths: {
      th: ["วินัยเป็นเลิศในการปฏิบัติตามแผนทีละขั้นตอน", "ความน่าเชื่อถือสูงส่งงานตรงเวลาและเกณฑ์ชัดเจน", "การจดบันทึกและประมวลข้อเท็จจริงตามจริง"],
      en: ["Exceptional discipline in step-by-step routines", "High reliability in meeting concrete requirements", "Factual accuracy and orderly documentation"]
    },
    watchouts: {
      th: ["รู้สึกปวดหัวเมื่อต้องเริ่มทำงานท่ามกลางกติกาที่เปลี่ยนไปมา", "อาจยึดเกณฑ์จนดูแข็งทื่อไม่ยอมรับความเสี่ยงสร้างสรรค์", "มองข้ามมิติด้านจิตใจของคนอื่นเมื่อต้องการความถูกต้อง"],
      en: ["Highly frustrated by shifting goals or fuzzy rules", "Overly cautious to take creative leaps or change systems", "Forgetting emotional considerations when insisting on facts"]
    },
    bestLearningMode: { th: "การศึกษาวิชาบัญชี กฎหมาย วิเคราะห์สถิติประยุกต์ หรือประวัติศาสตร์อ้างอิง", en: "Step-by-step technical coursework, logistics, historical database research, or accounting." },
    parentAdvice: { th: "ลูกเป็นเด็กน่ารักและมีวินัยความรับผิดชอบพึ่งพาตนเองได้ดี ควรให้ความเชื่อมั่นในแผนของลูก และช่วยชวนทำกิจกรรมผ่อนคลายเบาสมองเพื่อลดความตึงเครียดตามธรรมชาติของเขา", en: "Your child is highly organized and self-reliant. Trust their planning process, and gently invite them to casual, non-evaluated family fun to unwind." }
  },
  ISTP: {
    name: { th: "Practical Innovator (นักนวัตกรรมปฏิบัติและเทคนิค)", en: "Practical Innovator" },
    headline: { th: "มีแนวโน้มเงียบสงบ รักการสำรวจกลไกภายในสิ่งของ และแก้ปัญหาระบบเครื่องมือด้วยเหตุผลที่ตรงเป้า", en: "Tends to observe mechanical functions quietly, resolving technical problems with direct logic." },
    strengths: {
      th: ["ทักษะไหวพริบประเมินการแก้ปัญหาเฉพาะหน้าทางเทคนิค", "สมาธิระดับสูงในการทำงานกับเครื่องมือและกลไกซับซ้อน", "ความเงียบสงบนิ่งในสถานการณ์วิกฤต"],
      en: ["Exceptional technical troubleshooting in real-time", "High focus when working with tools and mechanisms", "Calm and pragmatic approach under pressure"]
    },
    watchouts: {
      th: ["ดูเย็นชาหรือไม่ใส่ใจที่จะคุยสื่อสารเรื่องความรู้สึกในทีม", "หลีกเลี่ยงกฎระเบียบที่ลูกมองว่าขัดกับความสมเหตุสมผลของระบบ", "อาจละทิ้งความสัมพันธ์เชิงลึกได้ง่าย"],
      en: ["Appearing aloof or uninterested in emotional team talks", "Bypassing bureaucratic rules that lack practical sense", "Withdrawing from deep or emotionally demanding social bonds"]
    },
    bestLearningMode: { th: "การลงมือรื้อประกอบอุปกรณ์ประดิษฐ์ โครงงานเชิงกล/คอมพิวเตอร์ หรือฝึกอาชีพช่างปฏิบัติการ", en: "Mechanical builds, coding challenges, and hands-on laboratory work." },
    parentAdvice: { th: "ลูกชอบสำรวจกลไกตามธรรมชาติและทำงานเงียบ ๆ ควรให้กำลังใจในอิสระการลงมือประดิษฐ์ของลูก หลีกเลี่ยงการเค้นถามความรู้สึก หรือบังคับให้พูดระบายตลอดเวลา", en: "Your child loves to examine how things work. Give them space for mechanical experiments, avoiding pressure to constantly express their feelings." }
  }
};


export const clusterLabels = {
  creator: { th: "Creative & Communication", en: "Creative & Communication" },
  builder: { th: "Technology & Engineering", en: "Technology & Engineering" },
  analyst: { th: "Business, Data & Strategy", en: "Business, Data & Strategy" },
  helper: { th: "Health, Education & Social Impact", en: "Health, Education & Social Impact" },
  entrepreneur: { th: "Entrepreneurship & Innovation", en: "Entrepreneurship & Innovation" }
};

export const riasecLabels = {
  R: { th: "Realistic — ลงมือทำ/เทคนิค", en: "Realistic — Hands-on/Technical" },
  I: { th: "Investigative — วิเคราะห์/วิจัย", en: "Investigative — Analytical/Research" },
  A: { th: "Artistic — สร้างสรรค์/สื่อสาร", en: "Artistic — Creative/Expressive" },
  S: { th: "Social — ผู้คน/การช่วยเหลือ", en: "Social — Friendly/Helping" },
  E: { th: "Enterprising — นำทีม/โอกาส", en: "Enterprising — Leadership/Opportunity" },
  C: { th: "Conventional — ระบบ/ความละเอียด", en: "Conventional — Organized/Detail-oriented" },
};

export const bigFiveLabels = {
  openness: { th: "Openness — เปิดรับไอเดียใหม่", en: "Openness — Intellectual Curiosity" },
  conscientiousness: { th: "Conscientiousness — วางแผนและรับผิดชอบ", en: "Conscientiousness — Order & Responsibility" },
  extraversion: { th: "Extraversion — สื่อสารและรับพลังจากผู้คน", en: "Extraversion — Social Engagement" },
  agreeableness: { th: "Agreeableness — ร่วมมือและเข้าใจผู้อื่น", en: "Agreeableness — Empathy & Cooperation" },
  emotional_regulation: { th: "Emotional regulation — จัดการแรงกดดัน", en: "Emotional regulation — Stress Management" },
};

export const marketplaceItems = [
  {
    id: "course-ai-foundation",
    title: { th: "AI Foundation Sprint", en: "AI Foundation Sprint" },
    type: { th: "Course", en: "Course" },
    cluster: { th: "Technology & Engineering", en: "Technology & Engineering" },
    tokenCost: 80,
    description: { th: "คอร์สพื้นฐาน AI + portfolio mini project สำหรับ ม.ปลาย", en: "Basic AI course + portfolio mini project for high schoolers" },
  },
  {
    id: "mentor-portfolio",
    title: { th: "Portfolio Mentor Clinic", en: "Portfolio Mentor Clinic" },
    type: { th: "Mentor", en: "Mentor" },
    cluster: { th: "Creative & Communication", en: "Creative & Communication" },
    tokenCost: 120,
    description: { th: "จำลองบริการ mentor สำหรับรีวิว portfolio และ direction คณะ", en: "Simulated mentor session to review portfolio and college paths" },
  },
  {
    id: "camp-social-health",
    title: { th: "Wellbeing & Social Impact Camp", en: "Wellbeing & Social Impact Camp" },
    type: { th: "Camp", en: "Camp" },
    cluster: { th: "Health, Education & Social Impact", en: "Health, Education & Social Impact" },
    tokenCost: 95,
    description: { th: "กิจกรรมค้นหาความถนัดด้านสุขภาพ การศึกษา และงานเพื่อสังคม", en: "Activity camp exploring health, education, and social work interests" },
  },
  {
    id: "scholarship-radar",
    title: { th: "Scholarship Radar", en: "Scholarship Radar" },
    type: { th: "Opportunity", en: "Opportunity" },
    cluster: { th: "Business, Data & Strategy", en: "Business, Data & Strategy" },
    tokenCost: 40,
    description: { th: "รายการทุนและกิจกรรมแข่งขันที่เหมาะกับ Life Profile ของคุณ", en: "Curated scholarships and competitions matching your Life Profile" },
  },
];

const growthDimensionLabels = {
  exploration: { th: "Exploration — สำรวจตัวเองและตัวเลือกใหม่", en: "Exploration — Self & Options Discovery" },
  action: { th: "Action — ลงมือทดลองจริง", en: "Action — Active Experimentation" },
  reflection: { th: "Reflection — สะท้อนสิ่งที่ได้เรียนรู้", en: "Reflection — Learning Reflection" },
  skill_growth: { th: "Skill Growth — ฝึกทักษะที่ต่อยอดได้", en: "Skill Growth — Transferable Skills" },
  future_clarity: { th: "Future Clarity — เห็นก้าวถัดไปชัดขึ้น", en: "Future Clarity — Next Steps Clarity" },
};

const growthDimensionInsights = {
  exploration: {
    emerging: { th: "กำลังเริ่มเปิดพื้นที่สำรวจตัวเลือกใหม่อย่างปลอดภัย", en: "Starting to open spaces for safe options exploration" },
    building: { th: "เริ่มเห็นความสนใจและทางเลือกที่อยากทดลองมากขึ้น", en: "Beginning to see more interests and options to try out" },
    expanding: { th: "สำรวจตัวเลือกได้กว้างขึ้นและเริ่มเลือกเรื่องที่อยากต่อยอด", en: "Exploring choices widely and selecting topics to build upon" },
  },
  action: {
    emerging: { th: "เริ่มแปลงความสนใจให้เป็นการทดลองเล็ก ๆ", en: "Starting to turn interests into micro-experiments" },
    building: { th: "มีสัญญาณของการลงมือทำที่ต่อเนื่องและจับต้องได้", en: "Showing signs of continuous and tangible execution" },
    expanding: { th: "เปลี่ยนการสำรวจให้เป็นหลักฐานการลงมือทำได้ชัดเจนขึ้น", en: "Transforming exploration into clear evidence of action" },
  },
  reflection: {
    emerging: { th: "เริ่มสังเกตความคิดและความรู้สึกหลังทำภารกิจ", en: "Beginning to observe thoughts and feelings after missions" },
    building: { th: "คำตอบเริ่มเชื่อมโยงสิ่งที่ทำกับสิ่งที่ได้เรียนรู้", en: "Answers start connecting actions with lessons learned" },
    expanding: { th: "สะท้อนบทเรียนจากประสบการณ์ได้ลึกและนำไปใช้ต่อได้", en: "Reflecting deeply on experiences and applying them forward" },
  },
  skill_growth: {
    emerging: { th: "เริ่มเห็นทักษะที่อยากฝึกผ่านภารกิจเล็ก ๆ", en: "Starting to recognize skills to practice via micro-missions" },
    building: { th: "มีสัญญาณว่ากำลังฝึกทักษะด้านนี้อย่างต่อเนื่องขึ้น", en: "Showing signs of practicing these skills more consistently" },
    expanding: { th: "เริ่มสะสมหลักฐานการเติบโตของทักษะจากการทดลองจริง", en: "Accumulating evidence of skill growth from real trials" },
  },
  future_clarity: {
    emerging: { th: "เริ่มตั้งคำถามกับทิศทางอนาคตโดยไม่รีบตัดสินตัวเอง", en: "Beginning to question future directions without rushing self-judgment" },
    building: { th: "เริ่มเห็นก้าวถัดไปที่อยากทดลองต่อมากขึ้น", en: "Beginning to see next steps you want to explore further" },
    expanding: { th: "มองเห็นทางเลือกถัดไปชัดขึ้นจากข้อมูลและประสบการณ์ของตัวเอง", en: "Seeing the next pathway clearly based on your own data and experiences" },
  },
};

const clusterMissionFocus = {
  creator: {
    theme: { th: "เรื่องเล่าหรือผลงานสร้างสรรค์", en: "a story or creative piece" },
    artifact: { th: "mini portfolio 1 ชิ้น", en: "1 mini portfolio piece" },
    people: { th: "คนที่ทำงานสายสื่อหรือ design", en: "someone working in media or design" },
    skill: { th: "storytelling", en: "storytelling" }
  },
  builder: {
    theme: { th: "ปัญหาใกล้ตัวที่อยากแก้", en: "a nearby problem you want to solve" },
    artifact: { th: "prototype ง่าย ๆ 1 ชิ้น", en: "1 simple prototype" },
    people: { th: "รุ่นพี่สายเทคหรือวิศวกรรม", en: "a senior in tech or engineering" },
    skill: { th: "prototype thinking", en: "prototype thinking" }
  },
  analyst: {
    theme: { th: "คำถามที่อยากหาคำตอบด้วยข้อมูล", en: "a question you want to answer using data" },
    artifact: { th: "ตารางเปรียบเทียบ 3 ทางเลือก", en: "a comparison table of 3 choices" },
    people: { th: "คนที่ใช้ข้อมูลตัดสินใจในงานจริง", en: "someone who uses data in their real job" },
    skill: { th: "decision matrix", en: "decision matrix" }
  },
  helper: {
    theme: { th: "ปัญหาของผู้คนที่อยากเข้าใจ", en: "a human problem you want to understand" },
    artifact: { th: "สรุป insight จากบทสนทนา", en: "insight summaries from a conversation" },
    people: { th: "คนทำงานสุขภาพ การศึกษา หรือสังคม", en: "someone in healthcare, education, or social services" },
    skill: { th: "empathetic interviewing", en: "empathetic interviewing" }
  },
  entrepreneur: {
    theme: { th: "โอกาสหรือปัญหาที่อยากทดสอบ", en: "an opportunity or problem you want to validate" },
    artifact: { th: "problem validation note", en: "a problem validation note" },
    people: { th: "ผู้ใช้หรือคนที่เจอปัญหานั้นจริง", en: "users or people who experience that problem first-hand" },
    skill: { th: "problem validation", en: "problem validation" }
  },
};

const missionHintExamples = {
  creator: {
    1: "เลือกศึกษาวิธีการเขียนเรื่องสั้นสยองขวัญแบบหักมุม เพราะอยากฝึกทักษะการดึงดูดความสนใจของผู้อ่าน",
    2: "อ่านบทความ Storytelling 101 บน Medium และดูคลิปวิเคราะห์การดำเนินเรื่องของหนังดังใน YouTube",
    3: "ดูคลิปเบื้องหลังการทำงานและบทสัมภาษณ์ของนักเขียนบทภาพยนตร์ ได้ข้อคิดว่าโครงเรื่องที่ดีต้องเน้นพฤติกรรมมนุษย์ที่เป็นจริง",
    4: "ร่างสตอรี่บอร์ดโครงเรื่องสั้น 4 ช่องลงบนกระดาษวาดรูป เพื่อจำลองเหตุการณ์หักมุมและลำดับตอนจบ",
    5: "ส่งให้เพื่อนช่วยอ่าน เพื่อนแนะนำว่าเนื้อหาช่วงเปิดเรื่องยาวเกินไป ควรทำให้กระชับและกระตุ้นความอยากรู้เร็วกว่านี้",
    6: "ปรับลดบทสนทนาฟุ่มเฟือยในช่วงแรก และเพิ่มคำพูดบอกใบ้เล็กน้อยในช่องที่สอง ทำให้การหักมุมตอนจบดูสมเหตุสมผลและสนุกขึ้น",
    7: "สัปดาห์หน้าตั้งเป้าศึกษาวิธีการลงสีและตกแต่งฉากในโปรแกรม Procreate เพื่อวาดการ์ตูนตัวเต็มหน้าแรกต่อ"
  },
  builder: {
    1: "เลือกปัญหาไฟทางเดินในบ้านมืดเกินไปจนคนแก่เดินลำบาก เพราะอยากออกแบบเซ็นเซอร์เปิดปิดไฟอัตโนมัติ",
    2: "ค้นหาวงจร Arduino เซ็นเซอร์ตรวจจับความเคลื่อนไหวจากเว็บ Instructables และอ่านวิธีคำนวณกำลังไฟถ่านกระดุม",
    3: "คุยกับรุ่นพี่วิศวกรรมคอมพิวเตอร์ ได้ข้อคิดว่าการทำชิ้นงานแรกให้เน้นฟังก์ชันพื้นฐานที่ใช้งานได้จริงก่อนความสวยงาม",
    4: "ต่อแผงวงจรจำลองเซ็นเซอร์แสงวัดความสว่างโดยใช้บอร์ด Tinkercad Circuits และทดลองสั่งเปิด LED เมื่อมืดลง",
    5: "แชร์ลิงก์จำลองให้ครูคอมพิวเตอร์ดู ครูแนะนำว่าควรเพิ่มความเร็วในการตอบสนองของแสงและตรวจเช็คปุ่มรีเซ็ตระบบ",
    6: "ปรับปรุงวงจรโดยแก้ไขตัวต้านทานและอัปเดตโค้ดเงื่อนไขหน่วงเวลาให้ LED สว่างขึ้นทันทีโดยไม่มีอาการกระพริบถี่",
    7: "สัปดาห์หน้าจะศึกษาเรื่องการเชื่อมต่อโมดูล Wi-Fi เพิ่มเติม เพื่อส่งแจ้งเตือนสถานะการทำงานของไฟเข้าสมาร์ทโฟน"
  },
  analyst: {
    1: "เลือกศึกษาความสัมพันธ์ระหว่างวิชาที่ถนัดกับโอกาสได้งาน เพื่อตัดสินใจเลือกสายการเรียนในระดับมหาวิทยาลัย",
    2: "ดาวน์โหลดสถิติบัณฑิตจบใหม่แยกตามคณะจากเว็บบัญชีข้อมูลภาครัฐ และอ่านรายงานแนวโน้มความต้องการแรงงานปี 2026",
    3: "สัมภาษณ์อาจารย์แนะแนวและพี่นักวิเคราะห์ข้อมูล ได้ความรู้ว่าทักษะ SQL และการสื่อสารข้อมูลให้เข้าใจง่ายเป็นสิ่งสำคัญมาก",
    4: "สร้างตารางเปรียบเทียบข้อดี-ข้อเสีย ค่าเล่าเรียน และอัตราการได้งานของ 3 สาขาที่สนใจ (วิทยาการข้อมูล, ไอที, สถิติ)",
    5: "ส่งให้เพื่อนร่วมห้องดู เพื่อนแนะนำว่าควรเพิ่มคอลัมน์ประเมินความสอดคล้องกับความถนัดของตัวเอง (Self-Fit Score) ด้วย",
    6: "ปรับตารางวิเคราะห์โดยเพิ่มการให้คะแนนความชอบ 1-5 และไฮไลต์แถบสีเด่นชัดในส่วนวิชาที่ได้เกรดดี ช่วยให้ตัดสินใจง่ายขึ้น",
    7: "สัปดาห์ถัดไปตั้งเป้าหมายสมัครทดลองใช้งานซอฟต์แวร์วิเคราะห์ข้อมูลเบื้องต้นเพื่อฝึกหัดทำแดชบอร์ดสรุปคะแนนของตนเอง"
  },
  helper: {
    1: "เลือกปัญหาความเครียดของเพื่อน ๆ ในช่วงสัปดาห์สอบ เพราะอยากหาวิธีกระจายข้อมูลสรุปวิชาเรียนเพื่อช่วยลดความกังวล",
    2: "อ่านบทความเทคนิคการจัดการความเครียดบนเว็บชีวจิต และเปิดดูวิดีโอแนะนำวิธีการฟังอย่างเข้าอกเข้าใจ (Active Listening)",
    3: "คุยกับครูห้องพยาบาล ได้ข้อคิดว่านักเรียนมักเครียดจากความคาดหวังของครอบครัว และต้องการพื้นที่ระบายใจที่ปลอดภัย",
    4: "จดสรุปปัญหาและความต้องการของเพื่อนจากการพูดคุย 3 เรื่องหลักลงบนกระดาษแผ่นเดียว เพื่อจัดกลุ่มปัญหากังวลใจ",
    5: "นำสรุปอินไซต์ไปเล่าให้หัวหน้าห้องฟัง หัวหน้าแนะนำว่าควรจัดทำกลุ่มอ่านหนังสือร่วมกันแบบออนไลน์แทนการติวสดในห้อง",
    6: "ปรับเป็นฟอร์มรับคำถามยาก ๆ แบบไม่ระบุตัวตนทางออนไลน์ เพื่อให้คนที่อายได้ระบุข้อสงสัยมาให้เพื่อนช่วยตอบสลัดความกังวล",
    7: "สัปดาห์หน้าจะเริ่มชวนเพื่อนที่เก่งแต่ละวิชามาร่วมเป็นติวเตอร์อาสาเพื่อแบ่งปันข้อมูลสรุปวิชาเคมีและฟิสิกส์"
  },
  entrepreneur: {
    1: "เลือกปัญหาแถวร้านขายข้าวกลางวันในโรงเรียนคิวยาวมาก เพื่อทดสอบไอเดียระบบสั่งและชำระเงินล่วงหน้าผ่านแชตบอท",
    2: "ค้นคว้ากรณีศึกษาเรื่อง Business Model Canvas ของแอปส่งอาหารสำเร็จรูป และอ่านวิธีคำนวณต้นทุนการทำธุรกรรมการเงิน",
    3: "เดินคุยสอบถามเพื่อนTarget 5 คน พบว่าทุกคนยอมจ่ายเงินเพิ่ม 5 บาทต่อจานหากสามารถรับอาหารได้ทันทีโดยไม่ต้องต่อคิว",
    4: "สร้างแบบฟอร์ม Google Form จำลองเมนูอาหารหลัก 3 รายการพร้อมปุ่มเลือกเวลาและช่องแนบสลิปโอนเงินเสร็จสรรพ",
    5: "ส่งให้รุ่นพี่ที่เป็นประธานชมรมคอมพิวเตอร์ดู รุ่นพี่ชี้เป้าว่าต้องมีระบบคืนเงินหากร้านค้าไม่สามารถจัดทำอาหารได้ทันเวลา",
    6: "ปรับปรุงหน้าฟอร์มเพิ่มข้อตกลงการรับประกันเวลารับของและขยายเวลาสั่งล่วงหน้าเป็นอย่างน้อย 30 นาทีก่อนกระดิ่งดัง",
    7: "สัปดาห์ถัดไปตั้งใจนำแบบฟอร์มจำลองนี้ไปเปิดรับออเดอร์กับเพื่อนในกลุ่มเรียนก่อนจำนวน 5 คนเพื่อดูอุปสรรคหน้างานจริง"
  }
};

const missionHintExamplesEn = {
  creator: {
    1: "Selected to study plot-twists in thriller short stories to learn how to keep readers engaged.",
    2: "Read 'Storytelling 101' on Medium and watched video essays analyzing narrative structures in cinema.",
    3: "Watched interview clips of professional screenwriters: learned that great plots stem from authentic human behaviors.",
    4: "Sketched a 4-panel comic storyboard on paper to organize key narrative turning points and the final twist.",
    5: "Showed it to a friend: they noted the beginning felt too slow and recommended raising stakes earlier.",
    6: "Cut down unnecessary dialogue in the first panel and added subtle visual hints in the second to improve flow.",
    7: "Next week I will learn digital coloring in Procreate to fully finalize the first page of my comic strip."
  },
  builder: {
    1: "Selected the problem of dark hallways at home causing fall risks for elders, aiming to design auto-sensors.",
    2: "Searched Arduino motion detector circuit diagrams on Instructables and calculated button battery power.",
    3: "Talked to a senior computer engineering student: advised that my first prototype should focus on core function, not aesthetics.",
    4: "Assembled a simulated light detector circuit on Tinkercad Circuits and programmed it to turn on LED when dark.",
    5: "Shared Tinkercad simulator link with my computer science teacher: advised adding a fuse or checking reset button logic.",
    6: "Adjusted resistor parameters and updated code delay conditions to stabilize the light output, preventing flicker.",
    7: "Next week I will study Wi-Fi module integrations to send mobile notifications when light activates."
  },
  analyst: {
    1: "Selected career placement stats of different majors to decide my university path.",
    2: "Downloaded graduate employment datasets from public open-data portals and reviewed a 2026 tech trends report.",
    3: "Interviewed my guidance teacher and a data analyst: learned that SQL and data visualization skills are highly demanded.",
    4: "Created a comparison sheet of 3 career paths (Data Science, IT, Statistics) comparing tuition, pros/cons, and hiring rates.",
    5: "Showed it to a classmate: suggested adding a column evaluating 'Personal Interest Match' (Self-Fit Score).",
    6: "Added a 1-5 interest score column and color-coded rows based on grade performance to highlight optimal matches.",
    7: "Next week I will sign up for a basic business intelligence software trial to build a personal dashboard."
  },
  helper: {
    1: "Selected student exam stress as a topic to find ways to share study guides and ease peer anxiety.",
    2: "Read articles about stress management on health websites and watched educational videos on Active Listening.",
    3: "Talked to the school nurse: learned that students struggle most with family expectations and need safe spaces to talk.",
    4: "Summarized the top 3 peer anxiety concerns from my conversations onto a one-page brainstorming map.",
    5: "Showed findings to the class president: suggested creating online study groups instead of after-school cram sessions.",
    6: "Designed an anonymous online submission form so quiet classmates can ask difficult questions without feeling judged.",
    7: "Next week I will invite top students to form a volunteer tutor team to share physics and chemistry notes."
  },
  entrepreneur: {
    1: "Selected the school cafeteria's long lunch lines to validate a pre-order chatbot concept.",
    2: "Researched delivery app Business Model Canvases and read articles on payment gateway transaction costs.",
    3: "Interviewed 5 target classmates: all agreed they would pay a 5 THB premium if they could skip queues completely.",
    4: "Built a basic Google Form showing 3 main menu items, pickup times, and a QR payment deposit attachment field.",
    5: "Showed the form to a senior student: advised creating a clear refund policy if food preparation gets delayed.",
    6: "Updated form guidelines with an order cutoff time (30 mins before lunch) and guaranteed pickup details.",
    7: "Next week I will launch a test batch with 5 classmates to handle real transactions and delivery logistics."
  }
};

// --- Initial State Definition ---
export const initialState = {
  studentName: "",
  schoolName: "",
  gradeLevel: null,
  currentGoal: "",
  guideTone: "supportive",
  language: localStorage.getItem('lifemap_language') || "th",
  consent: {
    profile: false,
    quiz: false,
    aiGuide: false,
    parentLink: false,
    marketplace: false,
    thinkingStyle: false,
  },
  campaignCode: "",
  answers: {},
  thinkingStyleAnswers: {},
  thinkingStyleCompleted: undefined,
  thinkingStyle: null,
  tokens: 25,
  claimedBadges: [],
  bookmarks: [],
  growthMissions: [],
  checkIns: [],
  streakCount: 0,
  lastCheckInDate: "",
  growthReviewUnlocked: false,
  unlockedItems: [],
  parentInviteCode: "LM-4827",
  shareWithParent: {
    profile: false,
    report: false,
    marketplace: false,
  },
};

// Global App State
export let state = { ...initialState };
let currentQuizIdx = 0;
let quizMode = 'career';
let currentSelectedDay = 1;

export function showBrandConfirm(message) {
  return new Promise((resolve) => {
    const modal = document.getElementById('brand-confirm-modal');
    const msgText = document.getElementById('brand-confirm-message');
    if (!modal || !msgText) {
      resolve(window.confirm(message));
      return;
    }

    msgText.textContent = message;
    modal.classList.add('active');
    if (window.lucide) {
      window.lucide.createIcons();
    }

    const onOk = () => {
      cleanup();
      resolve(true);
    };

    const onCancel = () => {
      cleanup();
      resolve(false);
    };

    const onBackdropClick = (e) => {
      if (e.target === modal) {
        onCancel();
      }
    };

    const cleanup = () => {
      modal.classList.remove('active');
      document.getElementById('brand-confirm-ok-btn').removeEventListener('click', onOk);
      document.getElementById('brand-confirm-cancel-btn').removeEventListener('click', onCancel);
      modal.removeEventListener('click', onBackdropClick);
    };

    document.getElementById('brand-confirm-ok-btn').addEventListener('click', onOk);
    document.getElementById('brand-confirm-cancel-btn').addEventListener('click', onCancel);
    modal.addEventListener('click', onBackdropClick);
  });
}

// Auth status check and routing helper
function checkAuthStatus() {
  // Load state first to see if guest data exists
  loadState();
  updateDashboardUI();

  // Sync campaign inputs and welcome badge
  const obCampaign = document.getElementById('ob-campaign');
  if (obCampaign) {
    obCampaign.value = state.campaignCode || "";
  }
  const schoolCodeInput = document.getElementById('school-code-input');
  if (schoolCodeInput) {
    schoolCodeInput.value = state.campaignCode || "";
  }

  // Routing and view toggling logic
  let loggedInUser = localStorage.getItem('lifemap_logged_in_user');
  if (!loggedInUser) {
    loggedInUser = 'guest_student';
    localStorage.setItem('lifemap_logged_in_user', loggedInUser);
    localStorage.setItem('lifemap_logged_in_role', 'student');
  }

  if (!state.studentName) state.studentName = "นักเรียน LifeMap";
  if (!state.gradeLevel) state.gradeLevel = "m4";

  const appSidebar = document.getElementById('app-sidebar');
  const appHeader = document.getElementById('app-header');
  const appContainer = document.querySelector('.app-container');

  if (appSidebar) appSidebar.style.display = 'flex';
  if (appHeader) appHeader.style.display = 'flex';
  if (appContainer) appContainer.classList.add('sidebar-visible');

  const currentView = localStorage.getItem('lifemap_v2_view') || 'dashboard';
  
  let targetPanel = document.getElementById(`view-${currentView}`);
  if (!targetPanel) targetPanel = document.getElementById('view-dashboard') || document.getElementById('view-onboarding');

  document.querySelectorAll('.view-panel').forEach(panel => {
    panel.classList.toggle('active', panel === targetPanel);
  });
  
  document.querySelectorAll('.nav-menu .nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === currentView);
  });
  
  const settingsBtn = document.getElementById('btn-settings');
  if (settingsBtn) {
    settingsBtn.classList.toggle('active', settingsBtn.dataset.view === currentView);
  }
  
  const headerSettingsBtn = document.getElementById('btn-header-settings');
  if (headerSettingsBtn) {
    headerSettingsBtn.classList.toggle('active', currentView === 'settings');
  }
}

function renderLifeProfileUI() {
  const profile = computeProfile(state.answers);
  if (!profile) return;

  const lang = state.language || 'th';
  const isParent = localStorage.getItem('lifemap_logged_in_role') === 'parent';

  const resetBtn = document.getElementById('btn-reset-quiz');
  if (resetBtn) {
    resetBtn.style.display = isParent ? 'none' : 'block';
  }

  document.getElementById('profile-archetype-title').textContent = profile.archetype[lang] || profile.archetype;
  document.getElementById('profile-headline').textContent = profile.headline[lang] || profile.headline;
  
  // Strengths
  const strengthsUl = document.getElementById('profile-strengths-list');
  strengthsUl.innerHTML = '';
  const strengthsList = profile.strengths[lang] || [];
  strengthsList.forEach(s => {
    const li = document.createElement('li');
    li.textContent = s;
    strengthsUl.appendChild(li);
  });

  // Learning style & Wellbeing
  document.getElementById('profile-learning-style').textContent = profile.learningStyle[lang] || profile.learningStyle;
  document.getElementById('profile-wellbeing-note').textContent = profile.wellbeingNote[lang] || profile.wellbeingNote;

  // Next Moves list
  const nextMovesUl = document.getElementById('profile-next-moves-list');
  nextMovesUl.innerHTML = '';
  const nextMovesList = profile.nextMoves[lang] || [];
  nextMovesList.forEach(m => {
    const li = document.createElement('li');
    li.textContent = m;
    if (!isParent) {
      li.style.cursor = 'pointer';
      li.addEventListener('click', () => {
        const isEn = state.language === 'en';
        const question = isEn 
          ? `How can I start this next move: "${m}"?`
          : `ช่วยแนะนำวิธีเริ่มต้นทำก้าวต่อไปนี้หน่อยครับ/ค่ะ: "${m}"`;
        const payload = isEn
          ? `I am interested in this recommended Next Move: "${m}". Please provide a step-by-step startup guide, resources, or project ideas I can do related to this move.`
          : `ฉันสนใจก้าวต่อไปที่ควรลอง (Next Move) คือ: "${m}" ช่วยนำเสนอแผนการเริ่มต้นทำสิ่งนี้ทีละสเต็ป แหล่งข้อมูล หรือไอเดียกิจกรรมโครงงานที่ฉันสามารถทำได้จริงจากก้าวนี้ทีครับ/ค่ะ`;
        sendUserMessage(question, payload);
        scrollToChat();
      });
    } else {
      li.style.cursor = 'default';
    }
    nextMovesUl.appendChild(li);
  });

  // Render Radar Chart for RIASEC
  renderWheel();
  
  // Render Bar list for RIASEC scores detail
  const riasecScoresList = document.getElementById('riasec-scores-list');
  riasecScoresList.innerHTML = '';
  profile.riasecScores.forEach(s => {
    const pct = Math.round((s.score / 24) * 100);
    const item = document.createElement('div');
    item.className = 'chart-legend-item';
    item.innerHTML = `
      <div class="legend-name-val">
        <span>${s.name}</span>
        <span>${s.score} ${lang === 'en' ? 'Points' : 'คะแนน'}</span>
      </div>
      <div class="legend-progress-bar">
        <div class="progress-fill" style="width: ${pct}%"></div>
      </div>
    `;
    riasecScoresList.appendChild(item);
  });

  // Render Big Five Scores list
  const bigFiveList = document.getElementById('bigfive-scores-list');
  bigFiveList.innerHTML = '';
  profile.bigFiveScores.forEach(s => {
    const pct = Math.round((s.score / 24) * 100);
    const item = document.createElement('div');
    item.className = 'bigfive-item';
    item.innerHTML = `
      <div class="bf-name-val">
        <span>${s.name}</span>
        <span>${s.score}/24</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${pct}%"></div>
      </div>
    `;
    bigFiveList.appendChild(item);
  });

  // Horoscope / Career Vibe setup
  const vibes = {
    creator: {
      star: { th: "กลุ่มดาวสร้างสรรค์ (Constellation Creative)", en: "Constellation Creative" },
      skill: { th: "การเล่าเรื่อง (Storytelling)", en: "Storytelling" },
      ritual: { th: "สเก็ตช์ภาพไอเดีย 5 นาทีตอนเช้า", en: "Sketch ideas for 5 minutes in the morning" }
    },
    builder: {
      star: { th: "กลุ่มดาวนักประดิษฐ์ (Constellation Maker)", en: "Constellation Maker" },
      skill: { th: "การวางแผนต้นแบบ (Prototype Planning)", en: "Prototype Planning" },
      ritual: { th: "ซ่อมแซมหรือลองสร้างชิ้นงานก่อนนอน", en: "Fix or try building something before sleeping" }
    },
    analyst: {
      star: { th: "กลุ่มดาวนักเดินเรือ (Constellation Navigator)", en: "Constellation Navigator" },
      skill: { th: "ตารางเปรียบเทียบตัดสินใจ (Decision Matrix)", en: "Decision Matrix" },
      ritual: { th: "เปรียบเทียบข้อมูลด้วยตรรกะวันละรอบ", en: "Compare data using logic once a day" }
    },
    helper: {
      star: { th: "กลุ่มดาวผู้ดูแล (Constellation Caregiver)", en: "Constellation Caregiver" },
      skill: { th: "การสัมภาษณ์ด้วยความใส่ใจ (Empathy Interviewing)", en: "Empathy Interviewing" },
      ritual: { th: "รับฟังปัญหารุ่นน้องหรือคนรอบข้างแบบไม่วิจารณ์", en: "Listen to others without criticizing them" }
    },
    entrepreneur: {
      star: { th: "กลุ่มดาวผู้แสวงหาโอกาส (Constellation Opportunity)", en: "Constellation Opportunity" },
      skill: { th: "การตรวจสอบปัญหา (Problem Validation)", en: "Problem Validation" },
      ritual: { th: "วิเคราะห์โมเดลธุรกิจของร้านที่เดินผ่าน", en: "Analyze business model of a shop you walk past" }
    }
  };
  
  const curCluster = profile.careerClusters[0]?.id || "creator";
  const curVibe = vibes[curCluster] || vibes.creator;
  document.getElementById('horoscope-constellation').textContent = curVibe.star[lang] || curVibe.star;
  document.getElementById('horoscope-lucky-skill').textContent = curVibe.skill[lang] || curVibe.skill;
  document.getElementById('horoscope-ritual').textContent = curVibe.ritual[lang] || curVibe.ritual;

  // AI Prompt bubbles setup
  const promptsList = document.getElementById('ai-prompts-list');
  if (promptsList) {
    promptsList.innerHTML = '';
    const archName = profile.archetype[lang] || profile.archetype;
    const prompts = lang === 'en' ? [
      {
        text: `Explain Archetype "${archName}" & my strengths in detail`,
        msg: `Please explain in detail about my "${archName}" archetype and my strengths to guide my learning choices.`
      },
      {
        text: `Recommend a project style that fits my interests`,
        msg: `Based on my profile, what project or research topics would be most interesting and align with my strengths?`
      },
      {
        text: `Help me pitch to my parents about joining camps in this field`,
        msg: `Please design a short recommendation or guide I can use to talk to my family about my goals and activities I want to explore.`
      }
    ] : [
      {
        text: `อธิบาย Archetype "${archName}" และจุดแข็งของฉันอย่างละเอียด`,
        msg: `อธิบายประเมินเพิ่มเติมเกี่ยวกับโปรไฟล์ "${archName}" ของฉัน เพื่อช่วยไกณ์ตัวเลือกการเรียนทีครับ/ค่ะ`
      },
      {
        text: `แนะนำสไตล์การเลือกหัวข้อโครงงานที่ตรงความสนใจฉันที่สุด`,
        msg: `จากโปรไฟล์ของฉัน โครงงานแนะแนวหรือหัวข้อวิจัยไหนที่น่าสนใจและตรงจุดแข็งที่สุดบ้าง`
      },
      {
        text: `ช่วยคิดไอเดียคุยกับผู้ปกครองเพื่อขอไปเข้าค่ายตามสายนี้`,
        msg: `ช่วยออกแบบคำแนะนำสั้น ๆ สำหรับใช้คุยกับครอบครัวเกี่ยวกับเป้าหมายและสายกิจกรรมที่เราอยากทดลองทำหน่อย`
      }
    ];
    
    prompts.forEach(p => {
      const btn = document.createElement('button');
      btn.className = 'ai-prompt-btn';
      btn.textContent = p.text;
      if (!isParent) {
        btn.addEventListener('click', () => {
          sendUserMessage(p.text, p.msg);
        });
      } else {
        btn.style.opacity = '0.6';
        btn.style.cursor = 'default';
      }
      promptsList.appendChild(btn);
    });
  }
  
  // Render Thinking Style Detailed Report
  renderDetailedThinkingStyleProfile();
}

function initApp() {
  const alertModal = document.getElementById('brand-alert-modal');
  if (alertModal) {
    alertModal.addEventListener('click', (e) => {
      if (e.target === alertModal) {
        alertModal.classList.remove('active');
      }
    });
  }

  initTheme();
  setupEventListeners();
  setupAdminEventListeners();
  state.language = localStorage.getItem('lifemap_language') || 'th';
  updateLanguageUI();

  // Parse URL parameters for school event tracking
  const urlParams = new URLSearchParams(window.location.search);
  const campaignCode = urlParams.get('campaign') || urlParams.get('school');
  if (campaignCode) {
    state.campaignCode = campaignCode.trim();
    saveStateData();
  }

  checkAuthStatus();

  initCanvas();
  initWheel();
  updateDashboardUI();
  
  // Initialize LINE LIFF
  initLiff();
  
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Fade out splash screen smoothly
  const splash = document.getElementById('app-splash-screen');
  if (splash) {
    splash.style.opacity = '0';
    splash.style.visibility = 'hidden';
    setTimeout(() => {
      splash.remove();
    }, 400);
  }
}

// Initialize LINE LIFF
function initLiff() {
  if (typeof liff === 'undefined') {
    console.log("LINE LIFF SDK not loaded or unavailable.");
    const liffStatus = document.getElementById('liff-connection-status');
    if (liffStatus) {
      liffStatus.textContent = "สถานะ: ไม่พบ SDK ของ LINE LIFF (เปิดใช้งานผ่านเว็บบราวเซอร์ปกติ)";
    }
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  let liffId = urlParams.get('liffId') || localStorage.getItem('lifemap_liff_id');
  
  if (urlParams.get('liffId')) {
    localStorage.setItem('lifemap_liff_id', urlParams.get('liffId'));
  }
  
  // Default fallback demo LIFF ID for LifeMap Prototype
  if (!liffId) {
    liffId = "2010476429-j2wObuds";
  }
  
  // Pre-fill the input field in Settings if it exists
  const settingsLiffInput = document.getElementById('settings-liff-id');
  if (settingsLiffInput) {
    settingsLiffInput.value = liffId;
  }

  liff.init({ liffId: liffId })
    .then(() => {
      console.log("LINE LIFF initialized successfully with ID:", liffId);
      state.isLiff = true;
      state.liffId = liffId;
      
      const liffLoginBtn = document.getElementById('btn-liff-login');
      const liffStatus = document.getElementById('liff-connection-status');
      
      // Update UI Status in Settings
      if (liffStatus) {
        liffStatus.innerHTML = `<span style="color: var(--text-secondary); font-weight: 500;">สถานะ: เชื่อมต่อ LINE SDK สำเร็จ (LIFF ID: ${liffId})</span>`;
      }
      
      if (liff.isLoggedIn()) {
        if (liffLoginBtn) liffLoginBtn.style.display = 'none';
        
        liff.getProfile().then(profile => {
          console.log("LINE Profile loaded:", profile);
          state.lineProfile = profile;
          
          // Auto-populate name if it is Guest or empty
          if (!state.studentName || state.studentName === 'Guest' || state.studentName === 'ผู้มาเยือน') {
            state.studentName = profile.displayName;
            saveStateData();
            updateDashboardUI();
          }
          
          updateLineProfileUI(profile);
        }).catch(err => {
          console.error("Error fetching LINE profile:", err);
        });
      } else {
        // Show LINE Login button in welcome panel
        if (liffLoginBtn) {
          liffLoginBtn.style.display = 'flex';
          liffLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            liff.login();
          });
        }
        
        if (liffStatus) {
          liffStatus.innerHTML = `<span style="color: var(--text-muted);">สถานะ: ยังไม่ได้ล็อกอิน LINE (พร้อมเชื่อมต่อ)</span>`;
        }
      }
    })
    .catch((err) => {
      console.error("LINE LIFF Initialization failed:", err);
      const liffStatus = document.getElementById('liff-connection-status');
      if (liffStatus) {
        liffStatus.innerHTML = `<span style="color: var(--color-danger); font-weight: 600;">เชื่อมต่อล้มเหลว: ${err.message || err}</span>`;
      }
    });

  // Set up save button for custom LIFF ID in Settings
  const btnSaveLiffId = document.getElementById('btn-save-liff-id');
  if (btnSaveLiffId) {
    btnSaveLiffId.addEventListener('click', () => {
      const newLiffId = document.getElementById('settings-liff-id').value.trim();
      if (newLiffId) {
        localStorage.setItem('lifemap_liff_id', newLiffId);
        alert(state.language === 'en' 
          ? 'LIFF ID saved! Reloading to apply changes...' 
          : 'บันทึก LINE LIFF ID เรียบร้อยแล้ว! กำลังรีโหลดระบบเพื่อเปลี่ยนการเชื่อมต่อ...'
        );
        window.location.reload();
      } else {
        alert(state.language === 'en' ? 'Please enter a valid LIFF ID' : 'กรุณากรอก LIFF ID ที่ถูกต้อง');
      }
    });
  }
}

// Update UI elements with LINE profile photo and badge
function updateLineProfileUI(profile) {
  if (!profile) return;
  
  // 1. Sidebar Avatar
  const avatarDiv = document.querySelector('.student-profile-widget .avatar');
  if (avatarDiv && profile.pictureUrl) {
    avatarDiv.innerHTML = `<img src="${profile.pictureUrl}" alt="${profile.displayName}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 2px solid #06C755;">`;
  }
  
  // 2. Settings view status indicator
  const liffStatus = document.getElementById('liff-connection-status');
  if (liffStatus) {
    liffStatus.innerHTML = `<span style="color: #06C755; font-weight: 600; display: inline-flex; align-items: center; gap: 6px;">
      <svg viewBox="0 0 24 24" width="14" height="14" style="fill: #06C755; stroke: none; vertical-align: middle; display: inline-block;"><path d="M22 11.08c0-4.9-4.5-8.88-10-8.88S2 6.18 2 11.08c0 4.4 3.56 8.07 8.36 8.78.33.07.78.22.9.5l.27 1.63c.08.45.3.4.63.18l1.78-1.22c1.47-1.02 2.05-1.57 3.32-2.73 3.07-2.6 4.74-5.26 4.74-6.55z"></path></svg>
      เชื่อมต่อกับ LINE สำเร็จ (${profile.displayName})
    </span>`;
  }
}

// Load state from localStorage or defaults
function loadState() {
  const username = localStorage.getItem('lifemap_logged_in_user');
  let saved = null;
  if (username) {
    saved = localStorage.getItem(`lifemap_state_${username}`);
  } else {
    saved = localStorage.getItem('lifemap_state_v2');
  }
  if (saved) {
    try {
      state = { ...initialState, ...JSON.parse(saved) };
      state.checkIns = state.checkIns || [];
      state.claimedBadges = state.claimedBadges || [];
      state.bookmarks = state.bookmarks || [];
      state.growthMissions = state.growthMissions || [];
      state.consent = state.consent || { ...initialState.consent };
      state.shareWithParent = state.shareWithParent || { ...initialState.shareWithParent };
      state.unlockedItems = state.unlockedItems || [];
      return;
    } catch (e) {
      // Fallback below
    }
  }
  state = { ...initialState };
}

// Save state to localStorage
export function saveStateData() {
  const username = localStorage.getItem('lifemap_logged_in_user');
  if (username) {
    localStorage.setItem(`lifemap_state_${username}`, JSON.stringify(state));
  } else {
    localStorage.setItem('lifemap_state_v2', JSON.stringify(state));
  }
}

export function saveState() {
  saveStateData();
  updateDashboardUI();
}

// Theme Handling
function initTheme() {
  const savedTheme = 'dark-theme';
  document.documentElement.className = savedTheme;
  localStorage.setItem('lifemap_theme', savedTheme);
  updateThemeToggleIcon(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.className;
  const target = current === 'dark-theme' ? 'light-theme' : 'dark-theme';
  document.documentElement.className = target;
  localStorage.setItem('lifemap_theme', target);
  updateThemeToggleIcon(target);
}

function updateThemeToggleIcon(theme) {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;
  toggleBtn.setAttribute('title', theme === 'dark-theme' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
}

// Navigation / View Switching
export function switchView(viewName) {
  if (!state.studentName || !state.gradeLevel) {
    // Cannot leave onboarding until form submitted
    return;
  }
  
  const isParent = localStorage.getItem('lifemap_logged_in_role') === 'parent';
  if (isParent) {
    if (viewName === 'parent' || viewName === 'admin' || viewName === 'settings' || viewName === 'review') {
      return;
    }
  }
  
  localStorage.setItem('lifemap_v2_view', viewName);

  // Update navigation items active state
  document.querySelectorAll('.nav-menu .nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewName);
  });
  
  // Settings button active status
  const settingsBtn = document.getElementById('btn-settings');
  if (settingsBtn) {
    settingsBtn.classList.toggle('active', settingsBtn.dataset.view === viewName);
  }
  const headerSettingsBtn = document.getElementById('btn-header-settings');
  if (headerSettingsBtn) {
    headerSettingsBtn.classList.toggle('active', viewName === 'settings');
  }

  // Switch active panels
  document.querySelectorAll('.view-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `view-${viewName}`);
  });

  // Header Title mapping
  const headers = {
    dashboard: { title: "Dashboard", subtitle: "ยินดีต้อนรับกลับสู่เส้นทางอนาคตของคุณ" },
    "quiz-tab": { title: "Life Profile", subtitle: "ภาพสะท้อนจุดแข็ง สไตล์การเรียนรู้ และแนวโน้มอาชีพของคุณ" },
    missions: { title: "7-Day Growth Missions", subtitle: "ท้าทายภารกิจเล็ก ๆ รายวันเพื่อสะสมหลักฐานใน Future Profile" },
    review: { title: "Growth Review", subtitle: "ประเมินการพัฒนาตนเองจากการเช็คอินและบันทึกสะท้อนคิด" },
    parent: { title: "Parent Link", subtitle: "แชร์ข้อมูลและสร้างความเข้าใจในการเติบโตในครอบครัว" },
    marketplace: { title: "Opportunities", subtitle: "คัดสรรโอกาสทางวิชาการ กิจกรรม และทุนการศึกษาที่เหมาะกับคุณ" },
    references: { title: "References", subtitle: "แหล่งข้อมูลอ้างอิงทางทฤษฎีและแบบทดสอบทางจิตวิทยา" },
    settings: { title: "Settings", subtitle: "จัดการข้อมูลส่วนบุคคลและการยินยอมด้านความปลอดภัย" },
    admin: { title: "Admin Console", subtitle: "ระบบควบคุมแคมเปญโรงเรียน ติดตามสถิตินักเรียน และตั้งค่ากลางบริษัท" }
  };

  const curHeader = headers[viewName] || { title: "LifeMap", subtitle: "" };
  document.getElementById('view-title').textContent = curHeader.title;
  document.getElementById('view-subtitle').textContent = curHeader.subtitle;

  // View specific triggers
  if (viewName === 'dashboard') {
    updateDashboardUI();
  } else if (viewName === 'quiz-tab') {
    renderQuizTab();
  } else if (viewName === 'missions') {
    renderMissionsTab();
  } else if (viewName === 'review') {
    renderReviewTab();
  } else if (viewName === 'parent') {
    renderParentTab();
  } else if (viewName === 'marketplace') {
    renderMarketplaceTab();
  } else if (viewName === 'references') {
    renderReferencesTab();
  } else if (viewName === 'settings') {
    renderSettingsTab();
  } else if (viewName === 'admin') {
    updateAdminUI();
  }
}

// Calculate Self-Exploration Progress dynamically based on user progress (0 to 110 points)
export function calculateSelfExplorationProgress() {
  let pts = 0;
  if (state.studentName && state.gradeLevel) pts += 10;
  
  const completedQuiz = Object.keys(state.answers).length === quizQuestions.length;
  if (completedQuiz) pts += 20;
  
  pts += (state.checkIns || []).length * 10; // Up to 70 pts (7 missions * 10)
  if (state.claimedBadges.includes("guide")) pts += 5;
  if (state.claimedBadges.includes("parent")) pts += 5;
  
  pts = Math.min(pts, 110);
  const progressPercent = Math.round((pts / 110) * 100);
  
  return {
    percent: progressPercent,
    points: pts
  };
}

// Update Dashboard Widgets & Statistics
function updateDashboardUI() {
  const isEn = state.language === 'en';

  // Stats in sidebar
  document.getElementById('sidebar-student-name').textContent = state.studentName || (isEn ? "LifeMap Explorer" : "นักเรียน LifeMap");
  
  const gradeLabel = state.gradeLevel ? gradePersonalizationMap[state.gradeLevel].label[state.language || 'th'] : (isEn ? "G10" : "ม.4");
  document.getElementById('sidebar-grade-badge').textContent = gradeLabel;
  document.getElementById('sidebar-tokens').textContent = state.tokens;
  document.getElementById('header-tokens').textContent = state.tokens;

  // Progress calculations
  const progressVal = passCompletion();
  document.getElementById('pass-progress-text').textContent = `${progressVal}%`;
  document.getElementById('pass-progress-fill').style.width = `${progressVal}%`;

  // Dashboard views
  document.getElementById('dash-pass-name').textContent = state.studentName || (isEn ? "Explorer" : "นักเรียน");
  document.getElementById('dash-pass-grade').textContent = state.gradeLevel 
    ? (isEn 
        ? (['pvc', 'pvs', 'uni', 'work'].includes(state.gradeLevel) ? gradePersonalizationMap[state.gradeLevel].label.en : `Grade ${gradePersonalizationMap[state.gradeLevel].label.en}`) 
        : (['work'].includes(state.gradeLevel) ? `${gradePersonalizationMap[state.gradeLevel].label.th}` : `ชั้น ${gradePersonalizationMap[state.gradeLevel].label.th}`)) 
    : "";
  
  const passSchoolEl = document.getElementById('dash-pass-school');
  if (passSchoolEl) {
    passSchoolEl.textContent = state.schoolName || (isEn ? "Not Specified" : "ไม่ระบุโรงเรียน");
  }

  document.getElementById('dash-pass-campaign').textContent = state.campaignCode || "GENERAL";
  document.getElementById('dash-invite-code').textContent = state.parentInviteCode;

  // Unlocked Stamp indicator inside Future Pass Card
  const badgeSlot = document.getElementById('dash-badge-slot');
  const profile = computeProfile(state.answers);
  if (profile) {
    const archName = profile.archetype[state.language || 'th'] || profile.archetype;
    const clusterName = profile.careerClusters[0].name;
    badgeSlot.innerHTML = `
      <div class="badge-card">
        <i data-lucide="award"></i>
        <div class="badge-texts" style="display: flex; flex-direction: column; text-align: left; gap: 2px;">
          <strong style="font-size: 0.85rem; color: var(--color-accent);">${archName}</strong>
          <span style="font-size: 0.65rem; color: var(--text-secondary);">${clusterName}</span>
        </div>
      </div>
    `;
  } else {
    badgeSlot.innerHTML = `
      <div class="badge-card locked">
        <i data-lucide="lock"></i>
        <span data-i18n="dash-pass-lock-text">${isEn ? "Complete quiz to unlock badge" : "ทำแบบทดสอบเพื่อรับตราอาชีพ"}</span>
      </div>
    `;
  }

  // Action-Oriented AI Guide tip bubble
  const guideTip = document.getElementById('dash-guide-next-action');
  if (guideTip) {
    if (!profile) {
      guideTip.textContent = isEn
        ? "You have unlocked your Future Profile! The next step is to start the 6-question quiz to explore your future interests and career archetype."
        : "คุณได้ปลดล็อก Future Profile แล้ว! ก้าวถัดไปคือการเริ่มทำแบบทดสอบ 6 คำถาม เพื่อเริ่มวิเคราะห์จุดแข็งเป้าหมายหลักในอนาคตของคุณ";
    } else {
      const personalization = gradePersonalizationMap[state.gradeLevel || 'm4'];
      guideTip.textContent = personalization.nextActionText[state.language || 'th'] || personalization.nextActionText;
    }
  }

  // Dashboard Mission widget
  const missionContainer = document.getElementById('dash-mission-container');
  const currentMissions = getGrowthMissionStatus();
  if (currentMissions.currentMission) {
    const isCompleted = state.checkIns.some(c => c.missionId === currentMissions.currentMission.id);
    
    let btnText = "";
    if (isEn) {
      btnText = isCompleted ? 'View Progress' : 'Start Mission';
    } else {
      btnText = isCompleted ? 'ดูความคืบหน้า' : 'เริ่มภารกิจ';
    }

    missionContainer.innerHTML = `
      <div class="active-mission-card">
        <div class="mission-details">
          <h4>${currentMissions.currentMission.title}</h4>
          <p class="text-muted" style="font-size: 0.85rem;">${currentMissions.currentMission.description}</p>
        </div>
        <button class="btn btn-primary btn-sm" id="btn-dash-do-mission">${btnText}</button>
      </div>
    `;
    document.getElementById('btn-dash-do-mission').addEventListener('click', () => {
      currentSelectedDay = currentMissions.currentMission.day;
      switchView('missions');
    });
  } else if (profile && currentMissions.completedCount >= 7) {
    missionContainer.innerHTML = `
      <div class="active-mission-card" style="justify-content: center; text-align: center; padding: 20px;">
        <div>
          <i data-lucide="party-popper" style="color: var(--color-accent); width: 28px; height: 28px; margin-bottom: 8px;"></i>
          <h4>${isEn ? "Congratulations! All 7 days complete!" : "ยินดีด้วย! คุณทำภารกิจครบทั้ง 7 วันแล้ว"}</h4>
          <p class="text-muted" style="font-size: 0.85rem;">${isEn ? "You have fully explored your potential skills and strengths." : "คุณได้เรียนรู้จุดแข็งและทักษะของตนเองอย่างเต็มเปี่ยมแล้ว"}</p>
        </div>
      </div>
    `;
  } else {
    missionContainer.innerHTML = `
      <div class="active-mission-card">
        <div class="mission-details">
          <h4>${isEn ? "Please take the quiz" : "กรุณาทำแบบทดสอบ"}</h4>
          <p class="text-muted" style="font-size: 0.85rem;">${isEn ? "Take the short interest quiz to assign 7-day growth missions matching your profile." : "ทำแบบทดสอบความสนใจสั้น ๆ เพื่อสุ่มจัดสรรภารกิจ 7 วันที่สอดคล้องกับโปรไฟล์ของคุณ"}</p>
        </div>
        <button class="btn btn-primary btn-sm" id="btn-dash-go-quiz">${isEn ? "Take Quiz" : "ทำ Quiz"}</button>
      </div>
    `;
    document.getElementById('btn-dash-go-quiz').addEventListener('click', () => {
      switchView('quiz-tab');
    });
  }

  // Update Personal Progress Widget
  const progressData = calculateSelfExplorationProgress();
  const progressPercentEl = document.getElementById('dash-progress-percent');
  if (progressPercentEl) {
    progressPercentEl.textContent = `${progressData.percent}%`;
  }
  const progressFillEl = document.getElementById('dash-progress-fill');
  if (progressFillEl) {
    progressFillEl.style.width = `${progressData.percent}%`;
  }
  
  const progressDescEl = document.getElementById('dash-progress-desc');
  if (progressDescEl) {
    let desc = "";
    if (progressData.percent < 10) {
      desc = isEn 
        ? "Begin your self-exploration journey! Set up your profile and take the initial survey to start."
        : "เริ่มต้นการเดินทางสำรวจตนเอง! ลองตั้งค่าโปรไฟล์และทำแบบสำรวจเบื้องต้นเพื่อเริ่มต้นก้าวแรก";
    } else if (progressData.percent < 30) {
      desc = isEn
        ? "First step done! Continue with the initial survey to discover your tendencies and styles."
        : "ก้าวแรกสำเร็จแล้ว! ทำแบบสำรวจเบื้องต้นต่อเพื่อค้นหาแนวโน้มสไตล์ที่ใช่ของตัวคุณเอง";
    } else if (progressData.percent < 80) {
      desc = isEn
        ? "You're making progress! Log daily check-ins and complete missions for a deeper understanding."
        : "คุณกำลังเดินหน้าเรียนรู้! บันทึกความรู้สึกรายวันและทำภารกิจสะสมเพื่อความเข้าใจที่ลึกซึ้งยิ่งขึ้น";
    } else {
      desc = isEn
        ? "Excellent! You've completed most missions and reflections, fully uncovering your potential."
        : "เยี่ยมยอดมาก! คุณผ่านภารกิจและการสำรวจอย่างครบถ้วน ค้นพบศักยภาพและเป้าหมายของตนเองได้เต็มเปี่ยม";
    }
    progressDescEl.textContent = desc;
  }

  // Stamps list
  const stamps = isEn ? [
    { id: "consent", title: "Unlock Profile", icon: "compass" },
    { id: "campaign", title: "Campaign", icon: "qr-code" },
    { id: "quiz", title: "Quiz Done", icon: "help-circle" },
    { id: "guide", title: "AI Guide", icon: "message-circle" },
    { id: "parent", title: "Parent Link", icon: "users" },
  ] : [
    { id: "consent", title: "เริ่มสำรวจตัวเอง", icon: "compass" },
    { id: "campaign", title: "Attr Campaign", icon: "qr-code" },
    { id: "quiz", title: "ทำ Quiz ครบ", icon: "help-circle" },
    { id: "guide", title: "คุย AI Guide", icon: "message-circle" },
    { id: "parent", title: "แชร์ Parent", icon: "users" },
  ];
  
  const stampsGrid = document.getElementById('dash-stamps-grid');
  stampsGrid.innerHTML = '';
  stamps.forEach(s => {
    let unlocked = false;
    if (s.id === 'consent') unlocked = state.consent.profile && state.consent.quiz;
    else if (s.id === 'campaign') unlocked = state.campaignCode && state.campaignCode.trim().length > 0;
    else if (s.id === 'quiz') unlocked = Object.keys(state.answers).length === quizQuestions.length;
    else if (s.id === 'guide') unlocked = state.claimedBadges.includes("guide");
    else if (s.id === 'parent') unlocked = state.claimedBadges.includes("parent");

    const item = document.createElement('div');
    item.className = `stamp-item ${unlocked ? 'unlocked' : ''}`;
    item.innerHTML = `
      <div class="stamp-ring" title="${unlocked ? 'Unlocked' : 'Locked'}">
        <i data-lucide="${s.icon}"></i>
      </div>
      <span style="font-size: 0.65rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 68px;">${s.title}</span>
    `;
    stampsGrid.appendChild(item);
  });

  // Growth Review progress bar
  const completedCheckins = state.checkIns.length;
  const reviewPct = Math.min(100, Math.round((completedCheckins / 3) * 100));
  
  document.getElementById('dash-review-status-text').textContent = completedCheckins >= 3 
    ? (isEn ? "Growth Review unlocked! Access your self-development reports immediately." : "Growth Review เปิดแล้ว! เข้าดูรายงานประเมินความก้าวหน้าการเรียนรู้ได้ทันที")
    : (isEn 
        ? `Complete check-ins for ${Math.max(0, 3 - completedCheckins)} more day(s) to compile your self-development report.`
        : `บันทึกกิจกรรมเช็คอินรายวันอีก ${Math.max(0, 3 - completedCheckins)} วัน เพื่อสรุปมิติการประเมินการพัฒนาตัวเอง`);
        
  document.getElementById('dash-review-progress-fill').style.width = `${reviewPct}%`;

  // Daily Spark Check-in rendering
  const todayStr = new Date().toISOString().split('T')[0];
  if (state.lastCheckInDate && state.lastCheckInDate !== todayStr) {
    const todayDate = new Date(todayStr);
    const lastDate = new Date(state.lastCheckInDate);
    const diffDays = Math.ceil(Math.abs(todayDate - lastDate) / (1000 * 60 * 60 * 24));
    if (diffDays > 1) {
      state.streakCount = 0;
      saveStateData();
    }
  }

  const streakCountSpan = document.getElementById('dash-streak-count');
  if (streakCountSpan) {
    streakCountSpan.textContent = state.streakCount || 0;
  }

  // Visual status of streak pill (glow active)
  const streakPill = document.getElementById('dash-streak-pill');
  if (streakPill) {
    if ((state.streakCount || 0) > 0) {
      streakPill.classList.add('streak-active');
    } else {
      streakPill.classList.remove('streak-active');
    }
  }

  const emojiRow = document.getElementById('dash-emoji-row');
  const successMsg = document.getElementById('checkin-success-msg');
  const successText = document.getElementById('checkin-success-text');

  if (state.lastCheckInDate === todayStr) {
    if (emojiRow) emojiRow.style.display = 'none';
    if (successMsg) {
      successMsg.style.display = 'block';
      if (successText) {
        successText.textContent = isEn 
          ? "Daily Spark complete! +5 Tokens added to your wallet." 
          : "เช็คอินวันนี้เสร็จสิ้น! ได้รับ +5 Tokens เรียบร้อยแล้ว";
      }
    }
  } else {
    if (emojiRow) emojiRow.style.display = 'flex';
    if (successMsg) successMsg.style.display = 'none';
  }

  // Update Thinking Style Dashboard Widget
  updateDashboardThinkingStyleSnapshot();

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Calculate Future Pass Progress Percentage (DoD criteria)
export function passCompletion() {
  const profile = computeProfile(state.answers);
  const checks = [
    Boolean(state.gradeLevel && state.currentGoal.trim() && state.guideTone),
    state.consent.profile && state.consent.quiz,
    state.campaignCode.trim().length > 0,
    Object.keys(state.answers).length === quizQuestions.length,
    Boolean(profile),
    state.claimedBadges.includes("guide"),
    state.consent.parentLink
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

// Next Best Action Calculator
export function nextBestAction() {
  const completedQuiz = Object.keys(state.answers).length === quizQuestions.length;
  if (!completedQuiz) {
    return "ก้าวถัดไป: ทำแบบทดสอบความสนใจสั้น ๆ 6 ข้อเพื่อวิเคราะห์ Archetype ของคุณ";
  }
  
  const currentMissions = getGrowthMissionStatus();
  if (currentMissions.completedCount === 0) {
    return "ก้าวถัดไป: เริ่มต้นทำภารกิจท้าทายประจำวัน Day 1 เพื่อสะสมคะแนน Token ตัวแรกของคุณ";
  }
  
  if (state.checkIns.length < 3) {
    return `ก้าวถัดไป: ลงมือทำภารกิจและเช็คอินความก้าวหน้าให้ครบอย่างน้อย 3 วัน เพื่อเปิดดูรายงาน Growth Review`;
  }
  
  if (!state.claimedBadges.includes("guide")) {
    return "ก้าวถัดไป: ลองพิมพ์ถาม AI Guide ส่วนตัวเพื่อรับคำแนะนำการเรียนและการคุยกับครอบครัว";
  }
  
  if (!state.consent.parentLink) {
    return "ก้าวถัดไป: ตั้งค่าระบบ Parent Link และแชร์โปรไฟล์เพื่อแลกเปลี่ยนมุมมองการเรียนกับที่บ้าน";
  }

  return "คุณได้ทำภารกิจครบกระบวนการเรียนรู้แล้ว! ปลดล็อกกิจกรรมแนะแนวหรือค่ายฝึกอบรมต่อยอดในหน้า Opportunities";
}

// --- Onboarding Grade personalizations changes ---
function updateGradePersonalizationUI(grade) {
  const personalization = gradePersonalizationMap[grade];
  if (!personalization) return;
  
  const isEn = state.language === 'en';
  const labelText = personalization.label[state.language || 'th'];
  document.getElementById('preview-title-label').textContent = isEn 
    ? `Special focus for ${labelText}` 
    : `โฟกัสพิเศษสำหรับชั้นเรียน ${labelText}`;
    
  document.getElementById('preview-desc-label').textContent = personalization.heroSubtitle[state.language || 'th'];
  document.getElementById('preview-goal-label').textContent = personalization.goalPrompt[state.language || 'th'];
  
  // Populate dropdown options
  const goalSelect = document.getElementById('ob-goal');
  goalSelect.innerHTML = '';
  
  const optionsList = personalization.goalOptions[state.language || 'th'] || personalization.goalOptions.th;
  optionsList.forEach(opt => {
    const el = document.createElement('option');
    el.value = opt;
    el.textContent = opt;
    goalSelect.appendChild(el);
  });
}

function handleOnboardingSubmit(e) {
  e.preventDefault();
  
  const name = document.getElementById('ob-name').value;
  const school = document.getElementById('ob-school') ? document.getElementById('ob-school').value.trim() : "";
  const grade = document.querySelector('input[name="ob-grade"]:checked').value;
  const goal = document.getElementById('ob-goal').value;
  const tone = document.getElementById('ob-tone').value;
  const campaign = document.getElementById('ob-campaign').value.trim();

  // Validate Consent profile & quiz
  const profileConsent = document.getElementById('consent-profile').checked;
  const quizConsent = document.getElementById('consent-ai').checked;
  const parentConsent = document.getElementById('consent-parent').checked;

  state.studentName = name;
  state.schoolName = school;
  state.gradeLevel = grade;
  state.currentGoal = goal;
  state.guideTone = tone;
  state.campaignCode = campaign || "";
  
  state.consent.profile = profileConsent;
  state.consent.quiz = quizConsent;
  state.consent.aiGuide = quizConsent;
  state.consent.parentLink = parentConsent;

  // Initial reward for opening Future Pass
  state.tokens = 25;
  if (state.campaignCode) state.tokens += 10;
  
  // Create default missions
  state.growthMissions = buildGrowthMissions(null);

  saveState();
  
  // Transition UI
  document.getElementById('view-onboarding').classList.remove('active');
  
  const loggedInUser = localStorage.getItem('lifemap_logged_in_user');
  if (loggedInUser) {
    document.getElementById('app-sidebar').style.display = 'flex';
    document.getElementById('app-header').style.display = 'flex';
    document.querySelector('.app-container').classList.add('sidebar-visible');
    switchView('dashboard');
    alert(state.language === 'en' ? "Your Future Profile has been unlocked!" : "Future Profile ของคุณได้รับการปลดล็อกแล้ว!");
  } else {
    // Guest flow: go straight to quiz and start it!
    document.getElementById('app-sidebar').style.display = 'none';
    document.getElementById('app-header').style.display = 'none';
    document.querySelector('.app-container').classList.remove('sidebar-visible');
    document.getElementById('view-quiz-tab').classList.add('active');
    renderQuizTab();
    startQuiz();
  }
}

// --- QUIZ & PROFILE MODULE RENDERING ---
function renderQuizTab() {
  const isParent = localStorage.getItem('lifemap_logged_in_role') === 'parent';
  if (isParent && !state.shareWithParent.profile) {
    const introBox = document.getElementById('quiz-intro-container');
    const thinkingIntroBox = document.getElementById('quiz-thinking-intro-container');
    const engineBox = document.getElementById('quiz-engine-container');
    const resultBox = document.getElementById('quiz-result-container');
    
    if (introBox) introBox.style.display = 'none';
    if (thinkingIntroBox) thinkingIntroBox.style.display = 'none';
    if (engineBox) engineBox.style.display = 'none';
    if (resultBox) {
      resultBox.style.display = 'block';
      resultBox.innerHTML = `
        <div class="card p-4 text-center" style="grid-column: 1 / -1; min-height: 250px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; background: rgba(var(--color-bg-rgb), 0.5); border: 1px dashed var(--border-color); border-radius: 12px; margin-top: 20px;">
          <i data-lucide="lock" style="width: 48px; height: 48px; color: var(--text-secondary);"></i>
          <h3 style="margin-top: 12px; color: var(--text-primary);">ข้อมูลส่วนตัวถูกจำกัดการเข้าถึง</h3>
          <p class="text-muted" style="max-width: 450px;">นักเรียนยังไม่ได้เปิดสิทธิ์แชร์ Life Profile และรายงานสไตล์การคิดผ่านระบบ Parent Link</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
    }
    return;
  }

  const completedCareer = Object.keys(state.answers).length === quizQuestions.length;
  
  const introBox = document.getElementById('quiz-intro-container');
  const thinkingIntroBox = document.getElementById('quiz-thinking-intro-container');
  const engineBox = document.getElementById('quiz-engine-container');
  const resultBox = document.getElementById('quiz-result-container');

  if (!thinkingIntroBox) return; // guard

  if (completedCareer) {
    if (state.thinkingStyleCompleted === undefined) {
      introBox.style.display = 'none';
      thinkingIntroBox.style.display = 'block';
      engineBox.style.display = 'none';
      resultBox.style.display = 'none';
      
      // Reset consent checkbox and start button state
      const consentChk = document.getElementById('consent-thinking-style');
      const startThinkingBtn = document.getElementById('btn-start-thinking-quiz');
      if (consentChk) consentChk.checked = false;
      if (startThinkingBtn) startThinkingBtn.disabled = true;

      if (window.lucide) window.lucide.createIcons();
    } else {
      introBox.style.display = 'none';
      thinkingIntroBox.style.display = 'none';
      engineBox.style.display = 'none';
      resultBox.style.display = 'grid';
      renderLifeProfileUI();

      const loggedInUser = localStorage.getItem('lifemap_logged_in_user');
      const guestSaveBanner = document.getElementById('guest-save-banner');
      if (guestSaveBanner) {
        guestSaveBanner.style.display = loggedInUser ? 'none' : 'block';
      }
    }
  } else {
    introBox.style.display = 'block';
    thinkingIntroBox.style.display = 'none';
    engineBox.style.display = 'none';
    resultBox.style.display = 'none';
    
    // Personalize quiz intro based on grade
    const personalization = gradePersonalizationMap[state.gradeLevel || 'm4'];
    document.getElementById('quiz-personalized-intro').textContent = personalization.quizIntro[state.language || 'th'] || personalization.quizIntro;
  }
}

function startQuiz() {
  quizMode = 'career';
  currentQuizIdx = 0;
  state.answers = {};
  
  document.getElementById('quiz-intro-container').style.display = 'none';
  document.getElementById('quiz-thinking-intro-container').style.display = 'none';
  document.getElementById('quiz-engine-container').style.display = 'block';
  
  showQuizQuestion(0);
}

function startThinkingQuiz() {
  quizMode = 'thinking';
  currentQuizIdx = 0;
  state.thinkingStyleAnswers = {};
  
  document.getElementById('quiz-intro-container').style.display = 'none';
  document.getElementById('quiz-thinking-intro-container').style.display = 'none';
  document.getElementById('quiz-engine-container').style.display = 'block';
  
  showQuizQuestion(0);
}

function showQuizQuestion(index) {
  currentQuizIdx = index;
  const isEn = state.language === 'en';
  
  const questionNumberEl = document.getElementById('quiz-question-number');
  const progressBarEl = document.getElementById('quiz-progress-bar');
  const domainTagEl = document.getElementById('quiz-domain-tag');
  const promptEl = document.getElementById('quiz-question-prompt');
  const optionsList = document.getElementById('quiz-options-list');
  const backBtn = document.getElementById('btn-quiz-back');

  if (quizMode === 'career') {
    const question = quizQuestions[index];
    
    questionNumberEl.textContent = isEn 
      ? `Question ${index + 1} of 11` 
      : `คำถามที่ ${index + 1} จาก 11`;
      
    const pct = Math.round(((index + 1) / 11) * 100);
    progressBarEl.style.width = `${pct}%`;
    
    domainTagEl.textContent = question.domain.toUpperCase();
    promptEl.textContent = question.prompt[state.language || 'th'] || question.prompt;
    
    optionsList.innerHTML = '';

    question.options.forEach((opt, oIdx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.textContent = opt.label[state.language || 'th'] || opt.label;
      
      if (state.answers[question.id] === oIdx) {
        btn.classList.add('selected');
      }

      btn.addEventListener('click', () => {
        state.answers[question.id] = oIdx;
        btn.classList.add('selected');
        setTimeout(() => {
          if (currentQuizIdx < 10) {
            showQuizQuestion(currentQuizIdx + 1);
          } else {
            completeCareerQuiz();
          }
        }, 250);
      });

      optionsList.appendChild(btn);
    });

    if (index > 0) {
      backBtn.style.visibility = 'visible';
      backBtn.onclick = () => showQuizQuestion(index - 1);
    } else {
      backBtn.style.visibility = 'hidden';
    }
  } else {
    // Thinking Style Mode
    const question = thinkingStyleQuestions[index];
    
    questionNumberEl.textContent = isEn 
      ? `Part 2: Question ${index + 1} of 16` 
      : `ส่วนที่ 2: คำถามที่ ${index + 1} จาก 16`;
      
    const pct = Math.round(((index + 1) / 16) * 100);
    progressBarEl.style.width = `${pct}%`;
    
    domainTagEl.textContent = "THINKING STYLE";
    promptEl.textContent = question.prompt[state.language || 'th'] || question.prompt;
    
    optionsList.innerHTML = '';

    question.options.forEach((opt, oIdx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.textContent = opt.label[state.language || 'th'] || opt.label;
      
      if (state.thinkingStyleAnswers[question.id] === oIdx) {
        btn.classList.add('selected');
      }

      btn.addEventListener('click', () => {
        state.thinkingStyleAnswers[question.id] = oIdx;
        btn.classList.add('selected');
        setTimeout(() => {
          if (currentQuizIdx < 15) {
            showQuizQuestion(currentQuizIdx + 1);
          } else {
            completeThinkingStyleQuiz();
          }
        }, 250);
      });

      optionsList.appendChild(btn);
    });

    if (index > 0) {
      backBtn.style.visibility = 'visible';
      backBtn.onclick = () => showQuizQuestion(index - 1);
    } else {
      backBtn.style.visibility = 'hidden';
    }
  }
}

function completeCareerQuiz() {
  saveState();
  renderQuizTab();
}

function completeThinkingStyleQuiz() {
  state.thinkingStyleCompleted = true;
  computeThinkingStyle(state.thinkingStyleAnswers);
  completeQuiz();
}

function completeQuiz() {
  // Reward tokens for career quiz completion (50 tokens)
  state.tokens += 50;
  
  // Extra 50 tokens if they did thinking style
  if (state.thinkingStyleCompleted) {
    state.tokens += 50;
  }
  
  const profile = computeProfile(state.answers);
  state.growthMissions = buildGrowthMissions(profile);

  saveState();
  renderQuizTab();
}

function renderDetailedThinkingStyleProfile() {
  const isEn = state.language === 'en';
  const section = document.getElementById('profile-thinking-style-section');
  const container = document.getElementById('profile-thinking-detailed-content');
  if (!section || !container) return;

  const completedCareer = Object.keys(state.answers).length === quizQuestions.length;

  if (!completedCareer) {
    container.innerHTML = `
      <div style="text-align: center; padding: 24px;">
        <i data-lucide="lock" style="width: 40px; height: 40px; color: var(--text-muted); margin-bottom: 12px; display: block; margin-left: auto; margin-right: auto;"></i>
        <h4 style="color: var(--text-primary); margin-bottom: 8px;">${isEn ? "Thinking Style Report Locked" : "รายงานสไตล์การคิดถูกล็อกอยู่"}</h4>
        <p class="text-muted" style="font-size: 0.82rem; max-width: 400px; margin: 0 auto;">
          ${isEn ? "Complete the career archetype quiz (Part 1) to unlock your thinking style reflection." : "ทำแบบประเมินจุดแข็งและ Archetype ส่วนที่ 1 ให้เสร็จสิ้นก่อนเพื่อเปิดใช้การสะท้อนสไตล์การคิด"}
        </p>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  if (state.thinkingStyleCompleted === undefined) {
    container.innerHTML = `
      <div style="text-align: center; padding: 24px;">
        <i data-lucide="brain-circuit" style="width: 40px; height: 40px; color: var(--color-accent); margin-bottom: 12px; display: block; margin-left: auto; margin-right: auto;"></i>
        <h4 style="color: var(--text-primary); margin-bottom: 8px;">${isEn ? "Discover Your Thinking Style" : "ค้นพบสไตล์การคิดและวางแผนของคุณ"}</h4>
        <p class="text-muted" style="font-size: 0.82rem; max-width: 400px; margin: 0 auto 16px;">
          ${isEn ? "Take the 16-question reflection to analyze your learning and planning preferences." : "ทำแบบประเมินสะท้อนตัวตน 16 ข้อเพิ่มเติม เพื่อเรียนรู้วิธีการคิด การทำงานร่วมกัน และการจัดการภารกิจที่เหมาะกับตัวคุณ"}
        </p>
        <button class="btn btn-primary btn-sm" id="btn-profile-start-thinking" style="padding: 8px 20px; font-weight: 700;">
          ${isEn ? "Start Part 2 (16 Questions)" : "เริ่มทำส่วนที่ 2 (16 ข้อ)"}
        </button>
      </div>
    `;
    document.getElementById('btn-profile-start-thinking').addEventListener('click', () => {
      switchView('quiz-tab');
    });
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  if (state.thinkingStyleCompleted === false) {
    container.innerHTML = `
      <div style="text-align: center; padding: 24px;">
        <i data-lucide="info" class="text-muted" style="width: 40px; height: 40px; margin-bottom: 12px; display: block; margin-left: auto; margin-right: auto;"></i>
        <h4 style="color: var(--text-primary); margin-bottom: 8px;">${isEn ? "Thinking Style Reflection Skipped" : "คุณข้ามแบบสะท้อนสไตล์การคิดอยู่"}</h4>
        <p class="text-muted" style="font-size: 0.82rem; max-width: 450px; margin: 0 auto 16px;">
          ${isEn ? "You chose to skip Part 2. Taking it will provide a deep analysis of your planning styles and unlock personalized missions." : "คุณเลือกข้ามส่วนที่ 2 ไปในระหว่างทำแบบสำรวจ หากต้องการ คุณสามารถย้อนกลับมาทำเพื่อรับข้อมูลวิเคราะห์แบบเจาะลึกและสไตล์เรียนรู้ได้ทุกเมื่อ"}
        </p>
        <button class="btn btn-primary btn-sm" id="btn-profile-resume-thinking" style="padding: 8px 20px; font-weight: 700;">
          ${isEn ? "Take 16-Question Reflection" : "ทำแบบประเมิน 16 ข้อ"}
        </button>
      </div>
    `;
    document.getElementById('btn-profile-resume-thinking').addEventListener('click', () => {
      state.thinkingStyleCompleted = undefined;
      saveState();
      switchView('quiz-tab');
    });
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  const style = state.thinkingStyle;
  if (!style) return;

  const profileData = thinkingStyleProfiles[style.styleCode];
  if (!profileData) return;

  const profName = profileData.name[state.language || 'th'] || profileData.name;
  const headlineText = profileData.headline[state.language || 'th'] || profileData.headline;
  const strengthsList = profileData.strengths[state.language || 'th'] || [];
  const watchoutsList = profileData.watchouts[state.language || 'th'] || [];
  const learningMode = profileData.bestLearningMode[state.language || 'th'] || profileData.bestLearningMode;

  let html = `
    <div class="thinking-detailed-report" style="display: flex; flex-direction: column; gap: 20px;">
      <div style="background: rgba(var(--color-accent-rgb), 0.04); border: 1px solid var(--border-color); border-radius: 12px; padding: 18px; display: flex; align-items: center; gap: 14px;">
        <div style="background: rgba(var(--color-accent-rgb), 0.1); border-radius: 50%; width: 54px; height: 54px; display: flex; align-items: center; justify-content: center; color: var(--color-accent); flex-shrink: 0;">
          <i data-lucide="brain-circuit" style="width: 28px; height: 28px;"></i>
        </div>
        <div>
          <span style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600; letter-spacing: 0.05em;">
            ${isEn ? "YOUR THINKING STYLE ARCHETYPE" : "บุคลิกภาพสไตล์การคิดและวางแผนของคุณ"}
          </span>
          <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin: 2px 0;">${profName}</h3>
          <span class="badge" style="background: var(--bg-secondary); border: 1px solid var(--border-color); color: var(--text-secondary); font-size: 0.75rem; font-family: monospace; padding: 3px 8px; display: inline-block; margin-top: 4px;">
            ${isEn ? "Internal Code: " : "รหัสทางจิตวิทยาหลังบ้าน: "}${style.styleCode}
          </span>
        </div>
      </div>
      
      <p style="font-size: 0.9rem; line-height: 1.55; color: var(--text-secondary); margin: 0;">${headlineText}</p>
      
      <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; padding: 18px;">
        <h4 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 16px; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
          <i data-lucide="sliders" style="width: 16px; height: 16px; color: var(--color-accent);"></i>
          <span>${isEn ? "Analysis of 4 Core Axes" : "วิเคราะห์เจาะลึก 4 แกนแห่งตัวตน"}</span>
        </h4>
        
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div class="axis-row">
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 6px;">
              <strong style="color: ${style.axes.energy.dominant === 'I' ? 'var(--color-accent)' : 'var(--text-secondary)'};">
                ${isEn ? "Reflective Energy (I)" : "สมาธิภายใน Reflective (I)"}
              </strong>
              <span class="text-muted" style="font-size: 0.72rem; font-weight: 600;">
                ${isEn ? style.axes.energy.clarity : (style.axes.energy.clarity === 'Strong' ? 'ความชัดเจนสูงมาก' : (style.axes.energy.clarity === 'Moderate' ? 'ความชัดเจนปานกลาง' : 'สมดุลสองฝั่ง'))}
              </span>
              <strong style="color: ${style.axes.energy.dominant === 'E' ? 'var(--color-accent)' : 'var(--text-secondary)'};">
                ${isEn ? "Interactive Energy (E)" : "ชอบแลกเปลี่ยน Interactive (E)"}
              </strong>
            </div>
            <div class="slider-track" style="height: 10px; background: var(--border-color); border-radius: 5px; position: relative;">
              <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 50%; background: ${style.axes.energy.dominant === 'I' ? 'linear-gradient(to left, rgba(var(--color-accent-rgb), 0.1), var(--color-accent))' : 'transparent'}; border-radius: 5px 0 0 5px;"></div>
              <div style="position: absolute; right: 0; top: 0; bottom: 0; width: 50%; background: ${style.axes.energy.dominant === 'E' ? 'linear-gradient(to right, rgba(var(--color-accent-rgb), 0.1), var(--color-accent))' : 'transparent'}; border-radius: 0 5px 5px 0;"></div>
              <div class="slider-knob" style="position: absolute; left: ${style.axes.energy.rightPct}%; top: 50%; transform: translate(-50%, -50%); width: 16px; height: 16px; background: var(--text-primary); border: 3px solid var(--color-accent); border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.3); transition: left 0.3s ease;"></div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.72rem; margin-top: 4px; color: var(--text-muted);">
              <span>${style.axes.energy.leftPct}% (Left)</span>
              <span>${style.axes.energy.rightPct}% (Right)</span>
            </div>
          </div>

          <div class="axis-row">
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 6px;">
              <strong style="color: ${style.axes.lens.dominant === 'S' ? 'var(--color-accent)' : 'var(--text-secondary)'};">
                ${isEn ? "Practical Lens (S)" : "ขั้นตอนและข้อมูลจริง Practical (S)"}
              </strong>
              <span class="text-muted" style="font-size: 0.72rem; font-weight: 600;">
                ${isEn ? style.axes.lens.clarity : (style.axes.lens.clarity === 'Strong' ? 'ความชัดเจนสูงมาก' : (style.axes.lens.clarity === 'Moderate' ? 'ความชัดเจนปานกลาง' : 'สมดุลสองฝั่ง'))}
              </span>
              <strong style="color: ${style.axes.lens.dominant === 'N' ? 'var(--color-accent)' : 'var(--text-secondary)'};">
                ${isEn ? "Future Lens (N)" : "มองภาพใหญ่ Future (N)"}
              </strong>
            </div>
            <div class="slider-track" style="height: 10px; background: var(--border-color); border-radius: 5px; position: relative;">
              <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 50%; background: ${style.axes.lens.dominant === 'S' ? 'linear-gradient(to left, rgba(var(--color-accent-rgb), 0.1), var(--color-accent))' : 'transparent'}; border-radius: 5px 0 0 5px;"></div>
              <div style="position: absolute; right: 0; top: 0; bottom: 0; width: 50%; background: ${style.axes.lens.dominant === 'N' ? 'linear-gradient(to right, rgba(var(--color-accent-rgb), 0.1), var(--color-accent))' : 'transparent'}; border-radius: 0 5px 5px 0;"></div>
              <div class="slider-knob" style="position: absolute; left: ${style.axes.lens.rightPct}%; top: 50%; transform: translate(-50%, -50%); width: 16px; height: 16px; background: var(--text-primary); border: 3px solid var(--color-accent); border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.3); transition: left 0.3s ease;"></div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.72rem; margin-top: 4px; color: var(--text-muted);">
              <span>${style.axes.lens.leftPct}% (Left)</span>
              <span>${style.axes.lens.rightPct}% (Right)</span>
            </div>
          </div>

          <div class="axis-row">
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 6px;">
              <strong style="color: ${style.axes.decision.dominant === 'T' ? 'var(--color-accent)' : 'var(--text-secondary)'};">
                ${isEn ? "Logic Decision (T)" : "ยึดหลักตรรกะ Logic (T)"}
              </strong>
              <span class="text-muted" style="font-size: 0.72rem; font-weight: 600;">
                ${isEn ? style.axes.decision.clarity : (style.axes.decision.clarity === 'Strong' ? 'ความชัดเจนสูงมาก' : (style.axes.decision.clarity === 'Moderate' ? 'ความชัดเจนปานกลาง' : 'สมดุลสองฝั่ง'))}
              </span>
              <strong style="color: ${style.axes.decision.dominant === 'F' ? 'var(--color-accent)' : 'var(--text-secondary)'};">
                ${isEn ? "Value Decision (F)" : "รักษาน้ำใจจิตใจ Value (F)"}
              </strong>
            </div>
            <div class="slider-track" style="height: 10px; background: var(--border-color); border-radius: 5px; position: relative;">
              <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 50%; background: ${style.axes.decision.dominant === 'T' ? 'linear-gradient(to left, rgba(var(--color-accent-rgb), 0.1), var(--color-accent))' : 'transparent'}; border-radius: 5px 0 0 5px;"></div>
              <div style="position: absolute; right: 0; top: 0; bottom: 0; width: 50%; background: ${style.axes.decision.dominant === 'F' ? 'linear-gradient(to right, rgba(var(--color-accent-rgb), 0.1), var(--color-accent))' : 'transparent'}; border-radius: 0 5px 5px 0;"></div>
              <div class="slider-knob" style="position: absolute; left: ${style.axes.decision.rightPct}%; top: 50%; transform: translate(-50%, -50%); width: 16px; height: 16px; background: var(--text-primary); border: 3px solid var(--color-accent); border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.3); transition: left 0.3s ease;"></div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.72rem; margin-top: 4px; color: var(--text-muted);">
              <span>${style.axes.decision.leftPct}% (Left)</span>
              <span>${style.axes.decision.rightPct}% (Right)</span>
            </div>
          </div>

          <div class="axis-row">
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 6px;">
              <strong style="color: ${style.axes.planning.dominant === 'J' ? 'var(--color-accent)' : 'var(--text-secondary)'};">
                ${isEn ? "Structured Planner (J)" : "แผนงานเป้าหมายชัด Structured (J)"}
              </strong>
              <span class="text-muted" style="font-size: 0.72rem; font-weight: 600;">
                ${isEn ? style.axes.planning.clarity : (style.axes.planning.clarity === 'Strong' ? 'ความชัดเจนสูงมาก' : (style.axes.planning.clarity === 'Moderate' ? 'ความชัดเจนปานกลาง' : 'สมดุลสองฝั่ง'))}
              </span>
              <strong style="color: ${style.axes.planning.dominant === 'P' ? 'var(--color-accent)' : 'var(--text-secondary)'};">
                ${isEn ? "Adaptive Explorer (P)" : "พร้อมปรับตามสถานการณ์ Adaptive (P)"}
              </strong>
            </div>
            <div class="slider-track" style="height: 10px; background: var(--border-color); border-radius: 5px; position: relative;">
              <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 50%; background: ${style.axes.planning.dominant === 'J' ? 'linear-gradient(to left, rgba(var(--color-accent-rgb), 0.1), var(--color-accent))' : 'transparent'}; border-radius: 5px 0 0 5px;"></div>
              <div style="position: absolute; right: 0; top: 0; bottom: 0; width: 50%; background: ${style.axes.planning.dominant === 'P' ? 'linear-gradient(to right, rgba(var(--color-accent-rgb), 0.1), var(--color-accent))' : 'transparent'}; border-radius: 0 5px 5px 0;"></div>
              <div class="slider-knob" style="position: absolute; left: ${style.axes.planning.rightPct}%; top: 50%; transform: translate(-50%, -50%); width: 16px; height: 16px; background: var(--text-primary); border: 3px solid var(--color-accent); border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.3); transition: left 0.3s ease;"></div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.72rem; margin-top: 4px; color: var(--text-muted);">
              <span>${style.axes.planning.leftPct}% (Left)</span>
              <span>${style.axes.planning.rightPct}% (Right)</span>
            </div>
          </div>
        </div>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
        <div style="background: rgba(6, 199, 85, 0.03); border: 1px solid rgba(6, 199, 85, 0.15); border-radius: 12px; padding: 16px;">
          <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--color-success); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="check-circle-2" style="width: 18px; height: 18px;"></i>
            <span>${isEn ? "Key Strengths" : "จุดเด่นพิเศษประจำสไตล์"}</span>
          </h4>
          <ul style="font-size: 0.8rem; color: var(--text-secondary); padding-left: 18px; margin: 0; display: flex; flex-direction: column; gap: 8px; line-height: 1.45;">
            ${strengthsList.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>
        
        <div style="background: rgba(239, 68, 68, 0.03); border: 1px solid rgba(239, 68, 68, 0.15); border-radius: 12px; padding: 16px;">
          <h4 style="font-size: 0.9rem; font-weight: 700; color: #f87171; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="alert-triangle" style="width: 18px; height: 18px;"></i>
            <span>${isEn ? "Watchouts" : "สิ่งที่ควรระวังเมื่อเรียน/ทำงาน"}</span>
          </h4>
          <ul style="font-size: 0.8rem; color: var(--text-secondary); padding-left: 18px; margin: 0; display: flex; flex-direction: column; gap: 8px; line-height: 1.45;">
            ${watchoutsList.map(w => `<li>${w}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; padding: 18px;">
        <h4 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 8px; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
          <i data-lucide="book-open" style="width: 16px; height: 16px; color: var(--color-accent);"></i>
          <span>${isEn ? "Recommended Learning Mode" : "รูปแบบการเรียนรู้ที่เหมาะสมที่สุด"}</span>
        </h4>
        <p style="font-size: 0.85rem; line-height: 1.5; color: var(--text-secondary); margin: 0;">${learningMode}</p>
      </div>

      <div class="disclaimer-badge" style="background: rgba(var(--color-accent-rgb), 0.03); border: 1px solid var(--border-color); padding: 14px; border-radius: 8px; text-align: left;">
        <i data-lucide="info" style="color: var(--color-accent); flex-shrink: 0; width: 16px; height: 16px;"></i>
        <p style="font-size: 0.76rem; line-height: 1.5; color: var(--text-secondary); margin: 0;">
          <strong>${isEn ? "Privacy & Flexibility Guardrail: " : "คำชี้แจงความเป็นส่วนตัวและความยืดหยุ่น: "}</strong>
          ${isEn 
            ? "This reflection represents your tendencies today, meant for personal guidance. Thinking styles evolve as you grow and gather new life experiences. This is not a final label or limit on your potential."
            : "ผลสะท้อนนี้อิงตามคำตอบในช่วงเวลานี้เพื่อแนะแนวแนวทางปฏิบัติของตัวคุณเองเท่านั้น รูปแบบความคิดและการวางแผนของบุคคลเป็นสิ่งที่ยืดหยุ่น พัฒนา และก้าวไปข้างหน้าได้เรื่อย ๆ เมื่อเติบโตและสะสมประสบการณ์ใหม่ ๆ ไม่ใช่กรอบจำกัดหรือป้ายระบุขีดความสามารถถาวร"}
        </p>
      </div>
    </div>
  `;

  container.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();
}

function updateDashboardThinkingStyleSnapshot() {
  const isEn = state.language === 'en';
  const container = document.getElementById('dash-thinking-snapshot-container');
  if (!container) return;

  const completedCareer = Object.keys(state.answers).length === quizQuestions.length;

  if (!completedCareer) {
    container.innerHTML = `
      <div style="padding: 14px; text-align: center;">
        <i data-lucide="lock" class="text-muted" style="width: 28px; height: 28px; margin-bottom: 8px; display: block; margin-left: auto; margin-right: auto;"></i>
        <span style="font-size: 0.8rem; display: block; color: var(--text-secondary);">
          ${isEn ? "Complete Part 1 quiz to unlock" : "ทำแบบทดสอบส่วนที่ 1 เพื่อปลดล็อก"}
        </span>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  if (state.thinkingStyleCompleted === undefined) {
    container.innerHTML = `
      <div style="padding: 12px; text-align: center;">
        <i data-lucide="brain-circuit" style="width: 32px; height: 32px; color: var(--color-accent); margin-bottom: 8px; display: block; margin-left: auto; margin-right: auto;"></i>
        <strong style="font-size: 0.85rem; display: block; margin-bottom: 4px; color: var(--text-primary);">
          ${isEn ? "Thinking Style Reflection" : "สะท้อนสไตล์การคิดและวางแผน"}
        </strong>
        <p class="text-muted" style="font-size: 0.78rem; margin-bottom: 12px;">
          ${isEn ? "Analyze how you learn, decide, and plan to get personalized growth advice." : "วิเคราะห์สไตล์การเรียนรู้ การวางแผน และการตัดสินใจ เพื่อรับคำแนะนำรายบุคคล"}
        </p>
        <button class="btn btn-primary btn-sm btn-block" id="btn-dash-start-thinking-quiz" style="font-size: 0.75rem; font-weight: 700;">
          ${isEn ? "Start Part 2 (16 Questions)" : "เริ่มตอบส่วนที่ 2 (16 ข้อ)"}
        </button>
      </div>
    `;
    
    document.getElementById('btn-dash-start-thinking-quiz').addEventListener('click', () => {
      switchView('quiz-tab');
    });
  } else if (state.thinkingStyleCompleted === false) {
    container.innerHTML = `
      <div style="padding: 12px; text-align: center;">
        <i data-lucide="brain-circuit" class="text-muted" style="width: 32px; height: 32px; margin-bottom: 8px; display: block; margin-left: auto; margin-right: auto;"></i>
        <strong style="font-size: 0.85rem; display: block; margin-bottom: 4px; color: var(--text-primary);">
          ${isEn ? "Thinking Style Reflection (Skipped)" : "สไตล์การคิดและวางแผน (ข้ามอยู่)"}
        </strong>
        <p class="text-muted" style="font-size: 0.78rem; margin-bottom: 12px;">
          ${isEn ? "You skipped this part. Take it anytime to unlock full analysis and missions." : "คุณข้ามพาร์ทนี้ไป สามารถกดย้อนกลับไปทำได้ทุกเมื่อเพื่อรับคำวิเคราะห์เต็มรูปแบบและภารกิจทดลอง"}
        </p>
        <button class="btn btn-primary btn-sm btn-block" id="btn-dash-resume-thinking" style="font-size: 0.75rem; font-weight: 700;">
          ${isEn ? "Take 16-Question Reflection" : "ทำแบบประเมิน 16 ข้อ"}
        </button>
      </div>
    `;
    
    document.getElementById('btn-dash-resume-thinking').addEventListener('click', () => {
      state.thinkingStyleCompleted = undefined;
      saveState();
      switchView('quiz-tab');
    });
  } else {
    const style = state.thinkingStyle;
    if (!style) return;

    const profileData = thinkingStyleProfiles[style.styleCode];
    if (!profileData) return;

    const profName = profileData.name[state.language || 'th'] || profileData.name;
    const headlineText = profileData.headline[state.language || 'th'] || profileData.headline;

    container.innerHTML = `
      <div style="padding: 4px 0;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
          <div style="background: rgba(var(--color-accent-rgb), 0.1); border-radius: 50%; width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; color: var(--color-accent);">
            <i data-lucide="brain-circuit" style="width: 22px; height: 22px;"></i>
          </div>
          <div>
            <strong style="font-size: 0.92rem; color: var(--text-primary); display: block;">${profName}</strong>
            <span class="badge" style="background: var(--bg-secondary); border: 1px solid var(--border-color); color: var(--text-secondary); font-size: 0.7rem; font-family: monospace; padding: 2px 6px; display: inline-block; margin-top: 2px;">
              ${style.styleCode}
            </span>
          </div>
        </div>
        <p class="text-muted" style="font-size: 0.8rem; line-height: 1.45; margin-bottom: 12px;">${headlineText}</p>
        
        <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
          <div class="axis-tiny-bar">
            <div style="display: flex; justify-content: space-between; font-size: 0.68rem; margin-bottom: 2px; color: var(--text-secondary);">
              <span>${isEn ? "Reflective (I)" : "คิดคนเดียว (I)"}</span>
              <span>${style.axes.energy.leftPct}% - ${style.axes.energy.rightPct}%</span>
              <span>${isEn ? "Interactive (E)" : "คุยกับคน (E)"}</span>
            </div>
            <div class="progress-bar-sm" style="background: var(--border-color); height: 5px;">
              <div class="progress-fill" style="width: ${style.axes.energy.rightPct}%; background: var(--color-accent);"></div>
            </div>
          </div>
          <div class="axis-tiny-bar">
            <div style="display: flex; justify-content: space-between; font-size: 0.68rem; margin-bottom: 2px; color: var(--text-secondary);">
              <span>${isEn ? "Practical (S)" : "ขั้นตอนจริง (S)"}</span>
              <span>${style.axes.lens.leftPct}% - ${style.axes.lens.rightPct}%</span>
              <span>${isEn ? "Future (N)" : "มองภาพใหญ่ (N)"}</span>
            </div>
            <div class="progress-bar-sm" style="background: var(--border-color); height: 5px;">
              <div class="progress-fill" style="width: ${style.axes.lens.rightPct}%; background: var(--color-accent);"></div>
            </div>
          </div>
          <div class="axis-tiny-bar">
            <div style="display: flex; justify-content: space-between; font-size: 0.68rem; margin-bottom: 2px; color: var(--text-secondary);">
              <span>${isEn ? "Logic (T)" : "มีเหตุผล (T)"}</span>
              <span>${style.axes.decision.leftPct}% - ${style.axes.decision.rightPct}%</span>
              <span>${isEn ? "Value (F)" : "รักษาน้ำใจ (F)"}</span>
            </div>
            <div class="progress-bar-sm" style="background: var(--border-color); height: 5px;">
              <div class="progress-fill" style="width: ${style.axes.decision.rightPct}%; background: var(--color-accent);"></div>
            </div>
          </div>
          <div class="axis-tiny-bar">
            <div style="display: flex; justify-content: space-between; font-size: 0.68rem; margin-bottom: 2px; color: var(--text-secondary);">
              <span>${isEn ? "Structured (J)" : "วางแผนชัด (J)"}</span>
              <span>${style.axes.planning.leftPct}% - ${style.axes.planning.rightPct}%</span>
              <span>${isEn ? "Adaptive (P)" : "พร้อมปรับเปลี่ยน (P)"}</span>
            </div>
            <div class="progress-bar-sm" style="background: var(--border-color); height: 5px;">
              <div class="progress-fill" style="width: ${style.axes.planning.rightPct}%; background: var(--color-accent);"></div>
            </div>
          </div>
        </div>
        
        <button class="btn btn-secondary btn-sm btn-block" id="btn-dash-go-profile-thinking" style="display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 0.72rem;">
          <i data-lucide="eye" style="width: 12px; height: 12px;"></i>
          <span>${isEn ? "Read Full Thinking Style Report" : "อ่านผลลัพธ์สไตล์การคิดเต็มใบ"}</span>
        </button>
      </div>
    `;
    
    document.getElementById('btn-dash-go-profile-thinking').addEventListener('click', () => {
      switchView('quiz-tab');
      setTimeout(() => {
        const targetSection = document.getElementById('profile-thinking-style-section');
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
  }

  if (window.lucide) window.lucide.createIcons();
}

// Append a new bubble to the chat history
export function appendChatBubble(sender, text, isLoading = false) {
  const history = document.getElementById('ai-chat-history');
  if (!history) return null;

  const wrapper = document.createElement('div');
  wrapper.className = `chat-bubble-wrapper ${sender}-bubble-wrapper`;
  if (isLoading) wrapper.classList.add('loading-bubble');

  const avatar = document.createElement('div');
  avatar.className = `chat-bubble-avatar ${sender}-bubble-avatar`;
  avatar.innerHTML = sender === 'ai' ? '<i data-lucide="sparkles"></i>' : '<i data-lucide="user"></i>';

  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${sender}-bubble`;
  bubble.textContent = text;

  wrapper.appendChild(avatar);
  wrapper.appendChild(bubble);
  history.appendChild(wrapper);

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Generate a unique ID to update this specific bubble later
  const bubbleId = 'bubble-' + Date.now() + '-' + Math.round(Math.random() * 1000000).toString();
  bubble.id = bubbleId;
  
  scrollToBottom();
  return bubbleId;
}

// Scroll chat window to bottom
function scrollToBottom() {
  const windowEl = document.getElementById('ai-chat-window');
  if (windowEl) {
    windowEl.scrollTop = windowEl.scrollHeight;
  }
}

// Scroll to AI chat window and highlight it
export function scrollToChat() {
  const chatCard = document.querySelector('.ai-chat-card');
  if (chatCard) {
    chatCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    chatCard.classList.remove('highlight-pulse');
    void chatCard.offsetWidth; // Trigger reflow to restart animation
    chatCard.classList.add('highlight-pulse');
  }
}

// User helper to send a message
export function sendUserMessage(userVisibleText, aiPayload) {
  if (!userVisibleText || userVisibleText.trim() === '') return;
  
  // Append user bubble
  appendChatBubble('user', userVisibleText);
  
  // Append AI loading bubble
  const loadingBubbleId = appendChatBubble('ai', 'กำลังคิดคำแนะนำให้คุณ...', true);
  
  // Trigger API call
  triggerAiChatResponse(aiPayload, loadingBubbleId);
}

// Custom input submit handler
export function handleCustomChatSubmit() {
  const inputEl = document.getElementById('ai-chat-input');
  if (!inputEl) return;
  const message = inputEl.value.trim();
  if (message === '') return;
  
  inputEl.value = '';
  sendUserMessage(message, message);
}

function triggerAiChatResponse(promptMessage, loadingBubbleId) {
  const chatBubble = document.getElementById(loadingBubbleId);
  const lang = state.language || 'th';
  
  const apiKey = localStorage.getItem('lifemap_gemini_api_key') || 'AQ.Ab8RN6L4Y3HKnrmDGyixD9tfPnH2d_7B76_7GE3XQ5Ahc16lGA';
  console.log("DEBUG: triggerAiChatResponse - Retrieved apiKey:", apiKey ? (apiKey === 'AQ.Ab8RN6L4Y3HKnrmDGyixD9tfPnH2d_7B76_7GE3XQ5Ahc16lGA' ? "Default/Mock Key" : `User Key (length: ${apiKey.length}, starts with: ${apiKey.substring(0, 6)}...)`) : "None");
  if (apiKey) {
    const profile = computeProfile(state.answers);
    
    let thinkingStyleInfo = "";
    if (state.thinkingStyleCompleted && state.thinkingStyle) {
      const ts = state.thinkingStyle;
      const profileData = thinkingStyleProfiles[ts.styleCode];
      const profileName = profileData ? (profileData.name[lang] || profileData.name['th']) : ts.styleCode;
      
      thinkingStyleInfo = `
- Thinking Style Profile: ${profileName} (${ts.styleCode})
- Thinking Style Axes:
  * Energy: ${ts.axes.energy.dominant === 'E' ? 'Interactive' : ts.axes.energy.dominant === 'I' ? 'Reflective' : 'Balanced'} (Clarity: ${ts.axes.energy.clarity})
  * Lens: ${ts.axes.lens.dominant === 'N' ? 'Future' : ts.axes.lens.dominant === 'S' ? 'Practical' : 'Balanced'} (Clarity: ${ts.axes.lens.clarity})
  * Decision: ${ts.axes.decision.dominant === 'T' ? 'Logic-Based' : ts.axes.decision.dominant === 'F' ? 'Value-Based' : 'Balanced'} (Clarity: ${ts.axes.decision.clarity})
  * Planning: ${ts.axes.planning.dominant === 'J' ? 'Structured' : ts.axes.planning.dominant === 'P' ? 'Adaptive' : 'Balanced'} (Clarity: ${ts.axes.planning.clarity})
`;
    }

    const systemPrompt = `You are a personal AI Guide for Thai high school students on the LifeMap Future Profile platform.
The student you are advising has the following profile:
- Name: ${state.studentName || 'Student'}
- Grade Level: ${state.gradeLevel === 'm4' ? 'ม.4 / Grade 10' : state.gradeLevel === 'm5' ? 'ม.5 / Grade 11' : 'ม.6 / Grade 12'}
- Archetype: ${profile?.archetype[lang] || profile?.archetype['th'] || 'Exploration in progress'}
- strengths: ${profile?.strengths[lang]?.join(', ') || profile?.strengths['th']?.join(', ') || 'Exploration, Empathy'}${thinkingStyleInfo}
- Preferred Conversational Tone: ${state.guideTone === 'supportive' ? 'Supportive, warm, and friendly' : state.guideTone === 'analytical' ? 'Logical, analytical, and data-driven' : 'Direct, action-oriented, and concise'}

Instructions:
1. Respond STRICTLY in the active language: "${lang === 'en' ? 'English' : 'Thai'}" (highly polite, friendly, and suitable for high school students).
2. Keep the answer extremely concise, helpful, and direct (around 3-4 sentences maximum).
3. Align your tone strictly with the preferred conversational tone style chosen by the student.
4. Incorporate the student's thinking style (e.g. prompt structured steps if Structured J, offer open alternatives if Adaptive P, or suggest discussing with others if Interactive E, etc.) into your advice dynamically. Avoid using MBTI letter codes in conversation. Always speak in supportive, non-permanent terms.

Student Inquiry: "${promptMessage}"`;

    fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: systemPrompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048
        }
      })
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(errData => {
          throw new Error(errData?.error?.message || `API HTTP error: ${res.status}`);
        }).catch(() => {
          throw new Error(`API HTTP error: ${res.status}`);
        });
      }
      return res.json();
    })
    .then(data => {
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        let prefix = "";
        if (state.guideTone === 'analytical') {
          prefix = "⭐ [AI Analytical Guide] ";
        } else if (state.guideTone === 'direct') {
          prefix = "⚡ [AI Action Guide] ";
        } else {
          prefix = "🌱 [AI Supportive Guide] ";
        }
        if (chatBubble) {
          chatBubble.textContent = prefix + text.trim();
          const wrapper = chatBubble.closest('.chat-bubble-wrapper');
          if (wrapper) wrapper.classList.remove('loading-bubble');
        }
        claimGuideBadge();
        scrollToBottom();
      } else {
        throw new Error("No response text");
      }
    })
    .catch(err => {
      console.error("Gemini API Error:", err);
      const isDefaultKey = (apiKey === 'AQ.Ab8RN6L4Y3HKnrmDGyixD9tfPnH2d_7B76_7GE3XQ5Ahc16lGA' || !apiKey);
      if (!isDefaultKey) {
        if (chatBubble) {
          chatBubble.textContent = `❌ [Gemini API Error]: ${err.message}`;
          const wrapper = chatBubble.closest('.chat-bubble-wrapper');
          if (wrapper) wrapper.classList.remove('loading-bubble');
        }
      } else {
        fallbackMockResponse(promptMessage, chatBubble);
      }
    });
  } else {
    fallbackMockResponse(promptMessage, chatBubble);
  }
}

function claimGuideBadge() {
  if (!state.claimedBadges.includes("guide")) {
    state.claimedBadges.push("guide");
    state.tokens += 20; // reward
    saveState();
  }
}

function fallbackMockResponse(promptMessage, chatBubble) {
  setTimeout(() => {
    const lang = state.language || 'th';
    let answer = "";
    
    if (lang === 'en') {
      if (promptMessage.includes("Archetype") || promptMessage.includes("archetype")) {
        answer = `Based on your profile, your strengths align with ${state.guideTone === 'supportive' ? 'exploration guidance' : 'structured management'}. We recommend focusing on practical skill training or seminars to build your portfolio.`;
      } else if (promptMessage.includes("project") || promptMessage.includes("Project") || promptMessage.includes("โครงงาน")) {
        answer = "We recommend an integrated project, such as building a model (Prototype) or conducting a small group interview, which will highly demonstrate Exploration & Skill Growth.";
      } else {
        answer = "To discuss with your family: show them your Life Profile strengths, highlight your natural strengths and learning styles, and explain how the 7-Day Missions help you validate options.";
      }
    } else {
      if (promptMessage.includes("Archetype") || promptMessage.includes("archetype") || promptMessage.includes("จุดแข็ง")) {
        answer = `จากข้อมูลคำตอบของคุณ คุณเป็นคนที่มีแนวคิดตรงกับกลุ่ม ${state.guideTone === 'supportive' ? 'ผู้นำทางการสำรวจ' : 'ผู้เชี่ยวชาญการจัดสรร'} จุดแข็งด้านการสื่อสารและการทำจริงจะนำมาใช้ควบคู่กัน แนะนำให้เริ่มมองหาวิชาชมรมหรือค่ายสัมมนาด้านทักษะปฏิบัติเป็นสำคัญครับ/ค่ะ`;
      } else if (promptMessage.includes("โครงงาน") || promptMessage.includes("project")) {
        answer = "แนะนำโครงงานแบบบูรณาการ เช่น ทำแบบจำลอง (Prototype) หรือจัดกิจกรรมกลุ่มสัมมนาสัมภาษณ์ผู้ปกครอง ซึ่งจะช่วยสะท้อน Exploration & Skill Growth ได้สูง";
      } else {
        answer = "สไตล์การคุยกับครอบครัว: นำคะแนน Life Profile นี้ไปให้ท่านดู ชี้ชวนให้เห็นจุดแข็งและสไตล์การเรียนรู้ที่คุณถนัด และคุยกันถึงความสนใจที่จะทดลองภารกิจ 7 วัน เพื่อเป็นบททดสอบเบื้องต้น";
      }
    }

    let prefix = "";
    if (state.guideTone === 'analytical') {
      prefix = lang === 'en' ? "[AI Analytical Guide] (Simulated) " : "⭐ [AI Analytical Guide] (จำลอง) ";
    } else if (state.guideTone === 'direct') {
      prefix = lang === 'en' ? "[AI Action Guide] (Simulated) " : "⚡ [AI Action Guide] (จำลอง) ";
    } else {
      prefix = lang === 'en' ? "[AI Supportive Guide] (Simulated) " : "🌱 [AI Supportive Guide] (จำลอง) ";
    }

    if (chatBubble) {
      chatBubble.textContent = prefix + answer;
      const wrapper = chatBubble.closest('.chat-bubble-wrapper');
      if (wrapper) wrapper.classList.remove('loading-bubble');
    }
    claimGuideBadge();
    scrollToBottom();
  }, 1000);
}

export function computeThinkingStyle(answers) {
  if (!answers || Object.keys(answers).length < 16) return null;

  let eCount = 0, iCount = 0;
  let sCount = 0, nCount = 0;
  let tCount = 0, fCount = 0;
  let jCount = 0, pCount = 0;

  // ts_q1 to ts_q4: Energy Style
  for (let i = 1; i <= 4; i++) {
    const val = answers[`ts_q${i}`];
    if (val === "E") eCount++;
    else if (val === "I") iCount++;
    else {
      // index check fallback
      const question = thinkingStyleQuestions[i - 1];
      const optVal = question.options[val]?.value;
      if (optVal === "E") eCount++;
      else iCount++;
    }
  }

  // ts_q5 to ts_q8: Thinking Lens
  for (let i = 5; i <= 8; i++) {
    const val = answers[`ts_q${i}`];
    if (val === "N") nCount++;
    else if (val === "S") sCount++;
    else {
      const question = thinkingStyleQuestions[i - 1];
      const optVal = question.options[val]?.value;
      if (optVal === "N") nCount++;
      else sCount++;
    }
  }

  // ts_q9 to ts_q12: Decision Style
  for (let i = 9; i <= 12; i++) {
    const val = answers[`ts_q${i}`];
    if (val === "F") fCount++;
    else if (val === "T") tCount++;
    else {
      const question = thinkingStyleQuestions[i - 1];
      const optVal = question.options[val]?.value;
      if (optVal === "F") fCount++;
      else tCount++;
    }
  }

  // ts_q13 to ts_q16: Planning Style
  for (let i = 13; i <= 16; i++) {
    const val = answers[`ts_q${i}`];
    if (val === "P") pCount++;
    else if (val === "J") jCount++;
    else {
      const question = thinkingStyleQuestions[i - 1];
      const optVal = question.options[val]?.value;
      if (optVal === "P") pCount++;
      else jCount++;
    }
  }

  const energyDominant = eCount > iCount ? 'E' : (iCount > eCount ? 'I' : 'I'); // default to I
  const lensDominant = nCount > sCount ? 'N' : (sCount > nCount ? 'S' : 'S'); // default to S
  const decisionDominant = tCount > fCount ? 'T' : (fCount > tCount ? 'F' : 'T'); // default to T
  const planningDominant = jCount > pCount ? 'J' : (pCount > jCount ? 'P' : 'J'); // default to J

  const styleCode = `${energyDominant}${lensDominant}${decisionDominant}${planningDominant}`;

  const getClarity = (right, left) => {
    if (right === 4 || left === 4) return 'Strong';
    if (right === 3 || left === 3) return 'Moderate';
    return 'Balanced';
  };

  const result = {
    styleCode: styleCode,
    axes: {
      energy: { dominant: eCount > iCount ? 'E' : (iCount > eCount ? 'I' : 'Balanced'), leftCount: iCount, rightCount: eCount, leftPct: iCount * 25, rightPct: eCount * 25, clarity: getClarity(eCount, iCount) },
      lens: { dominant: nCount > sCount ? 'N' : (sCount > nCount ? 'S' : 'Balanced'), leftCount: sCount, rightCount: nCount, leftPct: sCount * 25, rightPct: nCount * 25, clarity: getClarity(nCount, sCount) },
      decision: { dominant: tCount > fCount ? 'T' : (fCount > tCount ? 'F' : 'Balanced'), leftCount: tCount, rightCount: fCount, leftPct: tCount * 25, rightPct: fCount * 25, clarity: getClarity(fCount, tCount) },
      planning: { dominant: jCount > pCount ? 'J' : (pCount > jCount ? 'P' : 'Balanced'), leftCount: jCount, rightCount: pCount, leftPct: jCount * 25, rightPct: pCount * 25, clarity: getClarity(pCount, jCount) }
    }
  };

  state.thinkingStyle = result;
  return result;
}

// Compute profiles from answers (deterministic RIASEC / Big Five Inspired Scoring)
export function computeProfile(answers) {
  if (Object.keys(answers).length < quizQuestions.length) return null;

  const rawClusters = { creator: 0, builder: 0, analyst: 0, helper: 0, entrepreneur: 1 };
  const rawRiasec = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  const rawBigFive = { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, emotional_regulation: 0 };

  quizQuestions.forEach(q => {
    const ansIdx = answers[q.id];
    const option = q.options[ansIdx];
    if (option) {
      rawClusters[option.cluster] += option.value;
      rawRiasec[option.riasec] += option.value;
      rawBigFive[option.bigFive] += option.value;
      if (option.riasec === "E" || q.domain === "career") rawClusters.entrepreneur += 1;
    }
  });

  const createScoreRows = (scores, labels) =>
    Object.entries(scores)
      .map(([id, score]) => ({ id, name: labels[id][state.language || 'th'], score: Number(score) }))
      .sort((a, b) => b.score - a.score);

  const careerClusters = createScoreRows(rawClusters, clusterLabels);
  const riasecScores = createScoreRows(rawRiasec, riasecLabels);
  const bigFiveScores = createScoreRows(rawBigFive, bigFiveLabels);
  
  const top = careerClusters[0];
  const topRiasec = riasecScores[0];
  const topBigFive = bigFiveScores[0];

  const archetypeMap = {
    creator: {
      archetype: { th: "Creative Story Builder", en: "Creative Story Builder" },
      headline: {
        th: `แนวโน้มเด่นของคุณสอดคล้องกับ ${topRiasec.name} และสะท้อนคุณลักษณะ ${topBigFive.name}`,
        en: `Your prominent trend aligns with ${topRiasec.name} and reflects ${topBigFive.name}`
      },
      strengths: {
        th: ["สื่อสารภาพใหญ่", "สร้างสรรค์คอนเทนต์", "เชื่อมโยงผู้คนกับไอเดีย"],
        en: ["High-level communication", "Creative content creation", "Connecting people with ideas"]
      },
      learningStyle: {
        th: "เรียนรู้ดีที่สุดผ่านภาพ ตัวอย่างจริง และการทำชิ้นงานที่สะท้อนตัวตน",
        en: "Learns best through visuals, real examples, and making self-reflective artifacts"
      },
      wellbeingNote: {
        th: "ควรตั้งกรอบเวลาชัดเจนเพื่อไม่ให้ไอเดียจำนวนมากทำให้รู้สึกกระจัดกระจายล้นมือ",
        en: "Set clear timeboxes so abundant ideas do not leave you feeling scattered or overwhelmed."
      },
      nextMoves: {
        th: ["ทำ portfolio 1 ชิ้นจากเรื่องที่สนใจ", "ลองเข้าคอร์ส design thinking", "ฝึกเล่าโปรเจกต์ภายใน 90 วินาที"],
        en: ["Create 1 portfolio piece from a topic of interest", "Try a design thinking course", "Practice pitching a project in 90 seconds"]
      },
    },
    builder: {
      archetype: { th: "Practical Builder", en: "Practical Builder" },
      headline: {
        th: `แนวโน้มเด่นของคุณสอดคล้องกับ ${topRiasec.name} และสะท้อนคุณลักษณะ ${topBigFive.name}`,
        en: `Your prominent trend aligns with ${topRiasec.name} and reflects ${topBigFive.name}`
      },
      strengths: {
        th: ["ลงมือทำเร็ว", "แก้ปัญหาเป็นระบบ", "ไม่กลัวการทดลองสิ่งแปลกใหม่"],
        en: ["Fast execution", "Systematic problem-solving", "Unafraid of exploring new things"]
      },
      learningStyle: {
        th: "เรียนรู้ดีที่สุดจากโจทย์จริง project-based learning และ feedback loop สั้น ๆ",
        en: "Learns best from real challenges, project-based learning, and short feedback loops"
      },
      wellbeingNote: {
        th: "ควรพักเป็นรอบและแบ่งเป้าหมายใหญ่เป็นเป้าหมายย่อยเพื่อเลี่ยงสภาวะหมดไฟ (Burnout)",
        en: "Take regular breaks and break large goals into small steps to avoid burnout."
      },
      nextMoves: {
        th: ["สร้างต้นแบบจำลอง (Prototype) ใน 7 วัน", "เก็บหลักฐานผลงานลงแฟ้มสะสมผลงาน", "จับคู่เมนเตอร์สายวิศวกรรม/เทค"],
        en: ["Build a simple prototype in 7 days", "Save project evidence into your portfolio", "Match with engineering/tech mentors"]
      },
    },
    analyst: {
      archetype: { th: "Insight Navigator", en: "Insight Navigator" },
      headline: {
        th: `แนวโน้มเด่นของคุณสอดคล้องกับ ${topRiasec.name} และสะท้อนคุณลักษณะ ${topBigFive.name}`,
        en: `Your prominent trend aligns with ${topRiasec.name} and reflects ${topBigFive.name}`
      },
      strengths: {
        th: ["คิดวิเคราะห์เป็นระบบ", "จับวิสัยทัศน์จากข้อมูลและ pattern", "ประเมินทางเลือกอย่างรอบคอบ"],
        en: ["Analytical thinking", "Spotting trends in data & patterns", "Pragmatically evaluating options"]
      },
      learningStyle: {
        th: "เรียนรู้ดีที่สุดผ่านตารางเปรียบเทียบ โจทย์วิเคราะห์ และสรุปเป็น framework ชัดเจน",
        en: "Learns best through comparison tables, analytical tasks, and clear frameworks"
      },
      wellbeingNote: {
        th: "ควรตั้งกรอบเวลาตัดสินใจเพื่อไม่ให้การวิเคราะห์นานเกินไปจนเสียโอกาสลงมือทำจริง",
        en: "Set decision deadlines to prevent over-analyzing and missing opportunities to act."
      },
      nextMoves: {
        th: ["ลองทำ data challenge ขนาดย่อม", "ทำตารางเปรียบเทียบคณะและทางเลือกอาชีพ", "ฝึกเทคนิคเล่าเรื่องให้น่าสนใจจากตัวเลข"],
        en: ["Try a mini data challenge", "Create a majors and careers comparison table", "Practice storytelling using numbers"]
      },
    },
    helper: {
      archetype: { th: "Human-Centered Helper", en: "Human-Centered Helper" },
      headline: {
        th: `แนวโน้มเด่นของคุณสอดคล้องกับ ${topRiasec.name} และสะท้อนคุณลักษณะ ${topBigFive.name}`,
        en: `Your prominent trend aligns with ${topRiasec.name} and reflects ${topBigFive.name}`
      },
      strengths: {
        th: ["รับรู้และเข้าใจผู้อื่นได้ดี", "ประสานงานในทีม", "มองเห็นแกนปัญหาจากผู้ใช้จริง"],
        en: ["Great empathy & understanding", "Team coordination", "Identifying core user needs"]
      },
      learningStyle: {
        th: "เรียนรู้ดีที่สุดผ่านบทสนทนา case study และกิจกรรมบริการแนะแนวสังคม",
        en: "Learns best through discussions, case studies, and social guidance/volunteering"
      },
      wellbeingNote: {
        th: "ควรกำหนดขอบเขตการช่วยเหลือแบ่งปัน เพื่อดูแลรักษาสุขภาพใจของตนเองควบคู่กัน",
        en: "Set personal boundaries in helping others to take care of your own mental wellbeing."
      },
      nextMoves: {
        th: ["ทำกิจกรรมแนะแนวอาสาหรือเพื่อนช่วยเรียน", "ชวนคุยกับบุคคลในวิชาชีพสาธารณสุข/การศึกษา", "จดบันทึกความรู้สึกสะท้อนคิดหลังช่วยงานทีม"],
        en: ["Participate in peer tutoring or guidance volunteering", "Interview someone in healthcare/education", "Keep a reflection journal after helping teams"]
      },
    },
    entrepreneur: {
      archetype: { th: "Opportunity Designer", en: "Opportunity Designer" },
      headline: {
        th: `แนวโน้มเด่นของคุณสอดคล้องกับ ${topRiasec.name} และสะท้อนคุณลักษณะ ${topBigFive.name}`,
        en: `Your prominent trend aligns with ${topRiasec.name} and reflects ${topBigFive.name}`
      },
      strengths: {
        th: ["ประเมินความต้องการตลาด", "วางแผนเชิงกลยุทธ์เชิงรุก", "รวบรวมทรัพยากรรอบข้าง"],
        en: ["Market demand estimation", "Proactive strategic planning", "Gathering resources around them"]
      },
      learningStyle: {
        th: "เรียนรู้ดีที่สุดผ่านการวิเคราะห์โจทย์ธุรกิจจริง การลงสนามสำรวจผู้ใช้ และการวัดสถิติ",
        en: "Learns best through real business cases, user interviews, and statistical tracking"
      },
      wellbeingNote: {
        th: "ควรตั้งกรอบการแยกไอเดียความฝันกับกระบวนการย่อยที่ลงมือทำจริงได้ในสัปดาห์นี้",
        en: "Distinguish big vision ideas from actionable steps you can complete this week."
      },
      nextMoves: {
        th: ["สัมภาษณ์หาปัญหาจากผู้ใช้จริง 5 คน", "ออกแบบโครงร่างเว็บ Landing Concept ปลอดภัย", "ฝึกนำเสนอเสนอไอเดียปากเปล่าใน 3 นาที"],
        en: ["Interview 5 real users about their problems", "Design a safe concept landing page mockup", "Practice a 3-minute verbal elevator pitch"]
      },
    },
  };

  const topId = top.id;
  const data = archetypeMap[topId] || archetypeMap.creator;
  
  return {
    ...data,
    careerClusters,
    riasecScores,
    topRiasec,
    bigFiveScores,
    topBigFive,
    frameworkNote: {
      th: "ผลประเมินนี้เป็น reflection สะท้อนคิดประกอบการวางแผนชีวิตเบื้องต้น ไม่ใช่แบบประเมินวินิจฉัยทางการแพทย์หรือจิตแพทย์",
      en: "This assessment serves as a reflection to help guide initial life planning; it is not a medical or clinical diagnosis."
    },
  };
}

// Generate 7-Day Growth Missions based on Archetype
export function buildGrowthMissions(profile) {
  const cluster = profile?.careerClusters[0]?.id ?? "creator";
  const focus = clusterMissionFocus[cluster] || clusterMissionFocus.creator;
  const lang = state.language || "th";

  const ts = state.thinkingStyle;
  const energyStyle = ts?.axes?.energy?.dominant; // 'E' or 'I'
  const planningStyle = ts?.axes?.planning?.dominant; // 'J' or 'P'

  if (lang === "en") {
    const theme = focus.theme.en;
    const people = focus.people.en;
    const artifact = focus.artifact.en;

    let day3Desc = `Talk to or read about the profile of ${people} and record a key insight.`;
    let day3Evidence = `Summarize 1 key lesson or perspective you gained from observing this career.`;
    if (energyStyle === 'E') {
      day3Desc = `Have an interactive coffee chat or video call with ${people} (or a senior in a similar field) to discuss their experiences.`;
      day3Evidence = `Summarize 1 key lesson or perspective from your conversation.`;
    } else if (energyStyle === 'I') {
      day3Desc = `Send written questions to ${people} (or a senior) via chat/email, or read/watch a deep interview about their journey.`;
      day3Evidence = `Summarize 1 key lesson or perspective from your reading or written interview.`;
    }

    let day5Desc = `Show your prototype to a counselor, friend, or trusted person and request 1 piece of feedback to improve.`;
    if (energyStyle === 'E') {
      day5Desc = `Present your prototype to a small group of friends or a mentor, and run a short discussion to gather feedback.`;
    } else if (energyStyle === 'I') {
      day5Desc = `Share a photo/link of your prototype privately via chat or email with a trusted person, asking for written feedback.`;
    }

    let day7Desc = `Summarize your learnings over the past 7 days and write down a plan to explore a new micro-goal next week.`;
    if (planningStyle === 'J') {
      day7Desc = `Summarize your learnings and create a structured timeline with concrete deadlines for your next goal next week.`;
    } else if (planningStyle === 'P') {
      day7Desc = `Summarize your learnings and draft 2-3 flexible alternative pathways to explore, leaving room to adapt.`;
    }

    return [
      {
        id: `growth-${cluster}-day-1`,
        day: 1,
        title: "Day 1 — Select topic to explore",
        description: `Select 1 topic on ${theme} and write why it interests you most right now.`,
        focusDimension: "exploration",
        cluster,
        skillTags: [focus.skill.en || focus.skill, "self-awareness"],
        durationDays: 1,
        evidencePrompt: "Note the chosen topic and a brief 1-2 sentence reason.",
        checkInPrompt: "Did you notice anything new about yourself from the topic you chose today?",
      },
      {
        id: `growth-${cluster}-day-2`,
        day: 2,
        title: "Day 2 — Gather resources",
        description: `Find at least 2 sources of information related to ${theme} and take open-minded notes.`,
        focusDimension: "exploration",
        cluster,
        skillTags: ["research", focus.skill.en || focus.skill],
        durationDays: 1,
        evidencePrompt: "Write details or paste links to the learning resources you discovered.",
        checkInPrompt: "Which piece of information from your search sparked the most curiosity to learn more?",
      },
      {
        id: `growth-${cluster}-day-3`,
        day: 3,
        title: "Day 3 — Interview a mentor/practitioner",
        description: day3Desc,
        focusDimension: "reflection",
        cluster,
        skillTags: ["communication", "reflection"],
        durationDays: 1,
        evidencePrompt: day3Evidence,
        checkInPrompt: "How does this person's story or advice connect to the path you are interested in?",
      },
      {
        id: `growth-${cluster}-day-4`,
        day: 4,
        title: "Day 4 — Create a micro-prototype",
        description: `Create ${artifact} in its simplest form to bring your paper goals to reality.`,
        focusDimension: "action",
        cluster,
        skillTags: [focus.skill.en || focus.skill, "execution"],
        durationDays: 1,
        evidencePrompt: "Note down the details of your creation or the first-stage outcome.",
        checkInPrompt: "While building it, what went smoothly and which part challenged you?",
      },
      {
        id: `growth-${cluster}-day-5`,
        day: 5,
        title: "Day 5 — Gather feedback",
        description: day5Desc,
        focusDimension: "skill_growth",
        cluster,
        skillTags: ["feedback", focus.skill.en || focus.skill],
        durationDays: 1,
        evidencePrompt: "Write down the feedback/recommendation you received for further improvement.",
        checkInPrompt: "Which piece of feedback reflected a strength in you that you might have overlooked?",
      },
      {
        id: `growth-${cluster}-day-6`,
        day: 6,
        title: "Day 6 — Improve and iterate",
        description: "Use the feedback to improve and refine your prototype for a second minor iteration, showing clear progress.",
        focusDimension: "skill_growth",
        cluster,
        skillTags: ["iteration", focus.skill.en || focus.skill],
        durationDays: 1,
        evidencePrompt: "Summarize the changes between your first version and the new result (Before/After).",
        checkInPrompt: "How does this iteration make you feel proud or reflect your problem-solving skills?",
      },
      {
        id: `growth-${cluster}-day-7`,
        day: 7,
        title: "Day 7 — Reflect and plan next steps",
        description: day7Desc,
        focusDimension: "future_clarity",
        cluster,
        skillTags: ["planning", "future-readiness"],
        durationDays: 1,
        evidencePrompt: "Summarize 1 micro-project you want to try next week.",
        checkInPrompt: "After this 7-day journey, in what dimensions have you gained the most inspiration or clarity?",
      },
    ];
  } else {
    // Thai defaults
    const theme = focus.theme.th;
    const people = focus.people.th;
    const artifact = focus.artifact.th;

    let day3Desc = `ลองชวนพูดคุยหรืออ่านประวัติของ ${people} แล้วบันทึกข้อมูลเชิงลึก (Insight) หลักที่น่าสนใจ`;
    let day3Evidence = `สรุปสิ่งที่เรียนรู้หรือมุมมองที่ได้จากการสังเกตวิชาชีพนี้มา 1 ข้อ`;
    if (energyStyle === 'E') {
      day3Desc = `ลองโทรคุย นัดดื่มเครื่องดื่มพูดคุยแลกเปลี่ยน หรือวิดีโอคอลสั้น ๆ กับ ${people} (หรือรุ่นพี่ในสายงานใกล้เคียง) เพื่อถามไถ่ประสบการณ์`;
      day3Evidence = `สรุปสิ่งสำคัญ 1 ข้อที่คุณได้จากการสนทนาแลกเปลี่ยนครั้งนี้`;
    } else if (energyStyle === 'I') {
      day3Desc = `ส่งคำถามทิ้งไว้ทางแชท/อีเมลถึง ${people} หรือเลือกศึกษาประวัติ/อ่านบทสัมภาษณ์เชิงลึกของรุ่นพี่ในสายงานดังกล่าวเพื่อเก็บข้อมูลอย่างเงียบสงบ`;
      day3Evidence = `สรุปสิ่งสำคัญ 1 ข้อที่ได้จากการอ่าน/บทสัมภาษณ์เชิงลึกครั้งนี้`;
    }

    let day5Desc = `นำชิ้นงานใน Day 4 ไปทดลองให้ครูแนะแนว เพื่อนสนิท หรือคนที่ไว้ใจดู และขอข้อเสนอแนะ 1 ข้อมาปรับปรุง`;
    if (energyStyle === 'E') {
      day5Desc = `นำผลงานทดลองไปพูดคุยหรือนำเสนอในกลุ่มเพื่อน/ครูแนะแนว เพื่อระดมความคิดเห็นและรับฟังข้อคิดเห็นแบบสดใหม่`;
    } else if (energyStyle === 'I') {
      day5Desc = `ส่งภาพถ่าย/ลิงก์ผลงานการทดลองของคุณแบบส่วนตัวทางแชทให้กับบุคคลที่คุณไว้วางใจ และขอคำแนะนำแบบเป็นลายลักษณ์อักษร`;
    }

    let day7Desc = `รวบรวมสิ่งที่ได้เรียนรู้ตลอดทั้ง 7 วัน และเขียนสะท้อนแผนการลองเป้าหมายย่อยชิ้นใหม่เพื่อก้าวต่อไปในสัปดาห์หน้า`;
    if (planningStyle === 'J') {
      day7Desc = `รวบรวมสิ่งที่ได้เรียนรู้ และสร้างแผนปฏิบัติงานย่อยที่มีกำหนดเวลา (Timeline) และขั้นตอนเช็คลิสต์ชัดเจนสำหรับเป้าหมายในสัปดาห์หน้า`;
    } else if (planningStyle === 'P') {
      day7Desc = `รวบรวมสิ่งที่ได้เรียนรู้ และร่างแผนงานยืดหยุ่น 2-3 ทางเลือกที่คุณสามารถปรับเปลี่ยนได้ตามความเหมาะสมและสถานการณ์ในสัปดาห์หน้า`;
    }

    return [
      {
        id: `growth-${cluster}-day-1`,
        day: 1,
        title: "Day 1 — เลือกเรื่องที่อยากสำรวจ",
        description: `เลือก ${theme} 1 เรื่อง แล้วเขียนบันทึกว่าทำไมเรื่องนี้ถึงดึงดูดใจคุณมากที่สุดในช่วงเวลานี้`,
        focusDimension: "exploration",
        cluster,
        skillTags: [focus.skill.th || focus.skill, "self-awareness"],
        durationDays: 1,
        evidencePrompt: "บันทึกหัวข้อเป้าหมายที่คุณเลือกและเหตุผลสั้น ๆ 1–2 ประโยค",
        checkInPrompt: "วันนี้คุณเริ่มสังเกตเห็นอะไรในตัวเองจากหัวข้อที่เลือกบ้างหรือไม่",
      },
      {
        id: `growth-${cluster}-day-2`,
        day: 2,
        title: "Day 2 — รวบรวมข้อมูลแหล่งความรู้",
        description: `สืบค้นแหล่งข้อมูลที่เกี่ยวข้องอย่างน้อย 2 แหล่งเกี่ยวกับ ${theme} โดยทำหน้าที่จดบันทึกรวบรวมแบบเปิดใจกว้าง`,
        focusDimension: "exploration",
        cluster,
        skillTags: ["research", focus.skill.th || focus.skill],
        durationDays: 1,
        evidencePrompt: "จดรายละเอียดหัวข้อหรือระบุลิงก์แหล่งความรู้ที่คุณค้นพบ",
        checkInPrompt: "ข้อมูลใดจากการค้นคว้าที่สร้างแรงกระตุ้นให้อยากศึกษาต่อมากที่สุด",
      },
      {
        id: `growth-${cluster}-day-3`,
        day: 3,
        title: "Day 3 — สัมภาษณ์พูดคุยกับรุ่นพี่/ผู้รู้",
        description: day3Desc,
        focusDimension: "reflection",
        cluster,
        skillTags: ["communication", "reflection"],
        durationDays: 1,
        evidencePrompt: day3Evidence,
        checkInPrompt: "เรื่องเล่าหรือสิ่งที่คุยเชื่อมโยงกับทิศทางเป้าหมายที่คุณชอบอย่างไรบ้าง",
      },
      {
        id: `growth-${cluster}-day-4`,
        day: 4,
        title: "Day 4 — ทดลองลงมือทำสิ่งประดิษฐ์เล็ก",
        description: `ลงมือทดลองทำและสร้าง ${artifact} แบบง่ายที่สุดเพื่อเปลี่ยนเป้าหมายในกระดาษเป็นความจริง`,
        focusDimension: "action",
        cluster,
        skillTags: [focus.skill.th || focus.skill, "execution"],
        durationDays: 1,
        evidencePrompt: "บันทึกรายละเอียดของชิ้นงานหรือผลลัพธ์การสร้างชิ้นงานขั้นแรกของคุณ",
        checkInPrompt: "ในขณะที่ลงมือทำจริง อะไรที่ทำได้คล่องแคล่ว และตรงไหนยังท้าทายคุณอยู่",
      },
      {
        id: `growth-${cluster}-day-5`,
        day: 5,
        title: "Day 5 — รับฟังข้อคิดเห็นแนะแนว",
        description: day5Desc,
        focusDimension: "skill_growth",
        cluster,
        skillTags: ["feedback", focus.skill.th || focus.skill],
        durationDays: 1,
        evidencePrompt: "เขียนบันทึกข้อแนะนำความเห็นที่คุณได้รับมา 1 ข้อสำหรับนำไปลองต่อยอด",
        checkInPrompt: "ข้อคิดเห็นข้อไหนที่สะท้อนทักษะในตัวคุณที่คุณอาจมองข้ามไปก่อนหน้านี้",
      },
      {
        id: `growth-${cluster}-day-6`,
        day: 6,
        title: "Day 6 — ปรับปรุงปรับเปลี่ยนแก้ไขชิ้นงาน",
        description: "นำข้อแนะนำมาปรับปรุงแก้ไขชิ้นงานของคุณต่ออีกหนึ่งรอบย่อย เพื่อให้เห็นความก้าวหน้าอย่างชัดเจน",
        focusDimension: "skill_growth",
        cluster,
        skillTags: ["iteration", focus.skill.th || focus.skill],
        durationDays: 1,
        evidencePrompt: "สรุปการเปลี่ยนแปลงระหว่างรอบแรกและผลลัพธ์รอบใหม่ (Before/After)",
        checkInPrompt: "การปรับปรุงรอบนี้สร้างความภูมิใจหรือสะท้อนทักษะการแก้ปัญหาของคุณอย่างไร",
      },
      {
        id: `growth-${cluster}-day-7`,
        day: 7,
        title: "Day 7 — สรุปความก้าวหน้าและก้าวถัดไป",
        description: day7Desc,
        focusDimension: "future_clarity",
        cluster,
        skillTags: ["planning", "future-readiness"],
        durationDays: 1,
        evidencePrompt: "สรุปแผนย่อย 1 อย่างที่คุณอยากเริ่มลองทำต่อสัปดาห์ถัดไป",
        checkInPrompt: "หลังจากการเดินทางครบ 7 วันนี้ คุณเกิดแรงใจหรือความชัดเจนเพิ่มขึ้นตรงมิติใดบ้าง",
      },
    ];
  }
}

export function isDayUnlocked(dayNum) {
  if (dayNum === 1) return true;
  const profile = computeProfile(state.answers);
  const mList = state.growthMissions.length > 0 ? state.growthMissions : buildGrowthMissions(profile);
  const prevMission = mList.find(m => m.day === dayNum - 1);
  if (!prevMission) return false;
  return state.checkIns.some(c => c.missionId === prevMission.id);
}

// --- 7-DAY MISSIONS VIEW RENDERING ---
function renderMissionsTab() {
  const profile = computeProfile(state.answers);
  if (!profile) {
    // Alert and redirect to profile
    alert("กรุณาทำแบบทดสอบให้ครบ 6 ข้อก่อนเข้าสู่ภารกิจสำรวจตัวตนครับ");
    switchView('quiz-tab');
    return;
  }

  const mStatus = getGrowthMissionStatus();
  
  // Render Days list in sidebar
  const daysList = document.getElementById('mission-days-list');
  daysList.innerHTML = '';
  
  mStatus.missions.forEach(m => {
    const isCompleted = state.checkIns.some(c => c.missionId === m.id);
    const unlocked = isDayUnlocked(m.day);
    const btn = document.createElement('button');
    btn.className = `day-btn ${currentSelectedDay === m.day ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${!unlocked ? 'locked' : ''}`;
    
    // Icon based on completion or lock
    let checkIcon = '<span class="indicator-dot"></span>';
    if (isCompleted) {
      checkIcon = '<i data-lucide="check" style="width: 14px; height: 14px;"></i>';
    } else if (!unlocked) {
      checkIcon = '<i data-lucide="lock" style="width: 12px; height: 12px; opacity: 0.5;"></i>';
    }
    
    btn.innerHTML = `
      <span>Day ${m.day}</span>
      ${checkIcon}
    `;
    btn.addEventListener('click', () => {
      currentSelectedDay = m.day;
      renderMissionsTab();
    });
    daysList.appendChild(btn);
  });

  // Render Mission details panel
  const activeMission = mStatus.missions.find(m => m.day === currentSelectedDay);
  if (activeMission) {
    document.getElementById('mission-detail-day').textContent = `DAY ${activeMission.day}`;
    document.getElementById('mission-detail-title').textContent = activeMission.title;
    document.getElementById('mission-detail-desc').textContent = activeMission.description;
    const lang = state.language || "th";
    const dimensionObj = growthDimensionLabels[activeMission.focusDimension];
    const dimensionText = (dimensionObj && dimensionObj[lang]) ? dimensionObj[lang] : (dimensionObj || "");
    document.getElementById('mission-detail-dimension').textContent = dimensionText.split(" — ")[0];
    document.getElementById('mission-detail-skills').textContent = activeMission.skillTags.join(", ");

    const evidenceLabel = document.getElementById('checkin-evidence-label');
    evidenceLabel.textContent = activeMission.evidencePrompt;

    // Set dynamic hint/example text based on selected day, user's career cluster, and current language
    const currentLang = state.language || "th";
    const userCluster = activeMission.cluster || profile?.careerClusters[0]?.id || "creator";
    const dayNum = activeMission.day;
    let hintStr = "";
    if (currentLang === "en") {
      hintStr = (missionHintExamplesEn[userCluster] && missionHintExamplesEn[userCluster][dayNum])
        ? missionHintExamplesEn[userCluster][dayNum]
        : "Type your reflection here...";
    } else {
      hintStr = (missionHintExamples[userCluster] && missionHintExamples[userCluster][dayNum])
        ? missionHintExamples[userCluster][dayNum]
        : "เขียนบันทึกความก้าวหน้าที่นี่...";
    }
    const hintTextEl = document.getElementById('checkin-hint-text');
    if (hintTextEl) {
      hintTextEl.textContent = `"${hintStr}"`;
    }

    const checkinForm = document.getElementById('checkin-form');
    const checkedBox = document.getElementById('checked-in-status-box');
    
    // Day unlock check
    const unlocked = isDayUnlocked(activeMission.day);
    let lockPlaceholder = document.getElementById('mission-locked-placeholder');
    
    if (!unlocked) {
      // Create lock placeholder if it doesn't exist
      if (!lockPlaceholder) {
        lockPlaceholder = document.createElement('div');
        lockPlaceholder.id = 'mission-locked-placeholder';
        lockPlaceholder.className = 'lock-card';
        lockPlaceholder.style.marginTop = '20px';
        lockPlaceholder.style.padding = '20px';
        lockPlaceholder.style.border = '1px dashed var(--border-color)';
        lockPlaceholder.style.borderRadius = '12px';
        lockPlaceholder.style.textAlign = 'center';
        lockPlaceholder.innerHTML = `
          <i data-lucide="lock" style="width: 32px; height: 32px; color: var(--text-muted); margin-bottom: 8px; display: inline-block;"></i>
          <p style="font-size: 0.9rem; font-weight: 600;">ภารกิจนี้ยังไม่เปิดล็อก</p>
          <p class="text-muted" style="font-size: 0.75rem; margin-top: 4px;">กรุณาทำภารกิจและเช็คอินความก้าวหน้าของวันก่อนหน้าให้สำเร็จก่อนเพื่อเริ่มภารกิจนี้</p>
        `;
        document.getElementById('mission-detail-card').appendChild(lockPlaceholder);
      }
      lockPlaceholder.style.display = 'block';
      checkinForm.style.display = 'none';
      checkedBox.style.display = 'none';
    } else {
      // Unlocked day
      if (lockPlaceholder) {
        lockPlaceholder.style.display = 'none';
      }
      
      // Check if day completed
      const existingCheckin = state.checkIns.find(c => c.missionId === activeMission.id);
      if (existingCheckin) {
        checkinForm.style.display = 'none';
        checkedBox.style.display = 'block';
        
        document.getElementById('logged-reflection').textContent = existingCheckin.reflectionText;
        document.getElementById('logged-rating').textContent = existingCheckin.selfRating;
        document.getElementById('logged-mood').textContent = existingCheckin.moodTag.toUpperCase();
      } else {
        checkinForm.style.display = 'block';
        checkedBox.style.display = 'none';
        
        document.getElementById('checkin-mission-id').value = activeMission.id;
        document.getElementById('checkin-day-num').value = activeMission.day;
        document.getElementById('checkin-evidence-input').value = '';
      }
    }
  }

  // Draw timeline visual on canvas
  renderCanvas();
  lucide.createIcons();
}

function handleCheckinSubmit(e) {
  e.preventDefault();
  try {
    let dayNum = parseInt(document.getElementById('checkin-day-num').value);
    if (isNaN(dayNum)) {
      dayNum = currentSelectedDay || 1;
    }
    const text = document.getElementById('checkin-evidence-input').value;
    const rating = parseInt(document.getElementById('checkin-rating').value);
    const mood = document.getElementById('checkin-mood').value;

    const profile = computeProfile(state.answers);
    let mId = document.getElementById('checkin-mission-id').value;
    if (!mId) {
      const userCluster = profile?.careerClusters[0]?.id || "creator";
      mId = `growth-${userCluster}-day-${dayNum}`;
    }

    const mission = buildGrowthMissions(profile).find(m => m.id === mId);
    if (!mission) {
      alert(state.language === 'en'
        ? "Error: Mission data could not be verified. Please reload and try again."
        : "เกิดข้อผิดพลาด: ไม่สามารถยืนยันข้อมูลภารกิจได้ กรุณารีโหลดหน้าเว็บแล้วลองอีกครั้ง");
      return;
    }

    const checkinObj = {
      id: `chk-${Date.now()}`,
      missionId: mId,
      day: dayNum,
      completedAt: new Date().toISOString(),
      reflectionText: text,
      selfRating: rating,
      moodTag: mood,
      focusDimension: mission.focusDimension,
      skillTags: mission.skillTags
    };

    state.checkIns.push(checkinObj);
    state.tokens += 20; // reward tokens for check-in
    
    saveState();
    renderMissionsTab();
    
    alert(state.language === 'en'
      ? `Mission Day ${dayNum} check-in success! You received +20 Tokens.`
      : `เช็คอินภารกิจ Day ${dayNum} สำเร็จ! คุณได้รับ +20 Tokens เรียบร้อยแล้ว`);
  } catch (err) {
    console.error("Checkin submit error:", err);
    window.alert("เกิดข้อผิดพลาดในการบันทึก: " + err.message);
  }
}

export function getGrowthMissionStatus() {
  const profile = computeProfile(state.answers);
  const mList = buildGrowthMissions(profile);
  const completedIds = new Set(state.checkIns.map(c => c.missionId));
  const currentMission = mList.find(m => !completedIds.has(m.id)) ?? null;
  const review = computeGrowthReview(state.checkIns);

  return {
    missions: mList,
    completedCount: completedIds.size,
    currentMission,
    review,
    reviewUnlocked: review.unlocked || state.growthReviewUnlocked,
  };
}

// --- GROWTH REVIEW VIEW RENDERING ---
function renderReviewTab() {
  const mStatus = getGrowthMissionStatus();
  
  const lockedScreen = document.getElementById('review-locked-box');
  const unlockedScreen = document.getElementById('review-unlocked-box');
  const lang = state.language || 'th';
  
  if (mStatus.reviewUnlocked) {
    lockedScreen.style.display = 'none';
    unlockedScreen.style.display = 'block';
    
    // Render Review details
    document.getElementById('review-headline').textContent = mStatus.review.headline;
    document.getElementById('review-summary').textContent = mStatus.review.summary;
    document.getElementById('review-next-step').innerHTML = `<strong>${lang === 'en' ? 'Recommendation:' : 'คำแนะนำ:'}</strong> ${mStatus.review.nextStep}`;
    document.getElementById('review-framework-note').textContent = mStatus.review.frameworkNote;

    // Render Dimension Bar lists
    const barsContainer = document.getElementById('review-dimension-bars');
    barsContainer.innerHTML = '';
    
    const bandLabels = {
      emerging: { th: "ควรเริ่มต้นพัฒนา (Emerging)", en: "Emerging" },
      building: { th: "กำลังสร้างสรรค์ทักษะ (Building)", en: "Building" },
      expanding: { th: "พัฒนาดีเยี่ยมระดับนำหน้า (Expanding)", en: "Expanding" }
    };
    
    mStatus.review.dimensionScores.forEach(d => {
      const item = document.createElement('div');
      item.className = 'dim-bar-item';
      
      const dName = d.name[lang].split(" — ")[0];
      const dInsight = d.insight[lang];
      const dBand = bandLabels[d.band][lang];
      const stabilityText = lang === 'en' ? 'Stability' : 'ความเสถียร';
      
      item.innerHTML = `
        <div class="dim-header">
          <span>${dName}</span>
          <span class="dim-band">${dBand}</span>
        </div>
        <div class="progress-bar-sm mb-1">
          <div class="progress-fill" style="width: ${d.score}%"></div>
        </div>
        <span class="dim-insight">${dInsight} (${stabilityText}: ${d.score}%)</span>
      `;
      barsContainer.appendChild(item);
    });

    // Populate Thinking Style Trends card
    const trendsCard = document.getElementById('review-thinking-trends-card');
    const trendsContainer = document.getElementById('review-thinking-trends-container');
    if (trendsCard && trendsContainer) {
      if (state.thinkingStyleCompleted && state.thinkingStyle) {
        trendsCard.style.display = 'block';
        const style = state.thinkingStyle;
        const isEn = lang === 'en';
        trendsContainer.innerHTML = `
          <div style="display: flex; flex-direction: column; gap: 16px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; padding: 18px;">
            
            <div class="axis-row">
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 6px;">
                <strong style="color: ${style.axes.energy.dominant === 'I' ? 'var(--color-accent)' : 'var(--text-secondary)'};">
                  ${isEn ? "Reflective Energy (I)" : "สมาธิภายใน Reflective (I)"}
                </strong>
                <span class="text-muted" style="font-size: 0.72rem; font-weight: 600;">
                  ${isEn ? style.axes.energy.clarity : (style.axes.energy.clarity === 'Strong' ? 'ความชัดเจนสูงมาก' : (style.axes.energy.clarity === 'Moderate' ? 'ความชัดเจนปานกลาง' : 'สมดุลสองฝั่ง'))}
                </span>
                <strong style="color: ${style.axes.energy.dominant === 'E' ? 'var(--color-accent)' : 'var(--text-secondary)'};">
                  ${isEn ? "Interactive Energy (E)" : "ชอบแลกเปลี่ยน Interactive (E)"}
                </strong>
              </div>
              <div class="slider-track" style="height: 10px; background: var(--border-color); border-radius: 5px; position: relative;">
                <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 50%; background: ${style.axes.energy.dominant === 'I' ? 'linear-gradient(to left, rgba(var(--color-accent-rgb), 0.1), var(--color-accent))' : 'transparent'}; border-radius: 5px 0 0 5px;"></div>
                <div style="position: absolute; right: 0; top: 0; bottom: 0; width: 50%; background: ${style.axes.energy.dominant === 'E' ? 'linear-gradient(to right, rgba(var(--color-accent-rgb), 0.1), var(--color-accent))' : 'transparent'}; border-radius: 0 5px 5px 0;"></div>
                <div class="slider-knob" style="position: absolute; left: ${style.axes.energy.rightPct}%; top: 50%; transform: translate(-50%, -50%); width: 16px; height: 16px; background: var(--text-primary); border: 3px solid var(--color-accent); border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.3); transition: left 0.3s ease;"></div>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.72rem; margin-top: 4px; color: var(--text-muted);">
                <span>${style.axes.energy.leftPct}% (Left)</span>
                <span>${style.axes.energy.rightPct}% (Right)</span>
              </div>
            </div>

            <div class="axis-row">
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 6px;">
                <strong style="color: ${style.axes.lens.dominant === 'S' ? 'var(--color-accent)' : 'var(--text-secondary)'};">
                  ${isEn ? "Practical Lens (S)" : "ขั้นตอนและข้อมูลจริง Practical (S)"}
                </strong>
                <span class="text-muted" style="font-size: 0.72rem; font-weight: 600;">
                  ${isEn ? style.axes.lens.clarity : (style.axes.lens.clarity === 'Strong' ? 'ความชัดเจนสูงมาก' : (style.axes.lens.clarity === 'Moderate' ? 'ความชัดเจนปานกลาง' : 'สมดุลสองฝั่ง'))}
                </span>
                <strong style="color: ${style.axes.lens.dominant === 'N' ? 'var(--color-accent)' : 'var(--text-secondary)'};">
                  ${isEn ? "Future Lens (N)" : "มองภาพใหญ่ Future (N)"}
                </strong>
              </div>
              <div class="slider-track" style="height: 10px; background: var(--border-color); border-radius: 5px; position: relative;">
                <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 50%; background: ${style.axes.lens.dominant === 'S' ? 'linear-gradient(to left, rgba(var(--color-accent-rgb), 0.1), var(--color-accent))' : 'transparent'}; border-radius: 5px 0 0 5px;"></div>
                <div style="position: absolute; right: 0; top: 0; bottom: 0; width: 50%; background: ${style.axes.lens.dominant === 'N' ? 'linear-gradient(to right, rgba(var(--color-accent-rgb), 0.1), var(--color-accent))' : 'transparent'}; border-radius: 0 5px 5px 0;"></div>
                <div class="slider-knob" style="position: absolute; left: ${style.axes.lens.rightPct}%; top: 50%; transform: translate(-50%, -50%); width: 16px; height: 16px; background: var(--text-primary); border: 3px solid var(--color-accent); border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.3); transition: left 0.3s ease;"></div>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.72rem; margin-top: 4px; color: var(--text-muted);">
                <span>${style.axes.lens.leftPct}% (Left)</span>
                <span>${style.axes.lens.rightPct}% (Right)</span>
              </div>
            </div>

            <div class="axis-row">
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 6px;">
                <strong style="color: ${style.axes.decision.dominant === 'T' ? 'var(--color-accent)' : 'var(--text-secondary)'};">
                  ${isEn ? "Logic Decision (T)" : "ยึดหลักตรรกะ Logic (T)"}
                </strong>
                <span class="text-muted" style="font-size: 0.72rem; font-weight: 600;">
                  ${isEn ? style.axes.decision.clarity : (style.axes.decision.clarity === 'Strong' ? 'ความชัดเจนสูงมาก' : (style.axes.decision.clarity === 'Moderate' ? 'ความชัดเจนปานกลาง' : 'สมดุลสองฝั่ง'))}
                </span>
                <strong style="color: ${style.axes.decision.dominant === 'F' ? 'var(--color-accent)' : 'var(--text-secondary)'};">
                  ${isEn ? "Value Decision (F)" : "รักษาน้ำใจจิตใจ Value (F)"}
                </strong>
              </div>
              <div class="slider-track" style="height: 10px; background: var(--border-color); border-radius: 5px; position: relative;">
                <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 50%; background: ${style.axes.decision.dominant === 'T' ? 'linear-gradient(to left, rgba(var(--color-accent-rgb), 0.1), var(--color-accent))' : 'transparent'}; border-radius: 5px 0 0 5px;"></div>
                <div style="position: absolute; right: 0; top: 0; bottom: 0; width: 50%; background: ${style.axes.decision.dominant === 'F' ? 'linear-gradient(to right, rgba(var(--color-accent-rgb), 0.1), var(--color-accent))' : 'transparent'}; border-radius: 0 5px 5px 0;"></div>
                <div class="slider-knob" style="position: absolute; left: ${style.axes.decision.rightPct}%; top: 50%; transform: translate(-50%, -50%); width: 16px; height: 16px; background: var(--text-primary); border: 3px solid var(--color-accent); border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.3); transition: left 0.3s ease;"></div>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.72rem; margin-top: 4px; color: var(--text-muted);">
                <span>${style.axes.decision.leftPct}% (Left)</span>
                <span>${style.axes.decision.rightPct}% (Right)</span>
              </div>
            </div>

            <div class="axis-row">
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 6px;">
                <strong style="color: ${style.axes.planning.dominant === 'J' ? 'var(--color-accent)' : 'var(--text-secondary)'};">
                  ${isEn ? "Structured Planner (J)" : "แผนงานเป้าหมายชัด Structured (J)"}
                </strong>
                <span class="text-muted" style="font-size: 0.72rem; font-weight: 600;">
                  ${isEn ? style.axes.planning.clarity : (style.axes.planning.clarity === 'Strong' ? 'ความชัดเจนสูงมาก' : (style.axes.planning.clarity === 'Moderate' ? 'ความชัดเจนปานกลาง' : 'สมดุลสองฝั่ง'))}
                </span>
                <strong style="color: ${style.axes.planning.dominant === 'P' ? 'var(--color-accent)' : 'var(--text-secondary)'};">
                  ${isEn ? "Adaptive Explorer (P)" : "พร้อมปรับตามสถานการณ์ Adaptive (P)"}
                </strong>
              </div>
              <div class="slider-track" style="height: 10px; background: var(--border-color); border-radius: 5px; position: relative;">
                <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 50%; background: ${style.axes.planning.dominant === 'J' ? 'linear-gradient(to left, rgba(var(--color-accent-rgb), 0.1), var(--color-accent))' : 'transparent'}; border-radius: 5px 0 0 5px;"></div>
                <div style="position: absolute; right: 0; top: 0; bottom: 0; width: 50%; background: ${style.axes.planning.dominant === 'P' ? 'linear-gradient(to right, rgba(var(--color-accent-rgb), 0.1), var(--color-accent))' : 'transparent'}; border-radius: 0 5px 5px 0;"></div>
                <div class="slider-knob" style="position: absolute; left: ${style.axes.planning.rightPct}%; top: 50%; transform: translate(-50%, -50%); width: 16px; height: 16px; background: var(--text-primary); border: 3px solid var(--color-accent); border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.3); transition: left 0.3s ease;"></div>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.72rem; margin-top: 4px; color: var(--text-muted);">
                <span>${style.axes.planning.leftPct}% (Left)</span>
                <span>${style.axes.planning.rightPct}% (Right)</span>
              </div>
            </div>

          </div>
        `;
      } else {
        trendsCard.style.display = 'none';
      }
    }
  } else {
    lockedScreen.style.display = 'flex';
    unlockedScreen.style.display = 'none';
    
    // Progress calculation
    const completedDays = state.checkIns.length;
    const pct = Math.round((completedDays / 3) * 100);
    document.getElementById('review-unlock-progress-fill').style.width = `${pct}%`;
    document.getElementById('review-unlock-ratio-text').textContent = lang === 'en' 
      ? `${completedDays} of 3 days completed` 
      : `${completedDays} จาก 3 วันสำเร็จ`;
  }
}

// Compute Growth Review logic based on checkins
export function computeGrowthReview(checkIns) {
  const completedCount = checkIns.length;
  const uniqueMissions = new Set(checkIns.map(c => c.missionId)).size;
  const sorted = checkIns.map(c => c.completedAt).sort();
  const lang = state.language || 'th';
  
  const dimensionScores = Object.keys(growthDimensionLabels).map(dimension => {
    const relevant = checkIns.filter(c => c.focusDimension === dimension);
    const avgRating = relevant.length ? relevant.reduce((sum, item) => sum + Math.min(5, Math.max(1, item.selfRating)), 0) / relevant.length : 0;
    const avgLen = relevant.length ? relevant.reduce((sum, item) => sum + item.reflectionText.trim().length, 0) / relevant.length : 0;
    
    const depthBonus = avgLen >= 80 ? 18 : avgLen >= 40 ? 12 : avgLen >= 12 ? 6 : 0;
    const score = Math.min(100, Math.round(relevant.length * 18 + avgRating * 10 + depthBonus + (uniqueMissions >= 7 ? 8 : 0)));
    const band = score >= 72 ? "expanding" : score >= 42 ? "building" : "emerging";

    return {
      id: dimension,
      name: growthDimensionLabels[dimension],
      score,
      band,
      insight: growthDimensionInsights[dimension][band],
    };
  });

  const sortedScores = [...dimensionScores].sort((a, b) => b.score - a.score);
  const strongest = sortedScores[0];
  const lowest = sortedScores[sortedScores.length - 1];
  const unlocked = completedCount >= 3;

  const strongestName = strongest.name[lang].split(" — ")[0];
  const lowestName = lowest.name[lang].split(" — ")[0];

  return {
    unlocked,
    completedCount,
    progressLabel: lang === 'en' ? `${completedCount}/7 days explored` : `${completedCount}/7 วันที่สำรวจแล้ว`,
    periodStart: sorted[0],
    periodEnd: sorted[sorted.length - 1],
    headline: unlocked 
      ? (lang === 'en' ? `Growth Review: Outstanding progress in ${strongestName}` : `Growth Review: พัฒนาการด้าน ${strongestName} ค่อนข้างโดดเด่น`)
      : (lang === 'en' ? "Complete at least 3 check-ins to unlock Growth Review" : "เริ่มสะสม check-in เพื่อเปิด Growth Review"),
    summary: unlocked 
      ? (lang === 'en' ? "Here is the detailed analysis of your growth dimension evaluation." : "นี่คือรายละเอียดวิเคราะห์ประเมินการเจริญเติบโตของคุณเพื่อส่องกระจกสะท้อนตัวตนจริง")
      : (lang === 'en' ? "Submit check-in reflection for at least 3 days to generate a report." : "ส่งสะท้อนคิดบันทึกการส่งงานอย่างน้อย 3 วัน เพื่อให้ระบบเริ่มจัดทำรายงาน"),
    dimensionScores,
    nextStep: unlocked 
      ? (lang === 'en' ? `Next week's missions should focus on active practice to support ${lowestName} (Current score: ${lowest.score}%)` : `กิจกรรมรอบหน้าควรมุ่งฝึกฝนทักษะการทำจริงเพื่อเสริมมิติ ${lowestName} (คะแนนปัจจุบัน: ${lowest.score}%)`)
      : (lang === 'en' ? "Log daily activities and reflect on your emotions in 7-Day Missions." : "บันทึกการลงมือทำกิจกรรมและทบทวนความรู้สึกในหน้า 7-Day Missions"),
    frameworkNote: lang === 'en' ? "All evaluation data is stored locally. It is personalized and not used for competition." : "ข้อมูลประเมินทั้งหมดอ้างอิงจากเช็คอินภายในเครื่อง ไม่นำไปแข่งขัน และให้ผลเฉพาะบุคคล",
  };
}

// --- PARENT LINK TAB ---
function renderParentTab() {
  document.getElementById('parent-invite-code-val').textContent = state.parentInviteCode;
  
  // Sync consent checkboxes
  document.getElementById('parent-share-profile').checked = state.shareWithParent.profile;
  document.getElementById('parent-share-report').checked = state.shareWithParent.report;
  document.getElementById('parent-share-marketplace').checked = state.shareWithParent.marketplace;
}

function handleParentShareChange() {
  state.shareWithParent.profile = document.getElementById('parent-share-profile').checked;
  state.shareWithParent.report = document.getElementById('parent-share-report').checked;
  state.shareWithParent.marketplace = document.getElementById('parent-share-marketplace').checked;
  
  state.consent.parentLink = state.shareWithParent.profile || state.shareWithParent.report || state.shareWithParent.marketplace;
  
  // Sync with settings checkboxes if they exist
  const sProfile = document.getElementById('settings-share-profile');
  const sReport = document.getElementById('settings-share-report');
  const sMarketplace = document.getElementById('settings-share-marketplace');
  if (sProfile) sProfile.checked = state.shareWithParent.profile;
  if (sReport) sReport.checked = state.shareWithParent.report;
  if (sMarketplace) sMarketplace.checked = state.shareWithParent.marketplace;

  saveState();
}

const unlockDetailsMap = {
  "course-ai-foundation": {
    th: {
      code: "AI-SPRINT-LMAP2026",
      instructions: "คัดลอกรหัสโปรโมชั่นนี้แล้วนำไปกรอกที่ระบบการเรียน หรือติดต่อแอดมิน เพื่อเริ่มเรียน AI Foundation Sprint ฟรี!"
    },
    en: {
      code: "AI-SPRINT-LMAP2026",
      instructions: "Copy this code and redeem it on the learning portal or contact admin to start AI Foundation Sprint for free!"
    }
  },
  "mentor-portfolio": {
    th: {
      code: "MENTOR-CLINIC-LIFE",
      instructions: "รหัสปลดล็อกสำหรับจองคิว Mentor คลินิกเพื่อรีวิวแฟ้มสะสมผลงาน 1-on-1 (30 นาที) โปรดแคปหน้านี้แจ้งทีมงานแนะแนว"
    },
    en: {
      code: "MENTOR-CLINIC-LIFE",
      instructions: "Redemption code to book a 1-on-1 Portfolio review session (30 mins). Capture this screen and contact counselor."
    }
  },
  "camp-social-health": {
    th: {
      code: "CAMP-HEALTH-99",
      instructions: "บัตรเข้าร่วมแคมป์พัฒนาทักษะ Health & Social Impact นำรหัสไปลงทะเบียนผ่าน Google Form ของค่ายเพื่อยืนยันสิทธิ์"
    },
    en: {
      code: "CAMP-HEALTH-99",
      instructions: "Registration ticket for Health & Social Impact Camp. Use this code in the camp registration form to claim your seat."
    }
  },
  "scholarship-radar": {
    th: {
      code: "RADAR-PREMIUM-ACCESS",
      instructions: "คุณสามารถกดอ่านรีพอร์ตรายการทุนการศึกษาและบอร์ดรับสมัครได้ไม่จำกัด! เข้าดูข้อมูลที่แท็บ Opportunities ได้ตลอดเวลา"
    },
    en: {
      code: "RADAR-PREMIUM-ACCESS",
      instructions: "Premium access unlocked! You can now browse all scholarship boards and applications without token limits."
    }
  }
};

function showRedeemSuccessModal(itemId) {
  const item = marketplaceItems.find(i => i.id === itemId);
  if (!item) return;

  const lang = state.language || 'th';
  const detail = unlockDetailsMap[itemId] || {
    th: { code: "LMAP-SECRET", instructions: "นำรหัสนี้ไปติดต่อเจ้าหน้าที่แนะแนวเพื่อรับคำแนะนำเพิ่มเติม" },
    en: { code: "LMAP-SECRET", instructions: "Use this code to contact the counselor for more information." }
  };

  const modal = document.getElementById('marketplace-redeem-modal');
  const title = document.getElementById('redeem-success-title');
  const desc = document.getElementById('redeem-success-desc');
  const codeLabel = document.getElementById('redeem-code-label');
  const codeVal = document.getElementById('redeem-promo-code');
  const inst = document.getElementById('redeem-instructions');
  const closeBtn = document.getElementById('btn-redeem-close');
  const copyBtn = document.getElementById('btn-copy-redeem-code');
  const copyBtnText = document.getElementById('copy-btn-text');

  if (!modal) return;

  title.textContent = lang === 'en' ? "Unlocked Successfully!" : "ปลดล็อกโอกาสสำเร็จ!";
  desc.textContent = item.title[lang] || item.title;
  codeLabel.textContent = lang === 'en' ? "Access Code / Reference" : "Access Code / รหัสผ่าน";
  codeVal.textContent = detail[lang].code || detail.code;
  inst.textContent = detail[lang].instructions || detail.instructions;
  if (copyBtnText) copyBtnText.textContent = lang === 'en' ? "Copy Code" : "คัดลอกรหัส";

  modal.classList.add('active');

  // Copy click handler
  const handleCopy = () => {
    navigator.clipboard.writeText(codeVal.textContent).then(() => {
      if (copyBtnText) copyBtnText.textContent = lang === 'en' ? "Copied!" : "คัดลอกแล้ว!";
      setTimeout(() => {
        if (copyBtnText) copyBtnText.textContent = lang === 'en' ? "Copy Code" : "คัดลอกรหัส";
      }, 2000);
    });
  };

  // Replace copy event listener cleanly
  const newCopyBtn = copyBtn.cloneNode(true);
  copyBtn.parentNode.replaceChild(newCopyBtn, copyBtn);
  newCopyBtn.addEventListener('click', handleCopy);

  // Close handler
  const handleClose = () => {
    modal.classList.remove('active');
  };
  const newCloseBtn = closeBtn.cloneNode(true);
  closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
  newCloseBtn.addEventListener('click', handleClose);

  // Backdrop close
  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  };

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// --- OPPORTUNITIES / MARKETPLACE TAB ---
function renderMarketplaceTab() {
  const grid = document.getElementById('marketplace-items-grid');
  grid.innerHTML = '';
  const lang = state.language || 'th';
  
  // Guard for old state structures
  state.unlockedItems = state.unlockedItems || [];
  const isParent = localStorage.getItem('lifemap_logged_in_role') === 'parent';

  // Calculate compatibility scores and sort
  const profile = computeProfile(state.answers);
  const ts = state.thinkingStyle;

  const getOpportunityCompatibility = (item) => {
    let score = 0;
    
    // 1. RIASEC / Career Cluster match (up to 50 points)
    if (profile && profile.careerClusters && profile.careerClusters.length > 0) {
      const itemClusterTh = item.cluster.th || item.cluster;
      const itemClusterEn = item.cluster.en || item.cluster;
      
      const rankIndex = profile.careerClusters.findIndex(c => {
        const label = clusterLabels[c.id];
        return label && (label.th === itemClusterTh || label.en === itemClusterEn);
      });
      
      if (rankIndex === 0) score += 50;
      else if (rankIndex === 1) score += 40;
      else if (rankIndex === 2) score += 30;
      else if (rankIndex === 3) score += 20;
      else if (rankIndex === 4) score += 10;
    }
    
    // 2. Thinking Style axis match (up to 50 points)
    if (state.thinkingStyleCompleted && ts && ts.axes) {
      const dominantEnergy = ts.axes.energy.dominant; // 'E' or 'I'
      const dominantLens = ts.axes.lens.dominant; // 'N' or 'S'
      const dominantDecision = ts.axes.decision.dominant; // 'T' or 'F'
      const dominantPlanning = ts.axes.planning.dominant; // 'J' or 'P'
      
      if (item.id === "course-ai-foundation") {
        if (dominantLens === 'N') score += 25;
        if (dominantDecision === 'T') score += 25;
      } else if (item.id === "mentor-portfolio") {
        if (dominantLens === 'N') score += 25;
        if (dominantDecision === 'F') score += 25;
      } else if (item.id === "camp-social-health") {
        if (dominantEnergy === 'E') score += 25;
        if (dominantDecision === 'F') score += 25;
      } else if (item.id === "scholarship-radar") {
        if (dominantPlanning === 'J') score += 25;
        if (dominantDecision === 'T') score += 25;
      }
    }
    
    return score;
  };

  // Clone and map items with their compatibility scores
  const itemsWithScores = marketplaceItems.map(item => ({
    ...item,
    compatibilityScore: getOpportunityCompatibility(item)
  }));

  // Sort by compatibility score descending if quiz or thinking style is completed
  if (profile || state.thinkingStyleCompleted) {
    itemsWithScores.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
  }

  itemsWithScores.forEach(item => {
    const isBookmarked = state.bookmarks.includes(item.id);
    const isUnlocked = state.unlockedItems.includes(item.id);
    const card = document.createElement('div');
    card.className = `opportunity-card ${isUnlocked ? 'unlocked-card' : ''}`;
    
    const type = item.type[lang] || item.type;
    const title = item.title[lang] || item.title;
    const description = item.description[lang] || item.description;
    const cluster = item.cluster[lang] || item.cluster;

    // Define action button HTML based on status and role
    let actionButtonHtml = "";
    if (isUnlocked) {
      actionButtonHtml = `
        <button class="btn btn-accent btn-sm btn-block btn-redeem-action unlocked" data-id="${item.id}" style="display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 8px;">
          <i data-lucide="check-circle" style="width: 14px; height: 14px;"></i>
          <span>${lang === 'en' ? 'Unlocked (View Code)' : 'ปลดล็อกแล้ว (ดูรหัส)'}</span>
        </button>
      `;
    } else if (isParent) {
      actionButtonHtml = `
        <button class="btn btn-secondary btn-sm btn-block" disabled style="opacity: 0.7; cursor: not-allowed; display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 8px;">
          <i data-lucide="lock" style="width: 14px; height: 14px;"></i>
          <span>${lang === 'en' ? 'Awaiting Student Unlock' : 'รอการปลดล็อกโดยนักเรียน'}</span>
        </button>
      `;
    } else if (state.tokens >= item.tokenCost) {
      actionButtonHtml = `
        <button class="btn btn-primary btn-sm btn-block btn-redeem-action" data-id="${item.id}" style="margin-top: 8px;">
          <span>${lang === 'en' ? 'Unlock Opportunity' : 'ปลดล็อกสิทธิ์'}</span>
        </button>
      `;
    } else {
      actionButtonHtml = `
        <button class="btn btn-secondary btn-sm btn-block btn-redeem-action" disabled style="opacity: 0.6; cursor: not-allowed; display: flex; align-items: center; justify-content: center; gap: 4px; margin-top: 8px;">
          <i data-lucide="lock" style="width: 12px; height: 12px;"></i>
          <span>${lang === 'en' ? 'Need More Tokens' : 'Tokens ไม่เพียงพอ'}</span>
        </button>
      `;
    }
    
    const showRecommended = item.compatibilityScore >= 60;
    const recommendedBadge = showRecommended 
      ? `<span class="op-match-badge" style="background: rgba(var(--color-accent-rgb), 0.15); color: var(--color-accent); font-size: 0.7rem; font-weight: 600; padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(var(--color-accent-rgb), 0.3); margin-left: 8px;">${lang === 'en' ? 'Recommended' : 'แนะนำสำหรับคุณ'}</span>`
      : "";

    card.innerHTML = `
      <div class="op-badge-row" style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
        <div style="display: flex; align-items: center; gap: 4px;">
          <span class="type-tag">${type}</span>
          ${recommendedBadge}
        </div>
        <button class="btn-bookmark ${isBookmarked ? 'bookmarked' : ''}" data-id="${item.id}" title="${lang === 'en' ? 'Bookmark' : 'บันทึกไว้อ่าน'}">
          <i data-lucide="bookmark" style="fill: ${isBookmarked ? 'var(--color-accent)' : 'none'}"></i>
        </button>
      </div>
      <div class="op-info">
        <h4>${title}</h4>
        <p class="text-muted">${description}</p>
      </div>
      <div class="op-footer" style="display: flex; flex-direction: column; gap: 4px; margin-top: auto; width: 100%;">
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <span class="op-cost"><i data-lucide="database"></i> ${item.tokenCost} Tokens</span>
          <span class="op-cluster-tag">${cluster}</span>
        </div>
        ${actionButtonHtml}
      </div>
    `;
    
    // Add bookmark event
    card.querySelector('.btn-bookmark').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleBookmark(item.id);
    });

    // Add redeem/unlock event
    const redeemBtn = card.querySelector('.btn-redeem-action');
    if (redeemBtn && !redeemBtn.disabled) {
      redeemBtn.addEventListener('click', () => {
        if (isUnlocked) {
          showRedeemSuccessModal(item.id);
        } else {
          // Attempting to redeem
          if (state.tokens >= item.tokenCost) {
            const confirmMsg = lang === 'en'
              ? `Confirm unlocking "${item.title.en}" for ${item.tokenCost} Tokens?`
              : `ยืนยันการใช้ ${item.tokenCost} Tokens เพื่อปลดล็อก "${item.title.th}"?`;
            
            showBrandConfirm(confirmMsg).then((approved) => {
              if (approved) {
                state.tokens -= item.tokenCost;
                state.unlockedItems.push(item.id);
                saveState();
                updateDashboardUI();
                renderMarketplaceTab();
                showRedeemSuccessModal(item.id);
              }
            });
          }
        }
      });
    }

    grid.appendChild(card);
  });
  
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function toggleBookmark(itemId) {
  const idx = state.bookmarks.indexOf(itemId);
  if (idx !== -1) {
    state.bookmarks.splice(idx, 1);
  } else {
    state.bookmarks.push(itemId);
  }
  saveState();
  renderMarketplaceTab();
}

// --- SETTINGS MODULE ---
function renderSettingsTab() {
  try {
    const consent = state.consent || { quiz: false, aiGuide: false, parentLink: false, thinkingStyle: false };
    
    const consentQuiz = document.getElementById('settings-consent-quiz');
    if (consentQuiz) consentQuiz.checked = !!consent.quiz;
    
    const consentAi = document.getElementById('settings-consent-ai');
    if (consentAi) consentAi.checked = !!consent.aiGuide;

    const consentThinkingStyle = document.getElementById('settings-consent-thinking-style');
    if (consentThinkingStyle) consentThinkingStyle.checked = !!consent.thinkingStyle;
    
    const consentShareProfile = document.getElementById('settings-share-profile');
    if (consentShareProfile) consentShareProfile.checked = !!state.shareWithParent.profile;
    
    const consentShareReport = document.getElementById('settings-share-report');
    if (consentShareReport) consentShareReport.checked = !!state.shareWithParent.report;
    
    const consentShareMarketplace = document.getElementById('settings-share-marketplace');
    if (consentShareMarketplace) consentShareMarketplace.checked = !!state.shareWithParent.marketplace;

    const key = localStorage.getItem('lifemap_gemini_api_key') || '';
    const keyInput = document.getElementById('settings-gemini-key');
    if (keyInput) keyInput.value = key;
    
    updateApiKeyStatus(key);
  } catch (err) {
    console.error("Error rendering settings tab:", err);
    window.alert("เกิดข้อผิดพลาดในการโหลดหน้าตั้งค่า: " + err.message);
  }
}

function updateApiKeyStatus(key) {
  const statusEl = document.getElementById('api-key-status');
  if (!statusEl) return;
  if (key) {
    statusEl.innerHTML = 'สถานะ: <span style="color: var(--color-accent); font-weight: bold;">เชื่อมต่อ Google Gemini API แล้ว (ใช้งาน AI ตามจริง)</span>';
  } else {
    statusEl.innerHTML = 'สถานะ: <span style="color: var(--text-muted);">ยังไม่มี API Key (ใช้ระบบ AI จำลอง)</span>';
  }
}

function handleSaveApiKey() {
  const key = document.getElementById('settings-gemini-key').value.trim();
  console.log("DEBUG: handleSaveApiKey - Input key length:", key.length, "starts with:", key ? key.substring(0, 6) : "none");
  if (key) {
    localStorage.setItem('lifemap_gemini_api_key', key);
    alert(state.language === 'en' ? 'API Key saved successfully! Real AI Guide is now active.' : 'บันทึก API Key สำเร็จ! ระบบได้เปิดใช้งาน AI Guide ตัวจริงแล้ว');
  } else {
    localStorage.removeItem('lifemap_gemini_api_key');
    alert(state.language === 'en' ? 'API Key removed! Switched back to simulated AI.' : 'ลบ API Key เรียบร้อยแล้ว ระบบจะสลับกลับไปใช้ AI จำลอง');
  }
  updateApiKeyStatus(key);
}

function handleSettingsConsentChange() {
  state.consent.quiz = document.getElementById('settings-consent-quiz').checked;
  state.consent.aiGuide = document.getElementById('settings-consent-ai').checked;
  
  const sThinking = document.getElementById('settings-consent-thinking-style');
  if (sThinking) {
    state.consent.thinkingStyle = sThinking.checked;
    if (!sThinking.checked) {
      state.thinkingStyleCompleted = undefined;
      state.thinkingStyleAnswers = {};
      state.thinkingStyle = null;
    } else if (state.thinkingStyleCompleted === undefined) {
      state.thinkingStyleCompleted = false;
    }
  }

  const sProfile = document.getElementById('settings-share-profile');
  const sReport = document.getElementById('settings-share-report');
  const sMarketplace = document.getElementById('settings-share-marketplace');
  if (sProfile) state.shareWithParent.profile = sProfile.checked;
  if (sReport) state.shareWithParent.report = sReport.checked;
  if (sMarketplace) state.shareWithParent.marketplace = sMarketplace.checked;

  state.consent.parentLink = state.shareWithParent.profile || state.shareWithParent.report || state.shareWithParent.marketplace;

  // Sync with parent tab checkboxes if they exist
  const pProfile = document.getElementById('parent-share-profile');
  const pReport = document.getElementById('parent-share-report');
  const pMarketplace = document.getElementById('parent-share-marketplace');
  if (pProfile && sProfile) pProfile.checked = sProfile.checked;
  if (pReport && sReport) pReport.checked = sReport.checked;
  if (pMarketplace && sMarketplace) pMarketplace.checked = sMarketplace.checked;

  saveState();
  updateDashboardUI();
}

async function resetThinkingStyleData() {
  const confirmed = await showBrandConfirm(
    state.language === 'en' 
      ? "Are you sure you want to reset your Thinking Style data? This will clear all 16 answers and your profile." 
      : "คุณแน่ใจหรือไม่ที่จะรีเซ็ตข้อมูลสไตล์การคิดและวางแผน? การทำเช่นนี้จะล้างคำตอบทั้ง 16 ข้อรวมถึงโปรไฟล์สไตล์การคิดของคุณ"
  );
  if (confirmed) {
    state.thinkingStyleAnswers = {};
    state.thinkingStyleCompleted = undefined;
    state.thinkingStyle = null;
    saveState();
    updateDashboardUI();
    renderQuizTab();
    renderSettingsTab();
    alert(state.language === 'en' ? "Thinking Style data has been reset." : "รีเซ็ตข้อมูลสไตล์การคิดและวางแผนสำเร็จแล้ว");
  }
}

async function resetAllData() {
  const confirmed = await showBrandConfirm(state.language === 'en' ? "Are you sure you want to reset all Future Profile data on this device? All targets and check-ins will be permanently deleted." : "คุณแน่ใจหรือไม่ที่จะรีเซ็ตข้อมูล Future Profile ทั้งหมดในเครื่องนี้? ข้อมูลเป้าหมายและ check-in ทั้งหมดจะหายไปอย่างถาวร");
  if (confirmed) {
    const username = localStorage.getItem('lifemap_logged_in_user');
    if (username) {
      localStorage.removeItem(`lifemap_state_${username}`);
    }
    localStorage.removeItem('lifemap_state_v2');
    localStorage.removeItem('lifemap_v2_view');
    state = { ...initialState };
    initApp();
  }
}

// --- Visual Radar Chart Generator (SVG based) ---
function renderRadarChart(riasecScores) {
  const radarSvg = document.getElementById('riasec-radar-svg');
  if (!radarSvg) return;
  
  radarSvg.innerHTML = '';
  
  const cx = 200;
  const cy = 200;
  const rMax = 140;
  const numPoles = 6;
  const riasecKeys = ['R', 'I', 'A', 'S', 'E', 'C'];
  
  const angles = riasecKeys.map((_, i) => (i * Math.PI) / 3 - Math.PI / 2);

  // Concentric Octagons/Hexagons
  const levels = [4, 8, 12, 16, 20, 24];
  levels.forEach(l => {
    const radius = (l / 24) * rMax;
    const pts = angles.map(a => {
      const x = cx + radius * Math.cos(a);
      const y = cy + radius * Math.sin(a);
      return `${x},${y}`;
    }).join(' ');

    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    poly.setAttribute('points', pts);
    poly.setAttribute('fill', 'none');
    poly.setAttribute('stroke', 'var(--border-color)');
    poly.setAttribute('stroke-width', '1');
    radarSvg.appendChild(poly);
  });

  // Axis Lines & text tags
  riasecKeys.forEach((key, i) => {
    const angle = angles[i];
    const outerX = cx + rMax * Math.cos(angle);
    const outerY = cy + rMax * Math.sin(angle);
    
    const axis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    axis.setAttribute('x1', cx);
    axis.setAttribute('y1', cy);
    axis.setAttribute('x2', outerX);
    axis.setAttribute('y2', outerY);
    axis.setAttribute('stroke', 'var(--border-color)');
    axis.setAttribute('stroke-dasharray', '3 3');
    radarSvg.appendChild(axis);

    const txtDist = rMax + 20;
    const tx = cx + txtDist * Math.cos(angle);
    const ty = cy + txtDist * Math.sin(angle) + 4;
    
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', tx);
    text.setAttribute('y', ty);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', 'var(--text-secondary)');
    text.setAttribute('font-size', '11px');
    text.setAttribute('font-weight', '700');
    text.textContent = key;
    radarSvg.appendChild(text);
  });

  // Score Polygon filled path
  const scoreMap = Object.fromEntries(riasecScores.map(s => [s.id, s.score]));
  const scorePts = riasecKeys.map((key, i) => {
    const scoreVal = scoreMap[key] || 0;
    const radius = (scoreVal / 24) * rMax;
    const x = cx + radius * Math.cos(angles[i]);
    const y = cy + radius * Math.sin(angles[i]);
    return `${x},${y}`;
  }).join(' ');

  const fillArea = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  fillArea.setAttribute('points', scorePts);
  fillArea.setAttribute('fill', 'rgba(214, 255, 92, 0.15)');
  fillArea.setAttribute('stroke', 'var(--color-accent)');
  fillArea.setAttribute('stroke-width', '2.5');
  radarSvg.appendChild(fillArea);

  // Small circle points at nodes
  riasecKeys.forEach((key, i) => {
    const scoreVal = scoreMap[key] || 0;
    const radius = (scoreVal / 24) * rMax;
    const x = cx + radius * Math.cos(angles[i]);
    const y = cy + radius * Math.sin(angles[i]);

    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', x);
    dot.setAttribute('cy', y);
    dot.setAttribute('r', '4');
    dot.setAttribute('fill', 'var(--bg-primary)');
    dot.setAttribute('stroke', 'var(--color-accent)');
    dot.setAttribute('stroke-width', '1.5');
    radarSvg.appendChild(dot);
  });
}

// --- Import/Export Utilities ---
function exportData() {
  const dataStr = JSON.stringify(state, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `lifemap_future_pass_${state.studentName || 'backup'}_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function handleImportFile(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const data = JSON.parse(evt.target.result);
      if (data.studentName && data.consent) {
        state = { ...initialState, ...data };
        saveState();
        localStorage.removeItem('lifemap_v2_view');
        initApp();
        alert(state.language === 'en' ? 'Future Profile data imported successfully!' : 'นำเข้าข้อมูล Future Profile เรียบร้อยแล้ว!');
      } else {
        alert(state.language === 'en' ? 'Invalid LifeMap backup file structure.' : 'โครงสร้างไฟล์สำรองข้อมูล LifeMap ไม่ถูกต้อง');
      }
    } catch (err) {
      alert(state.language === 'en' ? 'Error parsing JSON backup file.' : 'เกิดข้อผิดพลาดในการอ่านไฟล์ JSON สำรองข้อมูล');
    }
  };
  reader.readAsText(file);
}

// Setup Event Listeners
function setupEventListeners() {
  // Navigation
  document.querySelectorAll('.nav-menu .nav-item').forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });
  
  const settingsBtn = document.getElementById('btn-settings');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => switchView('settings'));
  }
  const headerSettingsBtn = document.getElementById('btn-header-settings');
  if (headerSettingsBtn) {
    headerSettingsBtn.addEventListener('click', () => switchView('settings'));
  }

  // Header/Global Actions
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

  // Onboarding Form Grade change listener
  document.querySelectorAll('input[name="ob-grade"]').forEach(rad => {
    rad.addEventListener('change', (e) => {
      updateGradePersonalizationUI(e.target.value);
    });
  });

  document.getElementById('onboarding-form').addEventListener('submit', handleOnboardingSubmit);

  // Dashboard actions
  document.getElementById('btn-dash-go-review').addEventListener('click', () => switchView('review'));
  document.getElementById('btn-dash-invite-copy').addEventListener('click', () => {
    navigator.clipboard.writeText(state.parentInviteCode);
    alert(state.language === 'en' ? "Invite Code copied!" : "คัดลอกรหัส Invite Code แล้ว!");
  });
  document.getElementById('btn-dash-go-parent').addEventListener('click', () => switchView('parent'));

  // Quiz actions
  document.getElementById('btn-start-quiz-now').addEventListener('click', startQuiz);
  
  const consentChk = document.getElementById('consent-thinking-style');
  const startThinkingBtn = document.getElementById('btn-start-thinking-quiz');
  const skipThinkingBtn = document.getElementById('btn-skip-thinking-quiz');
  if (consentChk && startThinkingBtn && skipThinkingBtn) {
    consentChk.addEventListener('change', (e) => {
      startThinkingBtn.disabled = !e.target.checked;
    });
    startThinkingBtn.addEventListener('click', () => {
      state.consent.thinkingStyle = true;
      startThinkingQuiz();
    });
    skipThinkingBtn.addEventListener('click', () => {
      state.thinkingStyleCompleted = false;
      state.consent.thinkingStyle = false;
      completeQuiz();
    });
  }
  document.getElementById('btn-reset-quiz').addEventListener('click', async () => {
    const confirmed = await showBrandConfirm(state.language === 'en' ? "Do you want to reset the quiz to retake it?" : "ต้องการรีเซ็ตแบบทดสอบเพื่อทำใหม่หรือไม่?");
    if (confirmed) {
      state.answers = {};
      state.thinkingStyleAnswers = {};
      state.thinkingStyleCompleted = undefined;
      state.thinkingStyle = null;
      saveState();
      renderQuizTab();
    }
  });

  // Check-in form action
  const ratingInput = document.getElementById('checkin-rating');
  const ratingVal = document.getElementById('checkin-rating-val');
  if (ratingInput && ratingVal) {
    ratingInput.addEventListener('input', (e) => {
      ratingVal.textContent = e.target.value;
    });
  }
  document.getElementById('checkin-form').addEventListener('submit', handleCheckinSubmit);

  // Parent share changes
  document.getElementById('parent-share-profile').addEventListener('change', handleParentShareChange);
  document.getElementById('parent-share-report').addEventListener('change', handleParentShareChange);
  document.getElementById('parent-share-marketplace').addEventListener('change', handleParentShareChange);
  document.getElementById('btn-parent-copy-code').addEventListener('click', () => {
    navigator.clipboard.writeText(state.parentInviteCode);
    alert(state.language === 'en' ? "Invite Code copied!" : "คัดลอกรหัส Invite Code แล้ว!");
  });

  // Settings actions
  document.getElementById('settings-consent-quiz').addEventListener('change', handleSettingsConsentChange);
  document.getElementById('settings-consent-ai').addEventListener('change', handleSettingsConsentChange);
  const settingsConsentTS = document.getElementById('settings-consent-thinking-style');
  if (settingsConsentTS) {
    settingsConsentTS.addEventListener('change', handleSettingsConsentChange);
  }
  document.getElementById('settings-share-profile').addEventListener('change', handleSettingsConsentChange);
  document.getElementById('settings-share-report').addEventListener('change', handleSettingsConsentChange);
  document.getElementById('settings-share-marketplace').addEventListener('change', handleSettingsConsentChange);
  document.getElementById('btn-settings-export').addEventListener('click', exportData);
  document.getElementById('btn-settings-references').addEventListener('click', () => switchView('references'));
  const resetThinkingBtn = document.getElementById('btn-settings-reset-thinking');
  if (resetThinkingBtn) {
    resetThinkingBtn.addEventListener('click', resetThinkingStyleData);
  }
  document.getElementById('btn-settings-reset').addEventListener('click', resetAllData);
  document.getElementById('btn-save-api-key').addEventListener('click', handleSaveApiKey);
  
  // Custom Chat Actions
  const sendBtn = document.getElementById('ai-chat-send-btn');
  const chatInput = document.getElementById('ai-chat-input');
  if (sendBtn && chatInput) {
    sendBtn.addEventListener('click', handleCustomChatSubmit);
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleCustomChatSubmit();
      }
    });
  }
  
  // Sidebar actions
  document.getElementById('btn-sidebar-export').addEventListener('click', exportData);

  // Auth Tab Toggles
  const tabLoginBtn = document.getElementById('tab-login-btn');
  const tabRegisterBtn = document.getElementById('tab-register-btn');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  if (tabLoginBtn && tabRegisterBtn && loginForm && registerForm) {
    tabLoginBtn.addEventListener('click', () => {
      tabLoginBtn.classList.add('active');
      tabRegisterBtn.classList.remove('active');
      loginForm.style.display = 'flex';
      registerForm.style.display = 'none';
    });

    tabRegisterBtn.addEventListener('click', () => {
      tabRegisterBtn.classList.add('active');
      tabLoginBtn.classList.remove('active');
      registerForm.style.display = 'flex';
      loginForm.style.display = 'none';
    });
  }

  // Login Form Submission
  const loginFormEl = document.getElementById('login-form');
  if (loginFormEl) {
    loginFormEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const usernameInput = document.getElementById('login-username');
      const passwordInput = document.getElementById('login-password');
      if (!usernameInput || !passwordInput) return;

      const username = usernameInput.value.trim();
      const password = passwordInput.value;

      // Parent Invite Login lookup
      if (username.toUpperCase().startsWith('LM-')) {
        const inviteCode = username.toUpperCase();
        let foundStudent = null;
        let foundState = null;

        const usersDb = JSON.parse(localStorage.getItem('lifemap_users_db') || '{}');
        for (const u of Object.keys(usersDb)) {
          const studentStateStr = localStorage.getItem(`lifemap_state_${u}`);
          if (studentStateStr) {
            try {
              const studentState = JSON.parse(studentStateStr);
              if (studentState.parentInviteCode === inviteCode) {
                foundStudent = u;
                foundState = studentState;
                break;
              }
            } catch (e) {}
          }
        }

        // Also check guest
        if (!foundStudent) {
          const guestStateStr = localStorage.getItem('lifemap_state_v2');
          if (guestStateStr) {
            try {
              const guestState = JSON.parse(guestStateStr);
              if (guestState.parentInviteCode === inviteCode) {
                foundStudent = 'guest';
                foundState = guestState;
              }
            } catch (e) {}
          }
        }

        if (foundStudent) {
          localStorage.setItem('lifemap_logged_in_user', foundStudent);
          localStorage.setItem('lifemap_logged_in_role', 'parent');
          usernameInput.value = '';
          passwordInput.value = '';
          checkAuthStatus();
          alert(state.language === 'en' 
            ? `Logged in successfully as Parent of ${foundState.studentName || 'Student'}!` 
            : `เข้าสู่ระบบสำเร็จในฐานะผู้ปกครองของ คุณ ${foundState.studentName || 'นักเรียน'}!`);
        } else {
          alert(state.language === 'en' ? "Invite code not found!" : "ไม่พบรหัสคำเชิญนี้ในระบบ!");
        }
        return;
      }

      const usersDb = JSON.parse(localStorage.getItem('lifemap_users_db') || '{}');
      const user = usersDb[username.toLowerCase()];

      if (user && user.password === password) {
        // If the logged in user has no saved state, copy guest state to them!
        const userSaved = localStorage.getItem(`lifemap_state_${user.username}`);
        if (!userSaved) {
          const hasGuestData = state.studentName || Object.keys(state.answers).length > 0;
          if (hasGuestData) {
            localStorage.setItem(`lifemap_state_${user.username}`, JSON.stringify(state));
            localStorage.removeItem('lifemap_state_v2');
          }
        }

        localStorage.setItem('lifemap_logged_in_user', user.username);
        localStorage.setItem('lifemap_logged_in_role', 'student'); // set student role explicitly
        usernameInput.value = '';
        passwordInput.value = '';
        checkAuthStatus();
        alert(state.language === 'en' ? `Welcome back, ${user.username}!` : `ยินดีต้อนรับกลับมา, คุณ ${user.username}!`);
      } else {
        alert(state.language === 'en' ? "Incorrect username or password!" : "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง!");
      }
    });
  }

  // Register Form Submission
  const registerFormEl = document.getElementById('register-form');
  if (registerFormEl) {
    registerFormEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const usernameInput = document.getElementById('register-username');
      const passwordInput = document.getElementById('register-password');
      const confirmInput = document.getElementById('register-confirm-password');
      if (!usernameInput || !passwordInput || !confirmInput) return;

      const username = usernameInput.value.trim();
      const password = passwordInput.value;
      const confirmPassword = confirmInput.value;

      if (password !== confirmPassword) {
        alert(state.language === 'en' ? "Passwords do not match!" : "รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน!");
        return;
      }

      const usersDb = JSON.parse(localStorage.getItem('lifemap_users_db') || '{}');
      if (usersDb[username.toLowerCase()]) {
        alert(state.language === 'en' ? "This username is already taken!" : "ชื่อผู้ใช้งานนี้ถูกใช้งานไปแล้ว!");
        return;
      }

      // Save credentials
      usersDb[username.toLowerCase()] = { username, password };
      localStorage.setItem('lifemap_users_db', JSON.stringify(usersDb));

      // Login
      localStorage.setItem('lifemap_logged_in_user', username);

      // Copy guest state to new user if they have completed onboarding/quiz
      const hasGuestData = state.studentName || Object.keys(state.answers).length > 0;
      if (hasGuestData) {
        // Keep current state but save to user's database
        localStorage.setItem(`lifemap_state_${username}`, JSON.stringify(state));
        // Clear guest state
        localStorage.removeItem('lifemap_state_v2');
      } else {
        state = { ...initialState };
        saveState();
      }

      usernameInput.value = '';
      passwordInput.value = '';
      confirmInput.value = '';

      checkAuthStatus();
      alert(state.language === 'en' ? "Registration successful! Saved your Life Profile and unlocked full access." : "ลงทะเบียนบัญชีสำเร็จ! บันทึก Life Profile และเชื่อมต่อระบบการเรียนรู้เรียบร้อย");
    });
  }

  // Forgot Password Flow
  const forgotForm = document.getElementById('forgot-form');
  const btnShowForgot = document.getElementById('btn-show-forgot');
  const btnForgotBack = document.getElementById('btn-forgot-back');
  const btnForgotSendOtp = document.getElementById('btn-forgot-send-otp');
  const btnForgotVerifyOtp = document.getElementById('btn-forgot-verify-otp');
  const forgotStep1 = document.getElementById('forgot-step-1');
  const forgotStep2 = document.getElementById('forgot-step-2');
  const forgotStep3 = document.getElementById('forgot-step-3');
  const authTabs = document.querySelector('.auth-tabs');

  if (btnShowForgot && forgotForm && loginForm && registerForm && authTabs) {
    btnShowForgot.addEventListener('click', () => {
      loginForm.style.display = 'none';
      registerForm.style.display = 'none';
      forgotForm.style.display = 'flex';
      authTabs.style.display = 'none';
      
      // Reset steps
      forgotStep1.style.display = 'block';
      forgotStep2.style.display = 'none';
      forgotStep3.style.display = 'none';
      
      const usernameInput = document.getElementById('forgot-username');
      if (usernameInput) usernameInput.value = '';
    });
  }

  if (btnForgotBack && forgotForm && loginForm && authTabs && tabLoginBtn && tabRegisterBtn) {
    btnForgotBack.addEventListener('click', () => {
      forgotForm.style.display = 'none';
      loginForm.style.display = 'flex';
      authTabs.style.display = 'flex';
      tabLoginBtn.classList.add('active');
      tabRegisterBtn.classList.remove('active');
    });
  }

  if (btnForgotSendOtp && forgotStep1 && forgotStep2) {
    btnForgotSendOtp.addEventListener('click', () => {
      const usernameInput = document.getElementById('forgot-username');
      if (!usernameInput) return;
      const username = usernameInput.value.trim();

      if (!username) {
        alert(state.language === 'en' ? "Please enter your username or email!" : "กรุณากรอกชื่อผู้ใช้งานหรืออีเมล!");
        return;
      }

      const usersDb = JSON.parse(localStorage.getItem('lifemap_users_db') || '{}');
      if (!usersDb[username.toLowerCase()]) {
        alert(state.language === 'en' ? "Username or email not found in the system!" : "ไม่พบชื่อผู้ใช้งานหรืออีเมลนี้ในระบบ!");
        return;
      }

      forgotForm.dataset.recoveryUser = username;
      forgotStep1.style.display = 'none';
      forgotStep2.style.display = 'block';
      alert(state.language === 'en' ? "A simulated OTP has been sent to your email.\n(Enter code: 8888 to unlock)" : "ระบบจำลองได้ส่งรหัส OTP ไปยังอีเมลของท่านแล้ว\n(กรอกรหัสผ่านทางผ่าน: 8888 เพื่อปลดล็อก)");
    });
  }

  if (btnForgotVerifyOtp && forgotStep2 && forgotStep3) {
    btnForgotVerifyOtp.addEventListener('click', () => {
      const otpInput = document.getElementById('forgot-otp');
      if (!otpInput) return;
      const otp = otpInput.value.trim();

      if (otp === "8888") {
        forgotStep2.style.display = 'none';
        forgotStep3.style.display = 'block';
        otpInput.value = '';
      } else {
        alert(state.language === 'en' ? "Invalid OTP. Please enter 8888 for simulation recovery." : "รหัส OTP ไม่ถูกต้อง กรุณากรอกรหัส 8888 สำหรับการจำลองกู้คืน");
      }
    });
  }

  if (forgotForm) {
    forgotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newPasswordInput = document.getElementById('forgot-new-password');
      const confirmNewPasswordInput = document.getElementById('forgot-confirm-new-password');
      if (!newPasswordInput || !confirmNewPasswordInput) return;

      const newPassword = newPasswordInput.value;
      const confirmNewPassword = confirmNewPasswordInput.value;

      if (newPassword !== confirmNewPassword) {
        alert(state.language === 'en' ? "New passwords do not match!" : "รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน!");
        return;
      }

      const username = forgotForm.dataset.recoveryUser;
      if (!username) {
        alert(state.language === 'en' ? "Password recovery session expired. Please start over." : "เซสชันกู้คืนรหัสผ่านหมดอายุ กรุณาเริ่มต้นใหม่");
        return;
      }

      const usersDb = JSON.parse(localStorage.getItem('lifemap_users_db') || '{}');
      if (usersDb[username.toLowerCase()]) {
        usersDb[username.toLowerCase()].password = newPassword;
        localStorage.setItem('lifemap_users_db', JSON.stringify(usersDb));
        
        newPasswordInput.value = '';
        confirmNewPasswordInput.value = '';
        
        // Go back to login
        forgotForm.style.display = 'none';
        loginForm.style.display = 'flex';
        authTabs.style.display = 'flex';
        tabLoginBtn.classList.add('active');
        tabRegisterBtn.classList.remove('active');
        
        alert(state.language === 'en' ? "Password changed successfully! Please log in with your new password." : "เปลี่ยนรหัสผ่านสำเร็จแล้ว! กรุณาเข้าสู่ระบบด้วยรหัสผ่านใหม่");
      } else {
        alert(state.language === 'en' ? "Error: User account not found for update." : "เกิดข้อผิดพลาด: ไม่พบบัญชีผู้ใช้ในการอัปเดต");
      }
    });
  }

  // Logout Actions
  const handleLogout = async () => {
    const confirmed = await showBrandConfirm(state.language === 'en' ? "Are you sure you want to log out?" : "คุณต้องการออกจากระบบหรือไม่?");
    if (confirmed) {
      if (typeof liff !== 'undefined' && liff.isLoggedIn()) {
        try {
          liff.logout();
          console.log("LINE LIFF logged out.");
        } catch (e) {
          console.error("Error logging out of LIFF:", e);
        }
      }
      localStorage.removeItem('lifemap_logged_in_user');
      localStorage.removeItem('lifemap_logged_in_role');
      localStorage.removeItem('lifemap_state_v2');
      localStorage.removeItem('lifemap_v2_view');
      state = { ...initialState };
      
      // Reset sidebar avatar image to default icon
      const avatarDiv = document.querySelector('.student-profile-widget .avatar');
      if (avatarDiv) {
        avatarDiv.innerHTML = `<i data-lucide="user"></i>`;
        if (window.lucide) {
          window.lucide.createIcons();
        }
      }
      
      checkAuthStatus();
    }
  };

  const sidebarLogoutBtn = document.getElementById('btn-sidebar-logout');
  if (sidebarLogoutBtn) {
    sidebarLogoutBtn.addEventListener('click', handleLogout);
  }

  const settingsLogoutBtn = document.getElementById('btn-settings-logout');
  if (settingsLogoutBtn) {
    settingsLogoutBtn.addEventListener('click', handleLogout);
  }

  // Horoscope interactive actions
  const constellationEl = document.getElementById('horoscope-constellation');
  if (constellationEl) {
    constellationEl.addEventListener('click', () => {
      const val = constellationEl.textContent.trim();
      if (!val) return;
      const profile = computeProfile(state.answers);
      const question = `อยากรู้ความหมายของดวงดาววิสัยทัศน์ "${val}" ของฉัน`;
      const payload = `ฉันเป็น Archetype ${profile?.archetype || ''} และมีดวงดาวประจำวิสัยทัศน์คือ "${val}" ช่วยอธิบายความหมายของดวงดาวนี้ในแง่ของวิสัยทัศน์และแนวทางการพัฒนาตัวเองของฉันให้ละเอียดทีครับ/ค่ะ`;
      sendUserMessage(question, payload);
      scrollToChat();
    });
  }

  const luckySkillEl = document.getElementById('horoscope-lucky-skill');
  if (luckySkillEl) {
    luckySkillEl.addEventListener('click', () => {
      const val = luckySkillEl.textContent.trim();
      if (!val) return;
      const profile = computeProfile(state.answers);
      const question = `สกิลนำโชคสัปดาห์นี้ "${val}" จะเอาไปประยุกต์ใช้ยังไงได้บ้าง?`;
      const payload = `ฉันเป็น Archetype ${profile?.archetype || ''} และมีสกิลนำโชคสัปดาห์นี้คือ "${val}" ช่วยแนะนำวิธีฝึกฝน พัฒนา หรือนำสกิลนี้ไปใช้จริงในชั้นเรียนหรือการเตรียมตัวในอนาคตทีครับ/ค่ะ`;
      sendUserMessage(question, payload);
      scrollToChat();
    });
  }

  const ritualEl = document.getElementById('horoscope-ritual');
  if (ritualEl) {
    ritualEl.addEventListener('click', () => {
      const val = ritualEl.textContent.trim();
      if (!val) return;
      const profile = computeProfile(state.answers);
      const question = `ช่วยแนะนำแนวทางทำกิจวัตรเสริมพลังบวก "${val}" หน่อยครับ/ค่ะ`;
      const payload = `ฉันได้รับการแนะนำกิจวัตรเสริมพลังบวกคือ "${val}" ช่วยแนะแนวทางปฏิบัติ วิธีการเริ่มต้น และความสำคัญของกิจวัตรนี้ที่จะช่วยเสริมพลังบวกในการเรียนและชีวิตประจำวันของฉันทีครับ/ค่ะ`;
      sendUserMessage(question, payload);
      scrollToChat();
    });
  }

  // Language Toggle Action
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', toggleLanguage);
  }

  // Share Progress Action
  const shareRankBtn = document.getElementById('btn-dash-share-rank');
  if (shareRankBtn) {
    shareRankBtn.addEventListener('click', () => {
      const isEn = state.language === 'en';
      const progressData = calculateSelfExplorationProgress();
      if (isEn) {
        alert(`Shared! Your self-exploration progress on LifeMap is currently ${progressData.percent}%!`);
      } else {
        alert(`แชร์สำเร็จ! ความคืบหน้าการสำรวจตัวเองของคุณใน LifeMap อยู่ที่ ${progressData.percent}%!`);
      }
    });
  }

  // Helper to perform LINE share dynamically (using LIFF shareTargetPicker or Web sharing URL)
  const performLineShare = (shareText, shareUrl) => {
    if (typeof liff !== 'undefined' && liff.isLoggedIn() && liff.isApiAvailable('shareTargetPicker')) {
      liff.shareTargetPicker([
        {
          type: "text",
          text: shareText + "\n" + shareUrl
        }
      ])
      .then((res) => {
        if (res) {
          alert(state.language === 'en' ? 'Shared successfully!' : 'แชร์ไปยัง LINE สำเร็จแล้ว!');
        } else {
          console.log('LINE Share target picker closed');
        }
      })
      .catch((err) => {
        console.error('Error sharing via LIFF shareTargetPicker:', err);
        // Fallback to direct LINE schema link (safe for inside LINE app)
        const lineUrl = `https://line.me/R/share?text=${encodeURIComponent(shareText + "\n" + shareUrl)}`;
        window.open(lineUrl, '_blank');
      });
    } else {
      // Normal browser sharing via direct LINE schema link
      const lineUrl = `https://line.me/R/share?text=${encodeURIComponent(shareText + "\n" + shareUrl)}`;
      window.open(lineUrl, '_blank');
    }
  };

  // LINE Share Dashboard Action
  const btnDashShareLine = document.getElementById('btn-dash-share-line');
  if (btnDashShareLine) {
    btnDashShareLine.addEventListener('click', () => {
      const isEn = state.language === 'en';
      const progressData = calculateSelfExplorationProgress();
      const profile = computeProfile(state.answers);
      const archetypeText = profile 
        ? (profile.archetype[state.language || 'th'] || profile.archetype)
        : (isEn ? "Not Explored" : "ยังไม่ได้ทำแบบทดสอบ");
      
      const shareUrl = window.location.origin + window.location.pathname + (state.campaignCode ? `?campaign=${encodeURIComponent(state.campaignCode)}` : "");
      
      const shareText = isEn
        ? `My self-exploration progress on LifeMap is currently ${progressData.percent}%! My Career Archetype is: ${archetypeText}. Explore yours at: `
        : `ความคืบหน้าการสำรวจตัวเองของฉันใน LifeMap อยู่ที่ ${progressData.percent}%! และได้สไตล์อาชีพเด่นเป็น: ${archetypeText}. มาร่วมค้นหาและวางแผนอนาคตไปกับฉันได้ที่นี่เลย: `;
        
      performLineShare(shareText, shareUrl);
    });
  }

  // LINE Share Guest Action
  const btnGuestShareLine = document.getElementById('btn-guest-share-line');
  if (btnGuestShareLine) {
    btnGuestShareLine.addEventListener('click', () => {
      const isEn = state.language === 'en';
      const profile = computeProfile(state.answers);
      const archetypeText = profile 
        ? (profile.archetype[state.language || 'th'] || profile.archetype)
        : "";
      
      const shareUrl = window.location.origin + window.location.pathname + (state.campaignCode ? `?campaign=${encodeURIComponent(state.campaignCode)}` : "");
      
      const shareText = isEn
        ? `I scanned and explored my future career strengths on LifeMap and got Archetype: ${archetypeText}! Take the quiz and map your own future at: `
        : `ฉันสแกนค้นหาจุดแข็งและแนวโน้มสไตล์อาชีพของตัวเองบน LifeMap ได้ Archetype: ${archetypeText}! ลองมาร่วมเล่นควิซสั้นๆ เพื่อรู้จักจุดแข็งตัวคุณเองได้เลยที่: `;
        
      performLineShare(shareText, shareUrl);
    });
  }

  // Password Visibility Toggle
  document.querySelectorAll('.btn-toggle-password').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent focus loss or form issues
      const wrapper = btn.closest('.input-wrapper');
      if (!wrapper) return;
      const input = wrapper.querySelector('input');
      if (!input) return;
      
      if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = '<i data-lucide="eye-off" class="eye-icon"></i>';
      } else {
        input.type = 'password';
        btn.innerHTML = '<i data-lucide="eye" class="eye-icon"></i>';
      }
      if (window.lucide) {
        window.lucide.createIcons();
      }
    });
  });

  // References Search Action
  const refSearch = document.getElementById('ref-search-input');
  if (refSearch) {
    refSearch.addEventListener('input', (e) => {
      renderReferencesTab(e.target.value);
    });
  }

  // Daily Spark Emoji Clicks
  document.querySelectorAll('#dash-emoji-row .emoji-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const todayStr = new Date().toISOString().split('T')[0];
      if (state.lastCheckInDate === todayStr) {
        return; // Already checked in
      }

      const mood = btn.dataset.mood;
      // Increment streak
      state.streakCount = (state.streakCount || 0) + 1;
      state.lastCheckInDate = todayStr;
      
      // Reward tokens
      state.tokens = (state.tokens || 0) + 5;
      
      // Add a entry to checkIns so it counts towards unlocking Growth Review
      state.checkIns.push({
        date: todayStr,
        missionId: `daily-spark-${todayStr}`,
        mood: mood,
        rating: 5,
        evidence: `Daily spark check-in: feeling ${mood}`
      });

      saveState();
      
      // Trigger animations and updates
      alert(state.language === 'en' 
        ? "Awesome! +5 Tokens earned and streak updated!" 
        : "สุดยอด! ได้รับ +5 Tokens และเพิ่มวันสะสมเช็คอินสำเร็จ!");
        
      updateDashboardUI();
    });
  });

  // Welcome View Actions
  const btnWelcomeExplore = document.getElementById('btn-welcome-explore');
  if (btnWelcomeExplore) {
    btnWelcomeExplore.addEventListener('click', () => {
      document.getElementById('view-auth').classList.remove('active');
      document.getElementById('view-onboarding').classList.add('active');
      updateGradePersonalizationUI("m4");
    });
  }

  const btnWelcomeLogin = document.getElementById('btn-welcome-login');
  if (btnWelcomeLogin) {
    btnWelcomeLogin.addEventListener('click', () => {
      document.getElementById('welcome-panel').style.display = 'none';
      document.getElementById('auth-form-container').style.display = 'block';
      // select login tab by default
      const loginTab = document.getElementById('tab-login-btn');
      if (loginTab) loginTab.click();
    });
  }

  const btnWelcomeSchool = document.getElementById('btn-welcome-school');
  const schoolCodePanel = document.getElementById('school-code-panel');
  if (btnWelcomeSchool && schoolCodePanel) {
    btnWelcomeSchool.addEventListener('click', () => {
      schoolCodePanel.style.display = schoolCodePanel.style.display === 'none' ? 'block' : 'none';
    });
  }

  const btnSubmitSchoolCode = document.getElementById('btn-submit-school-code');
  if (btnSubmitSchoolCode) {
    btnSubmitSchoolCode.addEventListener('click', () => {
      const codeInput = document.getElementById('school-code-input');
      const codeVal = codeInput ? codeInput.value.trim() : "";
      if (codeVal) {
        state.campaignCode = codeVal;
        const obCampaign = document.getElementById('ob-campaign');
        if (obCampaign) obCampaign.value = codeVal;
        saveState();
      }
      // Go to onboarding
      document.getElementById('view-auth').classList.remove('active');
      document.getElementById('view-onboarding').classList.add('active');
      updateGradePersonalizationUI("m4");
    });
  }

  const btnAuthBack = document.getElementById('btn-auth-back');
  if (btnAuthBack) {
    btnAuthBack.addEventListener('click', () => {
      document.getElementById('auth-form-container').style.display = 'none';
      document.getElementById('welcome-panel').style.display = 'block';
    });
  }

  const btnGuestSaveProfile = document.getElementById('btn-guest-save-profile');
  if (btnGuestSaveProfile) {
    btnGuestSaveProfile.addEventListener('click', () => {
      // Hides results and goes to auth view registration
      document.getElementById('view-quiz-tab').classList.remove('active');
      document.getElementById('view-auth').classList.add('active');
      document.getElementById('welcome-panel').style.display = 'none';
      document.getElementById('auth-form-container').style.display = 'block';
      // Select registration tab
      const registerTab = document.getElementById('tab-register-btn');
      if (registerTab) registerTab.click();
    });
  }
}

// --- TRANSLATION SYSTEM (i18n) ---
export const translations = {
  th: {
    // Welcome Panel & Guest mode
    "welcome-title": "LifeMap Future Profile",
    "welcome-desc": "แพลตฟอร์มช่วยนักเรียนค้นหาจุดแข็ง วางแผนอนาคต และเลือกก้าวถัดไปที่เหมาะกับตัวเอง",
    "welcome-val-1": "รู้จักจุดแข็งของตัวเอง",
    "welcome-val-2": "เห็นแนวทางอนาคตที่น่าลอง",
    "welcome-val-3": "ได้ก้าวเล็ก ๆ ที่ทำได้จริงใน 7 วัน",
    "welcome-btn-explore": "เริ่มสำรวจตัวเอง",
    "welcome-btn-liff": "เข้าสู่ระบบด้วย LINE",
    "welcome-btn-login": "เข้าสู่ระบบ / ลงทะเบียน",
    "welcome-btn-school": "เข้าใช้งานด้วยรหัสกิจกรรม / QR โรงเรียน",
    "welcome-school-label": "ระบุรหัสกิจกรรมหรือแคมเปญ:",
    "welcome-school-submit": "ตกลง",
    "welcome-privacy-note-1": "ผลลัพธ์เป็นเพียงภาพสะท้อนจากคำตอบของคุณ ไม่ใช่คำตัดสินอนาคต",
    "welcome-privacy-note-2": "เราจะใช้ข้อมูลของคุณเพื่อสร้าง Life Profile และคำแนะนำเบื้องต้นเท่านั้น คุณสามารถเลือกบันทึกหรือลบข้อมูลได้ภายหลัง",
    "guest-save-title": "บันทึก Life Profile ของฉัน",
    "guest-save-desc": "คุณได้สำรวจจุดแข็งและ Archetype ของคุณเรียบร้อยแล้ว! บันทึกผลลัพธ์นี้เพื่อเปิดใช้งานบอร์ดภารกิจ 7 วัน และบันทึกประวัติการพัฒนาตัวเองต่อไป",
    "guest-save-btn": "บันทึก Life Profile ของฉัน",
    "welcome-campaign-badge": "เข้าร่วมกิจกรรมโรงเรียน: ",
    "dash-share-line-label": "LINE Share",
    "dash-share-line-desc": "แชร์ความก้าวหน้าการสะท้อนจุดแข็งของคุณลงกลุ่มแชท LINE",
    "dash-share-line-btn": "แชร์จุดแข็งของฉันไปยัง LINE",
    "guest-share-line-btn": "แชร์ไปยัง LINE",

    // Navigation / Sidebar
    "nav-dashboard": "แดชบอร์ด",
    "nav-quiz": "Life Profile",
    "nav-missions": "ภารกิจ 7 วัน",
    "nav-review": "Growth Review",
    "nav-parent": "Parent Link",
    "nav-marketplace": "Opportunities",
    "nav-settings": "ตั้งค่าระบบ",
    "nav-logout": "ออกจากระบบ",
    "sidebar-tokens-label": "Tokens:",
    "sidebar-progress-label": "ความคืบหน้าการสำรวจตัวเอง",
    
    // Top Header & Headings
    "header-dashboard-title": "Dashboard",
    "header-dashboard-subtitle": "ยินดีต้อนรับกลับสู่เส้นทางอนาคตของคุณ",
    "header-quiz-title": "Life Profile",
    "header-quiz-subtitle": "ภาพสะท้อนจุดแข็ง สไตล์การเรียนรู้ และแนวโน้มสไตล์ที่ใช่ของคุณ",
    "header-missions-title": "7-Day Growth Missions",
    "header-missions-subtitle": "ท้าทายภารกิจเล็ก ๆ รายวันเพื่อสะสมประวัติผลงานใน Future Profile ของคุณ",
    "missions-title": "ภารกิจทดลอง 7 วัน",
    "missions-desc": "แปลงผลลัพธ์ของจุดแข็งให้กลายเป็นภารกิจลงมือทำจริง วันละ 1 กิจกรรม เพื่อสะสมหลักฐานใน Future Profile",
    "header-review-title": "Growth Review",
    "header-review-subtitle": "ประเมินการพัฒนาตนเองจากการเช็คอินและบันทึกสะท้อนคิด",
    "header-parent-title": "Parent Link",
    "header-parent-subtitle": "แชร์ข้อมูลและสร้างความเข้าใจในการเติบโตในครอบครัว",
    "header-marketplace-title": "Opportunities",
    "header-marketplace-subtitle": "คัดสรรโอกาสทางวิชาการ กิจกรรม และทุนการศึกษาที่เหมาะกับคุณ",
    "header-settings-title": "Settings",
    "header-settings-subtitle": "จัดการข้อมูลส่วนบุคคลและการยินยอมด้านความปลอดภัย",

    // Authentication View
    "auth-title": "LifeMap Future Profile",
    "auth-subtitle": "แพลตฟอร์มช่วยนักเรียนค้นหาจุดแข็ง วางแผนอนาคต และเลือกก้าวถัดไปที่เหมาะกับตัวเอง",
    "auth-tab-login": "เข้าสู่ระบบ",
    "auth-tab-register": "ลงทะเบียนใหม่",
    "auth-login-btn": "เข้าสู่ระบบ",
    "auth-register-btn": "ลงทะเบียนบัญชีใหม่",
    "auth-label-username": "ชื่อผู้ใช้หรืออีเมล",
    "auth-label-password": "รหัสผ่าน",
    "auth-placeholder-username": "กรอกชื่อผู้ใช้งานหรืออีเมล",
    "auth-placeholder-password": "กรอกรหัสผ่าน",
    "auth-placeholder-confirm": "ยืนยันรหัสผ่านอีกครั้ง",
    "auth-forgot-link": "ลืมรหัสผ่าน?",
    
    // Forgot Password Form
    "forgot-title": "กู้คืนรหัสผ่าน",
    "forgot-step1-desc": "กรอกชื่อผู้ใช้งานหรืออีเมลเพื่อรับรหัสผ่าน OTP ยืนยันสิทธิ์",
    "forgot-send-otp": "ส่งรหัส OTP",
    "forgot-step2-desc": "กรอกรหัส OTP 4 หลักที่ส่งไปยังกล่องข้อความจำลองของคุณ",
    "forgot-placeholder-otp": "กรอกรหัส OTP (จำลอง: 8888)",
    "forgot-verify-otp": "ตรวจสอบรหัส OTP",
    "forgot-step3-desc": "ตั้งรหัสผ่านใหม่สำหรับเข้าใช้งานระบบ",
    "forgot-placeholder-new": "รหัสผ่านใหม่",
    "forgot-placeholder-new-confirm": "ยืนยันรหัสผ่านใหม่",
    "forgot-submit-btn": "อัปเดตรหัสผ่านใหม่",
    "forgot-back": "กลับไปหน้าเข้าสู่ระบบ",

    // Onboarding Form
    "ob-welcome": "ยินดีต้อนรับสู่ LifeMap!",
    "ob-welcome-desc": "ยินดีต้อนรับสู่ก้าวแรกของการค้นหาตัวเองอย่างปลอดภัยและสนุกสนาน เรามาตั้งค่าโปรไฟล์เบื้องต้นของคุณกันครับ/ค่ะ",
    "ob-label-name": "ชื่อเล่นหรือชื่อที่คุณอยากให้ AI Guide เรียกคุณ",
    "ob-placeholder-name": "ตัวอย่าง: พิมพ์ชนก",
    "ob-label-school": "โรงเรียนที่คุณศึกษาอยู่ในปัจจุบัน",
    "ob-placeholder-school": "ตัวอย่าง: โรงเรียนเตรียมอุดมศึกษา",
    "ob-label-grade": "ระดับชั้นเรียนปัจจุบันของคุณ",
    "ob-grade-m4": "ม.4",
    "ob-grade-m4-desc": "เริ่มค้นหาตัวเองสบายๆ",
    "ob-grade-m5": "ม.5",
    "ob-grade-m5-desc": "เทียบสายและเก็บสะสมผลงาน",
    "ob-grade-m6": "ม.6",
    "ob-grade-m6-desc": "จัดอันดับคณะและเตรียมสมัคร",
    "ob-grade-pvc": "ปวช.",
    "ob-grade-pvc-desc": "เน้นทักษะวิชาชีพและฝึกงานจริง",
    "ob-grade-pvs": "ปวส.",
    "ob-grade-pvs-desc": "ต่อยอดฝีมือชั้นสูงเตรียมทำงาน",
    "ob-grade-uni": "มหาวิทยาลัย",
    "ob-grade-uni-desc": "ฝึกงานและสร้างโพรไฟล์วิชาชีพ",
    "ob-grade-work": "วัยทำงาน",
    "ob-grade-work-desc": "ประเมินทักษะและโอกาสก้าวหน้า",
    "ob-label-tone": "น้ำเสียงของ AI Guide ที่คุณชอบ",
    "ob-tone-supportive": "🌱 ให้กำลังใจ อบอุ่น และเป็นมิตร",
    "ob-tone-analytical": "⭐ อิงข้อมูล เหตุผล และเป็นระบบ",
    "ob-tone-direct": "⚡ ตรงไปตรงมา กระชับ และเน้นทำจริง",
    "ob-label-campaign": "รหัสแคมเปญกิจกรรมของโรงเรียน (ถ้ามี)",
    "ob-placeholder-campaign": "ตัวอย่าง: SCHOOL-BKK",
    "ob-consent-title": "นโยบายการคุ้มครองความเป็นส่วนตัวนักเรียน (PDPA Consent)",
    "ob-consent-profile": "ฉันยินยอมให้เก็บข้อมูล Life Profile และวิเคราะห์จุดแข็งเพื่อแสดงผลในหน้าส่วนตัว",
    "ob-consent-quiz": "ฉันยินยอมให้ประมวลผลคะแนนคำตอบแบบสำรวจความสนใจทางอาชีพ",
    "ob-consent-ai": "ฉันยินยอมให้ AI Companion ช่วยวิเคราะห์และให้คำปรึกษาตอบคำถามของฉัน",
    "ob-consent-parent": "ฉันยินยอมให้สามารถแชร์รหัสเชิญข้อมูลจุดแข็งกับผู้ปกครองแบบจำกัดเพื่อการสื่อสารที่ดีขึ้น",
    "ob-consent-marketplace": "ฉันยินยอมรับข่าวสารโอกาสและกิจกรรมฝึกงานที่แนะนำตามความสนใจ",
    "ob-submit-btn": "เริ่มสร้าง Future Profile",

    // Dashboard View
    "dash-pass-header-text": "FUTURE PROFILE",
    "dash-pass-lock-text": "ทำแบบสำรวจเพื่อรับตราความสำเร็จ",
    "dash-guide-title": "เข็มทิศและภารกิจก้าวถัดไป",
    "dash-ai-advisor": "AI Advisor",
    "dash-review-title": "ผลประเมินการเติบโต",
    "dash-review-status": "ทำภารกิจและเช็คอินให้ครบ 3 วันขึ้นไป เพื่อปลดล็อกรายงานมิติการเติบโตอย่างปลอดภัย",
    "dash-review-btn": "ดูรายละเอียด Growth Review",
    "dash-connections-title": "แชร์ความสำเร็จ & ตราอนาคต",
    "dash-parent-invite-label": "Parent Link",
    "dash-parent-invite-desc": "เชิญผู้ปกครองเพื่อเข้าชมข้อมูลจุดแข็งของคุณแบบสนับสนุน ไม่ก้าวก่าย",
    "dash-parent-copy-btn": "คัดลอกรหัส Invite Code",
    "dash-parent-go-btn": "ตั้งค่าการเชื่อมต่อ Parent Link",
    "dash-stamps-title": "บันทึกความสำเร็จ (Stamps ส่วนตัว)",
    
    // Quiz & Profile Tab
    "quiz-tab-title": "แบบสำรวจความสนใจและจุดแข็ง",
    "quiz-tab-reset-btn": "รีเซ็ตแบบสำรวจ",
    "quiz-intro-head": "แบบสำรวจความสนใจและจุดแข็งเบื้องต้น (6 ข้อ)",
    "quiz-start-btn": "เริ่มทำแบบสำรวจเลย",
    "quiz-back-btn": "ย้อนกลับข้อก่อนหน้า",
    "profile-title": "Holland RIASEC & Big Five Traits",
    "profile-desc": "ผลคะแนนสถิติโครงสร้างจุดแข็งของคุณจากการประมวลผลทางสถิติเบื้องต้น",
    "profile-archetype-label": "บุคลิกเด่น (Archetype)",
    "profile-strengths-label": "จุดแข็งเด่นของฉัน",
    "profile-learning-style-label": "สไตล์การเรียนรู้ที่แนะนำ",
    "profile-wellbeing-label": "ข้อคิดเห็นด้านสุขภาวะ (Wellbeing Tips)",
    "profile-next-moves-label": "ก้าวถัดไปที่แนะนำในการสำรวจ",
    "profile-radar-title": "Holland RIASEC Code",
    "profile-bigfive-title": "Big Five Trait Scores",
    "profile-ai-assistant-title": "AI Future Advisor (คุยกับระบบแนะแนว)",
    "profile-ai-assistant-desc": "สอบถามข้อแนะนำ ทิศทางการเรียนต่อ หรือเคล็ดลับการคุยกับครอบครัวด้านการเลือกคณะ",
    "profile-ai-placeholder": "ถามอะไร AI Guide ของคุณดี...",
    "profile-ai-send-btn": "ส่งข้อความ",
    
    // Missions View
    "missions-subtitle": "สะสมหลักฐานการลงมือทำผ่านกิจกรรมท้าทายเล็ก ๆ (ปัดซ้าย-ขวาเพื่อเลื่อนดูแผนที่ ↔)",
    "missions-metro-canvas-title": "LifeMap Future Station",
    "missions-evidence-upload-title": "อัปโหลดหลักฐานการลงมือทำจริง (Evidence Upload)",
    "missions-evidence-placeholder": "เขียนบรรยายผลลัพธ์การกระทำของคุณ หรือแปะลิงก์ผลงาน (เช่น google drive, portfolio)",
    "missions-checkin-title": "เช็คอินความก้าวหน้าและการเติบโต (Daily Check-in)",
    "missions-rating-label": "วันนี้ฉันประเมินพลังงานการเรียนรู้นี้ที่ระดับ:",
    "missions-checkin-placeholder": "ตอบคำถามสะท้อนคิดประจำวันข้างบนสั้น ๆ...",
    "missions-submit-btn": "บันทึกและส่งข้อมูลเช็คอิน",
    "missions-locked": "ภารกิจนี้จะปลดล็อกหลังจากเช็คอินวันก่อนหน้า",
    "missions-done": "เช็คอินภารกิจวันนี้เรียบร้อยแล้ว!",
    "missions-hint-title": "💡 ตัวอย่างการตอบ:",

    // Growth Review View
    "review-unlocked-title": "รายงานวิเคราะห์มิติการเติบโตรายวัน",
    "review-unlocked-desc": "สรุปคะแนนประเมินมิติการเรียนรู้จากการบันทึกสะท้อนคิดของตัวผู้เรียนเอง",
    "review-radar-title": "Growth Dimensions Radar",
    "review-insights-title": "ข้อมูลสะท้อนคิดส่วนบุคคลเชิงลึก (Personalized Insights)",

    // Parent Link View
    "parent-title": "ชวนที่บ้านเข้ามาดูโปรไฟล์เพื่อสร้างความเข้าใจที่ดีขึ้น",
    "parent-invite-header": "รหัสเข้าชมส่วนบุคคลสำหรับผู้ปกครอง",
    "parent-copy-invite": "คัดลอกรหัสเข้าชม",
    "parent-settings-title": "จัดการสิทธิ์การแสดงผลหน้าผู้ปกครอง (Parent View Permissions)",
    "parent-allow-profile": "อนุญาตให้เข้าดู Life Profile & Holland Archetype",
    "parent-allow-report": "อนุญาตให้เข้าดูคะแนน Growth Review & บันทึกสะท้อนคิดรายวัน",
    "parent-allow-marketplace": "อนุญาตให้เห็นโอกาสการเรียนรู้ที่ได้รับแนะนำ",

    // Rewards View
    "rewards-title": "LifeMap Opportunities Center",
    "rewards-balance-label": "ยอดคะแนนของคุณ",
    "rewards-history-title": "ประวัติการแลกสิทธิ์รับทุนสะสม",

    // Settings View
    "settings-personal-title": "จัดการข้อมูลส่วนตัว",
    "settings-personal-name": "ชื่อผู้ใช้แนะแนว",
    "settings-ob-grade": "ระดับชั้นเรียน",
    "settings-ob-tone": "สไตล์การแนะนำของ AI",
    "settings-ob-campaign": "รหัสแคมเปญ",
    "settings-api-key-label": "กรอกรหัส Google Gemini API Key ส่วนตัว (ทางเลือก)",
    "settings-api-key-desc": "ช่วยเชื่อมต่อคู่คิดแนะแนวให้ตอบกลับอย่างมีประสิทธิภาพและชาญฉลาดยิ่งขึ้น",
    "settings-api-key-placeholder": "ระบุ API Key ที่นี่...",
    "settings-api-key-save": "บันทึกคีย์",
    "settings-consent-title": "ความปลอดภัยทางข้อมูลและการยินยอมสิทธิ์ (Data Security & Consents)",
    "settings-data-mgmt-title": "จัดการสำรองและกู้คืนข้อมูลระบบ (Data Backups)",
    "settings-backup-desc": "ดาวน์โหลดข้อมูลคะแนนควิซ ภารกิจ และเหรียญรางวัลของคุณเก็บไว้ และสามารถนำกลับมาอัปโหลดใหม่ได้",
    "settings-btn-export": "ส่งออกข้อมูลสำรอง (Backup)",
    "settings-btn-references": "ดูแหล่งข้อมูลอ้างอิง (References)",
    "settings-btn-import": "อัปเดตข้อมูลสะสม",
    "settings-data-danger-title": "ล้างข้อมูลเพื่อเริ่มต้นใหม่ (Reset System)",
    "settings-btn-reset": "ล้างข้อมูลระบบทั้งหมด",
    "nav-references": "แหล่งอ้างอิง",
    "references-title": "แหล่งอ้างอิงแบบทดสอบ (References)",
    "references-subtitle": "ทฤษฎีและแหล่งอ้างอิงทางจิตวิทยาที่ใช้ศึกษาอ้างอิงในการพัฒนาแบบทดสอบและการประเมินในระบบ LifeMap",
  },
  en: {
    // Welcome Panel & Guest mode
    "welcome-title": "LifeMap Future Profile",
    "welcome-desc": "A platform that helps students discover strengths, plan the future, and choose the next steps tailored for themselves.",
    "welcome-val-1": "Discover your core strengths",
    "welcome-val-2": "Explore future career paths comfortably",
    "welcome-val-3": "Get action-oriented 7-day micro-missions",
    "welcome-btn-explore": "Start Self-Exploration",
    "welcome-btn-liff": "Login with LINE",
    "welcome-btn-login": "Login / Sign Up",
    "welcome-btn-school": "Access with school code / activity QR",
    "welcome-school-label": "Enter school code or campaign:",
    "welcome-school-submit": "Confirm",
    "welcome-privacy-note-1": "Results are reflections of your answers, not an absolute decision for your future.",
    "welcome-privacy-note-2": "We use your data solely to generate your Life Profile and recommendations. You can save or erase your data at any time.",
    "guest-save-title": "Save my Life Profile",
    "guest-save-desc": "You have completed your archetype and strengths exploration! Save your results now to unlock your 7-Day Growth Missions board and track your self-development logs.",
    "guest-save-btn": "Save my Life Profile",
    "welcome-campaign-badge": "Joined school event: ",
    "dash-share-line-label": "LINE Share",
    "dash-share-line-desc": "Share your self-exploration progress to LINE chat groups",
    "dash-share-line-btn": "Share my strengths to LINE",
    "guest-share-line-btn": "Share to LINE",

    // Navigation / Sidebar
    "nav-dashboard": "Dashboard",
    "nav-quiz": "Life Profile",
    "nav-missions": "7-Day Missions",
    "nav-review": "Growth Review",
    "nav-parent": "Parent Link",
    "nav-marketplace": "Opportunities",
    "nav-settings": "Settings",
    "nav-logout": "Logout",
    "sidebar-tokens-label": "Tokens:",
    "sidebar-progress-label": "Self-Exploration Progress",

    // Top Header & Headings
    "header-dashboard-title": "Dashboard",
    "header-dashboard-subtitle": "Welcome back to your future exploration path",
    "header-quiz-title": "Life Profile",
    "header-quiz-subtitle": "Reflecting your strengths, learning styles, and future career directions",
    "header-missions-title": "7-Day Growth Missions",
    "header-missions-subtitle": "Complete daily challenges to accumulate evidence in your Future Profile",
    "missions-title": "7-Day Growth Missions",
    "missions-desc": "Turn your strength discoveries into daily actionable missions, one challenge per day, to gather evidence in your Future Profile.",
    "header-review-title": "Growth Review",
    "header-review-subtitle": "Reflecting self-development from check-ins and reflection logs",
    "header-parent-title": "Parent Link",
    "header-parent-subtitle": "Share insights and foster supportive family conversations",
    "header-marketplace-title": "Opportunities",
    "header-marketplace-subtitle": "Academic activities, internships, and scholarships tailored for you",
    "header-settings-title": "Settings",
    "header-settings-subtitle": "Manage personal profile and security consent configurations",

    // Authentication View
    "auth-title": "LifeMap Future Profile",
    "auth-subtitle": "A platform that helps students discover strengths, plan the future, and choose the next steps tailored for themselves.",
    "auth-tab-login": "Login",
    "auth-tab-register": "Register",
    "auth-login-btn": "Log In",
    "auth-register-btn": "Create Account",
    "auth-label-username": "Username or Email",
    "auth-label-password": "Password",
    "auth-placeholder-username": "Enter username or email address",
    "auth-placeholder-password": "Enter password",
    "auth-placeholder-confirm": "Confirm Password",
    "auth-forgot-link": "Forgot Password?",

    // Forgot Password Form
    "forgot-title": "Reset Password",
    "forgot-step1-desc": "Enter your username or email to retrieve a simulation OTP code",
    "forgot-send-otp": "Send OTP Code",
    "forgot-step2-desc": "Enter the 4-digit OTP sent to your inbox simulation",
    "forgot-placeholder-otp": "Enter OTP code (Demo: 8888)",
    "forgot-verify-otp": "Verify OTP",
    "forgot-step3-desc": "Set your new password below",
    "forgot-placeholder-new": "New Password",
    "forgot-placeholder-new-confirm": "Confirm New Password",
    "forgot-submit-btn": "Update Password",
    "forgot-back": "Back to Login",

    // Onboarding Form
    "ob-welcome": "Welcome to LifeMap!",
    "ob-welcome-desc": "Welcome to the first step of your safe and exciting self-discovery journey. Let's set up your profile.",
    "ob-label-name": "Nickname or name you want AI Guide to call you",
    "ob-placeholder-name": "Example: Pimchanok",
    "ob-label-school": "Your current school name",
    "ob-placeholder-school": "Example: Triam Udom Suksa School",
    "ob-label-grade": "Your current academic grade level",
    "ob-grade-m4": "Grade 10",
    "ob-grade-m4-desc": "Explore interests comfortably",
    "ob-grade-m5": "Grade 11",
    "ob-grade-m5-desc": "Compare paths & build portfolio",
    "ob-grade-m6": "Grade 12",
    "ob-grade-m6-desc": "Rank majors & prepare apps",
    "ob-grade-pvc": "Voc. Cert.",
    "ob-grade-pvc-desc": "Vocational skills & internships",
    "ob-grade-pvs": "High Voc.",
    "ob-grade-pvs-desc": "Advanced skills & work prep",
    "ob-grade-uni": "University",
    "ob-grade-uni-desc": "Internships & professional profile",
    "ob-grade-work": "Working / Career",
    "ob-grade-work-desc": "Assess skills & career growth",
    "ob-label-tone": "Preferred AI Guide conversational tone style",
    "ob-tone-supportive": "🌱 Supportive, warm, and friendly",
    "ob-tone-analytical": "⭐ Data-driven, objective, and logical",
    "ob-tone-direct": "⚡ Direct, concise, and action-oriented",
    "ob-label-campaign": "School campaign activity code (optional)",
    "ob-placeholder-campaign": "Example: SCHOOL-BKK",
    "ob-consent-title": "Student Privacy and Data Protection Policy (PDPA Consent)",
    "ob-consent-profile": "I consent to store and analyze my Life Profile and strengths for personal display.",
    "ob-consent-quiz": "I consent to process my answers to analyze my vocational interest clusters.",
    "ob-consent-ai": "I consent to let the AI Guide analyze my profile and help answer my inquiries.",
    "ob-consent-parent": "I consent to generate a secure link to share my strengths with parents.",
    "ob-consent-marketplace": "I consent to receive recommendations for scholarships and events matching my profile.",
    "ob-submit-btn": "Create Future Profile",

    // Dashboard View
    "dash-pass-header-text": "FUTURE PROFILE",
    "dash-pass-lock-text": "Complete survey to unlock badge",
    "dash-guide-title": "Compass & Next Steps",
    "dash-ai-advisor": "AI Advisor",
    "dash-review-title": "Growth Review progress",
    "dash-review-status": "Complete missions and check-in for 3+ days to unlock safe self-development reports.",
    "dash-review-btn": "View Growth Review",
    "dash-connections-title": "Share Success & Future Stamps",
    "dash-parent-invite-label": "Parent Link",
    "dash-parent-invite-desc": "Invite parents to view your strengths in a supportive, non-intrusive way.",
    "dash-parent-copy-btn": "Copy Invite Code",
    "dash-parent-go-btn": "Manage Parent Link Connections",
    "dash-stamps-title": "Achievements (Stamps)",

    // Quiz & Profile Tab
    "quiz-tab-title": "Strengths Analysis Survey",
    "quiz-tab-reset-btn": "Reset Survey",
    "quiz-intro-head": "Interests & Strengths Discovery Survey (6 Qs)",
    "quiz-start-btn": "Start Survey Now",
    "quiz-back-btn": "Back to Previous Question",
    "profile-title": "Holland RIASEC & Big Five Traits",
    "profile-desc": "Statistical breakdown of your strengths profile based on quiz responses.",
    "profile-archetype-label": "Prominent Archetype",
    "profile-strengths-label": "My Core Strengths",
    "profile-learning-style-label": "Recommended Learning Style",
    "profile-wellbeing-label": "Wellbeing Advice & Tips",
    "profile-next-moves-label": "Recommended Next Exploration Moves",
    "profile-radar-title": "Holland RIASEC Code",
    "profile-bigfive-title": "Big Five Trait Scores",
    "profile-ai-assistant-title": "AI Future Advisor (Chat & Guidance)",
    "profile-ai-assistant-desc": "Ask about university options, study plans, or advice on discussing goals with family.",
    "profile-ai-placeholder": "Ask your AI Guide anything...",
    "profile-ai-send-btn": "Send Message",

    // Missions View
    "missions-subtitle": "Build your execution evidence with micro-challenges (Swipe left-right to move map ↔)",
    "missions-metro-canvas-title": "LifeMap Future Station Map",
    "missions-evidence-upload-title": "Evidence Upload (Real Actions)",
    "missions-evidence-placeholder": "Write a summary of your action or paste links to your artifacts (e.g., Google Drive, portfolio)",
    "missions-checkin-title": "Daily Check-in & Self-Reflection",
    "missions-rating-label": "I rate my learning energy today at level:",
    "missions-checkin-placeholder": "Answer the reflection prompt above briefly...",
    "missions-submit-btn": "Save and Submit Check-in",
    "missions-locked": "This mission unlocks after checking in the previous day.",
    "missions-done": "Mission completed for today!",
    "missions-hint-title": "💡 Example Response:",

    // Growth Review View
    "review-unlocked-title": "Daily Growth Dimensions Report",
    "review-unlocked-desc": "Summarizing self-development scores based on student reflection history",
    "review-radar-title": "Growth Dimensions Radar Chart",
    "review-insights-title": "Personalized Reflections & Insights",

    // Parent Link View
    "parent-title": "Invite family to view your profile for better support",
    "parent-invite-header": "Secure View Invite Code for Parents",
    "parent-copy-invite": "Copy Invite Code",
    "parent-settings-title": "Parent View Permissions Control",
    "parent-allow-profile": "Allow viewing Life Profile & Holland Archetype",
    "parent-allow-report": "Allow viewing Growth Review scores & daily reflection logs",
    "parent-allow-marketplace": "Allow viewing recommended academic opportunities",

    // Rewards View
    "rewards-title": "LifeMap Opportunities Center",
    "rewards-balance-label": "Your Balance",
    "rewards-history-title": "Redeemed Scholarships & Opportunity logs",

    // Settings View
    "settings-personal-title": "Edit Personal Profile Details",
    "settings-personal-name": "Explorer Username",
    "settings-ob-grade": "Grade Level Focus",
    "settings-ob-tone": "AI Advisor Response Tone",
    "settings-ob-campaign": "School Campaign Code",
    "settings-api-key-label": "Google Gemini API Key Connection (Optional)",
    "settings-api-key-desc": "Links your personal key to enjoy more intelligent, real-time responses.",
    "settings-api-key-placeholder": "Enter Gemini API Key here...",
    "settings-api-key-save": "Save API Key",
    "settings-consent-title": "Data Security & Consent Control Panel",
    "settings-data-mgmt-title": "System Data Backups & Recovery Tools",
    "settings-backup-desc": "Download your quiz scores, progress history, and stamps, or restore them here.",
    "settings-btn-export": "Export Backup File (JSON)",
    "settings-btn-references": "View References",
    "settings-btn-import": "Restore Backup File",
    "settings-data-danger-title": "Danger Zone (Full Reset)",
    "settings-btn-reset": "Erase All System Data",
    "nav-references": "References",
    "references-title": "References",
    "references-subtitle": "Psychological theories and sources referenced during the development of LifeMap assessments.",
  }
};

export function updateLanguageUI() {
  const lang = state.language || 'th';
  const dict = translations[lang] || translations.th;

  // Toggle language button text
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.textContent = lang === 'th' ? 'EN' : 'TH';
  }

  // Update elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const translation = dict[key];
    if (translation) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.setAttribute('placeholder', translation);
      } else if (el.hasAttribute('title') && key.endsWith('-title')) {
        el.setAttribute('title', translation);
      } else {
        // Save the icon if it exists to prevent wiping it out
        const icon = el.querySelector('i[data-lucide]');
        el.textContent = translation;
        if (icon) {
          el.insertBefore(icon, el.firstChild);
          el.insertBefore(document.createTextNode(' '), el.childNodes[1]);
        }
      }
    }
  });

  // Specifically translate onboarding tone choices
  const toneSelect = document.getElementById('ob-tone');
  if (toneSelect) {
    const tones = {
      supportive: dict["ob-tone-supportive"],
      analytical: dict["ob-tone-analytical"],
      direct: dict["ob-tone-direct"]
    };
    toneSelect.querySelectorAll('option').forEach(opt => {
      const val = opt.value;
      if (tones[val]) {
        opt.textContent = tones[val];
      }
    });
  }

  const settingsToneSelect = document.getElementById('settings-ob-tone');
  if (settingsToneSelect) {
    const tones = {
      supportive: dict["ob-tone-supportive"],
      analytical: dict["ob-tone-analytical"],
      direct: dict["ob-tone-direct"]
    };
    settingsToneSelect.querySelectorAll('option').forEach(opt => {
      const val = opt.value;
      if (tones[val]) {
        opt.textContent = tones[val];
      }
    });
  }
}

export function toggleLanguage() {
  state.language = state.language === 'th' ? 'en' : 'th';
  localStorage.setItem('lifemap_language', state.language);
  saveState();
  updateLanguageUI();
  
  // Re-render current tab to display dynamic content in correct language
  const currentView = localStorage.getItem('lifemap_v2_view') || 'dashboard';
  switchView(currentView);
}

// --- REFERENCES DATA & RENDERING SYSTEM ---
export const referencesData = [
  {
    category: { th: "ทฤษฎีการประเมินหลัก (Main Quiz Frameworks)", en: "Main Quiz Frameworks" },
    tests: [
      {
        name: { th: "แบบทดสอบบุคลิกภาพ 5 มิติ (Big Five Personality Test)", en: "Big Five Test" },
        citation: "Gosling, S.D., Snoop: What Your Stuff Says About You (London: Profile, 2008). Gosling, S.D., PJ. Rentfrow and W.B. Swann Jr. 'A very brief measure of the Big-Five personality domains', Journal of Research in Personality, 37(6) (2003)."
      },
      {
        name: { th: "ทฤษฎีรหัสเลือกอาชีพ RIASEC (Holland Codes)", en: "Holland Codes (RIASEC)" },
        citation: "Holland, John L. Making Vocational Choices: A Theory of Vocational Personalities and Work Environments (Prentice Hall, 1997)."
      }
    ]
  },
  {
    category: { th: "แบบทดสอบสติปัญญาและการเรียนรู้ (Intelligence & Learning)", en: "Intelligence & Learning" },
    tests: [
      {
        name: { th: "แบบทดสอบไอคิว (IQ Test)", en: "IQ Test" },
        citation: "Gürtler, D., Wir sind Elite. Das Bildungswunder (We are elite: the education miracle) (Gütersloh: Gütersloher Verlagshaus, 2009). www.iqcomparisonsite.com/occupations.aspx"
      },
      {
        name: { th: "แบบทดสอบวิเคราะห์สไตล์การเรียนรู้ (Learning Type Test - VARK)", en: "Learning Type Test (VARK)" },
        citation: "Fleming, Neil D., VARK: Visual, Aural, Read/Write, and Kinesthetic Learning Styles. www.vark-learn.com, www.wikihow.com/Learn"
      },
      {
        name: { th: "แบบทดสอบออกซบริดจ์ (Oxbridge Test)", en: "Oxbridge Test" },
        citation: "Fandon, L., Do You Think You're Clever? The Oxford and Cambridge Questions (London: Icon Books, 2010)."
      },
      {
        name: { th: "แบบทดสอบความถนัดของสมองซีกซ้าย-ขวา (Lateralisation Test)", en: "Lateralisation Test" },
        citation: "McGilchrist, I., The Master and His Emissary: The Divided Brain and the Making of the Western World (New Haven/London: Yale University Press, 2009). See also Iain McGilchrist's TED talk 'The divided brain', October 2011, www.ted.com/talks/iain_mcgilchrist_the_divided_brain. Shute, J., 'Are you right-brained or left-brained?', Telegraph, 13 December 2013. Peter Brugger: conversation with the authors in Zurich."
      }
    ]
  },
  {
    category: { th: "สภาวะอารมณ์และจิตวิทยาทั่วไป (Emotional & Psychological)", en: "Emotional & Psychological" },
    tests: [
      {
        name: { th: "แบบทดสอบความฉลาดทางอารมณ์ (EQ Test)", en: "EQ Test" },
        citation: "Goleman, D., EQ. Emotionale Intelligenz (Munich, 2001). Illouz, E., Saving the Modern Soul: Therapy, Emotions, and the Culture of Self-Help (Berkeley: University of California Press, 2008). Mayer, J.D., P. Salovey and D.R. Caruso, 'Emotional intelligence: theory, findings, and implications', Psychology Inquiry, 15(3) (2004). Vasek, T., 'Inflation der anerkennung', brand eins (2011)."
      },
      {
        name: { th: "แบบทดสอบความกลัวตกกระแส (FoMO Test)", en: "FoMO Test" },
        citation: "Przybylski, A.K. et al., 'Motivational, emotional, and behavioral correlates of fear of missing out', Computers in Human Behavior, 29(4) (2013). Turkle, S., Alone Together: Why We Expect More from Technology and Less from Each Other (New York: Basic Books, 2011)."
      },
      {
        name: { th: "แบบทดสอบแนวโน้มการหลงตนเอง (Narcissism Test)", en: "Narcissism Test" },
        citation: "Cheek, J.M., H.M. Hendin and P. Wink, 'An extended version of the Hypersensitive Narcissism Scale (the Maladaptive Covert Narcissism Scale)'. Presented at the meeting of the Association for Research in Personality, Charlotte, NC, June 2013. Kaufman, S.B., '23 signs you're secretly a narcissist masquerading as a sensitive introvert', Scientific American blog, 26 August 2013. Lasch, C., The Culture of Narcissism: American Life in an Age of Diminishing Expectations (New York: W.W. Norton & Co., 1979). Maaz, Hans-Joachim, Die narzisstische Gesellschaft (Munich: C.H. Beck, 2012)."
      },
      {
        name: { th: "ทฤษฎีการยอมรับคำทำนายกว้างๆ (Barnum Effect)", en: "Barnum Effect" },
        citation: "Forer, B.R., 'The fallacy of personal validation: a classroom demonstration of gullibility', Journal of Abnormal and Social Psychology, 44(1) (1949). Nolan, Stuart, 'Gullibility or Vulnerability?', TEDSalford, www.youtube.com/watch?v=3Ls9lx_JtuM"
      },
      {
        name: { th: "แบบทดสอบการหยดหมึกรอร์ชาค (Rorschach Test)", en: "Rorschach Test" },
        citation: "Burstein, A.G. and S. Loucks, Rorschach's Test: Scoring and Interpretation (Taylor & Francis, New York, 1989). Exner, J.E., Jr., Rorschach-Arbeitsbuch für das Comprehensive System (Bern: Verlag Hans Huber, 2001)."
      },
      {
        name: { th: "แบบทดสอบวัดความเครียดจากงานและชีวิต (Stress Test)", en: "Stress Test" },
        citation: "Levitan, S.A. and F. Gallo, 'Work and family: the impact of legislation', Monthly Labor Review, March 1990. Maslach, C. and S.E. Jackson, 'The measurement of experienced burnout', Journal of Organizational Behavior, 2(2) (1981). Parakati, V., 'The history of work/life balance'."
      },
      {
        name: { th: "มาตรวัดความสุขเฉพาะบุคคล (Subjective Happiness Scale)", en: "Subjective Happiness Scale" },
        citation: "Lyubomirsky, S., The How of Happiness: A New Approach to Getting the Life You Want (London: Penguin, 2007). Lyubomirsky, S. and H. Lepper, 'A measure of subjective happiness: preliminary reliability and construct validation', Social Indicators Research, 46(2) (1999). sonjalyubomirsky.com. Rubin, G., The Happiness Project (New York: Harper, 2009)."
      },
      {
        name: { th: "แบบทดสอบภาวะซึมเศร้า 2 คำถาม (Two-Question Depression Test)", en: "Two-Question Depression Test" },
        citation: "Whooley, M.A. et al., 'Case-finding instruments for depression. Two questions are as good as many', Journal of General Internal Medicine, 12(7) (1997). Kroenke, K. et al., 'Anxiety disorders in primary care: prevalence, impairment, comorbidity, and detection', Annals of Internal Medicine, 146(5) (2007)."
      },
      {
        name: { th: "แบบทดสอบวัดระดับความเป็นตัวเอง (Temperament Test)", en: "Temperament Test" },
        citation: "Meyer, F.J. and J.B. Asendorpf, Psychologie der Persönlichkeit (Berlin: Springer, 2012). Littauer, F., Personality Plus (Revell, 1992)."
      }
    ]
  },
  {
    category: { th: "การบริหารจัดการ ความถนัด และความสัมพันธ์ (Management & Relationships)", en: "Management & Relationships" },
    tests: [
      {
        name: { th: "แบบทดสอบทักษะการนำตนเอง (Self-Leadership Test)", en: "Self-Leadership Test" },
        citation: "Houghton, J.D., D. Dawley and T.C. DiLiello, 'The Abbreviated Self-Leadership Questionnaire (ASLQ): a more concise measure of self-leadership', International Journal of Leadership Studies, 7(2) (2012)."
      },
      {
        name: { th: "แบบทดสอบแรงจูงใจในการปฏิสัมพันธ์กับผู้อื่น (Social Value Orientation Test)", en: "Social Value Orientation Test" },
        citation: "Griesinger, D.W. and J.W. Livingston Jr, 'Toward a model of interpersonal motivation in experimental games', Behavioral Science, 18 (1973). Murphy, R.O. and K.A. Ackermann, 'Social value orientation: theoretical and measurement issues', Personality and Social Psychology Review, 18(1) (2014). ryanomurphy.com/styled-2/index.html"
      },
      {
        name: { th: "แบบทดสอบระดับการตัดสินใจเลือกสิ่งที่ดีที่สุด (Maximisation Test)", en: "Maximisation Test" },
        citation: "Gross, P., Die Multioptionsgesellschaft (The multi-option society) (Frankfurt am Main: Suhrkamp, 1994). Nenkov, G.Y. et al., 'A short form of the maximization scale: factor structure, reliability and validity studies', Judgment and Decision Making, 3(5) (2008)."
      },
      {
        name: { th: "แบบทดสอบคู่ครอง 4 คำถาม (Four-Question Partnership Test)", en: "Four-Question Partnership Test" },
        citation: "Fromm, E., The Art of Loving (New York: Bloomsbury Academic, 2014). Palmen, C., 'Letzte Fragen' ('Last questions'), Das Magazin, 51 (2005)."
      },
      {
        name: { th: "แบบทดสอบทัศนคติต่อความมั่งคั่ง (Wealth Test)", en: "Wealth Test" },
        citation: "Druyen, T., W. Lauterbach and M. Grundmann (eds), Reichtum und Vermögen (Wiesbaden: VS, 2009). Firebaugh, G. and M.B. Schroeder, 'Does your neighbor's income affect your happiness?', American Journal of Sociology, 115(3) (2009). 'How Rich Am I?', givingwhatwecan.org/how-rich-am-i. 'What Is The Top 1 Percent Of Income UK?', upthegains.co.uk/blog/what-is-the-top-1-percent-of-income-uk"
      },
      {
        name: { th: "แบบทดสอบเข็มทิศทางการเมือง (Politics Test)", en: "Politics Test" },
        citation: "Official political compass survey. www.politicalcompass.org"
      },
      {
        name: { th: "แบบทดสอบการประเมินความเสี่ยงทางการเงิน (Risk Test)", en: "Risk Test" },
        citation: "Ferber, M., Was Sie über Geldanlage wissen sollten (Zurich: NZZ Libro, 2012). Jörg Perrin, P., Geschlechts-und ausbildungsspezifische Unterschiede im Investitionsverhalten (Bern: Universität Bern, 2007). Niedermayer, D. and M. Wagner, Exchange Traded Funds und Anlagestrategien (Zurich: financialmedia, 2012)."
      }
    ]
  },
  {
    category: { th: "ร่างกาย สุขภาพ และความฟิต (Physical & Health)", en: "Physical & Health" },
    tests: [
      {
        name: { th: "ดัชนีมวลกาย (Body Mass Index - BMI)", en: "Body Mass Index (BMI)" },
        citation: "Katherine Flegal interview: 'Katherine Flegal discusses the prevalence of obesity in the US', Clarivate, archive, sciencewatch.com/ana/st/obesity2/10sepObes2Fleg/Intelligent BMI calculator: www.smartbmicalculator.com"
      },
      {
        name: { th: "แบบทดสอบความฟิตของปอดและหัวใจ (Cooper Test)", en: "Cooper Test" },
        citation: "Cooper, K.H., 'A means of assessing maximal oxygen uptake. Correlation between field and treadmill testing', Journal of the American Medical Association, 203(3) (1968)."
      },
      {
        name: { th: "แบบทดสอบการทรงตัวขาเดียว (Stork Test)", en: "Stork Test" },
        citation: "Johnson, B.L. and J.K. Nelson, Practical Measurements for Evaluation in Physical Education (1979). Mackenzie, B., 'Standing Stork Test', www.brianmac.co.uk/storktst.htm. Schell, J. and B. Leelarthaepin, Physical Fitness Assessment in Exercise and Sports Science (1994). Wyss, T. et al., 'Comparison of two balance tests to predict injury risk in a military setting', (Brussels, 2012)."
      },
      {
        name: { th: "แบบทดสอบวิดพื้นวัดความแข็งแรง (Push-Up Test)", en: "Push-Up Test" },
        citation: "Coburn, J.W. and M.H. Malek (eds), NSCA's Essentials of Personal Training (2012). Golding, LA., C.R. Myers and W.E. Sinning, The Ys Way to Physical Fitness (1986). Hoffmann, 1., Norms for Fitness, Performance, and Health (2006). McArdle, W.D., F.I. Katch and V.L. Katch, Essentials of Exercise Physiology (2006). Niemann, D.C., Exercise Testing and Prescription: A Health-Related Approach (1999). ArmyFitnessSgt, 'How to do more push-ups', www.youtube.com/watch?v=AtGqLm9HDSU"
      },
      {
        name: { th: "แบบทดสอบความอ่อนตัว (Sit-and-Reach Test)", en: "Sit-and-Reach Test" },
        citation: "Robbins, G., D. Powers and S. Burgess, A Wellness Way of Life (2004). www.topendsports.com/testing/tests/sit-and-reach.htm"
      },
      {
        name: { th: "แบบทดสอบความไวการตอบสนองด้วยไม้บรรทัด (Ruler Test)", en: "Ruler Test" },
        citation: "Marieb, E.N., Human Anatomy and Physiology (2003). Fingertip reaction time: hypertextbox.com/facts/2006/reactiontime.shtml. Reaction time ruler drop test: www.topendsports.com/testing/tests/reaction-stick.htm"
      },
      {
        name: { th: "แบบทดสอบแนวโน้มการดื่มแอลกอฮอล์ที่เป็นปัญหา (Alcoholic Test - AUDIT)", en: "Alcoholic Test (AUDIT)" },
        citation: "Babor, T.F. et al., AUDIT: The Alcohol Use Disorders Identification Test (Geneva: World Health Organization, 2001)."
      },
      {
        name: { th: "แบบทดสอบสมดุลร่างกายแบบอายุรเวท (Ayurveda Test)", en: "Ayurveda Test" },
        citation: "Hope-Murray, A., Ayurveda for Dummies (Chichester: Wiley, 2013). www.banyanbotanicals.com/info/dosha-quiz / www.ayurveda-portal.de/ayurveda-test / chopra.com/dosha-quiz"
      },
      {
        name: { th: "แบบทดสอบมิติทางเพศสัมสัมพันธ์ (Sex Test)", en: "Sex Test" },
        citation: "Hudson, W.W., The WALMYR Assessment Scales Scoring Manual (Tempe, AZ: WALMYR, 1992)."
      }
    ]
  },
  {
    category: { th: "แบบประเมินและทฤษฎีอื่น ๆ (Other Assessments)", en: "Other Assessments" },
    tests: [
      {
        name: { th: "แบบวัดระดับความอคติในจิตใต้สำนึก (Implicit Bias Test)", en: "Implicit Bias Test" },
        citation: "socialrelationslab.psychology.columbia.edu/content/measures. Gladwell, M., Blink (London: Penguin, 2006). Mendoza-Denton, R. et al., Journal of Personality and Social Psychology, 83(4) (2002). Tierney, J., 'A shocking test of bias', New York Times, 18 November 2008."
      },
      {
        name: { th: "แบบทดสอบวัดความคุ้นเคยและความรู้ทั่วไป (Familiarity Test)", en: "Familiarity Test" },
        citation: "Gosling, S.D., Snoop: What Your Stuff Says About You (London: Profile, 2008). Nathanson, C., K.M. Williams and D.L Paulhus, 'The diagnostic value of academic and music knowledge for estimating cognitive ability and narcissism', University of British Columbia (2003)."
      },
      {
        name: { th: "ทฤษฎีปรับทัศนคติจัดระบบตามหลักฮวงจุ้ย (Feng Shui Assessment)", en: "Feng Shui Assessment" },
        citation: "Thomas Isemann (feng shui advisor): interview with the authors in March 2014."
      }
    ]
  }
];

export function renderReferencesTab(searchQuery = '') {
  const container = document.getElementById('references-list');
  if (!container) return;

  const isEn = state.language === 'en';
  container.innerHTML = '';

  const q = searchQuery.toLowerCase().trim();

  referencesData.forEach(cat => {
    // Filter tests
    const filteredTests = cat.tests.filter(t => {
      const nameText = (isEn ? t.name.en : t.name.th).toLowerCase();
      const citationText = t.citation.toLowerCase();
      return nameText.includes(q) || citationText.includes(q);
    });

    if (filteredTests.length === 0) return;

    // Category Card
    const catCard = document.createElement('div');
    catCard.className = 'dashboard-section-card';
    catCard.style.background = 'rgba(var(--color-accent-rgb), 0.01)';
    catCard.style.border = '1px solid var(--border-color)';
    catCard.style.padding = '18px';
    catCard.style.borderRadius = '14px';
    catCard.style.marginBottom = '16px';

    const catTitle = document.createElement('h4');
    catTitle.style.fontSize = '0.95rem';
    catTitle.style.color = 'var(--color-accent)';
    catTitle.style.marginBottom = '12px';
    catTitle.style.fontWeight = '700';
    catTitle.textContent = isEn ? cat.category.en : cat.category.th;
    catCard.appendChild(catTitle);

    const listContainer = document.createElement('div');
    listContainer.style.display = 'flex';
    listContainer.style.flexDirection = 'column';
    listContainer.style.gap = '12px';

    filteredTests.forEach(t => {
      const item = document.createElement('div');
      item.style.paddingLeft = '12px';
      item.style.borderLeft = '2px solid var(--border-color)';
      
      const testName = document.createElement('div');
      testName.style.fontSize = '0.85rem';
      testName.style.fontWeight = '600';
      testName.style.color = 'var(--text-primary)';
      testName.style.marginBottom = '4px';
      testName.textContent = isEn ? t.name.en : t.name.th;
      item.appendChild(testName);

      const citation = document.createElement('div');
      citation.style.fontSize = '0.78rem';
      citation.style.color = 'var(--text-secondary)';
      citation.style.lineHeight = '1.4';
      citation.textContent = t.citation;
      item.appendChild(citation);

      listContainer.appendChild(item);
    });

    catCard.appendChild(listContainer);
    container.appendChild(catCard);
  });

  if (container.children.length === 0) {
    const noResults = document.createElement('div');
    noResults.style.textAlign = 'center';
    noResults.style.color = 'var(--text-muted)';
    noResults.style.fontSize = '0.9rem';
    noResults.style.padding = '30px 10px';
    noResults.textContent = isEn ? "No matching references found." : "ไม่พบแหล่งข้อมูลอ้างอิงที่ตรงกัน";
    container.appendChild(noResults);
  }
}

// --- Admin Dashboard logic ---

function updateAdminUI() {
  const usersDb = JSON.parse(localStorage.getItem('lifemap_users_db') || '{}');
  const userList = Object.keys(usersDb);
  const totalUsers = userList.length;
  
  let quizCompletedCount = 0;
  const campaignsMap = {}; // { campaignCode: { count: 0, completed: 0, totalTokens: 0, archetypes: {} } }
  const campaignThinkingStyles = {}; // { campaignCode: { count: 0, energy: { I: 0, E: 0 }, lens: { S: 0, N: 0 }, decision: { T: 0, F: 0 }, planning: { J: 0, P: 0 } } }

  // Load each user's state to compile statistics
  userList.forEach(username => {
    const userStateStr = localStorage.getItem(`lifemap_state_${username}`);
    let userState = null;
    if (userStateStr) {
      try {
        userState = JSON.parse(userStateStr);
      } catch (e) {
        console.error("Error parsing user state for", username, e);
      }
    }
    
    // Check quiz completion
    const hasCompletedQuiz = userState && userState.answers && Object.keys(userState.answers).length >= quizQuestions.length;
    if (hasCompletedQuiz) {
      quizCompletedCount++;
    }

    // Campaign tracking
    const campaign = (userState && userState.campaignCode) || "GENERAL";
    const tokens = (userState && userState.tokens) || 0;
    
    if (!campaignsMap[campaign]) {
      campaignsMap[campaign] = {
        count: 0,
        completed: 0,
        totalTokens: 0,
        archetypes: {}
      };
    }
    
    campaignsMap[campaign].count++;
    if (hasCompletedQuiz) {
      campaignsMap[campaign].completed++;
      
      // Determine archetype
      const profile = computeProfile(userState.answers);
      if (profile && profile.archetype) {
        const archName = profile.archetype.th || profile.archetype;
        campaignsMap[campaign].archetypes[archName] = (campaignsMap[campaign].archetypes[archName] || 0) + 1;
      }
    }
    campaignsMap[campaign].totalTokens += tokens;

    // Thinking Style tracking
    const hasCompletedThinkingQuiz = userState && userState.thinkingStyleCompleted === true && userState.thinkingStyle && userState.thinkingStyle.styleCode;
    if (hasCompletedThinkingQuiz) {
      if (!campaignThinkingStyles[campaign]) {
        campaignThinkingStyles[campaign] = {
          count: 0,
          energy: { I: 0, E: 0 },
          lens: { S: 0, N: 0 },
          decision: { T: 0, F: 0 },
          planning: { J: 0, P: 0 }
        };
      }
      
      const tsObj = userState.thinkingStyle;
      const code = tsObj.styleCode;
      if (code && code.length === 4) {
        campaignThinkingStyles[campaign].count++;
        const energyChar = code[0];
        const lensChar = code[1];
        const decisionChar = code[2];
        const planningChar = code[3];
        
        if (energyChar === 'I' || energyChar === 'E') campaignThinkingStyles[campaign].energy[energyChar]++;
        if (lensChar === 'S' || lensChar === 'N') campaignThinkingStyles[campaign].lens[lensChar]++;
        if (decisionChar === 'T' || decisionChar === 'F') campaignThinkingStyles[campaign].decision[decisionChar]++;
        if (planningChar === 'J' || planningChar === 'P') campaignThinkingStyles[campaign].planning[planningChar]++;
      }
    }
  });

  // Calculate total campaigns
  const totalCampaigns = Object.keys(campaignsMap).filter(c => c !== 'GENERAL').length;

  // Render Stats widgets
  document.getElementById('admin-stat-users').textContent = totalUsers;
  document.getElementById('admin-stat-quiz').textContent = `${quizCompletedCount} (${totalUsers > 0 ? Math.round((quizCompletedCount / totalUsers) * 100) : 0}%)`;
  document.getElementById('admin-stat-campaigns').textContent = totalCampaigns;

  // Render Global Configs in Inputs
  const adminLiffIdInput = document.getElementById('admin-liff-id');
  if (adminLiffIdInput) {
    adminLiffIdInput.value = localStorage.getItem('lifemap_liff_id') || '2006249563-71vBML8b';
  }

  const geminiKeyInput = document.getElementById('admin-gemini-key');
  if (geminiKeyInput) {
    geminiKeyInput.value = localStorage.getItem('lifemap_gemini_api_key') || '';
  }

  // Render Campaign Table
  const campaignTableBody = document.getElementById('admin-campaign-table-body');
  if (campaignTableBody) {
    campaignTableBody.innerHTML = '';
    
    Object.keys(campaignsMap).forEach(camp => {
      const data = campaignsMap[camp];
      const completionRate = data.count > 0 ? Math.round((data.completed / data.count) * 100) : 0;
      const avgTokens = data.count > 0 ? Math.round((data.totalTokens / data.count) * 10) / 10 : 0;
      
      // Find top archetype
      let topArchetype = "N/A";
      let maxCount = 0;
      Object.keys(data.archetypes).forEach(arch => {
        if (data.archetypes[arch] > maxCount) {
          maxCount = data.archetypes[arch];
          topArchetype = arch;
        }
      });

      const tr = document.createElement('tr');
      tr.style.borderBottom = '1px solid var(--border-color)';
      tr.innerHTML = `
        <td style="padding: 10px; font-weight: bold; color: var(--color-primary);">${camp}</td>
        <td style="padding: 10px;">${data.count}</td>
        <td style="padding: 10px;">${completionRate}%</td>
        <td style="padding: 10px; color: var(--text-secondary);">${topArchetype}</td>
        <td style="padding: 10px; font-weight: bold; color: var(--color-success);">${avgTokens} 💰</td>
      `;
      campaignTableBody.appendChild(tr);
    });
  }

  // Render Thinking Styles Table
  const adminThinkingStylesTableBody = document.getElementById('admin-thinking-styles-table-body');
  if (adminThinkingStylesTableBody) {
    adminThinkingStylesTableBody.innerHTML = '';
    
    Object.keys(campaignThinkingStyles).forEach(camp => {
      const data = campaignThinkingStyles[camp];
      if (data.count === 0) return;
      
      const eIPct = Math.round((data.energy.I / data.count) * 100);
      const eEPct = 100 - eIPct;
      
      const lSPct = Math.round((data.lens.S / data.count) * 100);
      const lNPct = 100 - lSPct;
      
      const dTPct = Math.round((data.decision.T / data.count) * 100);
      const dFPct = 100 - dTPct;
      
      const pJPct = Math.round((data.planning.J / data.count) * 100);
      const pPPct = 100 - pJPct;
      
      const tr = document.createElement('tr');
      tr.style.borderBottom = '1px solid var(--border-color)';
      tr.innerHTML = `
        <td style="padding: 10px; font-weight: bold; color: var(--color-primary);">${camp}</td>
        <td style="padding: 10px; font-weight: bold;">${data.count} คน</td>
        <td style="padding: 10px;">
          <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 2px;">Reflective ${eIPct}% / Interactive ${eEPct}%</div>
          <div style="height: 6px; background: var(--border-color); border-radius: 3px; display: flex; overflow: hidden; width: 120px;">
            <div style="width: ${eIPct}%; background: var(--color-accent); height: 100%;"></div>
            <div style="width: ${eEPct}%; background: var(--text-muted); height: 100%; opacity: 0.3;"></div>
          </div>
        </td>
        <td style="padding: 10px;">
          <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 2px;">Practical ${lSPct}% / Future ${lNPct}%</div>
          <div style="height: 6px; background: var(--border-color); border-radius: 3px; display: flex; overflow: hidden; width: 120px;">
            <div style="width: ${lSPct}%; background: var(--color-accent); height: 100%;"></div>
            <div style="width: ${lNPct}%; background: var(--text-muted); height: 100%; opacity: 0.3;"></div>
          </div>
        </td>
        <td style="padding: 10px;">
          <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 2px;">Logic ${dTPct}% / Value ${dFPct}%</div>
          <div style="height: 6px; background: var(--border-color); border-radius: 3px; display: flex; overflow: hidden; width: 120px;">
            <div style="width: ${dTPct}%; background: var(--color-accent); height: 100%;"></div>
            <div style="width: ${dFPct}%; background: var(--text-muted); height: 100%; opacity: 0.3;"></div>
          </div>
        </td>
        <td style="padding: 10px;">
          <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 2px;">Structured ${pJPct}% / Adaptive ${pPPct}%</div>
          <div style="height: 6px; background: var(--border-color); border-radius: 3px; display: flex; overflow: hidden; width: 120px;">
            <div style="width: ${pJPct}%; background: var(--color-accent); height: 100%;"></div>
            <div style="width: ${pPPct}%; background: var(--text-muted); height: 100%; opacity: 0.3;"></div>
          </div>
        </td>
      `;
      adminThinkingStylesTableBody.appendChild(tr);
    });
  }

  // Render Users Table
  const usersTableBody = document.getElementById('admin-users-table-body');
  if (usersTableBody) {
    usersTableBody.innerHTML = '';
    
    userList.forEach(username => {
      const userStateStr = localStorage.getItem(`lifemap_state_${username}`);
      let userState = { studentName: "N/A", gradeLevel: "m4", schoolName: "N/A", campaignCode: "GENERAL", tokens: 0 };
      if (userStateStr) {
        try {
          userState = { ...userState, ...JSON.parse(userStateStr) };
        } catch (e) {}
      }

      const gradeText = userState.gradeLevel ? (gradePersonalizationMap[userState.gradeLevel]?.label.th || userState.gradeLevel) : "ม.4";

      const tr = document.createElement('tr');
      tr.style.borderBottom = '1px solid var(--border-color)';
      tr.innerHTML = `
        <td style="padding: 10px;">
          <strong style="display:block; color:var(--text-primary);">${userState.studentName || "Guest"}</strong>
          <span style="font-size:0.75rem; color:var(--text-muted);">${username}</span>
        </td>
        <td style="padding: 10px;">${gradeText}</td>
        <td style="padding: 10px;">${userState.schoolName || "N/A"}</td>
        <td style="padding: 10px; font-weight: 500;">${userState.campaignCode || "GENERAL"}</td>
        <td style="padding: 10px; color: var(--color-success); font-weight: bold;">${userState.tokens || 0}</td>
        <td style="padding: 10px;">
          <button class="btn btn-secondary btn-sm" onclick="adminDeleteUser('${username}')" style="background:rgba(239, 68, 68, 0.08); border-color:rgba(239, 68, 68, 0.15); color:#ef4444; padding:4px 8px; font-size:0.7rem; cursor:pointer;">ลบบัญชี</button>
        </td>
      `;
      usersTableBody.appendChild(tr);
    });
  }
}

// Global scope helper for deleting user from admin
window.adminDeleteUser = function(username) {
  if (confirm(`คุณแน่ใจหรือไม่ที่จะลบบัญชี ${username}?`)) {
    const usersDb = JSON.parse(localStorage.getItem('lifemap_users_db') || '{}');
    delete usersDb[username];
    localStorage.setItem('lifemap_users_db', JSON.stringify(usersDb));
    localStorage.removeItem(`lifemap_state_${username}`);
    updateAdminUI();
  }
};

// Seed Mock Data Function
function seedMockData() {
  const usersDb = JSON.parse(localStorage.getItem('lifemap_users_db') || '{}');
  
  const mockNames = [
    { name: "ปวีณา สุขใจ", school: "เตรียมอุดมศึกษา", campaign: "TriamUdom", grade: "m6" },
    { name: "กฤษดา รุ่งเรือง", school: "เตรียมอุดมศึกษา", campaign: "TriamUdom", grade: "m6" },
    { name: "ณัฐพล พลากร", school: "หอวัง", campaign: "Horwang", grade: "m5" },
    { name: "สุพิชชา แสงแก้ว", school: "หอวัง", campaign: "Horwang", grade: "m4" },
    { name: "ธนกร ยิ่งยศ", school: "สวนกุหลาบวิทยาลัย", campaign: "Suankularb", grade: "m5" },
    { name: "พรรณราย จิตใส", school: "สวนกุหลาบวิทยาลัย", campaign: "Suankularb", grade: "m6" },
    { name: "ชลลดา ว่องไว", school: "ศึกษานารี", campaign: "Suksanari", grade: "m4" },
    { name: "อภิสิทธิ์ มั่นคง", school: "ศึกษานารี", campaign: "Suksanari", grade: "m5" },
    { name: "สุกัญญา ยิ้มละมัย", school: "สามเสนวิทยาลัย", campaign: "Samsen", grade: "m6" },
    { name: "พีรพงศ์ อุดมดี", school: "สามเสนวิทยาลัย", campaign: "Samsen", grade: "m4" },
    { name: "กุลธิดา ตั้งใจ", school: "ไม่ระบุ", campaign: "GENERAL", grade: "m5" },
    { name: "ทศพล นำชัย", school: "ไม่ระบุ", campaign: "GENERAL", grade: "m6" },
    { name: "จินตนา รักเรียน", school: "หอวัง", campaign: "Horwang", grade: "m4" },
    { name: "เมธา สิทธิ์สุข", school: "เตรียมอุดมศึกษา", campaign: "TriamUdom", grade: "m5" },
    { name: "วิภาดา เลิศล้ำ", school: "สวนกุหลาบวิทยาลัย", campaign: "Suankularb", grade: "m6" }
  ];

  mockNames.forEach((m, idx) => {
    const username = `mock.student${idx + 1}@gmail.com`;
    usersDb[username.toLowerCase()] = {
      username: username,
      password: "password123"
    };

    // Generate random answers
    const answers = {};
    quizQuestions.forEach(q => {
      answers[q.id] = Math.floor(Math.random() * q.options.length);
    });

    const mockState = {
      studentName: m.name,
      gradeLevel: m.grade,
      schoolName: m.school,
      campaignCode: m.campaign,
      answers: answers,
      tokens: Math.floor(Math.random() * 45) + 15,
      checkIns: [1, 2, 3].slice(0, Math.floor(Math.random() * 4)),
      claimedBadges: ["quiz"],
      consent: { profile: true, ai: true, parent: Math.random() > 0.5, thinkingStyle: false },
      parentInviteCode: `PARENT-${Math.floor(Math.random() * 9000) + 1000}`
    };

    // Randomly seed Thinking Style Quiz (80% completion rate)
    const completeThinkingQuiz = Math.random() < 0.8;
    if (completeThinkingQuiz) {
      mockState.consent.thinkingStyle = true;
      mockState.thinkingStyleCompleted = true;
      mockState.thinkingStyleAnswers = {};
      thinkingStyleQuestions.forEach(q => {
        mockState.thinkingStyleAnswers[q.id] = Math.floor(Math.random() * 2);
      });
      // Temporarily swap state context to calculate thinking style
      const tempState = state;
      state = mockState;
      mockState.thinkingStyle = computeThinkingStyle(mockState.thinkingStyleAnswers);
      state = tempState;
    } else {
      mockState.consent.thinkingStyle = Math.random() > 0.5;
      mockState.thinkingStyleCompleted = mockState.consent.thinkingStyle ? false : undefined;
      mockState.thinkingStyleAnswers = {};
      mockState.thinkingStyle = null;
    }

    localStorage.setItem(`lifemap_state_${username}`, JSON.stringify(mockState));
  });

  localStorage.setItem('lifemap_users_db', JSON.stringify(usersDb));
  updateAdminUI();
  alert("สุ่มสร้างข้อมูลนักเรียนจำลอง 15 คนเสร็จสิ้น! ข้อมูลแคมเปญโรงเรียนอัปเดตแล้ว 🚀");
}

// Set up Admin event handlers (configurations, seeder, db reset)
function setupAdminEventListeners() {
  const btnSaveConfig = document.getElementById('btn-admin-save-config');
  if (btnSaveConfig) {
    btnSaveConfig.addEventListener('click', () => {
      const liffId = document.getElementById('admin-liff-id').value.trim();
      const geminiKey = document.getElementById('admin-gemini-key').value.trim();
      
      if (liffId) {
        localStorage.setItem('lifemap_liff_id', liffId);
      }
      if (geminiKey) {
        localStorage.setItem('lifemap_gemini_api_key', geminiKey);
      }
      
      alert(state.language === 'en' ? "Global configurations saved successfully!" : "บันทึกค่าคอนฟิกกล่าสุดเรียบร้อยแล้ว!");
      window.location.reload();
    });
  }

  const btnSeedData = document.getElementById('btn-admin-seed-data');
  if (btnSeedData) {
    btnSeedData.addEventListener('click', () => {
      seedMockData();
    });
  }

  const btnResetDb = document.getElementById('btn-admin-reset-db');
  if (btnResetDb) {
    btnResetDb.addEventListener('click', async () => {
      const confirmed = await showBrandConfirm(
        state.language === 'en' 
          ? "Are you sure you want to clear ALL users and configurations?" 
          : "คุณแน่ใจหรือไม่ที่จะล้างระบบผู้ใช้ คอนฟิก และบัญชีทั้งหมดในระบบ?"
      );
      if (confirmed) {
        localStorage.clear();
        alert(state.language === 'en' ? "Database cleared! Reloading application..." : "ล้างระบบฐานข้อมูลทั้งหมดสำเร็จแล้ว! กำลังรีโหลดแอปพลิเคชัน...");
        window.location.reload();
      }
    });
  }
}

// Launch application on load
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
