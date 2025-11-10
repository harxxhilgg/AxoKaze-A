import { useNavigate } from "react-router-dom";
import { Quantum, LineSpinner } from "ldrs/react";
import "ldrs/react/Quantum.css";
import "ldrs/react/LineSpinner.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import logoIcon from "../../assets/supertokens-icon.svg";

const Landing = () => {
  useDocumentTitle("Welcome to AxoKaze");
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const onGoLogin = async () => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000)); //! remove in prod

      navigate("/login", { replace: false });
    } catch (e: unknown) {
      console.error("Error going login page: ", e);
    } finally {
      setLoading(false);
    }
  };

  const onGoRegister = async () => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000)); //! remove in prod

      navigate("/register", { replace: false });
    } catch (e: unknown) {
      console.error("Error going register page: ", e);
    } finally {
      setLoading(false);
    }
  };

  const onShowToast = async () => {
    try {
      const random = Math.random();

      if (random > 0.5) {
        toast.success("Hell yeah");
      } else {
        toast.error("Hell no");
      }
    } catch (e: unknown) {
      console.error("Unknown error: ", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative grid min-h-screen grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] [--pattern-fg:var(--color-zinc-950)]/5 dark:[--pattern-fg:var(--color-zinc-50)]/10 selection:bg-zinc-50/15 transition-all">
      <div className="col-start-3 row-start-3 flex max-w-lg flex-col p-2 bg-gray-100 dark:bg-white/10">
        <div className="flex flex-col justify-center items-center p-10 bg-zinc-100 dark:bg-zinc-950/70 text-center">
          {/* ------------------------------------ */}

          <img src={logoIcon} alt="AxoKaze Logo" className="w-20 mb-8" />

          <h1 className="mb-10 text-2xl font-display font-semibold">
            Landing Page
          </h1>

          <div className="flex items-center gap-4 mt-4">
            <button
              className="flex justify-center items-center font-display bg-zinc-800 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-800 h-10 w-30 cursor-pointer rounded-lg transition text-sm border border-zinc-700 active:scale-95 hover:bg-zinc-200 hover:dark:bg-zinc-800 hover:text-zinc-800 hover:dark:text-zinc-200 focus:outline-2 focus:outline-offset-0 focus:outline-zinc-50 disabled:cursor-not-allowed disabled:active:scale-100"
              onClick={onGoLogin}
              disabled={loading}
            >
              {loading ? (
                <Quantum size={24} color="currentColor" />
              ) : (
                <p className="text-sm">Go to Login</p>
              )}
            </button>

            <button
              className="flex justify-center items-center font-display bg-zinc-800 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-800 h-10 w-40 cursor-pointer rounded-lg transition text-sm border border-zinc-700 active:scale-95 hover:bg-zinc-200 hover:dark:bg-zinc-800 hover:text-zinc-800 hover:dark:text-zinc-200 focus:outline-2 focus:outline-offset-0 focus:outline-zinc-50 disabled:cursor-not-allowed disabled:active:scale-100"
              onClick={onGoRegister}
              disabled={loading}
            >
              {loading ? (
                <LineSpinner size={26} stroke={2.5} color="currentColor" />
              ) : (
                <p className="text-sm">Go to Register</p>
              )}
            </button>

            <button
              className="flex justify-center items-center font-display bg-zinc-800 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-800 h-10 w-30 cursor-pointer rounded-lg transition text-sm border border-zinc-700 active:scale-95 hover:bg-zinc-200 hover:dark:bg-zinc-800 hover:text-zinc-800 hover:dark:text-zinc-200 focus:outline-2 focus:outline-offset-0 focus:outline-zinc-50 disabled:cursor-not-allowed disabled:active:scale-100"
              onClick={onShowToast}
              disabled={loading}
            >
              <p className="text-sm">Show Toast</p>
            </button>
          </div>

          {/* ------------------------------------ */}
        </div>
      </div>
      <div className="relative -right-px col-start-2 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed"></div>
      <div className="relative -left-px col-start-4 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed"></div>
      <div className="relative -bottom-px col-span-full col-start-1 row-start-2 h-px bg-(--pattern-fg)"></div>
      <div className="relative -top-px col-span-full col-start-1 row-start-4 h-px bg-(--pattern-fg)"></div>
    </div>
  );
};

export default Landing;
