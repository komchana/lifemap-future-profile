# LIFF Setup Guide — LifeMap v2.1

เอกสารนี้อธิบายการตั้งค่า LINE Developers Console และ LIFF ID สำหรับใช้งานใน LifeMap v2.1

---

## 1. ข้อมูล LIFF Channel ปัจจุบัน

- **LIFF ID**: `2010476429-j2w0buds`
- **LIFF App URL**: `https://liff.line.me/2010476429-j2w0buds`
- **Endpoint URL**: `https://grand-sfogliatella-b7c43e.netlify.app`

---

## 2. ขั้นตอนการตั้งค่าใน LINE Developers Console

1. เข้าสู่ระบบที่ [LINE Developers Console](https://developers.line.biz/)
2. เลือก Provider และ Channel (LINE Login Channel)
3. ไปที่แถบ **LIFF**
4. หากต้องการสร้าง LIFF ใหม่ หรืออัปเดต URL ของเดิม:
   - **Size**: Full (เพื่อให้แสดงผลเต็มหน้าจอสมาร์ทโฟน)
   - **Endpoint URL**: `https://grand-sfogliatella-b7c43e.netlify.app`
   - **Scopes**: 
     - `profile` (สำหรับดึง displayName, userId, pictureUrl)
     - `openid`
   - **Bot prompt**: Aggressive หรือ Normal (เพื่อแนะนำให้ผู้ใช้เพิ่ม @lifemap เป็นเพื่อน)
   - **Module behavior**: Default
   - **Options**:
     - ✅ **Scan QR**: Enabled (ถ้าต้องการให้แสกน QR ผ่าน LIFF)
     - ✅ **Send message**: Enabled (เพื่อรองรับ `liff.shareTargetPicker`)

---

## 3. การทดสอบ LIFF Integration

### A. เปิดใช้งานผ่าน LINE App (Mobile)
1. ส่งลิงก์ `https://liff.line.me/2010476429-j2w0buds` หรือ สแกน QR code ในแอป LINE
2. ระบบจะทำการ Auto-login และดึง `displayName` มาใส่ในช่องชื่อโดยอัตโนมัติ
3. เมื่อทำแบบสอบถามจบและกดปุ่ม **"ส่งผลลัพธ์ใน LINE"** ระบบจะเรียก `liff.shareTargetPicker()` เพื่อส่ง Flex Card สรุปผลลัพธ์เข้าแชตเพื่อนหรือกลุ่มได้ทันที

### B. เปิดใช้งานผ่าน Web Browser ทั่วไป (Fallback Mode)
1. เมื่อเปิด URL `https://grand-sfogliatella-b7c43e.netlify.app` ผ่าน Chrome/Safari สภาวะปกติ
2. ระบบจะสลับเข้าสู่ **Browser Fallback Mode** อัตโนมัติ (ไม่ค้างหรือค้างหน้าล็อกอิน)
3. ผู้เรียนสามารถพิมพ์ ชื่อ, สถาบัน, LINE ID, Email ได้ด้วยตนเอง
4. เมื่อกดปุ่ม **"ส่งผลลัพธ์ใน LINE"** ระบบจะ Copy ลิงก์ไว้ใน Clipboard เพื่อให้สามารถนำไปแปะในแชตได้
