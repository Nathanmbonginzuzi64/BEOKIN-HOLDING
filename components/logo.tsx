import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  compact?: boolean;
  className?: string;
};

export function Logo({ compact = false, className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="BEOKIN HOLDING SARL — Accueil"
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src="/logo.png"
        alt="BEOKIN HOLDING SARL"
        width={compact ? 150 : 200}
        height={compact ? 42 : 56}
        className={compact ? "h-9 w-auto max-w-[150px]" : "h-12 w-auto max-w-[200px]"}
        priority
      />
    </Link>
  );
}
