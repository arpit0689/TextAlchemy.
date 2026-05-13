import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";

const NotFound = () => {
  return (
    <main className="grid min-h-screen place-items-center px-4 text-center">
      <div className="glass max-w-lg rounded-3xl p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">404</p>
        <h1 className="mt-3 text-4xl font-bold">Page not found</h1>
        <p className="mt-3 text-slate-400">The page you are looking for is not available.</p>
        <Link to="/dashboard">
          <Button className="mt-6">Go to Dashboard</Button>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
