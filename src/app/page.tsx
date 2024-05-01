import HomeContent, { HomeContentProps } from "@/components/HomeContents";
import client from "../../tina/__generated__/databaseClient";

async function getHomeProps(): Promise<HomeContentProps> {
  const rawData = await client.queries.post({ relativePath: "_home.md" });

  const result: HomeContentProps = {
    data: {
      post: {
        title: rawData.data.post.title,
        body: rawData.data.post.body,
      },
    },
    variables: rawData.variables,
    query: rawData.query,
  };

  return result;
}
export default async function Home() {
  const props = await getHomeProps();
  return <HomeContent {...props} />;
}
