import { FiCalendar, FiMail, FiUser } from "react-icons/fi";
import Card from "../components/Card.jsx";
import StatCard from "../components/StatCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300 sm:text-sm">Account</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-4xl">Profile</h1>
      </div>

      <Card>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl bg-gradient-to-br from-cyan-300 to-violet-500 text-2xl font-black text-slate-950 sm:h-24 sm:w-24 sm:text-3xl">
            {user?.name?.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-2xl font-bold">{user?.name}</h2>
            <p className="mt-2 truncate text-slate-400">{user?.email}</p>
          </div>
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
        <StatCard label="Name" value={user?.name || "User"} icon={FiUser} />
        <StatCard label="Email" value="Verified" icon={FiMail} />
        <StatCard label="Joined" value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Today"} icon={FiCalendar} />
      </div>
    </div>
  );
};

export default Profile;
