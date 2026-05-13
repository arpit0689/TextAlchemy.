import { Link } from "react-router-dom";

const AuthShell = ({ children, eyebrow, title, subtitle, footerText, footerLink, footerLabel }) => {
  return (
    <main className="auth-bg flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-[430px]">
        <Link to="/" className="mb-9 flex justify-center text-center">
          <span className="text-[2.65rem] font-extrabold leading-none tracking-tight text-white sm:text-5xl">
            TextAlchemy
          </span>
        </Link>

        <section className="glass-panel rounded-[28px] p-5 sm:p-7">
          <div className="mb-7 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">{eyebrow}</p>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h1>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-400">{subtitle}</p>
          </div>

          {children}

          <p className="mt-6 text-center text-sm text-slate-400">
            {footerText}{" "}
            <Link className="font-semibold text-cyan-300 transition hover:text-cyan-200" to={footerLink}>
              {footerLabel}
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default AuthShell;
