import JSBI from "jsbi";
import MediaCard from "../../ui/MediaCard";
import Spinner from "../../ui/Spinner";
import useDisplayProducts from "./useDisplayProducts";

function DisplayProducts({ brandId }) {
  const { isLoadingProducts, products, error } = useDisplayProducts(brandId);
  if (isLoadingProducts) return <Spinner />;
  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <MediaCard
          imageUrl={product[3]}
          name={product[1]}
          category={product[2]}
          price={JSBI.BigInt(parseInt(product[4])) / JSBI.BigInt(10 ** 18)}
        />
      ))}
    </div>
  );
}

export default DisplayProducts;
