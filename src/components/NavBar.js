"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  if (pathname?.startsWith("/embed") || pathname?.startsWith("/demo")) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-6 py-3.5">
        <Link href="/" className="flex flex-shrink-0 items-center gap-2.5">
          <span className="flex h-8.5 w-8.5 items-center justify-center rounded-sm border-[1.5px] border-purple font-serif text-xl text-purple">
            أ
          </span>
          <span className="font-serif text-2xl font-bold text-ink">مكتبة الأصيل</span>
        </Link>
      </div>
    </header>
  );
}
