import { zodResolver } from "@hookform/resolvers/zod";
import { Quantum } from "ldrs/react";
import "ldrs/react/Quantum.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { z } from "zod";
import { api } from "../../lib/api";
import { Mail } from "lucide-react";

const resetSchema = z.object({
  email: z.email("Invalid email format."),
});

type ResetFormData = z.infer<typeof resetSchema>;

const RequestResetForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState("");

  const {
    register: resetRegister,
    handleSubmit: handleRestSubmit,
    getValues: getResetValues,
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
  });

  const onReset = async (data: ResetFormData) => {
    try {
      setLoading(true);
      // console.log(JSON.stringify(data));
      /*
        {
          "email": "email",
          "password": "password"
        }
      */

      await new Promise((resolve) => setTimeout(resolve, 500)); //! REMOVE LATER

      const res = await api.post("/auth/forgot-password", {
        email: data.email,
      });

      console.log("email: ", getResetValues("email"));

      if (res.status === 200) {
        toast.success(res.data?.message);
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
        toast.error("Your request failed with an unknown error.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onGoBack = () => {
    try {
      navigate(-1);
    } catch (error) {
      console.error("Error going back: ", error);
    }
  };

  return (
    <div className="flex flex-col mt-4 justify-center w-[20rem] mx-auto">
      <form
        onSubmit={handleRestSubmit(onReset)}
        className="flex flex-col gap-4"
      >
        <div className="relative">
          <Mail
            size={16}
            className="absolute left-2 top-1/2 -translate-y-1/2"
            color="#9f9fa9"
          />

          <input
            type="email"
            {...resetRegister("email")}
            placeholder="Email"
            required
            className="bg-zinc-50 dark:bg-zinc-950 p-2 pl-8 pr-10 rounded-lg border border-zinc-800 focus:border-transparent text-zinc-900 dark:text-zinc-100 w-full font-display placeholder:text-zinc-400"
          />
        </div>

        <button
          type="submit"
          className="flex justify-center items-center mx-auto font-display bg-zinc-800 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-800 h-10 w-full cursor-pointer rounded-lg transition text-sm border border-zinc-700 active:scale-95 hover:bg-zinc-200 hover:dark:bg-zinc-800 hover:text-zinc-800 hover:dark:text-zinc-200 focus:outline-2 focus:outline-offset-0 focus:outline-zinc-50 disabled:cursor-not-allowed disabled:active:scale-100"
          disabled={loading}
        >
          {loading ? (
            <Quantum size={20} color="currentColor" />
          ) : (
            <p className="text-md font-semibold">Send Reset Link</p>
          )}
        </button>
      </form>

      <div className="mt-4 mx-auto">
        <button
          className="text-sm font-display text-[#52A8FF] cursor-pointer transition hover:underline"
          disabled={loading}
          onClick={onGoBack}
        >
          ⟵ Back
        </button>
      </div>
    </div>
  );
};

export default RequestResetForm;
