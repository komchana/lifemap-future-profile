// LifeMap exploration: local, account-scoped reflection. No scoring or network writes.
const tr = (en, th, english) => en ? english : th;
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const paths = {
 creator: {category:'creator',level:1,th:'เล่าเรื่องให้คนอยากฟัง',en:'Tell a story people want to hear',skill:['การสื่อสาร','Communication'],task:['ร่างโพสต์สั้น ๆ ให้ร้านสมมุติ แล้วอธิบายว่าทำไมเลือกคำและภาพแบบนี้','Draft a short post for an imaginary shop, then explain why you chose those words and that image.'],steps:[['เลือกร้านสมมุติและลูกค้า 1 กลุ่ม','Choose an imaginary shop and one audience'],['ร่างหัวข้อ ภาพ และข้อความชวนทำบางอย่าง','Sketch a headline, image and call to action'],['อธิบายว่าทำไมเลือกสื่อสารแบบนี้','Explain your communication choices']],prompt:['เขียนข้อความโพสต์และอธิบายภาพที่ร่างไว้','Write the post copy and describe your sketch']},
 analyst: {category:'analyst',level:1,th:'อ่านข้อมูลแล้วตั้งคำถาม',en:'Read data and ask a better question',skill:['การคิดวิเคราะห์','Critical thinking'],task:['ดูยอดขาย 5 วัน จด 3 ข้อสังเกต แล้วเสนอวิธีทดลอง 1 อย่างเพื่อหาคำตอบเพิ่ม','Look at five days of sales, note three observations, and suggest one experiment to learn more.'],steps:[['ใช้ข้อมูลสมมุติ: จันทร์ 12 ชิ้น อังคาร 18 พุธ 9 พฤหัส 21 ศุกร์ 15','Use sample sales: Mon 12, Tue 18, Wed 9, Thu 21, Fri 15'],['หาข้อสังเกต 3 ข้อ และแยกสิ่งที่ข้อมูลยังตอบไม่ได้','Find three observations and what the data cannot explain'],['เสนอการทดลอง 1 อย่างเพื่อหาคำตอบเพิ่ม','Suggest one experiment to learn more']],prompt:['บันทึกข้อสังเกต 3 ข้อ และคำถามที่อยากหาคำตอบต่อ','Write three observations and one follow-up question']},
 builder: {category:'builder',level:1,th:'แยกปัญหาเป็นขั้นตอน',en:'Break a problem into steps',skill:['การแก้ปัญหา','Problem solving'],task:['วาดแบบที่วางโทรศัพท์ด้วยกระดาษ แล้วระบุจุดรองรับและแก้จุดอ่อน 1 จุด','Sketch a paper phone stand, mark its supports, and fix one weak spot.'],steps:[['วาดแบบที่วางโทรศัพท์บนกระดาษ โดยยังไม่ต้องใช้อุปกรณ์จริง','Sketch a paper phone stand; no tools needed'],['ระบุจุดรองรับและวิธีป้องกันการล้ม','Mark supports and explain how it stays stable'],['หาจุดที่อาจใช้ไม่ได้และแก้แบบ 1 จุด','Identify one weakness and revise the design']],prompt:['อธิบายแบบของคุณ จุดรองรับ และสิ่งที่แก้ไข','Describe your design, supports and revision']},
 helper: {category:'helper',level:1,th:'อธิบายให้คนอื่นเข้าใจ',en:'Explain so another person understands',skill:['การทำงานร่วมกัน','Collaboration'],task:['เขียนวิธีทำเรื่องที่คุณถนัด 3 ขั้นให้มือใหม่ แล้วแก้ขั้นที่อาจสับสน','Write three steps for something you know well so a beginner can follow, then fix the step that might confuse.'],steps:[['เลือกเรื่องที่คุณรู้ เช่น จัดกระเป๋าหรือค้นข้อมูล','Choose something familiar, such as packing or finding information'],['เขียนวิธีทำ 3 ขั้นสำหรับคนที่ไม่เคยทำ','Write three steps for a complete beginner'],['ทบทวนว่าขั้นตอนไหนอาจทำให้สับสน แล้วปรับคำอธิบาย','Find a confusing step and improve its explanation']],prompt:['เขียนคู่มือ 3 ขั้นและสิ่งที่คุณปรับให้ง่ายขึ้น','Write three steps and what you clarified']},
 entrepreneur: {category:'entrepreneur',level:1,th:'เข้าใจปัญหาของคนใช้',en:'Understand a user problem',skill:['ความคิดริเริ่ม','Initiative'],task:['เขียนปัญหาของลูกค้า 1 กลุ่ม แล้วร่างข้อเสนอพร้อมคำถามทดสอบว่าเขาสนใจไหม','Describe one customer group’s problem, then draft an offer and a question to test their interest.'],steps:[['เลือกสินค้าสมมุติและลูกค้า 1 กลุ่ม','Choose an imaginary product and audience'],['เขียนปัญหาของลูกค้า และสิ่งที่สินค้าช่วยได้','Describe a customer problem and how the product helps'],['ร่างข้อเสนอขายและคำถามสำหรับทดสอบไอเดีย โดยยังไม่ต้องซื้อหรือขายจริง','Draft an offer and a question to test it; no buying or selling needed']],prompt:['เขียนกลุ่มลูกค้า ปัญหา ข้อเสนอ และคำถามทดสอบ','Write your audience, problem, offer and test question']},
 'creator-2': {category:'creator',level:2,th:'ฟังแล้วสรุปใจความ',en:'Listen and summarize the point',skill:['การสื่อสาร','Communication'],task:['สรุปบทสนทนาสั้น ๆ เป็น 3 ประเด็นด้วยคำของคุณ โดยไม่ใส่ความเห็นตัวเอง','Summarize a short conversation in three points, in your own words, without adding your opinion.'],steps:[['เลือกคลิปสัมภาษณ์หรือบทสนทนาสั้น 1 เรื่อง','Choose one short interview or conversation'],['จดสิ่งที่ผู้พูดต้องการสื่อ 3 ประเด็น','Write down three points the speaker wants to convey'],['เขียนสรุปใหม่โดยไม่เติมความเห็นของตัวเอง','Rewrite the summary without adding your own opinion']],prompt:['พิมพ์ 3 ประเด็นและสรุปสั้นของคุณ','Enter your three points and short summary']},
 'creator-3': {category:'creator',level:3,th:'ปรับสารให้เหมาะกับผู้ฟัง',en:'Adapt a message for its audience',skill:['การสื่อสาร','Communication'],task:['เขียนประกาศเรื่องเดียวกัน 2 แบบ สำหรับเพื่อนและครู แล้วบอกว่าเปลี่ยนอะไร','Write the same announcement two ways, for a friend and for a teacher, and say what you changed.'],steps:[['เลือกข่าวหรือประกาศใกล้ตัว 1 เรื่อง','Choose one familiar news item or announcement'],['เขียนเวอร์ชันสำหรับเพื่อน','Write a version for a friend'],['เขียนเวอร์ชันสำหรับครูหรือผู้ใหญ่ แล้วบอกสิ่งที่เปลี่ยน','Write a version for a teacher or adult and explain what changed']],prompt:['ใส่ข้อความทั้ง 2 เวอร์ชันและสิ่งที่คุณปรับ','Enter both versions and what you changed']},
 'analyst-2': {category:'analyst',level:2,th:'แยกข้อเท็จจริงจากข้อสรุป',en:'Separate facts from conclusions',skill:['การคิดวิเคราะห์','Critical thinking'],task:['แยกข้อเท็จจริงออกจากข้อสรุปในข้อความสมมุติ แล้วบอกว่าต้องมีข้อมูลอะไรเพิ่ม','Separate the facts from the conclusion in a sample statement, then say what extra evidence you would need.'],steps:[['ใช้ข้อความสมมุติ: “นักเรียนส่วนใหญ่เรียนออนไลน์ได้ดีกว่า เพราะเพื่อน 4 คนของฉันชอบ”','Use this sample: “Most students learn better online because four of my friends like it.”'],['ขีดเส้นใต้ข้อเท็จจริงและข้อสรุป','Separate the observable fact from the conclusion'],['เขียนว่าต้องมีข้อมูลอะไรเพิ่มจึงจะเชื่อข้อสรุปได้','Name the evidence needed before accepting the conclusion']],prompt:['แยกข้อเท็จจริง ข้อสรุป และข้อมูลที่ยังขาด','Write the fact, conclusion, and missing evidence']},
 'analyst-3': {category:'analyst',level:3,th:'ตัดสินใจด้วยเกณฑ์',en:'Decide with explicit criteria',skill:['การคิดวิเคราะห์','Critical thinking'],task:['ให้คะแนน 3 ทางเลือกตามเกณฑ์ 3 ข้อ แล้วดูว่าคะแนนช่วยตัดสินได้แค่ไหน','Score three options on three criteria, then see how far the scores settle the decision.'],steps:[['เลือกเรื่องที่ต้องตัดสินใจและทางเลือก 3 แบบ','Choose one decision and three options'],['กำหนดเกณฑ์สำคัญ 3 ข้อและให้คะแนน 1–5','Choose three criteria and score each option 1–5'],['สรุปว่าคะแนนช่วยอะไรและอะไรยังตัดสินไม่ได้','Explain what the scores clarify and what remains uncertain']],prompt:['บันทึกทางเลือก เกณฑ์ คะแนน และข้อสรุป','Record the options, criteria, scores, and conclusion']},
 'builder-2': {category:'builder',level:2,th:'หาสาเหตุของปัญหา',en:'Find a problem’s likely cause',skill:['การแก้ปัญหา','Problem solving'],task:['ถาม “ทำไม” ต่อกัน 3 ครั้งกับปัญหาใกล้ตัว แล้วเลือกสาเหตุที่คุณควบคุมได้เพื่อวางแผนทดลองแก้','Ask “why” three times about an everyday problem, then pick a cause you can control and plan a small experiment to fix it.'],steps:[['เลือกปัญหาที่ไม่อันตราย เช่น มาสายหรือลืมของ','Choose a safe everyday problem, such as lateness or forgetting something'],['ถาม “ทำไม” ต่อเนื่องอย่างน้อย 3 ครั้ง','Ask “why” at least three times'],['เลือกสาเหตุหนึ่งที่คุณควบคุมได้และออกแบบวิธีทดลองแก้','Choose one controllable cause and design a small fix']],prompt:['เขียนสายคำถาม “ทำไม” และวิธีทดลองแก้','Write your chain of “why” questions and proposed fix']},
 'builder-3': {category:'builder',level:3,th:'ทดสอบและปรับต้นแบบ',en:'Test and improve a prototype',skill:['การแก้ปัญหา','Problem solving'],task:['ลองวิธีแก้ที่ร่างไว้ 1 รอบอย่างปลอดภัย แล้วจดผลจริงและสิ่งที่จะปรับต่อ','Try your earlier fix once, safely, then note what actually happened and what to change next.'],steps:[['เลือกแบบร่างหรือวิธีแก้จากกิจกรรมก่อนหน้า','Choose a sketch or solution from an earlier activity'],['กำหนดว่าความสำเร็จหน้าตาเป็นอย่างไร แล้วทดลองแบบปลอดภัย','Define success and run a safe test'],['บันทึกผลที่เกิดจริงและสิ่งที่จะเปลี่ยนในรอบถัดไป','Record the result and what you would change next']],prompt:['บันทึกเกณฑ์ทดสอบ ผลจริง และการปรับรอบถัดไป','Record the test criterion, result, and next revision']},
 'helper-2': {category:'helper',level:2,th:'ฟังและสะท้อนความเข้าใจ',en:'Listen and Reflect Understanding',skill:['การทำงานร่วมกัน','Collaboration'],task:['ฟังอีกฝ่ายให้จบ แล้วสรุปกลับด้วยคำของคุณเองเพื่อเช็กว่าเข้าใจตรงกัน','Listen to the other person until they finish, then reflect back in your own words to check you understood.'],steps:[['ชวนคนที่ไว้ใจคุยเรื่องเล็ก ๆ ที่เขากำลังทำ','Ask someone you trust about a small task they are working on'],['สรุปกลับว่า “ที่ได้ยินคือ…” และถามว่าคุณเข้าใจถูกไหม','Reflect back “What I heard is…” and check your understanding'],['จดสิ่งที่คุณเข้าใจต่างไปจากตอนแรก','Note what changed in your understanding']],prompt:['บันทึก 4 อย่างจากการคุย: เขาพูดว่าอะไร คุณสรุปกลับว่าอะไร เขาบอกว่าคุณเข้าใจถูกไหม และหลังถามกลับคุณเข้าใจอะไรเพิ่ม','Record four things from the conversation: what they said, what you reflected back, whether they said you understood correctly, and what you understood better after checking']},
 'helper-3': {category:'helper',level:3,th:'แบ่งงานและประสานทีม',en:'Coordinate a small team',skill:['การทำงานร่วมกัน','Collaboration'],task:['แบ่งงานกลุ่มเล็กเป็น 3 งาน ระบุคนทำ เวลาส่ง และจุดที่ต้องส่งต่อ','Split a small group task into three parts, name who does each and when, and mark the handoffs.'],steps:[['เลือกงานสมมุติหรือจริงที่ปลอดภัย เช่น จัดมุมหนังสือ','Choose a safe real or imaginary group task'],['แบ่งเป็น 3 งาน พร้อมเจ้าของและเวลาส่ง','Split it into three tasks with owners and deadlines'],['ระบุจุดที่ต้องส่งต่องานและวิธีเช็กความเข้าใจ','Mark handoffs and how the team will confirm understanding']],prompt:['เขียนรายการงาน เจ้าของ เวลา และจุดส่งต่องาน','Write the tasks, owners, deadlines, and handoffs']},
 'entrepreneur-2': {category:'entrepreneur',level:2,th:'ถามเพื่อค้นหาความต้องการ',en:'Interview to discover a need',skill:['ความคิดริเริ่ม','Initiative'],task:['เขียนคำถามไม่ชี้นำ 5 ข้อเกี่ยวกับปัญหาที่เลือก แล้วลองถามหรือจำลองคำตอบเพื่อดูว่ายังไม่รู้อะไร','Write five non-leading questions about your chosen problem, then ask someone or simulate the answers to see what you still don’t know.'],steps:[['เลือกปัญหาใกล้ตัวหนึ่งเรื่องและคนที่พบปัญหานั้น','Choose one everyday problem and a person who experiences it'],['เขียนคำถามปลายเปิด 5 ข้อ หลีกเลี่ยงการชี้นำ','Write five open questions without leading the answer'],['ทดลองถาม 1 คนหรือจำลองคำตอบ แล้วจดสิ่งที่ยังไม่รู้','Ask one person or simulate answers, then note what remains unknown']],prompt:['บันทึกคำถาม สิ่งที่ได้ยิน และข้อสงสัยใหม่','Record the questions, what you heard, and new uncertainties']},
 'entrepreneur-3': {category:'entrepreneur',level:3,th:'ออกแบบการทดลองเล็ก',en:'Design a small validation test',skill:['ความคิดริเริ่ม','Initiative'],task:['เขียนว่าใครน่าจะมีปัญหาอะไร แล้ววางแผนทดสอบว่าข้อสันนิษฐานนั้นจริงไหมโดยไม่ต้องขายจริง','Write who probably has what problem, then plan a test of whether that assumption is true without making a real sale.'],steps:[['เขียนสมมติฐานว่าใครมีปัญหาอะไร','Write a hypothesis about who has which problem'],['เลือกสัญญาณหนึ่งอย่างที่จะบอกว่าปัญหานี้สำคัญ','Choose one signal that would show the problem matters'],['ออกแบบการทดสอบที่ใช้ข้อมูลสมมุติหรือแบบสอบถามสั้นและไม่เก็บข้อมูลส่วนตัว','Design a test using imaginary data or a short non-personal survey']],prompt:['เขียนสมมติฐาน สัญญาณ และแผนทดลอง','Write the hypothesis, signal, and test plan']}
};
const corePathIds = ['creator','analyst','builder','helper','entrepreneur'];
const skillCatalog = {
 creator:{th:'การสื่อสาร',en:'Communication'}, analyst:{th:'การคิดวิเคราะห์',en:'Critical thinking'}, builder:{th:'การแก้ปัญหา',en:'Problem solving'}, helper:{th:'การทำงานร่วมกัน',en:'Collaboration'}, entrepreneur:{th:'ความคิดริเริ่ม',en:'Initiative'}
};
// Authored examples are illustrative content, never inserted into saved answers.
const experimentGuidance = {
 creator: {
  starter: ['ร้านที่ฉันเลือกคือ… ลูกค้าคือ… โพสต์จะบอกว่า… ภาพที่อยากใช้คือ… เพราะ…','My shop is… My audience is… My post says… The image shows… because…'],
  output: ['ร้านสมมุติ: ร้านสมุดใกล้โรงเรียน\nลูกค้า: เพื่อนที่ชอบวาดรูป\nข้อความโพสต์: “เก็บไอเดียวันนี้ไว้ในสมุดเล่มโปรด แวะมาลองเปิดดูได้”\nภาพ: สมุดเปิดอยู่ มีดินสอวางข้าง ๆ เพราะอยากให้เห็นว่าเอาไปวาดรูปได้','Imaginary shop: a notebook shop near school\nAudience: friends who enjoy drawing\nPost: “Keep today’s ideas in your favourite notebook. Come and take a look.”\nImage: an open notebook beside a pencil, to suggest drawing'],
  liked: ['ชอบคิดข้อความสั้น ๆ ให้คนอยากอ่าน','I enjoyed writing a short message people might want to read.'],
  hard: ['ยังเลือกสีไม่ถูก อยากลองดูตัวอย่างเพิ่ม','Choosing colours was hard. I want to look at more examples.'],
  next: ['อยากลองทำโพสต์อีกแบบให้ร้านเดียวกัน','I want to try another post for the same shop.']
 },
 analyst: {
  starter: ['วันที่ขายมากสุดคือ… น้อยสุดคือ… ต่างกัน… ฉันยังไม่รู้ว่า… เลยอยากลอง…','The highest day is… The lowest is… The difference is… I still do not know… so I would try…'],
  output: ['1. พฤหัสขายมากที่สุด 21 ชิ้น\n2. พุธขายน้อยที่สุด 9 ชิ้น\n3. สองวันนี้ต่างกัน 12 ชิ้น\nยังไม่รู้ว่าทำไมพุธขายน้อย จึงอยากจดจำนวนคนเข้าร้านและจำนวนของที่เหลือในแต่ละวันเพิ่ม','1. Thursday has the most sales: 21 items.\n2. Wednesday has the fewest: 9 items.\n3. The difference is 12 items.\nI do not know why Wednesday was lower. I would also record visitors and remaining stock each day.'],
  liked: ['ชอบเปรียบเทียบแล้วเห็นความต่างชัดขึ้น','I liked seeing the differences after comparing the numbers.'],
  hard: ['เห็นยอดต่างกัน แต่ยังอธิบายสาเหตุไม่ได้','I could see a difference but could not explain its cause.'],
  next: ['อยากลองเก็บข้อมูลเพิ่มอีกหนึ่งสัปดาห์','I want to collect another week of data.']
 },
 builder: {
  starter: ['ฉันวาดแบบให้ฐาน… มีที่รอง… จุดที่อาจล้มคือ… เลยแก้ให้…','My design has a… base and a… support. It might tip when… so I changed…'],
  output: ['ฉันวาดกระดาษพับเป็นสามเหลี่ยม มีขอบเล็ก ๆ รองด้านล่างโทรศัพท์\nด้านหลังช่วยรับน้ำหนัก แต่คิดว่าฐานแคบอาจล้มง่าย\nเลยแก้แบบให้ฐานกว้างขึ้น ยังต้องลองทำจริงเพื่อดูว่ารับน้ำหนักได้ไหม','I drew paper folded into a triangle with a small ledge for the phone.\nThe back supports the weight, but a narrow base might tip.\nI widened the base in my drawing. It still needs a real test to see if it holds the phone.'],
  liked: ['ชอบคิดว่าจะแก้แบบให้ใช้ง่ายขึ้นยังไง','I enjoyed thinking of ways to improve the design.'],
  hard: ['ยังนึกขนาดที่พอดีไม่ออก','I was unsure about the right dimensions.'],
  next: ['อยากลองพับกระดาษเป็นต้นแบบเล็ก ๆ','I want to try a small paper prototype.']
 },
 helper: {
  starter: ['ฉันจะสอนเรื่อง… ขั้นแรก… ต่อมา… สุดท้าย… ฉันปรับคำว่า… ให้เข้าใจง่ายขึ้น','My guide explains… First… Then… Finally… I clarified…'],
  output: ['เรื่อง: จัดกระเป๋าไปเรียน\n1. เปิดตารางเรียนของวันพรุ่งนี้\n2. เลือกหนังสือและสมุดเฉพาะวิชาที่มีเรียน\n3. เช็กดินสอ ยางลบ และของที่ต้องส่ง\nฉันเปลี่ยนจากคำว่า “เตรียมให้ครบ” เป็นรายการของที่ต้องเช็ก จะได้รู้ว่าต้องทำอะไร','Topic: packing a school bag\n1. Check tomorrow’s timetable.\n2. Pick the books and notebooks for those classes.\n3. Check pencils, an eraser and work to hand in.\nI replaced “pack everything” with a checklist so a beginner knows what to check.'],
  liked: ['ชอบทำเรื่องที่ดูยุ่งให้เป็นขั้นตอนง่าย ๆ','I liked turning a messy task into simple steps.'],
  hard: ['ตอนแรกเขียนยาวไป ต้องลองตัดคำ','My first version was too long, so I shortened it.'],
  next: ['อยากลองเขียนคู่มือเรื่องอื่นที่ฉันถนัด','I want to write a guide about another familiar topic.']
 },
 entrepreneur: {
  starter: ['ลูกค้าของฉันคือ… เขามีปัญหาว่า… ฉันเลยเสนอ… และจะถามว่า…','My customer is… Their problem is… My offer is… I would ask…'],
  output: ['ลูกค้า: เพื่อนที่ลืมเอาดินสอมาเรียน\nปัญหา: ตอนเช้าไม่มีเวลาแวะร้าน\nข้อเสนอสมมุติ: ชุดดินสอและยางลบให้สั่งไว้ล่วงหน้าแล้วรับตอนเช้า\nคำถามทดสอบ: ถ้ามีบริการนี้ เธออยากใช้ไหม เพราะอะไร?','Customer: friends who forget their pencils\nProblem: no time to visit a shop before class\nImaginary offer: pre-order a pencil-and-eraser set and collect it in the morning\nTest question: would you use this, and why?'],
  liked: ['ชอบคิดจากปัญหาที่เจอใกล้ตัว','I enjoyed starting with an everyday problem.'],
  hard: ['ยังไม่รู้ว่าคนอื่นเจอปัญหานี้เหมือนกันไหม','I do not know whether other people have the same problem.'],
  next: ['อยากลองถามเพื่อนว่าข้อเสนอนี้ช่วยเขาไหม','I want to ask a friend whether the offer would help.']
 }
};
// Mission-specific overrides of the shared per-family guidance. helper-2 trains
// one skill only — listen to one person, reflect back in your own words, then
// check "did I understand?" — so it must not show the helper-family
// "write a how-to" example. Only the fields listed here are replaced.
const missionGuidanceOverrides = {
 'helper-2': {
  starter: ['เขาพูดว่า…\nฉันสรุปกลับว่า…\nเขาบอกว่า ที่ฉันสรุป… (ถูก หรือยังไม่ถูกตรงไหน)\nหลังถามกลับ ฉันเข้าใจเพิ่มว่า…','They said…\nI reflected back…\nThey told me my summary was… (right, or what was off)\nAfter checking, I understood better that…'],
  output: ['1. เขาพูดว่า: “ช่วงนี้งานล้นมือ เพราะต้องทำงานเดิมให้เสร็จ แล้วยังต้องสอนคนใหม่ด้วย”\n2. ฉันสรุปกลับว่า: “ถ้าฉันเข้าใจถูก ช่วงนี้คุณหนักเพราะต้องทำงานเดิมให้เสร็จ พร้อมกับแบ่งเวลาไปสอนคนใหม่ด้วย ใช่ไหม”\n3. เขาบอกว่า: “ใช่ แต่ที่หนักสุดคือไม่มีเวลาเงียบ ๆ ทำงานของตัวเอง”\n4. หลังถามกลับ ฉันเข้าใจเพิ่มว่า: ไม่ใช่แค่งานเยอะ แต่เวลาทำงานของเขาถูกขัดจังหวะบ่อย','1. They said: “I’m swamped lately. I have to finish my normal work and teach someone new at the same time.”\n2. I reflected back: “If I understand correctly, you’re under pressure because you have to finish your usual work while also making time to teach the new person. Is that right?”\n3. They said: “Yes, but the hardest part is having no quiet time for my own work.”\n4. After checking, I understood more: it is not only the amount of work, but that their work time keeps getting interrupted.'],
  liked: ['ชอบที่ได้ฟังจนจบ แล้วค่อยสรุปกลับด้วยคำของตัวเอง','I liked listening to the end before reflecting back in my own words.'],
  // Replaces the shared "use imaginary information…" note: this mission uses a real conversation.
  note: ['เลือกเรื่องเล็ก ๆ ที่อีกฝ่ายยินดีเล่า และหลีกเลี่ยงข้อมูลส่วนตัวหรือเรื่องอ่อนไหว คุณหยุดได้ทุกเมื่อ ภารกิจนี้เป็นหลักฐานการฝึก ไม่ใช่การรับรองระดับทักษะ','Choose a small topic the other person is happy to share, and avoid personal or sensitive information. You can stop at any time. This mission creates practice evidence; it is not a certification of skill level.']
 }
};
const guidanceFor = (key, category) => ({ ...experimentGuidance[category || key], ...missionGuidanceOverrides[key] });
// Skill Lab Voice Guide — pilot v0.1. Scoped to one mission only (creator).
// Static, pre-generated audio; no runtime TTS, no mic, no backend. Keyed by
// mission id so extending to more missions later is additive, not a rewrite.
const voiceGuidePilot = {
 creator: {
  audioSrc: 'assets/voice/skill-guide-pilot-01.mp3',
  transcript: [
   ['ภารกิจนี้คือการลองออกแบบโพสต์สั้น ๆ ให้ร้านสมมุติหนึ่งร้าน เหมือนได้ลองทำงานจริงดูสักครั้ง','This mission is about designing a short post for an imaginary shop — like trying real work for a moment.'],
   ['เราทำกิจกรรมนี้เพื่อฝึกเล่าความคิดของตัวเองออกมาเป็นคำพูดและภาพ ไม่ใช่เพื่อความสมบูรณ์แบบ แต่เพื่อให้เห็นว่าสไตล์แบบไหนที่ใช่เรา','We do this to practise turning your own ideas into words and images — not to be perfect, just to notice what style feels like you.'],
   ['เริ่มได้เลย เลือกร้านในใจ นึกถึงลูกค้าหนึ่งกลุ่ม แล้วร่างหัวข้อกับภาพที่อยากใช้ ไม่มีคำตอบถูกหรือผิด ลองทำตามที่คิดได้เลย','Start now: pick a shop in your mind, think of one audience, then sketch a headline and an image. There is no right or wrong answer — just try what you are thinking.'],
   ['พอทำเสร็จ เก็บหลักฐานไว้สามอย่าง คือข้อความโพสต์ คำอธิบายภาพ และเหตุผลสั้น ๆ ว่าทำไมเลือกแบบนี้ แค่นั้นพอแล้ว ลองดูนะ','When you are done, keep three things as evidence: the post text, a description of the image, and a short reason why you chose it. That is all you need — give it a try.']
  ]
 }
};
function renderVoiceGuideCard(key, en) {
 const guide = voiceGuidePilot[key]; if (!guide) return '';
 const transcriptHtml = guide.transcript.map(([th, enText]) => `<p>${escape(tr(en, th, enText))}</p>`).join('');
 return `<section class="skilllab-guide-card" aria-label="LifeMap Guide"><div class="skilllab-guide-head"><span class="skilllab-guide-icon" aria-hidden="true">🎧</span><div><p class="skilllab-guide-title">LifeMap Guide</p><p class="skilllab-guide-sub">${tr(en, 'ฟังคำแนะนำ', 'Listen to the guide')}</p></div></div><audio id="skilllab-guide-audio" preload="metadata" src="${guide.audioSrc}"></audio><div class="skilllab-guide-controls" role="group" aria-label="${tr(en, 'ตัวควบคุมเสียง', 'Audio controls')}"><button type="button" id="skilllab-guide-play" class="skilllab-guide-btn skilllab-guide-btn--primary" aria-label="${tr(en, 'เล่นคำแนะนำ', 'Play guide')}">▶ ${tr(en, 'เล่น', 'Play')}</button><button type="button" id="skilllab-guide-pause" class="skilllab-guide-btn" aria-label="${tr(en, 'หยุดชั่วคราว', 'Pause')}" hidden>⏸ ${tr(en, 'หยุด', 'Pause')}</button><button type="button" id="skilllab-guide-replay" class="skilllab-guide-btn" aria-label="${tr(en, 'เล่นคำแนะนำซ้ำ', 'Replay guide')}">↻ ${tr(en, 'เล่นซ้ำ', 'Replay')}</button><span class="skilllab-guide-time" id="skilllab-guide-time" aria-hidden="true">0:00 / --:--</span></div><div class="skilllab-guide-progress" aria-hidden="true"><span id="skilllab-guide-progress-bar"></span></div><button type="button" id="skilllab-guide-transcript-toggle" class="skilllab-guide-transcript-toggle" aria-expanded="false" aria-controls="skilllab-guide-transcript">${tr(en, 'อ่านข้อความแทน', 'Read transcript instead')}</button><div class="skilllab-guide-transcript" id="skilllab-guide-transcript" hidden>${transcriptHtml}</div><p class="skilllab-guide-unavailable" id="skilllab-guide-unavailable" role="status" hidden>${tr(en, 'ยังไม่มีไฟล์เสียงในขณะนี้ กรุณาอ่านข้อความแทน', 'Audio is not available yet — please read the transcript instead.')}</p></section>`;
}
// LifeMap Guide — shared conversational entry for all 15 Skill Lab missions.
// Collapsed by default (one compact CTA). It is a sibling of the creator-only
// static-audio card, never nested inside it, and contains no <form> so it
// cannot interfere with the Evidence form.
function renderLifeMapGuide(key, en) {
 return `<section class="lmguide" id="lmguide" aria-label="LifeMap Guide" data-guide-state="idle">
  <button type="button" id="lmguide-cta" class="lmguide-cta skilllab-guide-btn skilllab-guide-btn--live" aria-expanded="false" aria-controls="lmguide-panel">✨ ${tr(en, 'คุยกับ LifeMap Guide', 'Talk to LifeMap Guide · Thai voice')}</button>
  <div class="lmguide-panel" id="lmguide-panel" hidden>
   <p class="lmguide-helper">${tr(en, 'Guide ช่วยคิดและอธิบาย แต่ไม่ทำภารกิจแทนคุณ', 'The Guide helps you think and explain, but does not do the mission for you.')}</p>
   <p class="lmguide-message" id="lmguide-message" role="status" aria-live="polite" hidden></p>
   <div class="lmguide-step" data-lmguide-step="intro" hidden>
    <p class="lmguide-text">${tr(en, 'คุยด้วยเสียงภาษาไทย รอบละประมาณ 120 วินาที', 'A spoken chat in Thai, about 120 seconds per round.')}</p>
    <div class="lmguide-actions">
     <button type="button" id="lmguide-start" class="skilllab-guide-btn skilllab-guide-btn--primary">${tr(en, 'เริ่มคุยด้วยเสียง', 'Start voice chat')}</button>
     <button type="button" id="lmguide-intro-close" class="skilllab-guide-btn">${tr(en, 'ปิด', 'Close')}</button>
    </div>
   </div>
   <div class="lmguide-step" data-lmguide-step="fallback" hidden>
    <p class="lmguide-text">${tr(en, 'เบราว์เซอร์นี้เปิดไมโครโฟนไม่ได้ (เช่น เปิดจากแอป LINE) ทำภารกิจต่อได้ตามขั้นตอนบนหน้าจอ หรือเปิดหน้านี้ใน Chrome หรือ Safari เพื่อคุยด้วยเสียง', 'This browser cannot use the microphone (for example inside the LINE app). Keep going with the steps on screen, or open this page in Chrome or Safari to talk by voice.')}${voiceGuidePilot[key] ? ' ' + tr(en, 'หรืออ่านข้อความแนะนำในการ์ดด้านบน', 'You can also read the guide transcript in the card above.') : ''}</p>
    <div class="lmguide-actions"><button type="button" id="lmguide-fallback-close" class="skilllab-guide-btn">${tr(en, 'ปิด', 'Close')}</button></div>
   </div>
   <div class="lmguide-step lmguide-codebox" data-lmguide-step="code" hidden>
    <label for="lmguide-code-input">${tr(en, 'รหัสทดลอง (สำหรับผู้ก่อตั้งเท่านั้น)', 'Pilot code (founder only)')}</label>
    <input type="password" id="lmguide-code-input" autocomplete="off" inputmode="text">
    <div class="lmguide-actions">
     <button type="button" id="lmguide-code-cancel" class="skilllab-guide-btn">${tr(en, 'ยกเลิก', 'Cancel')}</button>
     <button type="button" id="lmguide-code-next" class="skilllab-guide-btn skilllab-guide-btn--primary">${tr(en, 'ต่อไป', 'Next')}</button>
    </div>
   </div>
   <div class="lmguide-step" data-lmguide-step="consent" hidden>
    <p class="lmguide-text">${tr(en, 'LifeMap Guide จะใช้ไมโครโฟนของคุณเพื่อฟังและตอบเป็นเสียงภาษาไทย เสียงของคุณจะถูกส่งไปยังบริการ AI ระหว่างคุย ปิดไมค์หรือจบการสนทนาได้ทุกเมื่อ', 'LifeMap Guide will use your microphone to listen and reply in Thai voice. Your voice is sent to an AI service during the chat. You can mute or end the chat at any time.')}</p>
    <div class="lmguide-actions">
     <button type="button" id="lmguide-consent-cancel" class="skilllab-guide-btn">${tr(en, 'ยกเลิก', 'Cancel')}</button>
     <button type="button" id="lmguide-consent-allow" class="skilllab-guide-btn skilllab-guide-btn--primary">${tr(en, 'อนุญาตไมโครโฟนและเริ่ม', 'Allow microphone and start')}</button>
    </div>
   </div>
   <div class="lmguide-step" data-lmguide-step="result" hidden>
    <div class="lmguide-actions">
     <button type="button" id="lmguide-continue" class="skilllab-guide-btn skilllab-guide-btn--primary" hidden>${tr(en, 'คุยต่อ', 'Continue talking')}</button>
     <button type="button" id="lmguide-retry" class="skilllab-guide-btn skilllab-guide-btn--primary">${tr(en, 'คุยอีกครั้ง', 'Talk again')}</button>
     <button type="button" id="lmguide-result-close" class="skilllab-guide-btn">${tr(en, 'ปิด', 'Close')}</button>
    </div>
   </div>
   <div class="lmguide-step lmguide-session" data-lmguide-step="session" hidden>
    <div class="lmguide-status" id="lmguide-status" role="status" aria-live="polite"></div>
    <div class="lmguide-actions">
     <button type="button" id="lmguide-mute" class="skilllab-guide-btn" aria-pressed="false">${tr(en, 'ปิดไมค์', 'Mute')}</button>
     <button type="button" id="lmguide-end" class="skilllab-guide-btn skilllab-guide-btn--danger">${tr(en, 'จบการสนทนา', 'End conversation')}</button>
    </div>
    <div class="lmguide-transcript" id="lmguide-transcript" aria-live="polite"></div>
   </div>
  </div>
 </section>`;
}
function bindVoiceGuide(root, en, key, onPlayed) {
 const guide = voiceGuidePilot[key]; if (!guide) return;
 const card = root.querySelector('.skilllab-guide-card'); if (!card) return;
 const audio = card.querySelector('#skilllab-guide-audio');
 const playBtn = card.querySelector('#skilllab-guide-play');
 const pauseBtn = card.querySelector('#skilllab-guide-pause');
 const replayBtn = card.querySelector('#skilllab-guide-replay');
 const timeEl = card.querySelector('#skilllab-guide-time');
 const progressBar = card.querySelector('#skilllab-guide-progress-bar');
 const transcriptToggle = card.querySelector('#skilllab-guide-transcript-toggle');
 const transcript = card.querySelector('#skilllab-guide-transcript');
 const unavailable = card.querySelector('#skilllab-guide-unavailable');
 const fmt = (s) => { if (!Number.isFinite(s)) return '--:--'; const m = Math.floor(s / 60), sec = Math.floor(s % 60).toString().padStart(2, '0'); return `${m}:${sec}`; };
 let hasPlayed = false, hasCompleted = false, hasOpenedTranscript = false, isUnavailable = false;
 const dispatch = (name) => { try { window.dispatchEvent(new CustomEvent(`lifemap:${name}`, { detail: { mission: key } })); } catch (_e) {} };
 const setUnavailable = () => {
  if (isUnavailable) return; isUnavailable = true;
  unavailable.hidden = false;
  playBtn.disabled = true; pauseBtn.disabled = true; replayBtn.disabled = true;
  timeEl.textContent = tr(en, 'ไม่พร้อมใช้งาน', 'Unavailable');
 };
 audio.addEventListener('error', setUnavailable);
 audio.addEventListener('loadedmetadata', () => { timeEl.textContent = `0:00 / ${fmt(audio.duration)}`; });
 audio.addEventListener('timeupdate', () => {
  if (audio.duration) { progressBar.style.width = `${(audio.currentTime / audio.duration) * 100}%`; timeEl.textContent = `${fmt(audio.currentTime)} / ${fmt(audio.duration)}`; }
 });
 audio.addEventListener('ended', () => {
  playBtn.hidden = false; pauseBtn.hidden = true; progressBar.style.width = '100%';
  if (!hasCompleted) { hasCompleted = true; dispatch('voice_guide_completed'); }
 });
 const startPlayback = () => {
  const result = audio.play();
  if (result && typeof result.catch === 'function') result.catch(setUnavailable);
  playBtn.hidden = true; pauseBtn.hidden = false;
  if (!hasPlayed) { hasPlayed = true; dispatch('voice_guide_played'); if (typeof onPlayed === 'function') onPlayed(); }
 };
 playBtn.addEventListener('click', startPlayback);
 pauseBtn.addEventListener('click', () => { audio.pause(); playBtn.hidden = false; pauseBtn.hidden = true; });
 replayBtn.addEventListener('click', () => { audio.currentTime = 0; startPlayback(); });
 transcriptToggle.addEventListener('click', () => {
  const willOpen = transcript.hidden;
  transcript.hidden = !willOpen;
  transcriptToggle.setAttribute('aria-expanded', String(willOpen));
  transcriptToggle.textContent = willOpen ? tr(en, 'ซ่อนข้อความ', 'Hide transcript') : tr(en, 'อ่านข้อความแทน', 'Read transcript instead');
  if (willOpen && !hasOpenedTranscript) { hasOpenedTranscript = true; dispatch('transcript_opened'); }
 });
 if (!audio.getAttribute('src')) setUnavailable();
}

