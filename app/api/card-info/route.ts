import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("TEST")
    const externalUrl = "https://prodaytachky.com.ua/api/card-info";
    const response = await fetch(externalUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Proxy error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
