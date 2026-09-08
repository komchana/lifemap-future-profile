# Testing Checklist — LifeMap v2.1

รายการตรวจสอบความถูกต้อง 12 ข้อ ก่อนทำการ Deploy บน Production / Netlify

---

## 📋 Checklist 12 ข้อ

- [x] **1. LINE LIFF Auto-Login & Fallback**
  - เปิดใน LINE App: ดึง `displayName` และ `userId` อัตโนมัติ
  - เปิดใน Web Browser: ทำงานใน Fallback mode ให้พิมพ์ข้อมูลเองได้โดยไม่ค้าง

- [x] **2. 3-Tier Consent Controls**
  - Consent 1 (Profile) บังคับติ๊ก
  - Consent 2 (Research จุฬาฯ) เลือกเปิด/ปิดได้
  - Consent 3 (Parent Link) เลือกเปิด/ปิดได้ (Default off)

- [x] **3. Identity Form & Tier Picker Validation**
  - ช่องชื่อ และ สถาบัน ห้ามว่าง
  - เลือกสถาบันการศึกษา (ม.ต้น / ม.ปลาย ฯลฯ) จะเปิดตัวเลือกระดับชั้นปี (ม.1-ม.6, ปี 1-4)
  - Validation ทำงานถูกต้อง ปุ่ม "ถัดไป" Disable หากยังกรอกไม่ครบ

- [x] **4. v3 Questionnaire Items (11 ข้อ)**
  - Q1 - Q5: Forced-choice (A - E)
  - Q6: Wellbeing scale (1 - 5)
  - Q7 - Q10: Engagement Likert items (1 - 5)
  - Q11: Need-finding (7ตัวเลือก)

- [x] **5. Profile Scoring Algorithm**
  - คำนวณความถี่ A-E จาก Q1-Q5
  - หากคะแนนเท่ากัน (Tie) ใช้คำตอบใน Q5 (Future Vision) เป็นตัวตัดสิน (Tie-breaker)
  - แสดงผล Archetype 1 ใน 5 รูปแบบได้อย่างถูกต้อง

- [x] **6. PMF / Engagement Signal Score**
  - คำนวณค่าเฉลี่ย Likert 4 ข้อ (Q7-Q10)
  - Engagement score ≥ 4.5 ➔ Strong Signal
  - Engagement score ≥ 3.5 ➔ Positive Signal
  - Engagement score ≥ 2.5 ➔ Weak Signal
  - Engagement score < 2.5 ➔ No Signal

- [x] **7. Life Profile Dashboard View**
  - แสดงชื่อผู้ใช้งาน + ธีมสีตาม Profile
  - แสดง 🪙 LifeMap Tokens (25 Tokens)
  - แสดง 🎯 Mission Day 1 Card Preview ตาม Profile
  - แสดง 👨‍👩‍👧 Parent Link Code (เฉพาะเมื่อเลือก Consent ข้อ 3)

- [x] **8. LINE Flex Share & Add Friend**
  - ปุ่ม "ส่งผลลัพธ์ใน LINE" เรียก `liff.shareTargetPicker` ใน LIFF หรือ Copy URL ใน Browser
  - ปุ่ม "เพิ่ม @lifemap เป็นเพื่อน" ลิ้งก์ไปยัง LINE Official Account

- [x] **9. Data Ownership & Settings Page**
  - ลิ้งก์ตั้งค่าเปลี่ยน Consent ย้อนหลังได้
  - ปุ่ม "ลบข้อมูลของฉันถาวร" (Right to Erasure) ส่งคำขอลบไปยัง Apps Script และล้างข้อมูลในเครื่อง

- [x] **10. Backend Data Submission (Apps Script)**
  - ส่งข้อมูลแบบ POST `Content-Type: text/plain;charset=utf-8` ไม่เกิด CORS preflight error
  - ข้อมูลลง Google Sheet ครบทุก Field

- [x] **11. Performance & Bundle Constraints**
  - ไฟล์ `index.html` มีขนาด ~26KB (< 100KB)
  - โหลดเร็วบนเครือข่าย 3G ภายใน 3 วินาที

- [x] **12. Aesthetic & Rule Strictness**
  - ไม่มี Dark mode / Glassmorphism / Ambient Audio / React / Tailwind / Canvas
  - คุมโทนแบรนด์ด้วย Cream (`#f6f6f4`) และ Lime (`#C8FF33`)
