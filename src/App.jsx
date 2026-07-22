import { useLayoutEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { pageData } from "./siteData.js";

function cls(...items) {
  return items.filter(Boolean).join(" ");
}

function Mark({ children, large }) {
  return (
    <div
      className={cls(
        large ? "h-12 w-12 text-lg" : "h-10 w-10 text-xs",
        "flex shrink-0 items-center justify-center rounded-2xl bg-white font-semibold text-neutral-950 shadow-lg"
      )}
    >
      {children}
    </div>
  );
}

function ProductMark({ product }) {
  if (product.logoSrc) {
    return (
      <div className="flex h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-white shadow-lg">
        <img src={product.logoSrc} alt="" className="h-full w-full object-contain p-1.5" />
      </div>
    );
  }
  return <Mark large>{product.symbol}</Mark>;
}

function ArrowMark() {
  return (
    <span aria-hidden="true" className="ml-2 inline-block transition-transform group-hover:translate-x-1">
      →
    </span>
  );
}

function LinkButton({ children, href, secondary, ...rest }) {
  return (
    <a
      href={href}
      {...rest}
      className={cls(
        "group inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-neutral-950",
        secondary
          ? "border border-white/20 bg-transparent text-white hover:bg-white/10"
          : "bg-white text-neutral-950 hover:bg-neutral-200"
      )}
    >
      {children}
    </a>
  );
}

const docLinkClassName =
  "font-medium text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white";

function ProductDocLink({ link }) {
  if (link.to) {
    return (
      <Link className={docLinkClassName} to={link.to}>
        {link.label}
      </Link>
    );
  }
  return (
    <a className={docLinkClassName} href={link.href}>
      {link.label}
    </a>
  );
}

function ProductCard({ product, index }) {
  return (
    <article className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-white shadow-xl backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07]">
      <div className="mb-6 flex items-center justify-between gap-4">
        <ProductMark product={product} />
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-400">
          {product.status}
        </span>
      </div>
      <div className="text-sm text-neutral-500">{product.category}</div>
      <h3 className="mt-2 text-xl font-semibold">{product.name}</h3>
      <p className="mt-4 leading-7 text-neutral-400">{product.description}</p>
      {product.docLinks?.length ? (
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-5 text-sm">
          {product.docLinks.map((link) => (
            <ProductDocLink key={link.to ?? link.href} link={link} />
          ))}
        </div>
      ) : null}
      <div className="mt-8 text-xs text-neutral-600">Direction {String(index + 1).padStart(2, "0")}</div>
    </article>
  );
}

function InlineDocLink({ href, children }) {
  return (
    <a href={href} className={docLinkClassName}>
      {children}
    </a>
  );
}

