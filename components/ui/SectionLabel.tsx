import Image from "next/image";

/** Small orange divider line with a label under it (e.g. "Your Challenges"). */
/** `onDark`: label sits on a dark (navy) background, so it keeps the brighter `orange`. */
export default function SectionLabel({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <div className="flex flex-col gap-[11px]">
      <Image src="/img/divide.svg" alt="" width={50} height={5} />
      <p className={`text-sm font-bold leading-4 ${onDark ? "text-orange" : "text-orange-ink"}`}>{children}</p>
    </div>
  );
}
