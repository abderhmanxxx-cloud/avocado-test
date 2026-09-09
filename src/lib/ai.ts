import axios from "axios";

const LM_STUDIO_URL = process.env.LM_STUDIO_URL || "http://localhost:1234/v1";

interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function askAvocato(messages: AIMessage[]): Promise<string> {
  try {
    const response = await axios.post(LM_STUDIO_URL + "/chat/completions", {
      model: "llama-3.2",
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    throw new Error("Avocato is currently unavailable");
  }
}

export async function suggestRoutine(userId: string): Promise<string[]> {
  const systemPrompt = `You are Avocato, an AI skincare assistant for Avocado Cosmetics. 
  Suggest a personalized routine based on user preferences.`;
  
  const messages: AIMessage[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: `Help me create a custom routine` }
  ];

  const response = await askAvocato(messages);
  return JSON.parse(response || '[]');
}

export async function cancelOrder(orderId: string, userId: string): Promise<boolean> {
  // Function calling for order cancellation
  const systemPrompt = `You are Avocato. You can help users cancel orders.`;
  
  const messages: AIMessage[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: `Cancel order ${orderId} for user ${userId}` }
  ];

  const response = await askAvocato(messages);
  return JSON.parse(response || 'false');
}
