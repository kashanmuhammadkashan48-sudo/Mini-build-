// Gemini API Service
// Note: For production, create a backend server to securely handle API calls

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export async function sendMessageToGemini(message, previousMessages = [], memory = []) {
  try {
    // Build conversation context from previous messages
    const conversationContext = previousMessages
      .slice(-10) // Last 10 messages for context
      .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');

    // Build memory context
    const memoryContext = memory
      .slice(-5) // Last 5 memory items
      .map(m => m.context ? `Remember: ${JSON.stringify(m.context)}` : '')
      .filter(m => m)
      .join('\n');

    const fullContext = `${memoryContext}\n\n${conversationContext}`;

    const prompt = `You are Mini Build, a professional AI assistant powered by Google Gemini. 
You are helpful, intelligent, and conversational.
You can help with code generation, image generation, image analysis, and much more.

Context:
${fullContext}

User: ${message}

Assistant:`;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      }),
      params: {
        key: GEMINI_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.candidates[0]?.content?.parts[0]?.text || 'No response';

    return {
      content,
      type: 'text'
    };
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to get response from Gemini API');
  }
}

export async function generateImage(prompt) {
  try {
    // This would use Gemini's image generation capability
    // Implementation depends on Gemini's image generation API
    return {
      url: 'image_url',
      prompt: prompt
    };
  } catch (error) {
    console.error('Image generation error:', error);
    throw error;
  }
}

export async function analyzeImage(imageBase64) {
  try {
    const prompt = 'Analyze this image and describe what you see in detail.';
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            {
              text: prompt
            },
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: imageBase64.split(',')[1]
              }
            }
          ]
        }],
        generationConfig: {
          temperature: 0.4,
          topK: 32,
          topP: 1,
          maxOutputTokens: 4096,
        }
      }),
      params: {
        key: GEMINI_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || 'Could not analyze image';
  } catch (error) {
    console.error('Image analysis error:', error);
    throw error;
  }
}