// LifeMap Guide — shared conversational client (all 15 Skill Lab missions).
// Backend: lifemap-voice-lab (separate Netlify project), endpoint
// skill-guide-session.mjs, mission context 2026-10-skill-guide-context-2
// (branch phase1/skill-guide-mission-context).
// The client sends only { missionKey, sdp }. Every instruction, mission text
// and guardrail lives server-side; none is duplicated here.
const SKILL_GUIDE_BACKEND_URL = 'https://lifemap-voice-lab.netlify.app/.netlify/functions/skill-guide-session';
// Client-side soft cap only. It is NOT a server-enforced quota: a modified
// client could ignore it.
const SKILL_GUIDE_SOFT_CAP_MS = 120000;

// One explicit state model for the whole feature. UI is derived from it.
//   idle        nothing started (the panel steps before connecting live here)
//   connecting  consent given; mic, WebRTC and backend handshake in progress
//   listening   data channel open; connected, neutral
//   speaking    supported by the model but NOT entered by any code path today:
//               the GPT-Live data-channel events that mark the start/end of
//               model audio have not been verified against real events, and an
//               AnalyserNode guess would be unreliable, so `listening` stays
//               the connected state. Wire a verified signal to
//               transition('speaking') later; the UI label already exists.
//   ending      session.close sent if possible, resources being released
//   ended       finished normally (user, cap, or remote close)
//   error       failed to start or lost; message says why
export const SKILL_GUIDE_STATES = Object.freeze(['idle', 'connecting', 'listening', 'speaking', 'ending', 'ended', 'error']);
export const SKILL_GUIDE_TRANSITIONS = Object.freeze({
 idle: ['connecting'],
 connecting: ['listening', 'ending', 'error'],
 listening: ['speaking', 'ending', 'error'],
 speaking: ['listening', 'ending', 'error'],
 ending: ['ended'],
 ended: ['connecting'],
 error: ['connecting']
});
const SKILL_GUIDE_LIVE_STATES = ['connecting', 'listening', 'speaking', 'ending'];