function HomePage() {
  const { company, products } = pageData;

  return (
    <main className="min-h-screen overflow-hidden bg-neutral-950 text-white">
      <section className="relative px-6 py-8 md:px-12 lg:px-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute top-64 -left-32 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        </div>

        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Mark>CX</Mark>
            <div>
              <div className="text-sm font-semibold tracking-wide">{company.shortName}</div>
              <div className="text-xs text-neutral-400">{company.englishTagline}</div>
            </div>
          </div>
          <div>
            <LinkButton
              href={`mailto:${company.contactEmail}?subject=${encodeURIComponent("Partnership inquiry")}`}
              secondary
              aria-label={`Contact Chuangzao Xiaoshe at ${company.contactEmail}`}
            >
              Contact
              <ArrowMark />
            </LinkButton>
          </div>
        </nav>

        <div className="relative z-10 mx-auto max-w-7xl py-24 md:py-32">
          <section>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
              {company.heroLineA}
              <span className="block text-neutral-400">{company.heroLineB}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-300 md:text-xl">
              {company.summary}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="#products">
                View Product Portfolio
                <ArrowMark />
              </LinkButton>
            </div>
          </section>
        </div>
      </section>

      <section id="products" className="scroll-mt-20 px-6 pb-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-neutral-500">Product Matrix</p>
              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">Product directions under active formation</h2>
            </div>
            <p className="max-w-xl text-neutral-400">
              The portfolio is deliberately early and practical: start with narrow workflows, learn from real usage,
              and expand only when the product earns the right to grow.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {products.map((product, index) => (
              <ProductCard key={product.name} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="company" className="scroll-mt-20 border-t border-white/10 px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-neutral-500">Company</p>
            <h2 className="mt-3 text-3xl font-semibold">{company.legalName}</h2>
            <p className="mt-4 text-sm text-neutral-400">English name: {company.englishName}</p>
            <p className="mt-5 text-sm text-neutral-400">
              Partnership contact:{" "}
              <a
                className="font-medium text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white"
                href={`mailto:${company.contactEmail}?subject=${encodeURIComponent("Partnership inquiry")}`}
              >
                {company.contactEmail}
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function RealSIMClipboardPage() {
  const location = useLocation();
  const { contactEmail } = pageData.company;
  const realsimLogo = pageData.products.find((p) => p.name === "RealSIM Clipboard")?.logoSrc;
  const supportAnchor = "#realsim-clipboard-support";
  const privacyAnchor = "#realsim-clipboard-privacy";
  const activeSection = location.hash === supportAnchor ? "support" : location.hash === privacyAnchor ? "privacy" : "product";
  const productTabClass = (active) =>
    cls(
      "inline-flex min-h-10 items-center justify-center rounded-full border px-4 text-sm font-medium transition",
      active
        ? "border-white bg-white text-neutral-950"
        : "border-white/15 bg-white/[0.04] text-neutral-300 hover:border-white/30 hover:text-white"
    );

  useLayoutEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [location.pathname, location.hash]);

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-white/10 px-6 py-6 md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-sm font-medium text-neutral-300 transition hover:text-white"
          >
            <span aria-hidden="true">←</span>
            Back to Company Site
          </Link>
          <div className="flex items-center gap-3">
            {realsimLogo ? (
              <div className="flex h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-white shadow-lg">
                <img src={realsimLogo} alt="" className="h-full w-full object-contain p-1.5" />
              </div>
            ) : (
              <Mark>⌘C</Mark>
            )}
            <div>
              <div className="text-sm font-semibold">RealSIM Clipboard</div>
              <div className="text-xs text-neutral-400">{pageData.company.shortName}</div>
            </div>
          </div>
        </div>
      </header>

      <nav
        className="sticky top-0 z-20 border-b border-white/10 bg-neutral-950/90 px-6 py-3 backdrop-blur md:px-12 lg:px-20"
        aria-label="RealSIM Clipboard sections"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2">
          <Link
            className={productTabClass(activeSection === "product")}
            to="/realsim-clipboard"
            aria-current={activeSection === "product" ? "page" : undefined}
          >
            Product
          </Link>
          <Link
            className={productTabClass(activeSection === "support")}
            to={`/realsim-clipboard${supportAnchor}`}
            aria-current={activeSection === "support" ? "page" : undefined}
          >
            Support
          </Link>
          <Link
            className={productTabClass(activeSection === "privacy")}
            to={`/realsim-clipboard${privacyAnchor}`}
            aria-current={activeSection === "privacy" ? "page" : undefined}
          >
            Privacy Policy
          </Link>
          <span className="inline-flex min-h-10 cursor-not-allowed items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-4 text-sm font-medium text-neutral-600">
            Download (developing)
          </span>
        </div>
      </nav>

      <section id="realsim-clipboard-product" className="scroll-mt-20 px-6 py-14 md:px-12 lg:px-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-neutral-500">Product</p>
          <h1 className="mt-3 text-3xl font-semibold md:text-4xl">RealSIM Clipboard</h1>
          <p className="mt-6 leading-8 text-neutral-300">
            RealSIM Clipboard is a lightweight menu bar companion for your Mac. It keeps a running history of what you
            copy—text, files, and folders—so you can paste again without digging through old windows.
          </p>
          <ul className="mt-6 list-inside list-disc space-y-3 leading-8 text-neutral-300">
            <li>Menu bar first: open the panel when you need it, stay out of the way when you don&apos;t.</li>
            <li>Clipboard history for text and file references you copy in Finder and other apps.</li>
            <li>Re-copy or clear entries on your terms; tune how much history to keep.</li>
          </ul>
          <p className="mt-6 leading-8 text-neutral-300">
            Built for people who jump between documents, terminals, and Finder all day and want clipboard recall without
            handing data to the cloud.
          </p>
        </div>
      </section>

      <section
        id="realsim-clipboard-support"
        className="scroll-mt-24 border-t border-white/10 px-6 py-16 md:px-12 lg:px-20"
        aria-labelledby="realsim-support-heading"
      >
        <div className="mx-auto max-w-3xl text-neutral-300">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-neutral-500">RealSIM Clipboard</p>
          <h2 id="realsim-support-heading" className="mt-3 text-3xl font-semibold text-white">
            Support
          </h2>

          <h3 className="mt-10 text-lg font-semibold text-white">Overview</h3>
          <p className="mt-3 leading-8">
            RealSIM Clipboard is a macOS menu bar app that keeps a local clipboard history so you can re-copy recent
            text, files, and folders.
          </p>

          <h3 className="mt-10 text-lg font-semibold text-white">Requirements</h3>
          <ul className="mt-3 list-inside list-disc space-y-2 leading-8">
            <li>macOS 12 or later (as listed on the App Store).</li>
          </ul>

          <h3 className="mt-10 text-lg font-semibold text-white">FAQ</h3>
          <dl className="mt-4 space-y-6">
            <div>
              <dt className="font-medium text-white">Does RealSIM Clipboard upload my clipboard to the cloud?</dt>
              <dd className="mt-2 leading-8">
                No. History is stored locally on your Mac. We do not operate a backend that receives your clipboard
                contents for this app.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-white">Does the app access my pasteboard?</dt>
              <dd className="mt-2 leading-8">
                Yes — it reads the clipboard to show history and to let you copy again. Handling stays on device unless
                you separately use OS features outside the app.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-white">How do I get help or report a problem?</dt>
              <dd className="mt-2 leading-8">
                Email:{" "}
                <a className={docLinkClassName} href={`mailto:${contactEmail}?subject=${encodeURIComponent("RealSIM Clipboard support")}`}>
                  {contactEmail}
                </a>
                <br />
                Include your macOS version, app version, and steps to reproduce.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-white">Privacy</dt>
              <dd className="mt-2 leading-8">
                See our Privacy Policy at:{" "}
                <InlineDocLink href={privacyAnchor}>Privacy Policy — RealSIM Clipboard</InlineDocLink>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        id="realsim-clipboard-privacy"
        className="scroll-mt-24 border-t border-white/10 px-6 py-16 md:px-12 lg:px-20"
        aria-labelledby="realsim-privacy-heading"
      >
        <div className="mx-auto max-w-3xl text-neutral-300">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-neutral-500">RealSIM Clipboard</p>
          <h2 id="realsim-privacy-heading" className="mt-3 text-3xl font-semibold text-white">
            Privacy Policy
          </h2>
          <p className="mt-2 text-sm text-neutral-500">Last updated: May 9, 2026</p>

          <p className="mt-8 leading-8">
            This policy describes how RealSIM Clipboard (“the App”) handles information on your device.
          </p>

          <h3 className="mt-10 text-lg font-semibold text-white">What the App accesses</h3>
          <ul className="mt-3 list-inside list-disc space-y-2 leading-8">
            <li>
              Clipboard (pasteboard): the App reads clipboard content you copy so it can maintain a history and let you
              copy items again from the menu bar UI.
            </li>
          </ul>

          <h3 className="mt-10 text-lg font-semibold text-white">Where data is stored</h3>
          <ul className="mt-3 list-inside list-disc space-y-2 leading-8">
            <li>
              Clipboard history you choose to keep is stored locally on your Mac inside the App’s sandboxed storage
              area.
            </li>
            <li>
              We do not send your clipboard contents to our servers for this App because we do not operate an application
              backend that collects them.
            </li>
          </ul>

          <h3 className="mt-10 text-lg font-semibold text-white">Data sharing</h3>
          <ul className="mt-3 list-inside list-disc space-y-2 leading-8">
            <li>We do not sell your clipboard history. We do not use it for third-party advertising in the App.</li>
          </ul>

          <h3 className="mt-10 text-lg font-semibold text-white">Contact</h3>
          <p className="mt-3 leading-8">
            Questions:{" "}
            <a className={docLinkClassName} href={`mailto:${contactEmail}?subject=${encodeURIComponent("RealSIM Clipboard privacy")}`}>
              {contactEmail}
            </a>
          </p>

          <h3 className="mt-10 text-lg font-semibold text-white">Changes</h3>
          <p className="mt-3 leading-8">
            We may update this policy if the App’s behaviour changes; the “Last updated” date will reflect revisions.
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-3xl flex-wrap gap-4 text-sm text-neutral-500">
          <Link className={docLinkClassName} to="/realsim-clipboard#realsim-clipboard-support">
            Support
          </Link>
          <Link className={docLinkClassName} to="/realsim-clipboard#realsim-clipboard-privacy">
            Privacy Policy
          </Link>
          <Link className={docLinkClassName} to="/">
            Home
          </Link>
        </div>
      </footer>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/realsim-clipboard" element={<RealSIMClipboardPage />} />
    </Routes>
  );
}
