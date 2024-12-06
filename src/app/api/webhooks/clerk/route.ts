import { type UserJSON } from "@clerk/backend";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { Webhook } from 'svix';
const env = process.env;

const verifyClerkPayload = async (req: Request) => {
  console.log('in verify clerk payload')
  const svixId = req.headers.get("svix-id");
  const svixTimestamp = req.headers.get("svix-timestamp");
  const svixSignature = req.headers.get("svix-signature");
  if (!svixId || !svixTimestamp || !svixSignature) {
    throw new Error("Missing headers");
  }

  const payload = (await req.json()) as Record<string, unknown>;
  const stringifiedPayload = JSON.stringify(payload);
  const svixWebhook = new Webhook(env.CLERK_WEBHOOK_SECRET ?? '');

  return svixWebhook.verify(stringifiedPayload, {
    "svix-id": svixId,
    "svix-timestamp": svixTimestamp,
    "svix-signature": svixSignature,
  }) as { type: AllowClerkWebhooks; data: UserJSON }; // AllowClerkWebhooks and UserJSON comes from Clerk
};

enum AllowClerkWebhooks {
  USER_CREATED = "user.created",
  USER_UPDATED = "user.updated",
  USER_DELETED = "user.deleted",
}

export async function POST(req: NextRequest) {
  try {
    const { data, type } = await verifyClerkPayload(req);

    if (type === AllowClerkWebhooks.USER_CREATED) {

      // Extract user data
      const { id, username, first_name, email_addresses, primary_email_address_id, image_url } = data;
      let userName = "";

      // clerk testing have firstname but username is null
      if (username) {
        userName = username;
      } else {
        userName = first_name ?? '';
      }
      const email = email_addresses.find((e) => e.id === primary_email_address_id);
      const emailAddress = email?.email_address ?? null;

      // Connect data to your database
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await db.user.create({
        data: {
          clerkId: id,
          username: userName,
          email: emailAddress,
          photo: image_url,
        },
      });
    }

    return NextResponse.json({ message: "Ok" });
  } catch (err) {
    console.error("Error processing webhook:", err);
    return NextResponse.json(err);
  }
}