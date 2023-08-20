import { useQuery } from "@tanstack/react-query";
import { getBrandData } from "../../services/flipKartApi";

export default function useBrandDetails() {
  const {
    data: { brandData, ownerTokenBalance } = {},
    isLoading: isLoadingBrand,
    error,
  } = useQuery({
    queryKey: ["brand"],
    queryFn: () => getBrandData(),
    retry: false,
  });
  return { brandData, ownerTokenBalance, isLoadingBrand, error };
}
