import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  // Return the resume data as JSON for template filling
  return NextResponse.json({ success: true, resume: data });
}
