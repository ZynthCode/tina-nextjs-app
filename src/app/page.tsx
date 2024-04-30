import HomeContents from "@/components/HomeContents";
import client from "../../tina/__generated__/client";

export default async function Home() {
  // This is assuming we always have a home.md file under pages that will represent our home page!
  const result = await client.queries.post({ relativePath: "_home.md" });
  return <HomeContents {...result} />;
}
