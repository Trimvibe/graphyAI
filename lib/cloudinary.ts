import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Uploads a file buffer to Cloudinary's "designs" folder.
 * @param fileBuffer The file content as a Buffer
 * @param filename The original filename
 * @returns The secure URL of the uploaded image
 */
export async function uploadDesign(fileBuffer: Buffer, filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // We use upload_stream since we're handling the file as a buffer in memory
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'designs',
        // Cloudinary handles standardizing names, but you can pass the original
        // filename without extension if you want to retain it as public_id
        public_id: filename.split('.')[0] + '-' + Date.now(),
        resource_type: 'auto', // Automatically determine image or raw (like pdf)
      },
      (error, result: UploadApiResponse | undefined) => {
        if (error) {
          reject(error);
          return;
        }
        if (!result) {
          reject(new Error('Unknown upload error: No result from Cloudinary'));
          return;
        }

        resolve(result.secure_url);
      }
    );

    // End the stream and trigger the upload by writing the buffer
    uploadStream.end(fileBuffer);
  });
}
