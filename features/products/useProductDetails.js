import { useQuery } from "@tanstack/react-query";
import { getProductData } from "../../services/flipKartApi";

export default function useProductDetails(productId) {
  const {
    data: product,
    isLoading: isLoadingProduct,
    error,
  } = useQuery({
    queryKey: [],
    queryFn: () => getProductData(productId),
    retry: false,
  });
  return { product, isLoadingProduct, error };
}
