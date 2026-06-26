import Image from "next/image";
import type { Partner } from "@/lib/partners";

type PartnerLogoProps = {
  partner: Partner;
  className?: string;
  imageClassName?: string;
};

export function PartnerLogo({
  partner,
  className = "flex h-16 w-full items-center justify-center rounded-lg bg-white px-4 py-3",
  imageClassName = "h-12 w-auto max-w-full object-contain",
}: PartnerLogoProps) {
  return (
    <div className={partner.logoContainerClassName ?? className}>
      <Image
        src={partner.logo}
        alt={`Logo ${partner.name}`}
        width={200}
        height={80}
        className={imageClassName}
        unoptimized
      />
    </div>
  );
}
