import { Download, Clock } from "lucide-react";

export default function HistoryCard({ entry }) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `https://wcgan-web-interface.onrender.com${entry.image_url}`;
    link.download = `wcgan_${entry.gender}_${entry.smile ? "smiling" : "neutral"}_${entry.id}.png`;
    link.click();
  };

  return (
    <div className="glass overflow-hidden group hover:bg-white/[0.07] transition-all duration-300">
      <div className="relative">
        <img
          src={`https://wcgan-web-interface.onrender.com${entry.image_url}`}
          alt={`Face ${entry.id}`}
          className="w-full aspect-square object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button onClick={handleDownload} className="btn-secondary p-2">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="p-3 space-y-2">
        <div className="flex gap-2 flex-wrap">
          <span className="text-xs glass px-2 py-0.5 rounded-full capitalize">{entry.gender}</span>
          <span className="text-xs glass px-2 py-0.5 rounded-full">
            {entry.smile ? "Smiling" : "Neutral"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          {new Date(entry.timestamp).toLocaleString()}
        </div>
      </div>
    </div>
  );
}