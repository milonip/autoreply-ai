import OpenAI from "openai";
import Groq from "groq-sdk";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_KEY || "your-api-key-here"
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "your-groq-api-key-here"
});

export interface GenerateRepliesOptions {
  message: string;
  tone: "friendly" | "professional" | "empathetic" | "blunt";
  provider?: "openai" | "groq" | "ollama";
}

export async function generateReplies({ message, tone, provider = "openai" }: GenerateRepliesOptions): Promise<Array<{ text: string; tone: string }>> {
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

    let response;

    if (provider === "groq") {
      // Use Groq API (free tier available)
      response = await groq.chat.completions.create({
        model: "llama3-8b-8192", // Fast and free model
        messages: [
          {
            role: "system",
            content: "You are an expert communication assistant. Generate helpful, contextually appropriate reply suggestions. Always respond with valid JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });
    } else if (provider === "ollama") {
      // Use local Ollama instance (completely free)
      const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama2", // or any other model you have installed
          prompt: `System: You are an expert communication assistant. Generate helpful, contextually appropriate reply suggestions. Always respond with valid JSON.\n\nUser: ${prompt}`,
          stream: false,
          format: "json"
        })
      });
      
      if (!ollamaResponse.ok) {
        throw new Error("Ollama service not available");
      }
      
      const ollamaData = await ollamaResponse.json();
      const result = JSON.parse(ollamaData.response);
      
      if (!result.replies || !Array.isArray(result.replies)) {
        throw new Error("Invalid response format from Ollama");
      }
      
      return result.replies;
    } else {
      // Use OpenAI API (requires credits)
      response = await openai.chat.completions.create({
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
    }

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    if (!result.replies || !Array.isArray(result.replies)) {
      throw new Error(`Invalid response format from ${provider}`);
    }

    return result.replies;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to generate replies: ${error.message}`);
    }
    throw new Error("Failed to generate replies: Unknown error");
  }
}
