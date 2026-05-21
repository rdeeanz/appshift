import { getPayload } from 'payload'
import configPromise from '../payload.config'

const APPS = [
  { name: "Faceoff", link: "https://www.vincentgregoire.com/faceoff/", description: "A TUI app for following NHL hockey games in real-time.", license: "Free, Open Source (MIT)", type: "Live Score App", platforms: "Mac, Windows, Linux, BSD, Python", features: "CLI, Live Score, Terminal-based, Real-time updates, Python-based", origin: "Canada", categoryName: "Media" },
  { name: "GitWand", link: "https://gitwand.devlint.fr/", description: "Native Git client with smart merge conflict resolution.", license: "Free, Open Source (MIT)", type: "Version Control System", platforms: "Mac, Linux, Windows, VS Code", features: "File Versioning, Works Offline, No Tracking, Dark Mode, Git Support, Syntax Highlighting", origin: "", categoryName: "Developer Tools" },
  { name: "TeamBridge", link: "https://github.com/Mecacerf/TeamBridge", description: "Open-source tool tracking attendance, work hours, vacations, and absences for small teams using Excel files.", license: "Free, Open Source (AGPL-3.0)", type: "Employee Management Tool", platforms: "Windows", features: "Employee Management, Workflow, Performance Tracking", origin: "Switzerland", categoryName: "Productivity" },
  { name: "Brave Origin", link: "https://brave.com/origin/download-nightly/", description: "Minimalist privacy browser with ad-block, Shields, no crypto, one-time activation.", license: "Pay once ($60), Proprietary", type: "Web Browser", platforms: "Mac, Windows, Linux, Android, iPhone, iPad", features: "Ad-free, Block Trackers, No Tracking, Dark Mode, Built-in Ad-blocker", origin: "United States", categoryName: "Privacy" },
  { name: "Dinky", link: "https://dinkyfiles.com", description: "Free macOS app that shrinks images, videos, and PDFs by drag-and-drop.", license: "Free, Open Source (MIT)", type: "Image Optimizer / File Compressor", platforms: "Mac", features: "Drag & Drop, Lossless Compression, PDF compression, Batch conversion, Video Converter", origin: "United States", categoryName: "File & Storage" },
  { name: "Open Pencil", link: "https://openpencil.dev", description: "Open-source vector and UI design editor with AI tools, Figma file support, P2P collaboration, and code export.", license: "Free, Open Source (MIT)", type: "UI Design Tool / Vector App", platforms: "Mac, Windows, Linux, Online, Homebrew", features: "Real-time Collaboration, AI-Powered, Figma Import, Auto Layout, Design-to-Code (JSX/Tailwind), WebRTC, MCP Support", origin: "Russia", isFeatured: true, categoryName: "Design" },
  { name: "Personal Computer", link: "https://www.perplexity.ai/personal-computer", description: "Cloud-based AI agent functioning as a persistent digital worker with always-on local machine access.", license: "Paid, Proprietary", type: "LLM Tool", platforms: "Online", features: "Task Automation, Workflow Automation, AI-Powered", origin: "United States", categoryName: "AI & LLM" },
  { name: "WiiFin", link: "https://wiifin.zipna.me", description: "Experimental Jellyfin homebrew client for Nintendo Wii with media browsing, playback, and progress sync.", license: "Free, Open Source (GPL-3.0)", type: "Media Player", platforms: "Nintendo Wii / Wii U, Dolphin Emulator", features: "Video Playback, Audio Playback, Movie Streaming, Cover Art, Pointer Controls", origin: "France", categoryName: "Media" },
  { name: "Notch Pilot", link: "https://github.com/devmegablaster/Notch-Pilot", description: "Live companion for Claude Code that lives in your MacBook notch.", license: "Free, Open Source (MIT)", type: "AI Coding Assistant", platforms: "Mac, Homebrew", features: "Status Monitoring, Real-time Usage Limits, Dark Mode, No Tracking, Ad-free", origin: "India", categoryName: "AI & LLM" },
  { name: "Tuta Drive", link: "https://tuta.com/drive", description: "End-to-end encrypted cloud storage using quantum-resistant cryptography. Currently in closed beta.", license: "Free, Open Source (GPL-3.0)", type: "Cloud Storage Service", platforms: "Online", features: "E2E Encryption, Quantum-Safe Encryption, GDPR Compliant, 2FA, Encrypted Backup", origin: "Germany", categoryName: "File & Storage" },
  { name: "Thunderbolt", link: "https://thunderbolt.io", description: "Open-source cross-platform AI client with model selection, on-prem deployment, and enterprise features.", license: "Free, Open Source (MPL-2.0)", type: "AI Chatbot / LLM Tool", platforms: "Mac, Windows, Linux, Android, iPhone, Self-Hosted, Docker", features: "AI Chatbot, MCP Support, No Tracking, Plugin Support, AI-Powered", origin: "United States", categoryName: "AI & LLM" },
  { name: "Vibe Island", link: "https://vibeisland.app", description: "macOS notch panel for monitoring AI agents: Claude Code, Codex, Gemini CLI, Cursor, and more.", license: "Pay once ($15), Proprietary", type: "AI Coding Assistant", platforms: "Mac", features: "AI-Powered, Dark Mode, Zero Configuration, Ad-free", origin: "", categoryName: "Developer Tools" },
  { name: "Nothing Warp", link: "https://nothing.community/d/55831-introducing-nothing-warp", description: "Browser extension to move files, links, text, and images between computer and Android phone via Google Drive.", license: "Free, Proprietary", type: "File Transfer Service", platforms: "Android, Google Chrome", features: "File Sending, Large File Transfer, Image Sharing, No Tracking", origin: "United Kingdom", categoryName: "Mobile" },
  { name: "FluidCAD", link: "https://fluidcad.io", description: "Browser-based parametric 3D CAD with JavaScript scripting, interactive viewport editing, and feature history.", license: "Free, Open Source (LGPL-2.1)", type: "CAD Software / 3D Modeler", platforms: "VS Code, JavaScript, Node.js", features: "Parametric Modeling, 3D Renderer, Works Offline, STEP Import/Export, Dark Mode", origin: "", categoryName: "Developer Tools" },
  { name: "TermOnMac", link: "https://termonmac.com", description: "Remote terminal for Mac via iPhone/iPad. No SSH setup required, end-to-end encrypted, QR code pairing.", license: "Freemium ($1–3/month), Proprietary", type: "Terminal Emulator / SSH Client", platforms: "iPhone, iPad", features: "E2E Encryption, AI-Powered, Dark Mode, CLI, Ad-free", origin: "Taiwan", categoryName: "Mobile" },
  { name: "PureMac", link: "https://github.com/momenbasel/PureMac", description: "Free open-source macOS cleaner. CleanMyMac alternative with zero telemetry.", license: "Free, Open Source (MIT)", type: "System Cleaner", platforms: "Mac, Homebrew", features: "No Tracking, Works Offline, Dark Mode, No Registration, Ad-free", origin: "United Arab Emirates", categoryName: "Productivity" },
  { name: "Bag", link: "https://bitbag.app/", description: "Bitcoin-only price tracker and net worth dashboard with DCA tracker, price charts, and home screen widget.", license: "Freemium ($8 one-time), Open Source (GPL-3.0)", type: "Crypto Portfolio Tracker", platforms: "Android, F-Droid, iPhone", features: "Bitcoin Price Ticker, DCA Tracker, Tor via Orbot, Watch-only Wallet Tracking", origin: "United Kingdom", categoryName: "Mobile" },
  { name: "Delineato", link: "https://delineato.app", description: "Minimalist diagramming and mind mapping tool for freelancers and creative teams.", license: "Freemium ($6–16/month), Proprietary", type: "Diagram Editor / Wireframing Tool", platforms: "Online, Android, iPhone, iPad", features: "Mind Mapping, Wireframing, ChatGPT Plugin, Markdown Import, PNG Export", origin: "Portugal", categoryName: "Productivity" },
  { name: "Astropad Workbench", link: "https://astropad.com/product/workbench/", description: "High-performance remote desktop to connect to your Mac from iPhone or iPad.", license: "Freemium ($4–10/month), Proprietary", type: "Remote Desktop Tool", platforms: "Mac, iPhone, iPad", features: "Apple Pencil Support, E2E Encryption, 2FA, Low Latency, Multi-Monitor Support", origin: "United States", categoryName: "Productivity" }
]

