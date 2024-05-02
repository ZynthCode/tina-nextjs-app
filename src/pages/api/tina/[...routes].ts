import { TinaNodeBackend, LocalBackendAuthProvider } from "@tinacms/datalayer";
import { AuthJsBackendAuthProvider, TinaAuthJSOptions } from "tinacms-authjs";
import { NextApiRequest, NextApiResponse } from "next";

import databaseClient from "../../../../tina/__generated__/databaseClient";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const handler = TinaNodeBackend({
  authProvider: isLocal
    ? LocalBackendAuthProvider()
    : AuthJsBackendAuthProvider({
        authOptions: TinaAuthJSOptions({
          databaseClient: databaseClient,
          secret: process.env.NEXTAUTH_SECRET!,
        }),
      }),
  databaseClient,
});

const requestHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await handler(req, res);

  console.log({ req: req.body });
  if (req.method === "POST") {
    const body = req.body;
    const updateDocument = body.query && body.query.includes("UpdateDocument");
    const isPostCollection = body.variables && body.variables?.collection === "post";
    const isRootHomePage = body.variables && body.variables?.relativePath === "_home.md";

    if (updateDocument && isPostCollection && isRootHomePage) {
      console.log("reinvalidating now!!");

      // Fire & Forget, this will happen a few seconds after Tina saves it :)
      fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?path=/`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => console.log("Revalidation response:", data))
        .catch((error) => console.error("Revalidation error:", error));
    }
  }
};

export default requestHandler;
