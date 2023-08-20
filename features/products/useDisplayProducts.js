import { useQuery } from "@tanstack/react-query";
import { getBrandProductsData } from "../../services/flipKartApi";

export default function useDisplayProducts(brandId) {
  const {
    data: products,
    isLoading: isLoadingProducts,
    error,
  } = useQuery({
    queryKey: [],
    queryFn: () => getBrandProductsData(brandId),
    retry: false,
  });
  return { products, isLoadingProducts, error };
}