// The pilot code lives here, in JS memory only, for the life of the page.
// Never written to storage, URL, DOM attributes, analytics or console, and
// never rendered back into an input. A page reload clears it.
let skillGuidePilotCode = '';
let activeSkillGuide = null;

function disposeSkillGuide() {
 const guide = activeSkillGuide;
 activeSkillGuide = null;
 if (guide) guide.dispose();
}

if (typeof window !== 'undefined' && !window.__skillGuideUnloadBound) {
 window.__skillGuideUnloadBound = true;
 window.addEventListener('beforeunload', () => disposeSkillGuide());
}

function isLineInAppBrowser() {
 return /\bLine\//i.test(navigator.userAgent || '');
}

function skillGuideMicSupported() {
 return Boolean(navigator.mediaDevices?.getUserMedia) && typeof RTCPeerConnection !== 'undefined';
}

function mountSkillGuide(root, en, key) {
 // Whatever was mounted by a previous render (other mission, language toggle,
 // returning to the mission list) is torn down before new DOM is bound.
 disposeSkillGuide();
 const el = root.querySelector('#lmguide'); if (!el) return;
 const cta = el.querySelector('#lmguide-cta');
 const panel = el.querySelector('#lmguide-panel');
 const messageEl = el.querySelector('#lmguide-message');
 const stepEls = Object.fromEntries(['intro', 'fallback', 'code', 'consent', 'result', 'session'].map((name) => [name, el.querySelector(`[data-lmguide-step="${name}"]`)]));
 const codeInput = el.querySelector('#lmguide-code-input');
 const statusEl = el.querySelector('#lmguide-status');
 const muteBtn = el.querySelector('#lmguide-mute');
 const endBtn = el.querySelector('#lmguide-end');
 const transcriptEl = el.querySelector('#lmguide-transcript');
 const retryBtn = el.querySelector('#lmguide-retry');
 const continueBtn = el.querySelector('#lmguide-continue');
 const canVoice = !isLineInAppBrowser() && skillGuideMicSupported();

 // `view` only decides which pre-connection step is open while state is
 // idle / ended / error; during a live session the session panel is shown.
 // `continueFromTimeout` is true only while the Guide sits in `ended` because the
 // client soft cap fired, and only for this mount (same mission, same page
 // lifetime). It lets "Continue talking" skip the consent step once. It is
 // cleared by every other transition and every panel navigation, and a new
 // mount (mission change, language/view re-render, reload) starts it false.
 // It is never persisted, and the microphone is never held between sessions.
 const model = { state: 'idle', view: 'collapsed', message: '', continueFromTimeout: false };
 let attempt = null;
 let dead = false;
 let lastTranscript = '';

 const STATUS_TEXT = {
  connecting: tr(en, 'กำลังเชื่อมต่อ LifeMap Guide…', 'Connecting to LifeMap Guide…'),
  listening: tr(en, 'เชื่อมต่อแล้ว ลองพูดได้เลย', 'Connected — go ahead and speak'),
  speaking: tr(en, 'LifeMap Guide กำลังพูด…', 'LifeMap Guide is speaking…'),
  ending: tr(en, 'กำลังจบการสนทนา…', 'Ending the conversation…')
 };

 function render() {
  if (dead) return;
  const live = SKILL_GUIDE_LIVE_STATES.includes(model.state);
  const view = live ? 'session' : model.view;
  el.dataset.guideState = model.state;
  cta.setAttribute('aria-expanded', String(view !== 'collapsed'));
  panel.hidden = view === 'collapsed';
  for (const [name, node] of Object.entries(stepEls)) node.hidden = name !== view;
  messageEl.hidden = live || !model.message;
  messageEl.textContent = live ? '' : model.message;
  statusEl.textContent = STATUS_TEXT[model.state] || '';
  const talking = model.state === 'listening' || model.state === 'speaking';
  muteBtn.disabled = !talking;
  endBtn.disabled = model.state === 'ending';
  continueBtn.hidden = !model.continueFromTimeout;
  retryBtn.hidden = model.continueFromTimeout;
 }

 function transition(next, patch = {}) {
  if (!SKILL_GUIDE_TRANSITIONS[model.state]?.includes(next)) return false;
  Object.assign(model, { continueFromTimeout: false }, patch, { state: next });
  render();
  return true;
 }

 function openView(view, message = '') {
  if (SKILL_GUIDE_LIVE_STATES.includes(model.state)) return;
  model.continueFromTimeout = false;
  model.view = view;
  model.message = message;
  render();
 }

 // The app hides inactive screens with visibility:hidden (and keeps them
 // mounted, without re-rendering), so a live session also ends when the Guide
 // stops being displayed. Scrolling it out of view does not count.
 const guideIsShown = () => el.isConnected && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';

 function cleanupAttempt(a) {
  a.disposed = true;
  if (a.softCapTimer) clearTimeout(a.softCapTimer);
  if (a.visibilityTimer) clearInterval(a.visibilityTimer);
  try { a.abort.abort(); } catch {}
  a.micStream?.getTracks().forEach((t) => t.stop());
  try { a.dataChannel?.close(); } catch {}
  try { a.peer?.close(); } catch {}
  if (a.remoteAudio) { try { a.remoteAudio.pause(); } catch {} a.remoteAudio.srcObject = null; }
 }

 function dispose() {
  dead = true;
  if (attempt) cleanupAttempt(attempt);
  attempt = null;
 }

 function addTranscriptLine(text, role) {
  const clean = String(text || '').trim();
  if (!clean || clean === lastTranscript) return;
  lastTranscript = clean;
  const line = document.createElement('div');
  line.className = `skilllab-conversation-line skilllab-conversation-line--${role}`;
  line.textContent = clean;
  transcriptEl.append(line);
  transcriptEl.scrollTop = transcriptEl.scrollHeight;
 }

 function extractTranscript(event) {
  const nested = event?.event;
  const source = nested && typeof nested === 'object' ? nested : event;
  const type = String(source?.type || event?.type || '');
  const text = source?.transcript || source?.text || source?.delta?.transcript || source?.delta?.text;
  if (typeof text !== 'string' || !text.trim()) return null;
  const role = /input|user/i.test(type) ? 'user' : 'assistant';
  return { text, role, type };
 }

 function handleChannelMessage(raw) {
  let event;
  try { event = JSON.parse(raw); } catch { return; }
  if (event.type === 'session.closed') { endSession(tr(en, 'จบการสนทนาแล้ว', 'Conversation ended'), false); return; }
  const result = extractTranscript(event);
  if (result && /transcript|text|message/i.test(result.type)) addTranscriptLine(result.text, result.role);
 }

 // ending → cleanup → ended. Safe to call more than once.
 function endSession(message, sendClose, timedOut = false) {
  const a = attempt;
  if (!a || a.disposed || !transition('ending')) return;
  if (sendClose) {
   try { if (a.dataChannel?.readyState === 'open') a.dataChannel.send(JSON.stringify({ type: 'session.close' })); } catch {}
  }
  cleanupAttempt(a);
  attempt = null;
  transcriptEl.replaceChildren();
  lastTranscript = '';
  transition('ended', { view: 'result', message, continueFromTimeout: timedOut });
 }

 function failSession(a, message) {
  if (attempt === a) attempt = null;
  cleanupAttempt(a);
  transcriptEl.replaceChildren();
  lastTranscript = '';
  transition('error', { view: 'result', message });
 }

 async function waitForIce(connection, signal) {
  if (connection.iceGatheringState === 'complete') return;
  await new Promise((resolve, reject) => {
   const done = () => {
    clearTimeout(timer);
    signal.removeEventListener('abort', done);
    connection.removeEventListener('icegatheringstatechange', onState);
   };
   const timer = setTimeout(() => {
    done();
    reject(new Error(tr(en, 'การเชื่อมต่อใช้เวลานานเกินไป กรุณาลองใหม่', 'The connection took too long — please try again')));
   }, 10000);
   function onState() {
    if (connection.iceGatheringState !== 'complete') return;
    done();
    resolve();
   }
   signal.addEventListener('abort', () => { done(); resolve(); });
   connection.addEventListener('icegatheringstatechange', onState);
  });
 }

 // Must be called synchronously from the "Allow microphone" click so the
 // browser sees a user gesture; getUserMedia is its first await.
 async function startSession() {
  if (dead || !transition('connecting', { message: '' })) return;
  muteBtn.setAttribute('aria-pressed', 'false');
  muteBtn.textContent = tr(en, 'ปิดไมค์', 'Mute');
  const a = { disposed: false, peer: null, dataChannel: null, micStream: null, remoteAudio: null, softCapTimer: null, visibilityTimer: null, abort: new AbortController() };
  attempt = a;
  a.visibilityTimer = setInterval(() => {
   if (!guideIsShown()) endSession(tr(en, 'จบการสนทนาเพราะออกจากหน้านี้', 'Conversation ended because you left this screen'), true);
  }, 500);
  try {
   const micStream = await navigator.mediaDevices.getUserMedia({
    audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
   });
   // Mission changed / page re-rendered while the permission prompt was open.
   if (a.disposed) { micStream.getTracks().forEach((t) => t.stop()); return; }
   a.micStream = micStream;

   const connection = new RTCPeerConnection();
   a.peer = connection;
   const remoteAudio = new Audio();
   remoteAudio.autoplay = true;
   a.remoteAudio = remoteAudio;
   connection.addEventListener('track', (event) => {
    if (!a.disposed) remoteAudio.srcObject = new MediaStream([event.track]);
   });
   for (const track of micStream.getAudioTracks()) connection.addTrack(track, micStream);

   const dataChannel = connection.createDataChannel('oai-events');
   a.dataChannel = dataChannel;
   // The 120 s soft cap starts when the data channel actually opens — the point
   // at which the live session is usable — not when the button was pressed.
   dataChannel.addEventListener('open', () => {
    if (a.disposed) return;
    a.softCapTimer = setTimeout(() => {
     endSession(tr(en, 'ครบเวลาสนทนาแล้ว (120 วินาที)', 'Time limit reached (120 seconds)'), true, true);
    }, SKILL_GUIDE_SOFT_CAP_MS);
    transition('listening');
   });
   dataChannel.addEventListener('message', ({ data }) => { if (!a.disposed) handleChannelMessage(data); });
   dataChannel.addEventListener('close', () => { if (!a.disposed) endSession(tr(en, 'จบการสนทนาแล้ว', 'Conversation ended'), false); });

   const offer = await connection.createOffer();
   await connection.setLocalDescription(offer);
   await waitForIce(connection, a.abort.signal);
   if (a.disposed) return;
   const sdp = connection.localDescription?.sdp;
   if (!sdp) throw new Error(tr(en, 'ไม่พบข้อมูลสำหรับเริ่มการเชื่อมต่อ', 'Could not prepare the connection'));

   const response = await fetch(SKILL_GUIDE_BACKEND_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-LifeMap-Skill-Guide-Code': skillGuidePilotCode },
    body: JSON.stringify({ missionKey: key, sdp }),
    signal: a.abort.signal,
   });
   const result = await response.json().catch(() => ({}));
   if (a.disposed) return;
   if (!response.ok) {
    // A rejected code is dropped from memory so the next try asks again.
    if (response.status === 401) skillGuidePilotCode = '';
    throw new Error(result.error || tr(en, 'ไม่สามารถเปิดการสนทนาได้', 'Could not start the conversation'));
   }
   await connection.setRemoteDescription({ type: 'answer', sdp: result.transport.sdp });
  } catch (error) {
   if (a.disposed) return;
   const message = error?.name === 'NotAllowedError' || error?.name === 'SecurityError'
    ? tr(en, 'ยังไม่ได้รับอนุญาตใช้ไมโครโฟน กรุณาอนุญาตแล้วลองใหม่', 'Microphone permission was not granted — please allow it and try again')
    : error instanceof TypeError
     ? tr(en, 'เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองใหม่', 'Could not reach the server — check your connection and try again')
     : (error instanceof Error ? error.message : String(error));
   failSession(a, message);
  }
 }

 cta.addEventListener('click', () => {
  if (SKILL_GUIDE_LIVE_STATES.includes(model.state)) return;
  if (model.view === 'collapsed') openView(canVoice ? 'intro' : 'fallback');
  else { codeInput.value = ''; openView('collapsed'); }
 });
 el.querySelector('#lmguide-start').addEventListener('click', () => {
  // Order: pilot code (only if not already held in memory) → explicit mic consent.
  if (skillGuidePilotCode) openView('consent');
  else { codeInput.value = ''; openView('code'); codeInput.focus(); }
 });
 for (const id of ['#lmguide-intro-close', '#lmguide-fallback-close', '#lmguide-result-close', '#lmguide-consent-cancel']) {
  el.querySelector(id).addEventListener('click', () => openView('collapsed'));
 }
 el.querySelector('#lmguide-code-cancel').addEventListener('click', () => { codeInput.value = ''; openView('intro'); });
 el.querySelector('#lmguide-code-next').addEventListener('click', () => {
  // Read, keep in memory, clear the field immediately.
  const code = codeInput.value;
  codeInput.value = '';
  if (!code) { openView('code', tr(en, 'กรุณากรอกรหัสทดลอง', 'Please enter the pilot code')); codeInput.focus(); return; }
  skillGuidePilotCode = code;
  openView('consent');
 });
 el.querySelector('#lmguide-consent-allow').addEventListener('click', () => { startSession(); });
 retryBtn.addEventListener('click', () => {
  // A new voice session always passes through explicit consent again.
  if (skillGuidePilotCode) openView('consent');
  else { codeInput.value = ''; openView('code'); codeInput.focus(); }
 });
 continueBtn.addEventListener('click', () => {
  // Same mission, straight from the timeout: skip the consent step once. The
  // previous session is already fully released; this opens a fresh WebRTC
  // session and asks the browser for the microphone again.
  if (model.state === 'ended' && model.continueFromTimeout && skillGuidePilotCode) startSession();
  else if (skillGuidePilotCode) openView('consent');
  else { codeInput.value = ''; openView('code'); codeInput.focus(); }
 });
 muteBtn.addEventListener('click', () => {
  const stream = attempt?.micStream;
  if (!stream) return;
  const nowMuted = stream.getAudioTracks().some((t) => t.enabled);
  stream.getAudioTracks().forEach((t) => { t.enabled = !nowMuted; });
  muteBtn.setAttribute('aria-pressed', String(nowMuted));
  muteBtn.textContent = nowMuted ? tr(en, 'เปิดไมค์', 'Unmute') : tr(en, 'ปิดไมค์', 'Mute');
 });
 endBtn.addEventListener('click', () => endSession(tr(en, 'จบการสนทนาแล้ว', 'Conversation ended'), true));

 activeSkillGuide = { dispose };
 render();
}
function renderAnswerGuide(key, field, en) {
 const guide = guidanceFor(key, paths[key]?.category);
 const id = `experiment-${field}-guide`;
 if (field === 'output') return `<div id="${id}" class="experiment-answer-guide"><p>${tr(en,'เริ่มเขียนได้แบบนี้:','You can start with:')} ${escape(guide.starter[en?1:0])}</p><section class="experiment-example"><h4>${tr(en,'ตัวอย่างคำตอบของกิจกรรมนี้','Example answer for this activity')}</h4><p>${tr(en,'ตัวอย่างสมมุติ ใช้ดูแนวทาง แล้วเขียนเรื่องของคุณเอง','An imaginary example. Use it as a guide and write your own version.')}</p><blockquote>${escape(guide.output[en?1:0])}</blockquote></section></div>`;
 return `<p id="${id}" class="experiment-answer-guide">${tr(en,'ตัวอย่าง:','Example:')} ${escape(guide[field][en?1:0])}</p>`;
}

