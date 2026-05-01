import { NextResponse } from 'next/server';
import { saveContact } from '@/lib/db';
import { sendContactNotification } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    const contact = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      subject: subject?.trim() ?? '',
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    // Save to local JSON DB
    saveContact(contact);

    // Send email notification (non-blocking — don't fail if email fails)
    sendContactNotification(contact).catch((err) => {
      console.error('[email] Failed to send notification:', err.message);
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact] Error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
