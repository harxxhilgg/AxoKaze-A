import toast from "react-hot-toast";

export const useApiCall = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleApiError = (error: any) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    switch (status) {
      case 401:
        toast.error(message || "Unauthorized");
        break;
      case 404:
        toast.error(message || "Not found");
        break;
      case 429:
        toast.error(message || "Too many requests");
        break;
      case 500:
        toast.error(message || "Server error");
        break;
      default:
        toast.error("An unknown error occurred");
    }
  };

  return { handleApiError };
};
