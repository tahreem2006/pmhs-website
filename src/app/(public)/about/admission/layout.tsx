 
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admission | PMHS",
};

export default function AdmissionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}