import { NextResponse } from "next/server"

export async function GET() {
  const userData = {
    name: "John Doe",
    reputation: 95,
  }
  return NextResponse.json(userData)
}