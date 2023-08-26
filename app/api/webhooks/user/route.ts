import { prisma } from '@/lib/db';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

// ngrok http 3000
// https://711a-103-195-202-203.ngrok.io/api/webhooks/user
const webhookSecret: string = process.env.WEBHOOK_SECRET || '';

export async function POST(req: Request) {
    const payload = await req.json();
    const payloadString = JSON.stringify(payload);
    const headerPayload = headers();
    const svixId = headerPayload.get('svix-id');
    const svixIdTimeStamp = headerPayload.get('svix-timestamp');
    const svixSignature = headerPayload.get('svix-signature');
    if (!svixId || !svixIdTimeStamp || !svixSignature) {
        return new Response('Error occured', {
            status: 400
        });
    }
    // Create an object of the headers
    const svixHeaders = {
        'svix-id': svixId,
        'svix-timestamp': svixIdTimeStamp,
        'svix-signature': svixSignature
    };
    // Create a new Webhook instance with your webhook secret
    const wh = new Webhook(webhookSecret);

    let evt: WebhookEvent;
    try {
        // Verify the webhook payload and headers
        evt = wh.verify(payloadString, svixHeaders) as WebhookEvent;
    } catch (_) {
        console.log('error');
        return new Response('Error occured', {
            status: 400
        });
    }
    const { id } = evt.data;
    // Handle the webhook
    const eventType = evt.type;

    console.log(`User ${id} was ${eventType}`);

    if (eventType === 'user.created' || eventType === 'user.updated') {

        await prisma.user.upsert({
            where: { externalId: id as string },
            create: {
                externalId: id as string,
                imageUrl: evt.data.image_url,
                primaryEmailAddressId: evt.data.primary_email_address_id
            },
            update: { imageUrl: evt.data.image_url, primaryEmailAddressId: evt.data.primary_email_address_id },
        })

    }

    if (eventType === 'user.deleted') {

        await prisma.user.delete({
            where: { externalId: id as string },
        })

    }
    return new Response('', {
        status: 201
    });
}