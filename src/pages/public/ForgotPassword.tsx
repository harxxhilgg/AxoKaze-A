import { useSearchParams } from "react-router-dom";
import logoIcon from "../../assets/supertokens-icon.svg";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import RequestResetForm from "../../components/public/RequestResetForm";
import NewPasswordForm from "../../components/public/NewPasswordForm";

const ForgotPassword = () => {
  useDocumentTitle("Reset Password - AxoKaze");
  const [params] = useSearchParams();
  const token = params.get("token");
  const step = token ? "resetPassword" : "forgotPassword"; // not using useState because we don't want any flicker when component mounts

  return (
    <div className="relative grid min-h-screen grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] [--pattern-fg:var(--color-zinc-950)]/5 dark:[--pattern-fg:var(--color-zinc-50)]/10 selection:bg-zinc-50/15 transition-all">
      <div className="col-start-3 row-start-3 w-150 flex flex-col bg-gray-100 dark:bg-white/10">
        <div className="flex flex-col justify-center items-center p-10 bg-zinc-100 dark:bg-zinc-950/70 text-center">
          {/* ------------------------------------ */}

          <img src={logoIcon} alt="AxoKaze Logo" className="w-20 mb-8" />

          <h1 className="mb-4 text-2xl font-display font-bold">
            Reset your Password
          </h1>

          {step === "forgotPassword" && (
            <>
              <p className="mx-auto font-display text-center text-md text-zinc-700 dark:text-zinc-400 mb-2">
                Enter the email address associated with your account, and we'll
                send a link to reset your password.
              </p>

              <RequestResetForm />
            </>
          )}

          {/* ADDING token! MEANS WE ARE SURE THAT AT THIS POINT TOKEN WILL BE THERE */}
          {step === "resetPassword" && (
            <>
              <p className="mx-auto font-display text-center text-md text-zinc-700 dark:text-zinc-400 mb-2">
                Create new password for your account to get back into your
                account.
              </p>

              <NewPasswordForm token={token!} />
            </>
          )}

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

export default ForgotPassword;
