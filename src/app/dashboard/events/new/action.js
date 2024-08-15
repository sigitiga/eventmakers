"use server";

import { prisma } from "@/utils/prisma";
import { auth } from "@/lib/auth";
import { uploadFile } from "@/lib/uploadFile";

export async function createEventAction(_, formData) {
  const name = formData.get("name");
  const description = formData.get("description");
  const city = formData.get("city");
  const isOnline = formData.get("isOnline");
  const location = formData.get("location");
  const file = formData.get("file");

  const payload = await auth();

  if (!name || !description || !city || !isOnline || !location) {
    return {
      success: false,
      message: "Please fill all the fields",
    };
  }

  const event = await prisma.event.create({
    data: {
      name,
      description,
      city,
      location,
      isOnline: isOnline === "true",
      authorId: payload.id,
      image: file.name,
    },
  });

  await uploadFile({ key: file.name, body: file, folder: event.id });

  return {
    success: true,
    message: "Event created",
  };
}
