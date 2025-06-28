import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { replyRequestSchema, replyResponseSchema } from "@shared/schema";
import { generateReplies } from "./services/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // POST /api/reply - Generate smart reply suggestions
  app.post("/api/reply", async (req, res) => {
    try {
      // Validate request body
      const validation = replyRequestSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          message: "Invalid request data",
          errors: validation.error.errors,
        });
      }

      const { message, tone, provider } = validation.data;

      // Generate replies using selected provider
      const replies = await generateReplies({ message, tone, provider });

      // Validate response format
      const response = { replies };
      const responseValidation = replyResponseSchema.safeParse(response);
      
      if (!responseValidation.success) {
        throw new Error("Invalid response format");
      }

      res.json(responseValidation.data);
    } catch (error) {
      console.error("Error generating replies:", error);
      
      if (error instanceof Error) {
        if (error.message.includes("API key")) {
          return res.status(401).json({
            message: "OpenAI API key not configured or invalid",
          });
        }
        
        if (error.message.includes("quota") || error.message.includes("billing")) {
          return res.status(402).json({
            message: "OpenAI API quota exceeded or billing issue",
          });
        }
        
        return res.status(500).json({
          message: `Failed to generate replies: ${error.message}`,
        });
      }
      
      res.status(500).json({
        message: "An unexpected error occurred while generating replies",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
