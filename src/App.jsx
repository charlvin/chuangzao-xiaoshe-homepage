const pageData = {
  company: {
    shortName: "创造小舍",
    legalName: "创造小舍（苏州）信息技术有限公司",
    englishTagline: "Suzhou · Information Technology",
    heroLineA: "一个一人公司，",
    heroLineB: "想做点好产品。",
    summary:
      "我们相信，小团队也可以长期、稳定、认真地创造产品。先从具体问题出发，做简洁、可信、可持续演进的工具、社交产品与企业服务。我们希望公司能够赚到钱、可持续经营；也期待在踏实经营的同时，逐步探索社会理想得以实现的路径。",
    companyIntro:
      "创造小舍是一家以长期产品创造为核心的小型信息技术公司。当前重点探索个人效率工具、开发者工具、社交产品与企业 SaaS。我们更关注真实需求、产品完成度与可持续经营，而不是短期概念包装。我们并不讳言盈利：健康的商业模式是继续做产品的前提；在此基础上，我们愿意留出空间，在商业与社会价值之间做审慎、长期的探索。",
  },
  principles: ["少做空泛叙事", "先解决真实问题", "允许慢，但不粗糙", "产品长期演进"],
  products: [
    {
      category: "工具类",
      name: "RealSIM Clipboard",
      description: "一个简单、轻量、可靠的粘贴板应用。聚焦日常复制、整理、复用，让信息流转更顺手。",
      symbol: "⌘C",
      status: "规划 / 打磨中",
    },
    {
      category: "工具类",
      name: "DevHelper",
      description: "面向独立开发者与小团队的开发者助手。减少重复配置、流程查找与上下文切换。",
      symbol: "{ }",
      status: "规划 / 打磨中",
    },
    {
      category: "社交类",
      name: "社交产品",
      description: "围绕真实关系、地理位置与社区协作展开的社交方向产品。当前仍处于开发与验证阶段。",
      symbol: "···",
      status: "开发中",
    },
    {
      category: "SaaS 类",
      name: "BizRocker",
      description: "面向企业流程、协作与业务管理的 SaaS 产品方向，帮助小团队把复杂业务变得更清楚。",
      symbol: "BR",
      status: "产品设计中",
    },
  ],
};

function validatePageData(data) {
  const expectedProductNames = ["RealSIM Clipboard", "DevHelper", "社交产品", "BizRocker"];
  const productNames = data.products.map((product) => product.name);
  const uniqueProductNames = new Set(productNames);

  return {
    hasLegalCompanyName: Boolean(data.company.legalName),
    hasShortCompanyName: Boolean(data.company.shortName),
    hasHeroCopy: Boolean(data.company.heroLineA && data.company.heroLineB && data.company.summary),
    hasFourProducts: data.products.length === 4,
    hasAllExpectedProducts: expectedProductNames.every((name) => productNames.includes(name)),
    productNamesAreUnique: uniqueProductNames.size === productNames.length,
    productsHaveRequiredFields: data.products.every(
      (product) =>
        Boolean(product.category) &&
        Boolean(product.name) &&
        Boolean(product.description) &&
        Boolean(product.symbol) &&
        Boolean(product.status)
    ),
    hasFourPrinciples: data.principles.length === 4,
    principlesAreNonEmpty: data.principles.every((item) => typeof item === "string" && item.length > 0),
    usesLocalSymbolsOnly: data.products.every(
      (product) => typeof product.symbol === "string" && product.symbol.length <= 3
    ),
  };
}

