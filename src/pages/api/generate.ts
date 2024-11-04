import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

export async function POST({ locals, request }: { locals: App.Locals; request: Request }) {
  const apiKey = locals.runtime.env.XAI_API_KEY;

  if (!apiKey) {
    return new Response('No API key provided', { status: 400 });
  }

  const xai = createOpenAI({
    name: 'xai',
    baseURL: 'https://api.x.ai/v1',
    apiKey
  });

  try {
    const body = await request.json();

    if (!body || !body.prompt) {
      return new Response('No prompt provided', { status: 400 });
    }

    const prompt = body.prompt;

    const { text } = await generateText({
      model: xai('grok-beta'),
      prompt,
    });

    return new Response(text);
  } catch (error) {
    console.error(error);
    return new Response('Error generating text', { status: 500 });
  }
}
