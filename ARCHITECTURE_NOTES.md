# Architecture Notes — LifeMap v2.1

เอกสารอธิบายการออกแบบสถาปัตยกรรมระบบ (Architectural Design & Preserved Concepts) สำหรับ LifeMap v2.1

---

## 1. ปรัชญาการออกแบบ (Product Vision Alignment)

LifeMap ไม่ใช่ "แบบทดสอบอาชีพแบบทำครั้งเดียวจบ" แต่เป็น **"สมุดชีวิตดิจิทัลและ AI Mentor ส่วนตัวของเด็กไทย"**
ในเวอร์ชัน v2.1 นี้ เน้นการเป็น **Phase 0 Research Instrument** ที่สะอาด รวดเร็ว ยึดถือความลับและสิทธิ์ความเป็นเจ้าของข้อมูลของเด็ก (Data Ownership) เป็นหลัก

---

## 2. การคัดเลือกและปรับปรุงองค์ประกอบ (v2 → v2.1 Transition)

### ✅ สิ่งที่ถูกรักษและต่อยอดจากแนวคิด v2:
1. **Life Profile Dashboard Concept**: แสดงการ์ดสรุปตัวตนและจุดเด่นของเด็ก
2. **Mission Day 1 Preview**: แปลง insight ตัวตนให้ออกมาเป็นก้าวเล็ก ๆ ที่ลองทำได้จริงภายใน 24 ชม.
3. **Parent Link (Opt-in Concept)**: ใช้ระบบ Invite Code (เช่น `LM-4827`) เพื่อส่งต่อบทบาทเชิงสนับสนุนให้ผู้ปกครอง โดยเด็กเป็นผู้เลือกเปิดเปิดสิทธิ์ด้วยตนเอง
4. **Token Balance Placeholder (25 Tokens)**: เตรียมพร้อมสำหรับ AI Mentor ใน Phase ต่อไป
5. **Data Ownership Settings**: ให้สิทธิ์เด็กในการดูสิทธิ์ เปลี่ยนการยอมรับ และลบข้อมูลของตนเอง (Right to Erasure)

---

### ❌ สิ่งที่ตัดออกอย่างเด็ดขาด (Phase Out):
1. **16-item Thinking Style (MBTI-style) Quiz**: ตัดออกเพื่อขจัดความเสี่ยงทางวิชาการและลดเวลาตอบคำถามเหลือ 2 นาที
2. **Dark Mode & Glassmorphism**: ปรับเป็น Light theme (Cream `#f6f6f4` + Lime `#C8FF33`) เพื่อความอ่านง่าย สดใส และสบายตา
3. **Ambient Audio (.mp3) & Canvas Animations**: ตัดออกเพื่อลดขนาด Bundle และให้โหลดเร็วบนเครือข่าย 3G
4. **Multi-view Dashboard (Map, Timeline, Wheel of Life)**: ตัดฟีเจอร์ซับซ้อนเกินความจำเป็นออก เพื่อโฟกัสที่การเป็น MVP "สมุดชีวิต"
5. **Admin Console & Demo Seed Users**: ตัดออกเพื่อความปลอดภัยของข้อมูลจริง

---

## 3. สถาปัตยกรรมทางเทคนิค (Technical Architecture)

```
[ LINE App / QR Code / Web Browser ]
                 │
                 ▼
     [ LIFF SDK 2.x Initialization ]
     ├── In-Client LINE: Auto Profile (userId, displayName)
     └── Web Browser: Fallback Manual Form
                 │
                 ▼
     [ Screen 1: 3-Tier Consent Flow ]
     ├── Consent 1: Life Profile (Required)
     ├── Consent 2: Chula Research Validation (Opt-in)
     └── Consent 3: Parent Link Support View (Opt-in)
                 │
                 ▼
     [ Screen 2: Identity & Tiered Grade Picker ]
                 │
                 ▼
     [ Screen 3: v3 Hybrid Questionnaire (11 Items) ]
     ├── Q1 - Q5: Profile Scoring (A - E)
     ├── Q6: Wellbeing Future Anxiety (1 - 5)
     ├── Q7 - Q10: Engagement & PMF Scale (Likert 1 - 5)
     └── Q11: Need-finding Choice
                 │
                 ▼
     [ Processing & Scoring Engine ]
     ├── Profile Archetype + Tie-breaker (Q5)
     └── PMF Signal (Strong / Positive / Weak / No Signal)
                 │
                 ▼
     [ POST → Google Apps Script /exec ]
     (Content-Type: text/plain;charset=utf-8)
                 │
                 ▼
     [ Screen 5: Life Profile Dashboard ]
     ├── Profile Card (Anton font + Theme accent)
     ├── 25 LifeMap Tokens
     ├── Mission Day 1 Card
     ├── Parent Link Code (if opted in)
     └── LINE Flex Share / Add Official Friend
```

---

## 4. Performance Metrics & Footprint

- **Technology**: Vanilla JavaScript (ES6), HTML5, CSS3 (No Frameworks, No Build Step)
- **Bundle Size**: `index.html` < 30KB (เป้าหมาย < 100KB)
- **Dependencies**: Google Fonts CDN, LINE LIFF SDK 2.x CDN
- **Deployment**: Netlify Static Hosting (Drag-and-Drop compatible)
