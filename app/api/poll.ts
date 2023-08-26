import { prisma } from "@/lib/db";
import { NextResponse } from 'next/server';

export async function GET() {

    try {
        const now = new Date();

        // Find polls that have an expiration date earlier than the current time
        const expiredPolls = await prisma.poll.findMany({
            where: {
                status: 'Active',
                expiration: {
                    lt: now,
                },
            },
        });

        // Update the status of expired polls to "Finished" or "Locked"
        await Promise.all(
            expiredPolls.map(async (poll) => {
                const newStatus = poll.status === 'Active' ? 'Finished' : 'Locked';
                await prisma.poll.update({
                    where: { id: poll.id },
                    data: { status: newStatus },
                });
            })
        );

        NextResponse.json({ ok: true });

        console.log(`${expiredPolls.length} polls have been expired.`);
    } catch (error) {
        console.error('Error expiring polls:', error);

        NextResponse.json({ ok: false, error });
    }
}