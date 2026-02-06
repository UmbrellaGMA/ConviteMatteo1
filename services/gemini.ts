
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateRoyalGreeting = async (guestName: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `O nome do convidado é "${guestName}". Crie uma saudação majestosa no estilo do filme O Rei Leão. O convidado está sendo convidado para o aniversário do "Príncipe Matteo". Use termos como 'Terras do Reino', 'Ciclo sem Fim', 'Respeito'. Retorne um objeto JSON com as chaves: 'title' (um título real para o convidado, ex: Lorde, Guerreiro, etc) e 'message' (a saudação curta e épica).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            message: { type: Type.STRING }
          },
          required: ["title", "message"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return result;
  } catch (error) {
    console.error("Erro ao gerar saudação real:", error);
    return {
      title: "Nobre Convidado",
      message: "Sua presença é aguardada com honra sob o olhar do Ciclo sem Fim."
    };
  }
};
