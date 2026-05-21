import { NextRequest } from "next/server";

export function isAuthorizedAdmin(request: NextRequest) {
  const expectedToken = process.env.ADMIN_ACCESS_TOKEN;

  if (!expectedToken) {
    return false;
  }

  const authHeader = request.headers.get("authorization");
  return authHeader === `Bearer ${expectedToken}`;
}
