import { Typography } from "@mui/material";
import useBrandsDetails from "../features/brands/useBrandsDetails";
import Spinner from "../ui/Spinner";
import ProductCard from "../ui/ProductCard";
import BasicGrid from "../ui/Grid";
import JSBI from "jsbi";

function Products() {
  const { brandsDetails, productsDetails, isLoadingBrandsDetails, error } =
    useBrandsDetails();
  if (isLoadingBrandsDetails) return <Spinner />;
  return (
    <div>
      <h1>Products</h1>
      {brandsDetails.map((brand, idx) => (
        <div>
          <Typography variant="h4">{brand[1]}</Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {brand[2]}
          </Typography>
          <BasicGrid
            cards={productsDetails[idx].map((product) => (
              <ProductCard
                productId={product[0]}
                brandId={brand[0]}
                imageUrl={product[3]}
                name={product[1]}
                category={product[2]}
                price={
                  JSBI.BigInt(parseInt(product[4])) / JSBI.BigInt(10 ** 18)
                }
              />
            ))}
          />
        </div>
      ))}
    </div>
  );
}

export default Products;
