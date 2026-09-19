const PROOF = [
  { v: "FORM", l: "Producer / Director" },
  { v: "6 yrs", l: "Disney Parks & DCPI" },
  { v: "Silver", l: "SkillsUSA Nationals · CNC" },
  { v: "10+", l: "Production apps shipped" },
  { v: "150+", l: "Tools in JARVIS, my AI OS" },
  { v: "60+", l: "Maker videos on YouTube" },
];

const STACK = {
  Film: ["DaVinci Resolve", "Premiere Pro", "Avid", "After Effects", "Multi-cam", "Directing", "Producing"],
  Shop: [
    "Fusion 360",
    "CNC mill & lathe",
    "Manual machining",
    "MIG / TIG",
    "Vacuum forming",
    "Woodworking",
    "Injection molding",
    "Bambu Studio",
  ],
  Tech: ["Arduino · ESP32", "Servos · NeoPixels", "Sensors · OLED", "Soldering", "3D printing"],
  Code: ["Claude Code", "Next.js", "TypeScript", "Convex", "Stripe", "MCP", "Vercel"],
};

export function About() {
  return (
    <section
      id="about"
      className="border-y border-paper-muted bg-blue-wash py-20 dark:border-paper/10 dark:bg-ink/30"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-blue">About</p>
            <h2 className="mt-2 font-serif text-4xl leading-[1.02] tracking-[-0.02em] md:text-[3.25rem]">
              Jack of all trades.{" "}
              <span className="text-accent">Master of more than one.</span>
            </h2>
            <div className="mt-6 max-w-prose space-y-5 text-lg leading-relaxed">
              <p>
                Generalists ship faster than specialists. Not because we cut corners
                — because nothing gets translated between people. I direct the
                story, edit the cut, design the prop in Fusion, machine it, light
                and shoot the demo, and write the AI agent that
                automates the workflow. One head. One calendar. Zero hand-off
                latency.
              </p>
              <p>
                Producer / Director at FORM, where I direct{" "}
                <em>Calendar Jockeys</em>{" "}
                and built the studio&rsquo;s website and an internal AI assistant
                for the team.
                Six years producing branded video at Disney Parks before that.
                Editor on National Geographic and Hallmark. SkillsUSA National
                Silver in CNC turning. Former Tormach brand ambassador. AI consultant
                on the side. Sixty-plus
                maker videos on YouTube. Ten production apps shipped. None of
                those credentials live alone — every one feeds the next.
              </p>
              <p>
                When a school production of Beauty and the Beast needed
                Lumière&rsquo;s articulated candle hands: I 3D-scanned a model, designed it in Fusion,
                printed and painted the parts, wired the LEDs and switches, fit
                them to a kid&rsquo;s hands, and shot the rehearsal. A five-person
                crew needs hand-offs and two weeks. I needed four days. The same
                pattern repeats — Inception spinning top, Hollywood-set Steadicam
                dolly, the Tormach Garage Series I hosted. Make the thing. Film the
                thing.
              </p>
              <p>
                Faith and family drive it. SafeFamily and IllPrayForYou come
                from the same instinct: real tools for Christian families that
                don&rsquo;t sacrifice quality for safety.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <ul className="grid grid-cols-2 gap-3">
              {PROOF.map((p) => (
                <li
                  key={p.l}
                  className="rounded-2xl border border-ink/10 bg-paper p-4 dark:border-paper/15 dark:bg-ink/40"
                >
                  <div className="font-serif text-2xl tracking-tight text-accent">{p.v}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-ink-muted dark:text-paper-muted">
                    {p.l}
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.22em] text-blue">Tools I use</p>
              <ul className="space-y-2 text-sm">
                {Object.entries(STACK).map(([group, items]) => (
                  <li key={group} className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="min-w-[3rem] font-serif text-xs uppercase tracking-[0.16em] text-accent">
                      {group}
                    </span>
                    <span className="text-ink-muted dark:text-paper-muted">
                      {items.join(" · ")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
