import { NextRequest, NextResponse } from "next/server";

export function withCORS(response: NextResponse, req?: NextRequest) {
  const origin = req?.headers.get("origin");

  if (origin) {
    response.headers.set("Access-Control-Allow-Origin", origin); 
    response.headers.set("Vary", "Origin")
  }

  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  return response;
}
