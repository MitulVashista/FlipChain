import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { issueTokens as issueTokensApi } from "../../services/flipKartApi";

export default function useIssueTokens() {
  const queryClient = useQueryClient();
  const { isLoading: isIssuingTokens, mutate: issueTokens } = useMutation({
    mutationFn: ({ brandId, tokens }) => issueTokensApi(brandId, tokens),
    onSuccess: () => {
      toast.success("Issued tokens successfully!");
      queryClient.invalidateQueries({
        queryKey: ["brand"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isIssuingTokens, issueTokens };
}
