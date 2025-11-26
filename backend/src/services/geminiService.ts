import { GoogleGenAI, Type, Content } from '@google/genai';
import { logger } from '../utils/logger';

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      logger.error("API_KEY is not defined in environment variables. The application will exit.");
      throw new Error("API_KEY is not defined in environment variables.");
    }
    this.ai = new GoogleGenAI({ apiKey });
  }

  /**
   * Generates a complete project file structure based on a user prompt.
   * Uses Gemini's JSON mode to ensure a structured, parsable response.
   */
  async generateProjectFromPrompt(prompt: string): Promise<object> {
    logger.info(`Generating project for prompt: "${prompt}"`);

    const systemInstruction = "You are an expert software engineer AI. Your task is to generate a complete, production-ready file structure and code for a given user prompt. You must respond ONLY with a valid JSON object. The JSON object keys should be the full file paths (e.g., \"src/components/Button.tsx\"), and the values should be the complete, raw string content of the files. Ensure the code is functional and follows best practices.";

    const userPrompt = `The user wants to build: "${prompt}". Generate all necessary files, including package.json, configuration files, source code, and basic styling.`;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview', // Use a powerful model for complex generation
        contents: [
          { role: 'user', parts: [{ text: userPrompt }] }
        ],
        config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                // This allows any string key to be mapped to a string value (file path -> file content)
                additionalProperties: {
                    type: Type.STRING
                }
            },
            temperature: 0.1 // Lower temperature for more deterministic code generation
        },
      });
      
      const responseText = response.text;
      if (!responseText) {
        logger.error('Received an empty response from Gemini API for project generation.');
        throw new Error('Received an empty response from the AI.');
      }
      return JSON.parse(responseText.trim());

    } catch (error) {
      logger.error('Error calling Gemini API for project generation:', error);
      throw new Error('Failed to generate project from prompt.');
    }
  }

  /**
   * Handles IDE chat functionality, maintaining conversation history.
   */
  async runChat(message: string, history?: Content[]): Promise<string> {
    logger.info(`Running chat with message: "${message}"`);
    try {
        const chat = this.ai.chats.create({ 
            model: 'gemini-2.5-flash', 
            history,
            config: {
                systemInstruction: "You are Platypus, an expert AI pair programmer. You are helpful, concise, and provide high-quality code and explanations."
            }
        });
        
        const response = await chat.sendMessage({ message });
        const responseText = response.text;
        if (!responseText) {
            logger.warn('Received an empty chat response from Gemini API.');
            return 'Sorry, I seem to be at a loss for words. Could you try rephrasing?';
        }
        return responseText;

    } catch (error) {
        logger.error('Error calling Gemini API for chat:', error);
        return 'Sorry, I encountered an error while processing your request.';
    }
  }

  /**
   * Generates inline code suggestions based on the surrounding context.
   */
  async getInlineSuggestion(codeBefore: string, codeAfter: string, filePath?: string): Promise<string> {
    logger.info(`Getting inline suggestion for file: ${filePath || 'unknown'}`);
    const prompt = `You are an expert code completion AI. Given the code from a file named "${filePath || 'unknown'}" with the cursor position indicated by "CURSOR_POSITION", provide the most likely code completion. Only return the code that should be inserted at the cursor position. Do not repeat the existing code or provide explanations.
    
Code:
---
${codeBefore}CURSOR_POSITION${codeAfter}
---

Completion:`;
    
    try {
        const response = await this.ai.models.generateContent({ 
          model: 'gemini-3-pro-preview', // A powerful model is best for code
          contents: prompt,
          config: {
            // Stop sequences can prevent the model from generating extraneous text
            stopSequences: ['\n```', '\n}'],
            temperature: 0, // Code completion should be deterministic
            maxOutputTokens: 100
          }
        });
        
        return response.text || '';
    } catch (error) {
        logger.error('Error calling Gemini API for inline suggestion:', error);
        return '';
    }
  }
}