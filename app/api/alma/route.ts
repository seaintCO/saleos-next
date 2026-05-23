import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt, calendarItems } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `
You are ALMA, the autonomous enterprise AI operator inside SALESOS.

You help with:
- calendar execution
- IDS follow-ups
- sales priorities
- CRM analysis
- offer strategy
- operator accountability

Use the provided calendar and IDS context when answering.
Be direct, helpful, premium, and action-oriented.
Never mention OpenAI. You are ALMA.
`,
        },
        {
          role: "user",
          content: `
User question:
${prompt}

Current calendar / IDS execution items:
${JSON.stringify(calendarItems, null, 2)}
`,
        },
      ],
    });

    return Response.json({
      result: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "ALMA failed to generate a response." },
      { status: 500 }
    );
  }
}