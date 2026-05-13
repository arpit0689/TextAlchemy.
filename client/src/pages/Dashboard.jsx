import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiCheckCircle, FiEdit3, FiRefreshCw, FiTrash2, FiZap } from "react-icons/fi";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import Spinner from "../components/Spinner.jsx";
import StatCard from "../components/StatCard.jsx";
import { useTextStats } from "../hooks/useTextStats.js";
import { processText } from "../services/textService.js";

const tools = [
  { type: "summarize", label: "Summarize", icon: FiZap },
  { type: "humanize", label: "Humanize", icon: FiCheckCircle },
  { type: "rewrite", label: "Rewrite", icon: FiRefreshCw },
  { type: "grammar", label: "Grammar Fix", icon: FiEdit3 }
];

const Dashboard = () => {
  const [text, setText] = useState("");
  const [loadingType, setLoadingType] = useState("");
  const [result, setResult] = useState(null);
  const stats = useTextStats(text);
  const navigate = useNavigate();

  const handleProcess = async (type) => {
    if (text.trim().length < 5) {
      toast.error("Add at least 5 characters first.");
      return;
    }

    setLoadingType(type);

    try {
      const data = await processText(type, text);
      setResult(data);
      toast.success("Text processed and saved.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not process text.");
    } finally {
      setLoadingType("");
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300 sm:text-sm">Workspace</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-4xl">Dashboard</h1>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-400">
          Paste text once, choose a tool, and every result is saved automatically.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <StatCard label="Words" value={stats.words} icon={FiEdit3} />
        <StatCard label="Characters" value={stats.characters} icon={FiZap} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <Card>
          <div className="mb-3 flex items-center justify-between gap-3">
            <label className="block text-sm font-semibold text-slate-300">Input text</label>
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-400">
              {stats.words} words
            </span>
          </div>
          <textarea
            className="field min-h-[260px] resize-y leading-7 sm:min-h-[340px]"
            placeholder="Paste or write text to transform..."
            value={text}
            onChange={(event) => setText(event.target.value)}
          />

          <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
            {tools.map((tool) => (
              <Button key={tool.type} className="px-3" onClick={() => handleProcess(tool.type)} disabled={Boolean(loadingType)}>
                <tool.icon />
                <span className="truncate">{loadingType === tool.type ? "Working..." : tool.label}</span>
              </Button>
            ))}
          </div>

          <Button variant="secondary" className="mt-3 w-full sm:w-auto" onClick={() => setText("")}>
            <FiTrash2 />
            Clear Text
          </Button>
        </Card>

        <Card>
          <div className="mb-4 flex min-h-8 items-center justify-between gap-3">
            <h2 className="text-lg font-bold sm:text-xl">Result preview</h2>
            {loadingType && <Spinner label="Processing" />}
          </div>

          {result ? (
            <div className="space-y-4">
              <div className="max-h-[420px] overflow-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm leading-7 text-slate-200">
                {result.processedText}
              </div>
              <Button className="w-full" onClick={() => navigate("/result", { state: result })}>
                Open Result
              </Button>
            </div>
          ) : (
            <div className="grid min-h-64 place-items-center rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-6 text-center text-sm text-slate-400">
              Processed text will appear here after you run a tool.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
