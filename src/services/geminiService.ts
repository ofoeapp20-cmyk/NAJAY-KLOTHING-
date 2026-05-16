import { GoogleGenAI, Type } from "@google/genai";
import { PRODUCTS } from "../constants";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getProductRecommendations(userDescription: string): Promise<{
  recommendations: Product[];
  reasoning: string;
}> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Who is the user shopping for? "${userDescription}". 
      Based on the following products, recommend the top 3 items and explaining why they are suitable.
      
      Products: ${JSON.stringify(PRODUCTS.map(p => ({ id: p.id, name: p.name, description: p.description, category: p.category })))}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "IDs of the recommended products",
            },
            reasoning: {
              type: Type.STRING,
              description: "A short, elegant explanation of why these products were chosen, written in a sophisticated and warm tone.",
            },
          },
          required: ["recommendedIds", "reasoning"],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    const recommendations = PRODUCTS.filter(p => result.recommendedIds.includes(p.id));

    return {
      recommendations,
      reasoning: result.reasoning || "We've selected these pieces for their timeless quality and heartfelt nature.",
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      recommendations: PRODUCTS.slice(0, 3),
      reasoning: "Our AI assistant is momentarily resting. Here are some of our most cherished classics.",
    };
  }
}
