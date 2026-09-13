import Image from "next/image";
import Reveal from "./components/Reveal";

const skillsNetworking = [
  "Enterprise routing & switching",
  "Check Point administration",
  "Palo Alto administration",
  "VPN, Zscaler & secure access",
  "Rule base review (Skybox)",
];

const skillsInfra = [
  "Data centre operations",
  "IT service management",
  "BCMS, DR & ISO audits",
  "Windows",
  "Digital workplace",
  "Azure Cloud & DevOps Engineering",
  "Forward Deployed Engineering (FDE)",
  "AI-assisted reporting & documentation",
];

const nav = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certifications" },
  { href: "#education", label: "Education" },
  { href: "#foundation", label: "Foundation" },
  { href: "#contact", label: "Contact" },
];

const experience = [
  {
    period: "2024 — Present",
    org: "Infosys",
    place: "Netherlands / BENELUX",
    title: "IT Service, Support & Operations Manager | Azure Cloud & DevOps Engineer (FDE)",
    subtitle: "Hands-on infrastructure, cloud & operations lead",
    points: [
      "Own network, security and digital workplace operations across BENELUX sites — and stay hands-on in all three.",
      "Run data centre and server room infrastructure: racks, power, cooling, cabling, capacity planning and hardware lifecycle.",
      "Keep access, environmental and asset records audit-ready year round, so audits are a review rather than a scramble.",
      "Lead major incidents, vulnerability remediation, BCMS exercises and DR validation to closure.",
      "Extend operations into Azure as a Forward Deployed Engineer (FDE) — designing cloud network patterns and building CI/CD pipelines directly within client environments.",
      "Use generative AI to turn technical detail into documentation and management reporting at speed.",
    ],
    tags: ["Data centre ops", "Azure Cloud & DevOps", "Major incident", "BCMS & DR", "ISO audits"],
  },
  {
    period: "2021 — 2024",
    org: "Infosys",
    place: "India & global operations",
    title: "Service Owner / Firewall Administrator",
    subtitle: "Client connectivity, from RFP response to 24×7 run",
    points: [
      "Owned client connectivity services end to end — RFP response, design, build, go-live and steady-state operations.",
      "Designed secure connectivity solutions that won work with prospective and newly onboarded enterprise clients.",
      "Drove implementation, link testing, validation and cutover for client onboarding without service impact.",
      "Administered Check Point and Palo Alto estates: upgrades, migrations and hardening.",
      "Reviewed rule bases with Skybox and validated HA failover before every cutover.",
    ],
    tags: ["Check Point", "Palo Alto", "RFP & onboarding", "Skybox"],
  },
  {
    period: "2009 — 2021",
    org: "Infosys",
    place: "India",
    title: "Network Administrator",
    subtitle: "Data centre & infrastructure",
    points: [
      "Ran data centre and network operations across Cisco Catalyst, Nexus and firewall platforms.",
      "Planned racks and did the rack-and-stack, structured cabling and patch panel work myself.",
      "Handled capacity, inventory and lifecycle upgrades — including a full data centre migration.",
      "Worked to DC standards for access control, labelling and change records.",
      "Supported Windows servers, telecom links and end-user services alongside the network estate.",
    ],
    tags: ["Cisco Catalyst / Nexus", "DC migration", "Structured cabling"],
  },
];

const achievements = [
  "Handled client RFPs end to end — secure connectivity design through to go-live.",
  "Established connectivity for multiple newly onboarded enterprise clients.",
  "Led firewall upgrades and migrations with HA validation and clean cutovers.",
  "Sustained high availability across multi-location enterprise networks.",
  "Delivered multi-site office rollouts from cabling readiness to handover.",
  "Supported ISO 27001, 27701, 20000, 22301 and 42001 audits with minimal findings.",
  "Delivered numerous client connectivity engagements, consistently upholding the highest security standards.",
  "Supported full lifecycle delivery — from RFP through to production go-live.",
];

