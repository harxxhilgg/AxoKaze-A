import { Quantum } from "ldrs/react";
import "ldrs/react/Quantum.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail, UserRound } from "lucide-react";
import logoIcon from "../../assets/supertokens-icon.svg";
import toast from "react-hot-toast";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { useAuthStore } from "../../stores";
import GoogleAuthButton from "../../components/public/GoogleAuthButton";

const registerSchema = z.object({
  username: z
    .string()
    .min(6, "Username must be at least 6 characters long.")
    .max(20, "Username cannot exceed 20 characters.")
    // allowed characters (a-z, 0-9, ., _)
    .regex(
      /^[a-z0-9._]+$/,
      "Username can only contain lowercase letters, numbers, periods, and underscores."
    )
    // no 3 or more of the same character in a row
    .regex(
      /^(?!.*([a-z0-9._])\1{2,}).*$/,
      "Username cannot contain the same character repeated consecutively."
    ),
  email: z.email("Invalid email format."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    // requires lowercase, uppercase, number, special char
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
      "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character."
    ),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  useDocumentTitle("Login - AxoKaze");
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  const [loading, setLoading] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    // getValues: getRegisterValues,
    formState: { errors: registerErrors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onRegister = async (data: RegisterFormData) => {
    try {
      setLoading(true);

      const res = await api.post("/auth/register", {
        name: data.username,
        email: data.email,
        password: data.password,
      });

      if (res.status === 201) {
        toast.success(res.data?.message || "Account created successfully.");

        // STORE USER DATA IN ZUSTAND
        setUser(res.data.user);

        // NAVIGATE TO DASHBOARD
        navigate("/dashboard", { replace: true });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.response?.status === 401) {
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

  const onGoLogin = () => {
    try {
      navigate("/login", { replace: true });
    } catch (e) {
      console.error("Error going login page: ", e);
    }
  };

  return (
    <div className="relative grid min-h-screen grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] [--pattern-fg:var(--color-zinc-950)]/5 dark:[--pattern-fg:var(--color-zinc-50)]/10 selection:bg-zinc-50/15 transition-all">
      <div className="col-start-3 row-start-3 w-180 flex flex-col bg-gray-100 dark:bg-white/10">
        <div className="flex flex-col justify-center items-center p-10 bg-zinc-100 dark:bg-zinc-950/70 text-center">
          {/* ------------------------------------ */}

          <img src={logoIcon} alt="AxoKaze Logo" className="w-20 mb-8" />

          <h1 className="mb-6 text-2xl font-display font-bold">
            Create your AxoKaze Account
          </h1>

          <p className="font-display text-md text-zinc-600 dark:text-zinc-400">
            Already have an account?{" "}
            <span>
              <button
                className="text-zinc-900 dark:text-zinc-50 cursor-pointer hover:underline"
                onClick={onGoLogin}
              >
                Sign in
              </button>
            </span>
          </p>

          <div className="flex flex-col justify-center items-center mt-8">
            <form
              onSubmit={handleRegisterSubmit(onRegister)}
              className="flex flex-col gap-4 w-100 mb-4"
            >
              <div className="relative">
                <UserRound
                  size={18}
                  className="absolute left-2 top-1/2 -translate-y-1/2"
                  color="#9f9fa9"
                />

                <input
                  type="text"
                  {...registerRegister("username")}
                  placeholder="Username"
                  required
                  className="bg-zinc-50 dark:bg-zinc-950 p-2 pl-8 pr-10 rounded-lg border border-zinc-800 focus:border-transparent text-zinc-900 dark:text-zinc-100 w-full font-display placeholder:text-zinc-400"
                />
              </div>

              {registerErrors.username && (
                <p className="text-red-500 font-display text-left">
                  {registerErrors.username.message}
                </p>
              )}

              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-2 top-1/2 -translate-y-1/2"
                  color="#9f9fa9"
                />

                <input
                  type="email"
                  {...registerRegister("email")}
                  placeholder="Email"
                  required
                  className="bg-zinc-50 dark:bg-zinc-950 p-2 pl-8 pr-10 rounded-lg border border-zinc-800 focus:border-transparent text-zinc-900 dark:text-zinc-100 w-full font-display placeholder:text-zinc-400"
                />
              </div>

              {registerErrors.email && (
                <p className="text-red-500 font-display text-left">
                  {registerErrors.email.message}
                </p>
              )}

              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-2 top-1/2 -translate-y-1/2"
                  color="#9f9fa9"
                />

                <input
                  {...registerRegister("password")}
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
              </div>

              {registerErrors.password && (
                <p className="text-red-500 font-display text-left">
                  {registerErrors.password.message}
                </p>
              )}

              <button
                type="submit"
                className="flex justify-center items-center mx-auto mt-2 font-display bg-zinc-800 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-800 h-10 w-full cursor-pointer rounded-lg transition text-sm border border-zinc-700 active:scale-95 hover:bg-zinc-200 hover:dark:bg-zinc-800 hover:text-zinc-800 hover:dark:text-zinc-200 focus:outline-2 focus:outline-offset-0 focus:outline-zinc-50 disabled:cursor-not-allowed disabled:active:scale-100"
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

              <GoogleAuthButton mode="register" disabled={loading} />
            </form>
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

export default Register;
