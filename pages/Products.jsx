import useBrandsDetails from "../features/brands/useBrandsDetails";

function Products() {
  const { brandsData, isLoadingBrands, error } = useBrandsDetails();
  return (
    <div>
      <h1>Products</h1>
    </div>
  );
}

export default Products;
