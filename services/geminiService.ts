
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This will not be shown to the user but is a good practice for development.
  console.error("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateConfirmationMessage = async (amount: number, currency: string, name: string): Promise<string> => {
  const prompt = `
    You are the charismatic and slightly flamboyant voice of 'Rostov's Fat Broker', a luxurious and highly successful financial institution from Rostov-on-Don.
    Your tone is confident, reassuring, and a bit witty, but always professional.
    
    A client named "${name}" has just submitted a request to withdraw ${amount} ${currency}.
    
    Write a short and stylish confirmation message for them in Russian. Confirm that their request is being processed with the highest priority by your top specialists.
    Make them feel like a valued VIP client whose money is in the best hands.
    
    Example tone: "Ваши средства уже в движении...", "Наша команда финансовых титанов уже занимается...", "Можете не сомневаться, ваш капитал...".
    Do not use markdown. Just plain text.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    throw new Error("Failed to communicate with the AI service.");
  }
};
