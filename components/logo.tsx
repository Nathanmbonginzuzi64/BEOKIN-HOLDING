import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  compact?: boolean;
  className?: string;
};

export function Logo({ compact = false, className = "" }: LogoProps) {
  return (
    <Link href="/" aria-label="BEOKIN HOLDING SARL — Accueil" className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src="/logo-icon.svg"
        alt=""
        width={compact ? 32 : 40}
        height={compact ? 32 : 40}
        className={compact ? "h-8 w-8" : "h-10 w-10"}
        priority
      />
      <div className="flex flex-col leading-tight">
        <span className={`font-bold tracking-tight ${compact ? "text-sm" : "text-base"}`}>
          <span className="text-beokin-red">BEO</span>
          <span className="text-beokin-yellow">●</span>
          <span className="text-beokin-blue">KIN</span>
        </span>
        {!compact && (
          <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
            Holding SARL
          </span>
        )}
      </div>
    </Link>
  );
}
