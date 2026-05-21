import { Category, Product } from "@/lib/types";

export const categories: Category[] = [
  {
    id: "cat-mouse",
    name: "Mouse",
    slug: "mouse",
    description: "Precision mice for work and esports."
  },
  {
    id: "cat-keyboard",
    name: "Keyboard",
    slug: "keyboard",
    description: "Mechanical and wireless keyboards with clean layouts."
  },
  {
    id: "cat-monitor",
    name: "Monitor",
    slug: "monitor",
    description: "Color-rich and high refresh rate displays."
  },
  {
    id: "cat-headphones",
    name: "Headphones",
    slug: "headphones",
    description: "Immersive audio for gaming and focus."
  },
  {
    id: "cat-accessories",
    name: "Computer Accessories",
    slug: "computer-accessories",
    description: "Useful desk and device upgrades."
  },
  {
    id: "cat-gaming",
    name: "Gaming Accessories",
    slug: "gaming-accessories",
    description: "Essentials that elevate performance."
  },
  {
    id: "cat-gadgets",
    name: "Tech Gadgets",
    slug: "tech-gadgets",
    description: "Practical gadgets for modern setups."
  }
];

export const products: Product[] = [
  {
    id: "prod-1",
    name: "AeroPulse Pro Mouse",
    slug: "aeropulse-pro-mouse",
    category_id: "cat-mouse",
    category_name: "Mouse",
    price: 49,
    short_description: "Ultra-light wireless gaming mouse with 26K DPI sensor.",
    description: "Designed for fast response and long sessions, the AeroPulse Pro combines a sculpted shell, low-latency wireless performance, and a battery that keeps up with heavy daily use.",
    image_url: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    trending: true,
    specs: [
      { label: "Connectivity", value: "2.4GHz / USB-C" },
      { label: "Sensor", value: "26,000 DPI optical" },
      { label: "Weight", value: "59g" },
      { label: "Battery", value: "Up to 80 hours" }
    ],
    features: [
      "Low-latency wireless connection",
      "Textured matte surface for grip",
      "Programmable side buttons"
    ]
  },
  {
    id: "prod-2",
    name: "NovaType 75 Keyboard",
    slug: "novatype-75-keyboard",
    category_id: "cat-keyboard",
    category_name: "Keyboard",
    price: 109,
    short_description: "Compact mechanical keyboard with hot-swappable switches.",
    description: "The NovaType 75 brings a premium typing feel to work and play with gasket mounting, RGB backlighting, and tri-mode connectivity.",
    image_url: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    trending: false,
    specs: [
      { label: "Layout", value: "75%" },
      { label: "Connection", value: "Bluetooth / 2.4GHz / USB-C" },
      { label: "Switches", value: "Hot-swappable linear" },
      { label: "Backlight", value: "Per-key RGB" }
    ],
    features: [
      "Premium aluminum top frame",
      "Sound-dampened internal layers",
      "Mac and Windows support"
    ]
  },
  {
    id: "prod-3",
    name: "VisionEdge 27 Monitor",
    slug: "visionedge-27-monitor",
    category_id: "cat-monitor",
    category_name: "Monitor",
    price: 299,
    short_description: "27-inch QHD monitor with 170Hz refresh rate.",
    description: "A modern display for creators and gamers alike, offering rich color, slim bezels, and a fast panel for smooth motion.",
    image_url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    trending: true,
    specs: [
      { label: "Size", value: "27-inch" },
      { label: "Resolution", value: "2560 x 1440" },
      { label: "Refresh Rate", value: "170Hz" },
      { label: "Panel", value: "IPS" }
    ],
    features: [
      "Factory color calibrated",
      "Adaptive sync support",
      "Minimal stand footprint"
    ]
  },
  {
    id: "prod-4",
    name: "EchoCore Wireless Headphones",
    slug: "echocore-wireless-headphones",
    category_id: "cat-headphones",
    category_name: "Headphones",
    price: 89,
    short_description: "Low-latency wireless headphones with spatial sound.",
    description: "Balanced for gaming, calls, and music with cushioned earcups, a detachable microphone, and all-day battery life.",
    image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    trending: true,
    specs: [
      { label: "Driver", value: "50mm dynamic" },
      { label: "Mic", value: "Detachable boom mic" },
      { label: "Battery", value: "Up to 40 hours" },
      { label: "Modes", value: "Bluetooth / Wired" }
    ],
    features: [
      "Soft memory-foam ear cushions",
      "Quick mute and volume dial",
      "Wide stereo imaging"
    ]
  },
  {
    id: "prod-5",
    name: "DockMini USB-C Hub",
    slug: "dockmini-usb-c-hub",
    category_id: "cat-accessories",
    category_name: "Computer Accessories",
    price: 39,
    short_description: "7-in-1 USB-C hub for laptops and tablets.",
    description: "An elegant aluminum hub with HDMI, USB-A, PD charging, and card reader support for clean desk setups.",
    image_url: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    trending: false,
    specs: [
      { label: "Ports", value: "7-in-1" },
      { label: "Video", value: "4K HDMI" },
      { label: "Charging", value: "100W pass-through" },
      { label: "Material", value: "Aluminum" }
    ],
    features: [
      "Compact travel-ready body",
      "Fast file transfer support",
      "Works with most USB-C devices"
    ]
  },
  {
    id: "prod-6",
    name: "GlidePad RGB XL",
    slug: "glidepad-rgb-xl",
    category_id: "cat-gaming",
    category_name: "Gaming Accessories",
    price: 29,
    short_description: "Extended desk mat with edge lighting and stitched finish.",
    description: "Built for large mouse sweeps and tidy setups, the GlidePad RGB XL adds style while keeping surfaces smooth and stable.",
    image_url: "https://images.unsplash.com/photo-1616627561950-9f746e330187?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    trending: true,
    specs: [
      { label: "Size", value: "900 x 400mm" },
      { label: "Surface", value: "Micro-textured cloth" },
      { label: "Lighting", value: "RGB edge strip" },
      { label: "Base", value: "Non-slip rubber" }
    ],
    features: [
      "Desk-spanning size",
      "Water-resistant coating",
      "Multiple lighting presets"
    ]
  },
  {
    id: "prod-7",
    name: "SnapCharge Power Cube",
    slug: "snapcharge-power-cube",
    category_id: "cat-gadgets",
    category_name: "Tech Gadgets",
    price: 59,
    short_description: "GaN charger with multi-device fast charging.",
    description: "A compact charger that keeps phones, tablets, handheld consoles, and laptops powered from one travel-friendly block.",
    image_url: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    trending: false,
    specs: [
      { label: "Output", value: "100W max" },
      { label: "Ports", value: "3 x USB-C, 1 x USB-A" },
      { label: "Technology", value: "GaN" },
      { label: "Use", value: "Travel / Desk" }
    ],
    features: [
      "Fast charging for multiple devices",
      "Heat-managed GaN internals",
      "Compact vertical design"
    ]
  },
  {
    id: "prod-8",
    name: "StreamLite Webcam",
    slug: "streamlite-webcam",
    category_id: "cat-accessories",
    category_name: "Computer Accessories",
    price: 69,
    short_description: "1080p autofocus webcam with dual noise-reduction microphones.",
    description: "Made for meetings, streaming, and study sessions with natural color tuning, fast autofocus, and a privacy cover.",
    image_url: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    trending: true,
    specs: [
      { label: "Resolution", value: "1080p 60fps" },
      { label: "Microphones", value: "Dual noise reduction" },
      { label: "Lens", value: "Autofocus glass lens" },
      { label: "Mount", value: "Clip / tripod compatible" }
    ],
    features: [
      "Built-in privacy shutter",
      "Plug-and-play USB-C",
      "Sharp image in low light"
    ]
  }
];
