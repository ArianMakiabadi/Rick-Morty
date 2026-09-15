import axios from "axios";
import toast from "react-hot-toast";

export function handleAxiosError(
  error: unknown,
  fallbackMessage = "Something went wrong",
): void {
  if (axios.isCancel(error)) return;

  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.error || fallbackMessage;
    toast.error(message);
    return;
  }

  toast.error("Unexpected error");
}
