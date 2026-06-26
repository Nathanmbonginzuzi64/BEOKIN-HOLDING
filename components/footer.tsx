import Link from "next/link";
import { Logo } from "@/components/logo";

const footerLinks = {
  services: [
    { name: "Développement sur mesure", href: "#services" },
    { name: "Infrastructure IT", href: "#services" },
    { name: "Cybersécurité", href: "#services" },
    { name: "Cloud Computing", href: "#services" },
  ],
  company: [
    { name: "À propos", href: "#about" },
    { name: "Notre équipe", href: "#team" },
    { name: "Contact", href: "#contact" },
  ],
  legal: [
    { name: "Mentions légales", href: "#" },
    { name: "Politique de confidentialité", href: "#" },
    { name: "CGU", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Solutions informatiques innovantes en RDC et à l&apos;international. 
              Votre partenaire de confiance pour la transformation digitale.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              BEOKIN HOLDING SARL
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Entreprise
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Légal
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} BEOKIN HOLDING SARL. Tous droits réservés.
          </p>
          <p className="text-sm text-muted-foreground">
            Kinshasa, RDC
          </p>
        </div>
      </div>
    </footer>
  );
}
