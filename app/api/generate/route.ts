import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY!;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`;

    const systemInstruction = `
You are a smart assistant. Based on the user's issue prompt, do the following:
1. Categorize the issue (e.g., Bug Report, Feature Request, Complaint, Feedback, etc).
2. Summarize the issue in 3 clear bullet points.
3. Rate urgency from 1 to 5 fire emojis (🔥) — more fire = more urgent.
4. Suggest which department should fix the issue. The departments are:
- IT Support
- Human Resources (HR)
- Finance
- Operations
- Customer Service
- Engineering
- Marketing
- Legal
- Sales
- Product Management
- Quality Assurance (QA)
- Facilities
- Procurement
- Security
- Other

Respond exactly in this format:

Category: <category>
Points:
- <point1>
- <point2>
- <point3>
Urgency: <fire emojis>
Department: <department>
`;

    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemInstruction}\n\nPrompt: ${prompt}` }],
        },
      ],
    };

    const res = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const text = res.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error("No response from Gemini");

    return NextResponse.json({ result: text });
  } catch (err: any) {
    console.error("Gemini API Error:", err.message);
    return new NextResponse("Server Error", { status: 500 });
  }
}
