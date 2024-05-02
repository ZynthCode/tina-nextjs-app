import { revalidatePath } from "next/cache";
import "server-only";

export const revalidate = (path: string) => {
  "use server";
  revalidatePath(path);
};
