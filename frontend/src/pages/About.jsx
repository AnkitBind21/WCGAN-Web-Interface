import {
  Brain,
  Database,
  Layers,
  Settings,
  TrendingUp,
  Cpu,
  FlaskConical,
  GitBranch,
  ImageIcon,
  Download,
  Clock,
  Zap,
  AlertTriangle,
  ChevronRight,
  Server,
  Code2,
  Activity,
  Sparkles,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ─── Data ─────────────────────────────────────────────────────────────────────

const statsCards = [
  { icon: ImageIcon, label: "Training Images", value: "~9,500", sub: "CelebA subset" },
  { icon: Activity, label: "Training Epochs", value: "30", sub: "WGAN-GP regime" },
  { icon: Cpu, label: "Output Resolution", value: "64×64", sub: "RGB face images" },
  { icon: Zap, label: "Latent Dimension", value: "100-dim", sub: "noise vector" },
];

const techStack = [
  { label: "Frontend", items: ["React", "Vite", "Tailwind CSS"] },
  { label: "Backend", items: ["Python", "Flask", "REST API"] },
  { label: "ML Framework", items: ["PyTorch", "CUDA", "NumPy"] },
  { label: "Model", items: ["WGAN-GP", "Conditional GAN", "CelebA"] },
];

const trainingConfig = [
  { param: "Model Architecture", value: "Conditional WGAN-GP" },
  { param: "Dataset", value: "CelebA Face Dataset" },
  { param: "Training Images", value: "~9,500" },
  { param: "Input Resolution", value: "64 × 64 px" },
  { param: "Epochs", value: "30" },
  { param: "Batch Size", value: "32" },
  { param: "Learning Rate", value: "0.0001" },
  { param: "Optimizer", value: "Adam (β₁=0.5, β₂=0.999)" },
  { param: "Latent Dimension", value: "100" },
  { param: "Attribute Vector", value: "2-dim (gender + expression)" },
  { param: "Gradient Penalty λ", value: "10" },
  { param: "GPU", value: "NVIDIA RTX 3050 Laptop GPU" },
];

const trainingChartData = [
  { name: "Batch Size", value: 32 },
  { name: "Epochs", value: 30 },
  { name: "Latent Dim", value: 100 },
  { name: "GP Lambda", value: 10 },
];

const workflowSteps = [
  {
    step: "01",
    title: "Attribute Selection",
    desc: "User selects gender (Male / Female) and expression (Smiling / Neutral) from the UI.",
    icon: Sparkles,
  },
  {
    step: "02",
    title: "API Request",
    desc: "React frontend sends the 2-dimensional attribute vector to the Flask backend via REST API.",
    icon: Code2,
  },
  {
    step: "03",
    title: "GAN Inference",
    desc: "PyTorch generator samples a 100-dim latent noise vector, concatenates the attribute embedding, and performs a forward pass.",
    icon: Brain,
  },
  {
    step: "04",
    title: "Image Delivery",
    desc: "The 64×64 RGB output is base64-encoded and streamed back to the frontend for instant display.",
    icon: Server,
  },
];

const generationFeatures = [
  "Male + Smiling face generation",
  "Male + Neutral face generation",
  "Female + Smiling face generation",
  "Female + Neutral face generation",
  "Generation history panel",
  "Download generated faces",
  "Real-time Flask API integration",
];

const architectureLayers = [
  {
    side: "Generator",
    color: "text-violet-300",
    border: "border-violet-500/30",
    bg: "bg-violet-500/5",
    items: [
      "Input: 100-dim noise + 2-dim attribute vector",
      "Conditional attribute embedding layer",
      "4 × ConvTranspose2d upsampling blocks",
      "Resolution: 4 → 8 → 16 → 32 → 64 px",
      "BatchNorm + ReLU activations",
      "Tanh output → 64×64 RGB image",
    ],
  },
  {
    side: "Critic",
    color: "text-fuchsia-300",
    border: "border-fuchsia-500/30",
    bg: "bg-fuchsia-500/5",
    items: [
      "Conditional input projection layer",
      "4 × Conv2d blocks with stride-2 downsampling",
      "LeakyReLU (α = 0.2) throughout",
      "No BatchNorm (WGAN-GP standard)",
      "Gradient Penalty λ = 10",
      "Single scalar Wasserstein realness score",
    ],
  },
];

const limitations = [
  { title: "Fixed Resolution", desc: "Output is capped at 64×64 pixels — suitable for demos but not print-quality use." },
  { title: "Binary Attributes", desc: "Only two binary attributes are modelled; continuous or multi-value traits are not supported." },
  { title: "Dataset Bias", desc: "CelebA skews towards lighter skin tones and celebrity-specific facial structures." },
  { title: "Training Scale", desc: "~9,500 images is a small subset; more data would improve diversity and sharpness." },
];

const futureWork = [
  "Higher-resolution output — 128×128 and 256×256 targets",
  "Expanded attribute set (age, hair colour, eyewear)",
  "Smooth face interpolation between attribute states",
  "Batch generation and grid export",
  "Diffusion-model upgrade for sharper detail",
  "Cloud deployment with GPU inference (AWS / GCP)",
  "User authentication and personal generation history",
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ icon: Icon, title, accent }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
        <Icon className="w-5 h-5 text-purple-400" />
      </div>
      <h2 className="text-xl font-semibold">
        {title}{" "}
        {accent && <span className="gradient-text">{accent}</span>}
      </h2>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/15 text-purple-300 border border-purple-500/20">
      {children}
    </span>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <div className="page-container py-10 space-y-14">

      {/* ── Hero ── */}
      <header className="space-y-4">
        <div className="flex flex-wrap gap-2 mb-3">
          <Tag>Final Year Project</Tag>
          <Tag>Deep Learning</Tag>
          <Tag>Generative AI</Tag>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
          FaceGen-WCGAN
        </h1>
        <p className="text-lg text-purple-300 font-medium">
          Attribute-Controlled Face Generation
        </p>
        <p className="text-gray-400 max-w-2xl leading-relaxed">
          A full-stack AI application that synthesises realistic human faces conditioned
          on user-selected attributes — built on a Conditional Wasserstein GAN with
          Gradient Penalty, trained on the CelebA dataset.
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {["React + Vite", "Flask", "PyTorch", "WGAN-GP", "CelebA", "NVIDIA RTX 3050"].map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-gray-300"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map(({ icon: Icon, label, value, sub }) => (
          <div key={label} className="glass p-5 flex flex-col gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 w-fit">
              <Icon className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold gradient-text">{value}</p>
              <p className="text-xs font-medium text-gray-300 mt-0.5">{label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Overview ── */}
      <section className="glass p-8">
        <SectionHeader icon={Brain} title="Project" accent="Overview" />
        <p className="text-gray-300 leading-relaxed mb-6">
          FaceGen-WCGAN is a research-grade generative AI project that demonstrates how
          Conditional Wasserstein GANs can produce controllable, attribute-specific face
          imagery. By conditioning the generator on a compact 2-dimensional attribute
          vector — encoding gender and facial expression — the model learns to map
          arbitrary latent noise to faces that respect the requested attributes.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {techStack.map(({ label, items }) => (
            <div key={label} className="rounded-xl bg-white/3 border border-white/8 p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">
                {label}
              </p>
              <ul className="space-y-1.5">
                {items.map((i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <ChevronRight className="w-3 h-3 text-purple-500 shrink-0" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Dataset ── */}
      <section className="glass p-8">
        <SectionHeader icon={Database} title="Dataset" accent="Information" />
        <div className="grid sm:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
            <p>
              The model is trained on a <span className="text-white font-medium">~9,500-image subset</span> of
              the CelebFaces Attributes (CelebA) dataset — a large-scale benchmark of
              aligned celebrity face photographs.
            </p>
            <p>
              Each image is resized to <span className="text-white font-medium">64 × 64 pixels</span> and
              pixel values are normalised to the range{" "}
              <code className="px-1.5 py-0.5 rounded bg-white/8 text-purple-300 font-mono text-xs">
                [−1, 1]
              </code>{" "}
              to match the generator's Tanh output.
            </p>
            <p>
              Two binary attributes are extracted per image from CelebA's annotation file
              and encoded into a 2-dimensional attribute vector passed to both the
              generator and the critic.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Gender", values: ["Male", "Female"] },
              { label: "Expression", values: ["Smiling", "Neutral"] },
            ].map(({ label, values }) => (
              <div key={label} className="rounded-xl bg-white/3 border border-white/8 p-4">
                <p className="text-xs uppercase tracking-widest text-purple-400 font-semibold mb-3">
                  {label}
                </p>
                {values.map((v) => (
                  <div
                    key={v}
                    className="flex items-center gap-2 text-sm text-gray-300 mb-2 last:mb-0"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                    {v}
                  </div>
                ))}
              </div>
            ))}
            <div className="col-span-2 rounded-xl bg-white/3 border border-white/8 p-4">
              <p className="text-xs uppercase tracking-widest text-purple-400 font-semibold mb-2">
                Conditioning Space
              </p>
              <p className="text-sm text-gray-300">
                2 attributes × 2 classes ={" "}
                <span className="text-white font-semibold">4 unique face types</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Architecture ── */}
      <section className="glass p-8">
        <SectionHeader icon={Layers} title="Model" accent="Architecture" />
        <div className="grid sm:grid-cols-2 gap-6">
          {architectureLayers.map(({ side, color, border, bg, items }) => (
            <div key={side} className={`rounded-xl border ${border} ${bg} p-5`}>
              <h3 className={`text-base font-semibold mb-4 ${color}`}>{side}</h3>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-400">
                    <ChevronRight className="w-3.5 h-3.5 text-purple-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Training ── */}
      <section className="glass p-8">
        <SectionHeader icon={Settings} title="Training" accent="Configuration" />
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-xs uppercase tracking-wider">
                    Parameter
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-xs uppercase tracking-wider">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {trainingConfig.map(({ param, value }) => (
                  <tr key={param} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="py-2.5 px-4 text-gray-400">{param}</td>
                    <td className="py-2.5 px-4 font-mono text-purple-200 text-xs">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Chart */}
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
              Key Hyperparameters (log-scale reference)
            </p>
            <div className="flex-1 min-h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trainingChartData} barSize={32}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="name"
                    stroke="rgba(255,255,255,0.15)"
                    tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }}
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.15)"
                    tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(10,10,20,0.9)",
                      border: "1px solid rgba(167,139,250,0.25)",
                      borderRadius: "8px",
                      color: "#e5e7eb",
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="value" fill="url(#barGrad)" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ── Project Workflow ── */}
      <section className="glass p-8">
        <SectionHeader icon={GitBranch} title="Project" accent="Workflow" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {workflowSteps.map(({ step, title, desc, icon: Icon }) => (
            <div key={step} className="relative rounded-xl bg-white/3 border border-white/8 p-5 flex flex-col gap-3">
              <span className="text-3xl font-black text-white/5 leading-none select-none absolute top-4 right-4">
                {step}
              </span>
              <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 w-fit">
                <Icon className="w-4 h-4 text-purple-400" />
              </div>
              <h3 className="font-semibold text-sm text-gray-100">{title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="glass p-8">
        <SectionHeader icon={Sparkles} title="Application" accent="Features" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {generationFeatures.map((feat, i) => (
            <div
              key={feat}
              className="flex items-center gap-3 rounded-lg bg-white/3 border border-white/8 px-4 py-3"
            >
              <span className="text-purple-400 text-xs font-mono w-5 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-gray-300">{feat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Limitations ── */}
      <section className="glass p-8">
        <SectionHeader icon={AlertTriangle} title="Known" accent="Limitations" />
        <div className="grid sm:grid-cols-2 gap-4">
          {limitations.map(({ title, desc }) => (
            <div
              key={title}
              className="flex gap-4 rounded-xl bg-yellow-500/5 border border-yellow-500/15 p-5"
            >
              <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-yellow-200 mb-1">{title}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Future Improvements ── */}
      <section className="glass p-8">
        <SectionHeader icon={TrendingUp} title="Future" accent="Improvements" />
        <div className="grid sm:grid-cols-2 gap-3">
          {futureWork.map((item) => (
            <div key={item} className="flex items-start gap-3 text-sm text-gray-400">
              <span className="text-purple-400 mt-1 shrink-0">✦</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer note ── */}
      <p className="text-center text-xs text-gray-600 pb-4">
        FaceGen-WCGAN · Final Year Project · Built with PyTorch + React + Flask
      </p>

    </div>
  );
}
