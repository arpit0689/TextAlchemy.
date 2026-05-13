import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiArrowLeft, FiCopy, FiDownload } from "react-icons/fi";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { downloadTextFile } from "../utils/download.js";

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <EmptyState title="No result selected" description="Process text from the dashboard or open a saved item." />;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(state.processedText);
    toast.success("Copied to clipboard.");
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      <Button variant="secondary" onClick={() => navigate(-1)}>
        <FiArrowLeft />
        Back
      </Button>

      <Card>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300 sm:text-sm">{state.processType}</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Processed Result</h1>
            <p className="mt-1 text-sm text-slate-400">{new Date(state.createdAt).toLocaleString()}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:flex">
            <Button variant="secondary" className="w-full" onClick={handleCopy}>
              <FiCopy />
              Copy
            </Button>
            <Button className="w-full" onClick={() => downloadTextFile(state.processedText)}>
              <FiDownload />
              Download
            </Button>
          </div>
        </div>

        <article className="max-h-[68vh] overflow-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm leading-7 text-slate-100 sm:p-5 sm:text-base sm:leading-8">
          {state.processedText}
        </article>
      </Card>
    </div>
  );
};

export default Result;
