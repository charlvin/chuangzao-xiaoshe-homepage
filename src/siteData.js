export const pageData = {
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
    contactEmail: "contact@chuangzaoshe.space",
  },
  principles: ["少做空泛叙事", "先解决真实问题", "允许慢，但不粗糙", "产品长期演进"],
  products: [
    {
      category: "工具类",
      name: "RealSIM Clipboard",
      description: "一个简单、轻量、可靠的粘贴板应用。聚焦日常复制、整理、复用，让信息流转更顺手。",
      symbol: "⌘C",
      logoSrc: "/realsim-clipboard-icon.png",
      status: "规划 / 打磨中",
      docLinks: [
        { label: "Support", to: "/realsim-clipboard#realsim-clipboard-support" },
        { label: "Privacy Policy", to: "/realsim-clipboard#realsim-clipboard-privacy" },
      ],
    },
    {
      category: "工具类",
      name: "DevHelper",
      description: "面向独立开发者与小团队的开发者助手。减少重复配置、流程查找与上下文切换。",
      symbol: "{ }",
      logoSrc: "/devhelper-icon.png",
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
    hasContactEmail:
      typeof data.company.contactEmail === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.company.contactEmail),
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
  console.assert(result.hasContactEmail, "Expected a valid contact email.");
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
