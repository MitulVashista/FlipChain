import { useQuery } from "@tanstack/react-query";
import { isBrand } from "../../services/flipKartApi";

export default function useIsBrand() {
  const {
    data: brand,
    isLoading: isCheckingBrand,
    error,
  } = useQuery({
    queryKey: [""],
    queryFn: () => isBrand(),
    retry: false,
  });
  return { isCheckingBrand, brand, error };
}
