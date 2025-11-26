import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1'; // Assuming the backend runs locally

interface GenerateProjectResponse {
    // The keys are file paths (e.g., "src/index.js")
    // The values are the string content of the files.
    files: { [key: string]: string };
}

interface ChatResponse {
    reply: string;
}

interface ChatMessage {
    role: 'user' | 'model';
    parts: Array<{ text: string }>;
}

/**
 * Calls the backend API to generate a project structure from a prompt.
 * @param prompt The user's description of the project.
 * @param apiKey The user's Platypus API key.
 * @returns A promise that resolves to the API response.
 */
export async function generateProject(prompt: string, apiKey: string): Promise<GenerateProjectResponse> {
    try {
        const response = await axios.post<GenerateProjectResponse>(
            `${API_BASE_URL}/project/generate`, 
            { prompt },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `ApiKey ${apiKey}` 
                }
            }
        );
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const serverError = error.response?.data?.error || error.message;
            throw new Error(`API Error: ${serverError}`);
        }
        throw new Error(`An unexpected error occurred: ${error.message}`);
    }
}

/**
 * Calls the backend chat API.
 * @param message The user's message.
 * @param history The conversation history.
 * @param apiKey The user's Platypus API key.
 * @returns The AI's reply.
 */
export async function handleChat(message: string, history: ChatMessage[], apiKey: string): Promise<string> {
    try {
        const response = await axios.post<ChatResponse>(
            `${API_BASE_URL}/chat`,
            { message, history },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `ApiKey ${apiKey}`
                }
            }
        );
        return response.data.reply;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const serverError = error.response?.data?.error || error.message;
            throw new Error(`API Error: ${serverError}`);
        }
        throw new Error(`An unexpected error occurred: ${error.message}`);
    }
}
