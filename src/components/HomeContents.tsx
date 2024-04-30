"use client";

import React from "react";
import { PostQuery } from "../../tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField, useTina } from "tinacms/dist/react";

type Props = {
  data: PostQuery;
  variables: {
    relativePath: string;
  };
  query: string;
};

const HomeContents = (props: Props) => {
  const { data } = useTina(props);
  const post = data.post;

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="space-y-6">
        <h1 data-tina-field={tinaField(post, "title")} className="text-5xl font-bold mb-12 text-center">
          {post.title}
        </h1>
        <div data-tina-field={tinaField(post, "body")} className="markdown">
          <TinaMarkdown content={post.body} />
        </div>
      </div>
    </main>
  );
};

export default HomeContents;
