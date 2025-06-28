import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_KEY || "your-api-key-here"
});

export interface GenerateRepliesOptions {
  message: string;
  tone: "friendly" | "professional" | "empathetic" | "blunt";
}

export async function generateReplies({ message, tone }: GenerateRepliesOptions): Promise<Array<{ text: string; tone: string }>> {
  try {
    const toneDescriptions = {
      friendly: "warm, casual, and approachable",
      professional: "formal, business-appropriate, and courteous",
      empathetic: "understanding, compassionate, and supportive",
      blunt: "direct, straightforward, and to-the-point"
    };

    const prompt = `You are a smart personal assistant helping generate reply suggestions. 

Here's a message I received:
"${message}"

Generate 3 different reply options in a ${toneDescriptions[tone]} tone. 

Requirements:
- Keep replies clear, human, and contextually appropriate
- Vary the length and approach while maintaining the ${tone} tone
- Make each reply distinct and useful
- Ensure replies are ready to send (complete sentences)

Respond with JSON in this exact format:
{
  "replies": [
    {"text": "First reply text here", "tone": "${tone}"},
    {"text": "Second reply text here", "tone": "${tone}"},
    {"text": "Third reply text here", "tone": "${tone}"}
  ]
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert communication assistant. Generate helpful, contextually appropriate reply suggestions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 1000,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    if (!result.replies || !Array.isArray(result.replies)) {
      throw new Error("Invalid response format from OpenAI");
    }

    return result.replies;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to generate replies: ${error.message}`);
    }
    throw new Error("Failed to generate replies: Unknown error");
  }
}
