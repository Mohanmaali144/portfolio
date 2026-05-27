// Client-side helpers for the AI chat UI.
// The system prompt + Groq call live in /api/chat.js (server-side).

import { projectsData } from './portfolioData';

export const projectsById = Object.fromEntries(
    projectsData.map((p) => [p.id, p])
);

export const suggestedQuestions = [
    'Tell me about Mohan',
    'Show me his projects',
    'What tech does he use?',
    'How can I hire him?',
];
