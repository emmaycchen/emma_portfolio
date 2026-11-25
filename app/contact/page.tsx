import type { Metadata } from "next";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  // TODO: remove `robots` once this page has real content, so it can be indexed.
  robots: { index: false },
  title: "Contact | Emma Chen | Design × Growth",
};

export default function ContactPage() {
  return <ComingSoon title="Contact" />;
}
