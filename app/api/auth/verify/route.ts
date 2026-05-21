import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedAdmin } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  if (isAuthorizedAdmin(request)) {
    return NextResponse.json({ authorized: true });
  }
  return NextResponse.json({ authorized: false }, { status: 401 });
}
