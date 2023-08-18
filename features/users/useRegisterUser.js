import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { registerUser as registerUserApi } from "../../services/flipKartApi";

export default function useRegisterBrand() {
  const queryClient = useQueryClient();
  const { isLoading: isRegistering, mutate: registerUser } = useMutation({
    mutationFn: ({ name, referralCode }) => registerUserApi(name, referralCode),
    onSuccess: () => {
      toast.success("User registered Successfully!");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isRegistering, registerUser };
}
