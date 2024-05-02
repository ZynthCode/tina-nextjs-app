import "server-only";

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
