import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import capa from "../assets/capa-adelina-henrique.jpg.asset.json";
import casal1 from "../assets/casal-1.jpg.asset.json";
import casal2 from "../assets/casal-2.jpg.asset.json";
import casal3 from "../assets/casal-3.jpg.asset.json";
import casal4 from "../assets/casal-4.jpg.asset.json";

const WHATSAPP = "258849889889";
const WEDDING_DATE = new Date("2026-12-05T09:00:00");
const MUSIC_DELAY_MS = 20000;
const GREETINGS_KEY = "adelina-henrique-felicitacoes";

// Fotos provisórias do ensaio — serão substituídas pelas fotos oficiais do casal.
const GALLERY = [
  { url: capa.url, alt: "Adelina e Henrique no ensaio pré-casamento" },
  { url: casal3.url, alt: "Momento especial do casal (foto provisória)" },
  { url: casal4.url, alt: "Casal entre a vegetação (foto provisória)" },
];

const PROGRAM = [
  {
    time: "09:00",
    title: "Cerimónia Religiosa",
    place: "Igreja Sé Catedral",
    detail: "Maputo",
  },
  {
    time: "—",
    title: "Cerimónia Civil",
    place: "Sé Catedral",
    detail: "Após a cerimónia religiosa",
  },
  {
    time: "12:00",
    title: "Welcome Drink",
    place: "Salão Villa Luísa",
    detail: "Recepção dos convidados",
  },
  {
    time: "12:00",
    title: "Sessão de Fotos",
    place: "Salão Villa Luísa",
    detail: "Registos do grande dia",
  },
  {
    time: "13:00",
    title: "Copo d'Água",
    place: "Salão Villa Luísa",
    detail: "Recepção",
  },
  {
    time: "17:00",
    title: "Abertura do Salão",
    place: "Salão Villa Luísa",
    detail: "Festa com os convidados",
  },
  {
    time: "20:00",
    title: "Lançamento do Buquê",
    place: "Salão Villa Luísa",
    detail: "Momento especial",
  },
  {
    time: "22:00",
    title: "Fim",
    place: "Salão Villa Luísa",
    detail: "Encerramento",
  },
];

const PLACES = [
  {
    name: "Igreja Sé Catedral",
    address: "Praça da Independência, Maputo",
    note: "Cerimónia Religiosa & Civil · 09:00",
    maps: "https://www.google.com/maps/search/?api=1&query=S%C3%A9%20Catedral%20de%20Maputo",
  },
  {
    name: "Salão Villa Luísa",
    address: "Maputo",
    note: "Welcome drink, fotos, copo d'água & festa",
    maps: "https://www.google.com/maps/search/?api=1&query=Villa%20Lu%C3%ADsa%20Maputo",
  },
];

