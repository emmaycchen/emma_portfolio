import type { Metadata } from "next";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  // TODO: remove `robots` once this page has real content, so it can be indexed.
  robots: { index: false },
  title: "Blog | Emma Chen | Design × Growth",
};

export default function BlogPage() {
  return <ComingSoon title="Blog" />;
}
