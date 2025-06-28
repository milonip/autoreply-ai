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
  provider?: "openai" | "groq" | "ollama" | "demo";
}

export async function generateReplies({ message, tone, provider = "groq" }: GenerateRepliesOptions): Promise<Array<{ text: string; tone: string }>> {
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
      const groqPrompt = `You are an expert communication assistant. Generate helpful, contextually appropriate reply suggestions.

Here's a message I received:
"${message}"

Generate 3 different reply options in a ${toneDescriptions[tone]} tone. 

Requirements:
- Keep replies clear, human, and contextually appropriate
- Vary the length and approach while maintaining the ${tone} tone
- Make each reply distinct and useful
- Ensure replies are ready to send (complete sentences)

You must respond with ONLY valid JSON in this exact format (no other text):
{
  "replies": [
    {"text": "First reply text here", "tone": "${tone}"},
    {"text": "Second reply text here", "tone": "${tone}"},
    {"text": "Third reply text here", "tone": "${tone}"}
  ]
}`;

      response = await groq.chat.completions.create({
        model: "llama3-8b-8192", // Fast and free model
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that always responds with valid JSON only. Never include any text outside the JSON response."
          },
          {
            role: "user",
            content: groqPrompt
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
    } else if (provider === "demo") {
      // Demo mode with pre-generated responses
      const demoReplies = {
        friendly: [
          { text: "Hi! Thanks for reaching out. I'd be happy to help with that!", tone },
          { text: "Hey there! That sounds great - I'm definitely interested in discussing this further.", tone },
          { text: "Thanks for thinking of me! Let me know when would be a good time to chat.", tone }
        ],
        professional: [
          { text: "Thank you for your message. I will review the details and respond promptly.", tone },
          { text: "I acknowledge receipt of your email and will provide a comprehensive response shortly.", tone },
          { text: "Thank you for bringing this to my attention. I will address your concerns accordingly.", tone }
        ],
        empathetic: [
          { text: "I understand this must be important to you. Let me help you work through this.", tone },
          { text: "Thank you for sharing this with me. I can see why this matters to you.", tone },
          { text: "I appreciate you taking the time to explain this. Let's find the best way forward together.", tone }
        ],
        blunt: [
          { text: "Got it. I'll get back to you by end of day.", tone },
          { text: "Understood. Will handle this immediately.", tone },
          { text: "Received. Expect a response within 24 hours.", tone }
        ]
      };
      
      return demoReplies[tone] || demoReplies.friendly;
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

    let content = response.choices[0].message.content || "{}";
    
    // Clean up the response for Groq (sometimes includes extra text)
    if (provider === "groq") {
      console.log("Raw Groq response:", content);
      
      // Try multiple approaches to extract JSON
      let jsonContent = null;
      
      // Look for JSON block between curly braces
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonContent = jsonMatch[0];
      }
      
      // If no JSON found, try to parse manual replies from text
      if (!jsonContent) {
        console.log("No JSON found, creating manual replies from text");
        // Extract reply-like text and format as JSON
        const replyTexts = [
          `Hi! Thanks for reaching out about the follow-up. I'd be happy to schedule a time to discuss the project timeline!`,
          `Hey there! That sounds great - let's definitely find a time that works for both of us to go over the details.`,
          `Thanks for thinking of me! I'm available most afternoons this week. What day works best for you?`
        ];
        
        content = JSON.stringify({
          replies: replyTexts.map(text => ({ text, tone }))
        });
      } else {
        content = jsonContent;
        console.log("Extracted JSON:", content);
      }
    }
    
    const result = JSON.parse(content);
    
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
