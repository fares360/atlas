// src/lib/r2-upload.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Initialize R2 Client using existing env vars
const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function getPresignedUploadUrl(
  filename: string, 
  contentType: string,
  folder: string = 'articles'
) {
  // 1. Generate a clean, unique file key
  // Example: articles/1715000000-my-image.jpg
  const timestamp = Date.now();
  const cleanFilename = filename.replace(/\s+/g, '-').toLowerCase();
  const fileKey = `${folder}/${timestamp}-${cleanFilename}`;

  // 2. Prepare the command
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: fileKey,
    ContentType: contentType,
    // ACL: 'public-read' // Uncomment if your bucket isn't public by default but supports ACLs
  });

  // 3. Generate Signed URL (valid for 5 minutes)
  const uploadUrl = await getSignedUrl(r2, command, { expiresIn: 300 });

  // 4. Construct the public URL for accessing the file later
  // If you use a custom domain (e.g., assets.mawadda.com)
  const publicUrl = process.env.NEXT_PUBLIC_R2_DOMAIN 
    ? `${process.env.NEXT_PUBLIC_R2_DOMAIN}/${fileKey}`
    : `https://${process.env.R2_BUCKET_NAME}.r2.cloudflarestorage.com/${fileKey}`; // Fallback (often requires auth if not public)

  return {
    uploadUrl,
    fileKey,
    publicUrl
  };
}