import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiCheckCircle, FiSearch, FiTrash2, FiZap } from "react-icons/fi";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import EmptyState from "../components/EmptyState.jsx";
import Skeleton from "../components/Skeleton.jsx";
import StatCard from "../components/StatCard.jsx";
import { deleteHistoryItem, fetchHistory } from "../services/textService.js";

const filters = ["all", "summarize", "humanize", "rewrite", "grammar"];

const History = () => {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({ total: 0, humanize: 0, summarize: 0 });
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadHistory = async () => {
      setLoading(true);
      try {
        const data = await fetchHistory({ search, type });
        setItems(data.history);
        setStats(data.stats);
      } catch (error) {
        toast.error(error.response?.data?.message || "History could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(loadHistory, 250);
    return () => clearTimeout(timeout);
  }, [search, type]);

  const cards = useMemo(
    () => [
      { label: "Total Processes", value: stats.total || 0, icon: FiZap },
      { label: "Humanize Count", value: stats.humanize || 0, icon: FiCheckCircle },
      { label: "Summary Count", value: stats.summarize || 0, icon: FiSearch }
    ],
    [stats]
  );

  const handleDelete = async (id) => {
    try {
      await deleteHistoryItem(id);
      setItems((current) => current.filter((item) => item._id !== id));
      toast.success("History item deleted.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed.");
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300 sm:text-sm">Archive</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-4xl">History</h1>
      </div>

      <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
        {cards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      <Card>
        <div className="grid gap-3 md:grid-cols-[1fr_220px]">
          <input
            className="field"
            placeholder="Search saved text..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <select className="field" value={type} onChange={(event) => setType(event.target.value)}>
            {filters.map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {loading ? (
        <div className="grid gap-4">
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
        </div>
      ) : items.length ? (
        <div className="grid gap-4">
          {items.map((item) => (
            <Card key={item._id}>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <button className="min-w-0 text-left" onClick={() => navigate("/result", { state: item })}>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">{item.processType}</p>
                  <h2 className="mt-2 line-clamp-2 text-base font-semibold leading-6 text-white sm:text-lg">{item.processedText}</h2>
                  <p className="mt-2 text-sm text-slate-400">{new Date(item.createdAt).toLocaleString()}</p>
                </button>
                <Button variant="danger" className="w-full lg:w-auto" onClick={() => handleDelete(item._id)}>
                  <FiTrash2 />
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState title="No history yet" description="Processed text will be saved here automatically." />
      )}
    </div>
  );
};

export default History;
