import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addReward as addRewardApi } from "../../services/flipKartApi";

export default function useAddReward() {
  const queryClient = useQueryClient();
  const { isLoading: isAddingReward, mutate: addReward } = useMutation({
    mutationFn: ({ brandId, discount, maxDiscountValue, tokens }) =>
      addRewardApi(brandId, discount, maxDiscountValue, tokens),
    onSuccess: () => {
      toast.success("Added new Reward successfully!");
      queryClient.invalidateQueries({
        queryKey: ["brand"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isAddingReward, addReward };
}
