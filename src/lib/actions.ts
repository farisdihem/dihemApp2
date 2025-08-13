'use server';

import { generateRoomDesign, type GenerateRoomDesignInput } from '@/ai/flows/generate-room-design';

export async function createDesign(input: GenerateRoomDesignInput) {
  try {
    const result = await generateRoomDesign(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to generate design. ${errorMessage}` };
  }
}
