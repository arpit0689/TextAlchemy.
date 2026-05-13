import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { FiActivity, FiBarChart2, FiTrendingUp } from "react-icons/fi";
import Card from "../components/Card.jsx";
import EmptyState from "../components/EmptyState.jsx";
import Skeleton from "../components/Skeleton.jsx";
import StatCard from "../components/StatCard.jsx";
import { fetchAnalytics } from "../services/textService.js";

const chartTheme = {
  stroke: "rgba(148, 163, 184, 0.22)",
  text: "#94a3b8",
  cyan: "#22d3ee",
  violet: "#8b5cf6"
};

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setAnalytics(await fetchAnalytics());
      } catch (error) {
        toast.error(error.response?.data?.message || "Analytics could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4">
        <Skeleton className="h-24" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (!analytics?.totalUsage) {
    return <EmptyState title="No analytics yet" description="Run a few text tools to see usage charts." />;
  }

  const typeData = analytics.byType.map((item) => ({ name: item._id, count: item.count }));
  const dailyData = analytics.dailyActivity.map((item) => ({ date: item._id.slice(5), count: item.count }));

  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300 sm:text-sm">Insights</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-4xl">Analytics</h1>
      </div>

      <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
        <StatCard label="Total Usage" value={analytics.totalUsage} icon={FiActivity} />
        <StatCard label="Most Used Tool" value={analytics.mostUsedTool} icon={FiTrendingUp} />
        <StatCard label="Weekly Stats" value={dailyData.reduce((sum, item) => sum + item.count, 0)} icon={FiBarChart2} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <h2 className="mb-5 text-xl font-bold">Most used tools</h2>
          <div className="h-72 min-w-0 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={typeData}>
                <CartesianGrid stroke={chartTheme.stroke} />
                <XAxis dataKey="name" stroke={chartTheme.text} />
                <YAxis stroke={chartTheme.text} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#020617", border: "1px solid rgba(255,255,255,0.1)" }} />
                <Bar dataKey="count" fill={chartTheme.violet} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h2 className="mb-5 text-xl font-bold">Daily activity</h2>
          <div className="h-72 min-w-0 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData}>
                <CartesianGrid stroke={chartTheme.stroke} />
                <XAxis dataKey="date" stroke={chartTheme.text} />
                <YAxis stroke={chartTheme.text} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#020617", border: "1px solid rgba(255,255,255,0.1)" }} />
                <Line type="monotone" dataKey="count" stroke={chartTheme.cyan} strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
