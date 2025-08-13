'use server';

import { generateRoomDesign, type GenerateRoomDesignInput } from '@/ai/flows/generate-room-design';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';


async function saveDesign(userId: string, originalImageUrl: string, generatedImageUrl: string, prompt: string, style: string) {
    try {
        // 1. Upload generated image to Firebase Storage
        const generatedImageRef = ref(storage, `designs/${userId}/${uuidv4()}.png`);
        const uploadResult = await uploadString(generatedImageRef, generatedImageUrl, 'data_url');
        const publicGeneratedUrl = await getDownloadURL(uploadResult.ref);

        // 2. Save design metadata to Firestore
        await addDoc(collection(db, 'users', userId, 'designs'), {
            originalImageUrl, // This might be a data URI or a URL, handle accordingly
            generatedImageUrl: publicGeneratedUrl,
            prompt,
            style,
            createdAt: serverTimestamp(),
        });

        return { success: true, data: { generatedImageUrl: publicGeneratedUrl } };
    } catch (error) {
        console.error("Error saving design:", error);
        return { success: false, error: 'Failed to save design.' };
    }
}


export async function createDesign(input: GenerateRoomDesignInput) {
  try {
    const result = await generateRoomDesign(input);

    const output = await (async () => {
        if (!result.redesignedRoomImage) {
            throw new Error('No image was generated')
        }
        // After generating, save the design if a user ID is provided.
        // Assuming a placeholder userId for now. In a real app, you'd get this from auth.
        const userId = 'test-user'; 
        return await saveDesign(userId, input.photoDataUri, result.redesignedRoomImage, input.prompt || '', input.designStyle);
    })();
    
    return { success: true, data: output.data };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to generate design. ${errorMessage}` };
  }
}
