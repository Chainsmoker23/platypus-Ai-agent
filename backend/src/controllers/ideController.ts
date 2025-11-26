// FIX: Changed to a type-only import to resolve issues with Request and Response types.
import type { Request, Response } from 'express';
import { GeminiService } from '../services/geminiService';
import { logger } from '../utils/logger';

// Instantiate the service once and reuse it for all controller functions.
const geminiService = new GeminiService();

/**
 * Controller for generating a project file structure from a prompt.
 */
export const generateProject = async (req: Request, res: Response): Promise<void> => {
    // FIX: req.body is now correctly typed.
    const { prompt } = req.body;
    if (!prompt) {
        // FIX: res.status and res.json are now correctly typed.
        res.status(400).json({ error: 'Prompt is required.' });
        return;
    }
    
    try {
        const fileSystem = await geminiService.generateProjectFromPrompt(prompt);
        // FIX: res.json is now correctly typed.
        res.json({ files: fileSystem });
    } catch (error) {
        logger.error('Error in generateProject controller:', error);
        // FIX: res.status and res.json are now correctly typed.
        res.status(500).json({ error: 'Failed to generate project.' });
    }
};

/**
 * Controller for providing real-time inline code suggestions.
 */
export const getInlineSuggestion = async (req: Request, res: Response): Promise<void> => {
    // FIX: req.body is now correctly typed.
    const { codeBefore, codeAfter, filePath } = req.body;
    if (codeBefore === undefined || codeAfter === undefined) {
        // FIX: res.status and res.json are now correctly typed.
        res.status(400).json({ error: 'codeBefore and codeAfter are required.' });
        return;
    }
    
    try {
        const suggestion = await geminiService.getInlineSuggestion(codeBefore, codeAfter, filePath);
        // FIX: res.json is now correctly typed.
        res.json({ suggestion });
    } catch (error) {
        logger.error('Error in getInlineSuggestion controller:', error);
        // FIX: res.status and res.json are now correctly typed.
        res.status(500).json({ error: 'Failed to get inline suggestion.' });
    }
};

/**
 * Controller for handling conversational chat with the AI.
 */
export const handleChat = async (req: Request, res: Response): Promise<void> => {
    // FIX: req.body is now correctly typed.
    const { message, history } = req.body;
     if (!message) {
        // FIX: res.status and res.json are now correctly typed.
        res.status(400).json({ error: 'Message is required.' });
        return;
    }

    try {
        const reply = await geminiService.runChat(message, history);
        // FIX: res.json is now correctly typed.
        res.json({ reply });
    } catch (error) {
        logger.error('Error in handleChat controller:', error);
        // FIX: res.status and res.json are now correctly typed.
        res.status(500).json({ error: 'Failed to get chat reply.' });
    }
};