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
  prompt: `You are an AI interior designer. You will redesign a room based on a user's photo, desired design style, and any additional prompts.

User's Room Photo: {{media url=photoDataUri}}

Desired Design Style: {{{designStyle}}}

Additional Prompts: {{{prompt}}}

Create a redesigned version of the room that incorporates the specified design style and adheres to the user's additional prompts. Return only a data URI.

`,
});

const generateRoomDesignFlow = ai.defineFlow(
  {
    name: 'generateRoomDesignFlow',
    inputSchema: GenerateRoomDesignInputSchema,
    outputSchema: GenerateRoomDesignOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      // IMPORTANT: ONLY the googleai/gemini-2.0-flash-preview-image-generation model is able to generate images.
      model: 'googleai/gemini-2.0-flash-preview-image-generation',

      // simple prompt
      prompt: [
        {media: {url: input.photoDataUri}},
        {text: `Redesign this room in the style of ${input.designStyle}. ${input.prompt}`},
      ],

      config: {
        responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE, IMAGE only won't work
      },
    });
    return {redesignedRoomImage: media.url!};
  }
);