const VERSES = [
  {
    text: "«Por esta razão, o homem deixará pai e mãe e se unirá à sua mulher, e os dois se tornarão uma só carne.»",
    ref: "Mateus 19:5",
  },
  {
    text: "«…eis que o Senhor está entre mim e ti, eternamente.»",
    ref: "1 Samuel 20:23",
  },
  {
    text: "«Para onde tu fores, eu irei; onde tu repousares, eu repousarei. O teu povo será o meu povo, e o teu Deus será o meu Deus.»",
    ref: "Rute 1:16-17",
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

function IntroOverlay({
  opened,
  onOpen,
}: {
  opened: boolean;
  onOpen: () => void;
}) {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black transition-opacity duration-700 ease-out ${opened ? "pointer-events-none opacity-0" : "opacity-100"}`}
      aria-hidden={opened}
    >
      <img
        src={capa.url}
        alt=""
        className="animate-soft-zoom absolute inset-0 -z-10 h-full w-full object-cover object-[50%_30%]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/35 to-black/80" />
      <div className="px-6 text-center text-white">
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.45em] text-white/70">
          Adelina &amp; Henrique
        </p>
        <h1 className="mt-6 font-serif text-6xl font-light leading-none tracking-tight text-white sm:text-8xl md:text-9xl">
          Adelina
          <span className="mx-3 align-middle font-serif text-4xl italic text-white/70 sm:text-6xl">
            &amp;
          </span>
          Henrique
        </h1>
        <p className="mt-5 text-lg font-light uppercase tracking-[0.3em] text-white/90 sm:text-xl">
          05 · 12 · 2026
        </p>
        <button
          type="button"
          onClick={onOpen}
          className="animate-heart-beat mt-14 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-black transition-all duration-300 hover:scale-105"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
          Abrir convite
        </button>
        <p className="mt-4 text-[0.6rem] uppercase tracking-[0.2em] text-white/60">
          Toque para abrir · a música começa em instantes
        </p>
      </div>
    </div>
  );
}

function MusicButton({
  iframeRef,
  isPlaying,
  onToggle,
}: {
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  isPlaying: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isPlaying ? "Pausar música" : "Tocar música"}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-black/65 px-3.5 py-2.5 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-black/85"
    >
      {isPlaying ? (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
      <span>{isPlaying ? "Pausar" : "Tocar"}</span>
    </button>
  );
}

export const Route = createFileRoute("/adelina-henrique")({
  head: () => ({
    meta: [
      { title: "Adelina & Henrique — Casamento 05.12.2026" },
      {
        name: "description",
        content:
          "Convite para o casamento de Adelina Zacarias Machai e Henrique Gilberto Langa, dia 05 de dezembro de 2026, em Maputo. Programa do dia e confirmação de presença.",
      },
      { property: "og:title", content: "Adelina & Henrique — Casamento 05.12.2026" },
      {
        property: "og:description",
        content:
          "Convite para o casamento de Adelina & Henrique, dia 05 de dezembro de 2026, em Maputo. Confirme a sua presença.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/adelina-henrique" }],
  }),
  component: AdelinaHenrique,
});

function AdelinaHenrique() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [attending, setAttending] = useState<"sim" | "nao" | null>(null);
  const [opened, setOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const autoStartRef = useRef<number | null>(null);
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

  // A música começa cerca de 20 segundos depois de abrir o convite.
  useEffect(() => {
    if (!opened) return;
    autoStartRef.current = window.setTimeout(() => {
      autoStartRef.current = null;
      const iframe = iframeRef.current;
      if (!iframe?.contentWindow) return;
      iframe.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "playVideo", args: "" }),
        "*",
      );
      setIsPlaying(true);
    }, MUSIC_DELAY_MS);
    return () => {
      if (autoStartRef.current !== null) {
        clearTimeout(autoStartRef.current);
        autoStartRef.current = null;
      }
    };
  }, [opened]);

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
        `Felicitações aos noivos Adelina & Henrique\n\nDe: ${entry.name}\n"${entry.message}"`,
      )}`,
      "_blank",
    );
    setGName("");
    setGMessage("");
  };

  const message =
    `Confirmação de presença — Casamento Adelina & Henrique\n\n` +
    `Nome: ${name.trim() || "—"}\n` +
    `Presença: ${attending === "sim" ? "Sim, estarei lá" : attending === "nao" ? "Infelizmente não poderei ir" : "—"}\n` +
    (attending === "sim" ? `Nº de convidados: ${guests}\n` : "");

  const ready = Boolean(attending && name.trim());

  const sendWhatsapp = () => {
    if (!ready) return;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const toggleMusic = () => {
    if (autoStartRef.current !== null) {
      clearTimeout(autoStartRef.current);
      autoStartRef.current = null;
    }
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;
    const command = isPlaying ? "pauseVideo" : "playVideo";
    iframe.contentWindow.postMessage(
      JSON.stringify({ event: "command", func: command, args: "" }),
      "*",
    );
    setIsPlaying((p) => !p);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <IntroOverlay opened={opened} onOpen={() => setOpened(true)} />
      {opened && (
        <iframe
          ref={iframeRef}
          width="0"
          height="0"
          src="https://www.youtube.com/embed/aMoDRNT6fpc?mute=0&playsinline=1&rel=0&loop=1&playlist=aMoDRNT6fpc&enablejsapi=1"
          title="Meu Amor — Lokua Kanza"
          allow="autoplay; encrypted-media; picture-in-picture; web-share"
          className="pointer-events-none fixed bottom-0 right-0 -z-50 opacity-0"
          loading="eager"
        />
      )}
      <MusicButton
        iframeRef={iframeRef}
        isPlaying={isPlaying}
        onToggle={toggleMusic}
      />

      {/* Hero */}
      <header className="relative isolate min-h-[92vh] w-full overflow-hidden">
        <img
          src={capa.url}
          alt="Adelina Zacarias Machai e Henrique Gilberto Langa, os noivos, no ensaio pré-casamento"
          className="animate-soft-zoom absolute inset-0 -z-20 h-full w-full object-cover object-[50%_30%]"
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
              Adelina
              <span className="mx-3 align-middle font-serif text-4xl italic text-white/70 sm:text-6xl">
                &amp;
              </span>
              Henrique
            </h1>
            <p className="mt-5 text-[0.65rem] uppercase tracking-[0.4em] text-white/60">
              Adelina Zacarias Machai &nbsp;·&nbsp; Henrique Gilberto Langa
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-10 h-px w-24 bg-white/40" />
            <p className="mt-8 text-lg font-light uppercase tracking-[0.3em] text-white/90 sm:text-xl">
              05 · 12 · 2026
            </p>
            <p className="mt-3 text-sm uppercase tracking-[0.3em] text-white/70">
              Maputo · Moçambique
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

      {/* Mensagem aos convidados */}
      <section className="mx-auto max-w-3xl px-6 py-24">
        <Reveal className="text-center">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-primary">
            Mensagem aos convidados
          </p>
          <h2 className="mt-4 font-serif text-4xl font-light text-foreground sm:text-5xl">
            A contagem começou
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <div className="mt-10 rounded-sm border border-border bg-card p-8 text-center shadow-sm sm:p-12">
            <p className="font-serif text-lg font-light italic leading-relaxed text-foreground/90 sm:text-xl">
              «Queridos amigos e familiares, a contagem regressiva começou! Se
              você está a receber esta mensagem, significa que é muito
              importante para nós e que não podemos viver este dia sem a sua
              presença. Escolhemos o dia 05 de dezembro de 2026, um sábado,
              para celebrar o nosso amor. Reserve esta data na sua agenda, pois
              nesse dia você tem um compromisso muito especial: comemorar
              connosco!»
            </p>
            <p className="mt-8 text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Com carinho,
            </p>
            <p className="mt-3 font-serif text-2xl font-light text-foreground">
              Adelina &amp; Henrique
            </p>
          </div>
        </Reveal>
      </section>

      {/* História */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal className="relative mx-auto w-full max-w-md">
            <StoryGallery />
          </Reveal>
          <Reveal delay={150}>
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-primary">
              A nossa história
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-foreground sm:text-5xl">
              Deus uniu os nossos caminhos
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
              Deus uniu os nossos caminhos e, sobre a Sua bênção, uniremos as
              nossas vidas para sempre. O amor uniu-nos e, diante de Deus e das
              nossas famílias, diremos «sim».
            </p>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Agora, rodeados de quem amam, escolhem dizer «sim» diante de Deus
              e da família. Este convite é o nosso pedido para que estejas
              connosco neste dia.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Os noivos */}
      <section className="border-y border-border bg-secondary/30 px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-primary">
              Os noivos
            </p>
            <div className="mt-10 grid gap-10 sm:grid-cols-2">
              <div className="rounded-sm border border-border bg-card p-8 shadow-sm">
                <p className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
                  Noiva
                </p>
                <h3 className="mt-3 font-serif text-2xl font-light text-foreground">
                  Adelina Zacarias Machai
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Filha de Zacarias Temoteo Machai e Hermínia Julieta
                  Francisco Tamele
                </p>
              </div>
              <div className="rounded-sm border border-border bg-card p-8 shadow-sm">
                <p className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
                  Noivo
                </p>
                <h3 className="mt-3 font-serif text-2xl font-light text-foreground">
                  Henrique Gilberto Langa
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Filho de Gilberto José Guilherme Henrique Langa e Victória
                  Alson Chembene
                </p>
              </div>
            </div>
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

      {/* Programa do dia */}
      <section className="border-y border-border bg-secondary/30 px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-primary">
            O grande dia
          </p>
          <h2 className="mt-4 font-serif text-4xl font-light text-foreground sm:text-5xl">
            Programa do dia
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <DetailCard label="Data" value="05 · 12 · 2026" sub="Sábado" />
            <DetailCard label="Início" value="09:00" sub="Cerimónia Religiosa" />
            <DetailCard label="Cidade" value="Maputo" sub="Moçambique" />
          </div>

          <div className="relative mx-auto mt-16 max-w-2xl text-left">
            <div className="absolute left-[4.5rem] top-2 bottom-2 hidden w-px bg-border sm:block" />
            <ol className="space-y-4">
              {PROGRAM.map((item, i) => (
                <Reveal key={item.time + item.title} delay={i * 120}>
                  <li className="group relative flex gap-5 rounded-sm border border-border bg-card p-6 shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lg sm:gap-8">
                    <div className="flex w-14 shrink-0 flex-col items-center sm:w-16">
                      <span className="font-serif text-2xl font-light tabular-nums text-foreground">
                        {item.time}
                      </span>
                      <span className="mt-3 h-2 w-2 rounded-full bg-primary/40 transition-colors duration-500 group-hover:bg-primary" />
                    </div>
                    <div className="border-l border-border pl-5 sm:pl-8">
                      <h3 className="font-serif text-xl font-light text-card-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">{item.place}</p>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/80">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          <p className="mt-16 text-sm uppercase tracking-[0.25em] text-muted-foreground">
            Traje formal · Cores claras
          </p>
        </div>
      </section>

      {/* Direções */}
      <section id="direcoes" className="mx-auto max-w-5xl px-6 py-24">
        <Reveal className="text-center">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-primary">
            Como chegar
          </p>
          <h2 className="mt-4 font-serif text-4xl font-light text-foreground sm:text-5xl">
            Direções dos locais
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {PLACES.map((p, i) => (
            <Reveal key={p.name} delay={i * 150}>
              <article className="group flex h-full flex-col rounded-sm border border-border bg-card p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden>
                    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <h3 className="mt-6 font-serif text-2xl font-light text-card-foreground">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.address}</p>
                <p className="mt-1 text-[0.65rem] uppercase tracking-[0.25em] text-primary">
                  {p.note}
                </p>
                <a
                  href={p.maps}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-input px-6 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                >
                  Ver direções
                  <span aria-hidden>→</span>
                </a>
              </article>
            </Reveal>
          ))}
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
            Confirme a sua presença por{" "}
            <strong className="text-foreground">WhatsApp</strong>.
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

          <button
            type="button"
            onClick={sendWhatsapp}
            disabled={!ready}
            className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Confirmar por WhatsApp
          </button>

          <p className="text-center text-xs text-muted-foreground">
            WhatsApp:{" "}
            <a className="text-foreground underline" href={`https://wa.me/${WHATSAPP}`}>
              84 988 9889
            </a>
          </p>
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
              Deixe uma mensagem para Adelina &amp; Henrique — ela será enviada
              para os noivos e ficará guardada aqui no mural.
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
            Adelina &amp; Henrique
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            05 · 12 · 2026 — Maputo
          </p>
          <p className="mt-6 text-xs text-muted-foreground">Contamos com a sua presença.</p>

          <div className="mx-auto mt-12 h-px w-24 bg-border" />

          <div className="mt-12 flex flex-col items-center gap-5">
            <p className="text-[0.6rem] uppercase tracking-[0.35em] text-muted-foreground">
              Desenvolvido por
            </p>
            <p className="font-serif text-xl font-light tracking-wide text-foreground">
              Mula Studio
              <span className="mx-3 text-primary/60">|</span>
              JC
            </p>

            <nav aria-label="Redes sociais do Mula Studio" className="mt-2 flex items-center gap-3">
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
              © {new Date().getFullYear()} Mula Studio | JC — Convites digitais
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

function StoryGallery() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % GALLERY.length), 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[999px_999px_16px_16px] bg-secondary/60" />
      <div className="animate-float-slow absolute -left-5 -top-5 h-24 w-24 rounded-full border border-primary/25" />
      <div className="absolute -bottom-5 -right-5 h-32 w-32 rounded-full border border-primary/20" />

      <div className="group relative aspect-[4/5] overflow-hidden rounded-[999px_999px_8px_8px] border border-border shadow-2xl ring-1 ring-primary/10">
        {GALLERY.map((img, i) => (
          <img
            key={img.url}
            src={img.url}
            alt={img.alt}
            loading={i === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover object-[50%_30%] transition-all duration-[1600ms] ease-out ${
              i === active
                ? "scale-100 opacity-100 grayscale-0"
                : "scale-110 opacity-0 grayscale"
            }`}
          />
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <p className="absolute inset-x-0 bottom-10 text-center font-serif text-2xl font-light italic text-white/95">
          Adelina &amp; Henrique
        </p>
        <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-2">
          {GALLERY.map((img, i) => (
            <button
              key={img.url}
              type="button"
              aria-label={`Ver foto ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === active ? "w-7 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
