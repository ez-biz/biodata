import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.S3_REGION || "auto",
  endpoint: process.env.S3_ENDPOINT || undefined,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || "",
    secretAccessKey: process.env.S3_SECRET_KEY || "",
  },
  forcePathStyle: true,
});

const BUCKET = process.env.S3_BUCKET || "biodatacraft";

export async function getUploadUrl(
  key: string,
  contentType: string
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
  });
  return getSignedUrl(s3, command, { expiresIn: 600 }); // 10 minutes
}

export async function getDownloadUrl(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });
  return getSignedUrl(s3, command, { expiresIn: 3600 }); // 1 hour
}

export async function deleteObject(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });
  await s3.send(command);
}

export function getPublicUrl(key: string): string {
  const endpoint = process.env.S3_PUBLIC_URL || process.env.S3_ENDPOINT;
  if (endpoint) {
    return `${endpoint}/${BUCKET}/${key}`;
  }
  return `https://${BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`;
}

export function generatePhotoKey(
  userId: string,
  biodataId: string,
  type: "profile" | "additional" | "kundli",
  index: number = 0
): string {
  const timestamp = Date.now();
  return `photos/${userId}/${biodataId}/${type}-${index}-${timestamp}.jpg`;
}
