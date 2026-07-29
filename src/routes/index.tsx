import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import casal1 from "../assets/casal-1.jpg.asset.json";
import casal2 from "../assets/casal-2.jpg.asset.json";

const WHATSAPP = "258866694467";
const EMAIL = "chambulejorge6@gmail.com";
const WEDDING_DATE = new Date("2026-08-08T16:00:00");
const GREETINGS_KEY = "jorge-heid-felicitacoes";

const VERSES = [
  {
    text: "O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha. Tudo sofre, tudo crê, tudo espera, tudo suporta.",
    ref: "1 Coríntios 13:4,7",
  },
  {
    text: "Portanto, o que Deus uniu, ninguém o separe.",
    ref: "Mateus 19:6",
  },
  {
    text: "Assim já não são dois, mas sim uma só carne.",
    ref: "Marcos 10:8",
  },
  {
    text: "Acima de tudo, porém, revistam-se do amor, que é o elo perfeito.",
    ref: "Colossenses 3:14",
  },
  {
    text: "Quem encontra uma esposa encontra algo excelente; recebeu uma bênção do Senhor.",
    ref: "Provérbios 18:22",
  },
  {
    text: "As muitas águas não conseguem apagar o amor; os rios não conseguem levá-lo na correnteza.",
    ref: "Cânticos 8:7",
  },
];

