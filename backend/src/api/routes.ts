import { Router } from 'express';
import { 
    generateProject, 
    getInlineSuggestion, 
    handleChat 
} from '../controllers/ideController';

const router = Router();

/**
 * @route   POST /api/v1/project/generate
 * @desc    Generates a project file structure from a prompt.
 * @access  Private (API Key required)
 */
router.post('/project/generate', generateProject);


/**
 * @route   POST /api/v1/suggest/inline
 * @desc    Provides real-time inline code suggestions.
 * @access  Private (API Key required)
 */
router.post('/suggest/inline', getInlineSuggestion);

/**
 * @route   POST /api/v1/chat
 * @desc    Handles conversational chat with the AI about the project.
 * @access  Private (API Key required)
 */
router.post('/chat', handleChat);

export default router;