import { theme } from "@/config/theme.config";
import { copy } from "@/config/copy";
import { Container } from "./ui/Container";
import { Logo } from "./ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-line py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo className="h-12" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {copy.footer.about}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
              Navegação
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              {copy.nav.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-ink">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
              Contato
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>
                <a
                  href={theme.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ink"
                >
                  @{theme.contact.instagram}
                </a>
              </li>
              <li>
                <a href={`mailto:${theme.contact.email}`} className="transition-colors hover:text-ink">
                  {theme.contact.email}
                </a>
              </li>
              <li>{theme.contact.city}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-8">
          <p className="text-xs tracking-wide text-muted">{copy.footer.rights}</p>
        </div>
      </Container>
    </footer>
  );
}
