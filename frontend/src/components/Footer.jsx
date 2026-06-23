import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="glass border-t border-white/5 mt-auto">
      <div className="page-container py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} WCGAN-GP Face Generator</p>
        <div className="flex items-center gap-4">
          <span>Built with PyTorch &amp; React</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}