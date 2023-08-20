import { useQuery } from "@tanstack/react-query";
import { getBrandRewardsData } from "../../services/flipKartApi";

export default function useDisplayRewards(brandId) {
  const {
    data: rewardsIds,
    isLoading: isLoadingRewards,
    error,
  } = useQuery({
    queryKey: ["rewards", "brands"],
    queryFn: () => getBrandRewardsData(brandId),
    retry: false,
  });
  return { rewardsIds, isLoadingRewards, error };
}
