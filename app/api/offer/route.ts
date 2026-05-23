import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {

    const body = await req.json();

    const {
      intake,
      selected,
      totals,
    } = body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",

      messages: [
        {
          role: "system",
          content:
            "You are ALMA, an elite enterprise sales strategist for SEAINT.",
        },

        {
          role: "user",
          content: `
Client Intake:
${intake}

Selected Services:
${JSON.stringify(selected, null, 2)}

Pricing Totals:
${JSON.stringify(totals, null, 2)}

Create:
1. Recommended offer
2. Positioning
3. Suggested pricing
4. Monthly retainer
5. Sales angle
6. Upsell opportunities
`,
        },
      ],
    });

    return Response.json({
      result:
        completion.choices[0].message.content,
    });

  } catch (error) {

    console.error(error);

    return Response.json(
      {
        error: "Failed to generate offer.",
      },
      {
        status: 500,
      }
    );
  }
}