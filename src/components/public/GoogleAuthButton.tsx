import { useRef, useState } from "react";
import { useAuthStore } from "../../stores";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import GoogleIcon from "../../assets/google-icon.svg";
import api from "../../lib/api";
import toast from "react-hot-toast";

interface GoogleAuthButtonProps {
  mode: "login" | "register";
  disabled?: boolean;
}

const GoogleAuthButton = ({ mode, disabled }: GoogleAuthButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();
  const googleButtonRef = useRef<HTMLDivElement>(null);

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      setLoading(true);

      const res = await api.post("/auth/google-login", {
        credential: credentialResponse.credential,
      });

      console.log(res);

      setUser(res.data.user);

      toast.success(`${mode === "login" ? "Login" : "Sign up"} successful!`);
      navigate("/dashboard", { replace: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Google auth error: ", error);
      const errorMessage =
        error.response?.data?.message ||
        `Google ${mode} failed. Please try again.`;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleError = () => {
    toast.error("Google authentication failed. Please try again.");
  };

  const triggeredGoogleLogin = () => {
    if (!disabled && !loading) {
      const googleBtn = googleButtonRef.current?.querySelector(
        'div[role="button"]'
      ) as HTMLElement;

      if (googleBtn) {
        googleBtn.click();
      }
    }
  };

  const getButtonText = () => {
    if (loading) return "Loading...";

    return mode === "login" ? "Sign in with Google" : "Sign up with Google";
  };

  return (
    <div className="relative">
      <button
        onClick={triggeredGoogleLogin}
        disabled={disabled || loading}
        className="flex justify-center items-center mx-auto font-display bg-zinc-200 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 h-10 w-full cursor-pointer rounded-lg transition text-sm border border-zinc-700 active:scale-95 hover:bg-zinc-200 hover:dark:bg-zinc-800 focus:outline-2 focus:outline-offset-0 focus:outline-zinc-50 disabled:cursor-not-allowed disabled:active:scale-100 gap-2"
      >
        <img src={GoogleIcon} alt="Google icon" className="w-6" />
        <p className="text-md font-semibold">{getButtonText()}</p>
      </button>

      <div
        ref={googleButtonRef}
        className="absolute opacity-0 pointer-events-none -z-10"
      >
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          size="large"
        />
      </div>
    </div>
  );
};

export default GoogleAuthButton;
