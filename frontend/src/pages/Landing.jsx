import { Link } from "react-router-dom";
import {
  Sparkles,
  Shield,
  Brain,
  Zap,
  ArrowRight,
  Layers,
  Image,
  Sliders,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: Sliders,
    title: "Conditional Generation",
    desc: "Control facial attributes like gender and expression through conditional inputs.",
  },
  {
    icon: Shield,
    title: "Stable WGAN Training",
    desc: "Wasserstein loss with gradient penalty ensures stable training and high-quality outputs.",
  },
  {
    icon: Brain,
    title: "Realistic Face Synthesis",
    desc: "Deep convolutional architecture generates realistic 64×64 synthetic faces.",
  },
  {
    icon: Zap,
    title: "Fast Inference",
    desc: "Generate faces in under 5 seconds on consumer hardware with PyTorch.",
  },
];

const architectureSteps = [
  { label: "Noise + Attributes", icon: Sliders },
  { label: "Generator", icon: Layers },
  { label: "Generated Face", icon: Image },
  { label: "Critic", icon: Brain },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/40 via-transparent to-transparent pointer-events-none" />
        <div className="page-container py-24 sm:py-32 text-center relative z-10">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-purple-300 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            AI-Powered Face Generation
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 animate-fade-in-delay">
            Attribute-Controlled Face Generation
            <br />
            <span className="gradient-text">using WCGAN-GP</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 animate-fade-in-delay-2">
            Generate realistic synthetic faces by selecting attributes using a
            Conditional Wasserstein GAN with Gradient Penalty.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-delay-2">
            <button onClick={() => navigate("/generate")} className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
              Generate Face
              <ArrowRight className="w-5 h-5" />
            </button>
            <a href="#features" className="btn-secondary flex items-center gap-2 text-lg px-8 py-4">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="page-container py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Key <span className="gradient-text">Features</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass p-6 hover:bg-white/[0.07] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center mb-4 group-hover:bg-purple-600/30 transition-colors">
                <Icon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section className="page-container py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Model <span className="gradient-text">Architecture</span>
        </h2>
        <div className="glass p-8 sm:p-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            {architectureSteps.map(({ label, icon: Icon }, idx) => (
              <div key={label} className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-purple-600/20 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-purple-400" />
                  </div>
                  <span className="text-sm text-gray-300 font-medium text-center">{label}</span>
                </div>
                {idx < architectureSteps.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-gray-600 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-container py-20 text-center">
        <div className="glass p-12 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Generate?
          </h2>
          <p className="text-gray-400 mb-8">
            Choose facial attributes and create realistic synthetic faces instantly.
          </p>
          <button onClick={() => navigate("/generate")} className="btn-primary flex items-center gap-2 mx-auto text-lg px-8 py-4">
            <Sparkles className="w-5 h-5" />
            Start Generating
          </button>
        </div>
      </section>
    </div>
  );
}