import { useQuery } from "@tanstack/react-query";
import { isUser } from "../../services/flipKartApi";

export default function useIsUser() {
  const {
    data: user,
    isLoading: isCheckingUser,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => isUser(),
    retry: false,
  });
  return { isCheckingUser, user, error };
}
