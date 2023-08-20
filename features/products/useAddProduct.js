import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addProduct as addProductApi } from "../../services/flipKartApi";

export default function useAddProduct() {
  const queryClient = useQueryClient();
  const { isLoading: isAddingProuct, mutate: addProduct } = useMutation({
    mutationFn: ({ brandId, name, category, imageUrl, price }) =>
      addProductApi(brandId, name, category, imageUrl, price),
    onSuccess: () => {
      toast.success("Added new product successfully!");
      queryClient.invalidateQueries({
        queryKey: ["brand"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isAddingProuct, addProduct };
}
