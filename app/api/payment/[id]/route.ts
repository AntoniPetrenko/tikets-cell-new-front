import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    console.log("ID", id)

    // Получаем query параметры из URL запроса к Next.js API
    const url = new URL(req.url);
    const queryString = url.search; // ?tel=...&name=...&email=...

    // Проксируем на внешний сервер
    const response = await fetch(
      `https://prodaytachky.com.ua/api/payment/${id}${queryString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // если нужен API key, добавь здесь
          // "Authorization": `Bearer ${process.env.MY_API_KEY}`,
        },
        cache: "no-store",
      }
    );

    // Ответ сервера
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
