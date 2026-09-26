// LifeMap exploration: local, account-scoped reflection. No scoring or network writes.
const tr = (en, th, english) => en ? english : th;
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const paths = {
 creator: {th:'ออกแบบและเล่าเรื่อง',en:'Design and storytelling',skill:['การสื่อสารด้วยภาพ','Visual communication'],task:['ออกแบบโพสต์ให้ร้านสมมุติ','Design a post for an imaginary shop'],steps:[['เลือกร้านสมมุติและลูกค้า 1 กลุ่ม','Choose an imaginary shop and one audience'],['ร่างหัวข้อ ภาพ และข้อความชวนทำบางอย่าง','Sketch a headline, image and call to action'],['อธิบายว่าทำไมเลือกสื่อสารแบบนี้','Explain your communication choices']],prompt:['เขียนข้อความโพสต์และอธิบายภาพที่ร่างไว้','Write the post copy and describe your sketch']},
 analyst: {th:'วิเคราะห์ข้อมูล',en:'Data exploration',skill:['การหาเหตุผลจากข้อมูล','Evidence-based reasoning'],task:['อ่านยอดขายแล้วเสนอสิ่งที่ควรลอง','Read sales and suggest an experiment'],steps:[['ใช้ข้อมูลสมมุติ: จันทร์ 12 ชิ้น อังคาร 18 พุธ 9 พฤหัส 21 ศุกร์ 15','Use sample sales: Mon 12, Tue 18, Wed 9, Thu 21, Fri 15'],['หาข้อสังเกต 3 ข้อ และแยกสิ่งที่ข้อมูลยังตอบไม่ได้','Find three observations and what the data cannot explain'],['เสนอการทดลอง 1 อย่างเพื่อหาคำตอบเพิ่ม','Suggest one experiment to learn more']],prompt:['บันทึกข้อสังเกต 3 ข้อ และคำถามที่อยากหาคำตอบต่อ','Write three observations and one follow-up question']},
 builder: {th:'ออกแบบวิธีทำงาน',en:'Practical problem solving',skill:['การแยกปัญหาเป็นขั้นตอน','Breaking a problem into steps'],task:['ออกแบบที่วางโทรศัพท์ด้วยกระดาษ','Design a paper phone stand'],steps:[['วาดแบบที่วางโทรศัพท์บนกระดาษ โดยยังไม่ต้องใช้อุปกรณ์จริง','Sketch a paper phone stand; no tools needed'],['ระบุจุดรองรับและวิธีป้องกันการล้ม','Mark supports and explain how it stays stable'],['หาจุดที่อาจใช้ไม่ได้และแก้แบบ 1 จุด','Identify one weakness and revise the design']],prompt:['อธิบายแบบของคุณ จุดรองรับ และสิ่งที่แก้ไข','Describe your design, supports and revision']},
 helper: {th:'ช่วยคนเรียนรู้',en:'Helping others learn',skill:['การอธิบายให้เข้าใจง่าย','Clear explanation'],task:['ทำคู่มือเรื่องใกล้ตัวให้มือใหม่','Write a beginner guide'],steps:[['เลือกเรื่องที่คุณรู้ เช่น จัดกระเป๋าหรือค้นข้อมูล','Choose something familiar, such as packing or finding information'],['เขียนวิธีทำ 3 ขั้นสำหรับคนที่ไม่เคยทำ','Write three steps for a complete beginner'],['ทบทวนว่าขั้นตอนไหนอาจทำให้สับสน แล้วปรับคำอธิบาย','Find a confusing step and improve its explanation']],prompt:['เขียนคู่มือ 3 ขั้นและสิ่งที่คุณปรับให้ง่ายขึ้น','Write three steps and what you clarified']},
 entrepreneur: {th:'ทดลองไอเดียธุรกิจ',en:'Testing a business idea',skill:['การเข้าใจลูกค้า','Understanding customers'],task:['คิดข้อเสนอขายให้ลูกค้า 1 กลุ่ม','Create an offer for one audience'],steps:[['เลือกสินค้าสมมุติและลูกค้า 1 กลุ่ม','Choose an imaginary product and audience'],['เขียนปัญหาของลูกค้า และสิ่งที่สินค้าช่วยได้','Describe a customer problem and how the product helps'],['ร่างข้อเสนอขายและคำถามสำหรับทดสอบไอเดีย โดยยังไม่ต้องซื้อหรือขายจริง','Draft an offer and a question to test it; no buying or selling needed']],prompt:['เขียนกลุ่มลูกค้า ปัญหา ข้อเสนอ และคำถามทดสอบ','Write your audience, problem, offer and test question']}
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
function renderAnswerGuide(key, field, en) {
 const guide = experimentGuidance[key];
 const id = `experiment-${field}-guide`;
 if (field === 'output') return `<div id="${id}" class="experiment-answer-guide"><p>${tr(en,'เริ่มเขียนได้แบบนี้:','You can start with:')} ${escape(guide.starter[en?1:0])}</p><section class="experiment-example"><h4>${tr(en,'ตัวอย่างคำตอบของกิจกรรมนี้','Example answer for this activity')}</h4><p>${tr(en,'ตัวอย่างสมมุติ ใช้ดูแนวทาง แล้วเขียนเรื่องของคุณเอง','An imaginary example. Use it as a guide and write your own version.')}</p><blockquote>${escape(guide.output[en?1:0])}</blockquote></section></div>`;
 return `<p id="${id}" class="experiment-answer-guide">${tr(en,'ตัวอย่าง:','Example:')} ${escape(guide[field][en?1:0])}</p>`;
}

export function rankPaths(answers, questions) {
 const ranked = Object.keys(paths).map(id => ({id, hits:[]}));
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
  const pathName=en?paths[e.path]?.en:paths[e.path]?.th;
  if(e.enjoyment && e.difficulty && e.nextChoice){
   const nextLabel=nextChoiceLabel(e.nextChoice,en);
   return `<article class="explore-record"><h4>${escape(pathName)} · ${tr(en,`ครั้งที่ ${attemptNumber[e.path]}`,`Attempt ${attemptNumber[e.path]}`)}</h4><div class="explore-record-ratings"><span>${tr(en,'สนุก','Enjoyment')} <strong>${escape(e.enjoyment)}/5</strong></span><span>${tr(en,'ยาก','Difficulty')} <strong>${escape(e.difficulty)}/5</strong></span><span>${tr(en,'ก้าวต่อไป','Next')} <strong>${escape(nextLabel)}</strong></span></div>${e.output?`<p><strong>${tr(en,'สิ่งที่ลองทำ:','Activity response:')}</strong> ${escape(e.output)}</p>`:''}</article>`;
  }
  return `<article class="explore-record"><h4>${escape(pathName)} · ${tr(en,`ครั้งที่ ${attemptNumber[e.path]}`,`Attempt ${attemptNumber[e.path]}`)}</h4>${e.output?`<p><strong>${tr(en,'ผลงานที่บันทึก:','Your work:')}</strong> ${escape(e.output)}</p>`:''}<p><strong>${tr(en,'ชอบ:','Liked:')}</strong> ${escape(e.liked)}</p><p><strong>${tr(en,'ยาก:','Challenging:')}</strong> ${escape(e.hard)}</p><p><strong>${tr(en,'ก้าวต่อไป:','Next step:')}</strong> ${escape(e.next)}</p></article>`;
 }).join('');
 return `<section class="explore-history"><h3 id="explore-history-title" tabindex="-1">${tr(en,'สิ่งที่ได้ลองทำ','What you have tried')}</h3>${entries.length ? records:`<p>${tr(en,'ยังไม่มีบันทึก เริ่มจากกิจกรรมหนึ่งอย่างที่อยากลอง','No reflections yet. Start with one activity you want to try.')}</p>`}</section>`;
}
const nextChoiceLabel=(choice,en)=>({continue:tr(en,'ทำต่อ','Continue'),switch:tr(en,'ลองอย่างอื่น','Try something else'),unsure:tr(en,'ยังไม่แน่ใจ','Not sure yet')})[choice] || choice || '';
function activitySummary(state,en){
 const entries=state.exploration?.entries || [],count=entries.length;
 if(count<3)return `<section class="activity-progress" id="activity-summary" aria-live="polite"><h3>${tr(en,'ลองทีละเรื่อง ไม่ต้องรีบ','One small try at a time')}</h3><p>${tr(en,`บันทึกแล้ว ${count} จาก 3 กิจกรรม ลองอีก ${3-count} กิจกรรมเพื่อดูสิ่งที่เริ่มชัดขึ้น`,`You have saved ${count} of 3 activities. Try ${3-count} more to see what is becoming clearer.`)}</p><div class="activity-progress-track" aria-label="${tr(en,`ความคืบหน้า ${count} จาก 3 กิจกรรม`,`Progress: ${count} of 3 activities`)}"><span style="width:${Math.min(100,count/3*100)}%"></span></div></section>`;
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
 return `<section class="activity-summary-result" id="activity-summary" tabindex="-1" aria-live="polite"><h3>${tr(en,'สรุปสิ่งที่ค้นพบจาก 3 กิจกรรมล่าสุด','What your last 3 activities suggest')}</h3><p>${tr(en,'นี่คือภาพสะท้อนจากคำตอบของคุณ ไม่ใช่คะแนนความถนัดหรือคำตัดสินอาชีพ','This reflects your answers. It is not an aptitude score or career verdict.')}</p><div class="activity-summary-facts">${enjoyment?`<p><span>${tr(en,'ความสนุกเฉลี่ย','Average enjoyment')}</span><strong>${enjoyment}/5</strong></p>`:''}${difficulty?`<p><span>${tr(en,'ความยากเฉลี่ย','Average difficulty')}</span><strong>${difficulty}/5</strong></p>`:''}<p><span>${tr(en,'แนวที่ลองบ่อยสุด','Most-tried path')}</span><strong>${escape(leading?(en?paths[leading]?.en:paths[leading]?.th):tr(en,'ยังไม่พอจะสรุป','Not enough data'))}</strong></p></div><p class="activity-next-step"><strong>${tr(en,'ก้าวถัดไป:','Next step:')}</strong> ${recommendation}</p><button type="button" class="btn btn-primary" data-activity-next>${tr(en,'เลือกกิจกรรมถัดไป','Choose my next activity')}</button></section>`;
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
 guide.innerHTML=`<span>${tr(en,'เริ่มเขียนได้แบบนี้:','Start like this:')} ${escape(experimentGuidance[key].starter[en?1:0])}</span><span><strong>${tr(en,'ตัวอย่าง:','Example:')}</strong> ${escape(experimentGuidance[key].output[en?1:0])}</span>`;
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
  ${activitySummary(state,en)}<section id="explore-paths" tabindex="-1"><h3>${tr(en,'กิจกรรมที่น่าลอง','Activities worth trying')}</h3><p>${tr(en,'เลือกได้ตามความสนใจ ไม่ต้องใช้แต้ม และไม่ต้องเปิด AI','Choose freely. No tokens or AI required.')}</p><div class="explore-path-list">${list.map(row=>{const p=paths[row.id],pathName=en?p.en:p.th,taskName=p.task[en?1:0],attempts=(state.exploration?.entries || []).filter(e=>e.path===row.id).length,done=attempts>0;return `<article class="explore-path${done?' is-complete':''}"><div><h4>${escape(pathName)}</h4>${done?`<p class="explore-path-status">${tr(en,`ลองแล้ว ${attempts} ครั้ง · ทำใหม่ได้โดยบันทึกเดิมไม่หาย`,`Tried ${attempts} ${attempts===1?'time':'times'} · Repeating keeps previous notes`)}</p>`:`<p>${row.hits.length?tr(en,`กิจกรรมนี้สัมพันธ์กับคำตอบของคุณ ${row.hits.length} จาก 5 ข้อ`, `This activity matches ${row.hits.length} of your 5 answers`):tr(en,'อีกทางเลือกหนึ่งที่คุณยังไม่ได้ลอง','Another option you have not tried yet')}</p>`}<p><strong>${tr(en,'ลองทำ:','Try:')}</strong> ${escape(taskName)} · 10 ${tr(en,'นาที','min')}</p></div><button type="button" class="btn btn-primary" data-explore-path="${row.id}" data-explore-repeat="${done?'true':'false'}" aria-label="${escape(done?tr(en,`ทำเส้นทาง ${pathName} อีกครั้ง`,`Repeat ${pathName}`):tr(en,`เริ่มเส้นทาง ${pathName}`,`Start ${pathName}`))}">${done?tr(en,'ลองอีกครั้ง','Try again'):tr(en,'เริ่มลอง','Start')}</button></article>`}).join('')}</div><p role="status" id="explore-result-status"></p></section>${history(state,en)}`;
  root.querySelector('#explore-choose').onclick=()=>{const target=root.querySelector('#explore-paths');target.focus();target.scrollIntoView({block:'start',behavior:'instant'});};
  root.querySelectorAll('[data-explore-path]').forEach(btn=>btn.onclick=()=>{
   const path=btn.dataset.explorePath,repeating=btn.dataset.exploreRepeat==='true';
   if(commit(state,save,data=>{data.selected=path;data.drafts ||= {};data.entries ||= [];data.activeAttempts ||= {};if(repeating)data.drafts[path]={};data.activeAttempts[path]={id:null,mode:'new'};},root.querySelector('#explore-result-status'),en)) {navigate('missions');document.getElementById('experiment-workbench')?.scrollIntoView({block:'start'});document.getElementById('experiment-heading')?.focus();}
  });
  bindActivitySummary(root,navigate);
 }
 draw();
}
export function renderExperimentWorkbench(state,questions,save,navigate) {
 const root=document.getElementById('experiment-workbench'); if(!root)return;
 const en=state.language==='en';
 if(localStorage.getItem('lifemap_logged_in_role')==='parent'){root.replaceChildren();return;}
 const key=state.exploration?.selected,p=paths[key];
 if(!p){const recommended=rankPaths(state.answers,questions)[0]?.id;root.innerHTML=`<h2>${tr(en,'เริ่มจากกิจกรรมเล็ก ๆ','Start with one small activity')}</h2><p>${tr(en,'ใช้เวลา 10 นาที แล้วตอบเพียง 3 ข้อ ไม่มีคำตอบถูกหรือผิด','Take 10 minutes, then answer only 3 questions. There are no right or wrong answers.')}</p><button class="btn btn-primary" type="button" data-start-recommended>${tr(en,`เริ่มกิจกรรมแนะนำ: ${paths[recommended]?.th || ''}`,`Start recommended: ${paths[recommended]?.en || ''}`)}</button><button class="btn explore-secondary" type="button" data-choose-path>${tr(en,'ดูกิจกรรมทั้งหมด','See all activities')}</button>${activitySummary(state,en)}`;insertUsageGuide(root,en);root.querySelector('[data-start-recommended]').onclick=()=>{if(commit(state,save,d=>{d.selected=recommended;d.drafts ||= {};d.entries ||= [];d.activeAttempts ||= {};d.activeAttempts[recommended]={id:null,mode:'new'};},null,en))renderExperimentWorkbench(state,questions,save,navigate);};root.querySelector('[data-choose-path]').onclick=()=>returnToResult(navigate,'explore-paths');bindActivitySummary(root,navigate);return;}
 const activeAttempt=state.exploration.activeAttempts?.[key];
 const savedRecord=activeAttempt?.id ? state.exploration.entries?.find(e=>e.id===activeAttempt.id) : null;
 const draft=state.exploration.drafts?.[key] || savedRecord || state.exploration.entries?.find(e=>e.path===key) || {};
 const fieldKeys=['output','enjoyment','difficulty','nextChoice'];
 const initiallySaved=Boolean(savedRecord && fieldKeys.every(field=>String(draft[field] ?? '')===String(savedRecord[field] ?? '')));
 const savedMessage=tr(en,'บันทึกเรียบร้อยแล้ว · ดูบันทึกนี้ได้ใน Life Profile','Saved successfully · This note is available in Life Profile');
 root.innerHTML=`<header class="experiment-heading" data-selected-path="${key}"><div><h2 id="experiment-heading" tabindex="-1">${escape(en?p.en:p.th)}</h2><p><strong>${tr(en,'ลองทำ:','Try:')}</strong> ${escape(p.task[en?1:0])} · 10 ${tr(en,'นาที','min')}</p></div><button type="button" class="btn explore-secondary" id="experiment-change">${tr(en,'เลือกกิจกรรมอื่น','Choose another')}</button></header><div class="experiment-layout"><section><h3>${tr(en,'ทำตาม 3 ขั้นนี้','Follow these 3 steps')}</h3><ol class="experiment-steps">${p.steps.map(s=>`<li>${escape(s[en?1:0])}</li>`).join('')}</ol><p class="explore-note">${tr(en,'ใช้ข้อมูลสมมุติ และหยุดได้ทุกเมื่อ กิจกรรมนี้ใช้สำรวจความสนใจ ไม่ใช่การวัดความถนัด','Use imaginary information and stop anytime. This explores interest; it does not measure aptitude.')}</p></section><form id="experiment-form"><h3>${tr(en,'ทำเสร็จแล้ว ตอบ 3 ข้อ','Done? Answer 3 questions')}</h3><fieldset class="quick-choice"><legend>1. ${tr(en,'กิจกรรมนี้สนุกแค่ไหน','How enjoyable was it?')}</legend><div class="scale-options">${[1,2,3,4,5].map(n=>`<label><input type="radio" name="enjoyment" value="${n}"${String(draft.enjoyment)===String(n)?' checked':''} required><span>${n}</span></label>`).join('')}</div><p class="scale-ends"><span>${tr(en,'ไม่สนุก','Not enjoyable')}</span><span>${tr(en,'สนุกมาก','Very enjoyable')}</span></p></fieldset><fieldset class="quick-choice"><legend>2. ${tr(en,'กิจกรรมนี้ยากแค่ไหน','How difficult was it?')}</legend><div class="scale-options">${[1,2,3,4,5].map(n=>`<label><input type="radio" name="difficulty" value="${n}"${String(draft.difficulty)===String(n)?' checked':''} required><span>${n}</span></label>`).join('')}</div><p class="scale-ends"><span>${tr(en,'ง่าย','Easy')}</span><span>${tr(en,'ยากมาก','Very difficult')}</span></p></fieldset><fieldset class="quick-choice next-choice"><legend>3. ${tr(en,'ตอนนี้อยากทำอะไรต่อ','What would you like to do next?')}</legend>${[['continue',tr(en,'ทำต่อ','Continue')],['switch',tr(en,'ลองอย่างอื่น','Try something else')],['unsure',tr(en,'ยังไม่แน่ใจ','Not sure yet')]].map(([value,label])=>`<label><input type="radio" name="nextChoice" value="${value}"${draft.nextChoice===value?' checked':''} required><span>${label}</span></label>`).join('')}</fieldset><label for="experiment-output">${tr(en,'อยากจดอะไรเพิ่มไหม (ไม่บังคับ)','Anything else to note? (optional)')}</label><p class="experiment-answer-guide">${tr(en,`ตัวอย่าง: ${experimentGuidance[key].liked[0]}`,`Example: ${experimentGuidance[key].liked[1]}`)}</p><textarea id="experiment-output" name="output" placeholder="${tr(en,'พิมพ์สั้น ๆ หรือเว้นไว้ได้','Write a short note, or leave blank')}" rows="3" maxlength="600">${escape(draft.output)}</textarea><p class="explore-note">${tr(en,'บันทึกในเบราว์เซอร์นี้เท่านั้น ยังไม่ส่งให้ AI ครู หรือผู้ปกครอง','Saved only in this browser. Not sent to AI, teachers or parents.')}</p><button id="experiment-save" class="btn btn-primary experiment-save-btn${initiallySaved?' is-saved':''}" type="submit"${initiallySaved?' disabled':''}>${initiallySaved?tr(en,'บันทึกเรียบร้อยแล้ว','Saved successfully'):tr(en,'บันทึก 3 คำตอบ','Save 3 answers')}</button><p id="experiment-status" role="status" aria-live="polite"${initiallySaved?' data-state="saved"':''}>${initiallySaved?savedMessage:''}</p><button id="experiment-result" class="btn explore-secondary" type="button">${tr(en,'ดูบันทึกทั้งหมดใน Life Profile','View all notes in Life Profile')}</button></form></div>${activitySummary(state,en)}`;
 insertUsageGuide(root,en);
 positionActivityResponse(root,p,key,en);
 root.querySelector('#experiment-change').onclick=()=>returnToResult(navigate,'explore-paths');
 root.querySelector('#experiment-result').onclick=()=>returnToResult(navigate,'explore-history-title');
 bindActivitySummary(root,navigate);
 const form=root.querySelector('form'),status=root.querySelector('#experiment-status'),saveButton=root.querySelector('#experiment-save');
 let hasSavedRecord=Boolean(savedRecord);
 const values=()=>Object.fromEntries(fieldKeys.map(k=>[k,form.elements[k]?.value || '']));
 const setSaveButtonState=(saved)=>{
  saveButton.disabled=saved;
  saveButton.className=`btn btn-primary experiment-save-btn${saved?' is-saved':''}`;
  saveButton.textContent=saved?tr(en,'บันทึกเรียบร้อยแล้ว','Saved successfully'):(hasSavedRecord?tr(en,'บันทึกการแก้ไข','Save changes'):tr(en,'บันทึก 3 คำตอบ','Save 3 answers'));
 };
 form.addEventListener('input',()=>{setSaveButtonState(false);if(commit(state,save,d=>{d.drafts ||= {};d.drafts[key]=values();},status,en)){status.dataset.error='false';status.dataset.state='draft';status.textContent=hasSavedRecord?tr(en,'เก็บฉบับร่างแล้ว · กด “บันทึกการแก้ไข” เพื่อยืนยันรอบนี้','Draft saved · Select “Save changes” to confirm this attempt'):tr(en,'เก็บฉบับร่างแล้ว · เลือกคำตอบ 3 ข้อแล้วกดบันทึก','Draft saved · Answer the 3 questions, then save');}});
 form.onsubmit=e=>{e.preventDefault();const fields=values();const empty=['output','enjoyment','difficulty','nextChoice'].find(k=>!String(fields[k]||'').trim());if(empty){form.elements[empty]?.[0]?.focus?.() || form.elements[empty]?.focus?.();status.textContent=empty==='output'?tr(en,'ลองทำกิจกรรมและพิมพ์คำตอบในช่องแรกก่อน','Do the activity and write your response in the first field'):tr(en,'เลือกคำตอบความรู้สึกให้ครบ 3 ข้อก่อนบันทึก','Answer all 3 reflection questions before saving');return;}
  const now=new Date().toISOString();
  if(commit(state,save,d=>{d.entries ||= [];d.activeAttempts ||= {};const attemptId=d.activeAttempts[key]?.id || `${key}-${now}`;const previous=d.entries.find(x=>x.id===attemptId);const record={id:attemptId,path:key,...fields,liked:`${tr(en,'ความสนุก','Enjoyment')} ${fields.enjoyment}/5`,hard:`${tr(en,'ความยาก','Difficulty')} ${fields.difficulty}/5`,next:nextChoiceLabel(fields.nextChoice,en),createdAt:previous?.createdAt || now,updatedAt:now};d.entries=d.entries.filter(x=>x.id!==attemptId).concat(record);d.drafts ||= {};d.drafts[key]=fields;d.activeAttempts[key]={id:attemptId,mode:'edit'};},status,en)){hasSavedRecord=true;setSaveButtonState(true);status.dataset.error='false';status.dataset.state='saved';status.textContent=savedMessage;const summary=root.querySelector('#activity-summary');if(summary){summary.outerHTML=activitySummary(state,en);bindActivitySummary(root,navigate);if((state.exploration?.entries?.length||0)>=3)root.querySelector('#activity-summary')?.focus();}}
 };
}
