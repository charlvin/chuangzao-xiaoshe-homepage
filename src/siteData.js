export const pageData = {
  company: {
    englishName: "Chuangzao Xiaoshe",
    shortName: "Chuangzao Xiaoshe",
    legalName: "Chuangzao Xiaoshe (Suzhou) Information Technology Co., Ltd.",
    englishTagline: "Suzhou · Product Studio",
    heroLineA: "Building products",
    heroLineB: "with technology and humanity.",
    summary:
      "Chuangzao Xiaoshe explores tools, social software, and business systems with a long-term operating mindset. We start from concrete problems, create products that are simple, trustworthy, and sustainable, and look for ways to connect business viability with meaningful social value.",
    contactEmail: "contact@chuangzaoshe.space",
  },
  products: [
    {
      category: "Productivity Tool",
      name: "RealSIM Clipboard",
      description:
        "A lightweight macOS clipboard companion for people who move between documents, terminals, and Finder all day.",
      symbol: "⌘C",
      logoSrc: "/realsim-clipboard-icon.png",
      status: "Polishing",
      docLinks: [
        { label: "Product", to: "/realsim-clipboard" },
        { label: "Support", to: "/realsim-clipboard#realsim-clipboard-support" },
        { label: "Privacy Policy", to: "/realsim-clipboard#realsim-clipboard-privacy" },
      ],
    },
    {
      category: "iOS Productivity",
      name: "Daily Saying",
      description:
        "A local-first iPhone and iPad app that schedules quotes and notes to appear in the app and on the Home Screen widget.",
      symbol: "\u201c\u201d",
      logoSrc: "/daily-saying-icon.png",
      status: "Preparing for launch",
      docLinks: [
        { label: "Product", href: "/dailysaying" },
        { label: "Support", href: "/dailysaying/support" },
        { label: "Privacy Policy", href: "/dailysaying/privacy" },
      ],
    },
    {
      category: "Developer Tool",
      name: "AppReleaseHelper",
      description:
        "A fully offline macOS app that turns signing, privacy, screenshots, icons, and review preparation into a submission checklist tailored to your project.",
      symbol: "\u2713",
      logoSrc: "/appreleasehelper-icon.png",
      status: "Coming soon",
      docLinks: [
        { label: "Product", href: "/apps/appreleasehelper" },
        { label: "Support", href: "/apps/appreleasehelper/support" },
        { label: "Privacy Policy", href: "/apps/appreleasehelper/privacy" },
      ],
    },
    {
      category: "Social Software",
      name: "Local Social",
      description:
        "An early social product direction around real relationships, local context, and community collaboration.",
      symbol: "···",
      status: "In development",
    },
    {
      category: "Business SaaS",
      name: "BizRocker",
      description:
        "A business software direction for clearer workflows, collaboration, and operational management in small organizations.",
      symbol: "BR",
      status: "Design phase",
    },
  ],
};

function validatePageData(data) {
  const expectedProductNames = ["RealSIM Clipboard", "Daily Saying", "AppReleaseHelper", "Local Social", "BizRocker"];
  const productNames = data.products.map((product) => product.name);
  const uniqueProductNames = new Set(productNames);

  return {
    hasLegalCompanyName: Boolean(data.company.legalName),
    hasEnglishCompanyName: Boolean(data.company.englishName),
    hasShortCompanyName: Boolean(data.company.shortName),
    hasContactEmail:
      typeof data.company.contactEmail === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.company.contactEmail),
    hasHeroCopy: Boolean(data.company.heroLineA && data.company.heroLineB && data.company.summary),
    hasFiveProducts: data.products.length === 5,
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
    usesLocalSymbolsOnly: data.products.every(
      (product) => typeof product.symbol === "string" && product.symbol.length <= 3
    ),
  };
}

function runSelfChecks() {
  const result = validatePageData(pageData);

  console.assert(result.hasLegalCompanyName, "Expected legal company name to be present.");
  console.assert(result.hasEnglishCompanyName, "Expected English company name to be present.");
  console.assert(result.hasShortCompanyName, "Expected short company name to be present.");
  console.assert(result.hasContactEmail, "Expected a valid contact email.");
  console.assert(result.hasHeroCopy, "Expected hero copy to be complete.");
  console.assert(result.hasFiveProducts, "Expected exactly five product entries.");
  console.assert(result.hasAllExpectedProducts, "Expected all required products to be present.");
  console.assert(result.productNamesAreUnique, "Expected product names to be unique.");
  console.assert(
    result.productsHaveRequiredFields,
    "Expected every product to include category, name, description, symbol, and status."
  );
  console.assert(result.usesLocalSymbolsOnly, "Expected product symbols to be local text symbols only.");
}

runSelfChecks();
