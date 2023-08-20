import { useParams } from "react-router-dom";
import useProductDetails from "../features/products/useProductDetails";
import Spinner from "../ui/Spinner";
import Card from "../ui/Card";
import BasicGrid from "../ui/Grid";
import JSBI from "jsbi";
import MediaCard from "../ui/MediaCard";
import { Button, Checkbox } from "@mui/material";
import { useState } from "react";
import { buyProduct, checkRedeemableTokens } from "../services/flipKartApi";

function Product() {
  const { brandId, productId } = useParams();
  const { isLoadingProduct, product, error } = useProductDetails(productId);
  const [isChecked, setIsChecked] = useState(false);
  const [price, setIsPrice] = useState(0);
  if (isLoadingProduct) return <Spinner />;

  async function handleClick() {
    setIsChecked(true);
    let priceToPay = await checkRedeemableTokens(
      String(JSBI.BigInt(parseInt(product[4])) / JSBI.BigInt(10 ** 18))
    );
    setIsPrice(priceToPay);
  }

  async function handleBuy() {
    let priceToPay = isChecked
      ? price
      : JSBI.BigInt(parseInt(product[4])) / JSBI.BigInt(10 ** 18);
    await buyProduct(brandId, productId, isChecked, "test", String(priceToPay));
  }

  const cards = [
    <MediaCard imageUrl={product[3]} />,
    <Card value={product[1]} title="Product Name" />,
    <Card value={product[2]} title="Product Category" />,
    <Card
      value={
        isChecked
          ? `${price} ether`
          : `${JSBI.BigInt(parseInt(product[4])) / JSBI.BigInt(10 ** 18)} ether`
      }
      title="Price"
    />,
  ];
  return (
    <div>
      <h1>Product Details</h1>
      <BasicGrid cards={cards} />
      <Checkbox disabled={isChecked} onClick={handleClick} /> Redeem Tokens
      <Button onClick={handleBuy} variant="outlined">
        Buy Product
      </Button>
    </div>
  );
}

export default Product;
