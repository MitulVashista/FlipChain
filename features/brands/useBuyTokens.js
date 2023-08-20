import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { buyTokens as buyTokensApi } from "../../services/flipKartApi";

export default function useBuyTokens() {
  const queryClient = useQueryClient();
  const { isLoading: isBuyingTokens, mutate: buyTokens } = useMutation({
    mutationFn: ({ brandId, amount }) => buyTokensApi(brandId, amount),
    onSuccess: () => {
      toast.success("Bought tokens successfully!");
      queryClient.invalidateQueries({
        queryKey: ["brand"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isBuyingTokens, buyTokens };
}
