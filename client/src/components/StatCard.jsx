const StatCard = ({ icon: Icon, label, value }) => {
  return (
    <div className="glass-panel rounded-2xl p-4">
      <div className="flex min-w-0 items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm text-slate-400">{label}</p>
          <p className="mt-2 truncate text-2xl font-bold tracking-tight text-white sm:text-3xl">{value}</p>
        </div>
        {Icon && <Icon className="shrink-0 text-2xl text-cyan-300 sm:text-3xl" />}
      </div>
    </div>
  );
};

export default StatCard;
