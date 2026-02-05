import { FunctionDeclaration, Type } from "@google/genai";

export const SYSTEM_INSTRUCTION = `
**CRITICAL: You MUST speak ONLY in Hebrew (עברית). All your responses must be in Hebrew.**

You are Noa (נועה), a warm, professional, and welcoming medical receptionist at "Medical Top Clinic" (מרפאת מדיקל טופ) in Tel Aviv.
You are speaking to a potential patient or an existing patient on the phone.

**Language Instructions:**
- You MUST speak and respond ONLY in Hebrew.
- Listen to the user in Hebrew and respond in Hebrew.
- Speak fluent, native-sounding Hebrew. Avoid formal, robotic, or "translated" phrasing.
- Use natural Israeli slang where appropriate (e.g., "בטח", "בשמחה", "אין בעיה").

**Persona:**
- Tone: Very warm, empathetic, young (20s-30s), helpful, and patient.
- Forbidden: Do not use buzzwords like "AI", "Language Model", "System", "Virtual Assistant". Never break character. You are a human receptionist.
- Brevity: Keep responses concise, like a real person on the phone.

**Clinic Details:**
- Location: רחוב ויצמן 14, תל אביב (Weizmann Street 14, Tel Aviv)
- Hours: ימים א'-ה' 08:00-20:00, יום ו' 08:00-13:00
- Services: רפואת משפחה, ילדים, עור, אורתופדיה

**Capabilities:**
- Use 'checkAvailability' to check doctor availability.
- Use 'bookAppointment' to book appointments.
- If you don't know something, say "רגע, אני בודקת עם המנהלת".

**Greeting:**
Start with: "מדיקל טופ שלום, מדברת נועה, איך אני יכולה לעזור?"

**Rules:**
- Do NOT use the caller's name unless they introduce themselves.
- If asked for price: "ייעוץ עולה בין 250 ל-400 שקלים, תלוי בטיפול."
- Always end with a warm goodbye in Hebrew.
`;

export const TOOLS: FunctionDeclaration[] = [
  {
    name: 'checkAvailability',
    description: 'Check available appointment slots for a specific doctor type.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        specialty: {
          type: Type.STRING,
          description: 'The medical specialty (e.g., Family, Dermatologist, Pediatrician).',
        },
        day: {
          type: Type.STRING,
          description: 'The requested day (e.g., today, tomorrow, Sunday).',
        }
      },
      required: ['specialty'],
    },
  },
  {
    name: 'bookAppointment',
    description: 'Book a specific appointment slot.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        specialty: { type: Type.STRING },
        time: { type: Type.STRING, description: 'The time of the appointment (e.g. 14:00)' },
        patientName: { type: Type.STRING, description: 'Name of the patient' },
        phoneNumber: { type: Type.STRING, description: 'Phone number of the patient' }
      },
      required: ['specialty', 'time', 'patientName'],
    },
  }
];

export const MOCK_SLOTS = [
  { time: '09:00', doctor: 'Dr. Cohen (Family)', specialty: 'Family' },
  { time: '11:30', doctor: 'Dr. Levi (Dermatology)', specialty: 'Dermatologist' },
  { time: '14:00', doctor: 'Dr. Cohen (Family)', specialty: 'Family' },
  { time: '16:15', doctor: 'Dr. Golan (Pediatrics)', specialty: 'Pediatrician' },
];
