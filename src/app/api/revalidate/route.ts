import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  const expectedToken = process.env.REVALIDATION_TOKEN;

  if (token !== expectedToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get("path");

  if (path) {
    revalidatePath(path);
    return new Response(JSON.stringify({ revalidate: path }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify({ error: "Missing path param: /api/revalidate?path=***" }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
