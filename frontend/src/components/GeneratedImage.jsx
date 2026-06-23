import { Download, Loader2, AlertCircle } from "lucide-react";

export default function GeneratedImage({ imageUrl, gender, smile, timestamp, loading, error }) {
  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `wcgan_${gender}_${smile ? "smiling" : "neutral"}.png`;
    link.click();
  };

  return (
    <div className="glass p-6 flex flex-col items-center gap-4 min-h-[400px] justify-center">
      {loading && (
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <Loader2 className="w-10 h-10 animate-spin text-purple-400" />
          <p className="text-sm">Generating face...</p>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center gap-3 text-red-400">
          <AlertCircle className="w-10 h-10" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && !imageUrl && (
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <div className="w-32 h-32 rounded-xl bg-white/5 flex items-center justify-center">
            <span className="text-5xl">?</span>
          </div>
          <p className="text-sm">Select attributes and generate</p>
        </div>
      )}

      {!loading && !error && imageUrl && (
        <>
          <div className="relative group">
            <img
              src={imageUrl}
              alt={`Generated ${gender} ${smile ? "smiling" : "neutral"} face`}
              className="w-64 h-64 rounded-xl object-cover shadow-2xl animate-fade-in"
            />
            <div className="absolute inset-0 rounded-xl bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button onClick={handleDownload} className="btn-secondary flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
          <div className="text-center space-y-1 animate-fade-in-delay">
            <div className="flex gap-3 text-sm text-gray-400">
              <span className="glass px-3 py-1 rounded-full capitalize">{gender}</span>
              <span className="glass px-3 py-1 rounded-full">{smile ? "Smiling" : "Neutral"}</span>
            </div>
            {timestamp && (
              <p className="text-xs text-gray-500">{new Date(timestamp).toLocaleString()}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}