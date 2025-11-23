import { zodResolver } from "@hookform/resolvers/zod";
import { Quantum } from "ldrs/react";
import "ldrs/react/Quantum.css";
import { CheckCheck, Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { z } from "zod";
import { api } from "../../lib/api";
import PasswordResetPopup from "./Popups/PasswordResetPopup";

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
        `Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character.`
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

const NewPasswordForm = ({ token }: { token: string }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const {
    register: passwordRegister,
    handleSubmit: handlePasswordSubmit,
    getValues: getPasswordValues,
    formState: { errors: passwordErrors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async () => {
    try {
      setLoading(true);
      // console.log(JSON.stringify(data));
      /*
        {
          "password":"harshilpatel",
          "confirmPassword":"harshilpatel"
        }
      */

      await new Promise((resolve) => setTimeout(resolve, 500)); // REMOVE LATER

      const res = await api.post("/auth/reset-password", {
        token: token,
        newPassword: getPasswordValues("password"), // could use `confirmPassword` as well
      });

      if (res.status === 200) {
        toast.success(res.data?.message);
        setShowSuccess(true);
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

  const onGoLogin = () => {
    try {
      navigate("/login", { replace: true });
    } catch (e) {
      console.log("Error going login page.", e);
      toast.error("Error going login page.");
    }
  };

  return (
    <>
      {showSuccess && <PasswordResetPopup />}

      <div className="flex flex-col mt-4 justify-center w-100 mx-auto">
        <form
          onSubmit={handlePasswordSubmit(onSubmit)}
          className="flex flex-col gap-4 duration-300"
        >
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-2 top-1/2 -translate-y-1/2"
              color="#9f9fa9"
            />

            <input
              type="text"
              {...passwordRegister("password")}
              placeholder="New Password"
              required
              className="bg-zinc-50 dark:bg-zinc-950 p-2 pl-8 pr-10 rounded-lg border border-zinc-800 focus:border-transparent text-zinc-900 dark:text-zinc-100 w-full font-display placeholder:text-zinc-400"
            />
          </div>

          {passwordErrors.password && (
            <p className="text-red-500 font-display text-left">
              {passwordErrors.password.message}
            </p>
          )}

          <div className="relative">
            <CheckCheck
              size={18}
              className="absolute left-2 top-1/2 -translate-y-1/2"
              color="#9f9fa9"
            />

            <input
              type={showPass ? "text" : "password"}
              {...passwordRegister("confirmPassword")}
              placeholder="Confirm New Password"
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

          {passwordErrors.confirmPassword && (
            <p className="text-red-500 font-display text-left">
              {passwordErrors.confirmPassword.message}
            </p>
          )}

          <button
            type="submit"
            className="flex justify-center items-center mx-auto mt-2 font-display bg-zinc-800 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-800 h-10 w-full cursor-pointer rounded-lg transition text-sm border border-zinc-700 active:scale-95 hover:bg-zinc-200 hover:dark:bg-zinc-800 hover:text-zinc-800 hover:dark:text-zinc-200 focus:outline-2 focus:outline-offset-0 focus:outline-zinc-50 disabled:cursor-not-allowed disabled:active:scale-100"
            disabled={loading}
          >
            {loading ? <Quantum size={20} /> : <p>Change Password</p>}
          </button>
        </form>

        <div className="mt-4 mx-auto">
          <button
            className="text-sm font-display text-[#52A8FF] cursor-pointer transition hover:underline"
            disabled={loading}
            onClick={onGoLogin}
          >
            ⟵ Go to Login
          </button>
        </div>
      </div>
    </>
  );
};

export default NewPasswordForm;
