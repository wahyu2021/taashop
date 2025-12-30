import { createClient } from 'next-sanity';
import { NextResponse } from 'next/server';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Write operations should bypass CDN
  token: process.env.SANITY_API_TOKEN, // Required for write access
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const doc = {
      _type: 'contactSubmission',
      name,
      email,
      phone: phone || '',
      subject: subject || 'No Subject',
      message,
      submittedAt: new Date().toISOString(),
      status: 'new',
      source: 'contact-page',
    };

    const result = await client.create(doc);

    return NextResponse.json(
      { message: 'Submission successful', id: result._id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
