import { useNavigate } from "react-router-dom";
import { Quantum } from "ldrs/react";
import "ldrs/react/Quantum.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, HatGlasses, Lock, Mail } from "lucide-react";
import logoIcon from "../../assets/supertokens-icon.svg";
import toast from "react-hot-toast";
import api from "../../lib/api";
import { useAuthStore } from "../../stores";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import GoogleAuthButton from "../../components/public/GoogleAuthButton";

const loginSchema = z.object({
  email: z.email("Invalid email format."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits."),
});

type LoginFormData = z.infer<typeof loginSchema>;
type OTPFormData = z.infer<typeof otpSchema>;

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins}:${String(secs).padStart(2, "0")}`;
};

const Login = () => {
  useDocumentTitle("Login - AxoKaze");
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [showPass, setShowPass] = useState<boolean>(false);
  const [step, setStep] = useState<"creds" | "otp">("creds");
  const [resendTimer, setResendTimer] = useState<number>(0);
  const [canResendOtp, setCanResendOtp] = useState<boolean>(true);

  useEffect(() => {
    let interval = null;

    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResendOtp(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [resendTimer]);

  const {
    register: credRegister,
    handleSubmit: handleLoginSubmit,
    getValues: getCredValues,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: otpRegister,
    handleSubmit: handleOTPSubmit,
    // formState: { errors: otpErrors },
  } = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
  });

  const onLogin = async (data: LoginFormData) => {
    try {
      setLoading(true);
      setEmail(data.email);
      // console.log(JSON.stringify(data));
      /*
        {
          "email": "email",
          "password": "password"
        }
      */

      await new Promise((resolve) => setTimeout(resolve, 500)); // REMOVE LATER IN PROD

      const res = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      if (res.status === 200) {
        toast.success(res.data?.message);
        setStep("otp");

        // START TIMER WHEN OTP SENT
        setResendTimer(60);
        setCanResendOtp(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.response?.status === 401) {
        toast.error(e.response?.data?.message);
      } else if (e.response?.status === 404) {
        toast.error(e.response?.data?.message);
      } else if (e.response?.status === 429) {
        toast.error(e.response?.data?.message);
      } else if (e.response?.status === 500) {
        toast.error(e.response?.data?.message);
      } else if (e.response?.status === 400) {
        toast.error(e.response?.data?.message);
      } else {
        toast.error("Login failed with an unknown error.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onGoForgotPassword = async () => {
    navigate("/forgot-password");
  };

  const onOtpEnter = async (data: OTPFormData) => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 500)); // REMOVE LATER IN PROD

      const res = await api.post("/auth/verify-otp", {
        email: getCredValues("email"),
        otp: data.otp,
      });

      if (res.status === 200) {
        toast.success(res.data.message || "OTP verified succesfully!");

        // STORE USER DATA IN ZUSTAND
        setUser(res.data.user);

        // NAVIGATE TO DASHBOARD
        navigate("/dashboard", { replace: true });
      } else {
        toast.error(res.data?.message || "OTP verification failed.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.response?.status === 401) {
        toast.error(e.response?.data?.message);
      } else if (e.response?.status === 404) {
        toast.error(e.response?.data?.message);
      } else if (e.response?.status === 429) {
        toast.error(e.response?.data?.message);
      } else if (e.response?.status === 500) {
        toast.error(e.response?.data?.message);
      } else if (e.response?.status === 400) {
        toast.error(e.response?.data?.message);
      } else {
        toast.error("Verification failed with an unknown error.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onResendOTP = async () => {
    try {
      setLoading(true);

      const res = await api.post("/auth/resend-otp", {
        email: getCredValues("email"),
      });

      if (res.status === 200) {
        toast.success(res.data.message || "OTP Resent successfully.");

        // START TIMER AFTER SUCCESSFUL RESEND
        setResendTimer(60);
        setCanResendOtp(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.response?.status === 429) {
        const messgae = e.response?.data?.message || "";
        const match = messgae.match(/(\d+)\s*seconds/);

        if (match) {
          const remainingSeconds = parseInt(match[1]);
          setResendTimer(remainingSeconds);
          setCanResendOtp(false);
        }

        toast.error(e.response?.data?.message);
      } else if (e.response?.status === 404) {
        toast.error(e.response?.data?.message);
      } else if (e.response?.status === 500) {
        toast.error(e.response?.data?.message);
      } else if (e.response?.status === 400) {
        toast.error(e.response?.data?.message);
      } else {
        toast.error("Resend OTP failed with an unknown error.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onGoBack = async () => {
    try {
      setStep("creds");
    } catch (error) {
      console.error("Error going back: ", error);
    }
  };

  const onGoRegister = () => {
    try {
      navigate("/register");
    } catch (e: unknown) {
      console.error("Error going signup page: ", e);
    }
  };

  return (
    <div className="relative grid min-h-screen grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] [--pattern-fg:var(--color-zinc-950)]/5 dark:[--pattern-fg:var(--color-zinc-50)]/10 selection:bg-zinc-50/15 transition-all">
      <div className="col-start-3 row-start-3 w-180 flex flex-col bg-gray-100 dark:bg-white/10">
        <div className="flex flex-col justify-center items-center p-10 bg-zinc-100 dark:bg-zinc-950/70 text-center">
          {/* ------------------------------------ */}

          <img src={logoIcon} alt="AxoKaze Logo" className="w-20 mb-8" />

          <h1 className="mb-6 text-2xl font-display font-bold">
            {step === "creds" ? "Log in to AxoKaze" : "Verification"}
          </h1>

          {step === "creds" && (
            <p className="font-display text-md text-zinc-600 dark:text-zinc-400">
              Don't have an account yet?{" "}
              <span>
                <button
                  className="text-zinc-900 dark:text-zinc-50 cursor-pointer hover:underline"
                  onClick={onGoRegister}
                >
                  Sign up
                </button>
              </span>
            </p>
          )}

          {step === "otp" && (
            <p className="font-display text-md text-zinc-600 dark:text-zinc-400">
              If you have an account, we have sent a code to{" "}
              <span className="font-bold text-zinc-900 dark:text-zinc-300">
                {email || "your email"}
              </span>
              . Enter it below.
            </p>
          )}

          <div className="flex flex-col justify-center items-center mt-8">
            {step === "creds" && (
              <form
                onSubmit={handleLoginSubmit(onLogin)}
                className="flex flex-col gap-4 w-100 mb-4"
              >
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-2 top-1/2 -translate-y-1/2"
                    color="#9f9fa9"
                  />

                  <input
                    type="email"
                    {...credRegister("email")}
                    placeholder="Email"
                    required
                    className="bg-zinc-50 dark:bg-zinc-950 p-2 pl-8 pr-10 rounded-lg border border-zinc-800 focus:border-transparent text-zinc-900 dark:text-zinc-100 w-full font-display placeholder:text-zinc-400"
                  />
                  {/* SHOULD NOT BE HERE ~ INSTEAD PUT IT IN REGISTER */}
                  {/* {credErrors.email && (
                    <p className="text-red-500">{credErrors.email.message}</p>
                  )} */}
                </div>

                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-2 top-1/2 -translate-y-1/2"
                    color="#9f9fa9"
                  />

                  <input
                    {...credRegister("password")}
                    type={showPass ? "text" : "password"}
                    placeholder="Password"
                    required
                    className="bg-zinc-50 dark:bg-zinc-950 p-2 pl-8 pr-10 rounded-lg border border-zinc-800 focus:border-transparent text-zinc-900 dark:text-zinc-100 w-full font-display placeholder:text-zinc-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-200 cursor-pointer transition"
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>

                  <button
                    type="button"
                    className="font-display text-sm absolute right-0 top-12 cursor-pointer hover:underline transition disabled:cursor-not-allowed disabled:no-underline active:scale-95 text-zinc-600 dark:text-zinc-400"
                    onClick={onGoForgotPassword}
                  >
                    Forgot Password?
                  </button>
                </div>
                {/* SHOULD NOT BE HERE ~ INSTEAD PUT IT IN REGISTER */}
                {/* {credErrors.password && (
                  <p className="text-red-500">{credErrors.password.message}</p>
                )} */}

                <button
                  type="submit"
                  className="flex justify-center items-center mx-auto mt-6 font-display bg-zinc-800 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-800 h-10 w-full cursor-pointer rounded-lg transition text-sm border border-zinc-700 active:scale-95 hover:bg-zinc-200 hover:dark:bg-zinc-800 hover:text-zinc-800 hover:dark:text-zinc-200 focus:outline-2 focus:outline-offset-0 focus:outline-zinc-50 disabled:cursor-not-allowed disabled:active:scale-100"
                  disabled={loading}
                >
                  {loading ? (
                    <Quantum size={20} color="currentColor" />
                  ) : (
                    <p className="text-md font-semibold">Continue</p>
                  )}
                </button>

                <div className="flex items-center justify-center w-full my-2">
                  <div className="flex-1 h-0.5 bg-zinc-800 rounded-full"></div>
                  <p className="mx-2 text-sm text-zinc-500 leading-none font-semibold font-display">
                    OR
                  </p>
                  <div className="flex-1 h-0.5 bg-zinc-800 rounded-full"></div>
                </div>

                <GoogleAuthButton mode="login" disabled={loading} />
              </form>
            )}

            {step === "otp" && (
              <>
                <form
                  onSubmit={handleOTPSubmit(onOtpEnter)}
                  className="flex flex-col gap-4 w-90 mb-4"
                >
                  <div className="relative">
                    <HatGlasses
                      size={20}
                      className="absolute left-2 top-1/2 -translate-y-1/2"
                      color="#9f9fa9"
                    />

                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      {...otpRegister("otp")}
                      className="bg-zinc-50 dark:bg-zinc-950 text-md p-2 pl-8 pr-10 rounded-lg border border-zinc-800 focus:border-transparent text-zinc-900 dark:text-zinc-100 w-full font-display placeholder:text-zinc-400"
                      placeholder="******"
                      required
                      maxLength={6}
                      minLength={6}
                    />

                    {/* {otpErrors.otp && (
                      <p className="text-red-500 mx-auto font-display mt-4">
                        {otpErrors.otp.message}
                      </p>
                    )} */}
                  </div>

                  <button
                    type="submit"
                    className="flex justify-center items-center mx-auto font-display bg-zinc-800 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-800 h-10 w-full cursor-pointer rounded-lg transition text-sm border border-zinc-700 active:scale-95 hover:bg-zinc-200 hover:dark:bg-zinc-800 hover:text-zinc-800 hover:dark:text-zinc-200 focus:outline-2 focus:outline-offset-0 focus:outline-zinc-50 disabled:cursor-not-allowed disabled:active:scale-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <Quantum size={20} color="currentColor" />
                    ) : (
                      <p className="text-md font-semibold">Continue</p>
                    )}
                  </button>
                </form>

                <p className="font-display text-sm mx-auto text-zinc-600 dark:text-zinc-400">
                  Didn't receive an OTP?{" "}
                  {canResendOtp ? (
                    <span>
                      <button
                        className="font-medium cursor-pointer text-[#52A8FF] hover:underline transition disabled:cursor-not-allowed disabled:text-zinc-500 disabled:no-underline"
                        onClick={onResendOTP}
                        disabled={loading || !canResendOtp}
                      >
                        Resend
                      </button>
                    </span>
                  ) : (
                    <span className="font-medium text-zinc-400">
                      Resend in {formatTime(resendTimer)}
                    </span>
                  )}
                </p>

                <button
                  className="text-sm text-[#52A8FF] font-display mt-3 cursor-pointer transition hover:underline"
                  disabled={loading}
                  onClick={onGoBack}
                >
                  ⟵ Back
                </button>
              </>
            )}
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

export default Login;
