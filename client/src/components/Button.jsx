import { motion } from "framer-motion";

const variants = {
  primary: "bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 text-slate-950 shadow-lg shadow-cyan-500/20 hover:brightness-110",
  secondary: "border border-white/10 bg-white/[0.07] text-slate-100 hover:bg-white/[0.12]",
  danger: "border border-rose-400/30 bg-rose-500/10 text-rose-100 hover:bg-rose-500/20"
};

const Button = ({ children, className = "", variant = "primary", disabled, ...props }) => {
  return (
    <motion.button
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      disabled={disabled}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