export function rankPaths(answers, questions) {
 const ranked = corePathIds.map(id => ({id, hits:[]}));
 questions.slice(0,5).forEach(q => {const option=q.options[answers?.[q.id]]; const row=ranked.find(x=>x.id===option?.cluster); if(row) row.hits.push(option.label);});
 return ranked.sort((a,b)=>b.hits.length-a.hits.length);
}
function returnToResult(navigate, targetId) {
 navigate('quiz-tab');
 const target=document.getElementById(targetId);
 if(target){target.focus();target.scrollIntoView({block:'start'});}
}
function gradeContext(state,en) {
 if(state.gradeLevel==='uni') return tr(en,'ลองบทบาทงานจากสิ่งที่เรียน และเก็บแนวคิดไว้พัฒนาเป็นผลงานสมัครฝึกงาน','Explore a role related to your studies and develop a portfolio idea.');
 if(['pvc','pvs'].includes(state.gradeLevel)) return tr(en,'เชื่อมทักษะวิชาชีพกับงานที่อยากลอง และสังเกตทักษะที่ต้องฝึกเพิ่ม','Connect vocational skills with work you want to try and skills to practise.');
 if(state.gradeLevel==='work') return tr(en,'สำรวจบทบาทที่สนใจผ่านงานเล็ก ๆ ก่อนตัดสินใจเปลี่ยนเส้นทาง','Try a small task before deciding on a career change.');
 return tr(en,'ลองกิจกรรมเล็ก ๆ เพื่อช่วยเลือกเรื่องที่อยากเรียนรู้ต่อ ยังไม่ต้องรีบเลือกอาชีพ','Try a small activity to discover what to learn next. No career decision required.');
}
function commit(state,save,mutate,status,en) {
 const before=state.exploration;
 state.exploration=JSON.parse(JSON.stringify(before || {version:1,selected:null,drafts:{},entries:[]}));
 try {mutate(state.exploration); save(); return true;}
 catch {state.exploration=before; if(status){status.textContent=tr(en,'บันทึกไม่ได้ ข้อความยังอยู่ในแบบฟอร์ม กรุณาคัดลอกข้อความเก็บไว้ก่อนออกจากหน้านี้ แล้วลองบันทึกอีกครั้ง การส่งออกข้อมูลเป็นเพียงการสำรอง ไม่ได้เพิ่มพื้นที่ว่าง','Could not save. Copy your current text before leaving this page, then retry saving. Exporting creates a backup; it does not free storage.');status.dataset.error='true';} return false;}
}
function history(state,en) {
 const entries=state.exploration?.entries || [];
 const attemptNumber={};
 const records=entries.map(e=>{
  attemptNumber[e.path]=(attemptNumber[e.path] || 0)+1;
  const path=paths[e.path],pathName=en?path?.en:path?.th,skillName=en?skillCatalog[path?.category]?.en:skillCatalog[path?.category]?.th;
  if(e.enjoyment && e.difficulty && e.nextChoice){
   const nextLabel=nextChoiceLabel(e.nextChoice,en);
   return `<article class="explore-record"><p class="evidence-skill-tag">${escape(skillName || '')}</p><h4>${escape(pathName)} · ${tr(en,`ครั้งที่ ${attemptNumber[e.path]}`,`Attempt ${attemptNumber[e.path]}`)}</h4><div class="explore-record-ratings"><span>${tr(en,'สนุก','Enjoyment')} <strong>${escape(e.enjoyment)}/5</strong></span><span>${tr(en,'ยาก','Difficulty')} <strong>${escape(e.difficulty)}/5</strong></span><span>${tr(en,'ก้าวต่อไป','Next')} <strong>${escape(nextLabel)}</strong></span></div>${e.output?`<p><strong>${tr(en,'หลักฐานที่บันทึก:','Saved evidence:')}</strong> ${escape(e.output)}</p>`:''}</article>`;
  }
  return `<article class="explore-record"><h4>${escape(pathName)} · ${tr(en,`ครั้งที่ ${attemptNumber[e.path]}`,`Attempt ${attemptNumber[e.path]}`)}</h4>${e.output?`<p><strong>${tr(en,'ผลงานที่บันทึก:','Your work:')}</strong> ${escape(e.output)}</p>`:''}<p><strong>${tr(en,'ชอบ:','Liked:')}</strong> ${escape(e.liked)}</p><p><strong>${tr(en,'ยาก:','Challenging:')}</strong> ${escape(e.hard)}</p><p><strong>${tr(en,'ก้าวต่อไป:','Next step:')}</strong> ${escape(e.next)}</p></article>`;
 }).join('');
 return `<section class="explore-history"><h3 id="explore-history-title" tabindex="-1">${tr(en,'คลังหลักฐานของฉัน','My evidence library')}</h3><p>${tr(en,'หลักฐานเหล่านี้มาจากสิ่งที่คุณลงมือทำจริงในเครื่องนี้ ไม่ใช่คะแนนที่ AI เดาขึ้นมา','This evidence comes from activities you completed on this device, not an AI-generated score.')}</p>${entries.length ? records:`<p>${tr(en,'ยังไม่มีหลักฐาน เริ่มจากภารกิจหนึ่งอย่างที่อยากลอง','No evidence yet. Start with one mission you want to try.')}</p>`}</section>`;
}
const nextChoiceLabel=(choice,en)=>({continue:tr(en,'ทำต่อ','Continue'),switch:tr(en,'ลองอย่างอื่น','Try something else'),unsure:tr(en,'ยังไม่แน่ใจ','Not sure yet')})[choice] || choice || '';
function skillPortfolio(state,en){
 const entries=state.exploration?.entries || [];
 const completed=new Set(entries.map(entry=>entry.path));
 const cards=corePathIds.map(id=>{
  const missions=Object.entries(paths).filter(([,path])=>path.category===id);
  const done=missions.filter(([key])=>completed.has(key)).length;
  const attempts=entries.filter(entry=>paths[entry.path]?.category===id).length;
  const level=done===0?tr(en,'ยังไม่ได้เริ่ม','Not started'):done===1?tr(en,'เริ่มทดลอง','Explorer'):done===2?tr(en,'กำลังฝึก','Practising'):tr(en,'มีหลักฐาน 3 แบบ','3 evidence types');
  return `<article class="skill-evidence-card"><div class="skill-evidence-head"><h3>${escape(en?skillCatalog[id].en:skillCatalog[id].th)}</h3><strong>${done}/3</strong></div><p>${level} · ${tr(en,`${attempts} บันทึก`,`${attempts} ${attempts===1?'entry':'entries'}`)}</p><div class="skill-evidence-track" role="progressbar" aria-label="${tr(en,`ทำแล้ว ${done} จาก 3 ภารกิจ`,`Completed ${done} of 3 missions`)}" aria-valuemin="0" aria-valuemax="3" aria-valuenow="${done}"><span style="width:${done/3*100}%"></span></div></article>`;
 }).join('');
 return `<section class="skill-evidence-portfolio" aria-label="${tr(en,'สรุปหลักฐานทักษะ','Skill evidence summary')}"><div class="skill-evidence-intro"><p class="evidence-eyebrow">LIFEMAP SKILL EVIDENCE</p><h2>${tr(en,'เปลี่ยนสิ่งที่ลอง ให้เป็นหลักฐานทักษะ','Turn what you try into skill evidence')}</h2><p>${tr(en,'เลือกทำ 15 ภารกิจใน 5 ทักษะ ทุกครั้งที่บันทึกจะต่อยอดเป็นประวัติการลงมือทำของคุณ','Complete 15 missions across 5 skills. Every saved attempt builds your personal record of action.')}</p></div><div class="skill-evidence-grid">${cards}</div></section>`;
}
function activitySummary(state,en,id){
 const entries=state.exploration?.entries || [],count=entries.length;
 if(count<3)return `<section class="activity-progress" id="${id}" aria-live="polite"><h3>${tr(en,'ลองทีละเรื่อง ไม่ต้องรีบ','One small try at a time')}</h3><p>${tr(en,`บันทึกแล้ว ${count} จาก 3 กิจกรรม ลองอีก ${3-count} กิจกรรมเพื่อดูสิ่งที่เริ่มชัดขึ้น`,`You have saved ${count} of 3 activities. Try ${3-count} more to see what is becoming clearer.`)}</p><div class="activity-progress-track" role="progressbar" aria-label="${tr(en,`ความคืบหน้า ${count} จาก 3 กิจกรรม`,`Progress: ${count} of 3 activities`)}" aria-valuemin="0" aria-valuemax="3" aria-valuenow="${count}"><span style="width:${Math.min(100,count/3*100)}%"></span></div></section>`;
 const recent=entries.slice(-3),rated=recent.filter(e=>Number(e.enjoyment)&&Number(e.difficulty));
 const avg=(key)=>rated.length?(rated.reduce((sum,e)=>sum+Number(e[key]),0)/rated.length).toFixed(1):null;
 const enjoyment=avg('enjoyment'),difficulty=avg('difficulty');
 const pathCounts={};recent.forEach(e=>pathCounts[e.path]=(pathCounts[e.path]||0)+1);
 const leading=Object.keys(pathCounts).sort((a,b)=>pathCounts[b]-pathCounts[a])[0];
 const latest=recent.at(-1),recommendation=latest?.nextChoice==='continue'
  ? tr(en,'เลือกทำกิจกรรมแนวเดิมอีกครั้ง แล้วเพิ่มความท้าทายขึ้นเล็กน้อย','Repeat this kind of activity with one small added challenge.')
  : latest?.nextChoice==='switch'
   ? tr(en,'เลือกกิจกรรมอีกแนวหนึ่งมาเปรียบเทียบ ไม่ต้องฝืนทำเรื่องเดิม','Choose a different kind of activity to compare. You do not need to force the same path.')
   : tr(en,'ลองอีกหนึ่งกิจกรรมก่อนตัดสินใจ ความไม่แน่ใจเป็นข้อมูลที่มีประโยชน์','Try one more activity before deciding. Uncertainty is useful information.');
 return `<section class="activity-summary-result" id="${id}" tabindex="-1" aria-live="polite"><h3>${tr(en,'สรุปสิ่งที่ค้นพบจาก 3 กิจกรรมล่าสุด','What your last 3 activities suggest')}</h3><p>${tr(en,'นี่คือภาพสะท้อนจากคำตอบของคุณ ไม่ใช่คะแนนความถนัดหรือคำตัดสินอาชีพ','This reflects your answers. It is not an aptitude score or career verdict.')}</p><div class="activity-summary-facts">${enjoyment?`<p><span>${tr(en,'ความสนุกเฉลี่ย','Average enjoyment')}</span><strong>${enjoyment}/5</strong></p>`:''}${difficulty?`<p><span>${tr(en,'ความยากเฉลี่ย','Average difficulty')}</span><strong>${difficulty}/5</strong></p>`:''}<p><span>${tr(en,'แนวที่ลองบ่อยสุด','Most-tried path')}</span><strong>${escape(leading?(en?paths[leading]?.en:paths[leading]?.th):tr(en,'ยังไม่พอจะสรุป','Not enough data'))}</strong></p></div><p class="activity-next-step"><strong>${tr(en,'ก้าวถัดไป:','Next step:')}</strong> ${recommendation}</p><button type="button" class="btn btn-primary" data-activity-next>${tr(en,'เลือกกิจกรรมถัดไป','Choose my next activity')}</button></section>`;
}
function bindActivitySummary(root,navigate){
 root.querySelector('[data-activity-next]')?.addEventListener('click',()=>returnToResult(navigate,'explore-paths'));
}
function usageGuideMarkup(en){
 return `<section class="try-usage-guide" aria-labelledby="try-usage-title"><h3 id="try-usage-title">${tr(en,'วิธีใช้หน้านี้','How to use this page')}</h3><ol><li><strong>${tr(en,'อ่านโจทย์และดูตัวอย่าง','Read the task and example')}</strong></li><li><strong>${tr(en,'ทำกิจกรรม แล้วพิมพ์ผลงานลงในช่อง','Do the activity and enter your response')}</strong></li><li><strong>${tr(en,'ตอบความรู้สึก 3 ข้อ แล้วกดบันทึก','Answer 3 reflection questions and save')}</strong></li></ol><p>${tr(en,'ใช้เวลาประมาณ 10 นาที ไม่มีคำตอบถูกหรือผิด ทำไม่เสร็จก็กลับมาทำต่อได้','Allow about 10 minutes. There are no right or wrong answers. You can return later if unfinished.')}</p></section>`;
}
function insertUsageGuide(root,en){
 if(typeof root.insertAdjacentHTML!=='function')return;
 const heading=root.querySelector('.experiment-heading');
 if(heading?.insertAdjacentHTML)heading.insertAdjacentHTML('afterend',usageGuideMarkup(en));
 else root.insertAdjacentHTML('afterbegin',usageGuideMarkup(en));
}
function positionActivityResponse(root,p,key,en){
 if(typeof document.createElement!=='function')return;
 const form=root.querySelector('#experiment-form'),reflectionHeading=form?.querySelector('h3');
 const label=root.querySelector('label[for="experiment-output"]'),guide=root.querySelector('.experiment-answer-guide'),textarea=root.querySelector('#experiment-output');
 if(!form||!reflectionHeading||!label||!guide||!textarea)return;
 const section=document.createElement('section');
 section.className='activity-response';
 const heading=document.createElement('h3');
 heading.textContent=tr(en,'ลองทำกิจกรรมตรงนี้ก่อน','Do the activity here first');
 label.textContent=p.prompt[en?1:0];
 guide.id='experiment-output-guide';
 const guidance=guidanceFor(key, p.category);
 guide.innerHTML=`<span>${tr(en,'เริ่มเขียนได้แบบนี้:','Start like this:')} ${escape(guidance.starter[en?1:0])}</span><span><strong>${tr(en,'ตัวอย่าง:','Example:')}</strong> ${escape(guidance.output[en?1:0])}</span>`;
 textarea.required=true;
 textarea.rows=5;
 textarea.maxLength=2000;
 textarea.placeholder=tr(en,'พิมพ์คำตอบของกิจกรรมนี้','Write your activity response');
 textarea.setAttribute('aria-describedby','experiment-output-guide');
 section.append(heading,label,guide,textarea);
 form.insertBefore(section,reflectionHeading);
 reflectionHeading.textContent=tr(en,'ทำเสร็จแล้ว ตอบความรู้สึก 3 ข้อ','Finished? Answer 3 quick questions');
}
export function renderExplorationResult(state,questions,save,navigate) {
 const root=document.getElementById('exploration-result');if(!root)return;
 const en=state.language==='en';
 if(localStorage.getItem('lifemap_logged_in_role')==='parent'){root.replaceChildren();return;}
 const ranked=rankPaths(state.answers,questions),top=ranked[0];
 function draw(){
  const list=ranked;
  root.innerHTML=`<div class="explore-summary"><div><h2>${tr(en,'จากคำตอบ สู่สิ่งที่อยากลอง','From your answers to your next experiment')}</h2><p>${tr(en,`“${paths[top.id].th}” เป็นหนึ่งในด้านที่ปรากฏในคำตอบของคุณ ลองใช้เป็นจุดเริ่มต้น แล้วเปลี่ยนใจได้เสมอ`,`“${paths[top.id].en}” is one of the interests in your answers. Use it as a starting point; you can always change your mind.`)}</p><p>${gradeContext(state,en)}</p></div><button type="button" class="btn btn-primary" id="explore-choose">${tr(en,'เลือกกิจกรรม 10 นาที','Choose a 10-minute activity')}</button></div>
  <p class="explore-note">${tr(en,'อ้างอิงเฉพาะคำตอบเรื่องความสนใจ 5 ข้อแรก ไม่ใช่การวัดความถนัดหรือคำตัดสินอาชีพ คะแนนและกราฟเดิมด้านล่างยังคงเดิม','Based only on the first five interest questions. This is not an aptitude test or career verdict. Your previous scores and chart below are unchanged.')}</p>
  <div class="explore-evidence"><div><h3>${tr(en,'ความสนใจที่เล่าให้ฟัง','Interests you reported')}</h3><p>${escape(en?top.hits[0]?.en:top.hits[0]?.th)}</p></div><div><h3>${tr(en,'ทักษะที่อยากฝึก','Skills to practise')}</h3><p>${escape(paths[top.id].skill[en?1:0])}</p></div><div><h3>${tr(en,'สิ่งที่ยังต้องค้นหา','What is still unknown')}</h3><p>${tr(en,'เมื่อได้ลองทำจริง คุณจะชอบงานส่วนไหน และอยากฝึกต่อหรือไม่','Which parts of the work will you enjoy, and will you want to keep practising?')}</p></div></div>
  ${skillPortfolio(state,en)}${activitySummary(state,en,'activity-summary-profile')}<section id="explore-paths" tabindex="-1"><h3>${tr(en,'15 ภารกิจสร้างหลักฐาน','15 evidence-building missions')}</h3><p>${tr(en,'เลือกได้ตามความสนใจ ไม่ต้องใช้แต้ม และไม่ต้องเปิด AI ภารกิจแต่ละหมวดเรียงจากเริ่มต้นไปท้าทายขึ้น','Choose freely. No tokens or AI required. Each skill progresses from starter to a more challenging mission.')}</p><div class="skill-mission-groups">${list.map(row=>{const categoryPaths=Object.entries(paths).filter(([,path])=>path.category===row.id).sort((a,b)=>a[1].level-b[1].level);return `<section class="skill-mission-group" aria-labelledby="skill-group-${row.id}"><header><div><p class="evidence-eyebrow">${tr(en,'ทักษะ','Skill')} ${corePathIds.indexOf(row.id)+1}/5</p><h4 id="skill-group-${row.id}">${escape(en?skillCatalog[row.id].en:skillCatalog[row.id].th)}</h4></div><span>${row.hits.length?tr(en,`สัมพันธ์กับคำตอบ ${row.hits.length}/5`,`Matches ${row.hits.length}/5 answers`):tr(en,'เปิดให้ลอง','Open to explore')}</span></header><div class="explore-path-list">${categoryPaths.map(([pathId,p])=>{const pathName=en?p.en:p.th,taskName=p.task[en?1:0],attempts=(state.exploration?.entries || []).filter(e=>e.path===pathId).length,done=attempts>0;return `<article class="explore-path${done?' is-complete':''}"><div><p class="mission-level">${tr(en,`ภารกิจ ${p.level} จาก 3`,`Mission ${p.level} of 3`)}</p><h4>${escape(pathName)}</h4>${done?`<p class="explore-path-status">${tr(en,`มีหลักฐานแล้ว ${attempts} ครั้ง · ทำซ้ำได้โดยบันทึกเดิมไม่หาย`,`Evidence saved ${attempts} ${attempts===1?'time':'times'} · Repeating keeps previous notes`)}</p>`:`<p>${tr(en,'ทำครั้งแรกเพื่อเพิ่มหลักฐานในทักษะนี้','Complete once to add evidence for this skill.')}</p>`}<p><strong>${tr(en,'ลองทำ:','Try:')}</strong> ${escape(taskName)} · 10 ${tr(en,'นาที','min')}</p></div><button type="button" class="btn btn-primary" data-explore-path="${pathId}" data-explore-repeat="${done?'true':'false'}" aria-label="${escape(done?tr(en,`ทำภารกิจ ${pathName} อีกครั้ง`,`Repeat ${pathName}`):tr(en,`เริ่มภารกิจ ${pathName}`,`Start ${pathName}`))}">${done?tr(en,'ทำซ้ำ','Repeat'):tr(en,'เริ่มภารกิจ','Start mission')}</button></article>`}).join('')}</div></section>`}).join('')}</div><p role="status" id="explore-result-status"></p></section>${history(state,en)}`;
  root.querySelector('#explore-choose').onclick=()=>{const target=root.querySelector('#explore-paths');target.focus();target.scrollIntoView({block:'start',behavior:'instant'});};
  root.querySelectorAll('[data-explore-path]').forEach(btn=>btn.onclick=()=>{
   const path=btn.dataset.explorePath,repeating=btn.dataset.exploreRepeat==='true';
   if(commit(state,save,data=>{data.selected=path;data.drafts ||= {};data.entries ||= [];data.activeAttempts ||= {};if(repeating)data.drafts[path]={};data.activeAttempts[path]={id:null,mode:'new'};},root.querySelector('#explore-result-status'),en)) {navigate('missions');document.getElementById('experiment-workbench')?.scrollIntoView({block:'start'});document.getElementById('experiment-heading')?.focus();}
  });
  bindActivitySummary(root,navigate);
 }
 draw();
}
export function renderExperimentWorkbench(state,questions,save,navigate,onEvidenceSaved) {
 const root=document.getElementById('experiment-workbench'); if(!root)return;
 // Any active LifeMap Guide conversation from a previous render must be torn
 // down before this screen re-renders for any reason (mission change,
 // language toggle, returning to the "choose a mission" state) — covers both
 // branches below, including the early-return path that never reaches
 // mountSkillGuide.
 disposeSkillGuide();
 const en=state.language==='en';
 if(localStorage.getItem('lifemap_logged_in_role')==='parent'){root.replaceChildren();return;}
 const key=state.exploration?.selected,p=paths[key];
 if(!p){const recommended=rankPaths(state.answers,questions)[0]?.id;root.innerHTML=`${skillPortfolio(state,en)}<h2>${tr(en,'เริ่มจากภารกิจเล็ก ๆ','Start with one small mission')}</h2><p>${tr(en,'ใช้เวลา 10 นาที แล้วบันทึกหลักฐานพร้อมตอบคำถามสะท้อนคิด 3 ข้อ','Take 10 minutes, then save evidence and answer three reflection questions.')}</p><button class="btn btn-primary" type="button" data-start-recommended>${tr(en,`เริ่มภารกิจแนะนำ: ${paths[recommended]?.th || ''}`,`Start recommended: ${paths[recommended]?.en || ''}`)}</button><button class="btn explore-secondary" type="button" data-choose-path>${tr(en,'ดูทั้ง 15 ภารกิจ','See all 15 missions')}</button>${activitySummary(state,en,'activity-summary-skill-lab')}`;insertUsageGuide(root,en);root.querySelector('[data-start-recommended]').onclick=()=>{if(commit(state,save,d=>{d.selected=recommended;d.drafts ||= {};d.entries ||= [];d.activeAttempts ||= {};d.activeAttempts[recommended]={id:null,mode:'new'};},null,en))renderExperimentWorkbench(state,questions,save,navigate);};root.querySelector('[data-choose-path]').onclick=()=>returnToResult(navigate,'explore-paths');bindActivitySummary(root,navigate);return;}
 const activeAttempt=state.exploration.activeAttempts?.[key];
 const savedRecord=activeAttempt?.id ? state.exploration.entries?.find(e=>e.id===activeAttempt.id) : null;
 const draft=state.exploration.drafts?.[key] || savedRecord || state.exploration.entries?.find(e=>e.path===key) || {};
 const fieldKeys=['output','enjoyment','difficulty','nextChoice'];
 const initiallySaved=Boolean(savedRecord && fieldKeys.every(field=>String(draft[field] ?? '')===String(savedRecord[field] ?? '')));
 const savedMessage=tr(en,'บันทึกหลักฐานเรียบร้อยแล้ว · ดูได้ในคลังหลักฐานของคุณ','Evidence saved · It is now in your evidence library');
 const guide=guidanceFor(key, p.category);
 root.innerHTML=`<header class="experiment-heading" data-selected-path="${key}"><div><p class="evidence-eyebrow">${escape(en?skillCatalog[p.category].en:skillCatalog[p.category].th)} · ${tr(en,`ภารกิจ ${p.level}/3`,`Mission ${p.level}/3`)}</p><h2 id="experiment-heading" tabindex="-1">${escape(en?p.en:p.th)}</h2><p><strong>${tr(en,'ลองทำ:','Try:')}</strong> ${escape(p.task[en?1:0])} · 10 ${tr(en,'นาที','min')}</p></div><button type="button" class="btn explore-secondary" id="experiment-change">${tr(en,'เลือกภารกิจอื่น','Choose another')}</button></header>${renderVoiceGuideCard(key,en)}${renderLifeMapGuide(key,en)}<div class="experiment-layout"><section><h3>${tr(en,'ทำตาม 3 ขั้นนี้','Follow these 3 steps')}</h3><ol class="experiment-steps">${p.steps.map(s=>`<li>${escape(s[en?1:0])}</li>`).join('')}</ol><p class="explore-note">${guide.note?tr(en,guide.note[0],guide.note[1]):tr(en,'ใช้ข้อมูลสมมุติ และหยุดได้ทุกเมื่อ ภารกิจนี้สร้างหลักฐานการฝึก ไม่ใช่การรับรองระดับทักษะ','Use imaginary information and stop anytime. This mission creates practice evidence; it is not a skill certification.')}</p></section><form id="experiment-form"><h3>${tr(en,'ทำเสร็จแล้ว ตอบ 3 ข้อ','Done? Answer 3 questions')}</h3><fieldset class="quick-choice"><legend>1. ${tr(en,'กิจกรรมนี้สนุกแค่ไหน','How enjoyable was it?')}</legend><div class="scale-options">${[1,2,3,4,5].map(n=>`<label><input type="radio" name="enjoyment" value="${n}"${String(draft.enjoyment)===String(n)?' checked':''} required><span>${n}</span></label>`).join('')}</div><p class="scale-ends"><span>${tr(en,'ไม่สนุก','Not enjoyable')}</span><span>${tr(en,'สนุกมาก','Very enjoyable')}</span></p></fieldset><fieldset class="quick-choice"><legend>2. ${tr(en,'กิจกรรมนี้ยากแค่ไหน','How difficult was it?')}</legend><div class="scale-options">${[1,2,3,4,5].map(n=>`<label><input type="radio" name="difficulty" value="${n}"${String(draft.difficulty)===String(n)?' checked':''} required><span>${n}</span></label>`).join('')}</div><p class="scale-ends"><span>${tr(en,'ง่าย','Easy')}</span><span>${tr(en,'ยากมาก','Very difficult')}</span></p></fieldset><fieldset class="quick-choice next-choice"><legend>3. ${tr(en,'ตอนนี้อยากทำอะไรต่อ','What would you like to do next?')}</legend>${[['continue',tr(en,'ทำต่อ','Continue')],['switch',tr(en,'ลองอย่างอื่น','Try something else')],['unsure',tr(en,'ยังไม่แน่ใจ','Not sure yet')]].map(([value,label])=>`<label><input type="radio" name="nextChoice" value="${value}"${draft.nextChoice===value?' checked':''} required><span>${label}</span></label>`).join('')}</fieldset><label for="experiment-output">${tr(en,'อยากจดอะไรเพิ่มไหม (ไม่บังคับ)','Anything else to note? (optional)')}</label><p class="experiment-answer-guide">${tr(en,`ตัวอย่าง: ${guide.liked[0]}`,`Example: ${guide.liked[1]}`)}</p><textarea id="experiment-output" name="output" placeholder="${tr(en,'พิมพ์สั้น ๆ หรือเว้นไว้ได้','Write a short note, or leave blank')}" rows="3" maxlength="600">${escape(draft.output)}</textarea><p class="explore-note">${tr(en,'บันทึกในเบราว์เซอร์นี้เท่านั้น ยังไม่ส่งให้ AI ครู หรือผู้ปกครอง','Saved only in this browser. Not sent to AI, teachers or parents.')}</p><button id="experiment-save" class="btn btn-primary experiment-save-btn${initiallySaved?' is-saved':''}" type="submit"${initiallySaved?' disabled':''}>${initiallySaved?tr(en,'บันทึกเรียบร้อยแล้ว','Saved successfully'):tr(en,'บันทึกหลักฐาน','Save evidence')}</button><p id="experiment-status" role="status" aria-live="polite"${initiallySaved?' data-state="saved"':''}>${initiallySaved?savedMessage:''}</p><button id="experiment-result" class="btn explore-secondary" type="button">${tr(en,'ดูคลังหลักฐานทั้งหมด','View all evidence')}</button></form></div>${skillPortfolio(state,en)}${activitySummary(state,en,'activity-summary-skill-lab')}`;
 insertUsageGuide(root,en);
 positionActivityResponse(root,p,key,en);
 root.querySelector('#experiment-change').onclick=()=>returnToResult(navigate,'explore-paths');
 root.querySelector('#experiment-result').onclick=()=>returnToResult(navigate,'explore-history-title');
 bindActivitySummary(root,navigate);
 let voiceGuidePlayedThisRender=false,missionStartedAfterVoiceDispatched=false;
 bindVoiceGuide(root,en,key,()=>{voiceGuidePlayedThisRender=true;});
 mountSkillGuide(root,en,key);
 const form=root.querySelector('form'),status=root.querySelector('#experiment-status'),saveButton=root.querySelector('#experiment-save');
 let hasSavedRecord=Boolean(savedRecord);
 const values=()=>Object.fromEntries(fieldKeys.map(k=>[k,form.elements[k]?.value || '']));
 const setSaveButtonState=(saved)=>{
  saveButton.disabled=saved;
  saveButton.className=`btn btn-primary experiment-save-btn${saved?' is-saved':''}`;
  saveButton.textContent=saved?tr(en,'บันทึกเรียบร้อยแล้ว','Saved successfully'):(hasSavedRecord?tr(en,'บันทึกการแก้ไข','Save changes'):tr(en,'บันทึกหลักฐาน','Save evidence'));
 };
 form.addEventListener('input',()=>{if(voiceGuidePlayedThisRender&&!missionStartedAfterVoiceDispatched){missionStartedAfterVoiceDispatched=true;try{window.dispatchEvent(new CustomEvent('lifemap:mission_started_after_voice',{detail:{mission:key}}));}catch(_e){}}setSaveButtonState(false);if(commit(state,save,d=>{d.drafts ||= {};d.drafts[key]=values();},status,en)){status.dataset.error='false';status.dataset.state='draft';status.textContent=hasSavedRecord?tr(en,'เก็บฉบับร่างแล้ว · กด “บันทึกการแก้ไข” เพื่อยืนยันรอบนี้','Draft saved · Select “Save changes” to confirm this attempt'):tr(en,'เก็บฉบับร่างแล้ว · เลือกคำตอบ 3 ข้อแล้วกดบันทึก','Draft saved · Answer the 3 questions, then save');}});
 form.onsubmit=e=>{e.preventDefault();const fields=values();const empty=['output','enjoyment','difficulty','nextChoice'].find(k=>!String(fields[k]||'').trim());if(empty){form.elements[empty]?.[0]?.focus?.() || form.elements[empty]?.focus?.();status.textContent=empty==='output'?tr(en,'ลองทำกิจกรรมและพิมพ์คำตอบในช่องแรกก่อน','Do the activity and write your response in the first field'):tr(en,'เลือกคำตอบความรู้สึกให้ครบ 3 ข้อก่อนบันทึก','Answer all 3 reflection questions before saving');return;}
  const now=new Date().toISOString();
  let savedRecordForEvidence=null;
  if(commit(state,save,d=>{d.entries ||= [];d.activeAttempts ||= {};const attemptId=d.activeAttempts[key]?.id || `${key}-${now}`;const previous=d.entries.find(x=>x.id===attemptId);const record={id:attemptId,path:key,...fields,liked:`${tr(en,'ความสนุก','Enjoyment')} ${fields.enjoyment}/5`,hard:`${tr(en,'ความยาก','Difficulty')} ${fields.difficulty}/5`,next:nextChoiceLabel(fields.nextChoice,en),createdAt:previous?.createdAt || now,updatedAt:now};d.entries=d.entries.filter(x=>x.id!==attemptId).concat(record);d.drafts ||= {};d.drafts[key]=fields;d.activeAttempts[key]={id:attemptId,mode:'edit'};savedRecordForEvidence=record;},status,en)){hasSavedRecord=true;setSaveButtonState(true);status.dataset.error='false';status.dataset.state='saved';status.textContent=savedMessage;const portfolio=root.querySelector('.skill-evidence-portfolio');if(portfolio)portfolio.outerHTML=skillPortfolio(state,en);const summary=root.querySelector('#activity-summary-skill-lab');if(summary){summary.outerHTML=activitySummary(state,en,'activity-summary-skill-lab');bindActivitySummary(root,navigate);if((state.exploration?.entries?.length||0)>=3)root.querySelector('#activity-summary-skill-lab')?.focus();}
   // Explicit Evidence event: fires only here, after a genuine successful
   // submit — never from draft autosave (the 'input' listener above), mission
   // selection, or mission start.
   if(typeof onEvidenceSaved==='function'&&savedRecordForEvidence)onEvidenceSaved(savedRecordForEvidence);
  }
 };
}
