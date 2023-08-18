import { useQuery } from "@tanstack/react-query";
import { getBrandsData } from "../../services/flipKartApi";

export default function useBrandsDetails() {
  const {
    data: brandsData,
    isLoading: isLoadingBrands,
    error,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: () => getBrandsData(),
    retry: false,
  });
  return { brandsData, isLoadingBrands, error };
}
