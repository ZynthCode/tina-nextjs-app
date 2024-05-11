import HomeContent from "@/components/HomeContents";
import client from "../../tina/__generated__/databaseClient";
import { fixTinaResults as getFixedTinaResults } from "../../tina/tina-utils";

export default async function Home() {
  const rawResult = await client.queries.post({ relativePath: "_home.md" });
  const result = getFixedTinaResults(rawResult);

  return <HomeContent {...result} />;
}
