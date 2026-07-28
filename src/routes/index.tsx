import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import jorgeAsset from "../assets/jorge.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jorge & Heid — 08/08/2026" },
      {
        name: "description",
        content:
          "Você está convidado para celebrar o casamento de Jorge e Heid no South Beach, em 08 de agosto de 2026.",
      },
      {
        property: "og:title",
        content: "Jorge & Heid — 08/08/2026",
      },
      {
        property: "og:description",
        content:
          "Você está convidado para celebrar o casamento de Jorge e Heid no South Beach.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [attending, setAttending] = useState<"sim" | "nao" | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attending || !name.trim()) return;

    const subject = encodeURIComponent(
      `RSVP — Casamento Jorge & Heid (${attending === "sim" ? "Confirmado" : "Não poderei ir"})`,
    );
    const body = encodeURIComponent(
      `Olá!\n\n` +
        `Gostaria de confirmar minha presença no casamento de Jorge & Heid.\n\n` +
        `Nome: ${name.trim()}\n` +
        `Vai comparecer? ${attending === "sim" ? "Sim" : "Não"}\n` +
        `Número de convidados (incluindo você): ${guests}\n\n` +
        `Atenciosamente,`,
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 py-20 text-center">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/60 via-background to-background" />

        <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground">
          Junte-se a nós
        </p>
        <h1 className="font-serif text-5xl font-light tracking-tight text-foreground sm:text-7xl md:text-8xl">
          Jorge <span className="font-light italic text-primary">&</span> Heid
        </h1>
        <div className="mt-8 flex flex-col items-center gap-3 text-lg text-muted-foreground sm:flex-row sm:gap-6">
          <span className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            08 de agosto de 2026
          </span>
          <span className="hidden h-1.5 w-1.5 rounded-full bg-muted-foreground sm:block" />
          <span className="flex items-center gap-2">
            <PinIcon className="h-5 w-5" />
            South Beach
          </span>
        </div>
      </section>

      {/* Foto do noivo + introdução */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl bg-muted shadow-xl">
            <img
              src={jorgeAsset.url}
              alt="Jorge, o noivo"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5" />
          </div>
          <div className="text-center md:text-left">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Nossa história
            </p>
            <h2 className="mt-3 text-3xl font-light leading-tight text-foreground sm:text-4xl">
              Onde tudo começou
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Entre risos trocados, olhares que demoravam mais que o normal e
              conversas que nunca queriam acabar, Jorge e Heid descobriram que
              estavam escrevendo a mesma história. O que começou com um simples
              "oi" se transformou em planos, sonhos e na certeza de que a vida
              é melhor quando dividida.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Hoje, com o coração cheio de gratidão, preparamos esse dia para
              celebrar não apenas o nosso amor, mas cada pessoa que fez parte
              dele. Você é uma dessas pessoas.
            </p>
          </div>
        </div>
      </section>

      {/* Detalhes do evento */}
      <section className="border-y border-border bg-secondary/30 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            O grande dia
          </p>
          <h2 className="mt-3 text-3xl font-light text-foreground sm:text-4xl">
            Detalhes do casamento
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <DetailCard
              label="Data"
              value="08 · 08 · 2026"
              sub="Sábado"
            />
            <DetailCard
              label="Horário"
              value="16:00"
              sub="Cerimônia"
            />
            <DetailCard
              label="Local"
              value="South Beach"
              sub="Cerimônia & Recepção"
            />
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section className="mx-auto max-w-xl px-6 py-20">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Confirme sua presença
          </p>
          <h2 className="mt-3 text-3xl font-light text-foreground sm:text-4xl">
            RSVP
          </h2>
          <p className="mt-4 text-muted-foreground">
            Nos conte até <strong className="text-foreground">01 de agosto</strong> se você
            poderá celebrar conosco.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6 rounded-2xl border border-border bg-card p-8 shadow-sm"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-card-foreground"
            >
              Nome completo
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <span className="block text-sm font-medium text-card-foreground">
              Vai comparecer?
            </span>
            <div className="mt-3 grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setAttending("sim")}
                className={`rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                  attending === "sim"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-input bg-background text-foreground hover:bg-accent"
                }`}
              >
                Sim, estarei lá
              </button>
              <button
                type="button"
                onClick={() => setAttending("nao")}
                className={`rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                  attending === "nao"
                    ? "border-destructive bg-destructive text-destructive-foreground"
                    : "border-input bg-background text-foreground hover:bg-accent"
                }`}
              >
                Não poderei ir
              </button>
            </div>
          </div>

          {attending === "sim" && (
            <div>
              <label
                htmlFor="guests"
                className="block text-sm font-medium text-card-foreground"
              >
                Número de convidados (incluindo você)
              </label>
              <select
                id="guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Enviar confirmação
          </button>
          <p className="text-center text-xs text-muted-foreground">
            Ao confirmar, seu aplicativo de e-mail será aberto com os dados
            preenchidos.
          </p>
        </form>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-10 text-center">
        <p className="text-2xl font-light text-foreground">Jorge & Heid</p>
        <p className="mt-2 text-sm text-muted-foreground">
          08 · 08 · 2026 · South Beach
        </p>
        <p className="mt-6 text-xs text-muted-foreground">
          Com carinho, esperamos você.
        </p>
      </footer>
    </div>
  );
}

function DetailCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-3 text-2xl font-light text-card-foreground">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
    </div>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
