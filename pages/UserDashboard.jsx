import useUserDetails from "../features/users/useUserDetails";
import useUserPurchaseHistory from "../features/users/useUserPurchaseHistory";
import Spinner from "../ui/Spinner";
import Card from "../ui/Card";
import BasicGrid from "../ui/Grid";
import JSBI from "jsbi";
import UserPurchaseTable from "../ui/UserPurchaseTable";
import useUserRewards from "../features/users/useUserRewards";

function UserDashboard() {
  const { isLoadingUser, userDetails, userTokenBalance } = useUserDetails();
  const {
    isLoadingUserPurchaseHistory,
    userPurchaseHistory,
    brandNames,
    productNames,
  } = useUserPurchaseHistory();
  const { isLoadingUserRewards, userRewards } = useUserRewards();
  if (isLoadingUser || isLoadingUserPurchaseHistory || isLoadingUserRewards)
    return <Spinner />;
  const rows = userPurchaseHistory.map((user, idx) => {
    return {
      transactionId: user[0],
      brandName: brandNames[idx],
      productName: productNames[idx],
      expenditure: JSBI.BigInt(parseInt(user[4])) / JSBI.BigInt(10 ** 18),
      tokensRedeemed: parseInt(user[5]),
      rewardRedeemed: user[6],
    };
  });
  const userDetailCards = [
    <Card value={userDetails[1]} title="Name" />,
    <Card value={userDetails[2]} title="User account address" />,
    <Card
      value={userDetails[3]}
      title="Referral Code"
      description="Share the code to earn flipCoins"
    />,
    <Card value={userTokenBalance} title="Availabe Tokens" />,
  ];
  const userRewardDetailCards = userRewards.map((reward) => (
    <Card
      value={reward[0]}
      title={`${reward[1]} discount max upto ${reward[2]}`}
      description={`use ${reward[4]}`}
    />
  ));
  return (
    <div>
      <h1>User Details</h1>
      <BasicGrid cards={userDetailCards} />
      <UserPurchaseTable rows={rows} />
      <h2>Redeemable Rewards</h2>
      {userRewardDetailCards.length ? (
        <BasicGrid cards={userRewardDetailCards} />
      ) : (
        "There are no redeemable vouchers! Buy vouchers using flipCoins now!"
      )}
    </div>
  );
}

export default UserDashboard;
