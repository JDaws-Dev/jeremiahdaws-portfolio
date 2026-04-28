const PROOF = [
  { v: "6 yrs", l: "Disney Parks & DCPI" },
  { v: "Silver", l: "SkillsUSA Nationals · CNC" },
  { v: "12+", l: "Courses built from zero" },
  { v: "10+", l: "Production apps shipped" },
  { v: "150+", l: "Tools in JARVIS, my AI OS" },
  { v: "60+", l: "Maker videos on YouTube" },
];

const STACK = {
  Film: ["Premiere Pro", "Avid", "After Effects", "Multi-cam", "Directing", "Producing"],
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
  Code: ["Next.js", "TypeScript", "Convex", "Stripe", "Vapi", "MCP", "Vercel"],
  Teach: ["Curriculum design", "Project-based learning", "Capstone mentoring"],
};

export function About() {
  return (
    <section
      id="about"
      className="border-y border-paper-muted bg-paper-muted/40 py-20 dark:border-paper/10 dark:bg-ink/30"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-accent">About</p>
            <h2 className="mt-2 font-serif text-4xl leading-[1.02] tracking-[-0.02em] md:text-[3.25rem]">
              Jack of all trades.{" "}
              <span className="text-accent">Master of more than one.</span>
            </h2>
            <div className="mt-6 max-w-prose space-y-5 text-lg leading-relaxed">
              <p>
                Generalists ship faster than specialists. Not because we cut corners
                — because nothing gets translated between people. I direct the
                story, edit the cut, design the prop in Fusion, machine it on the
                Tormach, light and shoot the demo, write the AI agent that
                automates the workflow, and teach the curriculum that walks kids
                through the same loop. One head. One calendar. Zero hand-off
                latency.
              </p>
              <p>
                Six years producing branded video at Disney Parks. Editor on
                National Geographic and Hallmark. SkillsUSA National Silver in
                CNC turning. Tormach brand ambassador. Department Head at a
                Christian classical school where I built two programs from zero.
                Founder of AnswerAxis (AI consulting, paying clients). Sixty-plus
                maker videos on YouTube. Ten production apps shipped. None of
                those credentials live alone — every one feeds the next.
              </p>
              <p>
                When Artios needed Lumière&rsquo;s articulated candle hands for
                Beauty and the Beast: I 3D-scanned a model, designed it in Fusion,
                printed and painted the parts, wired the LEDs and switches, fit
                them to a kid&rsquo;s hands, and shot the rehearsal. A five-person
                crew needs hand-offs and two weeks. I needed four days. The same
                pattern repeats — Inception spinning top, Hollywood-set steadi-cam
                dolly, the Tormach Garage Series I host. Make the thing. Film the
                thing. Teach the thing.
              </p>
              <p>
                Faith and family drive it. My kids attend Artios — I built the
                Film and Creative Tech programs there because I wanted them
                taught the craft the way professionals actually do it, not a
                watered-down hobby version. SafeFamily and IllPrayForYou come
                from the same instinct: real tools for Christian families that
                don&rsquo;t sacrifice quality for safety. Hire me for the project
                nobody else can scope.
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
              <p className="text-xs uppercase tracking-[0.22em] text-ink-muted">Tools I use</p>
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