type Greeting = { id: string; name: string; message: string; date: string };

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function useCountdown(target: Date) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) return null;
  const diff = Math.max(0, target.getTime() - now);
  return {
    dias: Math.floor(diff / 86400000),
    horas: Math.floor((diff / 3600000) % 24),
    minutos: Math.floor((diff / 60000) % 60),
    segundos: Math.floor((diff / 1000) % 60),
  };
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jorge & Heid — Casamento 08.08.2026" },
      {
        name: "description",
        content:
          "Convite para o casamento de Jorge e Heid, dia 08 de agosto de 2026, em South Beach. Confirme a sua presença.",
      },
      { property: "og:title", content: "Jorge & Heid — Casamento 08.08.2026" },
      {
        property: "og:description",
        content:
          "Convite para o casamento de Jorge e Heid, dia 08 de agosto de 2026, em South Beach.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [attending, setAttending] = useState<"sim" | "nao" | null>(null);
  const countdown = useCountdown(WEDDING_DATE);

  const [greetings, setGreetings] = useState<Greeting[]>([]);
  const [gName, setGName] = useState("");
  const [gMessage, setGMessage] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(GREETINGS_KEY);
      if (raw) setGreetings(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const submitGreeting = () => {
    if (!gName.trim() || !gMessage.trim()) return;
    const entry: Greeting = {
      id: `${Date.now()}`,
      name: gName.trim(),
      message: gMessage.trim(),
      date: new Date().toLocaleDateString("pt-PT"),
    };
    const next = [entry, ...greetings];
    setGreetings(next);
    try {
      localStorage.setItem(GREETINGS_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
        `Felicitações aos noivos Jorge & Heid\n\nDe: ${entry.name}\n"${entry.message}"`,
      )}`,
      "_blank",
    );
    setGName("");
    setGMessage("");
  };

  const message =
    `Confirmação de presença — Casamento Jorge & Heid\n\n` +
    `Nome: ${name.trim() || "—"}\n` +
    `Presença: ${attending === "sim" ? "Sim, estarei lá" : attending === "nao" ? "Infelizmente não poderei ir" : "—"}\n` +
    (attending === "sim" ? `Nº de convidados: ${guests}\n` : "");

  const ready = Boolean(attending && name.trim());

  const sendWhatsapp = () => {
    if (!ready) return;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const sendEmail = () => {
    if (!ready) return;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      "RSVP — Casamento Jorge & Heid",
    )}&body=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <header className="relative isolate min-h-[92vh] w-full overflow-hidden">
        <img
          src={casal1.url}
          alt="Jorge e Heid, os noivos, num jardim"
          className="animate-soft-zoom absolute inset-0 -z-20 h-full w-full object-cover object-[50%_35%]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/35 to-black/80" />

        <div className="relative flex min-h-[92vh] flex-col items-center justify-center px-6 py-24 text-center [&_.reveal.is-visible]:[animation-duration:1.2s]">
          <Reveal>
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.45em] text-white/70">
            Com alegria, convidamos você
          </p>
          </Reveal>
          <Reveal delay={200}>
          <h1 className="mt-8 font-serif text-6xl font-light leading-none tracking-tight text-white sm:text-8xl md:text-9xl">
            Jorge
            <span className="mx-3 align-middle font-serif text-4xl italic text-white/70 sm:text-6xl">
              &
            </span>
            Heid
          </h1>
          </Reveal>
          <Reveal delay={400}>
          <div className="mt-10 h-px w-24 bg-white/40" />
          <p className="mt-8 text-lg font-light uppercase tracking-[0.3em] text-white/90 sm:text-xl">
            08 · 08 · 2026
          </p>
          <p className="mt-3 text-sm uppercase tracking-[0.3em] text-white/70">
            South Beach
          </p>
          </Reveal>
          <Reveal delay={600}>
          <a
            href="#rsvp"
            className="animate-float-slow mt-14 inline-flex items-center justify-center rounded-full border border-white/60 px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black"
          >
            Confirmar presença
          </a>
          </Reveal>
        </div>
      </header>

      {/* Contagem regressiva */}
      <section className="border-b border-border bg-secondary/40 px-6 py-16">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-primary">
            Contagem regressiva
          </p>
          <h2 className="mt-4 font-serif text-3xl font-light text-foreground sm:text-4xl">
            Faltam poucos dias para o «sim»
          </h2>
          <div className="mt-10 grid grid-cols-4 gap-3 sm:gap-6">
            {(
              [
                ["Dias", countdown?.dias],
                ["Horas", countdown?.horas],
                ["Minutos", countdown?.minutos],
                ["Segundos", countdown?.segundos],
              ] as const
            ).map(([label, value]) => (
              <div
                key={label}
                className="rounded-sm border border-border bg-card px-2 py-6 shadow-sm transition-transform duration-300 hover:-translate-y-1"
              >
                <p className="font-serif text-3xl font-light tabular-nums text-foreground sm:text-5xl">
                  {value === undefined ? "—" : String(value).padStart(2, "0")}
                </p>
                <p className="mt-2 text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground sm:text-xs">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* História */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal className="relative mx-auto w-full max-w-md">
            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[999px_999px_16px_16px] bg-secondary/60" />
            <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full border border-primary/25" />
            <div className="absolute -bottom-5 -right-5 h-32 w-32 rounded-full border border-primary/20" />
            <div className="group relative overflow-hidden rounded-[999px_999px_8px_8px] border border-border shadow-2xl ring-1 ring-primary/10">
              <img
                src={casal2.url}
                alt="Jorge e Heid em ensaio pré-casamento"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover grayscale-[15%] transition-all duration-[1200ms] ease-out group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <p className="absolute inset-x-0 bottom-6 text-center font-serif text-2xl font-light italic text-white/95">
                Jorge &amp; Heid
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-primary">
              A nossa história
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-foreground sm:text-5xl">
              De um simples encontro a uma vida inteira
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
              Começou sem aviso: uma conversa que se estendeu para além do
              tempo, risos que ficaram e a sensação rara de já se conhecerem há
              muito. Entre planos partilhados e dias comuns tornados especiais,
              Jorge e Heid perceberam que caminhavam na mesma direção.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Agora, rodeados de quem amam, escolhem dizer «sim» diante do mar.
              Este convite é o nosso pedido para que estejas connosco nesse dia.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Versículos */}
      <section className="relative overflow-hidden border-y border-border px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal className="text-center">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-primary">
              Palavra de Deus
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light text-foreground sm:text-5xl">
              Versículos sobre amor e casamento
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VERSES.map((v, i) => (
              <Reveal key={v.ref} delay={i * 120}>
                <figure className="h-full rounded-sm border border-border bg-card p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                  <blockquote className="font-serif text-lg font-light italic leading-relaxed text-card-foreground">
                    «{v.text}»
                  </blockquote>
                  <figcaption className="mt-5 text-[0.65rem] uppercase tracking-[0.3em] text-primary">
                    {v.ref}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Detalhes */}
      <section className="border-y border-border bg-secondary/30 px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-primary">
            O grande dia
          </p>
          <h2 className="mt-4 font-serif text-4xl font-light text-foreground sm:text-5xl">
            Detalhes da celebração
          </h2>
          <div className="mt-14 grid gap-10 sm:grid-cols-3">
            <DetailCard label="Data" value="08 · 08 · 2026" sub="Sábado" />
            <DetailCard label="Cerimónia" value="16:00" sub="Chegada às 15:30" />
            <DetailCard label="Local" value="South Beach" sub="Cerimónia & Recepção" />
          </div>
          <p className="mt-14 text-sm uppercase tracking-[0.25em] text-muted-foreground">
            Traje formal · Cores claras
          </p>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="mx-auto max-w-xl px-6 py-24">
        <div className="text-center">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-primary">
            Confirmação de presença
          </p>
          <h2 className="mt-4 font-serif text-4xl font-light text-foreground sm:text-5xl">
            RSVP
          </h2>
          <p className="mt-5 text-muted-foreground">
            Confirme até <strong className="text-foreground">01 de agosto de 2026</strong> por
            WhatsApp ou e-mail.
          </p>
        </div>

        <div className="mt-12 space-y-6 rounded-sm border border-border bg-card p-8 shadow-sm">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-card-foreground">
              Nome completo
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="O seu nome"
              className="mt-2 w-full rounded-sm border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <span className="block text-sm font-medium text-card-foreground">Vai comparecer?</span>
            <div className="mt-3 grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setAttending("sim")}
                className={`rounded-sm border px-4 py-3 text-sm font-medium transition-colors ${
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
                className={`rounded-sm border px-4 py-3 text-sm font-medium transition-colors ${
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
              <label htmlFor="guests" className="block text-sm font-medium text-card-foreground">
                Número de convidados (incluindo você)
              </label>
              <select
                id="guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="mt-2 w-full rounded-sm border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={sendWhatsapp}
              disabled={!ready}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Confirmar por WhatsApp
            </button>
            <button
              type="button"
              onClick={sendEmail}
              disabled={!ready}
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-input bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              Confirmar por e-mail
            </button>
          </div>

          <div className="space-y-1 text-center text-xs text-muted-foreground">
            <p>
              WhatsApp:{" "}
              <a className="text-foreground underline" href={`https://wa.me/${WHATSAPP}`}>
                86 669 4467
              </a>
            </p>
            <p>
              E-mail:{" "}
              <a className="text-foreground underline" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-12 text-center">
        {null}
        <p className="animate-heart-beat inline-block font-serif text-3xl font-light text-foreground">
          Jorge &amp; Heid
        </p>
        <p className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          08 · 08 · 2026 — South Beach
        </p>
        <p className="mt-6 text-xs text-muted-foreground">Contamos com a sua presença.</p>
      </footer>
    </div>
  );
}

function DetailCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div>
      <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-4 font-serif text-3xl font-light text-foreground">{value}</p>
      <p className="mt-2 text-sm text-muted-foreground">{sub}</p>
    </div>
  );
}