function runSelfChecks() {
  const result = validatePageData(pageData);

  console.assert(result.hasLegalCompanyName, "Expected legal company name to be present.");
  console.assert(result.hasShortCompanyName, "Expected short company name to be present.");
  console.assert(result.hasHeroCopy, "Expected hero copy to be complete.");
  console.assert(result.hasFourProducts, "Expected exactly four product entries.");
  console.assert(result.hasAllExpectedProducts, "Expected all required products to be present.");
  console.assert(result.productNamesAreUnique, "Expected product names to be unique.");
  console.assert(
    result.productsHaveRequiredFields,
    "Expected every product to include category, name, description, symbol, and status."
  );
  console.assert(result.hasFourPrinciples, "Expected exactly four product principles.");
  console.assert(result.principlesAreNonEmpty, "Expected every product principle to be non-empty.");
  console.assert(result.usesLocalSymbolsOnly, "Expected product symbols to be local text symbols only.");
}

runSelfChecks();

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

function ArrowMark() {
  return (
    <span aria-hidden="true" className="ml-2 inline-block transition-transform group-hover:translate-x-1">
      →
    </span>
  );
}

function LinkButton({ children, href, secondary }) {
  return (
    <a
      href={href}
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

function ProductCard({ product, index }) {
  return (
    <article className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-white shadow-xl backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07]">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Mark large>{product.symbol}</Mark>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-400">
          {product.status}
        </span>
      </div>
      <div className="text-sm text-neutral-500">{product.category}</div>
      <h3 className="mt-2 text-xl font-semibold">{product.name}</h3>
      <p className="mt-4 leading-7 text-neutral-400">{product.description}</p>
      <div className="mt-8 text-xs text-neutral-600">方向 {String(index + 1).padStart(2, "0")}</div>
    </article>
  );
}

function PrincipleItem({ item, index }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white/[0.04] p-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-semibold text-neutral-950">
        {index + 1}
      </div>
      <span className="text-neutral-200">{item}</span>
    </div>
  );
}

export default function App() {
  const { company, products, principles } = pageData;

  return (
    <main className="min-h-screen overflow-hidden bg-neutral-950 text-white">
      <section className="relative px-6 py-8 md:px-12 lg:px-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute top-64 -left-32 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        </div>

        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Mark>小舍</Mark>
            <div>
              <div className="text-sm font-semibold tracking-wide">{company.shortName}</div>
              <div className="text-xs text-neutral-400">{company.englishTagline}</div>
            </div>
          </div>
          <div className="hidden md:block">
            <LinkButton href="#company" secondary>
              联系合作
              <ArrowMark />
            </LinkButton>
          </div>
        </nav>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 py-24 md:grid-cols-[1.1fr_0.9fr] md:py-32">
          <section>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300 backdrop-blur">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-neutral-950">
                C
              </span>
              {company.legalName}
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
              {company.heroLineA}
              <span className="block text-neutral-400">{company.heroLineB}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-300 md:text-xl">
              {company.summary}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="#products">
                查看产品方向
                <ArrowMark />
              </LinkButton>
              <LinkButton href="#vision" secondary>
                了解公司愿景
              </LinkButton>
            </div>
          </section>

          <aside id="vision" className="relative scroll-mt-24">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur">
              <div className="rounded-[1.5rem] bg-neutral-900 p-6">
                <div className="mb-8 flex items-center justify-between gap-6">
                  <div>
                    <div className="text-sm text-neutral-400">Product Philosophy</div>
                    <div className="mt-1 text-xl font-semibold">Small Team, Real Products</div>
                  </div>
                  <div className="rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-950">
                    v0.1
                  </div>
                </div>
                <div className="space-y-4">
                  {principles.map((item, index) => (
                    <PrincipleItem key={item} item={item} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="products" className="scroll-mt-20 px-6 pb-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-neutral-500">Product Matrix</p>
              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">正在构建的产品方向</h2>
            </div>
            <p className="max-w-xl text-neutral-400">
              不追求一次性做大，而是围绕工具效率、社交连接与企业协作逐步形成产品组合。
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard key={product.name} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="company" className="scroll-mt-20 border-t border-white/10 px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-neutral-500">Company</p>
            <h2 className="mt-3 text-3xl font-semibold">{company.legalName}</h2>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-neutral-300">
            <p className="leading-8">{company.companyIntro}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
