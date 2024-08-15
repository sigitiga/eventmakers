import { s3Clients } from "@/utils/aws";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadFile({ key, folder, body }) {
  // cara convert from file to buffer
  const buffer = Buffer.from(await body.arrayBuffer());
  // key : string
  // folder : string
  // events/eventId/key.png -> Content-typenya image/png application/pdf image/jpeg application/json
  // avatars/userId/key.png

  // convert file to buffer, buffer seperti buffer di dalam memory

  try {
    const fileUpload = await s3Clients.send(
      new PutObjectCommand({
        Key: `${folder}/${key}`,
        ContentType: "image/png",
        Bucket: process.env.R2_BUCKET_NAME,
        Body: buffer,
      })
    );
    console.log(fileUpload, "Upload Success!✅");
  } catch (error) {
    console.log(error);
  }
}
