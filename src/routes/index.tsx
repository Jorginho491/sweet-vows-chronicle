import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import casal1 from "../assets/casal-1.jpg.asset.json";
import casal2 from "../assets/casal-2.jpg.asset.json";
import casal3 from "../assets/casal-3.jpg.asset.json";
import casal4 from "../assets/casal-4.jpg.asset.json";

const WHATSAPP = "258866694467";
const EMAIL = "chambulejorge6@gmail.com";
const WEDDING_DATE = new Date("2026-09-12T10:00:00");
const GREETINGS_KEY = "kevin-shelsea-felicitacoes";

const GALLERY = [
  { url: casal3.url, alt: "Kevin ergue Shelsea num jardim, em ensaio pré-casamento" },
  { url: casal4.url, alt: "Kevin e Shelsea de mãos dadas entre a vegetação" },
  { url: casal2.url, alt: "Kevin e Shelsea em ensaio fotográfico" },
];

const PROGRAM = [
  {
    time: "10:00",
    title: "Cerimónia Religiosa",
    place: "Paróquia São Joaquim",
    detail: "Av. de Angola",
  },
  {
    time: "15:00",
    title: "Cerimónia Civil",
    place: "Salão Mandota Eventos",
    detail: "Nkobe",
  },
  {
    time: "15:30",
    title: "Sessão de Fotos & Welcome",
    place: "Local da recepção",
    detail: "Salão Mandota Eventos",
  },
  {
    time: "16:30",
    title: "Copo d'Água",
    place: "Recepção",
    detail: "Salão Mandota Eventos",
  },
];

const PLACES = [
  {
    name: "Paróquia São Joaquim",
    address: "Av. de Angola, Maputo",
    note: "Cerimónia Religiosa · 10:00",
    maps: "https://www.google.com/maps/search/?api=1&query=Par%C3%B3quia%20S%C3%A3o%20Joaquim%20Av.%20de%20Angola%20Maputo",
  },
  {
    name: "Salão Mandota Eventos",
    address: "Nkobe, Maputo",
    note: "Cerimónia Civil, Fotos & Copo d'Água · 15:00",
    maps: "https://www.google.com/maps/search/?api=1&query=Mandota%20Eventos%20Nkobe%20Maputo",
  },
];

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
    text: "Acima de tudo, porém, revistam-se do amor, que é o elo perfeito.",
    ref: "Colossenses 3:14",
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
          <div className="grid gap-8 md:grid-cols-3">
            {VERSES.map((v, i) => (
              <Reveal key={v.ref} delay={i * 150} className="h-full">
                <figure className="group relative flex h-full flex-col items-center px-6 py-10 text-center">
                  <span
                    aria-hidden
                    className="font-serif text-6xl leading-none text-primary/25 transition-colors duration-500 group-hover:text-primary/50"
                  >
                    &ldquo;
                  </span>
                  <blockquote className="mt-2 font-serif text-xl font-light italic leading-relaxed text-foreground/90">
                    {v.text}
                  </blockquote>
                  <span className="mt-7 h-px w-10 bg-primary/40 transition-all duration-500 group-hover:w-20" />
                  <figcaption className="mt-5 text-[0.6rem] uppercase tracking-[0.35em] text-primary">
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

      {/* Felicitações */}
      <section
        id="felicitacoes"
        className="border-t border-border bg-secondary/30 px-6 py-24"
      >
        <div className="mx-auto max-w-3xl">
          <Reveal className="text-center">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-primary">
              Mural de carinho
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light text-foreground sm:text-5xl">
              Felicitações aos noivos
            </h2>
            <p className="mt-5 text-muted-foreground">
              Deixe uma mensagem para Jorge &amp; Heid — ela será enviada para os
              noivos e ficará guardada aqui no mural.
            </p>
          </Reveal>

          <Reveal
            delay={120}
            className="mt-12 space-y-6 rounded-sm border border-border bg-card p-8 shadow-sm"
          >
            <div>
              <label htmlFor="gname" className="block text-sm font-medium text-card-foreground">
                O seu nome
              </label>
              <input
                id="gname"
                type="text"
                value={gName}
                onChange={(e) => setGName(e.target.value)}
                placeholder="Ex.: Maria Silva"
                className="mt-2 w-full rounded-sm border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label htmlFor="gmsg" className="block text-sm font-medium text-card-foreground">
                A sua mensagem
              </label>
              <textarea
                id="gmsg"
                rows={4}
                value={gMessage}
                onChange={(e) => setGMessage(e.target.value)}
                placeholder="Que Deus abençoe esta união…"
                className="mt-2 w-full resize-none rounded-sm border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button
              type="button"
              onClick={submitGreeting}
              disabled={!gName.trim() || !gMessage.trim()}
              className="w-full rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
              Enviar felicitações
            </button>
          </Reveal>

          {greetings.length > 0 && (
            <div className="mt-10 space-y-4">
              {greetings.map((g, i) => (
                <Reveal key={g.id} delay={i * 80}>
                  <article className="rounded-sm border border-border bg-card p-6 shadow-sm transition-transform duration-300 hover:-translate-y-0.5">
                    <p className="font-serif text-lg font-light italic text-card-foreground">
                      «{g.message}»
                    </p>
                    <p className="mt-3 text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
                      {g.name} · {g.date}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-border px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="animate-heart-beat inline-block font-serif text-3xl font-light text-foreground">
            Jorge &amp; Heid
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            08 · 08 · 2026 — South Beach
          </p>
          <p className="mt-6 text-xs text-muted-foreground">Contamos com a sua presença.</p>

          <div className="mx-auto mt-12 h-px w-24 bg-border" />

          <div className="mt-12 flex flex-col items-center gap-5">
            <p className="text-[0.6rem] uppercase tracking-[0.35em] text-muted-foreground">
              Desenvolvido por
            </p>
            <p className="font-serif text-xl font-light tracking-wide text-foreground">
              Studio Mula
              <span className="mx-3 text-primary/60">|</span>
              JC
            </p>

            <nav aria-label="Redes sociais do Studio Mula" className="mt-2 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  title={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                >
                  {s.icon}
                </a>
              ))}
            </nav>

            <p className="mt-4 text-[0.65rem] text-muted-foreground">
              © {new Date().getFullYear()} Studio Mula | JC — Convites digitais
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const SOCIALS = [
  {
    label: "WhatsApp",
    href: `https://wa.me/${WHATSAPP}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
        <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.1s-.8 1-.9 1.2c-.2.2-.3.2-.6.1s-1.3-.5-2.4-1.5c-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5s0-.4 0-.6c-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.1 1.3 3.3c.2.2 2.3 3.5 5.5 4.8.8.3 1.4.5 1.8.7.8.2 1.5.2 2 .1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4z" />
        <path d="M12 2A10 10 0 0 0 3.5 17.2L2 22l4.9-1.5A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-2.9.9.9-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
        <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.2-1.5 1.5-1.5h1.7V4a22 22 0 0 0-2.4-.1c-2.4 0-4 1.5-4 4.1V10H7.5v3h2.8v8z" />
      </svg>
    ),
  },
  {
    label: "E-mail",
    href: `mailto:${EMAIL}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4" aria-hidden>
        <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
        <path d="m3.5 7 8.5 6 8.5-6" />
      </svg>
    ),
  },
];

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
