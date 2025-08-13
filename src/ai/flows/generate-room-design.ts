'use server';

/**
 * @fileOverview AI-powered interior design tool flow.
 *
 * - generateRoomDesign - A function that handles the room design generation process.
 * - GenerateRoomDesignInput - The input type for the generateRoomDesign function.
 * - GenerateRoomDesignOutput - The return type for the generateRoomDesign function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRoomDesignInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a room, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  designStyle: z.string().describe('The desired design style for the room.'),
  prompt: z.string().optional().describe('Additional design prompts or instructions.'),
});
export type GenerateRoomDesignInput = z.infer<typeof GenerateRoomDesignInputSchema>;

const GenerateRoomDesignOutputSchema = z.object({
  redesignedRoomImage: z
    .string()
    .describe(
      'The redesigned room image as a data URI with base64 encoding and image type, suitable for displaying in an <img> tag.'
    ),
});
export type GenerateRoomDesignOutput = z.infer<typeof GenerateRoomDesignOutputSchema>;

export async function generateRoomDesign(input: GenerateRoomDesignInput): Promise<GenerateRoomDesignOutput> {
  return generateRoomDesignFlow(input);
}

const generateRoomDesignPrompt = ai.definePrompt({
  name: 'generateRoomDesignPrompt',
  input: {schema: GenerateRoomDesignInputSchema},
  output: {schema: GenerateRoomDesignOutputSchema},
  prompt: `You are an AI interior designer. Your task is to redecorate the user's room based on the provided photo, a desired design style, and additional instructions.

**IMPORTANT**: You must preserve the existing architectural elements of the room, such as the walls, windows, doors, and ceiling. Do not alter the room's structure. Your changes should focus on furniture, color palette, lighting, and decor.

User's Room Photo: {{media url=photoDataUri}}

Desired Design Style: {{{designStyle}}}

Additional Prompts: {{{prompt}}}

Generate a new image of the room with the redecorated interior. Return only a data URI.`,
});

const generateRoomDesignFlow = ai.defineFlow(
  {
    name: 'generateRoomDesignFlow',
    inputSchema: GenerateRoomDesignInputSchema,
    outputSchema: GenerateRoomDesignOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: [
        {media: {url: input.photoDataUri}},
        {
          text: `Redecorate this room in the style of ${input.designStyle}. Preserve the room's structure (walls, windows, layout). Change only the furniture, colors, and decor. ${input.prompt || ''}`,
        },
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media?.url) {
      throw new Error('Image generation failed. The model did not return an image.');
    }

    return {redesignedRoomImage: media.url};
  }
);
