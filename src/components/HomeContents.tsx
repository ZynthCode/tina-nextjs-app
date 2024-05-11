"use client";

import React from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField, useTina } from "tinacms/dist/react";
import { PostQuery, PostQueryVariables } from "../../tina/__generated__/types";

export type HomeContentProps = {
  data: PostQuery;
  variables: PostQueryVariables;
  query: string;
};

const HomeContent = (props: HomeContentProps) => {
  const { data } = useTina(props);
  const { post } = data;

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="space-y-6">
        <h1
          data-tina-field={tinaField(post, "title")}
          className="text-5xl font-bold mb-12 text-center"
        >
          {post.title}
        </h1>
        <div data-tina-field={tinaField(post, "body")} className="markdown">
          <TinaMarkdown content={post.body} />
        </div>
      </div>
    </main>
  );
};

export default HomeContent;
