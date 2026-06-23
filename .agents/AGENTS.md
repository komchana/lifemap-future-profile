# Workspace Rules

- **ห้ามแก้ไขหรือยุ่งกับโค้ดของนักพัฒนาคนอื่นเด็ดขาด:** ในการทำงานพัฒนาใดๆ ให้หลีกเลี่ยงการแก้ไขหรือดัดแปลงโครงสร้างโค้ดเดิมที่เขียนขึ้นโดยนักพัฒนาภายนอกหรือทีมงานอื่น เว้นแต่จะได้รับคำสั่งและยืนยันอย่างชัดเจนจากผู้ใช้ (Do not modify, overwrite, or interfere with code written by other developers in the workspace unless explicitly instructed by the user).
- **ล็อกพอร์ตเซิร์ฟเวอร์รันระบบที่ 8088:** สำหรับโปรเจกต์เว็บหลัก LifeMap (ฝั่ง Gemini) ให้ล็อกและรันบนพอร์ต 8088 เสมอ และห้ามใช้พอร์ตอื่นๆ เพื่อป้องกันความสับสนและให้ตรงตามพอร์ตที่ผู้ใช้กำหนด (Always lock and run the web app server on port 8088).
