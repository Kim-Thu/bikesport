import type { PropsWithChildren } from "react";

export function Container({ children }: PropsWithChildren) {
  return <div className="mx-auto w-full max-w-screen-2xl px-6">{children}</div>;
}
