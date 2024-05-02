import { wait } from "@/modules/utils/backend-utils";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get("path");

  // TODO: Turn this into a server action so we dont expose this API endpoint?
  // TODO: Alternatively, add a token/secret that needs to be passed for this to work.

  if (path) {
    await wait(5000);

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
