import HomeContents from "@/components/HomeContents";
import { client } from "../../tina/__generated__/databaseClient";

export default async function Home() {
  const result = await client.queries.post({ relativePath: "_home.md" });
  return <div>{JSON.stringify(result)}</div>;
  // This is assuming we always have a home.md file under pages that will represent our home page!
  return <HomeContents {...result} />;
}
