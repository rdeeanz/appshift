import { prisma } from "@/lib/db";

export interface PublicApp {
  id: string;
  name: string;
  link: string;
  description: string;
  license: string;
  type: string;
  platforms: string[];
  features: string[];
  origin?: string | null;
  isFeatured?: boolean;
  createdAt: Date;
}

export interface PublicCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface PublicSettings {
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  newsletterTitle: string;
  newsletterDesc: string;
}

const fallbackApps: PublicApp[] = [
  {
    id: "faceoff",
    name: "Faceoff",
    link: "https://www.vincentgregoire.com/faceoff/",
    description: "A TUI app for following NHL hockey games in real-time.",
    license: "Free, Open Source (MIT)",
    type: "Live Score App",
    platforms: ["Mac", "Windows", "Linux", "BSD", "Python"],
    features: ["CLI", "Live Score", "Terminal-based", "Real-time updates", "Python-based"],
    origin: "Canada",
    createdAt: new Date("2026-04-24T00:00:00Z"),
  },
  {
    id: "gitwand",
    name: "GitWand",
    link: "https://gitwand.devlint.fr/",
    description: "Native Git client with smart merge conflict resolution.",
    license: "Free, Open Source (MIT)",
    type: "Version Control System",
    platforms: ["Mac", "Linux", "Windows", "VS Code"],
    features: ["File Versioning", "Works Offline", "No Tracking", "Dark Mode", "Git Support", "Syntax Highlighting"],
    origin: "",
    createdAt: new Date("2026-04-23T00:00:00Z"),
  },
  {
    id: "teambridge",
    name: "TeamBridge",
    link: "https://github.com/Mecacerf/TeamBridge",
    description: "Open-source tool tracking attendance, work hours, vacations, and absences for small teams using Excel files.",
    license: "Free, Open Source (AGPL-3.0)",
    type: "Employee Management Tool",
    platforms: ["Windows"],
    features: ["Employee Management", "Workflow", "Performance Tracking"],
    origin: "Switzerland",
    createdAt: new Date("2026-04-22T00:00:00Z"),
  },
  {
    id: "brave-origin",
    name: "Brave Origin",
    link: "https://brave.com/origin/download-nightly/",
    description: "Minimalist privacy browser with ad-block, Shields, no crypto, one-time activation.",
    license: "Pay once ($60), Proprietary",
    type: "Web Browser",
    platforms: ["Mac", "Windows", "Linux", "Android", "iPhone", "iPad"],
    features: ["Ad-free", "Block Trackers", "No Tracking", "Dark Mode", "Built-in Ad-blocker"],
    origin: "United States",
    createdAt: new Date("2026-04-21T00:00:00Z"),
  },
  {
    id: "dinky",
    name: "Dinky",
    link: "https://dinkyfiles.com",
    description: "Free macOS app that shrinks images, videos, and PDFs by drag-and-drop.",
    license: "Free, Open Source (MIT)",
    type: "Image Optimizer / File Compressor",
    platforms: ["Mac"],
    features: ["Drag & Drop", "Lossless Compression", "PDF compression", "Batch conversion", "Video Converter"],
    origin: "United States",
    createdAt: new Date("2026-04-20T00:00:00Z"),
  },
  {
    id: "open-pencil",
    name: "Open Pencil",
    link: "https://openpencil.dev",
    description: "Open-source vector and UI design editor with AI tools, Figma file support, P2P collaboration, and code export.",
    license: "Free, Open Source (MIT)",
    type: "UI Design Tool / Vector App",
    platforms: ["Mac", "Windows", "Linux", "Online", "Homebrew"],
    features: ["Real-time Collaboration", "AI-Powered", "Figma Import", "Auto Layout", "Design-to-Code (JSX/Tailwind)", "WebRTC", "MCP Support"],
    origin: "Russia",
    isFeatured: true,
    createdAt: new Date("2026-04-19T00:00:00Z"),
  },
  {
    id: "personal-computer",
    name: "Personal Computer",
    link: "https://www.perplexity.ai/personal-computer",
    description: "Cloud-based AI agent functioning as a persistent digital worker with always-on local machine access.",
    license: "Paid, Proprietary",
    type: "LLM Tool",
    platforms: ["Online"],
    features: ["Task Automation", "Workflow Automation", "AI-Powered"],
    origin: "United States",
    createdAt: new Date("2026-04-18T00:00:00Z"),
  },
  {
    id: "wiifin",
    name: "WiiFin",
    link: "https://wiifin.zipna.me",
    description: "Experimental Jellyfin homebrew client for Nintendo Wii with media browsing, playback, and progress sync.",
    license: "Free, Open Source (GPL-3.0)",
    type: "Media Player",
    platforms: ["Nintendo Wii / Wii U", "Dolphin Emulator"],
    features: ["Video Playback", "Audio Playback", "Movie Streaming", "Cover Art", "Pointer Controls"],
    origin: "France",
    createdAt: new Date("2026-04-17T00:00:00Z"),
  },
  {
    id: "notch-pilot",
    name: "Notch Pilot",
    link: "https://github.com/devmegablaster/Notch-Pilot",
    description: "Live companion for Claude Code that lives in your MacBook notch.",
    license: "Free, Open Source (MIT)",
    type: "AI Coding Assistant",
    platforms: ["Mac", "Homebrew"],
    features: ["Status Monitoring", "Real-time Usage Limits", "Dark Mode", "No Tracking", "Ad-free"],
    origin: "India",
    createdAt: new Date("2026-04-16T00:00:00Z"),
  },
  {
    id: "tuta-drive",
    name: "Tuta Drive",
    link: "https://tuta.com/drive",
    description: "End-to-end encrypted cloud storage using quantum-resistant cryptography. Currently in closed beta.",
    license: "Free, Open Source (GPL-3.0)",
    type: "Cloud Storage Service",
    platforms: ["Online"],
    features: ["E2E Encryption", "Quantum-Safe Encryption", "GDPR Compliant", "2FA", "Encrypted Backup"],
    origin: "Germany",
    createdAt: new Date("2026-04-15T00:00:00Z"),
  },
  {
    id: "thunderbolt",
    name: "Thunderbolt",
    link: "https://thunderbolt.io",
    description: "Open-source cross-platform AI client with model selection, on-prem deployment, and enterprise features.",
    license: "Free, Open Source (MPL-2.0)",
    type: "AI Chatbot / LLM Tool",
    platforms: ["Mac", "Windows", "Linux", "Android", "iPhone", "Self-Hosted", "Docker"],
    features: ["AI Chatbot", "MCP Support", "No Tracking", "Plugin Support", "AI-Powered"],
    origin: "United States",
    createdAt: new Date("2026-04-14T00:00:00Z"),
  },
  {
    id: "vibe-island",
    name: "Vibe Island",
    link: "https://vibeisland.app",
    description: "macOS notch panel for monitoring AI agents: Claude Code, Codex, Gemini CLI, Cursor, and more.",
    license: "Pay once ($15), Proprietary",
    type: "AI Coding Assistant",
    platforms: ["Mac"],
    features: ["AI-Powered", "Dark Mode", "Zero Configuration", "Ad-free"],
    origin: "",
    createdAt: new Date("2026-04-13T00:00:00Z"),
  },
];

