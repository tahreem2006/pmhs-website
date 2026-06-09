// src/app/(public)/about/admission/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign-in | PMHS",
};

export default function SigninLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}