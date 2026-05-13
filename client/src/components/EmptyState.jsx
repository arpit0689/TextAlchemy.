import { FiInbox } from "react-icons/fi";

const EmptyState = ({ title, description }) => {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-8 text-center">
      <FiInbox className="mb-3 text-4xl text-cyan-300" />
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-400">{description}</p>
    </div>
  );
};

export default EmptyState;