const CATEGORIES = [
  { icon: '🖥️', name: 'Developer Tools' },
  { icon: '🤖', name: 'AI & LLM' },
  { icon: '🎨', name: 'Design' },
  { icon: '🔐', name: 'Privacy' },
  { icon: '🗂️', name: 'File & Storage' },
  { icon: '📱', name: 'Mobile' },
  { icon: '🎮', name: 'Media' },
  { icon: '🏢', name: 'Productivity' }
]

const BLOG_POSTS = [
  {
    slug: "essential-open-source-tools",
    title: "10 Essential Open Source Tools for Modern Developers",
    excerpt: "Discover the most powerful and community-driven tools that are reshaping the way we build software in 2024.",
    content: "Full content about essential open source tools...",
    category: "Developer Tools",
    author: "Alex Rivera",
    date: "2024-04-20",
  },
  {
    slug: "privacy-focused-browsers",
    title: "The Rise of Privacy-Focused Browsers",
    excerpt: "Why users are ditching mainstream browsers for privacy-first alternatives like Brave and LibreWolf.",
    content: "Full content about privacy focused browsers...",
    category: "Privacy",
    author: "Sarah Chen",
    date: "2024-04-18",
  },
  {
    slug: "hidden-gems-app-directory",
    title: "How to Discover Hidden Gems in the App Directory",
    excerpt: "A guide on using filters and tags effectively to find specialized software that perfectly fits your workflow.",
    content: "Full content about hidden gems...",
    category: "App Discovery",
    author: "Jordan Smith",
    date: "2024-04-15",
  },
  {
    slug: "ai-powered-coding",
    title: "AI-Powered Coding: Friend or Foe?",
    excerpt: "Exploring the impact of LLMs and AI assistants on software engineering productivity and code quality.",
    content: "Full content about AI powered coding...",
    category: "AI & LLM",
    author: "Alex Rivera",
    date: "2024-04-12",
  },
  {
    slug: "future-cross-platform-apps",
    title: "The Future of Cross-Platform Desktop Apps",
    excerpt: "Is Electron still the king, or are newer frameworks like Tauri and Wails taking over the desktop landscape?",
    content: "Full content about cross platform apps...",
    category: "Developer News",
    author: "Sarah Chen",
    date: "2024-04-10",
  },
  {
    slug: "why-documentation-matters",
    title: "Why Documentation Matters More Than Ever",
    excerpt: "Investing in clear documentation is the best way to ensure your open-source project thrives and grows.",
    content: "Full content about documentation...",
    category: "Best Practices",
    author: "Jordan Smith",
    date: "2024-04-08",
  }
]

