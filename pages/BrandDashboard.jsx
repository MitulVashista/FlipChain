import useBrandDetails from "../features/brands/useBrandDetails";
import Spinner from "../ui/Spinner";
import Card from "../ui/Card";
import BasicGrid from "../ui/Grid";
import BuyTokenForm from "../features/brands/BuyTokenForm";
import IssueTokenForm from "../features/brands/issueTokenForm";
import AddProduct from "../features/products/AddProduct";
import DisplayProducts from "../features/products/DisplayProducts";
import AddReward from "../features/rewards/AddReward";
import DisplayRewards from "../features/rewards/DisplayRewards";

function BrandDashboard() {
  const { isLoadingBrand, brandData, ownerTokenBalance, error } =
    useBrandDetails();
  if (isLoadingBrand) return <Spinner />;
  const [
    id,
    name,
    category,
    owner,
    isIssuingTokens,
    rewardTokensLeft,
    rewardTokenPercentage,
  ] = brandData;
  const cards = [
    <Card value={name} title="Brand Name" />,
    <Card value={category} title="Category" />,
    <Card
      value={owner}
      title="Brand owner"
      description="The wallet address of the owner"
    />,
    <Card
      value={Number(ownerTokenBalance)}
      title="Token Balance"
      description="Token balance of the brand owner"
    />,
    <Card
      value={Number(rewardTokenPercentage)}
      title="Token Reward Percentage"
      description="The percentage of amount of tokens customer receives on a purchase based on product price"
    />,
    <Card
      value={isIssuingTokens ? "Yes" : "No"}
      title="Currently Issuing Tokens"
      description="Currently issuing reward tokens by the brand to customers on product purchases"
    />,
    <Card
      value={Number(rewardTokensLeft / BigInt(10 ** 18))}
      title="Reward Tokens Left"
      description="Reward tokens left for issuance"
    />,
  ];
  return (
    <div>
      <h1>Brand Dashboard</h1>
      <BasicGrid cards={cards} />
      <BuyTokenForm brandId={id} />
      <IssueTokenForm brandId={id} />
      <DisplayProducts brandId={id} />
      <AddProduct brandId={id} />
      <DisplayRewards brandId={id} />
      <AddReward brandId={id} />
    </div>
  );
}

export default BrandDashboard;
