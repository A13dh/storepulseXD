
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Generates a persuasive product description using the Gemini-3-flash-preview model.
 * Follows guidelines to instantiate the client inside the function.
 */
export const generateProductDescription = async (productName: string, features: string[]) => {
  try {
    // Correct initialization as per instructions: inside the function
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Générer une description de produit e-commerce convaincante pour "${productName}" avec ces caractéristiques : ${features.join(', ')}. Ciblez le marché tunisien, utilisez un ton professionnel mais persuasif en français.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
        // Optional: ensure thinking budget is 0 for low latency on simple text tasks
        thinkingConfig: { thinkingBudget: 0 }
      },
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    // Returning a friendly error message for the UI
    return "Désolé, nous n'avons pas pu générer la description pour le moment. Veuillez réessayer.";
  }
};

/**
 * Generates SEO metadata for a store.
 * Uses structured JSON output with a defined response schema.
 */
export const generateStoreSEO = async (storeName: string, niche: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Générez un titre méta SEO de haut rang et une description pour une boutique en ligne tunisienne nommée "${storeName}" dans la niche "${niche}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { 
              type: Type.STRING,
              description: "The SEO meta title."
            },
            description: { 
              type: Type.STRING, 
              description: "The SEO meta description."
            }
          },
          required: ["title", "description"]
        }
      }
    });
    
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini SEO Error:", error);
    return { 
      title: `${storeName} | Boutique en ligne Tunisie`, 
      description: `Découvrez les meilleurs produits ${niche} chez ${storeName}.` 
    };
  }
};
