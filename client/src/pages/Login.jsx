import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiLogIn } from "react-icons/fi";
import AuthShell from "../components/AuthShell.jsx";
import Button from "../components/Button.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await login(form);
      toast.success("Welcome back to TextAlchemy.");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in to your workspace"
      subtitle="Continue refining drafts, saving results, and tracking your text activity."
      footerText="New here?"
      footerLink="/register"
      footerLabel="Create an account"
    >
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <input
          className="field"
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          required
        />
        <input
          className="field"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(event) => setForm({ ...form, password: event.target.value })}
          required
        />
        <Button type="submit" className="w-full" disabled={loading}>
          <FiLogIn />
          {loading ? "Signing in..." : "Login"}
        </Button>
      </form>
    </AuthShell>
  );
};

export default Login;
