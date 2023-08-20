import useUserDetails from "../features/users/useUserDetails";
import useUserPurchaseHistory from "../features/users/useUserPurchaseHistory";
import Spinner from "../ui/Spinner";
import Card from "../ui/Card";
import BasicGrid from "../ui/Grid";
import JSBI from "jsbi";
import UserPurchaseTable from "../ui/UserPurchaseTable";

function UserDashboard() {
  const { isLoadingUser, userDetails, userTokenBalance } = useUserDetails();
  const {
    isLoadingUserPurchaseHistory,
    userPurchaseHistory,
    brandNames,
    productNames,
  } = useUserPurchaseHistory();
  if (isLoadingUser || isLoadingUserPurchaseHistory) return <Spinner />;
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
  const cards = [
    <Card value={userDetails[1]} title="Name" />,
    <Card value={userDetails[2]} title="User account address" />,
    <Card
      value={userDetails[3]}
      title="Referral Code"
      description="Share the code to earn flipCoins"
    />,
    <Card value={userTokenBalance} title="Availabe Tokens" />,
  ];
  return (
    <div>
      <h1>User Details</h1>
      <BasicGrid cards={cards} />
      <UserPurchaseTable rows={rows} />
    </div>
  );
}

export default UserDashboard;
