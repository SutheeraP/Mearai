import { type PropsWithChildren } from "react";
import Brand from "../_components/svg/Brand";

export default function SignUpSignInLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="bg-dark flex h-dvh overflow-y-scroll lg:grid lg:grid-cols-2">
        <div className="hidden h-screen items-center justify-end text-4xl font-bold lg:flex">
          <Brand />
        </div>
        <div className="flex w-full items-center justify-center gap-5 py-3">
          {children}
        </div>
      </div>
    </>
  );
}
