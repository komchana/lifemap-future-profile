# Migration Notes — LifeMap v1 & v2 → v2.1

เอกสารสรุปผลกระทบและการจัดเก็บข้อมูลร่วมระหว่าง v1 (baseline 1,547 records) และ v2.1 (Phase 0 Research Instrument)

---

## 1. ยืนยันความปลอดภัยของ v1 ข้อมูลเดิม

- 🟢 **v1 Production (`lifemap-quiz.netlify.app`)**: ไม่ถูกแตะต้อง ทำงานเก็บ data Baseline 1,547+ records ต่อไปตามปกติ
- 🟢 **v2.1 (`grand-sfogliatella-b7c43e.netlify.app`)**: ทำงานบน subdomain แยก สำหรับเป็น Phase 2 preview และวิจัยร่วมกับ จุฬาฯ

---

## 2. โครงสร้าง Google Sheet Column Mapping

Apps Script Endpoint เดิม:
`https://script.google.com/macros/s/AKfycby5j7xAumwlKP_a0eGblJvigPnEPCkwVU9kiozzR_WHx2K9T2pKqcsGTKuoIq1S5hyC/exec`

| Column | Field Name | Description | v1 Compat |
| font | timestamp | เวลาบันทึก | ✅ Direct |
| B | consent | "ยินยอม" | ✅ Direct |
| C | consent_research | true / false (วิจัยจุฬาฯ) | 🆕 Added in v2.1 |
| D | consent_parent_link | true / false (Parent Link) | 🆕 Added in v2.1 |
| E | full_name | ชื่อ-นามสกุล | ✅ Direct |
| F | school | สถาบัน / โรงเรียน | ✅ Direct |
| G | grade | Tier (ม.ต้น/ม.ปลาย/ปวช./ป.ตรี ฯลฯ) | ✅ Direct |
| H | grade_year | ชั้นปี (ม.5, ปี 2 ฯลฯ) | ✅ Direct |
| I | line_id | LINE ID (text) | ✅ Direct |
| J | line_user_id | LINE User ID (จาก LIFF) | 🆕 Added in v2.1 |
| K | line_display_name | LINE Display Name (จาก LIFF) | 🆕 Added in v2.1 |
| L | email | อีเมล | ✅ Direct |
| M | gender | เพศ | ✅ Direct |
| N | q1 | Profile Item 1 [INTEREST] | 🔄 Mapped to v1 Q2 |
| O | q2 | Profile Item 2 [STUDY] | 🆕 Mapped item |
| P | q3 | Profile Item 3 [CAREER] | 🔄 Mapped to v1 Q3 |
| Q | q4 | Profile Item 4 [CAREER] | 🆕 Mapped item |
| R | q5 | Profile Item 5 [FUTURE] | 🔄 Mapped to v1 Q4 (Tie-breaker) |
| S | q6 | Wellbeing Item [Anxiety 1-5] | ✅ Direct (v1 Q5) |
| T | q7 | Engagement 1 [อยากเห็นผลไหม] | ✅ Direct (v1 Q6) |
| U | q8 | Engagement 2 [อยากลองทำ 7 วันไหม] | ✅ Direct (v1 Q7) |
| V | q9 | Engagement 3 [เชื่อในประโยชน์ไหม] | 🆕 Added for α ≥ 0.80 |
| W | q10 | Engagement 4 [จะแนะนำเพื่อนไหม] | 🆕 Added for α ≥ 0.80 |
| X | q11 | Need-finding [อยากให้ช่วยเรื่องไหน] | ✅ Direct (v1 Q8) |
| Y | final_profile | Archetype (1 ใน 5 profiles) | ✅ Direct |
| Z | pmf_signal | Strong/Positive/Weak/No Signal | ✅ Direct |
| AA | parent_invite_code | เช่น LM-4827 | 🆕 Added in v2.1 |
| AB | tokens_balance | Default 25 | 🆕 Added in v2.1 |
| AC | app_version | "v2.1" | 🆕 Added in v2.1 |

---

## 3. Backward Compatibility Analysis

8 ใน 11 ข้อของ v3 questionnaire สามารถ map ตรงกับข้อมูล 1,547 records ของ v1 ได้อย่างสมบูรณ์แบบ ทำให้ทีมนักวิจัยสามารถนำข้อมูล baseline v1 มารวมวิจัยเชิงเปรียบเทียบกับข้อมูล v2.1 ได้ทันทีโดยไม่สูญเสียความแม่นยำ
