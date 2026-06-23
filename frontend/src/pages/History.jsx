import { useState, useEffect } from "react";
import { Clock, Image as ImageIcon } from "lucide-react";
import HistoryCard from "../components/HistoryCard";
import { getHistory } from "../services/client";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const data = await getHistory();
        setHistory(data);
      } catch (err) {
        setError("Could not load history. Is the backend running?");
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  return (
    <div className="page-container py-8">
      <div className="flex items-center gap-3 mb-8">
        <Clock className="w-7 h-7 text-purple-400" />
        <h1 className="text-3xl font-bold">
          Generation <span className="gradient-text">History</span>
        </h1>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="glass p-8 text-center text-gray-400">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && history.length === 0 && (
        <div className="glass p-12 text-center text-gray-400">
          <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="text-lg mb-2">No generations yet</p>
          <p className="text-sm">Generate your first face to see it here.</p>
        </div>
      )}

      {!loading && !error && history.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {history.map((entry) => (
            <HistoryCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}