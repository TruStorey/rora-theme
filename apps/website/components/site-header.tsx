import Link from "next/link";

const nav = [
  { href: "/palette", label: "Palette" },
];

export function SiteHeader() {
  return (
    <header className="relative z-10">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-6 sm:px-8">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-rora-starlight transition-colors hover:text-rora-violet"
        >
          Rora
        </Link>
        <nav className="flex items-center gap-6 text-sm text-rora-veil">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-rora-starlight"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
