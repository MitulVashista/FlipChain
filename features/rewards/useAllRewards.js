import { useQuery } from "@tanstack/react-query";
import { getRewardsData } from "../../services/flipKartApi";

export default function useAllRewards() {
  const {
    data: { brandsRewards, brandNames } = {},
    isLoading: isLoadingRewards,
    error,
  } = useQuery({
    queryKey: ["rewards", "brands"],
    queryFn: () => getRewardsData(),
    retry: false,
  });
  return { brandsRewards, brandNames, isLoadingRewards, error };
}