const certified = [
  { kicker: "Cisco", title: "Routing & Switching" },
  { kicker: "Check Point", title: "Security Administrator" },
  { kicker: "Microsoft · AZ-900", title: "Azure Fundamentals" },
];

const inProgress = [
  {
    kicker: "Microsoft · AZ-500",
    title: "Azure Security Engineer Associate",
    body: "Identity, platform protection, security operations and data security in Azure.",
  },
  {
    kicker: "Microsoft · AZ-700",
    title: "Azure Network Engineer Associate",
    body: "Hybrid connectivity, routing, private access and network security design.",
  },
  {
    kicker: "Microsoft · AZ-305",
    title: "Azure Solutions Architect Expert",
    body: "Designing infrastructure, governance and business-continuity solutions.",
  },
];

const isoStandards = [
  { code: "27001", label: "Information security management" },
  { code: "27701", label: "Privacy information management" },
  { code: "20000", label: "IT service management" },
  { code: "22301", label: "Business continuity" },
  { code: "42001", label: "AI management systems" },
];

const metrics = [
  { value: "99.9", suffix: "%", label: "Sustained availability, multi-location networks" },
  { value: "5", suffix: "", label: "ISO standards supported with minimal findings" },
  { value: "3", suffix: "", label: "Azure certifications currently in progress" },
];

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(120% 70% at 8% -10%, #232748 0%, rgba(35,39,72,0) 58%), var(--color-bg)",
      }}
    >
      <header
        className="sticky top-0 z-20 backdrop-blur-md"
        style={{
          background: "color-mix(in srgb, var(--color-bg) 84%, transparent)",
          borderBottom: "1px solid var(--color-divider)",
        }}
      >
        <div className="max-w-[1100px] mx-auto px-7 py-3.5 flex items-center gap-5 flex-wrap">
          <a
            href="#top"
            className="flex items-center gap-3 font-medium tracking-tight"
            style={{ color: "var(--color-text)" }}
          >
            <span
              className="relative w-[30px] h-[30px] rounded-full overflow-hidden block"
              style={{ boxShadow: "0 0 0 1px var(--color-accent-700)" }}
            >
              <Image
                src="/assets/rajendra.png"
                alt="Rajendra Chevuru"
                fill
                sizes="30px"
                style={{ objectFit: "cover", objectPosition: "50% 12%" }}
              />
            </span>
            Rajendra Chevuru
          </a>
          <nav
            className="ml-auto flex gap-5 flex-wrap text-[13.5px]"
            style={{ color: "var(--color-neutral-400)" }}
          >
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-[var(--color-accent-300)]" style={{ color: "inherit" }}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="top" className="max-w-[1100px] mx-auto px-7 pb-24">
        <section
          data-stack
          className="grid items-center gap-14"
          style={{
            padding: "78px 0 54px",
            gridTemplateColumns: "minmax(0,1.45fr) minmax(0,1fr)",
          }}
        >
          <div>
            <div
              className="fade-in-up inline-flex items-center gap-2 rounded-full mb-6 text-[12.5px] tracking-wider uppercase whitespace-nowrap"
              style={{
                padding: "6px 13px",
                border: "1px solid var(--color-accent-700)",
                background: "color-mix(in srgb, var(--color-accent) 9%, transparent)",
                color: "var(--color-accent-200)",
              }}
            >
              <span
                className="w-[7px] h-[7px] rounded-full"
                style={{
                  background: "var(--color-accent-400)",
                  animation: "pulseDot 2.4s ease-in-out infinite",
                }}
              />
              Immediate joiner · Netherlands &amp; Europe
            </div>
            <h1
              className="fade-in-up font-medium m-0 mb-5"
              style={{
                fontSize: "clamp(38px,5.4vw,62px)",
                lineHeight: 1.03,
                letterSpacing: "-0.035em",
                animationDelay: "80ms",
              }}
            >
              Networks that stay up.
              <br />
              <span style={{ color: "var(--color-accent-300)" }}>
                Data centres that pass audit.
              </span>
            </h1>
            <p
              className="fade-in-up text-[17.5px] max-w-[56ch] mb-3.5"
              style={{ lineHeight: 1.62, color: "var(--color-neutral-300)", animationDelay: "160ms" }}
            >
              I&apos;m Rajendra — a senior network, network security and
              infrastructure specialist with hands-on ownership across
              enterprise networks, Check Point and Palo Alto estates, data
              centre operations and 24×7 IT service delivery.
            </p>
            <p
              className="fade-in-up text-[17.5px] max-w-[56ch] mb-7"
              style={{ lineHeight: 1.62, color: "var(--color-neutral-400)", animationDelay: "220ms" }}
            >
              I take services from an RFP answer to a clean go-live, then keep
              them running — incidents, change, DR drills and ISO evidence
              included.
            </p>
            <div className="fade-in-up flex gap-3 flex-wrap" style={{ animationDelay: "280ms" }}>
              <a className="btn btn-primary" href="#contact">
                Get in touch
              </a>
              <a
                className="btn btn-ghost"
                href="https://www.linkedin.com/in/rajendra-chevuru-0981411bb/"
                target="_blank"
                rel="noopener"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div className="fade-in-up relative justify-self-end w-full max-w-[340px]" style={{ animationDelay: "120ms" }}>
            <div
              className="absolute rounded-[var(--radius-lg)]"
              style={{
                inset: "-16% -8% -10% -12%",
                background:
                  "radial-gradient(60% 55% at 50% 38%, color-mix(in srgb, var(--color-accent) 30%, transparent) 0%, rgba(0,0,0,0) 72%)",
                filter: "blur(14px)",
              }}
            />
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-md)",
                background: "var(--color-neutral-900)",
                aspectRatio: "4/5",
              }}
            >
              <Image
                src="/assets/rajendra.png"
                alt="Portrait of Rajendra Chevuru"
                fill
                priority
                sizes="340px"
                style={{
                  objectFit: "cover",
                  objectPosition: "50% 12%",
                  filter: "saturate(.94) contrast(1.02)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, color-mix(in srgb, var(--color-bg) 72%, transparent) 0%, rgba(0,0,0,0) 48%)",
                }}
              />
              <div
                className="absolute left-[18px] right-[18px] bottom-4 text-[12.5px] tracking-wider uppercase"
                style={{ color: "var(--color-neutral-300)" }}
              >
                Senior Network &amp; Infrastructure Specialist
              </div>
            </div>
          </div>
        </section>

        <Reveal>
          <section
            className="grid gap-7"
            style={{
              marginBottom: "96px",
              borderRadius: "var(--radius-lg)",
              background:
                "linear-gradient(135deg, var(--color-section) 0%, #1d2049 62%, var(--color-section-glow) 130%)",
              boxShadow: "var(--shadow-md)",
              padding: "38px 34px",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
            }}
          >
            {metrics.map((m) => (
              <div key={m.label}>
                <div
                  className="font-medium"
                  style={{ fontSize: "40px", letterSpacing: "-0.03em", lineHeight: 1, color: "#fff" }}
                >
                  {m.value}
                  <span style={{ fontSize: "22px", color: "var(--color-accent-300)" }}>
                    {m.suffix}
                  </span>
                </div>
                <div
                  className="mt-2 text-[13.5px]"
                  style={{ lineHeight: 1.5, color: "var(--color-accent-200)" }}
                >
                  {m.label}
                </div>
              </div>
            ))}
          </section>
        </Reveal>

        <section id="about" style={{ scrollMarginTop: "90px", marginBottom: "96px" }}>
          <Reveal>
            <div className="section-label">
              <span>About</span>
              <span />
            </div>
            <div data-stack className="grid gap-12 items-start" style={{ gridTemplateColumns: "minmax(0,1.1fr) minmax(0,1fr)" }}>
              <div>
                <h2
                  className="font-medium m-0 mb-5"
                  style={{ fontSize: "clamp(26px,3vw,34px)", letterSpacing: "-0.025em", lineHeight: 1.16 }}
                >
                  Hands-on where it counts, calm when it breaks.
                </h2>
                <p className="text-base mb-4" style={{ lineHeight: 1.68, color: "var(--color-neutral-300)" }}>
                  I&apos;ve built my career on the infrastructure side of
                  enterprise IT: designing and defending connectivity, running
                  racks and server rooms, and owning services end to end
                  rather than handing them over. That means I can sit in an
                  RFP workshop in the morning, validate an HA failover in the
                  afternoon, and chair a major incident bridge at midnight.
                </p>
                <p className="text-base mb-4" style={{ lineHeight: 1.68, color: "var(--color-neutral-300)" }}>
                  Most of my work sits where networking, security and
                  governance meet — firewall migrations with clean cutovers,
                  vulnerability remediation that actually closes, BCMS and DR
                  validation that holds up under audit. I document as I go,
                  and I&apos;ve folded generative AI into my reporting so
                  evidence and management updates are never the bottleneck.
                </p>
                <p className="text-base m-0" style={{ lineHeight: 1.68, color: "var(--color-neutral-400)" }}>
                  Based in the Netherlands, working across BENELUX and open to
                  roles across Europe. I mentor the L1/L2 engineers around me
                  because a team that can triage well is worth more than any
                  runbook.
                </p>
              </div>
              <div className="grid gap-3.5">
                <div className="card">
                  <div className="card-kicker">Based in</div>
                  <div className="card-title">Netherlands · BENELUX</div>
                  <div className="card-body">
                    Open to opportunities across Europe, on site or hybrid.
                  </div>
                </div>
                <div className="card">
                  <div className="card-kicker">Also working as</div>
                  <div className="card-title">Azure Cloud &amp; DevOps Engineer</div>
                  <div className="card-body">
                    FDE (Forward Deployed Engineer) since 2024 — extending
                    that same hands-on ownership into cloud infrastructure,
                    automation and CI/CD delivery.
                  </div>
                </div>
                <div className="card">
                  <div className="card-kicker">How I work</div>
                  <div className="card-body">
                    Incident, change and problem management · SLA, RCA and
                    action closure · BCMS, DR and audit readiness · vendor,
                    asset and lifecycle coordination · mentoring L1/L2
                    engineers.
                  </div>
                </div>
                <div className="card">
                  <div className="card-kicker">Recognition</div>
                  <div className="card-title">Infosys INSTA Awards</div>
                  <div className="card-body">
                    Recognised for delivery and operational ownership.
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="experience" style={{ scrollMarginTop: "90px", marginBottom: "96px" }}>
          <Reveal>
            <div className="section-label">
              <span>Experience</span>
              <span />
            </div>
          </Reveal>
          <div className="grid gap-0">
            {experience.map((job, i) => (
              <Reveal key={job.title} delay={i * 80}>
                <article
                  className="grid gap-8"
                  style={{
                    gridTemplateColumns: "minmax(140px,190px) minmax(0,1fr)",
                    padding: "30px 0",
                    borderTop: "1px solid var(--color-divider)",
                    borderBottom:
                      i === experience.length - 1 ? "1px solid var(--color-divider)" : undefined,
                  }}
                >
                  <div>
                    <div className="text-[13.5px]" style={{ color: "var(--color-accent-300)", letterSpacing: "0.04em" }}>
                      {job.period}
                    </div>
                    <div className="mt-1.5 text-sm" style={{ color: "var(--color-neutral-400)" }}>
                      {job.org}
                      <br />
                      {job.place}
                    </div>
                  </div>
                  <div>
                    <h3
                      className="font-medium m-0 mb-1.5"
                      style={{ fontSize: "22px", letterSpacing: "-0.02em" }}
                    >
                      {job.title}
                    </h3>
                    <div className="text-sm mb-3.5" style={{ color: "var(--color-neutral-400)" }}>
                      {job.subtitle}
                    </div>
                    <ul
                      className="m-0 pl-[18px] grid gap-2 text-[15.5px]"
                      style={{ lineHeight: 1.6, color: "var(--color-neutral-300)" }}
                    >
                      {job.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                    <div className="flex gap-2 flex-wrap mt-4">
                      {job.tags.map((tag, idx) => (
                        <span key={tag} className={`tag ${idx === 0 ? "tag-accent" : "tag-outline"}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-11">
              <h3 className="font-medium m-0 mb-4.5" style={{ fontSize: "20px", letterSpacing: "-0.02em" }}>
                Selected achievements
              </h3>
              <div className="grid gap-3.5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))" }}>
                {achievements.map((a) => (
                  <div className="card" key={a}>
                    <div className="card-body">{a}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <section id="skills" style={{ scrollMarginTop: "90px", marginBottom: "96px" }}>
          <Reveal>
            <div className="section-label">
              <span>Skills</span>
              <span />
            </div>
            <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: "40px 56px" }}>
              <div className="grid gap-4">
                <div className="text-[12.5px] tracking-wider uppercase" style={{ color: "var(--color-neutral-500)" }}>
                  Networking &amp; security
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {skillsNetworking.map((s) => (
                    <span className="skill-chip" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid gap-4">
                <div className="text-[12.5px] tracking-wider uppercase" style={{ color: "var(--color-neutral-500)" }}>
                  Infrastructure &amp; service
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {skillsInfra.map((s) => (
                    <span className="skill-chip" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-9 grid gap-3.5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px,1fr))" }}>
              <div className="card">
                <div className="card-kicker">Networking</div>
                <div className="card-body">
                  Cisco Catalyst / Nexus, VLAN, STP, EtherChannel, OSPF, BGP, ACL, SD-WAN
                </div>
              </div>
              <div className="card">
                <div className="card-kicker">Security</div>
                <div className="card-body">
                  Check Point, Palo Alto, Skybox, IPsec / SSL VPN, Zscaler
                </div>
              </div>
              <div className="card">
                <div className="card-kicker">Data centre</div>
                <div className="card-body">
                  Racks, power, cooling, structured cabling, capacity, lifecycle
                </div>
              </div>
              <div className="card">
                <div className="card-kicker">Windows &amp; cloud</div>
                <div className="card-body">Windows Server, AD, DNS, DHCP, SCCM, M365</div>
              </div>
              <div className="card">
                <div className="card-kicker">Azure</div>
                <div className="card-body">Azure Networks, Azure DevOps, Azure CI/CD Pipelines</div>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="certifications" style={{ scrollMarginTop: "90px", marginBottom: "96px" }}>
          <Reveal>
            <div className="section-label">
              <span>Certifications</span>
              <span />
            </div>
            <div className="grid gap-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))" }}>
              <div>
                <h3 className="font-medium m-0 mb-4" style={{ fontSize: "20px", letterSpacing: "-0.02em" }}>
                  Certified
                </h3>
                <div className="grid gap-3">
                  {certified.map((c) => (
                    <div className="card flex justify-between items-center gap-4" key={c.title}>
                      <div>
                        <div className="card-kicker">{c.kicker}</div>
                        <div className="card-title">{c.title}</div>
                      </div>
                      <span className="tag tag-accent">Certified</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium m-0 mb-4" style={{ fontSize: "20px", letterSpacing: "-0.02em" }}>
                  Azure — in progress
                </h3>
                <div className="grid gap-3">
                  {inProgress.map((c) => (
                    <div className="card" key={c.title}>
                      <div className="flex justify-between items-center gap-4">
                        <div>
                          <div className="card-kicker">{c.kicker}</div>
                          <div className="card-title">{c.title}</div>
                        </div>
                        <span className="tag tag-outline">In progress</span>
                      </div>
                      <div className="card-body mt-2">{c.body}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium m-0 mb-4" style={{ fontSize: "20px", letterSpacing: "-0.02em" }}>
                  Programmes
                </h3>
                <div className="card flex gap-4 items-start">
                  <span className="badge-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 2.5c2.9 2.4 4.5 5.6 4.5 9 0 2-.5 3.7-1.3 5.2l-1.7-1a6.8 6.8 0 0 0 1-3.7c-.9.6-1.9 1-3 1.2v4l-2 2.3-2-2.3v-4c-1.1-.2-2.1-.6-3-1.2 0 1.3.4 2.6 1 3.7l-1.7 1A9.9 9.9 0 0 1 2.5 11.5c0-3.4 1.6-6.6 4.5-9 .8 1 1.9 1.7 3 2.1a10 10 0 0 1 2-2.1 10 10 0 0 1 2 2.1c1.1-.4 2.2-1.1 3-2.1Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <div>
                    <div className="card-kicker">Programme</div>
                    <div className="card-title">Forward Deployed Engineer (FDE)</div>
                    <div className="card-body">
                      Hands-on programme in deploying, configuring and
                      supporting solutions directly within client
                      environments — from technical scoping through to
                      go-live.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="education" style={{ scrollMarginTop: "90px", marginBottom: "96px" }}>
          <Reveal>
            <div className="section-label">
              <span>Education &amp; governance</span>
              <span />
            </div>
            <div className="grid gap-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))" }}>
              <div>
                <h3
                  className="font-medium m-0 mb-2"
                  style={{ fontSize: "26px", letterSpacing: "-0.025em" }}
                >
                  B.Sc. Computer Science
                </h3>
                <div className="text-[15.5px]" style={{ color: "var(--color-neutral-300)" }}>
                  Sri Venkateswara University, India
                </div>
                <p
                  className="text-[15.5px] max-w-[44ch] mt-4.5 mb-0"
                  style={{ lineHeight: 1.65, color: "var(--color-neutral-400)" }}
                >
                  The foundation; everything since has been earned on live
                  infrastructure — and topped up continuously through vendor
                  certification.
                </p>
              </div>
              <div>
                <div
                  className="text-[12.5px] tracking-wider uppercase mb-3.5"
                  style={{ color: "var(--color-neutral-500)" }}
                >
                  ISO standards supported
                </div>
                <div className="grid gap-2.5">
                  {isoStandards.map((iso, idx) => (
                    <div
                      key={iso.code}
                      className="flex gap-3.5 items-baseline pb-2.5"
                      style={{
                        borderBottom:
                          idx === isoStandards.length - 1 ? undefined : "1px solid var(--color-divider)",
                      }}
                    >
                      <span
                        className="font-medium"
                        style={{ color: "var(--color-accent-300)", minWidth: "74px" }}
                      >
                        {iso.code}
                      </span>
                      <span className="text-[15px]" style={{ color: "var(--color-neutral-300)" }}>
                        {iso.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="foundation" style={{ scrollMarginTop: "90px", marginBottom: "96px" }}>
          <Reveal>
            <div className="section-label">
              <span>Giving back</span>
              <span />
            </div>
            <div
              data-stack
              className="grid gap-11 items-start"
              style={{
                borderRadius: "var(--radius-lg)",
                background: "linear-gradient(150deg, var(--color-neutral-900) 0%, #1b1d2c 100%)",
                boxShadow: "var(--shadow-sm)",
                padding: "40px 36px",
                gridTemplateColumns: "minmax(0,1.2fr) minmax(0,1fr)",
              }}
            >
              <div>
                <div
                  className="text-[12.5px] tracking-wider uppercase mb-3"
                  style={{ color: "var(--color-neutral-500)" }}
                >
                  Founder
                </div>
                <h2
                  className="font-medium m-0 mb-4.5"
                  style={{ fontSize: "clamp(26px,3vw,34px)", letterSpacing: "-0.025em", lineHeight: 1.14 }}
                >
                  Chevurusha Foundation
                </h2>
                <p
                  className="text-base max-w-[54ch] mb-4"
                  style={{ lineHeight: 1.68, color: "var(--color-neutral-300)" }}
                >
                  A foundation I founded around one idea: no student should
                  stop studying over money — with my family closely
                  associated in carrying it forward. We cover school and
                  college fees for students who would otherwise drop out, and
                  put laptops in their hands so they can actually learn and
                  work.
                </p>
                <p
                  className="text-base max-w-[54ch] m-0"
                  style={{ lineHeight: 1.68, color: "var(--color-neutral-400)" }}
                >
                  It is quiet, direct work — find the student, cover the gap,
                  stay in touch. The same instinct that makes me keep
                  infrastructure running makes me want the people around me to
                  have what they need to get on with it.
                </p>
              </div>
              <div className="grid gap-3.5">
                <div className="card">
                  <div className="card-kicker">What we fund</div>
                  <div className="card-title">School &amp; college fees</div>
                  <div className="card-body">
                    Direct support so studies continue uninterrupted.
                  </div>
                </div>
                <div className="card">
                  <div className="card-kicker">What we fund</div>
                  <div className="card-title">Laptops for students</div>
                  <div className="card-body">
                    The tool that turns access to education into access to
                    opportunity.
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="contact" style={{ scrollMarginTop: "90px" }}>
          <Reveal>
            <div className="section-label">
              <span>Contact</span>
              <span />
            </div>
            <div
              data-stack
              className="grid gap-11 items-center"
              style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)" }}
            >
              <div>
                <h2
                  className="font-medium m-0 mb-4"
                  style={{ fontSize: "clamp(28px,3.4vw,40px)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
                >
                  Looking for someone who owns it?
                </h2>
                <p
                  className="text-[16.5px] max-w-[44ch] mb-6.5"
                  style={{ lineHeight: 1.65, color: "var(--color-neutral-300)" }}
                >
                  Available immediately, based in the Netherlands and open
                  across Europe. Happy to talk through your network, security
                  or data centre needs.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <a className="btn btn-primary" href="mailto:ChevuruRajendra007@gmail.com">
                    Email me
                  </a>
                  <a
                    className="btn btn-secondary"
                    href="https://www.linkedin.com/in/rajendra-chevuru-0981411bb/"
                    target="_blank"
                    rel="noopener"
                  >
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
              <div className="grid gap-0.5">
                <div
                  className="flex justify-between gap-4.5"
                  style={{ padding: "16px 0", borderTop: "1px solid var(--color-divider)" }}
                >
                  <span
                    className="text-[13px] tracking-wider uppercase"
                    style={{ color: "var(--color-neutral-500)" }}
                  >
                    Email
                  </span>
                  <a href="mailto:ChevuruRajendra007@gmail.com" className="text-[15.5px]">
                    ChevuruRajendra007@gmail.com
                  </a>
                </div>
                <div
                  className="flex justify-between gap-4.5"
                  style={{ padding: "16px 0", borderTop: "1px solid var(--color-divider)" }}
                >
                  <span
                    className="text-[13px] tracking-wider uppercase"
                    style={{ color: "var(--color-neutral-500)" }}
                  >
                    Phone
                  </span>
                  <a href="tel:+31625566020" className="text-[15.5px]">
                    +31 6 2556 6020
                  </a>
                </div>
                <div
                  className="flex justify-between gap-4.5"
                  style={{
                    padding: "16px 0",
                    borderTop: "1px solid var(--color-divider)",
                    borderBottom: "1px solid var(--color-divider)",
                  }}
                >
                  <span
                    className="text-[13px] tracking-wider uppercase"
                    style={{ color: "var(--color-neutral-500)" }}
                  >
                    Location
                  </span>
                  <span className="text-[15.5px]" style={{ color: "var(--color-neutral-300)" }}>
                    Netherlands
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer
        className="text-center text-[13.5px]"
        style={{
          borderTop: "1px solid var(--color-divider)",
          padding: "26px 28px",
          color: "var(--color-neutral-500)",
        }}
      >
        Rajendra Chevuru · Senior Network, Network Security &amp; Infrastructure
        Specialist · Netherlands
      </footer>
    </div>
  );
}
