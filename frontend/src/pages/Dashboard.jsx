import { useState, useCallback } from "react";
import { Sparkles, Shuffle, History as HistoryIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AttributeSelector from "../components/AttributeSelector";
import GeneratedImage from "../components/GeneratedImage";
import { generateFace } from "../services/client";

export default function Dashboard() {
  const navigate = useNavigate();
  const [gender, setGender] = useState("male");
  const [smile, setSmile] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [comparisonImages, setComparisonImages] = useState([]);

  const handleGenerate = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateFace(gender, smile);
      setResult(data);
      setComparisonImages((prev) => [data, ...prev].slice(0, 4));
    } catch (err) {
      setError(err.response?.data?.error || "Generation failed. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, [gender, smile]);

  const handleRandom = useCallback(() => {
    const genders = ["male", "female"];
    const smiles = [true, false];
    setGender(genders[Math.floor(Math.random() * 2)]);
    setSmile(smiles[Math.floor(Math.random() * 2)]);
  }, []);

  return (
    <div className="page-container py-8">
      <h1 className="text-3xl font-bold mb-8">
        Generator <span className="gradient-text">Dashboard</span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass p-6 space-y-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Attributes
            </h2>
            <AttributeSelector
              gender={gender}
              smile={smile}
              onGenderChange={setGender}
              onSmileChange={setSmile}
            />
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              {loading ? "Generating..." : "Generate Face"}
            </button>
            <button
              onClick={handleRandom}
              disabled={loading}
              className="btn-secondary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Shuffle className="w-4 h-4" />
              Generate Random Face
            </button>
            <button
              onClick={() => navigate("/history")}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <HistoryIcon className="w-4 h-4" />
              View History
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-2 space-y-6">
          <GeneratedImage
            imageUrl={result?.image_url}
            gender={result?.gender}
            smile={result?.smile}
            timestamp={result?.timestamp}
            loading={loading}
            error={error}
          />

          {/* Side-by-Side Comparison */}
          {comparisonImages.length > 0 && (
            <div className="glass p-6">
              <h3 className="text-sm font-semibold text-gray-300 mb-4">
                Recent Generations
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {comparisonImages.map((img, idx) => (
                  <div key={img.id || idx} className="glass overflow-hidden group cursor-pointer">
                    <img
                      src={img.image_url}
                      alt={`Generation ${img.id}`}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-2 text-center">
                      <span className="text-xs text-gray-400 capitalize">{img.gender}</span>
                      <span className="text-xs text-gray-500 mx-1">·</span>
                      <span className="text-xs text-gray-400">{img.smile ? "Smiling" : "Neutral"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}