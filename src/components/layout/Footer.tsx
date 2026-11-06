import type { ReactNode } from "react";
import { ArrowUp, Mail } from "lucide-react";

import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { Container } from "@/components/shared/Container";
import { site } from "@/content/site";

type FooterLink = {
  label: string;
  href: string;
  external: boolean;
  icon: ReactNode;
};

const linkClass =
  "inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function Footer() {
  const year = new Date().getFullYear();

  const links: FooterLink[] = [
    {
      label: `Email ${site.name}`,
      href: `mailto:${site.email}`,
      external: false,
      icon: <Mail className="size-4" aria-hidden="true" />,
    },
    {
      label: `${site.name} on LinkedIn (opens in a new tab)`,
      href: site.linkedinUrl,
      external: true,
      icon: <LinkedInIcon />,
    },
  ];

  if (site.githubUrl) {
    links.push({
      label: `${site.name} on GitHub (opens in a new tab)`,
      href: site.githubUrl,
      external: true,
      icon: <GitHubIcon />,
    });
  }

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col items-center gap-6 py-8 text-center text-sm sm:flex-row sm:justify-between sm:text-left">
        <div className="flex flex-col gap-1">
          <p className="font-medium text-foreground">
            © {year} {site.name}
          </p>
          <p className="text-pretty text-muted-foreground">{site.title}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <ul className="flex items-center gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-label={link.label}
                  title={link.label}
                  className={linkClass}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#main"
            className="group inline-flex h-9 items-center gap-1.5 rounded-full px-3 font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Back to top
            <ArrowUp
              className="size-4 transition-transform group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
              aria-hidden="true"
            />
          </a>
        </div>
      </Container>
    </footer>
  );
}
