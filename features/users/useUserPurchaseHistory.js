import { useQuery } from "@tanstack/react-query";
import { getUserPurchaseHistory } from "../../services/flipKartApi";

export default function useUserDetails() {
  const {
    data: { userPurchaseHistory, brandNames, productNames } = {},
    isLoading: isLoadingUserPurchaseHistory,
    error,
  } = useQuery({
    queryKey: ["userPurchaseHistory"],
    queryFn: () => getUserPurchaseHistory(),
    retry: false,
  });
  return {
    isLoadingUserPurchaseHistory,
    userPurchaseHistory,
    brandNames,
    productNames,
    error,
  };
}