export const seed = async () => {
  const payload = await getPayload({ config: configPromise })

  console.log('Seeding database...')

  // Clear existing data
  await payload.delete({
    collection: 'users',
    where: { id: { exists: true } },
  })
  await payload.delete({
    collection: 'apps',
    where: { id: { exists: true } },
  })
  await payload.delete({
    collection: 'categories',
    where: { id: { exists: true } },
  })
  await payload.delete({
    collection: 'posts',
    where: { id: { exists: true } },
  })
  await payload.delete({
    collection: 'media',
    where: { id: { exists: true } },
  })

  const seedAdminPassword = process.env.SEED_ADMIN_PASSWORD
  if (!seedAdminPassword) {
    throw new Error('SEED_ADMIN_PASSWORD is required before running pnpm seed. Copy .env.example to .env.local and set a local admin password.')
  }

  // Seed Admin User
  await payload.create({
    collection: 'users',
    data: {
      username: 'admin',
      email: 'admin@appshift.io',
      password: seedAdminPassword,
      role: 'admin',
    },
  })

  // Seed Categories
  const createdCategories: any = {}
  for (const cat of CATEGORIES) {
    const created = await payload.create({
      collection: 'categories',
      data: cat,
    })
    createdCategories[cat.name] = created.id
  }

  // Seed Apps
  for (const app of APPS) {
    const { categoryName, ...appData } = app as any
    await payload.create({
      collection: 'apps',
      data: {
        ...appData,
        category: createdCategories[categoryName],
      },
    })
  }

  // Seed Blog Posts
  for (const post of BLOG_POSTS) {
    await payload.create({
      collection: 'posts',
      data: post,
    })
  }

  // Seed Globals
  await payload.updateGlobal({
    slug: 'hero',
    data: {
      badgeText: '19 New Apps This Week',
      heading: 'Discover Newly Submitted Apps',
      subheading: 'Fresh software discovered by the AppShift community. Browse, compare, and find your next favorite tool.',
    },
  })

  await payload.updateGlobal({
    slug: 'stats',
    data: {
      items: [
        { value: '19', label: 'New Apps' },
        { value: '13', label: 'Free or Open Source' },
        { value: '10+', label: 'Platforms' },
        { value: '6', label: 'AI-Powered Tools' },
      ],
    },
  })

  console.log('Seeding complete.')
}
