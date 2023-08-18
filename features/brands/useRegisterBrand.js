import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { registerBrand as registerBrandApi } from "../../services/flipKartApi";

export default function useRegisterBrand() {
  const queryClient = useQueryClient();
  const { isLoading: isRegistering, mutate: registerBrand } = useMutation({
    mutationFn: ({ name, category, rewardPricePercentage, rewardMilestones }) =>
      registerBrandApi(name, category, rewardPricePercentage, rewardMilestones),
    onSuccess: () => {
      toast.success("Brand registered Successfully!");
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isRegistering, registerBrand };
}
