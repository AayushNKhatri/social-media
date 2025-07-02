import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';

const db = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const cookiesStore = await cookies();
    const session = cookiesStore.get('session');

    if (!session || !session.value) {
      return NextResponse.json({ message: 'Session not found' }, { status: 401 });
    }

    const decryptedSession = await decrypt(session.value);

    if (!decryptedSession || !decryptedSession.userId) {
      return NextResponse.json({ message: 'Session not validated' }, { status: 401 });
    }

    const userId: number = Number(decryptedSession.userId);

    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User fetched successfully', user }, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/userprofile:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
