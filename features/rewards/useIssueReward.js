import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { issueReward as issueRewardApi } from "../../services/flipKartApi";

export default function useIssueReward() {
  const queryClient = useQueryClient();
  const { isLoading: isIssuingReward, mutate: issueReward } = useMutation({
    mutationFn: (rewardId) => issueRewardApi(rewardId),
    onSuccess: () => {
      toast.success("issued Reward successfully!");
      queryClient.invalidateQueries({
        queryKey: ["rewards"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isIssuingReward, issueReward };
}
