import { useQuery } from "@tanstack/react-query";
import { getUserRewards } from "../../services/flipKartApi";

export default function useUserRewards() {
  const {
    data: userRewards,
    isLoading: isLoadingUserRewards,
    error,
  } = useQuery({
    queryKey: ["userRewards"],
    queryFn: () => getUserRewards(),
    retry: false,
  });
  return { isLoadingUserRewards, userRewards, error };
}
