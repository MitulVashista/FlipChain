import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../../services/flipKartApi";

export default function useUserDetails() {
  const {
    data: { userDetails, userTokenBalance } = {},
    isLoading: isLoadingUser,
    error,
  } = useQuery({
    queryKey: ["userDetails"],
    queryFn: () => getUserData(),
    retry: false,
  });
  return { isLoadingUser, userDetails, userTokenBalance, error };
}
