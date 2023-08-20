import { useQuery } from "@tanstack/react-query";
import { getBrandsData } from "../../services/flipKartApi";

export default function useBrandsDetails() {
  const {
    data: { brandsDetails, productsDetails } = {},
    isLoading: isLoadingBrandsDetails,
    error,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: () => getBrandsData(),
    retry: false,
  });
  return { brandsDetails, productsDetails, isLoadingBrandsDetails, error };
}
