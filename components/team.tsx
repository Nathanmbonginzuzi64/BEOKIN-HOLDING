import { Linkedin, Mail } from "lucide-react";

const team = [
  {
    name: "Jean-Paul Mukendi",
    role: "Administrateur gérant",
    initials: "AG",
  },
  {
    name: "Marie Kabongo",
    role: "Assistant Administrateur",
    initials: "AA",
  },
  {
    name: "Patrick Lumumba",
    role: "Directeur Technique",
    initials: "DT",
  },
  {
    name: "Sarah Ndombe",
    role: "Juridique",
    initials: "JU",
  },
  {
    name: "Grace Mbuyi",
    role: "Secrétaire",
    initials: "SE",
  },
];

export function Team() {
  return (
    <section id="team" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-beokin-blue">
            Notre équipe
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Des experts à votre service
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Une équipe passionnée et expérimentée, dédiée à la réussite de vos projets
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {team.map((member) => (
            <div
              key={member.name}
              className="group text-center"
            >
              <div className="relative mx-auto h-32 w-32 rounded-full bg-gradient-to-br from-beokin-blue/30 to-beokin-yellow/30 flex items-center justify-center border border-border group-hover:border-beokin-blue/50 transition-colors">
                <span className="text-3xl font-bold text-foreground">{member.initials}</span>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">
                {member.name}
              </h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
              <div className="mt-4 flex justify-center gap-3">
                <button className="p-2 rounded-full bg-secondary hover:bg-beokin-blue/20 transition-colors">
                  <Linkedin className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">LinkedIn de {member.name}</span>
                </button>
                <button className="p-2 rounded-full bg-secondary hover:bg-beokin-blue/20 transition-colors">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">Email de {member.name}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