const fallbackCategories: PublicCategory[] = [
  { id: "developer-tools", icon: "🖥️", name: "Developer Tools", count: 5 },
  { id: "ai-llm", icon: "🤖", name: "AI & LLM", count: 6 },
  { id: "design", icon: "🎨", name: "Design", count: 3 },
  { id: "privacy", icon: "🔐", name: "Privacy", count: 4 },
  { id: "file-storage", icon: "🗂️", name: "File & Storage", count: 3 },
  { id: "mobile", icon: "📱", name: "Mobile", count: 4 },
  { id: "media", icon: "🎮", name: "Media", count: 2 },
  { id: "productivity", icon: "🏢", name: "Productivity", count: 3 },
];

const fallbackSettings: PublicSettings = {
  heroTitle: "Discover Newly Submitted Apps",
  heroSubtitle: "Fresh software discovered by the AppShift community. Browse, compare, and find your next favorite tool.",
  heroBadge: "19 New Apps This Week",
  newsletterTitle: "Stay in the Loop",
  newsletterDesc: "Get a curated roundup of new apps, standout launches, and interesting tools from the AppShift community.",
};

export async function getPublicContent() {
  try {
    const [apps, categories, settings] = await Promise.all([
      prisma.app.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.category.findMany(),
      prisma.siteSettings.findFirst(),
    ]);

    return {
      apps,
      categories,
      settings: settings
        ? {
            heroTitle: settings.heroTitle,
            heroSubtitle: settings.heroSubtitle,
            heroBadge: settings.heroBadge,
            newsletterTitle: settings.newsletterTitle,
            newsletterDesc: settings.newsletterDesc,
          }
        : fallbackSettings,
      usingFallbackContent: false,
    };
  } catch (error) {
    console.warn("Falling back to built-in public content because the database is unavailable.", error);

    return {
      apps: fallbackApps,
      categories: fallbackCategories,
      settings: fallbackSettings,
      usingFallbackContent: true,
    };
  }
}
